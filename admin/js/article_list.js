
    $(function () {
        //设置默认初始页
        var currentPage = 1;

        pageTool(currentPage, function (totalPages) {
            $('#pagination').twbsPagination({
                totalPages: totalPages,
                startPage: currentPage,
                visiblePages: 6,
                first: '首页',
                prev: '上一页',
                next: '下一页',
                last: '尾页',
                onPageClick: function (evt, page) {
                    // console.log('page=' + page);
                    // console.log('evt=' + evt);
                    if (page != currentPage) {
                        currentPage = page;
                        pageTool(page, null)
                    }

                }
            })

            //初始化数据文章数据
            $('#btnSearch').on('click', function (e) {
                e.preventDefault();
                pageTool(currentPage, function (totalPage) {

                    $('#pagination').twbsPagination('changeTotalPages', totalPage, currentPage)
                })
            })

        })





        // 初始化分类
        $.ajax({
            type: 'get',
            url: bignew.category_list,
            success: function (res) {
                console.log(res)
                var temp = template('category', res)
                $('#selCategory').html(temp)
            }
        })

        //文章删除功能
        $('tbody').on('click', '.delete', function () {
            var that = this;
            var id = $(this).attr('data-id');
            if (confirm('你确认删除文章吗???')) {
                $.ajax({
                    type: 'post',
                    url: bignew.article_delete,
                    data: {
                        id: parseInt(id)
                    },
                    success: function (res) {
                        if (res.code == 204) {
                            pageTool(currentPage, function (totalPage) {
                                $('#pagination').twbsPagination('changeTotalPages', totalPage, currentPage)
                            })
                        }
                    }
                })
            }

        })

    })



    function pageTool(currentPage, callback) {
        $.ajax({
            type: 'get',
            url: bignew.article_query,
            data: {
                type: $('#selCategory').val(),
                state: $('#selStatus').val(),
                page: currentPage,
                perpage: 8
            },
            success: function (res) {
                var temp = template('artcle_temp', res)
                $('tbody').html(temp)
                // showPage(currentPage, res.data.totalPage)//获取页面总页数,设置默认初始化为1
                if (callback != null && res.data.data.length != 0) {
                    callback(res.data.totalPage);
                    $('#pagination').show();
                    $('#myData').text('')
                } else if (res.data.totalPage ==currentPage - 1 && res.data.data.length == 0) {
                    currentPage-=1;
                    pageTool(currentPage, function () {
                        $('#pagination').twbsPagination('changeTotalPages', res.data.totalPage, currentPage)
                    })
                }
                else if (res.data.data.length == 0) {
                    $('#pagination').hide();
                    $('#myData').text('没有数据')
                }
            }
        })
    }





