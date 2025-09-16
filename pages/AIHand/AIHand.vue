<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:52:28
 * @LastEditTime: 2025-04-13 00:10:52
 * @Description: AI测手相
-->
<template>
  <view class="mtBg" :style="'font-family:' + fontfamily" id="AIHand">
    <topBar :title="'AI测手相'" :showImg="true"></topBar>
    <!--  -->
    <view class="main-box">
      <view class="text"> AI测手相：科技解锁命运密码，一掌看透你的未来！ </view>
      <image
        class="bg"
        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/shouxiang/aihand-home.png?x-oss-process=image/quality,Q_100"
        mode="widthFix"
      />
      <view class="button" @click="toFN('/pages/AIHand/camera/index')">
        立即测算
      </view>
    </view>
  </view>
</template>
<script>
import topBar from "../../components/topBar.vue";

export default {
  components: {
    topBar,
  },
  data() {
    return {};
  },
  computed: {
    fontfamily() {
      return this.$store.state.fontfamily;
    },
  },
  onReachBottom() {},
  methods: {
    toFN(url) {
      uni.navigateTo({
        url,
      });
    },
  },
};
</script>
<style lang="scss">
page {
  background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100)
    no-repeat;
  background-size: 100% auto;
  height: 100%;
  overflow: auto;
}

#AIHand {
  .main-box {
    width: 100vw;
    position: fixed;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .bg {
      width: 100%;
      height: 1408rpx;
    }
    .text {
      color: #e5dba8;
      font-size: 36rpx;
      font-weight: 500;
      position: absolute;
      left: 40rpx;
      top: 104rpx;
      width: 510rpx;
      z-index: 999;
    }
    .button {
      position: absolute;
      bottom: 116rpx;
      width: 710rpx;
      height: 100rpx;
      border-radius: 40rpx;
      // background: var(--, linear-gradient(180deg, #88550F 0%, #B28850 100%));
      // background-color: #9B6D2D;
      background: linear-gradient(to bottom, #88550f, #b28850);
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 36rpx;
      z-index: 999;
    }
  }
}
</style>
