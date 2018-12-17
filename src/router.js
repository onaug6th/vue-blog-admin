import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//  新世界子路由
const newWorldChildren = [
    //  文章编辑或新增
    {
        path: "/articleEdit",
        name: "articleEdit",
        component: () => import("./views/NewWorld/ArticleEdit/ArticleEdit.vue")
    },
    //  文章分类管理
    {
        path: "/articleTypeManage",
        name: "articleTypeManage",
        component: () => import("./views/NewWorld/ArticleTypeManage/ArticleTypeManage.vue")
    },
    //  文章标签管理
    {
        path: "/tagManage",
        name: "tagManage",
        component: () => import("./views/NewWorld/TagManage/TagManage.vue")
    },
    //  文章图片管理
    {
        path: "/articlePictureManage",
        name: "articlePictureManage",
        component: () => import("./views/NewWorld/ArticlePictureManage/ArticlePictureManage.vue")
    },
    //  文章管理
    {
        path: "/articleManage",
        name: "articleManage",
        component: () => import("./views/NewWorld/ArticleManage/ArticleManage.vue")
    },
    //  文章回复管理
    {
        path: "/articleReplyManage",
        name: "articleReplyManage",
        component: () => import("./views/NewWorld/ArticleReplyManage/ArticleReplyManage.vue")
    },
    //  文章楼中楼回复管理
    {
        path: "/articleInsideReplyManage",
        name: "articleInsideReplyManage",
        component: () => import("./views/NewWorld/ArticleInsideReplyManage/ArticleInsideReplyManage.vue")
    }
];

newWorldChildren.forEach((item)=>{
    if (Object.prototype.toString.call(item["meta"]) === "[object Object]") {
        item["meta"]["requireAuth"] = true;
        item["meta"]["showNav"] = true;
    } else {
        item["meta"] = {
            requireAuth: true,
            showNav : true
        }
    }
});

const routes = [
    //  管理员登陆
    {
        path: "/",
        name: "adminLogin",
        component: () => import("./views/AdminLogin/AdminLogin.vue")
    },
    //  管理员登陆
    {
        path: "/adminLogin",
        name: "adminLogin",
        component: () => import("./views/AdminLogin/AdminLogin.vue"),
        meta : {
            showNav : true
        }
    },
    //  新世界
    {
        path: "/newWorld",
        name: "newWorld",
        component: () => import("./views/NewWorld/NewWorld.vue"),
        meta : {
            showNav : true,
            requireAuth: true
        },
        children: newWorldChildren
    }
];

export default new Router({
    routes
})
