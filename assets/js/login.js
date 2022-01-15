$(function () {
    $('.log_box').hide()
    $('#link_reg').on('click', function () {
        $('.log_box').hide()
        $('.reg_box').show()
    })
    $('#link_log').on('click', function () {
        $('.log_box').show()
        $('.reg_box').hide()
    })
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,7}$/, '密码验证出错'],
        repwd: function (value) {
            var wd = $('.log_box [name=password]').val()
            if (wd !== value) {
                return '错误'
            }
        }
    })

    // 注册提交事件
    $('.reg-form').on('submit', function (e) {
        e.preventDefault()
        $.post('http://www.liulongbin.top:3007/api/reguser', { username: $('.reg-form [name=username]').val(), password: $('.reg-form [name=password]').val() },
            function (res) {
                if (res.status !== 0) { return layui.layer.msg(res.message) }
                layui.layer.msg('注册成功，请登录')
                $('#link_reg').click()
            }
        )
    })
    登录事件
    $('.log-form').on('submit', function (e) {
        e.preventDefault()
        $.post('http://www.liulongbin.top:3007/api/login', { username: $('.log-form [name=username]').val(), password: $('.log-form [name=password]').val() },
            function (res) {
                if (res.status !== 0) { return layui.layer.msg(res.message) }
                layui.layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        )
    })

    // $('.log-form').on('submit', function (e) {
    // e.preventDefault()
    //     $.ajax({
    //         url: '/api/login',
    //         method: 'POST',
    //         data: $(this).serialize(),
    //         success(res) {
    //             if (res.status !== 0) { return layui.layer.msg(res.message) }
    //             layui.layer.msg(res.message)
    //             localStorage.setItem('token', res.token)
    //             location.href = '/index.html'
    //         }
    //     })
    // })     
})