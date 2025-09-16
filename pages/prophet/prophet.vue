<!--
 * @Author: fujihang
 * @Date: 2025-01-23 20:47:54
 * @LastEditTime: 2025-06-17 19:56:01
 * @Description: 先知 塔罗牌
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='prophet'>
        <topBar title="塔罗牌" :showImg="true"></topBar>



        <view class="sss" :style="'height:' + (tap ? 170 : 870) + 'rpx;'"></view>
        <template v-if="tap == 0">


            <view class="textQue tc c1">
                <view class="top">
                    默念你的问题
                </view>
                <view class="bot">
                    请凭直觉抽取塔罗牌
                </view>
            </view>

            <view :class="['aniCard', cardNum == 5 && 'aniCard1']">

                <image :key="index" :style="aa ? getStyleFN2(index) : getStyleFN(index)" @click="openFN(index, item)"
                    :class="['img' + item,
                    donhua[0] == index && 'donhua0',
                    donhua[1] == index && 'donhua1',
                    donhua[2] == index && 'donhua2',
                    donhua[3] == index && 'donhua3',
                    donhua[4] == index && 'donhua4',
                    ]" v-for="(item, index) in arr"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/kapai.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>


            <view class="tips s27 tc cf" :style="'opacity:' + (aa ? 0 : 1)">
                牌已切好,請憑感覺抽取四張塔羅牌
                </br>
                不要猶豫,相信自己第一直覺
            </view>

        </template>


        <view class="card flex">
            <view :class="['child tc flex-a f1', cardNum == 5 && 'child1']" v-for="(item, index) in cardNum" :key="item"
                :style="'opacity:' + (aa ? 0 : 1)">
                <view class="img">
                    <image v-if="cardList[index]"
                        :src="cardList[index].image || 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/kapai.png?x-oss-process=image/quality,Q_100'"
                        mode="aspectFill" />
                </view>
                <view class="name c3 " v-if="cardList[index]">
                    {{ cardList[index].card_info ? cardList[index].card_info.card_name : ('第' + ['一', '二', '三', '四',
                        '五',][index]
                        + '张牌') }}
                </view>
            </view>
        </view>

        <template v-if="tap == 1">
            <view class="area bgLine">
                <textarea v-model="area" class="cf s30" placeholder="请补充你要问的问题">

                </textarea>
                <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view>
            </view>

            <view class="btnV flex-a fw">
                <view class="btn tc s38 " @click="seeFN">諮詢卡牌師</view>
            </view>


        </template>

        <!--  -->

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
                    {{ toFix(reckon.reckonPrice * (100 - (couponDetail.discountRate || 0)) / 100 )}}
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
            area: '',
            donhua: [],
            a: 1,
            arr: [],
            aa: true,
            reckon: '',
            hasObj: {},
            cardList: [

            ],
            postList: [],
            cardNum: 0,
            couponDetail: {},
            tap: 0,
            showObj: {
                title: '支付订单',
                show: false,
            },
            WalletBalance: 0,

        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        setTimeout(() => {
            this.aa = false
        }, 1000)
        // let aa=setInterval(()=>{
        //     this.arr+=1
        //     if(this.arr>55) clearInterval(aa)
        // },100)
        this.reckon = uni.getStorageSync('reckon')
        this.cardNum = this.reckon.cardNum
        console.log(this.reckon, '---reckon');
        this.getCoupon()
        this.getData()
    },
    onShow() {
        if (uni.getStorageSync('coupon')) {
            this.couponDetail = uni.getStorageSync('coupon') || {}
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
                console.log(res, '---ddr');

                if (res.data.code == 0) {
                    this.reqFN({
                        url: `/calculate-api/api/secure/oms/order/create`,
                        data: {
                            "actualCopperAmount":this.toFix( this.reckon.reckonPrice * (100 - (this.couponDetail.discountRate || 0)) / 100),
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

                        console.log(ces, '---ces');

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


                        }else this.showToast({
                            title: '支付订单失败',
                            icon: 'none'
                        })
                    })
                }else uni.hideLoading()
            })
        },
        seeFN() {
            this.showObj.show = true

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
        getData() {
            this.reqFN({
                url: '/calculate-api/api/secure/community/home/shuffle',
                data: {
                    spreads: this.reckon.cardNum,
                },
                method: "GET"
            }).then(res => {
                console.log(res, '---');

                if (res.data.code == 0) {
                    for (let c = 0; c < 3; c++) {
                        for (let i = 0; i < 9; i++) {

                            this.arr.push(res.data.data[i])


                        }
                    }

                    console.log(this.arr, '-2222-');

                }
            })
        },
        openFN(index, item) {
            if (this.cardNum <= this.postList.length) return
            this.hasObj[item] = true
            this.donhua.push(index)
            this.postList.push(item)
            if (this.cardNum == this.postList.length) {
                setTimeout(() => {
                    this.jieshuoFN()
                    this.tap++
                }, 1100)

            }
            setTimeout(() => {
                this.cardList.push({})
            }, 1100)

        },
        jieshuoFN() {
            let taluoUserChecked = []
            this.arr.forEach((s, i) => {
                if (i < this.cardNum) taluoUserChecked.push(s)
            })
            this.reqFN({
                url: '/calculate-api/api/secure/community/home/send',
                data: {
                    reckonId: this.reckon.reckonId,
                    taluoSpreads: this.reckon.cardNum,
                    taluoUserChecked: taluoUserChecked.join(',')
                },
            }).then(res => {
                console.log(res, '==1111===');
                if (res.data.code == 0) {
                    this.cardList = res.data.data
                }

            })

        },
        getStyleFN2(index) {

            return `z-index:${index};transform:rotate(${Math.floor(Math.random() * 1000)}deg) translateX(${Math.floor(Math.random() * 250)}rpx) translateY(${Math.floor(Math.random() * 250)}rpx)`

        },
        getStyleFN(index) {

            const radius = 70; // 假设的半径，这个值可能需要根据你的布局进行调整
            const angleStep = 360 / 27; // 每个图片之间的角度差
            const containerWidth = 480; // 容器的宽度，与WXSS中定义的相同
            const containerHeight = 480; // 容器的高度，与WXSS中定义的相同
            const centerX = containerWidth / 2; // 容器的中心点X坐标
            const centerY = containerHeight / 2; // 容器的中心点Y坐标

            const angle = angleStep * index;
            const radian = angle * Math.PI / 180; // 将角度转换为弧度
            const translateX = centerX + (radius - 34) * Math.cos(radian) - 34; // 17是图片宽度的一半
            const translateY = centerY + (radius - 57) * Math.sin(radian) - 57; // 28.5是图片高度的一半，但这里由于图片是矩形的，所以计算不会完美


            return `z-index:${index};transform:rotate(${angle}deg) translateX(${translateX}rpx) translateY(${translateY}rpx)`

        }



    },
}
</script>
<style lang='scss'>
#prophet {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/prophetBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    height: 100vh;
    width: 100vw;

    .coupon {
        background: #3F2A15;
        margin: 0 19rpx 408rpx;
        height: 73rpx;
        padding: 0 23rpx;



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


    .area {
        position: relative;
        margin: 30rpx 70rpx;

        textarea {
            width: 100%;
            height: 400rpx;
            padding: 30rpx;
            position: relative;
            z-index: 2;

        }
    }

    .sss {
        transition: .6s linear;
    }

    .aniCard {
        position: absolute;
        width: 550rpx;
        height: 550rpx;
        left: 44.3vw;
        top: 410rpx;
        /* 或者根据需要设置具体高度，但这里为了形成圆形，高度应该与计算出的圆的直径相匹配 */
        // overflow: hidden;
        /* 隐藏超出容器的部分 */
        pointer-events: none;

        /* 防止图片阻挡点击事件 */
        image {
            position: absolute;
            width: 68rpx;
            height: 114rpx;
            pointer-events: auto;
            transition: .5s;
            /* 确保图片可以响应点击事件 */
        }
    }

    .textQue {
        width: 412rpx;
        font-family: AaMGZYT, AaMGZYT;
        font-weight: 400;
        font-size: 44rpx;
        line-height: 69rpx;
        text-shadow: inset -2rpx 4rpx 0px #FFE5BD;
        text-align: center;
        font-style: normal;
        text-transform: none;
        position: absolute;
        top: 410rpx;
        left: 52%;
        transform: translateX(-50%);
        z-index: 70;

        .top,
        .bot {
            animation: intc 2s infinite;
        }

        // background: linear-gradient(89.99999999999997deg, #D6B896 0%, #CB904E 100%);
    }

    .card {
        padding: 0 20rpx;

        .child {
            flex-direction: column;
            transition: .3s;

            .img {
                width: 141rpx;
                height: 236rpx;
                margin-bottom: 23rpx;
                box-shadow: inset 0px 0 22rpx 0px #FFD390;
                border-radius: 0px 0px 0px 0px;
                border: 2rpx solid #FFD390;

                image {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .child1 {
            .img {
                width: 131rpx;
                height: 236rpx;
                margin-bottom: 23rpx;
                box-shadow: inset 0px 0 22rpx 0px #FFD390;
                border-radius: 0px 0px 0px 0px;
                border: 2rpx solid #FFD390;

                image {
                    width: 100%;
                    height: 100%;
                }
            }

            .name {
                width: 131rpx;

            }
        }

        .name {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/prophet.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            width: 164rpx;
            height: 42rpx;
            line-height: 38rpx;
            font-size: 19rpx;
            padding: 0 20rpx;
            overflow: hidden;
        }
    }

    .tips {
        margin: 0 auto 55rpx;
        transition: .3s;
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

    .donhua0 {
        animation: test 1s;
        animation-fill-mode: forwards;

    }

    .donhua1 {
        animation: test1 1s;
        animation-fill-mode: forwards;

    }


    .donhua2 {
        animation: test2 1s;
        animation-fill-mode: forwards;

    }

    .donhua3 {
        animation: test3 1s;
        animation-fill-mode: forwards;

    }

    .aniCard1 {
        .donhua2 {
            animation: test22 1s;
            animation-fill-mode: forwards;

        }

        .donhua3 {
            animation: test33 1s;
            animation-fill-mode: forwards;

        }

        .donhua4 {
            animation: test4 1s;
            animation-fill-mode: forwards;
        }
    }

}

@keyframes intc {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);

    }

    100% {
        transform: scale(1);
    }
}

@keyframes test {
    70% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    80% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    81% {
        position: fixed;
        left: 52%;
        top: 30vh;
        transform: translateX(-50%);
    }

    99% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        position: fixed;
        top: 70vh;
        left: 100rpx;
    }

    100% {
        display: none;
    }
}

@keyframes test1 {
    70% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    80% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    81% {
        position: fixed;
        left: 52%;
        top: 30vh;
        transform: translateX(-50%);
    }

    99% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        position: fixed;
        top: 70vh;
        left: 250rpx;
    }

    100% {
        display: none;
    }
}

