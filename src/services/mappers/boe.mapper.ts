import { BoeApiModel, Seccion, Diario, DepartamentoItem, Departamento } from '../api-models';
import { Boe, defaultBoe } from '../../models';
import { CONTRACT_FORMALIZATION } from '../../core';

export const boeMapper = (input: BoeApiModel): Boe => {
  if (!input || input.error || !input.sumario) {
    return defaultBoe();
  }

  // We must extract the ID in this nested object
  // input.sumario.diario[0].seccion[0].departamento[0].item[0].$.id
  const sectionTarget: string = '5A';
  const { diario } = input.sumario;

  // Extract diarios with section = 5A
  const filteredDiarios: Seccion[] = diario.reduce((section: Seccion[], diario: Diario) => {
    return section.concat(diario.seccion.filter((s) => s.$.num === sectionTarget));
  }, []);

  // Extract departments
  const departamentsCollection: Departamento[] = filteredDiarios[0].departamento;
  const deparmentItemsCollection: DepartamentoItem[] = departamentsCollection.reduce(
    (items: DepartamentoItem[], department: Departamento) => {
      return items.concat(department.item);
    },
    []
  );

  // Filter only 'Formalizacion de contratos' items;
  const formalizedContractCollection: DepartamentoItem[] = deparmentItemsCollection.filter(
    (item) => item.titulo[0].indexOf(CONTRACT_FORMALIZATION) !== -1
  );
  // Extract only the ad ids
  const adIdsCollection: string[] = formalizedContractCollection.map(({ $ }) => $.id);

  const boe: Boe = {
    contractIdCollection: [...adIdsCollection],
  };

  return boe;
};
