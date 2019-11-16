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
## 1.1 jQuery.ajaxSetup([options]) ===>设置全局 AJAX 默认选项。
```
 $.ajaxSetup({
            beforeSend(xhr) {//在登录之前检测token唯一值 给所有的请求都设置请求头（从localStorage中读取token)
                xhr.setRequestHeader("Authorization", localStorage.getItem('token'))
            },
            error(xhr, status, error) {//发生错误进行拦截
                console.log(xhr)
                console.log(status)
                console.log(error);
                if (error == 'Forbidden') {
                    alert('先登录!!!!!');
                    window.location.href = './login.html'
                }
            }
        })
```
## 2.1 分页工具的难点
+ 学习网站:http://josecebe.github.io/twbs-pagination/#page-1