@keyframes test2 {
    70% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    80% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    81% {
        position: fixed;
        left: 52%;
        top: 30vh;
        transform: translateX(-50%);
    }

    99% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        position: fixed;
        top: 70vh;
        left: 440rpx;
    }

    100% {
        display: none;
    }
}

@keyframes test22 {
    70% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    80% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    81% {
        position: fixed;
        left: 48%;
        top: 30vh;
        transform: translateX(-50%);
    }

    99% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        position: fixed;
        top: 70vh;
        left: 380rpx;
    }

    100% {
        display: none;
    }
}

@keyframes test33 {
    70% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    80% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    81% {
        position: fixed;
        left: 56%;
        top: 30vh;
        transform: translateX(-50%);
    }

    99% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        position: fixed;
        top: 70vh;
        left: 500rpx;
    }

    100% {
        display: none;
    }
}

@keyframes test4 {
    70% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    80% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    81% {
        position: fixed;
        left: 70%;
        top: 30vh;
        transform: translateX(-50%);
    }

    99% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        position: fixed;
        top: 70vh;
        left: 580rpx;
    }

    100% {
        display: none;
    }
}

@keyframes test3 {
    70% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    80% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        scale: 1.6;
    }

    81% {
        position: fixed;
        left: 52%;
        top: 30vh;
        transform: translateX(-50%);
    }

    99% {
        transform: rotate(0deg) translateX(0rpx) translateY(0rpx);
        position: fixed;
        top: 70vh;
        left: 570rpx;
    }

    100% {
        display: none;
    }
}
</style>