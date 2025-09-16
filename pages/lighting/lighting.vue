<!--
 * @Author: fujihang
 * @Date: 2025-01-25 17:11:53
 * @LastEditTime: 2025-06-17 19:55:53
 * @Description: 前往点灯
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='lighting' class="c1">
        <topBar :title="lighting.prayName" :showImg="true"></topBar>

        <view class="btnV flex-a jc c3 dwTop" @click.stop="toFN('/pages/beacon/beacon')">
            <view class="btn tc s21 ">我的点灯</view>
        </view>



        <view class="lightBg tc">
            <view v-for="(item, index) in lighting.prayContent" v-if="index < 4" :key="index"
                :class="'c3 s31 lg lg' + (index + 1)">
                <text style="margin-top: -40rpx;">{{ item }}</text>

            </view>
            <image class="bg"
                :src="lighting.prayImage ? (lighting.prayImage + '?x-oss-process=image/quality,Q_100') : 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/light.png?x-oss-process=image/quality,Q_100'"
                mode="widthFix" />
        </view>
        <view class="s31 tc">请您选择点 {{ lighting.prayName }} 时长</view>
        <view class="chooseList flex-a">
            <view @click="current = index" :class="['child s31 f1 flex-a jc', current == index && 'cho']"
                v-for="(item, index) in ['30天', '90天', '一年', '三年']" :key="index">
                <text></text>
                {{ item }}

            </view>
        </view>
        <!--  -->
        <!--  -->
        <view class="eventCon">
            <view class="titleP c1">
                <text>
                    {{ lighting.prayName }}

                </text>
            </view>

            <!--  -->
            <view class="listPeo s23">

                <view class="top s31 fw">
                    描述
                </view>
                <view class="bom cf">
                    <view v-html="handleFN(lighting.describe)"></view>

                    <!-- 此灯寓意是指船挂着满帆顺风行驶,比喻非常顺利,没有任何阻碍。祝福新的一年像是在顺着风向做事一样,顺顺利利的没有障碍;每一件事情都合乎心意,一步一步越走越高。年头一帆风顺,年末满载而归! -->
                </view>


            </view>
            <!--  -->
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
            <!--  -->
            <view class="btnV flex-a fw c3 jc">

                <view class="btn tc s38 " @click="toPay(current)">前往点灯</view>

            </view>
        </view>
        <!--  -->
        <view class="alertView flex-a s27" v-if="showAlert" @click="cancalFN">
            <view class="content" @click.stop="() => { }">
                <view class="name tc">祈福明灯</view>
                <view class="val">佛前点灯,功德无量。驱逐黑暗,心明眼亮,智慧显现。“点一盏明灯,燃希望之火,照亮黑暗的每一个角落,远离迷惘,解开疑惑,海天任遨游”。</view>
                <view class="chList flex">
                    <view :class="['child c3 tc', choose.prayName == item.prayName && 'border']"
                        v-for="(item, index) in list" @click="chooseFN(item)" :key="index">
                        {{ item.prayName }}
                    </view>
                </view>
                <view style="margin-top: 30rpx;position: relative;z-index: 2; " class="jc flex-a" @click="toPay(0)">
                    <view class="btn tc s38 c3">供燈30天</view>
                </view>
                <view style="margin-top: 20rpx;position: relative;z-index: 2; " class="jc flex-a">
                    <view class="btn tc s38 c3" @click="toPay(2)">供燈一年</view>
                </view>
                <!--  -->
                <view class="angle">

                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view>
            </view>
        </view>

        <fuPopup2 :showPopup.sync="showObj.show" :title="showObj.title">

            <!--  -->



            <view class="coupon flex-a s27 c1 bgLine" @click="toCouponFN">
                <text class="f1">优惠券</text>
                <text style="color: #FFEAD4;">{{ couponDetail.discountRate ? couponDetail.discountRate + '%折扣' :
                    '暂无可用优惠'
                }}</text>
                <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view>
            </view>

            <view class="btnCV flex-a fw c1 s27">
                <view class="f1 flex-a fw">
                    <image
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                    {{ toFix(getPrice * (100 - (couponDetail.discountRate || 0)) / 100) }}
                </view>
                <view v-if="WalletBalance < getPrice" class="btn tc c3" @click="toFN('/pages/myWallet/myWallet')">
                    余额不足，请充值</view>
                <view v-else class="btn tc c3" @click="getOrderTokenFN()">支付</view>

            </view>
            <!--  -->



        </fuPopup2>

    </view>
</template>
<script>
import fuPopup2 from '../../components/fuPopup2.vue'
import topBar from '../../components/topBar.vue'

