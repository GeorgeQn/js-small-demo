// Jq扩展函数
$.fn.extend({
  // 显示错误提示
  // 错误提示请在元素属性 data-error 上配置
  getError: function (msg) {
    this.removeClass('correct').addClass('error').attr('data-error', msg);
    return this;
  },
  // 开启正确提示
  // 错误提示请在元素属性 data-correct 上配置
  getCorrect: function (msg) {
    this.removeClass('error').addClass('correct').attr('data-correct', msg);
    return this;
  },
  checkForm: function () {
    var status = true;
    this.children().each(function (index, item) {
      if ($(item).hasClass('error')) {
        status = false;
      }
    });
    return status;
  },
  toast: function (msg) {
    if ($('#toast').length > 0) {
      $('#toast')
        .html('<span>' + msg + '</span>')
        .fadeIn(200)
        .delay(1500)
        .fadeOut(200);
    } else {
      $('<div>')
        .html('<span>' + msg + '</span>')
        .attr({
          id: 'toast'
        })
        .appendTo('body')
        .fadeIn(200)
        .delay(1500)
        .fadeOut(200)
    }
    return this;
  }
})

// 格式化表单数据
const serialize = function (form) {
  if (form) {
    var params = [];
    let i, len;

    if ($) {
      form && (form = form[0]);
    }

    for (i = 0, len = form.elements.length; i < len; i++) {
      let field = form.elements[i];
      if (field.name.length) {
        params.push(field.name + '=' + field.value)
      }
    }
    return params.join('&');
  }
}