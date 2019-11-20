
    $(function () {
        $.ajax({
            type: 'get',
            url: bignew.user_info,
            data: {
            },
            success: function (res) {
                if (res.code == 200) {
                    // console.log(res);
                    $('.user_info>img').attr('src', res.data.userPic);
                    $('.user_info>span').html('欢迎&nbsp;&nbsp;' + res.data.nickname);
                    $('.user_center_link>img').attr('src', res.data.userPic)
                }

            }
        })
        $('a.logout').on('click', function () {
            localStorage.removeItem('token');
            window.location.href = './login.html'
            // console.log(this)
        })
        //有二级列表
        var isok=true;
        $('.level01').eq(1).on('click',function(e){
            $('.level02').slideToggle(500)
            $('.level02>li').first().addClass('active').siblings().removeClass('active');
            
            $(this).find('b').toggleClass('rotate0')
            //点击dom的点击事件 a标签的href 也会触发
            $('.level02>li:eq(0)>a')[0].click()
               
           
        });
        $('.menu>.level01').on('click',function(e){
            $(this).addClass('active').siblings().removeClass('active')
        })
        $('.level02>li').on('click',function(){
            $(this).addClass('active').siblings().removeClass('active')
            
        })
        


    })


