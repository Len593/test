<!--
 * @Author: fujihang
 * @Date: 2025-01-24 21:54:59
 * @LastEditTime: 2025-01-24 22:40:19
 * @Description: 先知 订单信息
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='orderOk' class="c1">
        <!--  -->
        <view class="detail">
            <view class="title s23 flex-a">
                <view class="big s31 f1">订单信息</view>
                <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/doubt.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                下单前请务必核对好购买信息
            </view>
            <view class="name_list flex-a s27">
                <image class="head" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/doubt.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                <view class="f1 cf">订单信息</view>
                <image class="mon" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                59
            </view>
            <view class="list s23">
                <view class="top flex-a">
                    <text class="name cf">阿萨德</text>
                    <text class="sex">男</text>
                    <text class="addr">背景</text>
                </view>
                <view class="bom flex-a">
                    <view class="child">
                        阳历
                    </view>
                    <view class="child">
                        1990年1月1日
                    </view>
                    <view class="child">
                        时辰未知
                    </view>
                </view>
            </view>
            <!--  -->
            <view class="coupon flex-a cf s27">
                <text class="f1">优惠券</text>
                <text>23</text>
            </view>
            <!--  -->
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
            <image class="bgGuang" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/bgGuang.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        </view>
        <!--  -->
        <view class="flex-a all">
            <text class="cf s27">合计：</text>
            <image class="mon" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            46
        </view>
        <!--  -->
        <view class="btnV flex-a jc c3">
            <view class="btn tc s38 ">立即支付</view>
        </view>
    </view>
</template>
<script>
export default {
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

    },
    methods: {

    },
}
</script>
<style lang='scss'>
#orderOk {
    .detail {
        margin: 0 19rpx 20rpx;
        position: relative;
        background: rgba(96, 69, 41, 0.4);
        padding: 32rpx 30rpx;

        .bgGuang {
            position: absolute;
            top: 0;
            left: 0;
            height: 1rpx;
            width: 300rpx;
        }

        .angle {
            image {
                position: absolute;
                height: 1rpx;
                width: 33rpx;
                z-index: 3;
            }

            .img1 {
                top: 0;
                left: 0;
            }

            .img2 {
                top: 0;
                right: 0;
                transform: rotateZ(90deg);
            }

            .img3 {
                bottom: 0;
                left: 0;
                transform: rotateZ(270deg);

            }

            .img4 {
                bottom: 0;
                right: 0;
                transform: rotateZ(180deg);

            }
        }

        &::before,
        &::after {
            position: absolute;
            border: 1rpx solid rgba(226, 204, 192, 0.4);
            content: ' ';
        }

        &::before {
            height: calc(100% - 2rpx);
            width: calc(100% - 2rpx);
            top: 0;
            left: 0;

        }

        &::after {
            height: calc(100% - 10rpx);
            width: calc(100% - 10rpx);
            top: 4rpx;
            left: 4rpx;
            border-color: #C98F53;
            
        }
    }

    .title {
        margin-bottom: 24rpx;

        image {
            height: 1rpx;
            width: 31rpx;
            margin-right: 13rpx;
        }
    }

    .name_list {
        margin-bottom: 30rpx;

        .head {
            width: 92rpx;
            height: 92rpx;
            margin-right: 19rpx;
        }

        .mon {
            height: 1rpx;
            width: 31rpx;
            margin-right: 13rpx;
        }

    }

    .list {
        padding: 23rpx 25rpx 15rpx;
        border: 2rpx solid #C98F53;
        background: rgba(201, 143, 83, .2);
        margin-bottom: 17rpx;

        .top {
            margin-bottom: 10rpx;

            .name {
                margin-right: 25rpx;
            }

            .sex {
                margin-right: 10rpx;

            }
        }

        .bom {
            .child {
                margin-right: 10rpx;
            }
        }
    }

    .all {
        justify-content: flex-end;
        font-size: 61rpx;
        padding: 0 50rpx;
        .mon{
            height:1rpx;
            width:44rpx;
            margin-right: 10rpx;
        }
    }

    .coupon {}

    .btnV {
        position: fixed;
        bottom: 6vh;
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