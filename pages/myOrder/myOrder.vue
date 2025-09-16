<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:52:28
 * @LastEditTime: 2025-06-14 22:41:27
 * @Description: 我的订单
-->
<template>
    <view class="mtBg" :style="'font-family:' + (fontfamily)" id='storedValRecord'>
        <topBar :title="'我的订单'" :showImg="true"></topBar>

        <navTab :list="navList" @choose="chooseFN"></navTab>

        <!--  -->
        <view class="list cf s28 bgLine" v-for="(item, index) in navList[choose].list" :key="index">
            <view class="flex-a child">
                <text class="f1">订单号:{{ item.orderNo }}</text>
                <text>
                    {{ status[item.orderStatus] }}
                </text>

            </view>
            <view class="flex-a child">
                {{ item.orderDetailList[0]?item.orderDetailList[0].serviceName:'' }}

            </view>
            <view class="flex child">
                <text class="f1">下单时间：{{ getTimeName(item.createTime) }}</text>
                <view style="text-align: right;">
                      <view style="margin-bottom: 10rpx;">总铜币：{{ item.totalCopperAmount||0 }}</view>
                      <view>实际支付：{{  item.orderDetailList[0]?item.orderDetailList[0].actualCopper:0 }}</view>
                </view>
              

            </view>

            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>
        <view class="tc s24 cf" v-if="navList[choose].list.length&&navList[choose].pageNum=='finsh'">没有更多的了</view>

        <view class="noMore" v-if="!navList[choose].list.length">
            <image
                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/noMore.png?x-oss-process=image/quality,Q_100"
                mode="widthFix" />
        </view>
    </view>
</template>
<script>
import topBar from '../../components/topBar.vue'

import navTab from '../../components/navTab.vue'
export default {
    components: {
        navTab, topBar
    },
    data() {
        return {
            status: [
                '',
                '待支付',
                '已支付',
                '支付失败',
                '已关闭',
                '已退款',
            ],
            navList: [
                {
                    name: "咨询室",
                    list: [],
                    pageNum: 1,
                    post: 'analyse',
                },
                {
                    name: "测算",
                    list: [],
                    pageNum: 1,
                    post: 'reckon',
                },
                {
                    name: "批算报告",
                    list: [],
                    pageNum: 1,
                    post: 'solution',
                },
            ],
            choose: 0,
        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onReachBottom() {
        this.getListFN()
    },
    onLoad() {
        this.getListFN()
    },
    methods: {
        chooseFN(item, index) {


            this.choose = item.index
            this.getListFN()


        },
        getListFN() {
            if (this.navList[this.choose].pageNum == 'finsh') return
            this.isLoadend = false
            let data = {
                pageNum: this.navList[this.choose].pageNum,
                serviceType: this.navList[this.choose].post,
                pageSize: 10,
            }


            this.reqFN({
                url: '/calculate-api/api/secure/oms/order/myOrders',
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
                this.isLoadend = true

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
    overflow: auto;
}

#storedValRecord {
    .list {
        margin: 0 20rpx 20rpx;
        padding: 30rpx 30rpx 1rpx;

        .child {
            margin-bottom: 20rpx;
        }
    }
}
</style>