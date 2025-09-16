<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:52:28
 * @LastEditTime: 2025-03-17 19:21:06
 * @Description: 优惠券
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='coupon' class="mtBg">
        <topBar title="优惠券" :showImg="true"></topBar>

        <navTab :list="navList" @choose="chooseFN"></navTab>
        <view style="height: 20rpx;"></view>
        <!--  -->
        <view class="list c3 s21" v-for="(item, index) in navList[choose].list" :key="index" @click="useFN(item)">
            <view class="name_price fw flex mb10 pr34">
                <text class="f1 s29  ">-{{ item.discountRate }}%优惠券</text>
                <text style="color: #DC0000;font-size: 61rpx;">-{{ item.discountRate }}%</text>
            </view>
            <view class="timeUse flex pr34">
                <text class=" f1">有效期至{{ item.validEnd }}</text>
                <text class="fw">满{{ item.minOrderAmount }}可用</text>
            </view>
            <view class="btnV flex-a fw">
                <view class="f1">
                    使用规则
                    <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                </view>
                <view class="btn tc ">1V1私聊</view>

            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
        </view>

        <view class="noMore" v-if="navList[choose].list.length == 0">
            <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/noMore.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        </view>
    </view>
</template>
<script>
import navTab from '../../components/navTab.vue'
import topBar from '../../components/topBar.vue'

export default {
    components: {
        navTab, topBar
    },
    data() {
        return {
            navList: [{
                name: '未使用',
                pageNum: 1,
                list: [],
            }, {
                name: '已使用',
                pageNum: 1,
                list: [],
            }, {
                name: '已过期',
                pageNum: 1,
                list: [],
            }],
            choose: 0,
            use: 0,
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad(options) {
        this.getListFN()
        this.use = options.use
    },
    methods: {
        useFN(item) {
            if (this.use) {
                uni.setStorageSync('coupon', item)
                uni.navigateBack({ delta: 1 })
            }
        },
        chooseFN({ item, index }) {
            this.choose = index
            this.getListFN()
        },
        getListFN() {
            if (this.navList[this.choose].pageNum == 'finsh') return
            let data = {
                pageNum: this.navList[this.choose].pageNum,
                pageSize: 10,
                couponsStatus: this.choose + 1,
            }
            this.reqFN({
                url: '/calculate-api/api/secure/oms/coupons/myCoupons',
                data,
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    if (this.navList[this.choose].pageNum == 1) {
                        this.navList[this.choose].list = []
                    }
                    res.data.data.list.forEach(s => {

                        this.navList[this.choose].list.push(s)
                    })
                    if (this.navList[this.choose].pageNum < res.data.data.totalPage) {
                        this.navList[this.choose].pageNum += 1
                    } else {
                        this.navList[this.choose].pageNum = 'finsh'
                    }
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
    height: 100%;
    overflow: hidden;

}

#coupon {
    margin-top: 210rpx;
    background: linear-gradient(180deg, rgba(24, 27, 37, .8) 0%, rgba(24, 27, 37, 1) 100%);
    min-height: calc(100% - 170rpx);
    padding-top: 10rpx;

    .list {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/couponBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        width: 632rpx;
        height: 256rpx;
        margin: 0 auto 60rpx;
        padding: 23rpx 23rpx 0 40rpx;
        position: relative;
        &::before,
        &::after {
            position: absolute;
            border: 2rpx solid rgba(212, 203, 200, .6);

            content: ' ';
        }

        &::before {
            height: calc(100% + 32rpx);
            width: calc(100% + 36rpx);
            top: -20rpx;
            left: -20rpx;

        }

        &::after {
            height: calc(100% + 24rpx);
            width: calc(100% + 28rpx);
            top: -16rpx;
            left: -16rpx;
        }

        .angle {
            image {
                height: 34rpx;
                width: 34rpx;

            }

            .img1 {
                top: -18rpx;
                left: -18rpx;
            }

            .img2 {
                top: -18rpx;
                right: -18rpx;
            }

            .img3 {
                bottom: -18rpx;
                left: -18rpx;
            }

            .img4 {
                bottom: -18rpx;
                right: -18rpx;
            }
        }

        .pr34 {
            padding-right: 34rpx;
        }

        .name_price {
            align-items: baseline;
        }

        .btnV {
            image {
                height: 1rpx;
                width: 30rpx;
            }

            .btn {
                background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
                background-size: 100% auto;
                line-height: 87rpx;
                width: 254rpx;
                height: 87rpx;
            }
        }
    }
}
</style>