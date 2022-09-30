/**
 * @file I18N Tools
 * @author linhuiw
 */

import IntlMessageFormat from 'intl-messageformat';
import { get as lodashGet } from 'lodash-es';
import Observer from './Observer';

type DataType = Record<string, any>;

export interface I18NAPI {
  /**
   * 初始化对应语言
   * @param lang: 对应语言
   * @param metas: 所有语言的语言文件
   * @param defaultKey: 默认支持的文件枚举值
   */
  init?(lang: string, metas: DataType, defaultKey?: 'zh-CN'): I18NAPI;
  /**
   * 设置对应语言
   * @param lang: 切换的对应语言
   */
  setLang?(lang: string): void;
  /**
   * 获取对应语言的模板值
   * @param template: 对应语言的模板
   * @param args: 模板的参数
   */
  template?(str: string, args: any): string;
  /**
   * 获取对应语言的值
   * @param name: 对应语言的模板的 Key
   * @param options: 模板的参数
   */
  get(name: string, args?: any): string;
}

class I18N {
  __lang__: string;
  __metas__: any;
  __data__: any;
  __defaultKey__: string;
  constructor(lang: string, metas: DataType, defaultKey?: string) {
    this.__lang__ = lang;
    this.__metas__ = metas;
    this.__data__ = metas[lang];
    this.__defaultKey__ = defaultKey;
  }
  setLang(lang: string) {
    this.__lang__ = lang;
    this.__data__ = this.__metas__[lang];
  }
  getProp(obj, is, value?) {
    if (typeof is === 'string') {
      is = is.split('.');
    }
    if (is.length === 1 && value !== undefined) {
      return (obj[is[0]] = value);
    } else if (is.length === 0) {
      return obj;
    } else {
      const prop = is.shift();
      if (value !== undefined && obj[prop] === undefined) {
        obj[prop] = {};
      }
      return this.getProp(obj[prop], is, value);
    }
  }
  template(str, args) {
    if (!str) {
      return '';
    }
    return str.replace(/\{(.+?)\}/g, (match, p1) => {
      return this.getProp(
        {
          ...this.__data__,
          ...args
        },
        p1
      );
    });
  }
  get(str, args?) {
    let msg = lodashGet(this.__data__, str);
    if (!msg) {
      msg = lodashGet(this.__metas__[this.__defaultKey__ || 'zh-CN'], str, '');
    }
    if (args) {
      try {
        msg = new IntlMessageFormat(msg, this.__lang__);
        msg = msg.format(args);
        return msg;
      } catch (err) {
        console.warn(`kiwi-intl format message failed for key='${str}'`, err);
        return '';
      }
    } else {
      return msg;
    }
  }
}

const IntlFormat = {
  init: <T = Record<string, any>>(lang: string, metas: T, defaultKey?: string): I18NAPI & T => {
    const i18n = new I18N(lang, metas, defaultKey);
    return Observer(i18n, defaultKey);
  }
};

export { IntlFormat };
export default IntlFormat;
