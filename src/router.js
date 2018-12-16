import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

//  新世界子路由
const newWorldChildren = [
    //  文章编辑或新增
    {
        path: "/articleEdit",
        name: "articleEdit",
        component: () => import("./components/ArticleEdit.vue")
    },
    //  文章分类管理
    {
        path: "/articleTypeManage",
        name: "articleTypeManage",
        component: () => import("./components/ArticleTypeManage.vue")
    },
    //  文章标签管理
    {
        path: "/tagManage",
        name: "tagManage",
        component: () => import("./components/TagManage.vue")
    },
    //  文章图片管理
    {
        path: "/articlePictureManage",
        name: "articlePictureManage",
        component: () => import("./components/ArticlePictureManage.vue")
    },
    //  文章管理
    {
        path: "/articleManage",
        name: "articleManage",
        component: () => import("./components/ArticleManage.vue")
    },
    //  文章回复管理
    {
        path: "/articleReplyManage",
        name: "articleReplyManage",
        component: () => import("./components/ArticleReplyManage.vue")
    },
    //  文章楼中楼回复管理
    {
        path: "/articleInsideReplyManage",
        name: "articleInsideReplyManage",
        component: () => import("./components/ArticleInsideReplyManage.vue")
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
        component: () => import("./views/AdminLogin.vue")
    },
    //  管理员登陆
    {
        path: "/adminLogin",
        name: "adminLogin",
        component: () => import("./views/AdminLogin.vue"),
        meta : {
            showNav : true
        }
    },
    //  新世界
    {
        path: "/newWorld",
        name: "newWorld",
        component: () => import("./views/NewWorld.vue"),
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
