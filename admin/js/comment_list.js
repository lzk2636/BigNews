
  //  var currentPage = 1;
  $(function () {
    var currentPage = 1;



    getPageTool(1, function (totalPages) {
      $('#pagination').twbsPagination({
        totalPages: totalPages,
        startPage: 1,
        visiblePages: 10,
        first: '首页',
        prev: '上一页',
        next: '下一页',
        last: '尾页',
        onPageClick: function (e, page) {
          currentPage = page;
          getPageTool(page, null)
        }
      })
    })


    $('tbody').on('click', 'a.btn-danger', function () {
      var that = this;
      var id = parseInt($(this).attr('data-id'));
      if (confirm('你确定删除评论吗??')) {

        $.ajax({
          type: 'post',
          url: bignew.comment_delete,
          data: {
            id: id
          },
          success: function (res) {

            if (res.code == 200) {
              getPageTool(currentPage, function (totalPage) {
                $('#pagination').twbsPagination('changeTotalPages', totalPage, currentPage)
              })
            }
          }
        })

      }

    })
    $('tbody').on('click', 'a.btn-info', function () {
      var id = parseInt($(this).attr('data-id'));
      var that = this
      $.ajax({
        type: 'post',
        url: bignew.comment_pass,
        data: {
          id: id
        },
        success: function (res) {
          // 
          if (res.code == 200) {
            $(that).text('拒绝').addClass('btn-warning').removeClass('btn-info')
          }
        }
      })

    })
    $('tbody').on('click', 'a.btn-warning', function () {
      var id = parseInt($(this).attr('data-id'));
      var that = this
      $.ajax({
        type: 'post',
        url: bignew.comment_reject,
        data: {
          id: id
        },
        success: function (res) {
          // 
          if (res.code == 200) {
            $(that).hide()
          }
        }
      })

    })




  })




  function getPageTool(currentPage, callback) {
    $.ajax({
      type: 'get',
      url: bignew.comment_list,
      data: {
        page: currentPage,
        perpage: 9
      },
      success: function (res) {
        console.log(res)
        var temp = template('comment_list', res);
        $('tbody').html(temp);

        if (callback != null && res.data.data.length != 0) {

          callback(res.data.totalPage)
        } else if (res.data.data.length == 0 && res.data.totalPage == currentPage - 1){
          currentPage--;
          getPageTool(currentPage, function () {
                $('#pagination').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)
              })
        }
      }
    })

  }




