var $8zHUo$globby = require("globby");
var $8zHUo$fs = require("fs");
var $8zHUo$path = require("path");
var $8zHUo$lodash = require("lodash");
var $8zHUo$inquirer = require("inquirer");
var $8zHUo$pinyinpro = require("pinyin-pro");
var $8zHUo$process = require("process");
var $8zHUo$colors = require("colors");
var $8zHUo$googletranslate = require("google-translate");
var $8zHUo$baidutranslate = require("baidu-translate");
var $8zHUo$commander = require("commander");
var $8zHUo$ora = require("ora");
var $8zHUo$tsnode = require("ts-node");
var $8zHUo$d3dsv = require("d3-dsv");
var $8zHUo$buffer = require("buffer");
var $8zHUo$slash2 = require("slash2");
var $8zHUo$typescript = require("typescript");
var $8zHUo$angularcompiler = require("@angular/compiler");
var $8zHUo$vuetemplatecompiler = require("vue-template-compiler");
var $8zHUo$babelcore = require("@babel/core");
var $8zHUo$fsextra = require("fs-extra");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire5c13"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire5c13"] = parcelRequire;
}
parcelRequire.register("d8Eqm", function(module, exports) {

$parcel$export(module.exports, "getLangData", () => getLangData);
$parcel$export(module.exports, "getSuggestLangObj", () => getSuggestLangObj);




var $lCxOT = parcelRequire("lCxOT");
const CONFIG = (0, $lCxOT.getProjectConfig)();
const LANG_DIR = $8zHUo$path.resolve(CONFIG.kiwiDir, CONFIG.srcLang);
const I18N_GLOB = `${LANG_DIR}/**/*.ts`;
/**
 * 获取对应文件的语言
 */ function getLangData(fileName) {
    if ($8zHUo$fs.existsSync(fileName)) return getLangJson(fileName);
    else return {};
}
/**
 * 获取文件 Json
 */ function getLangJson(fileName) {
    const fileContent = $8zHUo$fs.readFileSync(fileName, {
        encoding: "utf8"
    });
    let obj = fileContent.match(/export\s*default\s*({[\s\S]+);?$/)[1];
    obj = obj.replace(/\s*;\s*$/, "");
    let jsObj = {};
    try {
        jsObj = eval("(" + obj + ")");
    } catch (err) {
        console.log(obj);
        console.error(err);
    }
    return jsObj;
}
function getI18N() {
    const paths = $8zHUo$globby.sync(I18N_GLOB);
    const langObj = paths.reduce((prev, curr)=>{
        const filename = curr.split("/").pop().replace(/\.tsx?$/, "");
        if (filename.replace(/\.tsx?/, "") === "index") return prev;
        const fileContent = getLangData(curr);
        let jsObj = fileContent;
        if (Object.keys(jsObj).length === 0) console.log(`\`${curr}\` 解析失败，该文件包含的文案无法自动补全`);
        return {
            ...prev,
            [filename]: jsObj
        };
    }, {});
    return langObj;
}
/**
 * 获取全部语言, 展平
 */ function getSuggestLangObj() {
    const langObj = getI18N();
    const finalLangObj = (0, $lCxOT.flatten)(langObj);
    return finalLangObj;
}

});
parcelRequire.register("lCxOT", function(module, exports) {

$parcel$export(module.exports, "getProjectConfig", () => $9ba0f9a5c47c04f2$export$bad43d745a81bbd5);
$parcel$export(module.exports, "getKiwiDir", () => $9ba0f9a5c47c04f2$export$a23d9c7e2d2882e);
$parcel$export(module.exports, "getLangDir", () => $9ba0f9a5c47c04f2$export$dc7d457655464caf);
$parcel$export(module.exports, "traverse", () => $9ba0f9a5c47c04f2$export$df3f009e3d155b20);
$parcel$export(module.exports, "getAllMessages", () => $9ba0f9a5c47c04f2$export$a5cd77f28ca54edc);
$parcel$export(module.exports, "withTimeout", () => $9ba0f9a5c47c04f2$export$e86e19342bc4850e);
$parcel$export(module.exports, "translateText", () => $9ba0f9a5c47c04f2$export$eaca1ca0084ab580);
$parcel$export(module.exports, "translateKeyText", () => $9ba0f9a5c47c04f2$export$2bb648e235fe4b52);
$parcel$export(module.exports, "findMatchKey", () => $9ba0f9a5c47c04f2$export$a14218caa2e67c48);
$parcel$export(module.exports, "findMatchValue", () => $9ba0f9a5c47c04f2$export$cd0fcf489f4e8911);
$parcel$export(module.exports, "flatten", () => $9ba0f9a5c47c04f2$export$bffa455ba8c619a6);
$parcel$export(module.exports, "getTranslateOriginType", () => $9ba0f9a5c47c04f2$export$6f8d163167cf55e2);
$parcel$export(module.exports, "successInfo", () => $9ba0f9a5c47c04f2$export$28e8450bc542a24);
$parcel$export(module.exports, "failInfo", () => $9ba0f9a5c47c04f2$export$c39b799fa459058e);
$parcel$export(module.exports, "highlightText", () => $9ba0f9a5c47c04f2$export$8e93e90112ff7488);






var $iblgB = parcelRequire("iblgB");


function $9ba0f9a5c47c04f2$export$a633f4d900155b00(dir, fileName) {
    const files = $8zHUo$fs.readdirSync(dir);
    for (let file of files){
        const currName = $8zHUo$path.join(dir, file);
        const info = $8zHUo$fs.statSync(currName);
        if (info.isDirectory()) {
            if (file === ".git" || file === "node_modules") continue;
            const result = $9ba0f9a5c47c04f2$export$a633f4d900155b00(currName, fileName);
            if (result) return result;
        } else if (info.isFile() && file === fileName) return currName;
    }
}
/**
 * 获得项目配置信息
 */ function $9ba0f9a5c47c04f2$export$bad43d745a81bbd5() {
    const configFile = $8zHUo$path.resolve($8zHUo$process.cwd(), `./${(0, $iblgB.KIWI_CONFIG_FILE)}`);
    let obj = (0, $iblgB.PROJECT_CONFIG).defaultConfig;
    if (configFile && $8zHUo$fs.existsSync(configFile)) obj = {
        ...obj,
        ...JSON.parse($8zHUo$fs.readFileSync(configFile, "utf8"))
    };
    return obj;
}
/**
 * 获取语言资源的根目录
 */ function $9ba0f9a5c47c04f2$export$a23d9c7e2d2882e() {
    const config = $9ba0f9a5c47c04f2$export$bad43d745a81bbd5();
    if (config) return config.kiwiDir;
}
/**
 * 获取对应语言的目录位置
 * @param lang
 */ function $9ba0f9a5c47c04f2$export$dc7d457655464caf(lang) {
    const langsDir = $9ba0f9a5c47c04f2$export$a23d9c7e2d2882e();
    return $8zHUo$path.resolve(langsDir, lang);
}
/**
 * 深度优先遍历对象中的所有 string 属性，即文案
 */ function $9ba0f9a5c47c04f2$export$df3f009e3d155b20(obj1, cb1) {
    function traverseInner(obj, cb, path1) {
        $8zHUo$lodash.forEach(obj, (val, key)=>{
            if (typeof val === "string") cb(val, [
                ...path1,
                key
            ].join("."));
            else if (typeof val === "object" && val !== null) traverseInner(val, cb, [
                ...path1,
                key
            ]);
        });
    }
    traverseInner(obj1, cb1, []);
}
/**
 * 获取所有文案
 */ function $9ba0f9a5c47c04f2$export$a5cd77f28ca54edc(lang, filter = (message, key)=>true) {
    const srcLangDir = $9ba0f9a5c47c04f2$export$dc7d457655464caf(lang);
    let files = $8zHUo$fs.readdirSync(srcLangDir);
    files = files.filter((file)=>file.endsWith(".ts") && file !== "index.ts").map((file)=>$8zHUo$path.resolve(srcLangDir, file));
    const allMessages = files.map((file)=>{
        const { default: messages  } = require(file);
        const fileNameWithoutExt = $8zHUo$path.basename(file).split(".")[0];
        const flattenedMessages = {};
        $9ba0f9a5c47c04f2$export$df3f009e3d155b20(messages, (message, path2)=>{
            const key = fileNameWithoutExt + "." + path2;
            if (filter(message, key)) flattenedMessages[key] = message;
        });
        return flattenedMessages;
    });
    return Object.assign({}, ...allMessages);
}
/**
 * 重试方法
 * @param asyncOperation
 * @param times
 */ function $9ba0f9a5c47c04f2$export$9369b12211e1fce4(asyncOperation, times = 1) {
    let runTimes = 1;
    const handleReject = (e)=>{
        if ((runTimes++) < times) return asyncOperation().catch(handleReject);
        else throw e;
    };
    return asyncOperation().catch(handleReject);
}
/**
 * 设置超时
 * @param promise
 * @param ms
 */ function $9ba0f9a5c47c04f2$export$e86e19342bc4850e(promise, ms) {
    const timeoutPromise = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            reject(`Promise timed out after ${ms} ms.`);
        }, ms);
    });
    return Promise.race([
        promise,
        timeoutPromise
    ]);
}

/**
 * 使用google翻译
 */ function $9ba0f9a5c47c04f2$export$eaca1ca0084ab580(text, toLang) {
    const CONFIG = $9ba0f9a5c47c04f2$export$bad43d745a81bbd5();
    const options = CONFIG.translateOptions;
    const { translate: googleTranslate  } = $8zHUo$googletranslate(CONFIG.googleApiKey, options);
    return $9ba0f9a5c47c04f2$export$e86e19342bc4850e(new Promise((resolve, reject)=>{
        googleTranslate(text, "zh", (0, $iblgB.PROJECT_CONFIG).langMap[toLang], (err, translation)=>{
            if (err) reject(err);
            else resolve(translation.translatedText);
        });
    }), 5000);
}

