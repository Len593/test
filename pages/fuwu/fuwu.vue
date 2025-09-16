<!--
 * @Author: fujihang
 * @Date: 2025-01-17 12:38:23
 * @LastEditTime: 2025-04-04 16:46:05
 * @Description: 服务消息
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='fuwu' class="mtBg">
        <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        <topBar title="服务消息" :showImg="true">
            <view class="s26 cf" @click="clearFN">
                清除未读
            </view>
        </topBar>


        <view class="newList">
            <view class="list flex s27" v-for="(item, index) in dataList" :key="index">
                <image class="head" :src="(item.icon||'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/logo.jpg')+'?x-oss-process=image/quality,Q_100'" mode="aspectFill" />
                <view class="f1 c1 flex contant">
                    <view class="name s31 flex-a" style="margin-bottom: 17rpx;">
                        <text class="f1">
                            {{ item.noticeTitle }}

                        </text>
                        <text class="s21">
                            {{ item.createTime }}
                        </text>
                    </view>

                    <view class="det f1 cf">
                        {{ item.noticeText }}
                    </view>
                    <view class="btnV flex-a fw">
                        <view class="f1 flex-a fw">

                        </view>
                        <view class="btn tc c3" @click.stop="toFN(item)">查看详情</view>

                    </view>
                    <view class="angle">
                        <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" />
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
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
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
    methods: {
        clearFN() {
            this.reqFN({
                url: '/calculate-api/api/secure/message/MemberSystemNotice/client/readAllNotify?messageSystemType=2',
                data: {
         
                },
                method: 'PUT'
            }).then(res => {
                if (res.data.code == 0) {
                    this.pageNum = 1
                    this.getListFN()
                }
            })
        },
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
            switch (item.noticeType) {
                case 2:
                    uni.navigateTo({
                        url: '/pages/coupon/coupon'
                    });
                    break;
            }
        },
        getListFN() {
            if (this.pageNum == 'finsh') return
            let data = {
                pageNum: this.pageNum,
                pageSize: 100,
                messageSystemType: 2
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

#fuwu {
    .newList {

        .list {
            margin: 0 19rpx 34rpx;
            box-sizing: border-box;




            .contant {
                flex-direction: column;
                position: relative;

                height: 424rpx;
                padding: 32rpx 32rpx 36rpx 31rpx;

                background: #171b24;

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

        .head {
            width: 94rpx;
            height: 94rpx;
            margin-right: 27rpx;
            border-radius: 50%;
            border: 2rpx solid #C98F53;

        }

        .type {
            justify-content: space-between;
            margin-bottom: 32rpx;
        }

        .det {}

        .btnV {
            z-index: 3;

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
            }
        }


    }
}
</style>