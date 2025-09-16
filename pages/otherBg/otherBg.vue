<!--
 * @Author: fujihang
 * @Date: 2025-03-09 15:41:06
 * @LastEditTime: 2025-03-15 21:16:38
 * @Description: 婚姻封面
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='otherBg' class="">
        <topBar title="" :showImg="true"></topBar>
        <view class="sss">
            <image class="img" v-for="(item, index) in imgList" :key="item" :style="'z-index:' + index" :src="item"
                mode="widthFix" />

        </view>

        <view class="btnV flex-a fw">
            <view class="btn tc s38 " @click="toFN">立即测算</view>
        </view>
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
            imgList: [
                'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/WechatIMG40.jpg?x-oss-process=image/quality,Q_100',
                'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/WechatIMG41.jpg?x-oss-process=image/quality,Q_100',
                'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/WechatIMG43.jpg?x-oss-process=image/quality,Q_100',
            ],

        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        let data = uni.getStorageSync('reckon')
        if (data.yuanFenJuType == 13) {
            this.imgList = [
                'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/WechatIMG45.jpg?x-oss-process=image/quality,Q_100',
                'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/WechatIMG46.jpg?x-oss-process=image/quality,Q_100',
                'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/WechatIMG47.jpg?x-oss-process=image/quality,Q_100',
            ]
        }
    },
    methods: {
        toFN() {
            uni.redirectTo({ url: '/pages/otherPay/otherPay' })
        },
    },
}
</script>
<style lang='scss'>
page {
    height: 100%;
    overflow: auto;
    
}

#otherBg {
    .sss {
        :first-child {
            margin-top: 0 !important;

        }

        .img {
            margin-top: -4rpx;
        }
    }

    .img {
        position: relative;
        height: 1rpx;
        width: 100%;
        display: block;
        clear: both;
    }

    .btnV {
        position: fixed;
        bottom: 5%;
        left: 26%;
        // transform: translate(-50%);
        z-index: 2;
        animation: intc 2s infinite;
        image {
            height: 1rpx;
            width: 30rpx;
        }

        .btn {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;

            line-height: 110rpx;
            width: 336rpx;
            height: 110rpx;
        }
    }
}
@keyframes intc{
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.1);

    }
    100%{
        transform: scale(1);
    }
}
</style>