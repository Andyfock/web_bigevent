//入口函数
//为登陆和注册的div里的a链接各自绑定一个点击事件来控制注册和登陆链接的显示
$(function() {
    //点击去注册账号的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登陆的链接
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()        
    })

    //从Layui获取到一个form对象
    var form = layui.form
    //通过form.verify函数来自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致
        repwd: function(value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败return一个提示消息
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致！'
            }
        } 
    })

    //监听注册表单的提交事件
})