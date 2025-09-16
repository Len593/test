<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:52:28
 * @LastEditTime: 2025-04-13 00:10:52
 * @Description: AI测手相
-->
<template>
  <view class="mtBg" :style="'font-family:' + fontfamily" id="AIHandRes">
    <topBar :title="'今日运势'" :showImg="true"></topBar>
    <!--  -->
    <view class="main-box">
      <view class="title" @click="goBack"
        ><view>{{ xzName }}</view
        ><image
          class="title-icon"
          :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/xingzuo/constG-icon-convert.svg`"
          mode="widthFix"
        ></image
      ></view>
      <view v-if="isOk" class="xz">
        <view class="xz-box">
          <image
            class="xz-box-img"
            :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/xingzuo/constG-xz-${findIdItem(
              nowResData['速配星座'],
              'svgName'
            )}.svg`"
            mode="widthFix"
          ></image>
          <view class="xz-box-text">速配星座</view>
          <view class="xz-box-text">{{ nowResData["速配星座"] }}</view>
        </view>
        <view class="xz-box xz-box-col2">
          <image
            class="xz-box-img"
            :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/xingzuo/constG-xz-${findIdItem(
              nowResData['提防星座'],
              'svgName'
            )}.svg`"
            mode="widthFix"
          ></image>
          <view class="xz-box-text">提防星座</view>
          <view class="xz-box-text">{{ nowResData["提防星座"] }}</view>
        </view>
        <view class="xz-box xz-box-col3">
          <view class="xz-box-icontext">{{ nowResData["幸运颜色"] }}</view>
          <view class="xz-box-text2">幸运颜色</view>
        </view>
      </view>
      <view v-if="isOk" class="xz xz2">
        <view class="xz-box xz-box2 xz-box-col4">
          <view class="xz-box-icontext">{{ nowResData["幸运数字"] }}</view>
          <view class="xz-box-text2">幸运数字</view>
        </view>
        <view class="xz-box xz-box2 xz-box-col5">
          <view class="xz-box-icontext">{{ nowResData["幸运宝石"] }}</view>
          <view class="xz-box-text2">幸运宝石</view>
        </view>
      </view>
      <view v-if="isOk">
        <view class="yunshi-title">
          <image
            class="tips-icon"
            src="/static/imgs/tips-shuxian.png"
            mode="widthFix"
          />
          <view>今日运势指数</view>
        </view>
        <view class="progress-box">
          <view class="zhonghe">
            <cmd-progress
              class="zhonghe-cmd"
              type="circle"
              strokeColor2="#ecd0ae"
              :stroke-width="10"
              :width="98"
              stroke-color="#9D6E2F"
              :percent="parseInt(nowResData['综合分数'])"
              :showInfo="false"
            ></cmd-progress>
            <view class="zhonghe-text">综合{{ nowResData["综合分数"] }}%</view>
          </view>
          <view
            v-for="(key, index) in [
              '爱情分数',
              '事业分数',
              '心情分数',
              '交际分数',
              '财富分数',
              '健康分数',
            ]"
            :key="index"
            class="linecmd"
          >
            <view class="linecmd-cmd">
              <cmd-progress
                :stroke-width="20"
                :stroke-color="
                  [
                    '#ffc763',
                    '#f97878',
                    '#78ffb0',
                    '#bea8fe',
                    '#b3efff',
                    '#ff513a',
                  ][index]
                "
                :percent="parseInt(nowResData[key])"
                :showInfo="false"
              ></cmd-progress>
            </view>
            <view class="linecmd-text">{{ nowResData[key] }}%</view>
            <view class="linecmd-text2">{{ key.substring(0, 2) }}</view>
          </view>
        </view>
      </view>
      <view v-for="(item, index) in shouList" :key="index" class="contBox">
        <view class="contBox-title">
          <image
            class="contBox-title-icon"
            :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/xingzuo/constG-${
              ['star', 'look', 'tie', 'money', 'leaf'][index] || 'leaf'
            }.svg`"
            mode="widthFix"
          ></image>
          <view class="contBox-title-cont">{{ item.shape }}</view>
          <view class="contBox-fenbox">
            <image
              v-for="fen in item.fen"
              :key="fen"
              class="contBox-fenicon"
              :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/xingzuo/constG-f-star.svg`"
              mode="widthFix"
            ></image>
            <image
              v-for="fen in 5 - item.fen"
              :key="fen"
              class="contBox-fenicon"
              :src="`https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/xingzuo/constG-f-star2.svg`"
              mode="widthFix"
            ></image>
          </view>
        </view>
        <view class="contBox-endtext">{{ item.desc }}</view>
      </view>
    </view>
  </view>
</template>
<script>
import topBar from "../../components/topBar.vue";
import cmdProgress from "@/components/cmd-progress/cmd-progress.vue";
export default {
  components: {
    topBar,
    cmdProgress,
  },
  data() {
    return {
      nowResData: {},
      resData: {},
      idMap: [
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
      yunshiId: "",
      isOk: false,
    };
  },
  computed: {
    fontfamily() {
      return this.$store.state.fontfamily;
    },
    xzName() {
      const findItem = this.idMap.find((t) => t.id === this.yunshiId) || {};
      return findItem.text || "";
    },
    shouList() {
      return this.isOk
        ? ["今明运势", "爱情运势", "事业运势", "财富运势", "健康运势"].map(
            (key, keyIndex) => {
              const fenshuKey = [
                "综合分数",
                "爱情分数",
                "事业分数",
                "财富分数",
                "健康分数",
              ][keyIndex];
              const fenshu = this.nowResData[fenshuKey];
              return {
                shape: key,
                desc: this.nowResData[key],
                fen: [20, 40, 60, 75, 90].filter((t) => fenshu >= t).length,
              };
            }
          )
        : [];
    },
  },
  onLoad(query) {
    this.yunshiId = query.id;
    console.log("yunshiId==>", this.yunshiId);
    this.sendXZ();
  },
  methods: {
    findIdItem(name, key) {
      const item = this.idMap.find((t) => t.text === name) || {};
      return item[key];
    },
    goBack() {
      uni.navigateBack();
    },
    toFN(url) {
      uni.navigateTo({
        url,
      });
    },
    sendXZ() {
      uni.showLoading({
        title: "加载中...",
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
            title: "加载中...",
          });
          if (sysRes.data.code == 0) {
            // 解密
            console.log("sysRes.data.data==>", sysRes.data.data);
            let appKey = uni.$decryptAES(sysRes.data.data, "oHiz8rXbXE1YzO9b");
            uni.request({
              url: "https://api.yuanfenju.com/index.php/v1/Zhanbu/yunshi",
              data: {
                api_key: appKey,
                // api_key: "V87QtBA2iQlimaUlnfSBEiXgu",
                type: 0,
                title_yunshi: that.yunshiId,
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
                  this.resData = data.data || {};
                  this.nowResData = this.resData["今日运势"] || {};
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
      .title-icon {
        width: 40rpx;
        height: 40rpx;
        margin-left: 20rpx;
      }
    }
    .tips-icon {
      width: 8rpx;
      height: 36rpx;
      margin-right: 24rpx;
      margin-bottom: 4rpx;
    }
    .fenshu {
      font-size: 30rpx;
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      padding: 24rpx 0rpx;

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
      .contBox-fenbox {
        display: flex;
        align-items: center;
        padding-left: 20rpx;
      }
      .contBox-fenicon {
        width: 28rpx;
        height: 26rpx;
        padding-right: 2rpx;
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
        padding-bottom: 30rpx;
        line-height: 36rpx;
      }
    }
    .yunshi-title {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      font-weight: 500;
      padding-top: 20rpx;
    }
    .xz {
      width: 100%;
      display: flex;
      align-content: center;
      justify-content: space-between;
      .xz-box {
        margin-top: 26rpx;
        border-radius: 26rpx;
        background: #fff3e4;
        color: #ffb04d;
        font-size: 32rpx;
        width: 220rpx;
        height: 238rpx;
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
        .xz-box-text2 {
          padding-top: 22rpx;
        }
        .xz-box-icontext {
          border-radius: 50%;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100rpx;
          height: 100rpx;
        }
      }
      .xz-box-col2 {
        background: #e9ffe4;
        color: #3db522;
      }
      .xz-box-col3 {
        background: #f3ebff;
        color: #af7bfd;
      }
      .xz-box-col4 {
        background: #e2f5ff;
        color: #48c0ff;
      }
      .xz-box-col5 {
        background: #ffe2f5;
        color: #fd7bd2;
      }
    }
    .xz2 {
      justify-content: center;
      .xz-box2 {
        margin-top: 14rpx;
        margin-right: 24rpx;
      }
    }
    .progress-box {
      padding: 20rpx 0rpx;
      padding-right: 16rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .zhonghe {
      display: flex;
      justify-content: center;
      position: relative;
      // height: 100rpx;
      // width: 100rpx;
      // padding-right: 12rpx;
      .zhonghe-text {
        position: absolute;
        text-align: center;
        top: 78rpx;
        font-size: 28rpx;
        font-weight: 600;
      }
    }
    .linecmd {
      font-size: 28rpx;
      height: 292rpx;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
      position: relative;
      width: 80rpx;
      .linecmd-cmd {
        position: absolute;
        top: 86rpx;
        left: -62rpx;
        width: 200rpx;
        transform: rotate(-90deg);
        flex: 1;
      }
      .linecmd-text {
        padding: 14rpx 0rpx;
      }
      .linecmd-text2 {
        color: #9ca3af;
      }
    }
    .endtext {
    }
  }
}
</style>
