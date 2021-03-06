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
    var layer = layui.layer
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
    $('#form_reg').on('submit', function(e){
        //1.阻止默认提交行为
        e.preventDefault()
        //2.发起ajax的post请求
        var data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser', data, function (res) {
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('register success')
            //模拟人的点击行为，注册后直接跳转登陆页面
            $('#link_login').click()
        })
    })


    //监听登陆表单的提交事件
    $('#form_login').submit(function (e) {
        //阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg(res.msg)
                }
                layer.msg(res.msg)
                // console.log(res.token);
                //将登陆成功得到的token字符串，保存到localstorage中
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})