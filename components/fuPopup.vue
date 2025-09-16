<!--
 * @Author: fujihang
 * @Date: 2023-07-05 16:01:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2025-06-15 20:46:14
 * @Description: 底部弹窗
-->
<template>
  <view :style="'bottom:' + (bottom || 0)" :class="['fuPopup', showPopup && 'showPopup']" @click="closeFN">
    <!--  -->
    <view :class="['alertContent', !copyObj.hideBtn && 'alertHiddren']" @click.stop="() => { }">
      <image @click="closeFN" class="close" src="https://upaiyun.reabam.com/miniprogram/imgs/close-square.png?x-oss-process=image/quality,Q_100?1"
        mode="widthFix" />
      <view class="titleP">
        {{ copyObj.title || "提示" }}
      </view>
      <!--  -->
      <view class="contentFlex-1">
        <slot></slot>
      </view>
      <!--  -->
      <view class="btnP" v-if="!copyObj.hideBtn">
        <span style="background: #e0bb8e" class="sad" @click="sureFN">{{
          copyObj.btn || "提交"
        }}</span>
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
    max-height: 70vh;
    min-height: 440rpx;
    background: #fff;
    border-radius: 32rpx 32rpx 0px 0px;
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
    padding: 32rpx 0;
    text-align: center;
    font-weight: bold;
    font-size: 32rpx;
    color: #3e3e3e;
  }

  .btnP {
    display: flex;
    align-items: center;
    padding: 22rpx 30rpx 68rpx;
    border-top: 1rpx solid #eee;
    box-sizing: border-box;

    span {
      width: 100%;
      color: #fff;
      padding: 20rpx 0 23rpx;
      border-radius: 44rpx;
      font-size: 32rpx;
      font-weight: 600;
      text-align: center;
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
