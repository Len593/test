<!--
 * @Author: fujihang
 * @Date: 2025-01-17 12:38:23
 * @LastEditTime: 2025-04-13 16:40:39
 * @Description: 系统消息
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='activeNews' class="mtBg">
        <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        <topBar title="系统消息" :showImg="true"></topBar>


        <view class="newList">
            <view class="child " v-for="(item,index) in dataList" :key="index" @click="toFN(item)">
                <view class="time s26" style="color: #807971;margin-bottom: 15rpx;">{{ item.createTime }}</view>
                <view class="f1 s27 con ">
                    <view class=" fw mb27 c1">
                        {{ item.noticeTitle || '系统通知' }}
                    </view>
                    <view style="color: #807971;">
                        {{ item.noticeText || '无' }}
                    </view>
                </view>
            </view>
        </view>

        <view class=" tc s21 c1" v-if="pageNum == 'finsh'">
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
    onShow() {
        this.pageNum = 1
        this.getListFN()

    },
    onReachBottom() {
        this.getListFN()
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    methods: {
        toFN(item) {
            this.reqFN({
                url: '/calculate-api/api/secure/message/MemberSystemNotice/client/readDesignateNotify?id='+item.memberSystemNoticeId,
                data: {
                    
                },
                method: 'PUT'
            }).then(res => {
                if (res.data.code == 0) {

                }
            })
        },
        getListFN() {
            if (this.pageNum == 'finsh') return
            let data = {
                pageNum: this.pageNum,
                pageSize: 100,
                messageSystemType: 1
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
    },
}
</script>
<style lang='scss'>
page {	background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
	background-size: 100% auto;
    height: 100%;
    overflow: auto;
}

#activeNews {
    .newList {
        margin: 0 27rpx 10rpx 48rpx;


        .con {
            padding: 31rpx 29rpx;
            background: #171B24;
            border-radius: 0px 0px 0px 0px;
            border: 2px solid;
            border-image: linear-gradient(180deg, rgba(226, 204, 192, 1), rgba(255, 228, 213, 0)) 2 2;
        }

    }
}
</style>