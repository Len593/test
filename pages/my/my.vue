<!--
 * @Author: fujihang
 * @Date: 2025-01-18 17:58:46
 * @LastEditTime: 2025-06-15 16:15:08
 * @Description: 我的
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='my' class="mtBg">
        <view class="bgwf" style="top: 30%;"></view>

        <view style="z-index: 2;position: relative;">

            <view class="logoVers flex-a " @click="toFN('/pages/myInfor/myInfor')">
                <image :src="dataInfo.icon" mode="aspectFill" class="logo" />
                <view class="name   fw f1 jc" style="color: #D2B691;margin-left: 12rpx;">
                    <view class="flex-a s32 mb10">

                        {{ dataInfo.nickName }}
                        <template v-if="dataInfo.sex != -1">

                            <image v-if="dataInfo.sex"
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/man.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                            <image v-else
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/women.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                        </template>
                    </view>

                    <view class="val s24 ">{{ dataInfo.email || '未绑定邮箱' }}</view>
                </view>


            </view>
            <!--  -->
            <image
             @click="toFN('/pages/myInfor/myInfor')"
                style="position: absolute;top: -36rpx;right: 30rpx;height: 1rpx;width:44rpx;"
                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/19.png"
                mode="widthFix"
            />
            <!--  -->
            <view class="funBag flex-a c3">
                <view class="child mr20 s32">
                    <view class="name flex-a" @click.stop="toFN('/pages/myWallet/myWallet')">
                        <text class="f1">
                            余额
                        </text>
                        <view class="b s20 cf">
                            立即储值>
                        </view>
                    </view>
                    <view class="val_img flex">
                        <text class="f1 s48">{{ money || 0 }}</text>
                        <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/20.png" mode="heightFix" />
                    </view>
                </view>
                <!--  -->
                <view class="child  s32" @click.stop="toFN('/pages/myOrder/myOrder')">
                    <view class="name flex-a">
                        <text class="f1">
                            我的订单
                        </text>


                    </view>
                    <view class="val_img flex">
                        <text class="f1 s48">{{dataInfo.orderCount||0}}</text>
                        <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/21.png" mode="heightFix" />
                    </view>
                </view>
            </view>
            <!--  -->
            <view class="myFun c3">
                <view class="s32">
                    常用功能
                </view>
                <view class="content flex s24">
                    <view class="child tc" @click="toFN(item.to)" v-for="item in funList" :key="item.name">
                        <image :src="item.img" mode="heightFix" class="mb20" />
                        <view class="name">
                            {{ item.name }}

                        </view>
                    </view>
                </view>
            </view>
            <!--  -->
            <view style="padding: 0 20rpx;">

                <image style="border-radius: 24rpx; width: 100%;height: 1rpx;" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/26.png"
                    mode="widthFix" />
            </view>

            <!-- <view class="myBag  s31 fw c1 ">
                <view class="conta flex-a" @click.stop="toFN('/pages/myWallet/myWallet')">


                    <view class="f1" @click="toFN('pages/myWallet/myWallet')">
                        <view class="name">
                            我的钱包
                        </view>
                        <view class="val flex-a">
                            <image
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/bag.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                            {{ money || 0 }}
                        </view>

                    </view>
                    <view class="btn tc c3 s27">立即储值</view>
                </view>

            </view> -->

            <!--  -->
            <!-- <view class="bg bgLine">
                <view class="list s27 c1 flex-a" @click="toFN(item.to)" v-for="item in funList" :key="item.name">
                    <image class="img mr10" :src="item.img" mode="widthFix" />
                    <text class="f1">
                        {{ item.name }}
                    </text>
                    <image src="" mode="aspectFill" />
                </view>
                <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view>
            </view> -->
            <tabbar to="/pages/my/my"></tabbar>
            <view style="height: 200rpx;"></view>
        </view>
    </view>
