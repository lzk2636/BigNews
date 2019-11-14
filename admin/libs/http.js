(function(window){
    var base='http://localhost:8080/api/v1'
    var bigNew={
        login:base+'/admin/user/login',//用户登录,
        info:base+'/admin/user/info',
        detail:base+'/admin/user/detail',
        edit:base+'/admin/user/edit',
        list:base+'/admin/category/list',
        add:base+'/admin/category/add',


    }
    window.bignew=bigNew


}(window))