export default {
    components: { fuPopup2, topBar },
    data() {
        return {
            current: 0,
            showAlert: false,
            list: [],
            choose: {},
            lighting: {},
            showObj: {
                title: '支付订单',
                show: false,
            },
            couponDetail: {},
            WalletBalance: 0,

        }
    },

    onLoad() {
        this.getData()
        this.lighting = uni.getStorageSync('lighting')
        this.getCoupon()
    },
    onShow() {
        if (uni.getStorageSync('coupon')) {
            this.couponDetail = uni.getStorageSync('coupon')
            if (this.couponDetail.minOrderAmount > this.getPrice) this.couponDetail = {}
        }
        this.getWalletBalanceFN()

    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
        getPrice() {

            return this.lighting[['prayPriceThirty', 'prayPriceNinety', 'prayPriceYear', 'prayPriceYearThree'][this.current]]
        },
    },
    methods: {
        getWalletBalanceFN() {
            this.reqFN({
                url: '/calculate-api/api/secure/oms/wallet/getWalletBalance',
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.WalletBalance = res.data.data.totalBalance
                }
            })
        },
        getOrderTokenFN() {
            uni.showLoading({
                title: '支付中...'
            });
            this.reqFN({
                url: `/calculate-api/api/secure/oms/order/getOrderToken?serviceId=` + this.lighting.prayLampId,
                data: {
                },
                method: 'GET',
            }).then(res => {
                if (res.data.code == 0) {
                    this.reqFN({
                        url: `/calculate-api/api/secure/oms/order/create`,
                        data: {
                            "actualCopperAmount": this.toFix(this.getPrice * (100 - (this.couponDetail.discountRate || 0)) / 100),
                            "orderDetail": {
                                "serviceId": this.lighting.prayLampId,
                                "serviceType": 'pray',

                            },
                            "totalCopperAmount": this.getPrice,
                            "userId": uni.getStorageSync('userId'),
                            couponId: this.couponDetail.couponsId || '',
                            orderToken: res.data.data,

                        },
                        method: 'POST',
                    }).then(ces => {
                        uni.hideLoading()
                        this.getWalletBalanceFN()

                        if (ces.data.code == 0) {

                            this.orderOkFN(ces.data.data.orderId)



                        } else this.showToast({
                            title: '支付订单失败',
                            icon: 'none'
                        })
                    })
                } else uni.hideLoading()
            })
        },
        handleFN(val) {
            return val ? val.replace(/\n/g, '</br>') : '无'
        },
        toFN(url) {
            console.log(url, '--');

            uni.navigateTo({ url })
        },
        getCoupon() {
            this.reqFN({
                url: '/calculate-api/api/secure/oms/coupons/myCoupons',
                data: {
                    couponsStatus: 1,
                    pageNum: 1,
                    pageSize: 1,
                },
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    if (res.data.data && res.data.data.list) {
                        if (res.data.data.list[0]) {
                            this.couponDetail = res.data.data.list[0]
                            if (this.couponDetail.minOrderAmount > this.getPrice) this.couponDetail = {}
                        }

                    }
                }
            })
        },
        cancalFN() {
            this.lighting = uni.getStorageSync('lighting')
            this.showAlert = false
        },
        toCouponFN() {
            uni.navigateTo({
                url: '/pages/coupon/coupon?use=true'
            })
        },
        toPay(type) {
            console.log(type);

            this.showObj.show = true
            this.showObj.type = type


        },
        orderOkFN(orderId) {
            this.reqFN({
                url: '/calculate-api/api/secure/community/praySquare/pray',
                data: {
                    orderId,
                    prayTimeType: (this.showObj.type + 1),
                    prayWish: '祈福',
                    prayLampId: this.lighting.prayLampId
                },
            }).then(res => {
                if (res.data.code == 0) {
                    uni.showToast({
                        title: '祈福成功',
                        icon: 'none'
                    })
                    this.getData()
                    setTimeout(() => {
                        uni.navigateBack({ delta: 1 })
                    }, 1450)
                } else this.showToast({
                    title: '祈福失败',
                    icon: 'none'
                })
            })
        },
        chooseFN(item) {
            this.choose = item
            console.log(this.choose, '---');

        },
        getData() {
            this.reqFN({
                url: '/calculate-api/api/secure/community/praySquare/getPrayTypeList',
                method: 'GET'
            }).then(res => {
                console.log(res, '---');

                if (res.data.code == 0) {
                    this.list = res.data.data
                    if (res.data.data[0]) {
                        this.choose = res.data.data[0]

                    }
                }
            })
        }
    },
}
</script>
<style lang='scss'>
page {
    background-size: 100% auto;
    overflow: auto;
    height: 100%;
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/cqBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-position-y: -6rpx;
}

