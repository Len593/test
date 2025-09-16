<!--
 * @Author: fujihang
 * @Date: 2025-01-18 17:58:46
 * @LastEditTime: 2025-06-08 15:59:17
 * @Description: 我的钱包
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='myWallet' class="mtBg">
        <topBar title="我的钱包" :showImg="true"></topBar>
        <!--  -->
        <view class="bg bgLine">
            <view class="btnV flex-a ">
                <view class="f1">
                    <view class="flex-a s29 cf" style="margin-bottom: 20rpx;">
                        可用余额
                        <image style="margin-left: 23rpx;"
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" />
                        <text class="fw s38 c1">{{ money.totalBalance || 0 }}</text>
                    </view>
                    <view class="s25 c2" style="color: rgba(255, 255, 255, .6);">(消费时,赠送铜币将会优先扣除)</view>
                </view>-

                <view class="btn tc c3" @click="toFN('/pages/storedValRecord/storedValRecord')">储值记录</view>

            </view>
            <view class="content flex-a s23 c1">
                <view>
                    储值金额
                    <text class="s25 fw">{{ money.rechargeCoins || 0 }}</text>
                </view>
                <view>
                    赠送金额
                    <text class="s25 fw">{{ money.giftCoins || 0 }}</text>
                </view>
            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>

        <!--  -->
        <view class="tips c1 s27">
            选择储值金额
        </view>
        <!--  -->
        <view class="priceList flex ">
            <view :class="['child c1 tc bgLine', rechargePlanId == item.rechargePlanId && 'bgChoose']"
                @click="rechargePlanId = item.rechargePlanId" v-for="(item, index) in dataList" :key="index">
                <view class="top flex-a">
                    <image
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                    <text class="fw s38">{{ item.baseCoins }}</text>
                </view>
                <view class="bom tc s19" v-if="item.giftCoins">
                    +{{ item.giftCoins }}铜币
                </view>
                <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view>
            </view>
        </view>

        <!--  -->
        <view class="btnVBT tc">

            <view class="btn tc s38 " @click="okFN">确认增值</view>
            <view class="argee s27 c1">
                已阅读并同意《用户储值协议》
            </view>
        </view>
    </view>
</template>
<script>
import topBar from '../../components/topBar.vue'

export default {
    components: {
        topBar
    },
    data() {
        return {
            money: {},
            dataList: [],

            rechargePlanId: '',
        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        this.getData()

    },
    onShow() {
        this.getWalletBalanceFN()
    },
    methods: {

        okFN() {
            uni.navigateTo({
                url: '/pages/payPage/payPage?businessId=' + this.rechargePlanId
            })
        },
        getWalletBalanceFN() {
            this.reqFN({
                url: '/calculate-api/api/secure/oms/wallet/getWalletBalance',
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.money = res.data.data || {}
                }
            })
        },
        getData() {
            this.reqFN({
                url: '/calculate-api/api/secure/oms/rechargePlan/getRechargePlan',

            }).then(res => {
                if (res.data.code == 0) {
                    this.dataList = res.data.data
                    this.rechargePlanId = res.data.data[0].rechargePlanId
                    // this.dataList = [{ baseCoins: 2 }, { baseCoins: 3 }, { baseCoins: 3 }, { baseCoins: 3 }, { baseCoins: 3 }, { baseCoins: 3 }]
                }
            })

        },
        toFN(url) {
            uni.navigateTo({
                url
            });
        },
    },
}
</script>
<style lang='scss'>
page {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    height: 100%;
    overflow: hidden;

}

#myWallet {
    height: 100%;
    padding-top: 210rpx;

    .bg {

        margin: 0 17rpx 67rpx;
        padding: 49rpx 38rpx 25rpx;
        background: rgba(230, 160, 88, .3);

        &::after {
            position: absolute;
            border: 4rpx solid rgba(226, 204, 192, 0.4);

            content: ' ';
        }



        &::after {
            height: calc(100% - 22rpx);
            width: calc(100% - 22rpx);
            top: 8rpx;
            left: 8rpx;
        }

        .angle {
            image {
                position: absolute;
                height: 1rpx;
                width: 60rpx;
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

        .btnV {
            image {
                height: 1rpx;
                width: 30rpx;
                margin-right: 13rpx;
            }

            .btn {
                background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
                background-size: 100% auto;
                line-height: 87rpx;
                width: 254rpx;
                height: 87rpx;
                position: relative;
                z-index: 2;
            }
        }

        .content {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/chuzhiBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            width: 638rpx;
            height: 179rpx;
            padding: 0 84rpx;
            justify-content: space-between;
            margin: 20rpx auto 0;

            .fw {
                margin-left: 10rpx;
            }
        }
    }

    .tips {
        margin: 0 57rpx 40rpx;
    }

    .priceList {
        padding: 0 62rpx;
        flex-wrap: wrap;

        .child {
            width: calc(33.333% - 22rpx);
            margin: 0 11rpx 18rpx;
            min-height: 127rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            background: linear-gradient(180deg, #c990533c 0%, #000000 100%);

            &::after {
                display: none;
            }

            .top {
                margin: 22rpx 0 6rpx;
                justify-content: center;

                image {
                    height: 1rpx;
                    width: 31rpx;
                    margin-right: 10rpx;
                }

            }

            .bom {
                width: 105rpx;
                height: 31rpx;
                line-height: 31rpx;
                background: rgba(255, 211, 144, 0.23);
                border-radius: 56rpx 56rpx 56rpx 56rpx;
            }
        }

        .bgChoose {

            background: linear-gradient(180deg, #C98F53 0%, #000000 100%);
        }
    }


    .btnVBT {
        position: fixed;
        bottom: 3vh;
        left: 50%;
        transform: translate(-50%);

        z-index: 8;

        .btn {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            margin-bottom: 10rpx;
            line-height: 110rpx;
            width: 336rpx;
            height: 110rpx;
        }
    }
}
</style>