</template>
<script>
import tabbar from '../../components/tabbar.vue'
export default {
    components: {
        tabbar
    },
    data() {
        return {
            money: 0,
            dataInfo: {},
            funList: [
                // {
                //     name: "我的订单",
                //     val: '',
                //     to: '/pages/myOrder/myOrder',
                //     img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100'
                // },
                {
                    name: "优惠券",
                    val: '',
                    to: '/pages/coupon/coupon',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/23.png'

                },
                {
                    name: "我的档案",
                    val: '',
                    to: '/pages/myArchives/myArchives',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/24.png'

                },
                {
                    name: "消息通知",
                    val: '',
                    to: '/pages/news/news',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/22.png'
                },
                {
                    name: "关于我们",
                    val: '',
                    to: '/pages/aboutUs/aboutUs',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/25.png'

                },
            ]
        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onShow() {

    
        
        this.getData()
        this.getWalletBalanceFN()

    },
    methods: {
        getWalletBalanceFN() {
            this.reqFN({
                url: '/calculate-api/api/secure/oms/wallet/getWalletBalance',
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.money = res.data.data.totalBalance
                }
            })
        },

        toFN(url) {
            uni.navigateTo({
                url,
                fail: err => {
                    uni.switchTab({ url })
                }
            });
        },
        getData() {
            this.reqFN({
                url: '/calculate-api/api/secure/member/getInfo',
            }).then(res => {
                if (res.data.code == 0) {
                    this.dataInfo = res.data.data
                    uni.setStorageSync('userInfo', res.data.data)
                }
            })
        },
    },
}
</script>
<style lang='scss'>
page {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    overflow: auto;
    height: 100%;
}

#my {
    padding-top: 150rpx;

    .logoVers {
        margin: 0 0 80rpx;
        // color: #fff;
        position: relative;
        z-index: 2;
        padding: 0 50rpx;

        .logo {
            width: 130rpx;
            height: 130rpx;
            border-radius: 50%;
            padding: 10rpx;
            border: 2rpx solid #FFD390;
            // margin-bottom: 25rpx;

        }



        .name {
            margin-bottom: 21rpx;
            font-size: 46rpx;

            image {
                margin-left: 17rpx;
                height: 1rpx;
                width: 42rpx;
            }
        }

        .val {}
    }

    .myFun {
        padding: 30rpx;
        border-radius: 20rpx;
        background: #FDF0DD;
        margin: 20rpx;

        .content {
            margin-top: 20rpx;
            justify-content: space-between;

            .child {
                image {
                    height: 72rpx;
                    width: 1rpx;

                }
            }
        }
    }

    .funBag {
        padding: 0 10rpx;

        .child {
            margin: 10rpx;
            padding: 26rpx 26rpx 20rpx;
            flex: 1;
            border-radius: 20rpx;
            background: #FDF0DD;

            .name {
                margin-bottom: 20rpx;
            }

            .val_img {
                align-items: flex-end;
            }

            image {
                height: 64rpx;
                width: 1rpx;
            }

            .b {
                padding: 6rpx 12rpx;
                border-radius: 24rpx;
                background: linear-gradient(180deg, #88550F 0%, #B28850 100%);
            }
        }
    }

    .myBag {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/myWalletBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        margin: 0 38rpx 38rpx;
        padding: 10rpx;

        .conta {
            padding: 26rpx 38rpx 27rpx 42rpx;
            // background: rgba(0, 0, 0, 0.2);
        }

        .name {
            margin-bottom: 19rpx;
        }

        .val {
            image {
                height: 1rpx;
                width: 46rpx;
                margin-right: 10rpx;
            }
        }

        .btn {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            line-height: 87rpx;
            width: 254rpx;
            height: 87rpx;
        }
    }

    .bg {

        margin: 0 17rpx;
        padding: 55rpx 38rpx 10rpx 30rpx;

        .list {
            margin-bottom: 68rpx;
            position: relative;
            z-index: 2;
        }

        .img {
            height: 1rpx;
            width: 46rpx;
        }

        image {
            height: 1rpx;
            width: 30rpx;
        }
    }
}
</style>