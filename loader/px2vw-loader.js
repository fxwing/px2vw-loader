// loader  本身是一个函数参数是上一个loader的内容或者模块的源代码
// 经过一些处理将结果返回给下一个loader或者webpack

// loader-utils 是webpack中内置的一个模块 用于获取当前loader的配置的options配置对象
const loaderUtils = require("loader-utils");
const Px2vw = require("./px2vw");
/**
 *
 * 函数中this  指的是loaderContext  loader上下文对象  这里保存了 所有loader信息
 * this.resource = 当前正在转换的模块的绝对路径  用于匹配文件名字
 *
 * @param {*} source  源文件
 * @param {*} ast 生成的ast树
 */
function loader(source, ast) {
  // 通过loader-utils中的getOptions  能过获取到webpack.config.js中的配置的参数对象options
  // {
  //     remUnit: 75,
  //     remPrecision: 8,
  //     exclude: /antd\.css/,
  //  }
  const options = loaderUtils.getOptions(this);
  if (options.exclude && options.exclude.test(this.resource)) {
    return source; // 直接返回不转化
  }

  const px2vw = new Px2vw(options);
  const targetSource = px2vw.generateVw(source);
  return targetSource;
}

module.exports = loader;
