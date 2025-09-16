<!--
 * @Author: fujihang
 * @Date: 2023-07-05 16:01:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-05-23 22:03:47
 * @Description: 底部弹窗
-->
<template>
    <view :style="'bottom:' + (bottom || 0)" :class="['fuPopup', showPopup && 'showPopup']" @click="closeFN">
        <!--  -->
        <view :class="['alertContent', !copyObj.hideBtn && 'alertHiddren']" @click.stop="() => { }">
            <!-- <image @click="closeFN" class="close" src="https://upaiyun.reabam.com/miniprogram/imgs/close-square.png?x-oss-process=image/quality,Q_100?1"
                mode="widthFix" /> -->
            <view class="bg"></view>
            <view class="titleP c1">
                <text>
                    {{ copyObj.title || "提示" }}

                </text>
            </view>
            <!--  -->
            <view class="contentFlex-1">
                <slot></slot>
            </view>
            <!--  -->

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
.fuPopup {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    visibility: hidden;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: flex-end;

    .alertHiddren {
        overflow: hidden;
    }

    .alertContent {
        position: relative;
        .bg {
            top: -70rpx;
            left: 0;
            width: 100%;
            position: absolute;
            height: 73rpx;
            background: #666976;
            filter: blur(46rpx);
        }

        .close {
            position: absolute;
            height: 1rpx;
            width: 48rpx;
            top: 28rpx;
            right: 30rpx;
        }

        transition: 0.3s;
        // position: absolute;
        bottom: 0rpx;
        left: 0;
        width: 100%;
        max-height: 90vh;
        min-height: 440rpx;
        background: #30384B;
        display: none;
        // align-items: center;
        flex-direction: column;
        transform: translateY(100%);
        z-index: 2;
        border-top: 2px solid #ffffff3e;

        border-radius: 57rpx 57rpx 0 0;

        .contentFlex-1 {
            flex: 1;
            overflow: hidden;
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