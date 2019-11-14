# BigNews
大事件项目案例

## 1.完成登录页面



```
$(function () {
    $('.input_sub').on('click', function (e) {
      e.preventDefault();

      var username = $('.input_txt').val().trim();
      var password = $('.input_pass').val().trim();
      if(username==''||password==''){
        // alert('用户名和密码不能为空');
        $('#myModal').modal('show') ;
        $('#myModal .modal-body').children('p').text('用户名和密码不能为空');
        return;
      }
      $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/user/login',
        data: {
          username:username,
          password:password
        },
        success: function (res) {
          // console.log(res);
          if(res.code==200){
            $('#myModal').modal('show') 
            $('#myModal .modal-body').children('p').text(res.msg)
            // alert(res.msg);
            window.location.href='./index.html';
            
          }else{
            $('#myModal').modal('show') 
            $('#myModal .modal-body').children('p').text(res.msg)
          }

        }
      })
    })
 })

```

