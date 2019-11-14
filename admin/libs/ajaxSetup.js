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