<template>
    <div>
        <p class="alert top-alert">墙管理<br />
            <font size="1">墙管理</font>
        </p>
        <div class="row">
            <div class="col-sm-12">
                <div class="portlet">
                    <div class="portlet-title">
                        <div class="caption" style="color:#32c5d2;">
                            <i class="glyphicon glyphicon-user"></i>
                            <span> 墙管理 </span>
                        </div>
                    </div>
                    <div>
                        <superOperate :config="operateConfig"></superOperate>
                        <superTable ref="superTable" :config="tableConfig" @pageChange="getWallList"></superTable>
                    </div>
                </div>
            </div>
        </div>
        <superModal :config="modalConfig"></superModal>
    </div>
</template>

<script>
import superOperate from "@/components/superOperate.vue";
import superTable from "@/components/superTable.vue";
import superModal from "@/components/superModal.vue";

export default {
    name: 'wallManage',
    components: {
        superOperate,
        superTable,
        superModal
    },
    data(){
        return {
            tableConfig : {},
            operateConfig : {},
            modalConfig : {}
        }
    },
    mounted(){
        this.setTableConfig();
        this.setOperateConfig();
        this.setModalConfig();
        this.getWallList();
    },
    computed:{

    },
    methods : {
        //  设置超级表格组件配置
        setTableConfig(){
            this.tableConfig = {
                checkbox : true,
                clickToSelect : true,
                colOption : [
                    {
                        field: "id",
                        label: "id"
                    },
                    {
                        field: "title",
                        label: "贴纸标题"
                    },
                    {
                        field: "content",
                        label: "内容"
                    },
                    {
                        field: "operate",
                        label: "操作",
                        jsxRender: (h, params) => {
                            return (
                                <div>
                                <button
                                    class="btn btn-primary"
                                    onClick={() => {
                                    this.openModal(params.row, "edit");
                                    }}
                                >
                                    编辑
                                </button>
                                </div>
                            );
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
                        type: "button",
                        text: "新增贴纸",
                        events: {
                            onClick: {
                                fn: this.openModal,
                                params: ["add"]
                            }
                        }
                    },
                    {
                        type : "dropdown",
                        text : "删除操作",
                        list : [
                            {
                                text : "删除文章回复",
                                events : {
                                    onClick : {
                                        fn : this.deleteWall,
                                        params : [this.tableConfig]
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        },
        //  设置超级模态框组件配置
        setModalConfig(){
            this.modalConfig = {
                title : "编辑文章回复",
                backdrop : "static",
                show : false,
                form : {
                    config : [
                        {
                            labelText: "贴纸标题",
                            field: "title",
                            type: "text"
                        },
                        {
                            labelText: "贴纸介绍",
                            field: "intro",
                            type: "text"
                        },
                        {
                            labelText: "作者",
                            field: "name",
                            type: "text"
                        },
                        {
                            labelText: "作者IP",
                            field: "ip",
                            type: "text"
                        },
                        {
                            labelText: "内容",
                            field: "content",
                            type: "text"
                        },
                        {
                            labelText: "我的回复",
                            field: "reply",
                            type: "text"
                        },
                        {
                            labelText: "回复时间",
                            field: "replyDate",
                            type: "text"
                        },
                        {
                            labelText: "展示",
                            field: "show",
                            type: "text"
                        }
                    ],
                    data : {
                        title: "",
                        intro: "",
                        name: "",
                        ip: "",
                        content: "",
                        reply: "",
                        replyDate: "",
                        show: ""
                    }
                },
                footer: {
                    textalign : "center",
                    btnList : [
                        {
                            id: "add",
                            show: true,
                            type: "primary",
                            text: "新增",
                            events: {
                                onClick: {
                                fn: this.commonHandle,
                                params: ["add"]
                                }
                            }
                        },
                        {
                            id: "edit",
                            show: true,
                            type: "primary",
                            text: "修改",
                            events: {
                                onClick: {
                                    fn: this.commonHandle,
                                    params: ["edit"]
                                }
                            }
                        }
                    ]
                }
            }
        },
        /**
         * 打开编辑页面
         * @param {object} item 行对象
         */
        openModal(item, type){
            const modal = this.modalConfig;
            const footer = modal.footer;

            if (type == "edit") {
                for (let i in item) {
                    modal.form.data[i] = item[i];
                }
            } else {
                for (let i in modal.form.data) {
                    modal.form.data[i] = "";
                }
            }

            footer.btnList.forEach((btn, index) => {
                btn.id == type ? (btn.show = true) : (btn.show = false);
            });

            modal.show = true;
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
            let url = "wall";

            type == "edit" && (method = "put", url += `/${formData.id}`);

            that.$http[method](url, formData)
                .then( (result) =>{
                    that.$swal(result.detailMsg);
                    modalConfig.show = false;
                    that.getWallList();
                });

        },
        //  获取文章类型列表
        getWallList(){

            this.$http({
                url: 'wall/list',
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
         * 删除文章回复
         * @param {object} item 组件传回来的我也忘了是啥
         */
        deleteWall(item){
            const checkedData = this.$refs.superTable.checkedData.map((item, index)=>{
                return item["id"]
            });

            if(!checkedData.length){
                return this.$swal("请选择要操作的数据");
            }

            this.$http.delete("wall", {
                    data : {
                        arr : checkedData
                    }
                })
                .then( (result) =>{
                    this.$swal(result.detailMsg);
                    this.getWallList();
                });
                
        }
    }
}
</script>

<style lang="scss" scoped>
    .top-alert {
        background: #f5f8fd;
        color: #010407;
        border-left: 5px solid #8bb4e7;
    }
    .portlet{
        padding: 12px 20px 15px;
        background-color: #fff;
        border-radius: 5px;
        min-height: 400px;
    }
    .portlet .portlet-title{
        padding: 0;
        min-height: 48px;
        border-bottom: 1px solid #eef1f5;
        margin-bottom: 10px;
        overflow: hidden;
    }
    .portlet .caption{
        padding: 10px 0;
        display: inline-block;
        font-size: 16px;
        line-height: 18px;
    }
</style>