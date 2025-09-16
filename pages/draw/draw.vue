<!--
 * @Author: fujihang
 * @Date: 2025-01-23 20:36:39
 * @LastEditTime: 2025-03-15 21:19:35
 * @Description: 塔罗牌抽牌封面
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='draw'>
        <topBar title="" :showImg="true"></topBar>

        <image style="width: 100vw;height: 1rpx;" :src="'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/kaBg' +index+'.png?x-oss-process=image/quality,Q_100'"
            mode="widthFix" />
        <!--  -->
        <view class="btnV flex-a fw">
            <view class="btn tc s38 " @click="toFN">开始抽牌</view>
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
            index: 0,
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        let data = uni.getStorageSync('reckon')
        if (data.reckonName.includes('我們會在')) {
            this.index = 4
        } else if (data.reckonName.includes('個人財富')) {
            this.index = 2
        } else if (data.reckonName.includes('如何挽回')) {
            this.index = 1
        } else if (data.reckonName.includes('Ta 心')) {
            this.index = 3
        }

    },
    methods: {
        toFN(){
            uni.redirectTo({ url: '/pages/prophet/prophet' })
        },
    },
}
</script>
<style lang='scss'>
#draw {
    position: relative;

    .btnV {
        position: fixed;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%);
        z-index: 2;
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
</style>