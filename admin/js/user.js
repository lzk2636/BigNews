
    $(function () {


        $.ajax({
            type: 'get',
            url: bignew.user_detail,
            data: {
            },
            success: function (res) {
                console.log(res)
                $('.username').val(res.data.username)
                $('.nickname').val(res.data.nickname)
                $('.password').val(res.data.password)
                $('.email').val(res.data.email)
                $('.user_pic').attr('src', res.data.userPic)
            }
        })

        //用户图标预览
        $('#exampleInputFile').on('change', function () {
            var file = URL.createObjectURL(this.files[0]);
            $('.user_pic').attr('src', file)
            // console.log(file)    
        })

        //表单提交

        $('.btn-edit').on('click', function (e) {
            e.preventDefault();
            //表单对象
            // new FormData
            var formData = new FormData($('#form')[0]);
            $.ajax({
                type: 'post',
                url: bignew.user_edit,
                data: formData,
                contentType: false,
                processData: false,

                success: function (res) {
                    console.log(res)
                    if (res.code == 200) {
                        $('#myModal').modal('show')
                        // $('#myModal').modal('show')
                        $('.modal-body>p').text(res.msg);
                        $('#myModal').on('hidden.bs.modal', function (e) {
                            //父元素加载元素,页面刷新
                            //方法一
                            //parent.window.location.reload()
                            //方法二
                            $.ajax({
                                type: 'get',
                                url: bignew.user_info,
                                data: {
                                },
                                success: function (res) {
                                    if (res.code == 200) {
                                        // console.log(res);
                                        parent.$('.user_info>img').attr('src', res.data.userPic);
                                        parent.$('.user_info>span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
                                        parent.$('.user_center_link>img').attr('src', res.data.userPic)
                                    }

                                }
                            })


                        })
                    }
                }
            })
        })

    })
