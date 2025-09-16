<!--
 * @Author: fujihang
 * @Date: 2025-01-17 11:44:41
 * @LastEditTime: 2025-06-15 14:59:03
 * @Description: 消息
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='news' class="mtBg">
        <view style="    position: fixed;
        height: 1500rpx;
        width: 100%;
        background: #fff6ee;
        border-radius: 36rpx;
        top: 170rpx;
        left: 0;
        z-index: 1;"></view>

        <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100"
            mode="widthFix" />
        <topBar title="消息" :showImg="false"></topBar>

        <view class="fun flex-a ">
            <view class="child tc f1 c3 s29 " v-for="item in fuList" @click="to2FN(item.to)" :key="item.to">
                <image class="mb10" :src="item.img" mode="heightFix" />
                <view class="name">
                    {{ item.name }}
                </view>
                <view class="dot cf s22 tc" v-if="item.val > 0">
                    {{ item.val > 99 ? 99 : item.val }}
                </view>
            </view>
            <!-- <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view> -->
        </view>

        <view class="newList">
            <view v-if="item.lastChat" class="child flex c3" v-for="(item, index) in dataList" :key="index"
                @click="toFN(item)">
                <image :src="item.icon + '?x-oss-process=image/quality,Q_100'" mode="aspectFill" />
                <view class="f1 s27" style="margin-left: 30rpx;">
                    <view class=" fw mb10 flex-a">
                        <view class="f1 s32">
                            {{ item.userName || '匿名' }}

                        </view>
                        <text class="s23">
                            {{ getDate(item.lastChat.sendTime) || '无' }}
                        </text>
                    </view>
                    <view class="flex" style="align-items: flex-end;">
                        <text class="f1  tline" style="margin-top: 10rpx;-webkit-line-clamp: 4;">
                            <template v-if="item.lastChat.chatMessageType == 2">
                                {{ item.lastChat.chatText }}
                            </template>
                            <template v-else-if="item.lastChat.chatMessageType == 3">
                                语音
                            </template>
                            <template v-else-if="item.lastChat.chatMessageType == 4">
                                图片
                            </template>
                            <template v-else-if="item.lastChat.chatMessageType == 5">
                                ta推荐了一个咨询服务
                            </template>
                        </text>
                        <view class="dian tc cf s22" v-if="item.unreadCount != 0">
                            {{ item.unreadCount }}
                        </view>

                    </view>
                </view>
            </view>

        </view>

        <view class="noMore" v-if="dataList.length == 0">
            <image
                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/noMore.png?x-oss-process=image/quality,Q_100"
                mode="widthFix" />
        </view>

        <view style="height: 300rpx;"></view>
        <tabbar to="/pages/news/news"></tabbar>



    </view>
</template>
<script>
import tabbar from '../../components/tabbar.vue'
import topBar from '../../components/topBar.vue'

