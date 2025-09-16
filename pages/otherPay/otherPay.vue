<!--
 * @Author: fujihang
 * @Date: 2025-03-09 16:13:46
 * @LastEditTime: 2025-06-17 19:55:57
 * @Description: 
-->
<template>
    <view :style="'font-family:' + (fontfamily) + ';background:' + bgColor" id='otherPay' class="cf s40">
        <topBar title='' :showImg='true'></topBar>
        <image style="height: 1rpx;width: 100%;display: block;" :src="bg" mode="widthFix" />
        <view class="cont " style="margin-top: 20rpx;">
            <view class="flex-a aa">
                <text class="fw f1">
                    您的性别

                </text>
                <view class=" flex-a">
                    <view @click="choose = index" :class="['child', choose == index && 'choose cf']"
                        v-for="(item, index) in sexList" :key="index">
                        <image v-if="index == choose" :src="item.img" mode="widthFix" />
                        {{ item.name }}
                    </view>
                </view>
            </view>
            <view class="flex-a zc c3 tc">
                <input v-model="nickName" placeholder="请输入名字" type="text">
            </view>

            <view class="flex-a zc c3 tc" v-for="(item, index) in dataInfo" :key="index">
                <picker @change="e => change2FN(e, index)" v-if="item.type1 == 'time'" :mode="item.type1"
                    :value="item.val">
                    {{ item.val || item.plr }}
                </picker>
                <picker :disabled="!item.arrow" @change="e => changeFN(e, index)" v-else :mode="item.type1"
                    :value="item.val">
                    {{ item.val || item.plr }}
                </picker>

            </view>

            <view class="tip s28 tc ">提交信息，会有专业老师为你排出命盘测算</view>
        </view>
        <view class="btnV flex-a fw">
            <view class="btn tc s38 " @click="okFN">提交</view>
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
                    {{ toFix(reckon.reckonPrice * (100 - (couponDetail.discountRate || 0)) / 100) }}
                </view>
                <view v-if="WalletBalance < reckon.reckonPrice" class="btn tc c3"
                    @click="toFN('/pages/myWallet/myWallet')">
                    余额不足，请充值</view>
                <view v-else class="btn tc c3" @click="getOrderTokenFN()">支付</view>


            </view>
            <!--  -->



        </fuPopup2>
    </view>
</template>
<script>
import topBar from '../../components/topBar.vue'
import fuPopup2 from '../../components/fuPopup2.vue'

