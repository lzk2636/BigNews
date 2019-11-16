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
 * 使用插件 
   <!-- 分页插件 -->
    <script src="./libs/jquery.twbsPagination.js"></script>
### 2.1.1 使用标签ul
* <ul id="pagination" class="pagination-sm"></ul>
```
 function showPage(currentPage, totalPages) {
        $('#pagination').twbsPagination('destroy') //标签名.对象 每次加载时需要取消原来的页码
        $('#pagination').twbsPagination({//重新加载
            totalPages: totalPages,//总页数 传参
            startPage: currentPage,//当前第几页
            visiblePages: 6,
            first: '首页',
            prev: '上一页',
            next: '下一页',
            last: '尾页',
            onPageClick: function (evt, page) {//页码点击触发事件
                if (page != currentPage) {
                    currentPage = page;
                    getList(currentPage)//页码不同重新发起ajax 请求
                }
            }
        })
    }

     function getList(currentPage) {//重新发起ajax请求
        $.ajax({
            type: 'get',
            url: bignew.article_query,
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: currentPage,//返回当前第几页的数据
                perpage: 10//规定每页返回10条
            },
            success: function (res) {
                var temp = template('artcle_temp', res)//通过模板重新渲染数据
                $('tbody').html(temp)
            }
        })
    }
```
## 2.1.2 模态框事件理解
  $('#myModal').on('show.bs.modal', function (e) {});
*  show.bs.modal
            show 方法调用之后立即触发该事件。
            如果是通过点击某个作为触发器的元素，
            则此元素可以通过事件的 relatedTarget 属性进行访问
  + 访问点击被点击事件传递的值
*  hidden.bs.modal
      此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发。
* loaded.bs.modal
      从远端的数据源加载完数据之后触发该事件。



