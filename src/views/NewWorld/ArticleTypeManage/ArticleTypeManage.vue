<template>
    <div>
        <p class="alert top-alert">文章分类管理<br />
            <font size="1">文章分类管理</font>
        </p>
        <div class="row">
            <div class="col-sm-12">
                <div class="portlet">
                    <div class="portlet-title">
                        <div class="caption" style="color:#32c5d2;">
                            <i class="glyphicon glyphicon-user"></i>
                            <span> 文章类型管理 </span>
                        </div>
                    </div>
                    <div>
                        <superOperate :config="operateConfig"></superOperate>
                        <superTable ref="superTable" :config="tableConfig"></superTable>
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
    name: 'articleTypeManage',
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
    },
    computed:{

    },
    methods : {
        //  设置超级表格组件配置
        setTableConfig(){
            this.tableConfig = {
                checkbox : true,
                data: this.$store.state.articleTypeList,
                clickToSelect : true,
                colOption : [
                    {
                        field : "id",
                        label : "ID"
                    },
                    {
                        field : "name",
                        label : "文章分类名称"
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
                                            this.openModal(params.row, "edit");
                                        }}
                                        >编辑</button>
                                </div>
                            )
                        }
                    }
                ]
            }
        },
        //  设置操作区域组件配置
        setOperateConfig(){
            this.operateConfig = {
                list : [
                    {
                        type : "button",
                        text : "新增分类",
                        events : {
                            onClick : {
                                fn : this.openModal,
                                params : ["add"]
                            }
                        }
                    },
                    {
                        type : "dropdown",
                        text : "删除操作",
                        list : [
                            {
                                text : "删除分类",
                                events : {
                                    onClick : {
                                        fn : this.deleteType,
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
                title : "添加分类",
                backdrop : "static",
                show : false,
                form : {
                    config : [
                        {
                            labelText : "分类名称",
                            field : "name",
                            type : "text"
                        },
                        {
                            labelText : "分类背景图片",
                            field : "bgUrl",
                            type : "text"
                        },
                        {
                            labelText : "分类说明",
                            field : "intro",
                            type : "text"
                        }
                    ],
                    data : {
                        name : ""
                    }
                },
                footer: {
                    textalign : "center",
                    btnList : [
                        {
                            id : "add",
                            show : true,
                            type : "primary",
                            text : "新增",
                            events : {
                                onClick : {
                                    fn : this.commonHandle,
                                    params : ["add"]
                                }
                            }
                        },
                        {
                            id : "edit",
                            show : true,
                            type : "primary",
                            text : "修改",
                            events : {
                                onClick : {
                                    fn : this.commonHandle,
                                    params : ["edit"]
                                }
                            }
                        }
                    ]
                }
            }
        },
        /**
         * 打开超级模态框
         * @param {object} item 忘了，是自己写的模态框里传回来的，反正很多数据在里面。
         * @param {string} type 类型
         */
        openModal(item, type){
            
            const modal = this.modalConfig;
            const footer = modal.footer;
            
            if(type == "edit"){
                for(let i in item){
                    (modal.form.data[i] = item[i]);
                }
            }else{
                for(let i in modal.form.data){
                    modal.form.data[i] = "";
                }
            }

            footer.btnList.forEach((btn, index)=>{
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
            let url = "articleType";

            type == "edit" && (method = "put", url += `/${formData.id}`);

            that.$http[method](url, formData)
                .then( (result) =>{
                    that.$swal(result.detailMsg);
                    modalConfig.show = false;
                    that.updateArticleTypeList();
                });

        },
        //  更新文章类型列表
        updateArticleTypeList(){

            this.$http({
                url: 'articleType/list',
                method: 'post'
            }).then(result =>{
                this.$store.commit("updateTagList", result.data.rows);
            });
        },
        /**
         * 删除文章类型
         * @param {object} item 组件传回来的我也忘了是啥
         */
        deleteType(item){

            const checkedData = this.$refs.superTable.checkedData.map((item, index)=>{
                return item["id"]
            });

            if(!checkedData.length){
                return this.$swal("请选择要操作的数据");
            }

            this.$http.delete("articleType", {
                    data : {
                        arr : checkedData
                    }
                })
                .then((result) =>{
                    this.$swal(result.detailMsg);
                    this.updateArticleTypeList();
                });
                
        }
    }
}
</script>
