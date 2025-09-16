<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:52:28
 * @LastEditTime: 2025-04-13 00:10:52
 * @Description: AI测手相
-->
<template>
  <view class="mtBg" :style="'font-family:' + fontfamily" id="AIHandRes">
    <topBar :title="'AI测手相'" :showImg="true"></topBar>
    <!--  -->
    <view class="main-box">
      <view class="title">手相看运势</view>
      <view class="fenshu" v-if="this.isOk">
        <image
          class="tips-icon"
          src="/static/imgs/tips-shuxian.png"
          mode="widthFix"
        />
        <view class="fenshu-text1">手相打分：</view>
        <view class="fenshu-text2">{{ resData.hands_shape_score }}</view>
        <view class="fenshu-text3">分</view>
      </view>
      <view v-for="(item, index) in ageList" :key="index" class="contBox">
        <view class="contBox-title">
          <image
            class="contBox-title-icon"
            :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/shouxiang/aihand-ren${
              index + 1
            }.svg`"
            mode="widthFix"
          ></image>
          <view class="contBox-title-cont"
            >{{ index === 0 ? 0 : ageList[index - 1].age }}-{{ item.age
            }}{{
              ["而立之年", "知命之年", "不惑之年", "花甲之年"][index] ||
              "花甲之年"
            }}</view
          >
        </view>
        <!-- <view class="contBox-zhuxian"
          >主线特征：生命线末端分叉→30岁前多变动；智慧线平直→学业/事业稳扎稳打</view
        > -->
        <view class="contBox-yunshi">运势：</view>
        <view class="contBox-cont">{{ item.cont }}</view>
      </view>
      <view v-for="(item, index) in shouList" :key="index" class="contBox">
        <view class="contBox-title">
          <image
            class="contBox-title-icon"
            :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/shouxiang/aihand-handicon.svg`"
            mode="widthFix"
          ></image>
          <view class="contBox-title-cont"
            >手相解说-{{
              ["拇指", "食指", "中指", "无名指", "小指"][index] || "小指"
            }}</view
          >
        </view>
        <view style="margin-top: 12rpx" class="contBox-text"
          >{{ ["拇指", "食指", "中指", "无名指", "小指"][index] || "小指" }}（{{
            item.shape
          }}）</view
        >
        <view class="contBox-text">✅特征：</view>
        <view class="contBox-endtext">{{ item.desc }}</view>
      </view>
      <view v-if="this.isOk" class="contBox">
        <view class="contBox-title">
          <image
            class="contBox-title-icon"
            :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/shouxiang/aihand-meihua.svg`"
            mode="widthFix"
          ></image>
          <view class="contBox-title-cont">手型</view>
        </view>
        <view style="margin-top: 12rpx" class="contBox-text">{{
          resData.hands_shape
        }}</view>
        <view class="contBox-text">特征：</view>
        <view class="contBox-endtext">{{ resData.hands_shape_desc }}</view>
      </view>
      <view v-if="this.isOk" class="endtext">
        注：手相需结合左右手（男左女右为先天/后天）、掌色软硬综合判断，此解析为普通分析，精准度需个案分析
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
      photoSrc: "",
      resData: {},
      isOk: false,
    };
  },
  computed: {
    fontfamily() {
      return this.$store.state.fontfamily;
    },
    ageList() {
      return (
        Object.keys(this.resData)
          .filter((key) => key.indexOf("shouxiang_further_") !== -1)
          .map((key) => {
            const keySplit = key.split("shouxiang_further_");
            return {
              age: parseInt(keySplit[1]),
              cont: this.resData[key],
            };
          })
          .sort((a, b) => a.age - b.age) || []
      );
    },
    shouList() {
      return this.isOk
        ? [
            "hands_muzhi_shape",
            "hands_shizhi_shape",
            "hands_zhongzhi_shape",
            "hands_wumingzhi_shape",
            "hands_xiaozhi_shape",
          ].map((key) => {
            return {
              shape: this.resData[key],
              desc: this.resData[key + "_desc"],
            };
          })
        : [];
    },
  },
  onLoad(query) {
    this.photoSrc = query.res;
    console.log("photoSrc==>", this.photoSrc);
    this.sendPhoto();
  },
  methods: {
    toFN(url) {
      uni.navigateTo({
        url,
      });
    },
    sendPhoto() {
      uni.showLoading({
        title: "分析中...",
      });
      let that = this;
      uni
        .$reqFN({
          url: "/calculate-api/api/secure/sysConfigure/getYuanFenInfo",
          data: {},
          method: "GET",
        })
        .then((sysRes) => {
          uni.showLoading({
            title: "分析中...",
          });
          if (sysRes.data.code == 0) {
            // 解密
            console.log("sysRes.data.data==>", sysRes.data.data);
            let appKey = uni.$decryptAES(sysRes.data.data, "oHiz8rXbXE1YzO9b");
            uni.request({
              url: "https://api.yuanfenju.com/index.php/v1/Dashuju/shouxiang",
              data: {
                api_key: appKey,
                // api_key: "V87QtBA2iQlimaUlnfSBEiXgu",
                image_url: that.photoSrc,
              },
              header: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              method: "POST",
              success: (res) => {
                console.log("成功res", res);
                if (res && res.statusCode === 200 && res.data) {
                  const data = res.data;
                  if (data.errcode !== 0) {
                    uni.showToast({
                      title: data.errmsg,
                      icon: "none",
                    });
                    return;
                  }
                  this.resData = data.data;
                  this.isOk = true;
                }
                uni.hideLoading();
              },
              fail: (err) => {
                console.log("结果err", err);
                uni.hideLoading();
              },
            });
          }
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

#AIHandRes {
  .main-box {
    background-color: #fffaf5;
    padding: 46rpx 12rpx;
    border-radius: 40rpx 40rpx 0rpx 0rpx;
    font-size: 36rpx;
    width: 100vw;
    min-height: 90vh;
    color: #3c2e17;
    font-weight: 500;
    font-size: 28rpx;
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
    .fenshu {
      font-size: 30rpx;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 24rpx 0rpx;
      .tips-icon {
        width: 8rpx;
        height: 36rpx;
        margin-right: 24rpx;
        margin-bottom: 4rpx;
      }
      .fenshu-text1 {
      }
      .fenshu-text2 {
        font-size: 40rpx;
        color: #986827;
      }
      .fenshu-text3 {
        font-size: 40rpx;
      }
    }
    .contBox {
      border-radius: 24rpx;
      background: #fff;
      width: 100%;
      padding: 0rpx 20rpx;
      margin-bottom: 26rpx;
      .contBox-title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-top: 20rpx;
        padding-bottom: 16rpx;
        .contBox-title-icon {
          width: 48rpx;
          height: 48rpx;
          margin-right: 24rpx;
        }
        .contBox-title-cont {
          font-size: 30rpx;
          font-weight: 600;
        }
      }
      .contBox-zhuxian {
        padding: 20rpx;
        border-radius: 24rpx;
        font-size: 24rpx;
        line-height: 36rpx;
        background: #fff8f1;
      }
      .contBox-yunshi {
        font-size: 30rpx;
        margin: 20rpx 0rpx;
      }
      .contBox-cont {
        padding-bottom: 24rpx;
        line-height: 36rpx;
      }

      .contBox-text {
        padding-bottom: 10rpx;
      }
      .contBox-endtext {
        padding-bottom: 24rpx;
        line-height: 36rpx;
      }
    }
    .endtext {
    }
  }
}
</style>
