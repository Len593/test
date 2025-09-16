<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:52:28
 * @LastEditTime: 2025-04-13 00:10:52
 * @Description: 我的订单
-->
<template>
  <view
    class="mtBg"
    :style="'font-family:' + fontfamily"
    id="constellationGuide"
  >
    <topBar :title="'星座选择'" :showImg="true"></topBar>

    <view class="main-box">
      <view v-for="(item, index) in list" :key="index" class="row">
        <view class="title">{{ item.title }}</view>
        <view class="xz">
          <view
            v-for="(detItem, detIndex) in item.det"
            :key="detIndex"
            class="xz-box"
            @click="
              toFN(
                '/pages/constellationGuide/constellationGuideRes?id=' +
                  detItem.id
              )
            "
          >
            <image
              class="xz-box-img"
              :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/xingzuo/constG-xz-${detItem.svgName}.svg`"
              mode="widthFix"
            ></image>
            <view class="xz-box-text">{{ detItem.text }}</view>
          </view>
        </view>
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
    return {
      list: [
        {
          title: "火象星座",
          det: [
            {
              svgName: "by",
              text: "白羊座",
              id: "0",
            },
            {
              svgName: "sz",
              text: "狮子座",
              id: "4",
            },
            {
              svgName: "ss",
              text: "射手座",
              id: "8",
            },
          ],
        },
        {
          title: "土象星座",
          det: [
            {
              svgName: "jn",
              text: "金牛座",
              id: "1",
            },
            {
              svgName: "cn",
              text: "处女座",
              id: "5",
            },
            {
              svgName: "mj",
              text: "摩羯座",
              id: "9",
            },
          ],
        },
        {
          title: "风象星座",
          det: [
            {
              svgName: "ssz",
              text: "双子座",
              id: "2",
            },
            {
              svgName: "tc",
              text: "天秤座",
              id: "6",
            },
            {
              svgName: "sp",
              text: "水瓶座",
              id: "10",
            },
          ],
        },
        {
          title: "水象星座",
          det: [
            {
              svgName: "jx",
              text: "巨蟹座",
              id: "3",
            },
            {
              svgName: "tx",
              text: "天蝎座",
              id: "7",
            },
            {
              svgName: "sy",
              text: "双鱼座",
              id: "11",
            },
          ],
        },
      ],
    };
  },
  computed: {
    fontfamily() {
      return this.$store.state.fontfamily;
    },
  },

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

#constellationGuide {
  .main-box {
    background-color: #fffaf5;
    padding: 46rpx 20rpx;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    font-size: 38rpx;
    width: 100vw;
    min-height: 90vh;
    color: #3c2e17;
    font-weight: 500;
    font-size: 32rpx;
    .title {
      display: flex;
      width: 216rpx;
      height: 68rpx;
      padding: 8rpx;
      justify-content: center;
      align-items: center;
      background: linear-gradient(to bottom, #88550f, #b28850);
      color: #fff;
      border-radius: 8rpx;
      font-size: 36rpx;
      font-weight: 500;
    }
    .row {
      .xz {
        width: 100%;
        display: flex;
        align-content: center;
        justify-content: space-between;
        .xz-box {
          margin-top: 26rpx;
          margin-bottom: 24rpx;
          border-radius: 26rpx;
          background: #fff3e4;
          width: 220rpx;
          height: 219rpx;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .xz-box-img {
            width: 114rpx;
            height: 110rpx;
          }
          .xz-box-text {
            padding-top: 18rpx;
          }
        }
      }
    }
  }
}
</style>
