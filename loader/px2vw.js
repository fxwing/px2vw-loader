// css  模块将css代码转化为css语法树
const css = require("css");
const pxRegExp = /\b(\d+(\.\d+)?)px\b/;

class Px2vw {
  constructor(config) {
    this.config = config;
  }
  generateVw(cssText) {
    let self = this; //缓存this
    function processRules(rules) {
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let declarations = rule.declarations;
        for (let j = 0; j < declarations.length; j++) {
          let declaration = declarations[j];
          if (
            declaration.type === "declaration" &&
            pxRegExp.test(declaration.value)
          ) {
            declaration.value = self._getCalcValue("vw", declaration.value);
          }
        }
      }
    }
    var astObj = css.parse(cssText);
    //console.log(JSON.stringify(astObj,null,2));
    processRules(astObj.stylesheet.rules);
    return css.stringify(astObj);
  }

  _getCalcValue(type, value) {
    const { remUnit, remPrecision } = this.config;
    return value.replace(pxRegExp, (_, $1) => {
      const val = ((parseFloat($1) / 750) * 100).toFixed(remPrecision);
      return val + type;
    });
  }
}

module.exports = Px2vw;
