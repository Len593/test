<!--
 * @Author: fujihang
 * @Date: 2025-02-12 20:20:00
 * @LastEditTime: 2025-04-04 16:37:37
 * @Description: 老师详情
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='teacherDetail'>
        <topBar title="" :showImg="true"></topBar>
        <view class="logoVers tc ">
            <image :src="dataInfo.icon" mode="aspectFill" class="logo" />
            <view class="name fw flex-a jc">
                {{ dataInfo.nickName }}
            </view>
        </view>
        <view class="detail s30 c1">
            {{ dataInfo.introduction }}
        </view>
        <!--  -->
        <view class="top s40 c1 tc">
            相关视频
        </view>
        <!--  -->
        <view class="listChild" @click="toFN(item)" v-for="(item, index) in list" :key="index">
            <view class="name_head flex-a">
                <image class="head" :src="item.icon" mode="aspectFill" />
                <view class="name f1 s31 ">{{ item.nickName }}</view>
                <view class="time s23">{{ getTimeName(item.createTime) }}</view>
                <!-- <image style="width: 54rpx;height: 1rpx;margin-left: 8rpx;" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/share.png?x-oss-process=image/quality,Q_100" mode="widthFix" /> -->
            </view>
            <view class="title s27 cf">
                {{ item.title }}
            </view>
            <view class="imgVideo flex-a">
                <image class="img1" :src="itemc.imgUrl" mode="aspectFill"
                    v-for="(itemc, indexc) in item.momentDetailList" :key="indexc" />

                <image v-if="item.momentDetailList[0] && item.momentDetailList[0].videoUrl" class="play"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/play.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
            <view class="fun flex-a s23">
                <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/zhang.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                {{ item.likeCount }}
                <view style="width: 40rpx;"></view>
                <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/newNum.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                {{ item.commentCount }}
            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
        </view>

    </view>
</template>
<script>
export default {
    data() {
        return {
            pageNum: 1,
            list: [],
            dataInfo: {},
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        this.getData()
        this.reqFN({
            url: '/calculate-api/api/secure/member/getInfoById?id=' + uni.getStorageSync('teacher').userId,


        }).then(res => {
            console.log(res, '--2-');
            if (res.data.code == 0) {
                this.dataInfo = res.data.data
            }

        })
    },
    onShow() {
        console.log(this.pageNum, '---');
        if (uni.getStorageSync('isLikeHC')) {
            this.list.forEach(el => {
                if (el.momentId == uni.getStorageSync('square').momentId) {
                    if (uni.getStorageSync('isLikeHC') == 2) {
                        el.likeCount += 1
                    } else {
                        el.likeCount -= 1
                    }
                    uni.removeStorageSync('isLikeHC')
                }
            });
        }
        if (uni.getStorageSync('commentCount')) {
            this.list.forEach(el => {
                if (el.momentId == uni.getStorageSync('square').momentId) {
                    el.commentCount = uni.getStorageSync('commentCount')
                    uni.removeStorageSync('commentCount')
                }
            });
        }

    },
    methods: {
        toFN(item) {
            uni.setStorageSync('square', item)
            uni.navigateTo({
                url: '/pages/squareDetail/squareDetail'
            })
        },
        getData() {
            if (this.pageNum == 'finsh') return

            this.reqFN({
                url: '/calculate-api/api/secure/community/moment/getTopicUserVideoList',
                data: {
                    topicId: uni.getStorageSync('teacher').topicId,
                    userId: uni.getStorageSync('teacher').userId,
                    pageNum: this.pageNum,
                    pageSize: 1000
                },
                method: 'get'
            }).then(res => {
                if (res.data.code == 0) {
                    if (this.pageNum = 1) {
                        this.list = []
                    }
                    this.list = [...this.list, ...res.data.data.list]
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
#teacherDetail {
    .logoVers {
        padding: 107rpx 0 47rpx;
        color: #fff;

        .logo {
            width: 179rpx;
            height: 179rpx;
            border-radius: 50%;
            padding: 10rpx;
            border: 2rpx solid #FFD390;
            margin-bottom: 25rpx;

        }



        .name {
            margin-bottom: 21rpx;
            font-size: 46rpx;

        }
    }

    .listChild {
        position: relative;
        margin: 0 19rpx 34rpx;
        padding: 34rpx 32rpx;

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

        .name_head {
            margin-bottom: 21rpx;

            .head {
                width: 94rpx;
                height: 94rpx;
                border-radius: 50%;
                margin-right: 25rpx;
            }



        }

        .title {
            margin-bottom: 21rpx;

        }

        .imgVideo {
            justify-content: space-around;
            margin-bottom: 21rpx;

            .img1 {
                width: 207rpx;
                height: 217rpx;
            }

            .play {
                left: 50%;
                transform: translateX(-50%);
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                height: 1rpx;
                width: 53rpx;
            }
        }

        .fun {
            image {
                height: 1rpx;
                width: 26rpx;
                margin-right: 10rpx;
            }
        }
    }
}
</style>