<!--
 * @Author: fujihang
 * @Date: 2025-01-18 17:58:46
 * @LastEditTime: 2025-06-28 22:48:37
 * @Description: 咨询
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='teacher'>
        <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100"
            mode="widthFix" />
        <topBar title="" :showImg="true"></topBar>

        <view class="logoVers  ">
            <view class="tc" style="position: relative;">
                <image style="margin-top: -80rpx;" :src="teachDetail.icon" mode="aspectFill" class="logo" />
                <image style="position: absolute;width: 600rpx;height: 1rpx;left: 50rpx;"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/lingthBg.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
            <view class="name tc fw flex-a jc">
                {{ teachDetail.nickName }}
            </view>
            <view class="type flex-a c1" style="margin-bottom: 20rpx;">
                <view class="child s27 tc" v-for="(item, index) in typeObj" :key="index">
                    <view style="font-size: 40rpx;" class="fw">
                        {{ teachDetail[index] || '无' }}
                    </view>
                    <view class="s23">
                        {{ item }}

                    </view>
                </view>
            </view>
            <view class="s27 c1">
                {{ teachDetail.introduction || '无' }}
            </view>

            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>

        <navTab :list="navList" @choose="chooseFN"></navTab>
        <view class="funList" v-if="choose < 2">

            <view class="list flex s27 bgLine" v-for="(item, index) in navList[choose].list" :key="index">

                <view class="f1 c1 flex contant">
                    <view class="name s31" style="margin-bottom: 17rpx;">{{ item.consultTitle }}</view>

                    <view class="det f1 cf">
                        {{ item.consultIntroduce }}
                    </view>
                    <view class="btnV flex-a fw">
                        <view class="f1 flex-a fw">
                            <image
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />{{ item.consultPrice }}
                            <view class="fee s27 " v-if="item.discountRate > 0">{{ item.discountRate }}%折扣</view>
                        </view>
                        <view class="btn tc c3" @click="fuWuFn(item)">服务下单</view>

                    </view>

                </view>
                <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view>
            </view>
        </view>

        <!--  -->
        <template v-else>

            <view class="evlList s27 c1 bgLine" v-for="(item, index) in navList[choose].list" :key="index">
                <view class="f1 flex-a fw" style="margin-bottom: 20rpx;">
                    <image class="head" :src="item.icon" mode="aspectFill" />
                    <view class=" s31  " style="margin-right: 25rpx;">{{ item.nickName }}</view>

                    <view class=" s23 f1 ">{{ getTimeName(item.createTime) }}</view>
                    <view class="xin ">
                        <image
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/xin.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" v-for="itemc in item.score" />{{ item.score }}
                    </view>
                </view>
                <view class="cf">
                    {{ item.evaluate || '无' }}
                </view>
                <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view>
            </view>
        </template>

        <view style="height: 200rpx;"></view>


        <!--  -->
        <view class="btnVBt flex-a fw">
            <view class="btn tc s38 " @click="toFN('/pages/chat/chat')">免费咨询</view>
        </view>

        <!-- 弹窗 -->
        <fuPopup2 :showPopup.sync="showObj.show" :title="showObj.title">
            <template v-if="showObj.type == 'pl'">
                <view class="alert" style="padding: 0 70rpx;">
                    <navTab :list="alertList" @chooseFN="chooseFN"></navTab>
                </view>
                <view class="funList">
                    <view class="list flex s27">
                        <view class="f1 c1 flex contant">
                            <view class="name s31" style="margin-bottom: 17rpx;">爱情维纳斯牌阵占卜</view>
                            <view class="det f1 cf">
                            </view>
                            <view class="btnV flex-a fw">
                                <view class="f1 flex-a fw">
                                    <image
                                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100"
                                        mode="widthFix" />32
                                    <view class="fee s27 ">20%折扣</view>
                                </view>
                                <view class="btn tc c3">服务下单</view>
                            </view>
                        </view>
                    </view>
                </view>
            </template>
            <!--  -->
            <template v-if="showObj.type == 'zf'">

                <view class="funList">
                    <view class="list flex s27 bgLine" style="min-height: 100rpx;">
                        <view class="f1 c1 flex contant">
                            <view class="name s31" style="margin-bottom: 17rpx;">{{ showDetail.consultTitle }}</view>
                            <view class="det f1 cf">
                                {{ showDetail.consultIntroduce }}
                            </view>

                        </view>
                        <view class="angle">
                            <image :class="'img' + item" :key="item" v-for="item in 4"
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                        </view>
                    </view>
                </view>
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
                        {{ getPrice }}
                    </view>
                    <view v-if="WalletBalance < showDetail.consultPrice" class="btn tc c3"
                        @click="toFN('/pages/myWallet/myWallet')">余额不足，请充值</view>
                    <view v-else class="btn tc c3" @click="getOrderTokenFN()">支付</view>

                </view>
            </template>
            <!--  -->



        </fuPopup2>
    </view>
