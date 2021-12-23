//每次调用$.get, post, ajax的时候都会先调用ajaxPrefilter这个函数
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前统一拼接url
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //统一为有权限的接口设置headers请求头
    //以/my开头的才需要权限
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //全局统一挂载complete回调函数
    options.complete = function(res) {
        //在complete回调中，可以使用res.responseJSON拿到服务器响应回来的数据
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token')
            //2.强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})