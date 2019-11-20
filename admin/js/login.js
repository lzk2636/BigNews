
  $(function () {
    $('.input_sub').on('click', function (e) {
      e.preventDefault();

      var username = $('.input_txt').val().trim();
      var password = $('.input_pass').val().trim();
      if (username == '' || password == '') {
        // alert('用户名和密码不能为空');
        $('#myModal').modal('show');
        $('#myModal .modal-body').children('p').text('用户名和密码不能为空');
        return;
      }
      $.ajax({
        type: 'post',
        url: bignew.user_login,
        data: {
          username: username,
          password: password
        },
        success: function (res) {
          $('#myModal').modal('show')
          $('#myModal .modal-body').children('p').text(res.msg)
          if (res.code == 200) {
            localStorage.setItem('token', res.token);
            $('#myModal').on('hidden.bs.modal', function (e) {
              window.location.href = './index.html';
            })

          }

        }
      })
    })

  })
