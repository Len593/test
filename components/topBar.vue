<!--
 * @Author: fujihang
 * @Date: 2025-02-03 11:08:14
 * @LastEditTime: 2025-06-12 22:37:07
 * @Description: 顶部导航条
-->
<template>
    <view class="topBar flex-a">
        <view class="bu" @click="backFN">
            <image
                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100"
                mode="widthFix" v-if="showImg" />
        </view>
        <text class="f1 tc cf fw" style="font-size: 46rpx;">
            {{ title || '' }}
        </text>
        <view class="bu">
            <slot></slot>
        </view>
    </view>
</template>
<script>
export default {
    props: ['title', 'showImg'],
    data() {
        return {
        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        console.log(this.title, '----title');

    },
    methods: {
        backFN() {
            console.log('backFN---');

            uni.navigateBack({
                delta: 1, fail: err => {
                    console.log(err, '----');

                }
            })
        },
    },
}
</script>
<style lang='scss'>
.topBar {
    padding: 85rpx 35rpx 55rpx;
    position: fixed;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 6;

    .bu {
        width: 104rpx;

        image {
            height: 1rpx;
            width: 34rpx;
            transform: rotateY(180deg);
        }
    }
}
</style>