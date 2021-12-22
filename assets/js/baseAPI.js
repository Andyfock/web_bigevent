//每次调用$.get, post, ajax的时候都会先调用ajaxPrefilter这个函数
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前统一拼接url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})