/**
 * 翻译中文
 */ function $9ba0f9a5c47c04f2$export$2bb648e235fe4b52(text, origin) {
    const CONFIG = $9ba0f9a5c47c04f2$export$bad43d745a81bbd5();
    const { appId: appId , appKey: appKey  } = CONFIG.baiduApiKey;
    const baiduTranslate = $8zHUo$baidutranslate;
    function _translateText() {
        return $9ba0f9a5c47c04f2$export$e86e19342bc4850e(new Promise((resolve, reject)=>{
            // Baidu
            if (origin === "Baidu") baiduTranslate(appId, appKey, "en", "zh")(text).then((data)=>{
                if (data && data.trans_result) {
                    const result = data.trans_result.map((item)=>item.dst) || [];
                    resolve(result);
                }
            }).catch((err)=>{
                reject(err);
            });
            // Pinyin
            if (origin === "Pinyin") {
                const result = (0, $8zHUo$pinyinpro.pinyin)(text, {
                    toneType: "none"
                });
                resolve(result.split("$"));
            }
        }), 3000);
    }
    return $9ba0f9a5c47c04f2$export$9369b12211e1fce4(_translateText, 3);
}
function $9ba0f9a5c47c04f2$export$a14218caa2e67c48(langObj, text) {
    for(const key in langObj){
        if (langObj[key] === text) return key;
    }
    return null;
}
function $9ba0f9a5c47c04f2$export$cd0fcf489f4e8911(langObj, key) {
    return langObj[key];
}
/**
 * 将对象拍平
 * @param obj 原始对象
 * @param prefix
 */ function $9ba0f9a5c47c04f2$export$bffa455ba8c619a6(obj, prefix = "") {
    var propName = prefix ? prefix + "." : "", ret = {};
    for(var attribute in obj){
        var attr = attribute.replace(/-/g, "_");
        if ($8zHUo$lodash.isArray(obj[attr])) {
            var len = obj[attr].length;
            ret[attr] = obj[attr].join(",");
        } else if (typeof obj[attr] === "object") $8zHUo$lodash.extend(ret, $9ba0f9a5c47c04f2$export$bffa455ba8c619a6(obj[attr], propName + attr));
        else ret[propName + attr] = obj[attr];
    }
    return ret;
}
/**
 * 获取翻译源类型
 */ async function $9ba0f9a5c47c04f2$export$6f8d163167cf55e2() {
    const { googleApiKey: googleApiKey , baiduApiKey: baiduApiKey  } = $9ba0f9a5c47c04f2$export$bad43d745a81bbd5();
    let translateType = [
        "Google",
        "Baidu"
    ];
    if (!googleApiKey) translateType = translateType.filter((item)=>item !== "Google");
    if (!baiduApiKey || !baiduApiKey.appId || !baiduApiKey.appKey) translateType = translateType.filter((item)=>item !== "Baidu");
    if (translateType.length === 0) {
        console.log("\u8BF7\u914D\u7F6E googleApiKey \u6216 baiduApiKey ");
        return {
            pass: false,
            origin: ""
        };
    }
    if (translateType.length == 1) return {
        pass: true,
        origin: translateType[0]
    };
    const { origin: origin  } = await $8zHUo$inquirer.prompt({
        type: "list",
        name: "origin",
        message: "\u8BF7\u9009\u62E9\u4F7F\u7528\u7684\u7FFB\u8BD1\u6E90",
        default: "Google",
        choices: [
            "Google",
            "Baidu"
        ]
    });
    return {
        pass: true,
        origin: origin
    };
}
/**
 * 成功的提示
 */ function $9ba0f9a5c47c04f2$export$28e8450bc542a24(message) {
    console.log("successInfo: ", $8zHUo$colors.green(message));
}
/**
 * 失败的提示
 */ function $9ba0f9a5c47c04f2$export$c39b799fa459058e(message) {
    console.log("failInfo: ", $8zHUo$colors.red(message));
}
/**
 * 普通提示
 */ function $9ba0f9a5c47c04f2$export$8e93e90112ff7488(message) {
    return $8zHUo$colors.yellow(`${message}`);
}

});
parcelRequire.register("iblgB", function(module, exports) {

$parcel$export(module.exports, "KIWI_CONFIG_FILE", () => $c6cc0dc6d3a3c77e$export$8a966e43bcd549f);
$parcel$export(module.exports, "PROJECT_CONFIG", () => $c6cc0dc6d3a3c77e$export$435993cb6f7d5702);
const $c6cc0dc6d3a3c77e$export$8a966e43bcd549f = "kiwi-config.json";
const $c6cc0dc6d3a3c77e$export$435993cb6f7d5702 = {
    dir: "./.kiwi",
    defaultConfig: {
        kiwiDir: "./.kiwi",
        srcLang: "zh-CN",
        distLangs: [
            "en-US",
            "zh-TW"
        ],
        googleApiKey: "",
        baiduApiKey: {
            appId: "",
            appKey: ""
        },
        baiduLangMap: {
            ["en-US"]: "en",
            ["zh-TW"]: "cht"
        },
        translateOptions: {
            concurrentLimit: 10,
            requestOptions: {}
        },
        defaultTranslateKeyApi: "Pinyin",
        importI18N: `import I18N from 'src/utils/I18N';`,
        ignoreDir: "",
        ignoreFile: ""
    },
    langMap: {
        ["en-US"]: "en",
        ["en_US"]: "en"
    },
    zhIndexFile: `import common from './common';

export default Object.assign({}, {
  common
});`,
    zhTestFile: `export default {
    test: '测试'
  }`
};

});









var $iblgB = parcelRequire("iblgB");

function $3f83de8286c24891$var$creteConfigFile(existDir) {
    const configDir = $8zHUo$path.resolve($8zHUo$process.cwd(), `./${(0, $iblgB.KIWI_CONFIG_FILE)}`);
    if (existDir && $8zHUo$fs.existsSync(existDir) && !$8zHUo$fs.existsSync(configDir)) {
        const config = JSON.stringify({
            ...(0, $iblgB.PROJECT_CONFIG).defaultConfig,
            kiwiDir: existDir
        }, null, 2);
        $8zHUo$fs.writeFile(configDir, config, (err)=>{
            if (err) console.log(err);
        });
    } else if (!$8zHUo$fs.existsSync(configDir)) {
        const config = JSON.stringify((0, $iblgB.PROJECT_CONFIG).defaultConfig, null, 2);
        $8zHUo$fs.writeFile(configDir, config, (err)=>{
            if (err) console.log(err);
        });
    }
}
function $3f83de8286c24891$var$createCnFile() {
    const cnDir = `${(0, $iblgB.PROJECT_CONFIG).dir}/zh-CN`;
    if (!$8zHUo$fs.existsSync(cnDir)) {
        $8zHUo$fs.mkdirSync(cnDir);
        $8zHUo$fs.writeFile(`${cnDir}/index.ts`, (0, $iblgB.PROJECT_CONFIG).zhIndexFile, (err)=>{
            if (err) console.log(err);
        });
        $8zHUo$fs.writeFile(`${cnDir}/common.ts`, (0, $iblgB.PROJECT_CONFIG).zhTestFile, (err)=>{
            if (err) console.log(err);
        });
    }
}
function $3f83de8286c24891$export$6786e5eec56ec4be(existDir) {
    /** 初始化配置文件夹 */ if (existDir) {
        if (!$8zHUo$fs.existsSync(existDir)) {
            console.log("\u8F93\u5165\u7684\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u5DF2\u4E3A\u4F60\u751F\u6210\u9ED8\u8BA4\u6587\u4EF6\u5939");
            $8zHUo$fs.mkdirSync((0, $iblgB.PROJECT_CONFIG).dir);
        }
    } else if (!$8zHUo$fs.existsSync((0, $iblgB.PROJECT_CONFIG).dir)) $8zHUo$fs.mkdirSync((0, $iblgB.PROJECT_CONFIG).dir);
    $3f83de8286c24891$var$creteConfigFile(existDir);
    if (!(existDir && $8zHUo$fs.existsSync(existDir))) $3f83de8286c24891$var$createCnFile();
}






var $lCxOT = parcelRequire("lCxOT");
var $f322f17f239b2b8e$var$__dirname = "src";


/**
 * @author linhuiw
 * @desc 翻译文件
 */ $8zHUo$tsnode.register({
    compilerOptions: {
        module: "commonjs"
    }
});
const $f322f17f239b2b8e$var$CONFIG = (0, $lCxOT.getProjectConfig)();
/**
 * 获取中文文案文件的翻译，优先使用已有翻译，若找不到则使用 google 翻译
 * */ function $f322f17f239b2b8e$var$getTranslations(file, toLang) {
    const translations = {};
    const fileNameWithoutExt = $8zHUo$path.basename(file).split(".")[0];
    const srcLangDir = (0, $lCxOT.getLangDir)($f322f17f239b2b8e$var$CONFIG.srcLang);
    const distLangDir = (0, $lCxOT.getLangDir)(toLang);
    const srcFile = $8zHUo$path.resolve(srcLangDir, file);
    const distFile = $8zHUo$path.resolve(distLangDir, file);
    const { default: texts  } = require(srcFile);
    let distTexts;
    if ($8zHUo$fs.existsSync(distFile)) distTexts = require(distFile).default;
    (0, $lCxOT.traverse)(texts, (text, path1)=>{
        const key = fileNameWithoutExt + "." + path1;
        const distText = $8zHUo$lodash.get(distTexts, path1);
        translations[key] = distText || text;
    });
    return translations;
}
/**
 * 将翻译写入文件
 * */ function $f322f17f239b2b8e$var$writeTranslations(file, toLang, translations) {
    const fileNameWithoutExt = $8zHUo$path.basename(file).split(".")[0];
    const srcLangDir = (0, $lCxOT.getLangDir)($f322f17f239b2b8e$var$CONFIG.srcLang);
    const srcFile = $8zHUo$path.resolve(srcLangDir, file);
    const { default: texts  } = require(srcFile);
    const rst = {};
    (0, $lCxOT.traverse)(texts, (text, path2)=>{
        const key = fileNameWithoutExt + "." + path2;
        // 使用 setWith 而不是 set，保证 numeric key 创建的不是数组，而是对象
        // https://github.com/lodash/lodash/issues/1316#issuecomment-120753100
        $8zHUo$lodash.setWith(rst, path2, translations[key], Object);
    });
    const fileContent = "export default " + JSON.stringify(rst, null, 2);
    const filePath = $8zHUo$path.resolve((0, $lCxOT.getLangDir)(toLang), $8zHUo$path.basename(file));
    return new Promise((resolve, reject)=>{
        $8zHUo$fs.writeFile(filePath, fileContent, (err)=>{
            if (err) reject(err);
            else resolve();
        });
    });
}
/**
 * 翻译对应的文件
 * @param file
 * @param toLang
 */ function $f322f17f239b2b8e$var$translateFile(file, toLang) {
    const translations = $f322f17f239b2b8e$var$getTranslations(file, toLang);
    const toLangDir = $8zHUo$path.resolve($f322f17f239b2b8e$var$__dirname, `../${toLang}`);
    if (!$8zHUo$fs.existsSync(toLangDir)) $8zHUo$fs.mkdirSync(toLangDir);
    $f322f17f239b2b8e$var$writeTranslations(file, toLang, translations);
}
/**
 * 翻译所有文件
 */ function $f322f17f239b2b8e$export$92d6409d68f0739a(callback) {
    const srcLangDir = (0, $lCxOT.getLangDir)($f322f17f239b2b8e$var$CONFIG.srcLang);
    $8zHUo$fs.readdir(srcLangDir, (err, files)=>{
        if (err) console.error(err);
        else {
            files = files.filter((file)=>file.endsWith(".ts") && file !== "index.ts" && file !== "mock.ts").map((file)=>file);
            const translateFiles = (toLang)=>Promise.all(files.map((file)=>{
                    $f322f17f239b2b8e$var$translateFile(file, toLang);
                }));
            Promise.all($f322f17f239b2b8e$var$CONFIG.distLangs.map(translateFiles)).then(()=>{
                const langDirs = $f322f17f239b2b8e$var$CONFIG.distLangs.map((0, $lCxOT.getLangDir));
                langDirs.map((dir)=>{
                    const filePath = $8zHUo$path.resolve(dir, "index.ts");
                    if (!$8zHUo$fs.existsSync(dir)) $8zHUo$fs.mkdirSync(dir);
                    $8zHUo$fs.copyFileSync($8zHUo$path.resolve(srcLangDir, "index.ts"), filePath);
                });
                callback && callback();
            }, (e)=>{
                console.error(e);
                $8zHUo$process.exit(1);
            });
        }
    });
}





