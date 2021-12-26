$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return 'The lenght should be between 1 and 6'
            }
        }
    })

    initUserinfo()

    //初始化用户信息
    function initUserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) { 
                if(res.status !== 0) {
                    return layer.msg(res.msg)
                }
                //调用form.val()快速为表单赋值
                form.val('formUserinfo', res.data)
            }
        })
    }

    //重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserinfo()
    })

    //监听表单提交
    $('.layui-form').on('submit', function (e) {
        //阻止默认提交
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg(res.msg)
                }
                layer.msg('update success!')
                //调用父页面中的方法，重新渲染用户的头像和信息
                window.parent.getUserInfo()
            }
        })
    })
})