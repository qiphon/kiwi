/**
 * @author doubledream
 * @desc 更新文件
 */

import * as fs from 'fs-extra';
// import * as path from 'path';
import * as _ from 'lodash';
// const prettier = require('prettier');
import * as ts from 'typescript';
import { readFile, writeFile } from './file';
import { getLangData } from './getLangData';
import { getProjectConfig, getLangDir, successInfo, failInfo, highlightText } from '../utils';
import { ReplacedStr } from './extract';
import { PROJECT_CONFIG } from '../const';

const CONFIG = getProjectConfig();
const srcLangDir = getLangDir(CONFIG.srcLang);
/**
 * 判断是否有对应的其他的翻译文件
 */
function createCnFile() {
  const initArr = CONFIG.distLangs;
  initArr.forEach(url => {
    const cnDir = `${CONFIG.kiwiDir}/${url}`;
    if (!fs.existsSync(cnDir)) {
      fs.mkdirSync(cnDir);
      fs.writeFile(`${cnDir}/index.ts`, PROJECT_CONFIG.zhIndexFile, err => {
        if (err) {
          console.log(err);
        }
      });
      fs.writeFile(`${cnDir}/common.ts`, PROJECT_CONFIG.zhTestFile, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}
function updateLangFiles(keyValue, text, validateDuplicate, ident) {
  if (!_.startsWith(keyValue, 'I18N.')) {
    return;
  }
  // 合并当前所有的语种支持
  const initArrDistLangs = [...CONFIG.distLangs, CONFIG.srcLang];
  const [, filename, ...restPath] = keyValue.split('.');
  const fullKey = _.camelCase(ident);
  initArrDistLangs.forEach(lang => {
    const targetFilename = `${getLangDir(lang)}/${filename}.ts`;
    if (!fs.existsSync(targetFilename)) {
      fs.writeFileSync(targetFilename, generateNewLangFile(fullKey, text, ident));
      addImportToMainLangFile(filename, getLangDir(lang));
      successInfo(`成功新建语言文件 ${targetFilename}`);
    } else {
      // 清除 require 缓存，解决手动更新语言文件后再自动抽取，导致之前更新失效的问题
      const mainContent = getLangData(targetFilename);
      const obj = mainContent;

      if (Object.keys(obj).length === 0) {
        failInfo(`${filename} 解析失败，该文件包含的文案无法自动补全`);
      }

      if (validateDuplicate && _.get(obj, fullKey) !== undefined) {
        failInfo(`${targetFilename} 中已存在 key 为 \`${fullKey}\` 的翻译，请重新命名变量`);
        throw new Error('duplicate');
      }
      // \n 会被自动转义成 \\n，这里转回来
      text = text.replace(/\\n/gm, '\n');
      _.set(obj, fullKey, {
        ident: _.camelCase(ident),
        source: text,
        target: ''
      });
      // _.set(obj, fullKey, text);
      fs.writeFileSync(targetFilename, prettierFile(`export default ${JSON.stringify(obj, null, 2)}`));
    }
  });
}

/**
 * 使用 Prettier 格式化文件
 * @param fileContent
 */
function prettierFile(fileContent) {
  // try {
  //   return prettier.format(fileContent, {
  //     parser: 'typescript',
  //     trailingComma: 'all',
  //     singleQuote: true
  //   });
  // } catch (e) {
  //   failInfo(`代码格式化报错！${e.toString()}\n代码为：${fileContent}`);
  return fileContent;
  // }
}

function generateNewLangFile(key, value, ident) {
  const obj = _.set({}, key, {
    ident: _.camelCase(ident),
    source: value,
    target: ''
  });
  // const obj = _.set({}, key, value);

  return prettierFile(`export default ${JSON.stringify(obj, null, 2)}`);
}

function addImportToMainLangFile(newFilename, srcDir) {
  let mainContent = '';
  if (fs.existsSync(`${srcDir}/index.ts`)) {
    mainContent = fs.readFileSync(`${srcDir}/index.ts`, 'utf8');
    mainContent = mainContent.replace(/^(\s*import.*?;)$/m, `$1\nimport ${newFilename} from './${newFilename}';`);
    if (/(}\);)/.test(mainContent)) {
      if (/\,\n(}\);)/.test(mainContent)) {
        /** 最后一行包含,号 */
        mainContent = mainContent.replace(/(}\);)/, `  ${newFilename},\n$1`);
      } else {
        /** 最后一行不包含,号 */
        mainContent = mainContent.replace(/\n(}\);)/, `,\n  ${newFilename},\n$1`);
      }
    }
    // 兼容 export default { common };的写法
    if (/(};)/.test(mainContent)) {
      if (/\,\n(};)/.test(mainContent)) {
        /** 最后一行包含,号 */
        mainContent = mainContent.replace(/(};)/, `  ${newFilename},\n$1`);
      } else {
        /** 最后一行不包含,号 */
        mainContent = mainContent.replace(/\n(};)/, `,\n  ${newFilename},\n$1`);
      }
    }
  } else {
    mainContent = `import ${newFilename} from './${newFilename}';\n\nexport default Object.assign({}, {\n  ${newFilename},\n});`;
  }

  fs.writeFileSync(`${srcDir}/index.ts`, mainContent);
}

