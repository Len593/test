<!--
 * @Author: fujihang
 * @Date: 2025-01-25 21:13:59
 * @LastEditTime: 2025-05-24 17:56:52
 * @Description: 宣传广场
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='square' class="c1 mtBg">
        <view class="bgwf"></view>

        <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100"
            mode="widthFix" />
        <topBar title="宣传广场" :showImg="false"></topBar>


        <!--  -->
        <scroll-view :show-scrollbar="true" :scroll-with-animation="true" :scroll-x="true" class="navTapCom s29"
            :scroll-into-view="'index' + choose">
            <view :class="['child  tc c2 fw isMoreTab ', choose == index ? 'choose' : 'chooseNot']"
                :id="'index' + index" @click="chooseFN(item, index)" v-for="(item, index) in navList" :key="index">
                <view class="img flex-a">
                    <image :src="item.topicCoverUrl + '?x-oss-process=image/quality,Q_100'" mode="aspectFit" />
                </view>

                <view class="s31 tc fw c1">
                    {{ item.topicTitle }}
                </view>
                <!-- <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                </view> -->
            </view>
        </scroll-view>

        <view
            style="margin: -30rpx 20rpx 0;padding: 20rpx 0 0; border-radius: 16rpx;background: linear-gradient(180deg, #FFE4AF 0.01%, #FFF 7.92%);">

            <!--  -->
            <view class="xsView flex-a" v-if="choose && teacher.length">
                <view style="padding-right: 10rpx;" @click="getTeacherFN(true)">
                    <view class="child tc">
                        <image
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                            mode="aspectFill" />
                        <view class="name s27 c1">全部</view>
                    </view>
                </view>

                <view class="line">
                </view>
                <scroll-view :show-scrollbar="false" :scroll-with-animation="true" :scroll-x="true" class="f1">
                    <view class="child tc" @click="toTeacherFN(item)" v-for="(item, index) in teacher" :key="index">
                        <image :class="'img' + item" :src="item.icon + '?x-oss-process=image/quality,Q_100'"
                            mode="aspectFill" />
                        <view class="name s27 c1">
                            {{ item.nickName }}
                        </view>
                    </view>
                </scroll-view>
            </view>
            <!--  -->
            <template v-if="navList[choose]">

                <view class="listChild c3" @click="toFN(item)" v-for="(item, index) in navList[choose].list"
                    :key="index">
                    <view class="name_head flex-a">
                        <image class="head" :src="item.icon + '?x-oss-process=image/quality,Q_100'" mode="aspectFill" />
                        <view class="f1">
                            <view class="name f1 s31 mb10">{{ item.nickName }}</view>
                            <view class="time s23" style="color: #936B4C;">{{ getTimeName(item.createTime) }}</view>
                        </view>

                        <!-- <image style="width: 54rpx;height: 1rpx;margin-left: 8rpx;" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/share.png?x-oss-process=image/quality,Q_100" mode="widthFix" /> -->
                    </view>
                    <view class="title s27 ">
                        {{ item.title }}
                    </view>
                    <view class="imgVideo flex-a" v-if="item.momentDetailList[0] && item.momentDetailList[0].videoUrl">
                        <view style="position: relative;">
                            <image style="width: 100%;height: 266rpx;"
                                :src="item.momentDetailList[0].videoUrl + '?x-oss-process=video/snapshot,t_10,f_jpg,m_fast'"
                                mode="heightFix" />
                            <image class="play"
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/play.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                        </view>

                    </view>
                    <view class="imgVideo flex-a" v-else>
                        <view class="imgCC" v-for="(itemc, indexc) in item.momentDetailList" v-if="indexc < 3"
                            :key="indexc">
                            <image :src="itemc.imgUrl + '?x-oss-process=image/quality,Q_100'" mode="aspectFill" />
                            <view class="num flex-a s28 cf" v-if="indexc == 2">
                                +{{ item.momentDetailList.length }}
                            </view>
                        </view>

                    </view>
                    <view class="fun flex-a s28">
                        <image src="@/static/imgs/zhang1.png" mode="widthFix" />
                        {{ item.likeCount }}
                        <view style="width: 40rpx;"></view>
                        <image src="@/static/imgs/newNum1.png" mode="widthFix" />
                        {{ item.commentCount }}
                    </view>
                    <!-- <view class="angle">
                        <image :class="'img' + item" :key="item" v-for="item in 4"
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" />
                    </view> -->
                </view>
            </template>
        </view>


        <view style="height: 200rpx;"></view>

        <fuPopup :showPopup.sync="showObj2.show" :title="showObj2.title">
            <view class="flex allXs">
                <view class="child tc s31 c1" v-for="(item, index) in teacherAll" :key="index">
                    <image :src="item.icon" mode="aspectFill" />
                    <view class="name">
                        {{ item.nickName }}
                    </view>
                </view>

            </view>



        </fuPopup>

        <!--  -->
        <tabbar to="/pages/square/square"></tabbar>

    </view>

