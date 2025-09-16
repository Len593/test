<!--
 * @Author: fujihang
 * @Date: 2023-07-05 16:01:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-06-15 16:16:27
 * @Description: 弹窗
-->
<template>
    <view :style="'bottom:' + (bottom || 0)" :class="['fuUpdate', showPopup && 'showPopup']" @click="closeFN">
        <!--  -->
        <view :class="['alertContent', !copyObj.hideBtn && 'alertHiddren']" @click.stop="() => { }">


            <!--  -->
            <view class="contentFlex-1 tc">
                <view class="title c3">
                    版本更新提醒
                </view>
                <view class="value" style="height: 200rpx;"></view>
                <view class="flex-a jc" >
                    <view class="btn tc" @click="okFN">
                        更新
                    </view>
                </view>


            </view>
            <!--  -->
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>

        </view>
    </view>
</template>

<script>

export default {
    props: ["title", "showPopup", "btn", "hideBtn", "canAuto", "bottom"],
    data() {
        return {

            copyObj: {},
        };
    },
    watch: {
        showPopup(newVal, oldVal) {

            if (!newVal) return;
            this.copyObj = JSON.parse(
                JSON.stringify({
                    title: this.title || ' ',
                    showPopup: this.showPopup,
                    btn: this.btn,
                    hideBtn: this.hideBtn,
                    canAuto: this.canAuto,
                })
            );
        },
    },
    created() {
  
        this.copyObj = JSON.parse(
            JSON.stringify({
                title: this.title || ' ',
                showPopup: this.showPopup,
                btn: this.btn,
                hideBtn: this.hideBtn,
                canAuto: this.canAuto,
            })
        );

    },
    methods: {
        okFN(){
            this.$emit('okFN')
        },
        //
        sureFN() {
            this.$emit("sureFN");
        },
        //
        closeFN() {


            this.$emit("close");
            if (this.canAuto) return;
            this.$emit("update:showPopup", false);
        },
        trueFun() {
            console.log("占位：函数 true 未声明");
        },
    },
};
</script>

<style lang="scss">
.fuUpdate {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    visibility: hidden;
    background: rgba(28, 17, 5, 0.8);
    display: flex;
    align-items: center;

    .alertHiddren {}

    .alertContent {
        transition: 0.3s;
        margin: 0 90rpx;
        width: calc(100vw - 180rpx);
        height: 677rpx;
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/alertBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        display: none;
        // align-items: center;
        transform: translateY(100%);
        z-index: 2;
        position: relative;

        &::before,
        &::after {
            position: absolute;
            border: 2rpx solid rgba(226, 204, 192, 0.4);
            content: ' ';
        }

        &::before {
            height: calc(100% + 30rpx);
            width: calc(100% + 28rpx);
            top: -16rpx;
            left: -16rpx;

        }

        &::after {
            height: calc(100% + 18rpx);
            width: calc(100% + 12rpx);
            top: -10rpx;
            left: -8rpx;
        }

        .angle {
            image {
                position: absolute;
                height: 1rpx;
                width: 60rpx;
                z-index: 3;
            }

            .img1 {
                top: -16rpx;
                left: -16rpx;
            }

            .img2 {
                top: -16rpx;
                right: -16rpx;
                transform: rotateZ(90deg);
            }

            .img3 {
                bottom: -16rpx;
                left: -16rpx;
                transform: rotateZ(270deg);

            }

            .img4 {
                bottom: -16rpx;
                right: -16rpx;
                transform: rotateZ(180deg);

            }
        }

        .contentFlex-1 {
            flex: 1;
            // overflow: hidden;
            position: relative;
            z-index: 10;
            .title{
                font-size: 46rpx;
                margin: 82rpx 0 20rpx;

            }

            .btn {
                background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btn2.png?x-oss-process=image/quality,Q_100) no-repeat;
                background-size: 100% auto;
                width: 332rpx;
                height: 114rpx;
                line-height: 114rpx;
            }
        }
    }

    .titleP {
        padding: 53rpx 0 32rpx;
        text-align: center;
        font-weight: bold;
        font-size: 31rpx;

        text {
            position: relative;

            &::before,
            &::after {
                position: absolute;
                top: 15rpx;
                width: 106rpx;
                height: 13rpx;
                background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/titleBg.png?x-oss-process=image/quality,Q_100) no-repeat 100%;
                content: ' ';
            }

            &::before {
                left: -140rpx;

            }

            &::after {
                right: -140rpx;
                transform: rotateZ(180deg);
            }
        }

    }


}

.showPopup {
    // visibility: visible;
    animation: test 0.1s;
    animation-fill-mode: forwards;
    // background: rgba(0, 0, 0, 0.5);
    visibility: visible;

    .alertContent {

        animation: test2 0.2s;
        animation-fill-mode: forwards;
        display: flex;
    }
}

@keyframes test {
    0% {
        visibility: visible;
        background: rgba(0, 0, 0, 0.1);
    }

    100% {
        visibility: visible;
        background: rgba(0, 0, 0, 0.5);
    }
}

@keyframes test2 {
    0% {
        display: flex;
    }

    100% {
        display: flex;
        transform: translateY(0);
    }
}
</style>