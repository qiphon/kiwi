declare type DataType = Record<string, any>;
export interface I18NAPI {
  init?(lang: string, metas: DataType, defaultKey?: 'zh-CN'): I18NAPI;
  setLang?(lang: string): void;
  template?(str: string, args: any): string;
  get(name: string, args?: any): string;
}
declare const IntlFormat: {
  init: <T = Record<string, any>>(lang: string, metas: T, defaultKey?: string) => I18NAPI & T;
};
export { IntlFormat };
export default IntlFormat;
