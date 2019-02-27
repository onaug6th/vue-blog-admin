<template>
    <div>
        <p class="alert top-alert">文章管理<br />
            <font size="1">文章管理</font>
        </p>
        <div class="row">
            <div class="col-sm-12">
                <div class="portlet">
                    <div class="portlet-title">
                        <div class="caption" style="color:#32c5d2;">
                            <i class="glyphicon glyphicon-user"></i>
                            <span> 文章管理 </span>
                        </div>
                    </div>
                    <div>
                        <superOperate :config="operateConfig"></superOperate>
                        <superTable ref="superTable" :config="tableConfig" @pageChange="getArticleList"></superTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import superOperate from "@/components/superOperate.vue";
import superTable from "@/components/superTable.vue";

export default {
    name: 'articleManage',
    components: {
        superOperate,
        superTable
    },
    data(){
        return {
            tableConfig : {},
            operateConfig : {}
        }
    },
    mounted(){
        this.setTableConfig();
        this.setOperateConfig();
        this.getArticleList();
    },
    computed:{

    },
    methods : {
        //  设置超级表格组件配置
        setTableConfig(){
            const that = this;
            this.tableConfig = {
                checkbox : true,
                clickToSelect : true,
                colOption : [
                    {
                        field : "id",
                        label : "文章ID"
                    },
                    {
                        field : "type",
                        label : "文章所属类型",
                        formatter: (field, tr) =>{
                            return that.getTypeNameById(tr[field]);
                        }
                    },
                    {
                        field : "tag",
                        label : "文章标签",
                        formatter: (field, tr) =>{
                            return that.getTagNameById(tr[field]);
                        }
                    },
                    {
                        field : "title",
                        label : "文章标题"
                    },
                    {
                        field : "bgUrl",
                        label : "背景图片",
                        formatter: (field, tr) =>{
                            return `<div>${tr[field] ? "有" : ""}</div>`;
                        }
                    },
                    {
                        field : "show",
                        label : "展示",
                        formatter: (field, tr) =>{
                            return `<div>${+tr[field] ? "是" : "否"}</div>`;
                        }
                    },
                    {
                        field : "homeShow",
                        label : "首页展示",
                        formatter: (field, tr) =>{
                            return `<div>${+tr[field] ? "是" : "否"}</div>`;
                        }
                    },
                    {
                        field : "read",
                        label : "阅读量"
                    },
                    {
                        field : "like",
                        label : "点赞"
                    },
                    {
                        field : "createdAt",
                        label : "时间",
                        formatter: (field, tr) =>{
                            return `<div>${tr[field].split(" ")[0]}</div>`;
                        }
                    },
                    {
                        field : "operate",
                        label : "操作",
                        jsxRender: (h, params) =>{
                            return (
                                <div>
                                    <button 
                                        class="btn btn-primary" 
                                        onClick={() => {
                                            this.openEdit(params.row, "edit");
                                        }}
                                        >编辑</button>
                                </div>
                            )
                        }
                    }
                ],
                data : [],
                pagination : {
                    prevText : "前页",
                    nextText : "后页",
                    page : 1,
                    pageSize : 10,
                    totalPages : 0
                }
            }
        },
        //  设置操作区域组件配置
        setOperateConfig(){
            this.operateConfig = {
                list : [
                    {
                        type : "dropdown",
                        text : "删除操作",
                        list : [
                            {
                                text : "删除文章",
                                events : {
                                    onClick : {
                                        fn : this.deleteArticle,
                                        params : [this.tableConfig]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        },
        /**
         * 打开编辑页面
         * @param {object} item 行对象
         */
        openEdit(item){
            this.$router.push({
                path : `/articleEdit`,
                query : {
                    article : item
                }
            });
        },
        /**
         * 通用操作，处理模态框新增和编辑动作
         * @param {object} modalConfig 模态框配置
         * @param {string} type 类型
         */
        commonHandle(modalConfig, type){
            const that = this;
            const formData = modalConfig.form.data;
            let method = "post"
            let url = "articleType";

            type == "edit" && (method = "put", url += `/${formData.id}`);

            that.$http[method](url, formData)
                .then( (result) =>{
                    that.$swal(result.detailMsg);
                    modalConfig.show = false;
                    that.getArticleList();
                });

        },
        //  获取文章类型列表
        getArticleList(){
            
            this.$http({
                url: 'article/list',
                method: 'post',
                data : {
                    page : this.tableConfig.pagination.page,
                    pageSize : this.tableConfig.pagination.pageSize,
                    type : "admin"
                }
            }).then((result) =>{
                    this.tableConfig.data = result.data.rows;
                    this.tableConfig.pagination.totalPages = result.data.totalPages
                });

        },
        /**
         * 删除文章
         * @param {object} item 组件传回来的我也忘了是啥
         */
        deleteArticle(item){
            const checkedData = this.$refs.superTable.checkedData.map((item, index) =>{
                return item["id"];
            });

            if(!checkedData.length){
                return this.$swal("请选择要操作的数据");
            }

            this.$http.delete("article", {
                    data : {
                        arr : checkedData
                    }
                })
                .then((result) =>{
                    this.$swal(result.detailMsg);
                    this.getArticleList();
                });
                
        }
    }
}
</script>
