import { Xml2JsonAdapter } from './adapters';
import { parseStringPromise } from 'xml2js';
export class Xml2JsonService implements Xml2JsonAdapter {
  private static instance: Xml2JsonService;

  static getInstance(): Xml2JsonService {
    if (!Xml2JsonService.instance) {
      Xml2JsonService.instance = new Xml2JsonService();
    }

    return Xml2JsonService.instance;
  }

  async parseXmlToJson(arg: string): Promise<any> {
    return parseStringPromise(arg);
  }
}
