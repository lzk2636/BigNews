

$(function () {

    var E = window.wangEditor
    var editor = new E('#div1','#editor')
    // 或者 var editor = new E( document.getElementById('editor') )
    editor.customConfig.uploadImgShowBase64 = true;
    // editor.customConfig.uploadImgServer = 'http://localhost:8080/api/v1'
    editor.create()
    // $('#btn0').click(function () {
    //     console.log(editor.txt.html())
    // })


    // var categoryId=0;
    //加载日期插件
    jeDate('#testico', {
        trigger: 'click',
        theme: { bgcolor: "#00A680", pnColor: "#00DDAA" },//绿色主题
        format: "YYYY-MM-DD",
        isinitVal: true,
        zIndex:20999,  
    });
    // console.log(window.jeDate)
    $.ajax({
        type: 'get',
        url: bignew.category_list,
        success: function (res) {
            console.log(res)
            var temp = template('category_temp', res)
            $('div#mySelected').html(temp)
        }
    })

    //已发布按钮
    submit('btn-fabu', '已发布')
    //btn-draft
    submit('btn-draft', '')

    //图片浏览
    $('input#inputCover').on('change', function () {
        var url = URL.createObjectURL(this.files[0]);
        console.log(url);
        $('img.article_cover').attr('src', url)

    })





    function submit(strName, state) {
        $('button.' + strName).on('click', function (e) {
            e.preventDefault();
            var string = editor.txt.html()
            console.log(string)
            var formData = new FormData($('#form')[0]);
            // for (const iterator of formData) {
            //     console.log(iterator)
            // }
            formData.set('state', state);
            formData.set('content', string)
            for (const iterator of formData) {
                console.log(iterator)
            }
            $.ajax({
                type: 'post',
                url: bignew.article_publish,
                data: formData,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.code == 200) {
                        alert(res.msg);
                        // formData.delete('state')
                        window.location.reload()
                        // $('#mytextarea').text('')

                    }
                    console.log(res)
                }
            })


        })
    }

})





