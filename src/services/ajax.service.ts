import { AjaxRequest } from 'rxjs/ajax';

export class AjaxService {
  constructor() {}

  createAjaxConfig(url: string): AjaxRequest {
    return {
      createXHR: () => new XMLHttpRequest(),
      url,
      method: 'GET',
      crossDomain: true,
      responseType: 'text',
    };
  }
}