/**
 * 检查是否添加 import I18N 命令
 * @param filePath 文件路径
 */
function hasImportI18N(filePath) {
  const code = readFile(filePath);
  const ast = ts.createSourceFile('', code, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TSX);
  let hasImportI18N = false;

  function visit(node) {
    if (node.kind === ts.SyntaxKind.ImportDeclaration) {
      const importClause = node.importClause;

      // import I18N from 'src/utils/I18N';
      if (_.get(importClause, 'kind') === ts.SyntaxKind.ImportClause) {
        if (importClause.name) {
          if (importClause.name.escapedText === 'I18N') {
            hasImportI18N = true;
          }
        } else {
          const namedBindings = importClause.namedBindings;
          // import { I18N } from 'src/utils/I18N';
          if (namedBindings.kind === ts.SyntaxKind.NamedImports) {
            namedBindings.elements.forEach(element => {
              if (element.kind === ts.SyntaxKind.ImportSpecifier && _.get(element, 'name.escapedText') === 'I18N') {
                hasImportI18N = true;
              }
            });
          }
          // import * as I18N from 'src/utils/I18N';
          if (namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
            if (_.get(namedBindings, 'name.escapedText') === 'I18N') {
              hasImportI18N = true;
            }
          }
        }
      }
    }
  }

  ts.forEachChild(ast, visit);

  return hasImportI18N;
}

/**
 * 在合适的位置添加 import I18N 语句
 * @param filePath 文件路径
 */
function createImportI18N(filePath) {
  const code = readFile(filePath);
  const ast = ts.createSourceFile('', code, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TSX);
  const isTsFile = _.endsWith(filePath, '.ts');
  const isTsxFile = _.endsWith(filePath, '.tsx');
  const isVueFile = _.endsWith(filePath, '.vue');
  if (isTsFile || isTsxFile) {
    const importStatement = `${CONFIG.importI18N}\n`;
    const pos = ast.getStart(ast, false);
    const updateCode = code.slice(0, pos) + importStatement + code.slice(pos);

    return updateCode;
  } else if (isVueFile) {
    const importStatement = `${CONFIG.importI18N}\n`;
    const updateCode = code.replace(/<script>/g, `<script>\n${importStatement}`);
    return updateCode;
  }
}

/**
 * 更新文件
 * @param filePath 当前文件路径
 * @param arg  目标字符串对象
 * @param val  目标 key
 * @param validateDuplicate 是否校验文件中已经存在要写入的 key
 * @param needWrite 是否只需要替换不需要更新 langs 文件
 */
function replaceAndUpdate(filePath, arg: ReplacedStr['target'], val, validateDuplicate, needWrite = true) {
  const code = readFile(filePath);
  const isHtmlFile = _.endsWith(filePath, '.html');
  const isVueFile = _.endsWith(filePath, '.vue');
  // 标识
  const ident = arg.ident;
  let newCode = code;
  let finalReplaceText = arg.text;
  const { start, end } = arg.range;

  // 若是字符串，删掉两侧的引号
  if (arg.isString) {
    if (!arg?.isEnumMember) {
      // 如果引号左侧是 等号，则可能是 jsx 的 props，此时要替换成 {
      const preTextStart = start - 1;
      const [last2Char, last1Char] = code.slice(preTextStart, start + 1).split('');
      let finalReplaceVal = val;
      if (last2Char === '=') {
        if (isHtmlFile) {
          finalReplaceVal = '{{' + val + '}}';
        } else if (isVueFile) {
          finalReplaceVal = '{{' + val + '}}';
        } else {
          finalReplaceVal = '{' + val + '}';
        }
      }
      // 若是模板字符串，看看其中是否包含变量
      if (last1Char === '`') {
        const varInStr = arg.text.match(/(\$\{[^\}]+?\})/g);
        if (varInStr) {
          const kvPair = varInStr.map((str, index) => {
            return `val${index + 1}: ${str.replace(/^\${([^\}]+)\}$/, '$1')}`;
          });
          finalReplaceVal = `I18N.template(${val}, { ${kvPair.join(',\n')} })`;

          varInStr.forEach((str, index) => {
            finalReplaceText = finalReplaceText.replace(str, `{val${index + 1}}`);
          });
        }
      }

      newCode = `${code.slice(0, start)}${finalReplaceVal}${code.slice(end)}`;
    } else {
      console.log(`${filePath} 含有中文枚举，需要手动替换翻译！`);
      console.log(arg, 'arg---->', JSON.stringify(arg));
      // 不处理枚举值
      newCode = code.slice(0);
    }
  } else {
    if (isHtmlFile || isVueFile) {
      newCode = `${code.slice(0, start)}{{${val}}}${code.slice(end)}`;
    } else {
      newCode = `${code.slice(0, start)}{${val}}${code.slice(end)}`;
    }
  }

  try {
    if (needWrite) {
      // 先将文件夹生成
      createCnFile();
      // 更新语言文件
      updateLangFiles(val, finalReplaceText, validateDuplicate, ident);
    }
    // 若更新成功再替换代码
    return writeFile(filePath, newCode);
  } catch (e) {
    return Promise.reject(e.message);
  }
}

export { replaceAndUpdate, hasImportI18N, createImportI18N };