</template>
<script>
import fuPopup2 from '../../components/fuPopup2.vue'
import navTab from '../../components/navTab.vue'
import topBar from '../../components/topBar.vue'

export default {
    components: {
        fuPopup2, navTab, topBar
    },
    data() {
        return {
            showPopup: false,
            typeObj: {
                workYear: '从业年限',
                serviceNum: '服务人数',
                score: '评价',
            },
            teachDetail: {},
            showObj: {
                // title: '评论回复',
                // show: false,
                // type: "pl",
                title: '支付订单',
                show: false,
                type: "zf",
            },
            navList: [
                {
                    name: "咨询分析",
                    list: [],
                    pageNum: 1,
                    post: '',
                },
                {
                    name: "解决方案",
                    list: [],
                    pageNum: 1,
                    post: '',
                },
                {
                    name: "咨询评论",
                    list: [],
                    pageNum: 1,
                    post: '',
                },
            ],
            alertList: [
                {
                    name: "咨询分析",
                    list: [],
                    page: 1,
                    post: '',
                },
                {
                    name: "解决方案",
                    list: [],
                    page: 1,
                    post: '',
                },

            ],
            choose: 0,
            showDetail: {},
            couponDetail: {},
            WalletBalance: 0,
            coupCacha:''

        }
    },

    onLoad() {
        this.teachDetail = uni.getStorageSync('teachDetail')
        uni.removeStorageSync('coupon')
        this.getCoupon()
    },
    onShow() {
        if (uni.getStorageSync('coupon')) {
            this.couponDetail = uni.getStorageSync('coupon')
            if (this.couponDetail.minOrderAmount > this.showDetail.consultPrice) this.couponDetail = {}
        }
        this.getWalletBalanceFN()
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
        getPrice() {
            let price = this.showDetail.consultPrice
            if (this.couponDetail.discountRate) {
                price = (parseFloat(price * (1 - this.couponDetail.discountRate * 0.01)) * 100).toFixed(2) / 100
            }
            return price

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
                url: `/calculate-api/api/secure/oms/order/getOrderToken?serviceId=` + this.showDetail.userConsultServiceId,
                data: {
                },
                method: 'GET',
            }).then(res => {
                if (res.data.code == 0) {
                    this.reqFN({
                        url: `/calculate-api/api/secure/oms/order/create`,
                        data: {
                            "actualCopperAmount": this.toFix(this.showDetail.consultPrice * (100 - (this.couponDetail.discountRate || 0)) / 100),
                            "orderDetail": {
                                "serviceId": this.showDetail.userConsultServiceId || this.showDetail.systemConsultServiceId,
                                "serviceType": ['', 'analyse', 'solution'][this.showDetail.serviceType],
                                "serviceUserId": this.teachDetail.userId
                            },
                            "totalCopperAmount": this.showDetail.consultPrice,
                            "userId": uni.getStorageSync('userId'),
                            couponId: this.couponDetail.couponsId || '',
                            orderToken: res.data.data,

                        },
                        method: 'POST',
                    }).then(ces => {
                        uni.hideLoading()

                        this.getWalletBalanceFN()

                        if (ces.data.code == 0) {
                            uni.showToast({
                                title: '支付成功',
                                icon: 'none'
                            })
                            setTimeout(() => {
                                uni.navigateTo({
                                    url: '/pages/chat/chat?chatRoomListId=' + ces.data.data.chatRoomListId
                                })
                            }, 1000)


                        } else this.showToast({
                            title: '支付订单失败',
                            icon: 'none'
                        })
                    })
                } else uni.hideLoading()
            })
        },
        toCouponFN() {
            uni.navigateTo({
                url: '/pages/coupon/coupon?use=true'
            })
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
                            this.coupCacha=res.data.data.list[0]
                            if (this.couponDetail.minOrderAmount > this.showDetail.consultPrice) this.couponDetail = {}
                            if (this.couponDetail.minOrderAmount > this.showDetail.consultPrice) this.coupCacha = {}
                        }

                    }
                    this.getListFN()
                }
            })
        },
        fuWuFn(item) {
            console.log(item);
            
            this.showDetail = item
            if(!this.couponDetail.minOrderAmount )this.couponDetail=JSON.parse(JSON.stringify(this.coupCacha))
            if (this.couponDetail.minOrderAmount > this.showDetail.consultPrice) this.couponDetail = {}
            
            this.showObj.show = true
        },
        chooseFN({ item, index }) {
            console.log(item, index);
            this.choose = index

            if (index < 2) {
                this.getListFN()
            } else {
                this.getList2FN()
            }
        },
        getList2FN() {
            if (this.navList[this.choose].pageNum == 'finsh') return
            let data = {
                pageNum: this.navList[this.choose].pageNum,
                pageSize: 1000,
                userId: this.teachDetail.userId
            }
            this.reqFN({
                url: '/calculate-api/api/secure/oms/review/orderReviewPage',
                data,
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    if (this.navList[this.choose].pageNum == 1) {
                        this.navList[this.choose].list = []
                    }
                    this.navList[this.choose].list = [...this.navList[this.choose].list, ...res.data.data.list]
                    if (this.navList[this.choose].pageNum < res.data.data.totalPage) {
                        this.navList[this.choose].pageNum += 1
                    } else {
                        this.navList[this.choose].pageNum = 'finsh'
                    }
                }
            })
        },

        getListFN() {
            if (this.navList[this.choose].pageNum == 'finsh') return
            let data = {
                pageNum: this.navList[this.choose].pageNum,
                pageSize: 1000,
                serviceType: this.choose + 1,
                userId: this.teachDetail.userId
            }
            this.reqFN({
                url: '/calculate-api/api/secure/community/consult/pageConsultService',
                data,
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    if (this.navList[this.choose].pageNum == 1) {
                        this.navList[this.choose].list = []
                    }
                    res.data.data.list.forEach(s => {
                        if (this.couponDetail) {
                            let { discountRate, minOrderAmount } = this.couponDetail
                            if (s.consultPrice > minOrderAmount) {
                                s.discountRate = discountRate
                            }
                        }
                        this.navList[this.choose].list.push(s)
                    })
                    // this.navList[this.choose].list = [...this.navList[this.choose].list, ...]
                    if (this.navList[this.choose].pageNum < res.data.data.totalPage) {
                        this.navList[this.choose].pageNum += 1
                    } else {
                        this.navList[this.choose].pageNum = 'finsh'
                    }
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
    overflow: auto;
}

#teacher {
    margin-top: 210rpx;

    .logoVers {
        margin: 0 32rpx 47rpx;
        color: #fff;
        position: relative;
        padding: 0 32rpx 50rpx;
        background: rgba(61, 44, 25, 0.6);

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

        .logo {
            width: 179rpx;
            height: 179rpx;
            border-radius: 50%;
            padding: 10rpx;
            border: 2rpx solid #FFD390;
            margin-bottom: 25rpx;
            position: relative;
            z-index: 4;
        }

        .type {
            justify-content: space-between;
            margin: 0 auto 32rpx;
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/chuzhiBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            width: 543rpx;
            height: 149rpx;
            padding: 0 70rpx;

        }

        .name {
            margin-bottom: 21rpx;
            font-size: 46rpx;

        }
    }

    .alert {

        ::v-deep .fuNavTab {
            .navTapCom {
                margin-top: 20rpx;
                width: 100% !important;

                .child {
                    font-size: 29rpx;
                }
            }
        }



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

    .coupon {
        background: #3F2A15;
        margin: 0 19rpx 408rpx;
        height: 73rpx;
        padding: 0 23rpx;

    }


    .funList {
        padding-top: 32rpx;

        .list {

            margin: 0 19rpx 34rpx;
            padding: 32rpx 32rpx 36rpx 31rpx;
            box-sizing: border-box;
            min-height: 260rpx;



            .contant {
                flex-direction: column;
            }
        }

        .type {
            justify-content: space-between;
            margin-bottom: 32rpx;
        }

        .det {}

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
                z-index: 3;
                position: relative;
            }
        }

        .fee {
            padding: 6rpx 17rpx;
            background: rgba(255, 211, 144, 0.23);
            border-radius: 90rpx;
            margin-left: 25rpx;
        }
    }

    .evlList {

        margin: 0 19rpx 34rpx;
        padding: 32rpx 32rpx 36rpx 31rpx;

        .head {
            width: 94rpx;
            height: 94rpx;
            border-radius: 50%;
            margin-right: 27rpx;
        }


        .xin {
            image {
                height: 1rpx;
                width: 19rpx;
                margin-right: 12rpx;
            }
        }

    }

    .btnVBt {
        position: fixed;
        bottom: 4vh;
        left: 50%;
        transform: translate(-50%);
        z-index: 4;

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