<!--
 * @Author: fujihang
 * @Date: 2025-01-19 22:42:11
 * @LastEditTime: 2025-06-15 13:45:39
 * @Description: 咨询
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='consult' class="mtBg">
        <view class="bgwf"></view>

        <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100"
            mode="widthFix" />
        <!--  -->
        <topBar title="咨询广场" :showImg="false"></topBar>

        <!--  -->
        <scroll-view :show-scrollbar="true" :scroll-with-animation="true" :scroll-x="true" class="navTapCom   s29"
            :scroll-into-view="'index' + choose">
            <view :class="['child tc c2 fw isMoreTab', choose == index ? 'choose' : 'chooseNot']"
                @click="chooseFN(item, index)" v-for="(item, index) in navList" :key="index" :id="'index' + index">

                <view class="img flex-a">
                    <image :src="item.topicCoverUrl + '?x-oss-process=image/quality,Q_100'" mode="aspectFit" />
                </view>

                <view class="s31 tc fw ">
                    {{ item.topicTitle }}
                </view>
                <!-- <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view> -->
            </view>

        </scroll-view>

        <!--  -->

        <view
            style="margin: -30rpx 20rpx 0;padding: 20rpx 0 2rpx; border-radius: 16rpx;background: linear-gradient(180deg, #FFE4AF 0.01%, #FFF 7.92%);">
            <view class="teacher c3" v-if="navList[choose]">
                <view class="list flex s27" v-for="(item, index) in navList[choose].list"
                    @click="toFN('/pages/teacher/teacher', item)" :key="index">
                    <image class="head" :src="item.icon + '?x-oss-process=image/quality,Q_100'" mode="aspectFill" />
                    <view class="f1  flex contant">
                        <view class="name s28" style="margin-bottom: 17rpx;">{{ item.nickName }}</view>
                        <view class="flex">
                            <view class="type ">
                                <text class="child s24" v-for="(itemc, indexc) in typeObj" :key="index">
                                    {{ itemc }}
                                    <text style="margin-left: 8rpx;" class=" fw">{{ item[indexc] || '无' }}</text>
                                </text>
                            </view>
                        </view>

                        <view class="det  tline">
                            {{ item.introduction }}
                        </view>
                        <!-- <view class="btnV flex-a fw">
                            <view class="f1 flex-a fw">
                                <image
                                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100"
                                    mode="widthFix" />
                                {{ item.consultPrice || 0 }}
                            </view>
                            <view class="btn tc c3" @click.stop="toFN('/pages/chat/chat', item)">免费咨询</view>

                        </view> -->
                        <view class="btnvPlay flex">
                            <view style="padding: 6rpx 10rpx; border-radius: 20rpx 0px 0px 0px;background: linear-gradient(180deg, #FFE4C5 0%, #FFE1B9 100%);" class="s22 c3">
                                服务价格：{{ item.consultPrice || 0 }}金币/次
                            </view>
                            <view class="cf " style="padding: 10rpx 10rpx;border-radius: 0px 0px 20rpx 0px;background:  linear-gradient(180deg, #88550F 0%, #B28850 100%);">免费咨询</view>
                        </view>

                    </view>
                    <!-- <view class="angle">
                        <image :class="'img' + item" :key="item" v-for="item in 4"
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" />
                    </view> -->
                </view>
                <view class="noMore" v-if="navList[choose].list.length == 0 && isLoadend">
                    <image
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/noMore.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view>

            </view>
        </view>
        <view style="height: 200rpx;"></view>

        <!--  -->
        <tabbar to="/pages/consult/consult"></tabbar>

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
            choose: 0,
            list: [],
            typeObj: {
                workYear: '从业年限',
                serviceNum: '服务人数',
                score: '评价',
            },
            navList: [

            ],
            isLoadend: false,
        }
    },
    onPullDownRefresh() {
        this.choose = 0
        this.list = [
        
        ]
        this.navList = [

        ]
        this.getData()
        setTimeout(() => {
            uni.stopPullDownRefresh();

        }, 1000);
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        this.getData()
    },
    methods: {
        toFN(url, item) {
            uni.setStorageSync('teachDetail', item)
            uni.navigateTo({
                url
            });
        },
        chooseFN(item, index) {

            
            this.choose = index
            this.navList[this.choose].pageNum=1
            this.getListFN()


        },
        getData() {
            this.reqFN({
                url: '/calculate-api/api/secure/community/topic/getDisplayList',
                data: {
                    topicType: 2,
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
           
                    this.getListFN()
                }
            })
        },
        getListFN() {
            if (this.navList[this.choose].pageNum == 'finsh') return
            this.isLoadend = false
            let data = {
                pageNum: this.navList[this.choose].pageNum,
                pageSize: 10,
            }

            if (this.navList[this.choose].topicId) data.topicId = this.navList[this.choose].topicId

            this.reqFN({
                url: '/calculate-api/api/secure/community/consult/pageConsult',
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

#consult {


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

    .teacher {
        position: relative;
        z-index: 3;


        .list {
            position: relative;
            margin: 0 19rpx 20rpx;
            padding: 20rpx 20rpx 70rpx;
            box-sizing: border-box;
            // height: 424rpx;
            // background: #171b24;
            background: #FFF8F1;
            border-radius: 20rpx;
            border: 2rpx solid #FFE8BB;
            background: #FFF3E7;
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

            .contant {
                flex-direction: column;
            }
        }

        .head {
            width: 160rpx;
            height: 182rpx;
            margin-right: 27rpx;
            border-radius: 16rpx;
        }

        .type {
            // justify-content: space-between;
            background: #3c2e1721;
       
            border-radius: 8rpx;
            margin-bottom: 20rpx;

            .child {
                padding: 0 10rpx;
                height: 40rpx;
                line-height: 44rpx;
                display: inline-block;
            }

            >:last-child {
                background: #FF9C5D;
                color: #fff;
                margin-left: 10rpx;
                padding: 0 16rpx;
                border-radius: 8rpx;
            }
        }

        .det {
            -webkit-line-clamp: 4;
            min-height: 100rpx;
        }
        .btnvPlay{
            position: absolute;
            bottom: 0;
            right: 0;
            align-items: flex-end;
        }
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