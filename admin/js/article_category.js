
$(function () {
    //初始化数据
    getData()

    function getData() {
        $.ajax({
            type: 'get',
            url: bignew.category_list,
            success: function (res) {
                // console.log(res)
                var temp = template('category_temp', res)
                $('tbody').html(temp)
            }
        })
    }

    //新增分类
    /* 
    show.bs.modal
    show 方法调用之后立即触发该事件。
    如果是通过点击某个作为触发器的元素，
    则此元素可以通过事件的 relatedTarget 属性进行访问。
    
    */
    $('#myModal').on('show.bs.modal', function (e) {
        // console.log(e.relatedTarget)
        if (e.relatedTarget === $('#xinzengfenlei')[0]) {
            // alert('新增')
            $('#myModalLabel').text($(e.relatedTarget).text());
            $('button.btn-queren').addClass('btn-success').removeClass('btn-primary')
            $('button.btn-queren').text('新增')

        } else {
            $('#myModalLabel').text($(e.relatedTarget).text());
            $('button.btn-queren').addClass('btn-primary').removeClass('btn-success')
            $('button.btn-queren').text('编辑')
            //获取数据到模态框
            $('input#id').val($(e.relatedTarget).attr('data-id'))
            $('input#name').val($(e.relatedTarget).parent().prev().prev().text());
            $('input#slug').val($(e.relatedTarget).parent().prev().text())

        }
        // do something...
    })




    //关闭按钮
    $('button.btn-off').on('click', function () {
        $('form')[0].reset();
        //表单重置
    })


    //删除数据
    $('tbody').on('click', '.btn-danger', function () {
        // console.log(this)
        var that = this;
        var id = $(this).attr('data-id')
        if (confirm('你确定要删除吗?')) {

            $.ajax({
                type: 'post',
                url: bignew.category_delete,
                data: {
                    id: parseInt(id)
                },
                success: function (res) {
                    console.log(res);
                    $(that).parent().parent().remove()
                }
            })

        }


    })
    //编辑数据 和 新增事件根据类名判断
    $('button.btn-queren').on('click', function () {
        console.log($(this).hasClass('btn-success'))
        var name = $('#name').val().trim();
        var slug = $('#slug').val().trim();
        var id = $('input#id').val();
        if ($(this).hasClass('btn-success')) {
            $.ajax({
                type: 'post',
                url: bignew.category_add,
                data: {
                    name: name,
                    slug: slug
                },
                success: function (res) {

                    // console.log(res)
                    if (res.code == 201) {
                        alert(res.msg)
                        $('#myModal').modal('hide');
                         $('form')[0].reset()
                        getData();
                    }
                }
            })
        } else {
            $.ajax({
                type: 'post',
                url: bignew.category_edit,
                data: {
                    id: parseInt(id),
                    name: name,
                    slug: slug
                },
                success: function (res) {
                    // if(res.code)
                    // console.log(res);
                    if (res.code == 200) {
                        $('#myModal').modal('hide');
                        $('form')[0].reset()
                        getData();
                        alert(res.msg);
                        return;
                    }
                    alert(res.msg)

                }
            })

        }


    })



    //更新数据




})