var $lCxOT = parcelRequire("lCxOT");

/**
 * @author linhuiw
 * @desc 导出未翻译文件
 */ $8zHUo$tsnode.register({
    compilerOptions: {
        module: "commonjs"
    }
});
function $20737cef070d010b$export$8f8d34ccf102fb57(file, lang1) {
    const CONFIG = (0, $lCxOT.getProjectConfig)();
    const langs = lang1 ? [
        lang1
    ] : CONFIG.distLangs;
    langs.map((lang)=>{
        const allMessages = (0, $lCxOT.getAllMessages)(CONFIG.srcLang);
        const existingTranslations = (0, $lCxOT.getAllMessages)(lang, (message, key)=>!/[\u4E00-\u9FA5]/.test(allMessages[key]) || allMessages[key] !== message);
        const messagesToTranslate = Object.keys(allMessages).filter((key)=>!existingTranslations.hasOwnProperty(key)).map((key)=>{
            let message = allMessages[key];
            message = JSON.stringify(message).slice(1, -1);
            return [
                key,
                message
            ];
        });
        if (messagesToTranslate.length === 0) {
            console.log("All the messages have been translated.");
            return;
        }
        const content = (0, $8zHUo$d3dsv.tsvFormatRows)(messagesToTranslate);
        const sourceFile = file || `./export-${lang}`;
        $8zHUo$fs.writeFileSync(sourceFile, content);
        console.log(`Exported ${messagesToTranslate.length} message(s).`);
    });
}







var $lCxOT = parcelRequire("lCxOT");


/**
 * @author linhuiw
 * @desc 导入翻译文件
 */ $8zHUo$tsnode.register({
    compilerOptions: {
        module: "commonjs"
    }
});
const $2f2c6164c7ff54ab$var$CONFIG = (0, $lCxOT.getProjectConfig)();
function $2f2c6164c7ff54ab$var$getMessagesToImport(file) {
    const content = $8zHUo$fs.readFileSync(file).toString();
    const messages = (0, $8zHUo$d3dsv.tsvParseRows)(content, ([key, value])=>{
        try {
            // value 的形式和 JSON 中的字符串值一致，其中的特殊字符是以转义形式存在的，
            // 如换行符 \n，在 value 中占两个字符，需要转成真正的换行符。
            value = JSON.parse(`"${value}"`);
        } catch (e) {
            throw new Error(`Illegal message: ${value}`);
        }
        return [
            key,
            value
        ];
    });
    const rst = {};
    const duplicateKeys = new Set();
    messages.forEach(([key, value])=>{
        if (rst.hasOwnProperty(key)) duplicateKeys.add(key);
        rst[key] = value;
    });
    if (duplicateKeys.size > 0) {
        const errorMessage = "Duplicate messages detected: \n" + [
            ...duplicateKeys
        ].join("\n");
        console.error(errorMessage);
        $8zHUo$process.exit(1);
    }
    return rst;
}
function $2f2c6164c7ff54ab$var$writeMessagesToFile(messages, file, lang) {
    const kiwiDir = $2f2c6164c7ff54ab$var$CONFIG.kiwiDir;
    const srcMessages = require($8zHUo$path.resolve(kiwiDir, $2f2c6164c7ff54ab$var$CONFIG.srcLang, file)).default;
    const dstFile = $8zHUo$path.resolve(kiwiDir, lang, file);
    const oldDstMessages = require(dstFile).default;
    const rst = {};
    (0, $lCxOT.traverse)(srcMessages, (message, key)=>{
        $8zHUo$lodash.setWith(rst, key, $8zHUo$lodash.get(messages, key) || $8zHUo$lodash.get(oldDstMessages, key), Object);
    });
    $8zHUo$fs.writeFileSync(dstFile + ".ts", "export default " + JSON.stringify(rst, null, 2));
}
function $2f2c6164c7ff54ab$export$74455f5ca66c946c(file1, lang) {
    let messagesToImport = $2f2c6164c7ff54ab$var$getMessagesToImport(file1);
    const allMessages = (0, $lCxOT.getAllMessages)($2f2c6164c7ff54ab$var$CONFIG.srcLang);
    messagesToImport = $8zHUo$lodash.pickBy(messagesToImport, (message, key)=>allMessages.hasOwnProperty(key));
    const keysByFiles = $8zHUo$lodash.groupBy(Object.keys(messagesToImport), (key)=>key.split(".")[0]);
    const messagesByFiles = $8zHUo$lodash.mapValues(keysByFiles, (keys, file)=>{
        const rst = {};
        $8zHUo$lodash.forEach(keys, (key)=>{
            $8zHUo$lodash.setWith(rst, key.substr(file.length + 1), messagesToImport[key], Object);
        });
        return rst;
    });
    $8zHUo$lodash.forEach(messagesByFiles, (messages, file)=>{
        $2f2c6164c7ff54ab$var$writeMessagesToFile(messages, file, lang);
    });
}





var $lCxOT = parcelRequire("lCxOT");
const $21feaa0600d2fcc9$var$lookingForString = "";
function $21feaa0600d2fcc9$export$6d942d15ad170ea0() {
    const srcLangDir = $8zHUo$path.resolve((0, $lCxOT.getKiwiDir)(), "zh-CN");
    let files = $8zHUo$fs.readdirSync(srcLangDir);
    files = files.filter((file)=>file.endsWith(".ts") && file !== "index.ts");
    const unUnsedKeys = [];
    files.map((file)=>{
        const srcFile = $8zHUo$path.resolve(srcLangDir, file);
        const { default: messages  } = require(srcFile);
        const filename = $8zHUo$path.basename(file, ".ts");
        (0, $lCxOT.traverse)(messages, (text, path1)=>{
            const key = `I18N.${filename}.${path1}`;
            const hasKey = $21feaa0600d2fcc9$var$recursiveReadFile("./src", key);
            if (!hasKey) unUnsedKeys.push(key);
        });
    });
    console.log(unUnsedKeys, "unUnsedKeys");
}
/**
 * 递归查找文件
 * @param fileName
 */ function $21feaa0600d2fcc9$var$recursiveReadFile(fileName, text) {
    let hasText = false;
    if (!$8zHUo$fs.existsSync(fileName)) return;
    if ($21feaa0600d2fcc9$var$isFile(fileName) && !hasText) $21feaa0600d2fcc9$var$check(fileName, text, ()=>{
        hasText = true;
    });
    if ($21feaa0600d2fcc9$var$isDirectory(fileName)) {
        var files = $8zHUo$fs.readdirSync(fileName).filter((file)=>{
            return !file.startsWith(".") && ![
                "node_modules",
                "build",
                "dist"
            ].includes(file);
        });
        files.forEach(function(val, key) {
            var temp = $8zHUo$path.join(fileName, val);
            if ($21feaa0600d2fcc9$var$isDirectory(temp) && !hasText) hasText = $21feaa0600d2fcc9$var$recursiveReadFile(temp, text);
            if ($21feaa0600d2fcc9$var$isFile(temp) && !hasText) $21feaa0600d2fcc9$var$check(temp, text, ()=>{
                hasText = true;
            });
        });
    }
    return hasText;
}
/**
 * 检查文件
 * @param fileName
 */ function $21feaa0600d2fcc9$var$check(fileName, text, callback) {
    var data = $21feaa0600d2fcc9$var$readFile(fileName);
    var exc = new RegExp(text);
    if (exc.test(data)) callback();
}
/**
 * 判断是文件夹
 * @param fileName
 */ function $21feaa0600d2fcc9$var$isDirectory(fileName) {
    if ($8zHUo$fs.existsSync(fileName)) return $8zHUo$fs.statSync(fileName).isDirectory();
}
/**
 * 判断是否是文件
 * @param fileName
 */ function $21feaa0600d2fcc9$var$isFile(fileName) {
    if ($8zHUo$fs.existsSync(fileName)) return $8zHUo$fs.statSync(fileName).isFile();
}
/**
 * 读取文件
 * @param fileName
 */ function $21feaa0600d2fcc9$var$readFile(fileName) {
    if ($8zHUo$fs.existsSync(fileName)) return $8zHUo$fs.readFileSync(fileName, "utf-8");
}






var $lCxOT = parcelRequire("lCxOT");





var $lCxOT = parcelRequire("lCxOT");



var $43550e751634938e$require$Buffer = $8zHUo$buffer.Buffer;