export default {
    components: {
        tabbar, topBar
    },
    data() {
        return {
            fuList: [
                {
                    name: "系统消息",
                    img: '/static/imgs/xitong58.png',
                    to: '/pages/activeNews/activeNews',
                    val: 0,
                },
                {
                    name: "服务消息",
                    img: '/static/imgs/fuwu58.png',
                    to: '/pages/fuwu/fuwu',
                    val: 0,

                },
                {
                    name: "互动消息",
                    img: '/static/imgs/hudon58.png',
                    to: '/pages/interactNews/interactNews',
                    val: 0,

                },

            ],
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

        this.pageNum = 1
        this.getListFN()
        this.getTopNewFN()
    },
    onReachBottom() {
        this.getListFN()
    },
    onPullDownRefresh() {
        this.pageNum = 1
        this.getListFN()
        setTimeout(() => {
            uni.stopPullDownRefresh();

        }, 1000);
    },
    methods: {
        getTopNewFN() {
            this.fuList.forEach((s, i) => {

                this.reqFN({
                    url: `/calculate-api/api/secure/message/MemberSystemNotice/client/getUnreadNotifyAmount?messageSystemType=${i + 1}`,
                    data: {},
                    method: 'GET'
                }).then(res => {
                    console.log(res, '--22-');

                    if (res.data.code == 0) {
                        s.val = res.data.data
                    }
                })
            })


        },
        to2FN(url) {
            uni.navigateTo({
                url,
                fail: err => {


                }
            })
        },
        toFN(item) {

            this.reqFN({
                url: `/calculate-api/api/secure/message/ChatList/client/read/${item.chatRoomListId}`,
                data: {},
                method: 'PUT'
            }).then(res => {
                // console.log(res, '---');

                if (res.data.code == 0) {

                }
            })

            this.reqFN({
                url: `/calculate-api/api/secure/member/getMemberUserService?userId=${item.chatMemberId}`,
                data: {
                },
                method: 'GET'
            }).then(res => {


                if (res.data.code == 0) {
                    uni.setStorageSync('teachDetail', res.data.data)
                    uni.navigateTo({
                        url: '/pages/chat/chat?chatRoomListId=' + item.chatRoomListId
                    });
                }
            })



        },
        getDate(date) {
            if (!date) return ''
            date = Number(date)
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const target = new Date(date);
            const targetDay = new Date(target.getFullYear(), target.getMonth(), target.getDate());

            const diffTime = today - targetDay;
            const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

            // 格式化时分，补零
            const hours = target.getHours().toString().padStart(2, '0');
            const minutes = target.getMinutes().toString().padStart(2, '0');
            const timeStr = `${hours}:${minutes}`;

            if (diffDays === 0) {
                return timeStr;
            } else if (diffDays === 1) {
                return `昨天 ${timeStr}`;
            } else if (diffDays === 2) {
                return `前天 ${timeStr}`;
            } else {
                // 格式化年月日
                const year = target.getFullYear();
                const month = (target.getMonth() + 1).toString().padStart(2, '0');
                const day = target.getDate().toString().padStart(2, '0');
                return `${year}-${month}-${day} ${timeStr}`;
            }
        },
        getListFN() {
            if (this.pageNum == 'finsh') return
            let data = {
                pageNum: this.pageNum,
                pageSize: 100,
            }
            this.reqFN({
                url: '/calculate-api/api/secure/message/ChatList/client/queryMemberChatList',
                data,
                method: 'GET'
            }).then(res => {


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
        },
        // 
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

#news {
    margin-top: 170rpx;
    padding: 0;
    position: relative;

    .topBar {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
    }

    .fun {
        background: #fff6ee;
        position: sticky;
        top: 170rpx;
        // background: rgba(61, 44, 25, 0.6);
        padding: 30rpx 74rpx;
        // margin: 0 74rpx;
        margin-bottom: 30rpx;
        z-index: 7;
        border-radius: 30rpx;

        .child {
            position: relative;
            z-index: 2;

            image {
                height: 74rpx;
                width: 1rpx;
            }

            .dot {

                position: absolute;
                background: #f29202;

                border-radius: 50%;
                height: 38rpx;
                width: 38rpx;
                line-height: 38rpx;
                top: -10rpx;
                right: 40rpx;

            }

        }

        &::after {
            display: none;
        }

        &::before {
            height: calc(100% - 16rpx);
            width: calc(100% - 16rpx);
            top: 6rpx;
            left: 6rpx;
        }

        .angle {
            image {
                width: 40rpx;
            }
        }
    }

    .newList {
        padding: 0 20rpx;
        z-index: 2;
        position: relative;


        .child {
            margin-bottom: 20rpx;
            background: #fff;
            border-radius: 24rpx;
            padding: 20rpx;

            .dian {
                height: 30rpx;
                line-height: 30rpx;
                width: 30rpx;
                background: #F86464;

                border-radius: 50%;
            }

            image {
                width: 88rpx;
                height: 88rpx;
                border-radius: 50%;
                border: 2rpx solid #FFD390;
            }
        }
    }

    .noMore {
        image {

            height: 1rpx;
            width: 405rpx;
            margin: 5vh auto;
        }

    }
}
</style>