#lighting {
    .lightBg {
        position: relative;
        min-height: 560rpx;

        .lg {
            position: absolute;
            height: 310rpx;
            width: 71rpx;
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/light1.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            writing-mode: vertical-rl;
            /* 从右到左的竖向排列 */
            text-orientation: upright;
            /* 保持文字直立 */
            line-height: 72rpx;
            z-index: 3;
            animation: a infinite 10s;
            animation-timing-function: linear;
        }

        .lg1 {
            top: 320rpx;
            left: 37rpx;
        }

        .lg2 {
            top: 140rpx;
            left: 197rpx;
            animation-delay: .3s;
        }

        .lg3 {
            top: 190rpx;
            right: 177rpx;
            animation-delay: .8s;

        }

        .lg4 {
            bottom: -50rpx;
            right: 37rpx;
            animation-delay: 1s;

        }

        .bg {
            margin-top: 10vh;
            height: 1rpx;
            width: 391rpx;

        }
    }

    .bom {
        line-height: 34rpx;
    }

    .btnCV {
        padding: 0 17rpx 57rpx 40rpx;

        image {
            height: 1rpx;
            width: 44rpx;
            margin-right: 13rpx;
        }

        .f1 {
            font-size: 61rpx;
        }

        .btn {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            line-height: 98rpx;
            width: 302rpx;
            height: 99rpx;
        }
    }


    .titleP {
        padding: 20rpx 0 32rpx;
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

    .coupon {
        background: #3F2A15;
        margin: 0 19rpx 408rpx;
        height: 73rpx;
        padding: 0 23rpx;

    }

    .chooseList {
        margin: 34rpx 0 52rpx;

        .child {
            text {
                display: inline-block;
                height: 36rpx;
                width: 36rpx;
                border: 2rpx solid #FFE8CE;
                border-radius: 50%;
                margin-right: 10rpx;
                position: relative;
            }


        }

        .cho {
            text {
                &::before {
                    content: ' ';
                    position: absolute;
                    height: 25rpx;
                    width: 25rpx;
                    left: 4rpx;
                    top: 4rpx;
                    background: #FFE8CE;
                    border-radius: 50%;
                }
            }
        }
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

    .eventCon {
        padding: 34rpx 28rpx;
        margin: 0 19rpx 20rpx;
        position: relative;
        background: #171B24;

        .listPeo {
            .top {
                margin-bottom: 23rpx;
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
        }
    }

    .btnV {

        padding: 30rpx 0;

        image {
            height: 1rpx;
            width: 30rpx;
        }

        .btn {
            z-index: 7;
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            line-height: 110rpx;
            width: 336rpx;
            height: 110rpx;
        }
    }

    .dwTop {
        padding: 0;
        position: fixed;
        top: 85rpx;
        z-index: 90;
        right: 20rpx;

        .btn {

            line-height: 55rpx;
            width: 168rpx;
            height: 55rpx;
        }
    }

    .alertView {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 10;

        .btn {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btn2.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            line-height: 110rpx;
            width: 336rpx;
            height: 110rpx;
        }

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background: rgba(18, 26, 44, 0.4);
            backdrop-filter: blur(10rpx);
            z-index: -1;
            content: ' ';
        }

        .content {
            height: 1000rpx;
            position: relative;
            margin: 0 52rpx;
            padding: 46rpx 36rpx;
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/qingfuBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;

            .name,
            .val {
                margin-bottom: 44rpx;
            }

            .name {
                margin-bottom: 24rpx;
                font-size: 46rpx;
            }

            .chList {
                flex-wrap: wrap;

                .child {
                    margin: 0 18rpx 20rpx;
                    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/prophet.png?x-oss-process=image/quality,Q_100) no-repeat;
                    background-size: 100% auto;
                    line-height: 66rpx;
                    width: 250rpx;
                    height: 68rpx;
                    position: relative;
                    z-index: 3;
                }

                .border {
                    border-radius: 20rpx;
                    border: 2rpx solid #E2CCC0;
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
            }

        }
    }
}

@keyframes a {
    0% {
        transform: translateY(0rpx);
        opacity: .9;
    }

    30% {
        transform: translateY(10rpx);
        opacity: 1;

    }

    60% {
        transform: translateY(-10rpx);
        opacity: .8;

    }

    100% {
        transform: translateY(10rpx);
        opacity: 1;

    }
}
</style>