/**
 * @author zongwenjian
 * @desc 全量翻译 translate命令
 */ $8zHUo$tsnode.register({
    compilerOptions: {
        module: "commonjs"
    }
});
const $43550e751634938e$var$CONFIG = (0, $lCxOT.getProjectConfig)();
/**
 * 百度单次翻译任务
 * @param text 待翻译文案
 * @param toLang 目标语种
 */ function $43550e751634938e$var$translateTextByBaidu(text, toLang) {
    const { baiduApiKey: { appId: appId , appKey: appKey  } , baiduLangMap: baiduLangMap  } = $43550e751634938e$var$CONFIG;
    return (0, $lCxOT.withTimeout)(new Promise((resolve, reject)=>{
        $8zHUo$baidutranslate(appId, appKey, baiduLangMap[toLang], "zh")(text).then((data)=>{
            if (data && data.trans_result) resolve(data.trans_result);
            else reject(`\n百度翻译api调用异常 error_code: ${data.error_code}, error_msg: ${data.error_msg}`);
        }).catch((err)=>{
            reject(err);
        });
    }), 3000);
}
/** 文案首字母大小 变量小写 */ function $43550e751634938e$var$textToUpperCaseByFirstWord(text1) {
    // 翻译文案首字母大写，变量小写
    return text1 ? `${text1.charAt(0).toUpperCase()}${text1.slice(1)}`.replace(/(\{.*?\})/g, (text)=>text.toLowerCase()) : "";
}
/**
 * 使用google翻译所有待翻译的文案
 * @param untranslatedTexts 待翻译文案
 * @param toLang 目标语种
 */ async function $43550e751634938e$export$828fde262de403c3(untranslatedTexts, toLang) {
    const translateAllTexts = Object.keys(untranslatedTexts).map((key)=>{
        return (0, $lCxOT.translateText)(untranslatedTexts[key], toLang).then((translatedText)=>[
                key,
                translatedText
            ]);
    });
    return new Promise((resolve)=>{
        const result = {};
        Promise.all(translateAllTexts).then((res)=>{
            res.forEach(([key, translatedText])=>{
                result[key] = translatedText;
            });
            resolve(result);
        });
    });
}
/**
 * 使用百度翻译所有待翻译的文案
 * @param untranslatedTexts 待翻译文案
 * @param toLang 目标语种
 */ async function $43550e751634938e$export$53dee2673da84e09(untranslatedTexts, toLang) {
    return new Promise(async (resolve1)=>{
        const result = {};
        const untranslatedKeys = Object.keys(untranslatedTexts);
        const taskLists = {};
        let lastIndex = 0;
        // 由于百度api单词翻译字符长度限制，需要将待翻译的文案拆分成单个子任务
        untranslatedKeys.reduce((pre, next, index)=>{
            const byteLen = $43550e751634938e$require$Buffer.byteLength(pre, "utf8");
            if (byteLen > 5500) {
                // 获取翻译字节数，大于5500放到单独任务里面处理
                taskLists[lastIndex] = ()=>{
                    return new Promise((resolve)=>{
                        setTimeout(()=>{
                            resolve($43550e751634938e$var$translateTextByBaidu(pre, toLang));
                        }, 1500);
                    });
                };
                lastIndex = index;
                return untranslatedTexts[next];
            } else if (index === untranslatedKeys.length - 1) taskLists[lastIndex] = ()=>{
                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        resolve($43550e751634938e$var$translateTextByBaidu(`${pre}\n${untranslatedTexts[next]}`, toLang));
                    }, 1500);
                });
            };
            return `${pre}\n${untranslatedTexts[next]}`;
        }, "");
        // 由于百度api调用QPS只有1, 考虑网络延迟 每1.5s请求一个子任务
        const taskKeys = Object.keys(taskLists);
        if (taskKeys.length > 0) for(var i = 0; i < taskKeys.length; i++){
            const langIndexKey = taskKeys[i];
            const taskItemFun = taskLists[langIndexKey];
            const data = await taskItemFun();
            (data || []).forEach(({ dst: dst  }, index)=>{
                const currTextKey = untranslatedKeys[Number(langIndexKey) + index];
                result[currTextKey] = $43550e751634938e$var$textToUpperCaseByFirstWord(dst);
            });
        }
        resolve1(result);
    });
}
/**
 * 执行翻译任务，自动导入翻译结果
 * @param dstLang
 */ async function $43550e751634938e$var$runTranslateApi(dstLang, origin) {
    const untranslatedTexts = (0, $3faceb08b5c0afb6$export$a8d75d41e9235e7)(dstLang);
    let mocks = {};
    if (origin === "Google") mocks = await $43550e751634938e$export$828fde262de403c3(untranslatedTexts, dstLang);
    else mocks = await $43550e751634938e$export$53dee2673da84e09(untranslatedTexts, dstLang);
    const messagesToTranslate = Object.keys(mocks).map((key)=>[
            key,
            mocks[key]
        ]);
    if (messagesToTranslate.length === 0) return Promise.resolve();
    const content = (0, $8zHUo$d3dsv.tsvFormatRows)(messagesToTranslate);
    // 输出tsv文件
    return new Promise((resolve, reject)=>{
        const filePath = $8zHUo$path.resolve((0, $lCxOT.getLangDir)(dstLang), `${dstLang}_translate.tsv`);
        $8zHUo$fs.writeFile(filePath, content, (err)=>{
            if (err) reject(err);
            else {
                console.log(`${dstLang} 自动翻译完成`);
                // 自动导入翻译结果
                (0, $2f2c6164c7ff54ab$export$74455f5ca66c946c)(filePath, dstLang);
                resolve();
            }
        });
    });
}
/**
 * 全量翻译
 * @param origin 翻译源
 */ async function $43550e751634938e$export$d73ee8ef04f5226a(origin) {
    const langs = $43550e751634938e$var$CONFIG.distLangs;
    if (origin === "Google") {
        const mockPromise = langs.map((lang)=>{
            return $43550e751634938e$var$runTranslateApi(lang, origin);
        });
        return Promise.all(mockPromise);
    } else {
        for(var i = 0; i < langs.length; i++)await $43550e751634938e$var$runTranslateApi(langs[i], origin);
        return Promise.resolve();
    }
}



/**
 * @author linhuiw
 * @desc 翻译方法
 * @TODO: index 文件需要添加 mock
 */ $8zHUo$tsnode.register({
    compilerOptions: {
        module: "commonjs"
    }
});
const $3faceb08b5c0afb6$var$CONFIG = (0, $lCxOT.getProjectConfig)();
/**
 * 获取中文文案
 */ function $3faceb08b5c0afb6$var$getSourceText() {
    const srcLangDir = (0, $lCxOT.getLangDir)($3faceb08b5c0afb6$var$CONFIG.srcLang);
    const srcFile = $8zHUo$path.resolve(srcLangDir, "index.ts");
    const { default: texts  } = require(srcFile);
    return texts;
}
/**
 * 获取对应语言文案
 * @param dstLang
 */ function $3faceb08b5c0afb6$var$getDistText(dstLang) {
    const distLangDir = (0, $lCxOT.getLangDir)(dstLang);
    const distFile = $8zHUo$path.resolve(distLangDir, "index.ts");
    let distTexts = {};
    if ($8zHUo$fs.existsSync(distFile)) distTexts = require(distFile).default;
    return distTexts;
}
/**
 * 获取所有未翻译的文案
 * @param 目标语种
 */ function $3faceb08b5c0afb6$export$a8d75d41e9235e7(toLang) {
    const texts = $3faceb08b5c0afb6$var$getSourceText();
    const distTexts = $3faceb08b5c0afb6$var$getDistText(toLang);
    const untranslatedTexts = {};
    /** 遍历文案 */ (0, $lCxOT.traverse)(texts, (text, path1)=>{
        const distText = $8zHUo$lodash.get(distTexts, path1);
        if (text === distText || !distText) untranslatedTexts[path1] = text;
    });
    return untranslatedTexts;
}
/**
 * Mock 对应语言
 * @param dstLang
 */ async function $3faceb08b5c0afb6$var$mockCurrentLang(dstLang, origin) {
    const untranslatedTexts = $3faceb08b5c0afb6$export$a8d75d41e9235e7(dstLang);
    let mocks = {};
    if (origin === "Google") mocks = await (0, $43550e751634938e$export$828fde262de403c3)(untranslatedTexts, dstLang);
    else mocks = await (0, $43550e751634938e$export$53dee2673da84e09)(untranslatedTexts, dstLang);
    /** 所有任务执行完毕后，写入mock文件 */ return $3faceb08b5c0afb6$var$writeMockFile(dstLang, mocks);
}
/**
 * 写入 Mock 文件
 * @param dstLang
 * @param mocks
 */ function $3faceb08b5c0afb6$var$writeMockFile(dstLang, mocks) {
    const fileContent = "export default " + JSON.stringify(mocks, null, 2);
    const filePath = $8zHUo$path.resolve((0, $lCxOT.getLangDir)(dstLang), "mock.ts");
    return new Promise((resolve, reject)=>{
        $8zHUo$fs.writeFile(filePath, fileContent, (err)=>{
            if (err) reject(err);
            else resolve();
        });
    });
}
/**
 * Mock 语言的未翻译的文案
 * @param lang
 */ async function $3faceb08b5c0afb6$export$d24e50817704e115(origin) {
    const langs = $3faceb08b5c0afb6$var$CONFIG.distLangs;
    if (origin === "Google") {
        const mockPromise = langs.map((lang)=>{
            return $3faceb08b5c0afb6$var$mockCurrentLang(lang, origin);
        });
        return Promise.all(mockPromise);
    } else {
        for(var i = 0; i < langs.length; i++)await $3faceb08b5c0afb6$var$mockCurrentLang(langs[i], origin);
        return Promise.resolve();
    }
}








/**
 * 获取文件夹下符合要求的所有文件
 * @function getSpecifiedFiles
 * @param  {string} dir 路径
 * @param {ignoreDirectory} 忽略文件夹 {ignoreFile} 忽略的文件
 */ function $2335f6f415255376$export$4a3fe307646dd5cf(dir, ignoreDirectory = "", ignoreFile = "") {
    return $8zHUo$fs.readdirSync(dir).reduce((files, file)=>{
        const name = $8zHUo$path.join(dir, file);
        const isDirectory1 = $8zHUo$fs.statSync(name).isDirectory();
        const isFile1 = $8zHUo$fs.statSync(name).isFile();
        if (isDirectory1) return files.concat($2335f6f415255376$export$4a3fe307646dd5cf(name, ignoreDirectory, ignoreFile));
        const isIgnoreDirectory = !ignoreDirectory || ignoreDirectory && !$8zHUo$path.dirname(name).split("/").includes(ignoreDirectory);
        const isIgnoreFile = !ignoreFile || ignoreFile && $8zHUo$path.basename(name) !== ignoreFile;
        if (isFile1 && isIgnoreDirectory && isIgnoreFile) return files.concat(name);
        return files;
    }, []);
}
/**
 * 读取文件
 * @param fileName
 */ function $2335f6f415255376$export$72c04af63de9061a(fileName) {
    if ($8zHUo$fs.existsSync(fileName)) return $8zHUo$fs.readFileSync(fileName, "utf-8");
}
/**
 * 读取文件
 * @param fileName
 */ function $2335f6f415255376$export$552bfb764b5cd2b4(filePath, file) {
    if ($8zHUo$fs.existsSync(filePath)) $8zHUo$fs.writeFileSync(filePath, file);
}
/**
 * 判断是文件
 * @param path
 */ function $2335f6f415255376$export$be78b3111c50efdd(path1) {
    return $8zHUo$fs.statSync(path1).isFile();
}
/**
 * 判断是文件夹
 * @param path
 */ function $2335f6f415255376$export$38412a8139e981aa(path2) {
    return $8zHUo$fs.statSync(path2).isDirectory();
}






