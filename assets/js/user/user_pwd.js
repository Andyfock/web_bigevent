$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if(value === $('[name=oldpwd]').val()) {
                return 'The new password cannot be the same as old password!'
            }
        },
        repwd: function (value) {
            if(value !== $('[name=newpwd]').val()) {
                return 'The password is not the same with the new password!'
            }
        } 
    })

    //监听表单提交
    $('.layui-form').on('submit', function (e) {
        //阻止默认提交
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0) {
                    return layer.msg('update failed!')
                }
                layer.msg('update success!')
                //jquery元素后加个[0]会转换为dom元素，然后可以调用reset方法
                //重置表单
                $('.layui-form')[0].reset()
                //调用父页面中的方法，重新渲染用户的头像和信息
                window.parent.getUserInfo()
            }
        })
    })    
})