export default {
    components: {
        topBar, fuPopup2
    },
    data() {
        return {
            bgColor: '#590c03',
            choose: 0,
            sexList: [
                {
                    name: '男',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/man.png?x-oss-process=image/quality,Q_100',
                },
                {
                    name: '女',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/women.png?x-oss-process=image/quality,Q_100',
                },
            ],
            bg: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/WechatIMG50.jpg?x-oss-process=image/quality,Q_100',
            dataInfo: [{
                name: "生辰",
                plr: '请选择您的生辰',
                val: '2010-01-01',
                to: '',
                type1: 'date',
                type: 'picker',
                img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/help.png?x-oss-process=image/quality,Q_100',
                data: 'birthday',
                arrow: true,
            },
            {
                name: "时辰",
                plr: '请选择您的时辰',
                val: null,
                to: '',
                type1: 'time',
                type: 'picker',
                img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/help.png?x-oss-process=image/quality,Q_100',
                data: 'birthday',
                arrow: true,
            },],
            nickName: '',
            couponDetail: {},
            showObj: {
                title: '支付订单',
                show: false,
            },
            reckon: {},
            WalletBalance: 0,

        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        let data = uni.getStorageSync('reckon')
        this.reckon = data
        if (data.yuanFenJuType == 13) {
            this.bg = 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/WechatIMG44.jpg?x-oss-process=image/quality,Q_100'
            this.bgColor = 'rgb(252 205 209)'
        }
        this.getCoupon()

    },
    onShow() {
        if (uni.getStorageSync('coupon')) {
            this.couponDetail = uni.getStorageSync('coupon')
            if (this.couponDetail.minOrderAmount > this.reckon.reckonPrice) this.couponDetail = {}
        }
        this.getWalletBalanceFN()
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
                url: `/calculate-api/api/secure/oms/order/getOrderToken?serviceId=` + this.reckon.reckonId,
                data: {
                },
                method: 'GET',
            }).then(res => {
                if (res.data.code == 0) {
                    this.reqFN({
                        url: `/calculate-api/api/secure/oms/order/create`,
                        data: {
                            "actualCopperAmount": this.toFix(this.reckon.reckonPrice * (100 - (this.couponDetail.discountRate || 0)) / 100),
                            "orderDetail": {
                                "serviceId": this.reckon.reckonId,
                                "serviceType": 'reckon',
                            },
                            "totalCopperAmount": this.reckon.reckonPrice,
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
                                icon: 'none',
                                duration:2000,

                            })

                            setTimeout(() => {
                                uni.redirectTo({
                                    url: '/pages/chat/chat?chatRoomListId=' + ces.data.data.chatRoomListId
                                })
                            }, 1900)


                        } else this.showToast({
                            title: '支付订单失败',
                            icon: 'none'
                        })
                    })
                } else uni.hideLoading()
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
                            if (this.couponDetail.minOrderAmount > this.reckon.reckonPrice) this.couponDetail = {}
                        }


                    }
                }
            })
        },
        toCouponFN() {
            uni.navigateTo({
                url: '/pages/coupon/coupon?use=true'
            })
        },
        toFN(url) {
            uni.navigateTo({ url })
        },
        okFN() {
            let check = ''
            this.dataInfo.forEach(s => {


                if (!s.val) check = s.plr
            })
            if (check) return uni.showToast({
                title: check,
                icon: 'none',
            })
            if (!this.nickName) return uni.showToast({
                title: '请输入名字',
                icon: 'none',
            })
            this.jieshuoFN()
            this.showObj.show = true

        },
        change2FN(e) {

            this.dataInfo[1].val = e.detail.value


        },
        changeFN(event, index, sex) {

            this.dataInfo[index].val = event.detail.value


        },
        jieshuoFN() {
            let date = new Date(this.dataInfo[0].val + ' ' + this.dataInfo[1].val)

            this.reqFN({
                url: '/calculate-api/api/secure/community/home/send',
                data: {
                    name: this.nickName,
                    month: date.getMonth() + 1,
                    day: date.getDay(),
                    year: date.getFullYear(),
                    hours: date.getHours(),
                    minute: date.getMinutes(),
                    sex: this.choose,
                    reckonId: this.reckon.reckonId,
                    type: 1,
                },
            }).then(res => {
                console.log(res, '==1111===');
                if (res.data.code == 0) {

                }

            })

        },
    },
}
</script>
<style lang='scss'>
page {
    height: 100%;

}

#otherPay {
    height: 100%;

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

    .cont {
        padding: 0 70rpx;

        .child {
            image {
                height: 1rpx;
                width: 33rpx;
                margin-right: 10rpx;
            }

            height: 80rpx;
            line-height: 76rpx;
            padding: 0 20rpx;
            transition: .5s;
            border: 2rpx solid #fff;
            margin-left: 20rpx;
            border-radius:50%;


        }

        .choose {
            color: #333;
            border-radius: 30rpx;
            background: #fff;
        }

        .aa {
            margin-bottom: 30rpx;
        }

        .zc {
            margin-bottom: 20rpx;
            border-radius: 40rpx;
            min-height: 90rpx;
            background: #fff;

            input,
            picker {
                width: 100%;
            }
        }
    }

    .btnV {
        position: fixed;
        bottom: 5%;
        left: 50%;
        transform: translate(-50%);
        z-index: 2;

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