/** unicode cjk 中日韩文 范围 */ const $8d1bd1457013f191$var$DOUBLE_BYTE_REGEX = /[\u4E00-\u9FFF]/g;
function $8d1bd1457013f191$var$transerI18n(code, filename, lang) {
    if (lang === "ts") return $8d1bd1457013f191$var$typescriptI18n(code, filename);
    else return $8d1bd1457013f191$var$javascriptI18n(code, filename);
}
function $8d1bd1457013f191$var$getScriptKind(fileName) {
    return fileName.endsWith(".ts") ? $8zHUo$typescript.ScriptKind.TS : $8zHUo$typescript.ScriptKind.TSX;
}
function $8d1bd1457013f191$var$javascriptI18n(code, filename) {
    let arr = [];
    let visitor = {
        StringLiteral (path) {
            if (path.node.value.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) arr.push(path.node.value);
        }
    };
    let arrayPlugin = {
        visitor: visitor
    };
    $8zHUo$babelcore.transformSync(code.toString(), {
        filename: filename,
        plugins: [
            arrayPlugin
        ]
    });
    return arr;
}
function $8d1bd1457013f191$var$typescriptI18n(code, fileName) {
    let arr = [];
    const scriptKind = $8d1bd1457013f191$var$getScriptKind(fileName);
    const ast = $8zHUo$typescript.createSourceFile("", code, $8zHUo$typescript.ScriptTarget.ES2015, true, scriptKind);
    function visit(node) {
        switch(node.kind){
            case $8zHUo$typescript.SyntaxKind.StringLiteral:
                {
                    /** 判断 Ts 中的字符串含有中文 */ const { text: text  } = node;
                    if (text.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) arr.push(text);
                    break;
                }
        }
        $8zHUo$typescript.forEachChild(node, visit);
    }
    $8zHUo$typescript.forEachChild(ast, visit);
    return arr;
}
/**
 * 去掉文件中的注释
 * @param code
 * @param fileName
 */ function $8d1bd1457013f191$var$removeFileComment(code, fileName) {
    const printer = $8zHUo$typescript.createPrinter({
        removeComments: true
    });
    const sourceFile = $8zHUo$typescript.createSourceFile("", code, $8zHUo$typescript.ScriptTarget.ES2015, true, $8d1bd1457013f191$var$getScriptKind(fileName));
    return printer.printFile(sourceFile);
}
/**
 * 查找 Ts 文件中的中文
 * @param code
 */ function $8d1bd1457013f191$var$findTextInTs(code, fileName) {
    const matches = [];
    const ast = $8zHUo$typescript.createSourceFile("", code, $8zHUo$typescript.ScriptTarget.ES2015, true, $8d1bd1457013f191$var$getScriptKind(fileName));
    function visit(node) {
        switch(node.kind){
            case $8zHUo$typescript.SyntaxKind.StringLiteral:
                {
                    /** 判断 Ts 中的字符串含有中文 */ const { text: text  } = node;
                    if (text.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) {
                        const start = node.getStart();
                        const end = node.getEnd();
                        const range = {
                            start: start,
                            end: end
                        };
                        matches.push({
                            range: range,
                            text: text,
                            isString: true
                        });
                    }
                    break;
                }
            case $8zHUo$typescript.SyntaxKind.JsxElement:
                {
                    const { children: children  } = node;
                    children.forEach((child)=>{
                        if (child.kind === $8zHUo$typescript.SyntaxKind.JsxText) {
                            const text = child.getText();
                            /** 修复注释含有中文的情况，Angular 文件错误的 Ast 情况 */ const noCommentText = $8d1bd1457013f191$var$removeFileComment(text, fileName);
                            if (noCommentText.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) {
                                const start = child.getStart();
                                const end = child.getEnd();
                                const range = {
                                    start: start,
                                    end: end
                                };
                                matches.push({
                                    range: range,
                                    text: text.trim(),
                                    isString: false
                                });
                            }
                        }
                    });
                    break;
                }
            case $8zHUo$typescript.SyntaxKind.TemplateExpression:
                {
                    const { pos: pos , end: end  } = node;
                    const templateContent = code.slice(pos, end);
                    if (templateContent.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) {
                        const start = node.getStart();
                        const end = node.getEnd();
                        const range = {
                            start: start,
                            end: end
                        };
                        matches.push({
                            range: range,
                            text: code.slice(start + 1, end - 1),
                            isString: true
                        });
                    }
                    break;
                }
            case $8zHUo$typescript.SyntaxKind.NoSubstitutionTemplateLiteral:
                {
                    const { pos: pos , end: end  } = node;
                    const templateContent = code.slice(pos, end);
                    if (templateContent.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) {
                        const start = node.getStart();
                        const end = node.getEnd();
                        const range = {
                            start: start,
                            end: end
                        };
                        matches.push({
                            range: range,
                            text: code.slice(start + 1, end - 1),
                            isString: true
                        });
                    }
                }
        }
        $8zHUo$typescript.forEachChild(node, visit);
    }
    $8zHUo$typescript.forEachChild(ast, visit);
    return matches;
}
/**
 * 查找 HTML 文件中的中文
 * @param code
 */ function $8d1bd1457013f191$var$findTextInHtml(code) {
    const matches = [];
    const ast = $8zHUo$angularcompiler.parseTemplate(code, "ast.html", {
        preserveWhitespaces: false
    });
    function visit(node) {
        const value = node.value;
        if (value && typeof value === "string" && value.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) {
            const valueSpan = node.valueSpan || node.sourceSpan;
            let { start: { offset: startOffset  } , end: { offset: endOffset  }  } = valueSpan;
            const nodeValue = code.slice(startOffset, endOffset);
            let isString = false;
            /** 处理带引号的情况 */ if (nodeValue.charAt(0) === '"' || nodeValue.charAt(0) === "'") isString = true;
            const range = {
                start: startOffset,
                end: endOffset
            };
            matches.push({
                range: range,
                text: value,
                isString: isString
            });
        } else if (value && typeof value === "object" && value.source && value.source.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) {
            /**
       * <span>{{expression}}中文</span> 这种情况的兼容
       */ const chineseMatches = value.source.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX);
            chineseMatches.map((match)=>{
                const valueSpan = node.valueSpan || node.sourceSpan;
                let { start: { offset: startOffset  } , end: { offset: endOffset  }  } = valueSpan;
                const nodeValue = code.slice(startOffset, endOffset);
                const start = nodeValue.indexOf(match);
                const end = start + match.length;
                const range = {
                    start: start,
                    end: end
                };
                matches.push({
                    range: range,
                    text: match[0],
                    isString: false
                });
            });
        }
        if (node.children && node.children.length) node.children.forEach(visit);
        if (node.attributes && node.attributes.length) node.attributes.forEach(visit);
    }
    if (ast.nodes && ast.nodes.length) ast.nodes.forEach(visit);
    return matches;
}
/**
 * 递归匹配vue代码的中文
 * @param code
 */ function $8d1bd1457013f191$export$b43e0382d60e2aaf(code) {
    let rexspace1 = new RegExp(/&ensp;/, "g");
    let rexspace2 = new RegExp(/&emsp;/, "g");
    let rexspace3 = new RegExp(/&nbsp;/, "g");
    code = code.replace(rexspace1, "ccsp&;").replace(rexspace2, "ecsp&;").replace(rexspace3, "ncsp&;");
    let coverRex1 = new RegExp(/ccsp&;/, "g");
    let coverRex2 = new RegExp(/ecsp&;/, "g");
    let coverRex3 = new RegExp(/ncsp&;/, "g");
    let matches = [];
    var result;
    const vueObejct = $8zHUo$vuetemplatecompiler.compile(code.toString(), {
        outputSourceRange: true
    });
    let vueAst = vueObejct.ast;
    let expressTemp = $8d1bd1457013f191$var$findVueText(vueAst);
    expressTemp.forEach((item)=>{
        item.arrf = [
            item.start,
            item.end
        ];
    });
    matches = expressTemp;
    let outcode = vueObejct.render.toString().replace("with(this)", "function a()");
    let vueTemp = $8d1bd1457013f191$var$transerI18n(outcode, "as.vue", null);
    /**删除所有的html中的头部空格 */ vueTemp = vueTemp.map((item)=>{
        return item.trim();
    });
    vueTemp = Array.from(new Set(vueTemp));
    let codeStaticArr = [];
    vueObejct.staticRenderFns.forEach((item)=>{
        let childcode = item.toString().replace("with(this)", "function a()");
        let vueTempChild = $8d1bd1457013f191$var$transerI18n(childcode, "as.vue", null);
        codeStaticArr = codeStaticArr.concat(Array.from(new Set(vueTempChild)));
    });
    vueTemp = Array.from(new Set(codeStaticArr.concat(vueTemp)));
    vueTemp.forEach((item)=>{
        let items = item.replace(/\{/g, "\\{").replace(/\}/g, "\\}").replace(/\$/g, "\\$").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/\+/g, "\\+").replace(/\*/g, "\\*").replace(/\^/g, "\\^");
        let rex = new RegExp(items, "g");
        let codeTemplate = code.substring(vueObejct.ast.start, vueObejct.ast.end);
        while(result = rex.exec(codeTemplate)){
            let res = result;
            let last = rex.lastIndex;
            last = last - (res[0].length - res[0].trimRight().length);
            const range = {
                start: res.index,
                end: last
            };
            matches.push({
                arrf: [
                    res.index,
                    last
                ],
                range: range,
                text: res[0].trimRight().replace(coverRex1, "&ensp;").replace(coverRex2, "&emsp;").replace(coverRex3, "&nbsp;"),
                isString: codeTemplate.substr(res.index - 1, 1) === '"' && codeTemplate.substr(last, 1) === '"' || codeTemplate.substr(res.index - 1, 1) === "'" && codeTemplate.substr(last, 1) === "'" ? true : false
            });
        }
    });
    let matchesTemp = matches;
    let matchesTempResult = matchesTemp.filter((item, index)=>{
        let canBe = true;
        matchesTemp.forEach((items)=>{
            if (item.arrf[0] > items.arrf[0] && item.arrf[1] <= items.arrf[1] || item.arrf[0] >= items.arrf[0] && item.arrf[1] < items.arrf[1] || item.arrf[0] > items.arrf[0] && item.arrf[1] < items.arrf[1]) canBe = false;
        });
        if (canBe) return item;
    });
    const sfc = $8zHUo$vuetemplatecompiler.parseComponent(code.toString());
    return matchesTempResult.concat($8d1bd1457013f191$var$findTextInVueTs(sfc.script.content, "AS", sfc.script.start));
}
function $8d1bd1457013f191$var$findTextInVueTs(code, fileName, startNum) {
    const matches = [];
    const ast = $8zHUo$typescript.createSourceFile("", code, $8zHUo$typescript.ScriptTarget.ES2015, true, $8zHUo$typescript.ScriptKind.TS);
    function visit(node) {
        switch(node.kind){
            case $8zHUo$typescript.SyntaxKind.StringLiteral:
                {
                    /** 判断 Ts 中的字符串含有中文 */ const { text: text  } = node;
                    if (text.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) {
                        const start = node.getStart();
                        const end = node.getEnd();
                        /** 加一，减一的原因是，去除引号 */ const range = {
                            start: start + startNum,
                            end: end + startNum
                        };
                        matches.push({
                            range: range,
                            text: text,
                            isString: true
                        });
                    }
                    break;
                }
            case $8zHUo$typescript.SyntaxKind.TemplateExpression:
                {
                    const { pos: pos , end: end  } = node;
                    let templateContent = code.slice(pos, end);
                    templateContent = templateContent.toString().replace(/\$\{[^\}]+\}/, "");
                    if (templateContent.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) {
                        const start = node.getStart();
                        const end = node.getEnd();
                        /** 加一，减一的原因是，去除`号 */ const range = {
                            start: start + startNum,
                            end: end + startNum
                        };
                        matches.push({
                            range: range,
                            text: code.slice(start + 1, end - 1),
                            isString: true
                        });
                    }
                    break;
                }
        }
        $8zHUo$typescript.forEachChild(node, visit);
    }
    $8zHUo$typescript.forEachChild(ast, visit);
    return matches;
}
function $8d1bd1457013f191$var$findVueText(ast1) {
    let arr = [];
    const regex1 = /\`(.+?)\`/g;
    function emun(ast) {
        if (ast.expression) {
            let text = ast.expression.match(regex1);
            if (text && text[0].match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) text.forEach((itemText)=>{
                const varInStr = itemText.match(/(\$\{[^\}]+?\})/g);
                if (varInStr) itemText.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX) && arr.push({
                    text: " " + itemText,
                    range: {
                        start: ast.start + 2,
                        end: ast.end - 2
                    },
                    isString: true
                });
                else itemText.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX) && arr.push({
                    text: itemText,
                    range: {
                        start: ast.start,
                        end: ast.end
                    },
                    isString: false
                });
            });
            else ast.tokens && ast.tokens.forEach((element)=>{
                if (typeof element === "string" && element.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX)) arr.push({
                    text: element,
                    range: {
                        start: ast.start + ast.text.indexOf(element),
                        end: ast.start + ast.text.indexOf(element) + element.length
                    },
                    isString: false
                });
            });
        } else if (!ast.expression && ast.text) ast.text.match($8d1bd1457013f191$var$DOUBLE_BYTE_REGEX) && arr.push({
            text: ast.text,
            range: {
                start: ast.start,
                end: ast.end
            },
            isString: false
        });
        else ast.children && ast.children.forEach((item)=>{
            emun(item);
        });
    }
    emun(ast1);
    return arr;
}
/**
 * 递归匹配代码的中文
 * @param code
 */ function $8d1bd1457013f191$export$63c58ef3fd2e7c9b(code, fileName) {
    if (fileName.endsWith(".html")) return $8d1bd1457013f191$var$findTextInHtml(code);
    else if (fileName.endsWith(".vue")) return $8d1bd1457013f191$export$b43e0382d60e2aaf(code);
    else return $8d1bd1457013f191$var$findTextInTs(code, fileName);
}



var $d8Eqm = parcelRequire("d8Eqm");

var $lCxOT = parcelRequire("lCxOT");





var $d8Eqm = parcelRequire("d8Eqm");

var $lCxOT = parcelRequire("lCxOT");
const $46f7c97238b1b2f2$var$CONFIG = (0, $lCxOT.getProjectConfig)();
const $46f7c97238b1b2f2$var$srcLangDir = (0, $lCxOT.getLangDir)($46f7c97238b1b2f2$var$CONFIG.srcLang);
function $46f7c97238b1b2f2$var$updateLangFiles(keyValue, text, validateDuplicate) {
    if (!$8zHUo$lodash.startsWith(keyValue, "I18N.")) return;
    const [, filename, ...restPath] = keyValue.split(".");
    const fullKey = restPath.join(".");
    const targetFilename = `${$46f7c97238b1b2f2$var$srcLangDir}/${filename}.ts`;
    if (!$8zHUo$fsextra.existsSync(targetFilename)) {
        $8zHUo$fsextra.writeFileSync(targetFilename, $46f7c97238b1b2f2$var$generateNewLangFile(fullKey, text));
        $46f7c97238b1b2f2$var$addImportToMainLangFile(filename);
        (0, $lCxOT.successInfo)(`成功新建语言文件 ${targetFilename}`);
    } else {
        // 清除 require 缓存，解决手动更新语言文件后再自动抽取，导致之前更新失效的问题
        const mainContent = (0, $d8Eqm.getLangData)(targetFilename);
        const obj = mainContent;
        if (Object.keys(obj).length === 0) (0, $lCxOT.failInfo)(`${filename} 解析失败，该文件包含的文案无法自动补全`);
        if (validateDuplicate && $8zHUo$lodash.get(obj, fullKey) !== undefined) {
            (0, $lCxOT.failInfo)(`${targetFilename} 中已存在 key 为 \`${fullKey}\` 的翻译，请重新命名变量`);
            throw new Error("duplicate");
        }
        // \n 会被自动转义成 \\n，这里转回来
        text = text.replace(/\\n/gm, "\n");
        $8zHUo$lodash.set(obj, fullKey, text);
        $8zHUo$fsextra.writeFileSync(targetFilename, $46f7c97238b1b2f2$var$prettierFile(`export default ${JSON.stringify(obj, null, 2)}`));
    }
}
/**
 * 使用 Prettier 格式化文件
 * @param fileContent
 */ function $46f7c97238b1b2f2$var$prettierFile(fileContent) {
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
function $46f7c97238b1b2f2$var$generateNewLangFile(key, value) {
    const obj = $8zHUo$lodash.set({}, key, value);
    return $46f7c97238b1b2f2$var$prettierFile(`export default ${JSON.stringify(obj, null, 2)}`);
}
function $46f7c97238b1b2f2$var$addImportToMainLangFile(newFilename) {
    let mainContent = "";
    if ($8zHUo$fsextra.existsSync(`${$46f7c97238b1b2f2$var$srcLangDir}/index.ts`)) {
        mainContent = $8zHUo$fsextra.readFileSync(`${$46f7c97238b1b2f2$var$srcLangDir}/index.ts`, "utf8");
        mainContent = mainContent.replace(/^(\s*import.*?;)$/m, `$1\nimport ${newFilename} from './${newFilename}';`);
        if (/(}\);)/.test(mainContent)) {
            if (/\,\n(}\);)/.test(mainContent)) /** 最后一行包含,号 */ mainContent = mainContent.replace(/(}\);)/, `  ${newFilename},\n$1`);
            else /** 最后一行不包含,号 */ mainContent = mainContent.replace(/\n(}\);)/, `,\n  ${newFilename},\n$1`);
        }
        // 兼容 export default { common };的写法
        if (/(};)/.test(mainContent)) {
            if (/\,\n(};)/.test(mainContent)) /** 最后一行包含,号 */ mainContent = mainContent.replace(/(};)/, `  ${newFilename},\n$1`);
            else /** 最后一行不包含,号 */ mainContent = mainContent.replace(/\n(};)/, `,\n  ${newFilename},\n$1`);
        }
    } else mainContent = `import ${newFilename} from './${newFilename}';\n\nexport default Object.assign({}, {\n  ${newFilename},\n});`;
    $8zHUo$fsextra.writeFileSync(`${$46f7c97238b1b2f2$var$srcLangDir}/index.ts`, mainContent);
}
/**
 * 检查是否添加 import I18N 命令
 * @param filePath 文件路径
 */ function $46f7c97238b1b2f2$export$ea0561b3fcb00eed(filePath) {
    const code = (0, $2335f6f415255376$export$72c04af63de9061a)(filePath);
    const ast = $8zHUo$typescript.createSourceFile("", code, $8zHUo$typescript.ScriptTarget.ES2015, true, $8zHUo$typescript.ScriptKind.TSX);
    let hasImportI18N1 = false;
    function visit(node) {
        if (node.kind === $8zHUo$typescript.SyntaxKind.ImportDeclaration) {
            const importClause = node.importClause;
            // import I18N from 'src/utils/I18N';
            if ($8zHUo$lodash.get(importClause, "kind") === $8zHUo$typescript.SyntaxKind.ImportClause) {
                if (importClause.name) {
                    if (importClause.name.escapedText === "I18N") hasImportI18N1 = true;
                } else {
                    const namedBindings = importClause.namedBindings;
                    // import { I18N } from 'src/utils/I18N';
                    if (namedBindings.kind === $8zHUo$typescript.SyntaxKind.NamedImports) namedBindings.elements.forEach((element)=>{
                        if (element.kind === $8zHUo$typescript.SyntaxKind.ImportSpecifier && $8zHUo$lodash.get(element, "name.escapedText") === "I18N") hasImportI18N1 = true;
                    });
                    // import * as I18N from 'src/utils/I18N';
                    if (namedBindings.kind === $8zHUo$typescript.SyntaxKind.NamespaceImport) {
                        if ($8zHUo$lodash.get(namedBindings, "name.escapedText") === "I18N") hasImportI18N1 = true;
                    }
                }
            }
        }
    }
    $8zHUo$typescript.forEachChild(ast, visit);
    return hasImportI18N1;
}
/**
 * 在合适的位置添加 import I18N 语句
 * @param filePath 文件路径
 */ function $46f7c97238b1b2f2$export$fa56d2129cba1df4(filePath) {
    const code = (0, $2335f6f415255376$export$72c04af63de9061a)(filePath);
    const ast = $8zHUo$typescript.createSourceFile("", code, $8zHUo$typescript.ScriptTarget.ES2015, true, $8zHUo$typescript.ScriptKind.TSX);
    const isTsFile = $8zHUo$lodash.endsWith(filePath, ".ts");
    const isTsxFile = $8zHUo$lodash.endsWith(filePath, ".tsx");
    const isVueFile = $8zHUo$lodash.endsWith(filePath, ".vue");
    if (isTsFile || isTsxFile) {
        const importStatement = `${$46f7c97238b1b2f2$var$CONFIG.importI18N}\n`;
        const pos = ast.getStart(ast, false);
        const updateCode = code.slice(0, pos) + importStatement + code.slice(pos);
        return updateCode;
    } else if (isVueFile) {
        const importStatement = `${$46f7c97238b1b2f2$var$CONFIG.importI18N}\n`;
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
 */ function $46f7c97238b1b2f2$export$6514dff9e93abd1(filePath, arg, val, validateDuplicate, needWrite = true) {
    const code = (0, $2335f6f415255376$export$72c04af63de9061a)(filePath);
    const isHtmlFile = $8zHUo$lodash.endsWith(filePath, ".html");
    const isVueFile = $8zHUo$lodash.endsWith(filePath, ".vue");
    let newCode = code;
    let finalReplaceText = arg.text;
    const { start: start , end: end  } = arg.range;
    // 若是字符串，删掉两侧的引号
    if (arg.isString) {
        // 如果引号左侧是 等号，则可能是 jsx 的 props，此时要替换成 {
        const preTextStart = start - 1;
        const [last2Char, last1Char] = code.slice(preTextStart, start + 1).split("");
        let finalReplaceVal = val;
        if (last2Char === "=") {
            if (isHtmlFile) finalReplaceVal = "{{" + val + "}}";
            else if (isVueFile) finalReplaceVal = "{{" + val + "}}";
            else finalReplaceVal = "{" + val + "}";
        }
        // 若是模板字符串，看看其中是否包含变量
        if (last1Char === "`") {
            const varInStr = arg.text.match(/(\$\{[^\}]+?\})/g);
            if (varInStr) {
                const kvPair = varInStr.map((str, index)=>{
                    return `val${index + 1}: ${str.replace(/^\${([^\}]+)\}$/, "$1")}`;
                });
                finalReplaceVal = `I18N.template(${val}, { ${kvPair.join(",\n")} })`;
                varInStr.forEach((str, index)=>{
                    finalReplaceText = finalReplaceText.replace(str, `{val${index + 1}}`);
                });
            }
        }
        newCode = `${code.slice(0, start)}${finalReplaceVal}${code.slice(end)}`;
    } else if (isHtmlFile || isVueFile) newCode = `${code.slice(0, start)}{{${val}}}${code.slice(end)}`;
    else newCode = `${code.slice(0, start)}{${val}}${code.slice(end)}`;
    try {
        if (needWrite) // 更新语言文件
        $46f7c97238b1b2f2$var$updateLangFiles(val, finalReplaceText, validateDuplicate);
        // 若更新成功再替换代码
        return (0, $2335f6f415255376$export$552bfb764b5cd2b4)(filePath, newCode);
    } catch (e) {
        return Promise.reject(e.message);
    }
}



var $lCxOT = parcelRequire("lCxOT");

const $78271ebc6bfb8009$var$CONFIG = (0, $lCxOT.getProjectConfig)();
/**
 * 剔除 kiwiDir 下的文件
 */ function $78271ebc6bfb8009$var$removeLangsFiles(files) {
    const langsDir = $8zHUo$path.resolve($8zHUo$process.cwd(), $78271ebc6bfb8009$var$CONFIG.kiwiDir);
    return files.filter((file)=>{
        const completeFile = $8zHUo$path.resolve($8zHUo$process.cwd(), file);
        return !completeFile.includes(langsDir);
    });
}
/**
 * 递归匹配项目中所有的代码的中文
 */ function $78271ebc6bfb8009$var$findAllChineseText(dir) {
    const first = dir.split(",")[0];
    let files = [];
    if ((0, $2335f6f415255376$export$38412a8139e981aa)(first)) {
        const dirPath = $8zHUo$path.resolve($8zHUo$process.cwd(), dir);
        files = (0, $2335f6f415255376$export$4a3fe307646dd5cf)(dirPath, $78271ebc6bfb8009$var$CONFIG.ignoreDir, $78271ebc6bfb8009$var$CONFIG.ignoreFile);
    } else files = $78271ebc6bfb8009$var$removeLangsFiles(dir.split(","));
    const filterFiles = files.filter((file)=>{
        return (0, $2335f6f415255376$export$be78b3111c50efdd)(file) && file.endsWith(".ts") || file.endsWith(".tsx") || file.endsWith(".vue");
    });
    const allTexts = filterFiles.reduce((pre, file)=>{
        const code = (0, $2335f6f415255376$export$72c04af63de9061a)(file);
        const texts = (0, $8d1bd1457013f191$export$63c58ef3fd2e7c9b)(code, file);
        // 调整文案顺序，保证从后面的文案往前替换，避免位置更新导致替换出错
        const sortTexts = $8zHUo$lodash.sortBy(texts, (obj)=>-obj.range.start);
        if (texts.length > 0) console.log(`${(0, $lCxOT.highlightText)(file)} 发现 ${(0, $lCxOT.highlightText)(texts.length)} 处中文文案`);
        return texts.length > 0 ? pre.concat({
            file: file,
            texts: sortTexts
        }) : pre;
    }, []);
    return allTexts;
}
/**
 * 处理作为key值的翻译原文
 */ function $78271ebc6bfb8009$var$getTransOriginText(text) {
    // 避免翻译的字符里包含数字或者特殊字符等情况，只过滤出汉字和字母
    const reg = /[a-zA-Z\u4e00-\u9fa5]+/g;
    const findText = text.match(reg) || [];
    const transOriginText = findText ? findText.join("").slice(0, 5) : "\u4E2D\u6587\u7B26\u53F7";
    return transOriginText;
}
/**
 * @param currentFilename 文件路径
 * @returns string[]
 */ function $78271ebc6bfb8009$var$getSuggestion(currentFilename) {
    let suggestion = [];
    const suggestPageRegex = /\/pages\/\w+\/([^\/]+)\/([^\/\.]+)/;
    if (currentFilename.includes("/pages/")) suggestion = currentFilename.match(suggestPageRegex);
    if (suggestion) suggestion.shift();
    /** 如果没有匹配到 Key */ if (!(suggestion && suggestion.length)) {
        const names = $8zHUo$slash2(currentFilename).split("/");
        const fileName = $8zHUo$lodash.last(names);
        const fileKey = fileName.split(".")[0].replace(new RegExp("-", "g"), "_");
        const dir = names[names.length - 2].replace(new RegExp("-", "g"), "_");
        if (dir === fileKey) suggestion = [
            dir
        ];
        else suggestion = [
            dir,
            fileKey
        ];
    }
    return suggestion;
}
/**
 * 统一处理key值，已提取过的文案直接替换，翻译后的key若相同，加上出现次数
 * @param currentFilename 文件路径
 * @param langsPrefix 替换后的前缀
 * @param translateTexts 翻译后的key值
 * @param targetStrs 当前文件提取后的文案
 * @returns any[] 最终可用于替换的key值和文案
 */ function $78271ebc6bfb8009$var$getReplaceableStrs(currentFilename, langsPrefix, translateTexts, targetStrs) {
    const finalLangObj = (0, $d8Eqm.getSuggestLangObj)();
    const virtualMemory = {};
    const suggestion = $78271ebc6bfb8009$var$getSuggestion(currentFilename);
    const replaceableStrs = targetStrs.reduce((prev, curr, i)=>{
        const _text = curr.text;
        let key = (0, $lCxOT.findMatchKey)(finalLangObj, _text);
        if (key) key = key.replace(/-/g, "_");
        if (!virtualMemory[_text]) {
            if (key) {
                virtualMemory[_text] = key;
                return prev.concat({
                    target: curr,
                    key: key,
                    needWrite: false
                });
            }
            const transText = translateTexts[i] && $8zHUo$lodash.camelCase(translateTexts[i]);
            let transKey = `${suggestion.length ? suggestion.join(".") + "." : ""}${transText}`;
            transKey = transKey.replace(/-/g, "_");
            if (langsPrefix) transKey = `${langsPrefix}.${transText}`;
            let occurTime = 1;
            // 防止出现前四位相同但是整体文案不同的情况
            while((0, $lCxOT.findMatchValue)(finalLangObj, transKey) !== _text && $8zHUo$lodash.keys(finalLangObj).includes(`${transKey}${occurTime >= 2 ? occurTime : ""}`))occurTime++;
            if (occurTime >= 2) transKey = `${transKey}${occurTime}`;
            virtualMemory[_text] = transKey;
            finalLangObj[transKey] = _text;
            return prev.concat({
                target: curr,
                key: transKey,
                needWrite: true
            });
        } else return prev.concat({
            target: curr,
            key: virtualMemory[_text],
            needWrite: true
        });
    }, []);
    return replaceableStrs;
}
/**
 * 递归匹配项目中所有的代码的中文
 * @param {dirPath} 文件夹路径
 */ function $78271ebc6bfb8009$export$239a6816282b2f16({ dirPath: dirPath , prefix: prefix  }) {
    const dir = dirPath || "./";
    // 去除I18N
    const langsPrefix = prefix ? prefix.replace(/^I18N\./, "") : null;
    // 翻译源配置错误，则终止
    const origin = $78271ebc6bfb8009$var$CONFIG.defaultTranslateKeyApi || "Pinyin";
    if (![
        "Pinyin",
        "Google",
        "Baidu"
    ].includes($78271ebc6bfb8009$var$CONFIG.defaultTranslateKeyApi)) {
        console.log(`Kiwi 仅支持 ${(0, $lCxOT.highlightText)("Pinyin\u3001Google\u3001Baidu")}，请修改 ${(0, $lCxOT.highlightText)("defaultTranslateKeyApi")} 配置项`);
        return;
    }
    const allTargetStrs = $78271ebc6bfb8009$var$findAllChineseText(dir);
    if (allTargetStrs.length === 0) {
        console.log((0, $lCxOT.highlightText)("\u6CA1\u6709\u53D1\u73B0\u53EF\u66FF\u6362\u7684\u6587\u6848\uFF01"));
        return;
    }
    // 提示翻译源
    if ($78271ebc6bfb8009$var$CONFIG.defaultTranslateKeyApi === "Pinyin") console.log(`当前使用 ${(0, $lCxOT.highlightText)("Pinyin")} 作为key值的翻译源，若想得到更好的体验，可配置 ${(0, $lCxOT.highlightText)("googleApiKey")} 或 ${(0, $lCxOT.highlightText)("baiduApiKey")}，并切换 ${(0, $lCxOT.highlightText)("defaultTranslateKeyApi")}`);
    else console.log(`当前使用 ${(0, $lCxOT.highlightText)($78271ebc6bfb8009$var$CONFIG.defaultTranslateKeyApi)} 作为key值的翻译源`);
    console.log("\u5373\u5C06\u622A\u53D6\u6BCF\u4E2A\u4E2D\u6587\u6587\u6848\u7684\u524D5\u4F4D\u7FFB\u8BD1\u751F\u6210key\u503C\uFF0C\u5E76\u66FF\u6362\u4E2D...");
    // 对当前文件进行文案key生成和替换
    const generateKeyAndReplace = async (item)=>{
        const currentFilename = item.file;
        console.log(`${currentFilename} 替换中...`);
        // 过滤掉模板字符串内的中文，避免替换时出现异常
        const targetStrs = item.texts.reduce((pre, strObj, i)=>{
            // 因为文案已经根据位置倒排，所以比较时只需要比较剩下的文案即可
            const afterStrs = item.texts.slice(i + 1);
            if (afterStrs.some((obj)=>strObj.range.end <= obj.range.end)) return pre;
            return pre.concat(strObj);
        }, []);
        const len = item.texts.length - targetStrs.length;
        if (len > 0) console.log($8zHUo$colors.red(`存在 ${(0, $lCxOT.highlightText)(len)} 处文案无法替换，请避免在模板字符串的变量中嵌套中文`));
        let translateTexts;
        if (origin !== "Google") {
            // 翻译中文文案，百度和pinyin将文案进行拼接统一翻译
            const delimiter = origin === "Baidu" ? "\n" : "$";
            const translateOriginTexts = targetStrs.reduce((prev, curr, i)=>{
                const transOriginText = $78271ebc6bfb8009$var$getTransOriginText(curr.text);
                if (i === 0) return transOriginText;
                return `${prev}${delimiter}${transOriginText}`;
            }, []);
            translateTexts = await (0, $lCxOT.translateKeyText)(translateOriginTexts, origin);
        } else {
            // google并发性较好，且未找到有效的分隔符，故仍然逐个文案进行翻译
            const translatePromises = targetStrs.reduce((prev, curr)=>{
                const transOriginText = $78271ebc6bfb8009$var$getTransOriginText(curr.text);
                return prev.concat((0, $lCxOT.translateText)(transOriginText, "en_US"));
            }, []);
            [...translateTexts] = await Promise.all(translatePromises);
        }
        if (translateTexts.length === 0) {
            (0, $lCxOT.failInfo)(`未得到翻译结果，${currentFilename}替换失败！`);
            return;
        }
        const replaceableStrs = $78271ebc6bfb8009$var$getReplaceableStrs(currentFilename, langsPrefix, translateTexts, targetStrs);
        await replaceableStrs.reduce((prev, obj)=>{
            return prev.then(()=>{
                return (0, $46f7c97238b1b2f2$export$6514dff9e93abd1)(currentFilename, obj.target, `I18N.${obj.key}`, false, obj.needWrite);
            });
        }, Promise.resolve()).then(()=>{
            // 添加 import I18N
            if (!(0, $46f7c97238b1b2f2$export$ea0561b3fcb00eed)(currentFilename)) {
                const code = (0, $46f7c97238b1b2f2$export$fa56d2129cba1df4)(currentFilename);
                (0, $2335f6f415255376$export$552bfb764b5cd2b4)(currentFilename, code);
            }
            (0, $lCxOT.successInfo)(`${currentFilename} 替换完成，共替换 ${targetStrs.length} 处文案！`);
        }).catch((e)=>{
            (0, $lCxOT.failInfo)(e.message);
        });
    };
    allTargetStrs.reduce((prev, current)=>{
        return prev.then(()=>{
            return generateKeyAndReplace(current);
        });
    }, Promise.resolve()).then(()=>{
        (0, $lCxOT.successInfo)("\u5168\u90E8\u66FF\u6362\u5B8C\u6210\uFF01");
    }).catch((e)=>{
        (0, $lCxOT.failInfo)(e.message);
    });
}




var $lCxOT = parcelRequire("lCxOT");


/**
 * 进度条加载
 * @param text
 * @param callback
 */ function $882b6d93070905b3$var$spining(text, callback) {
    const spinner = $8zHUo$ora(`${text}中...`).start();
    if (callback) {
        if (callback() !== false) spinner.succeed(`${text}成功`);
        else spinner.fail(`${text}失败`);
    }
}
$8zHUo$commander.version("0.2.0").option("--init", "\u521D\u59CB\u5316\u9879\u76EE", {
    isDefault: true
}).option("--import [file] [lang]", "\u5BFC\u5165\u7FFB\u8BD1\u6587\u6848").option("--export [file] [lang]", "\u5BFC\u51FA\u672A\u7FFB\u8BD1\u7684\u6587\u6848").option("--sync", "\u540C\u6B65\u5404\u79CD\u8BED\u8A00\u7684\u6587\u6848").option("--mock", "\u4F7F\u7528 Google \u6216\u8005 Baidu \u7FFB\u8BD1 \u8F93\u51FAmock\u6587\u4EF6").option("--translate", "\u4F7F\u7528 Google \u6216\u8005 Baidu \u7FFB\u8BD1 \u7FFB\u8BD1\u7ED3\u679C\u81EA\u52A8\u66FF\u6362\u76EE\u6807\u8BED\u79CD\u6587\u6848").option("--unused", "\u5BFC\u51FA\u672A\u4F7F\u7528\u7684\u6587\u6848").option("--extract [dirPath]", "\u4E00\u952E\u66FF\u6362\u6307\u5B9A\u6587\u4EF6\u5939\u4E0B\u7684\u6240\u6709\u4E2D\u6587\u6587\u6848").option("--prefix [prefix]", "\u6307\u5B9A\u66FF\u6362\u4E2D\u6587\u6587\u6848\u524D\u7F00").parse($8zHUo$process.argv);
if ($8zHUo$commander.init) (async ()=>{
    const result = await $8zHUo$inquirer.prompt({
        type: "confirm",
        name: "confirm",
        default: true,
        message: "\u9879\u76EE\u4E2D\u662F\u5426\u5DF2\u5B58\u5728kiwi\u76F8\u5173\u76EE\u5F55\uFF1F"
    });
    if (!result.confirm) $882b6d93070905b3$var$spining("\u521D\u59CB\u5316\u9879\u76EE", async ()=>{
        (0, $3f83de8286c24891$export$6786e5eec56ec4be)();
    });
    else {
        const value = await $8zHUo$inquirer.prompt({
            type: "input",
            name: "dir",
            message: "\u8BF7\u8F93\u5165\u76F8\u5173\u76EE\u5F55\uFF1A"
        });
        $882b6d93070905b3$var$spining("\u521D\u59CB\u5316\u9879\u76EE", async ()=>{
            (0, $3f83de8286c24891$export$6786e5eec56ec4be)(value.dir);
        });
    }
})();
if ($8zHUo$commander.import) $882b6d93070905b3$var$spining("\u5BFC\u5165\u7FFB\u8BD1\u6587\u6848", ()=>{
    if ($8zHUo$commander.import === true || $8zHUo$commander.args.length === 0) {
        console.log("\u8BF7\u6309\u683C\u5F0F\u8F93\u5165\uFF1A--import [file] [lang]");
        return false;
    } else if ($8zHUo$commander.args) (0, $2f2c6164c7ff54ab$export$74455f5ca66c946c)($8zHUo$commander.import, $8zHUo$commander.args[0]);
});
if ($8zHUo$commander.export) $882b6d93070905b3$var$spining("\u5BFC\u51FA\u672A\u7FFB\u8BD1\u7684\u6587\u6848", ()=>{
    if ($8zHUo$commander.export === true && $8zHUo$commander.args.length === 0) (0, $20737cef070d010b$export$8f8d34ccf102fb57)();
    else if ($8zHUo$commander.args) (0, $20737cef070d010b$export$8f8d34ccf102fb57)($8zHUo$commander.export, $8zHUo$commander.args[0]);
});
if ($8zHUo$commander.sync) $882b6d93070905b3$var$spining("\u6587\u6848\u540C\u6B65", ()=>{
    (0, $f322f17f239b2b8e$export$92d6409d68f0739a)();
});
if ($8zHUo$commander.unused) $882b6d93070905b3$var$spining("\u5BFC\u51FA\u672A\u4F7F\u7528\u7684\u6587\u6848", ()=>{
    (0, $21feaa0600d2fcc9$export$6d942d15ad170ea0)();
});
if ($8zHUo$commander.mock) (0, $f322f17f239b2b8e$export$92d6409d68f0739a)(async ()=>{
    const { pass: pass , origin: origin  } = await (0, $lCxOT.getTranslateOriginType)();
    if (pass) {
        const spinner = $8zHUo$ora(`使用 ${origin} 翻译中...`).start();
        await (0, $3faceb08b5c0afb6$export$d24e50817704e115)(origin);
        spinner.succeed(`使用 ${origin} 翻译成功`);
    }
});
if ($8zHUo$commander.translate) (0, $f322f17f239b2b8e$export$92d6409d68f0739a)(async ()=>{
    const { pass: pass , origin: origin  } = await (0, $lCxOT.getTranslateOriginType)();
    if (pass) {
        const spinner = $8zHUo$ora(`使用 ${origin} 翻译中...`).start();
        await (0, $43550e751634938e$export$d73ee8ef04f5226a)(origin);
        spinner.succeed(`使用 ${origin} 翻译成功`);
    }
});
if ($8zHUo$commander.extract) {
    console.log((0, $8zHUo$lodash.isString)($8zHUo$commander.prefix));
    if ($8zHUo$commander.prefix === true) console.log("\u8BF7\u6307\u5B9A\u7FFB\u8BD1\u540E\u6587\u6848 key \u503C\u7684\u524D\u7F00 --prefix xxxx");
    else if ((0, $8zHUo$lodash.isString)($8zHUo$commander.prefix) && !new RegExp(/^I18N(\.[-_a-zA-Z1-9$]+)+$/).test($8zHUo$commander.prefix)) console.log("\u524D\u7F00\u5FC5\u987B\u4EE5I18N\u5F00\u5934,\u540E\u7EED\u8DDF\u4E0A\u5B57\u6BCD\u3001\u4E0B\u6ED1\u7EBF\u3001\u7834\u6298\u53F7\u3001$ \u5B57\u7B26\u7EC4\u6210\u7684\u53D8\u91CF\u540D");
    else {
        const extractAllParams = {
            prefix: (0, $8zHUo$lodash.isString)($8zHUo$commander.prefix) && $8zHUo$commander.prefix,
            dirPath: (0, $8zHUo$lodash.isString)($8zHUo$commander.extract) && $8zHUo$commander.extract
        };
        (0, $78271ebc6bfb8009$export$239a6816282b2f16)(extractAllParams);
    }
}


//# sourceMappingURL=index.js.map