</template>
<script>
import tabbar from '../../components/tabbar.vue'
import topBar from '../../components/topBar.vue'

import fuPopup from '../../components/fuPopup2.vue'
export default {
    components: {
        fuPopup, tabbar, topBar
    },
    data() {
        return {
            showObj2: {
                title: '全部选手',
                show: false,
            },
            choose: 0,
            navList: [

            ],
            teacher: [],
            teacherAll: [],
        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        this.getData()

    },
    onPullDownRefresh() {
        this.choose = 0
        this.navList = [

        ]
        this.getData()
        setTimeout(() => {
            uni.stopPullDownRefresh();

        }, 1000);
    },
    onShow() {
        if (uni.getStorageSync('isLikeHC') && this.navList[this.choose]) {
            this.navList[this.choose].list.forEach(el => {
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
            this.navList[this.choose].list.forEach(el => {
                if (el.momentId == uni.getStorageSync('square').momentId) {
                    el.commentCount = uni.getStorageSync('commentCount')
                    uni.removeStorageSync('commentCount')
                }
            });
        }
        let squareType = uni.getStorageSync('squareType')
        if (squareType) {
            this.choose = 0
            this.navList = [
            ]
            this.getData(squareType)
            uni.removeStorageSync('squareType')
        }
    },
    methods: {
        toTeacherFN(item) {
            uni.setStorageSync('teacher', { ...item, topicId: this.navList[this.choose].topicId })

            uni.navigateTo({
                url: '/pages/teacherDetail/teacherDetail'
            })
        },
        toFN(item) {
            uni.setStorageSync('square', item)
            uni.navigateTo({
                url: '/pages/squareDetail/squareDetail'
            })
        },
        chooseFN(item, index) {
            // if (index) {

            this.choose = index
            this.getListFN()
            // }

        },
        getTeacherFN(all) {
            let data = {
                pageNum: 1,
                pageSize: all ? 1000 : 10,

            }
            if (!this.choose) return
            // if( this.navList[this.choose].topicId!=0){
            data.topicId = this.navList[this.choose].topicId
            // }   
            this.reqFN({
                url: '/calculate-api/api/secure/community/topic/getTopicUserPage',
                data,
                method: 'GET'
            }).then(res => {
                console.log(res, '-----');

                if (res.data.code == 0) {
                    if (all) {
                        this.teacherAll = res.data.data.list
                        this.showObj2.show = true
                    } else {
                        this.teacher = res.data.data.list

                    }

                }
            })

        },
        getData(squareType) {
            this.reqFN({
                url: '/calculate-api/api/secure/community/topic/getDisplayList',
                data: {
                    topicType: 1,
                },
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.navList = res.data.data.map(s => {
                        return {
                            ...s,
                            pageNum: 1,
                            list: [],
                        }
                    })
                    if (squareType) {
                  
                    
                        setTimeout(() => {
                            let index = ''
                            switch (squareType) {
                                case "gf":
                                    index = this.navList.findIndex(s => s.topicTitle.includes('古法'))

                                    break;
                                case "gy":
                                    index = this.navList.findIndex(s => s.topicTitle.includes('公益'))

                                    break;
                                case "gx":
                                    index = this.navList.findIndex(s => s.topicTitle.includes('国学'))

                                    break;
                            }
                            this.chooseFN('', index)
                        }, 1)
                        return
                    }


                    // this.navList.unshift({
                    //     topicTitle: "全部",
                    //     topicId: 0,
                    //     pageNum: 1,
                    //     list: [],
                    // })
                    this.getListFN()
                }
            })
        },
        getListFN() {
            if (this.navList[this.choose].pageNum == 'finsh') return
            let data = {
                pageNum: this.navList[this.choose].pageNum,
                pageSize: 10,
                topicType: 1,
            }
            if (this.navList[this.choose].topicId) data.topicId = this.navList[this.choose].topicId
            this.reqFN({
                url: '/calculate-api/api/secure/community/moment/getPage',
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
                    this.getTeacherFN()
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
    overflow: auto;

    /* 或 auto */
}

#square {


    .xsView {
        margin-bottom: 10rpx;

        .child {
            width: 122rpx;
            display: inline-block !important;

            image {
                width: 82rpx;
                height: 82rpx;
                border-radius: 50%;
                border: 2rpx solid #FFE8CE;
                margin-bottom: 15rpx;
            }

            .name {
                overflow: hidden;
            }
        }

        .line {
            margin-top: -60rpx;
            height: 54rpx;
            width: 2rpx;
            background: #FFE8CE;
        }

        scroll-view {
            padding: 0 20rpx;
            // border-bottom: 1rpx solid #eee;
            overflow-y: hidden;
            overflow-x: scroll !important;
            white-space: nowrap;
        }
    }

    .allXs {
        flex-wrap: wrap;

        .child {
            width: 25%;
            margin-bottom: 20rpx;

            image {
                width: 82rpx;
                height: 82rpx;
                border-radius: 50%;
                margin-bottom: 10rpx;
                border: 2rpx solid #FFE8CE;

            }

            .name {
                overflow: hidden;
            }
        }
    }

    .navTapCom {
        padding: 0 20rpx;
        // border-bottom: 1rpx solid #eee;
        overflow-y: hidden;
        overflow-x: scroll !important;
        white-space: nowrap;
        position: relative;
        margin-bottom: 30rpx;
        height: 212rpx;

        .child {

            // text-align: center;
            // min-width: 158rpx;
            // background-size: 100% auto;
            // background-repeat: no-repeat;
            // width: 178rpx;
            // height: 127rpx;
            // line-height: 127rpx;
            position: relative;
            display: inline-block !important;
            transition: .3s;
            margin-right: 20rpx;

            .img {
                justify-content: center;
                height: 120rpx;
                width: 120rpx;
                border-radius: 32rpx;
                margin: 0 auto 10rpx;

                image {
                    height: 72rpx;
                    width: 72rpx;
                }
            }


            // &::before,
            // &::after {
            //     position: absolute;
            //     border: 1rpx solid rgba(226, 204, 192, 0.4);

            //     content: ' ';
            // }

            // &::before {
            //     height: calc(100% - 2rpx);
            //     width: calc(100% - 2rpx);
            //     top: 0;
            //     left: 0;

            // }

            // &::after {
            //     height: calc(100% - 10rpx);
            //     width: calc(100% - 10rpx);
            //     top: 4rpx;
            //     left: 4rpx;
            // }

        }

        .isMoreTab {
            min-width: 180rpx;
        }

        .choose {
            .img {
                border-radius: 28rpx;
                background: linear-gradient(90deg, #D3BA98 0%, #C58945 100%);
            }

            position: relative;

            &::after {
                position: absolute;
                content: ' ';
                bottom: -54rpx;
                left: 0;
                right: 0;
                margin: auto;
                width: 0;
                height: 0;
                border-left: 40rpx solid transparent;
                border-right: 40rpx solid transparent;
                border-bottom: 40rpx solid #FEE5B3;
            }
        }

        .chooseNot {
            color: #ffe7cb82;
            opacity: .7;
        }



    }

    .angle {
        image {
            position: absolute;
            height: 1rpx;
            width: 33rpx;
            z-index: 3;
        }

        .img1 {
            top: 0;
            left: 0;
        }

        .img2 {
            top: 0;
            right: 0;
            transform: rotateZ(90deg);
        }

        .img3 {
            bottom: 0;
            left: 0;
            transform: rotateZ(270deg);

        }

        .img4 {
            bottom: 0;
            right: 0;
            transform: rotateZ(180deg);

        }
    }

    .listChild {
        margin: 0 19rpx 34rpx;
        padding: 34rpx 32rpx;
        position: relative;
        border-radius: 20rpx;
        background: #FFF8F1;
        // &::before,
        // &::after {
        //     position: absolute;
        //     border: 1rpx solid rgba(226, 204, 192, 0.4);

        //     content: ' ';
        // }

        // &::before {
        //     height: calc(100% - 2rpx);
        //     width: calc(100% - 2rpx);
        //     top: 0;
        //     left: 0;

        // }

        // &::after {
        //     height: calc(100% - 10rpx);
        //     width: calc(100% - 10rpx);
        //     top: 4rpx;
        //     left: 4rpx;
        // }

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

            margin-bottom: 21rpx;

            .imgCC {
                width: 33%;
                height: 217rpx;
                margin: 0 0.15%;
                position: relative;

                .num {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    justify-content: center;
                    background: rgba($color: #000000, $alpha: .5);
                    border-radius: 20rpx;


                }

                image {
                    height: 100%;
                    width: 100%;
                    border-radius: 20rpx;
                }
            }

            image {
                border-radius: 20rpx;

            }

            .play {
                left: 50%;
                transform: translateX(-50%);
                position: absolute;
                top: 40%;
                // transform: translateY(-50%);
                height: 1rpx;
                width: 53rpx;
            }
        }

        .fun {
            justify-content: flex-end;

            image {
                height: 1rpx;
                width: 34rpx;
                margin-right: 10rpx;
            }
        }
    }
}
</style>