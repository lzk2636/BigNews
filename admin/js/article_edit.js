    var E = window.wangEditor;
    var editor = new E('#div1');
    editor.create()
    $(function () {
        //加载模板数据

        $.ajax({
            type: 'get',
            url: bignew.category_list,
            success: function (res) {
                console.log(res)
                var temp = template('category_temp', res)
                $('div#mySelected').html(temp)
            }
        })


        //加载日期插件
        jeDate('#testico', {
            trigger: 'click',
            theme: { bgcolor: "#00A680", pnColor: "#00DDAA" },//绿色主题
            format: "YYYY-MM-DD",
            zIndex:20999
        });
        // console.log(window.jeDate)
        $.ajax({
            type: 'get',
            url: bignew.category_list,
            success: function (res) {
                // console.log(res)
                var temp = template('category_temp', res)
                $('tbody').html(temp)
            }
        })
        var id = window.location.search.split('=')[1];

        $('#hiddenId').val(id)
        //发起ajax 请求 数据回显

        $.ajax({
            type: 'get',
            url: bignew.article_search,
            data: {
                id: parseInt(id)
            },
            success: function (res) {
                console.log(res)
                $('#inputTitle').val(res.data.title);
                $('.article_cover').attr('src', res.data.cover);
                $('select.category').val(res.data.categoryId);
                $('#testico').val(res.data.date)
                editor.txt.html(res.data.content)
            }
        })


        //btn-edit 文章修改
        submit('btn-edit', '已发布')


        //btn-draft 存为草稿
        submit('btn-draft', '');


        //图片浏览
        $('input#inputCover').on('change', function () {
            var url = URL.createObjectURL(this.files[0]);
            console.log(url);
            $('img.article_cover').attr('src', url)

        })

    })

    function submit(strName, state) {
        $('button.' + strName).on('click', function (e) {
            e.preventDefault();
            var formData = new FormData($('#form')[0]);

            formData.append('state', state);
            // formData.set('state', state);
            formData.set('content', editor.txt.html())

            $.ajax({
                type: 'post',
                url: bignew.article_edit,
                data: formData,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.code == 200) {
                        alert(res.msg);
                        // $('#form')[0].reset();
                        // $('#mytextarea').text('');
                        window.location.href = './article_list.html'

                    }
                    // console.log(res)
                }
            })


        })
    }






