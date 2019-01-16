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
//  获取文章类型列表
import { articleTypeList } from "./api/articleType.js";

export default {
    data(){
        return {
            
        }
    },
    computed: {},
    components:{
        superFooter
    },
    mounted() {
        articleTypeList().then( (result) =>{
            this.$store.commit("updateArticleTypeList", result.data.rows);
        });
        this.$refs.contentRef.style.minHeight = (document.documentElement.clientHeight - this.$refs.superFooterRef.$el.clientHeight) + "px";
    },
    methods:{
    }
}
</script>
