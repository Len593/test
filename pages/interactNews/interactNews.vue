<!--
 * @Author: fujihang
 * @Date: 2025-01-17 12:44:14
 * @LastEditTime: 2025-04-04 16:46:17
 * @Description: 互动消息
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='interactNews' class="mtBg">
        <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        <topBar title="互动消息" :showImg="true"></topBar>

        <view class="newList">
            <view class="child c1 flex-a" v-for="(item, index) in dataList" :key="index" @click="toFN(item)">
                <image class="header" :src="item.interactionIcon+'?x-oss-process=image/quality,Q_100'" mode="aspectFill" />
                <view class="f1 s27 ml29">
                    <view class=" fw s31 mb10" style="position: relative;">
                        {{ item.nickName }}
                        <view class="dian" v-if="item.readState"></view>
                    </view>
                    <view class="flex s27 cf">
                        {{ item.noticeText }}
                        <text class="s23 ml10 c1"></text>
                    </view>
                </view>
                <image class="img" :src="item.noticeImgUrl+'?x-oss-process=image/quality,Q_100'" mode="aspectFill" />
            </view>
        </view>

        <view class=" tc s21 c1" v-if="pageNum=='finsh'">
            没有更多的了~
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
            dataList: [],
            pageNum: 1,
        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onShow() {
        this.pageNum=1
        this.getListFN()

    },
    onReachBottom() {
        this.getListFN()
    },
    methods: {
        toFN(item) {
            // square
            // 
            this.reqFN({
                url: '/calculate-api/api/secure/message/MemberSystemNotice/client/readDesignateNotify?id='+item.memberSystemNoticeId,
                data:{

                },
                method: 'PUT'
            }).then(res => {
                if (res.data.code == 0) {
                   
                }
            })
            // targetId
            this.reqFN({
                url: `/calculate-api/api/secure/community/moment/getMomentDetail?momentId=${item.targetId}`,
                data:{},
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    uni.setStorageSync('square', res.data.data)
                    uni.navigateTo({
                        url: '/pages/squareDetail/squareDetail'
                    })
                }
            })

        },
        getListFN() {
            if (this.pageNum == 'finsh') return
            let data = {
                pageNum: this.pageNum,
                pageSize: 100,
                messageSystemType: 3
            }
            this.reqFN({
                url: '/calculate-api/api/secure/message/MemberSystemNotice/client/querySystemNotice',
                data,
                method: 'GET'
            }).then(res => {
                console.log(res, '---');

                if (res.data.code == 0) {
                    if (this.pageNum == 1) {
                        this.dataList = []
                    }
                    this.dataList = [...this.dataList, ...res.data.data.list]
                    console.log(this.dataList[0]);

                    if (this.pageNum < res.data.data.totalPage) {
                        this.pageNum += 1
                    } else {
                        this.pageNum = 'finsh'
                    }
                }
            })
        }
    }
}
</script>
<style lang='scss'>
page {	background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
	background-size: 100% auto;
    height: 100%;
    overflow: auto;
}

#interactNews {
    .newList {
        margin: 0 67rpx 76rpx 48rpx;

        .child {
            margin-bottom: 71rpx;
        }

        .header {
            width: 92rpx;
            height: 92rpx;
            border-radius: 50%;
            border: 2rpx solid #FFD390;
        }

        .dian {
            height: 10rpx;
            width: 10rpx;
            border-radius: 50%;
            background: red;
            position: absolute;
            top: 0;
            right: -10rpx;
        }

        .img {
            width: 123rpx;
            height: 87rpx;
            border-radius: 8rpx 8rpx 8rpx 8rpx;
        }
    }
}
</style>