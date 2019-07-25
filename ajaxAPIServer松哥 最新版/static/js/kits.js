// var kits = {};


// /**
//  * 转换思路是：
//         url参数长成： id=10086&name=goudan&pwd=123
//         把url参数使用  &  割开，成为  [键=值,键=值...]
//         再把数组里面的每个 键=值 再割开 ， [键,值]
//  * */
// kits.getUrlParams = function () {
//   let arr = location.search.substring(1).split('&');
//   let prams = {};
//   arr.forEach(e=>{
//       let temp = e.split('=');
//       let key = temp[0];
//       let val = temp[1];
//       prams[key] = val;
//   })
//   return prams;
// }


var kits = {};

//url参数长成： id=10086&name=goudan&pwd=123;
//这里是将url后面的值，转换成对象格式。先&,再=分别将他们分开，然后转换成对象的[键,值]
kits.getUrlParams = function () {
  let search = location.search.substring(1).split('&');
  let prams = [];
  search.forEach(e => {
    let temp = e.split('=');
    let key = temp[0];
    let val = temp[1];
    prams[key] = val;
  })
  return prams;
}

//val是表单的内容，msg是错误信息，len是最小长度
let strategies = {
  isNonEmpty: function (val, msg) {
    if (val.trim().length === 0) {
      return msg;
    }
  },
  minLength: function (val, len, msg) {
    if (val.trim().length < len) {
      return msg;
    }
  }
}

function Validator() {
  this.validateFuncs = [];
}
//dom是所指表单的内容，arr是一个检验的数组
Validator.prototype.add = function (dom, arr) {
  for(var i = 0;i < arr.length; i++ ){
    let fn = function(){
      let rule = arr[i];
      let params = rule.fnName.split(':');//[minLength:8]
      let fnName = params.shift();//[8]
      params.unshift(dom.value);//[dom.value,8]
      params.push(rule.errMsg);//[dom,value,8,rule.errMsg]
      return strategies[fnName].apply(dom,params);//strategies[fnName]是对表单的判定函数,apply(dom,parms),dom没意义，parms本来是一个参数，用apply转化成3个参数；

    }
    this.validateFuncs.push(fn);
  }
}


Validator.prototype.start = function(){
  for(let i = 0;i<this.validateFuncs.length;i++){
    let msg = this.validateFuncs[i]();
    if(msg){
      return msg;
    }
  }
}