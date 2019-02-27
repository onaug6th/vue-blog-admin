<template>

    <div class="app">
        
        <div ref="contentRef">
            <transition name="fade">
                <!-- 路由页面出口 -->
                <router-view/>
            </transition>
        </div>

        <superFooter ref="superFooterRef"></superFooter>
        <!-- 结束啦 :) -->
    </div>

</template>

<script>
import superFooter from './components/superFooter.vue';

export default {
    data(){
        return {}
    },
    computed: {},
    components:{
        superFooter
    },
    mounted() {
        //  获取文章分类列表
        this.$http({
            url: 'articleType/list',
            method: 'post'
        }).then(result =>{
            this.$store.commit("updateArticleTypeList", result.data.rows);
        });

        //  获取标签列表
        this.$http({
            url: 'tag/list',
            method: 'post'
        }).then(result => {
            this.$store.commit("updateTagList", result.data.rows);
        });

        this.$refs.contentRef.style.minHeight = (document.documentElement.clientHeight - this.$refs.superFooterRef.$el.clientHeight) + "px";
    },
    methods:{
    }
}
</script>
<style lang="scss">
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
        .portlet-title{
            padding: 0;
            min-height: 48px;
            border-bottom: 1px solid #eef1f5;
            margin-bottom: 10px;
            overflow: hidden;
        }
        .caption{
            padding: 10px 0;
            display: inline-block;
            font-size: 16px;
            line-height: 18px;
        }
    }
</style>
