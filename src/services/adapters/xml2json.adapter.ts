export interface Xml2JsonAdapter {
  parseXmlToJson(arg: string): any | Promise<any>;
}
