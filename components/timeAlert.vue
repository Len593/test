<!--
 * @Author: fujihang
 * @Date: 2023-07-05 16:01:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-05-23 22:04:02
 * @Description: 底部弹窗
-->
<template>
    <view :style="'bottom:' + (bottom || 0)" :class="['fuPopup', showPopup && 'showPopup']" @click="closeFN">
        <!--  -->
        <view :class="['alertContent', !copyObj.hideBtn && 'alertHiddren']" @click.stop="() => { }">
            <!-- <image @click="closeFN" class="close" src="https://upaiyun.reabam.com/miniprogram/imgs/close-square.png?x-oss-process=image/quality,Q_100?1"
                mode="widthFix" /> -->
            <view class="titleP c1">
             <navTab :list="list" @choose="chooseFN"></navTab>
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
import navTab from './navTab.vue'
export default {
    props: ["title", "showPopup", "btn", "hideBtn", "canAuto", "bottom"],
    components:{
        navTab
    },
    data() {
        return {
            list:[
                {
                    name:'公曆',
                },
                {
                    name:'農曆',
                },
            ],
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
        chooseFN(item,index){
            this.$emit('choose',item.index)
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
        border-radius: 57rpx 57rpx 0 0;
        display: none;
        // align-items: center;
        flex-direction: column;
        transform: translateY(100%);
        z-index: 2;

        .contentFlex-1 {
            flex: 1;
            overflow: hidden;
        }
    }

    .titleP {
        
        padding: 60rpx 160rpx 20rpx;
        font-size: 29rpx !important;
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