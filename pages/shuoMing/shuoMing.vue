<!--
 * @Author: fujihang
 * @Date: 2025-02-24 22:17:17
 * @LastEditTime: 2025-03-25 21:59:22
 * @Description: 
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='shuoMing' class="mtBg cf">
        <topBar :title="type == 1 ? '服务条款' : '隐私权益政策'" :showImg="true"></topBar>
        <view v-html="text"></view>

    </view>
</template>
<script>
import topBar from '../../components/topBar.vue'
export default {
    components: {
        topBar
    },
    data() {
        return {
            type: 1,
            text:'',
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad(options) {
        this.type = options.type
        this.getData()
    },
    methods: {
        getData(){
            this.reqFN({
                url: this.type == 1 ?'/calculate-api/api/secure/sysConfigure/getServiceAgreement':'/calculate-api/api/secure/sysConfigure/getPrivacyPolicy',
                method: 'GET'
            }).then(res => {
                console.log(res, '---');
                if (res.data.code == 0) {
                    if(res.data.data){
                        this.text=res.data.data.replace(/\n/g,'</br>')
                    }else this.text='<text>无</text>'
                    console.log(this.text,'---');
                    
                    
                }
            })
        },
    },
}
</script>
<style lang='scss'>
page{
    height: 100%;
    overflow: auto;
}
#shuoMing {
    height: 100%;
    overflow: auto;
    padding: 170rpx 30rpx 20rpx;
}
</style>