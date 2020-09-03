export interface BoeApiModel {
  sumario: Sumario;
  error?: any;
}

export interface Sumario {
  diario: Diario[];
  meta: Meta[];
}

export interface Meta {}

export interface Diario {
  $: { nbo: string };
  seccion: Seccion[];
}

export interface Seccion {
  $: SeccionAttr;
  departamento: Departamento[];
}

export interface SeccionAttr {
  num: string;
  nombre: string;
}

export interface Departamento {
  $: { nombre: string; etq: string };
  item: DepartamentoItem[];
  epigrafe?: any;
}

export interface DepartamentoItem {
  $: {
    id: string;
  };
  titulo: string[];
}
