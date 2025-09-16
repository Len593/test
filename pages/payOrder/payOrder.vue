<!--
 * @Author: fujihang
 * @Date: 2025-01-23 19:48:12
 * @LastEditTime: 2025-01-25 13:13:33
 * @Description: 支付订单
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='payOrder'>
        <view class="topList flex-a s27 c1">
            <text class="f1 cf">商品名称：</text>
            <text class="s31 fw">名称我i我的娃</text>
        </view>
        <view class="topList flex-a s27 c1">
            <text class="f1 cf">商品名称：</text>
            <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100" mode="widthFix"
                style="width: 44rpx;height: 1rpx; margin-right: 13rpx;margin-top: 15rpx;" />

            <text class=" fw" style="font-size: 61rpx;">33</text>
        </view>
        <!--  -->
        <view class="paylist c1">
            <view class="title s31">支付方式</view>
            <view class="listss flex-a s27" v-for="(item, index) in payList" :key="index">
                <image class="head" :src="item.img" mode="aspectFill" />
                <view class="f1 c1 flex contant">
                    <view class="name s27 cf" style="margin-bottom: 7rpx;">{{ item.name }}</view>
                    <view class="type flex-a">
                        {{ item.en }}
                    </view>
                </view>
                <view class="gou">
                    <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/gou.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                </view>
            </view>
        </view>
        <!--  -->
        <view class="btnV flex-a fw">

            <view class="btn tc s38 ">立即支付</view>

        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            payList: [
                {
                    name: '谷歌支付',
                    en: "起名、紫微、八字GM",
                    img: "",
                }
            ]
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {

    },
    methods: {

    },
}
</script>
<style lang='scss'>
#payOrder {
    .topList {
        margin: 0 48rpx 57rpx 57rpx;
    }

    .paylist {
        padding: 40rpx 28rpx 40rpx 32rpx;
        margin: 0 17rpx;

        .title {
            margin-bottom: 34rpx;
        }

        .listss {
            margin: 0 0 10rpx;
            padding: 17rpx 44rpx 17rpx 38rpx;
            box-sizing: border-box;

            background: #E6A058;
            border: 2rpx solid #C98F53;

            .head {
                width: 61rpx;
                height: 61rpx;
                margin-right: 27rpx;

            }

            .contant {
                flex-direction: column;
            }

            .gou {
                width: 27rpx;
                height: 27rpx;
                border-radius: 4rpx 4rpx 4rpx 4rpx;
                border: 2rpx solid #FFD390;

                image {
                    height: 1rpx;
                    width: 27rpx;
                }
            }
        }
    }

    .btnV {
        position: fixed;
        bottom: 10vh;
        left: 50%;
        transform: translate(-50%);

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