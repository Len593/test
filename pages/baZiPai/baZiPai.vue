<!--
 * @Author: fujihang
 * @Date: 2025-03-06 20:23:38
 * @LastEditTime: 2025-03-23 18:24:51
 * @Description: 八字排盘
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='baZiPai' class="mtBg">
        <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        <!-- <topBar :title="'八字排盘'" :showImg="true"></topBar> -->
        <view class="topBar flex-a">
            <view class="f1 flex-a" @click="backFN">
                <image class="back" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />

                <text @click.stop="toAFN('/pages/myArchives/myArchives')" class="cf"
                    style="font-size: 46rpx;margin: 0 10rpx 0 20rpx;">
                    {{ dataInfo.nickName || '暂无档案' }}
                </text>


                <image @click.stop="toAFN('/pages/myArchives/myArchives')" class="huan"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/timeChoose.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
            <!-- <view class="btnV flex-a jc c3" @click.stop="toFN('/pages/baZiPai/baZiPai')">
                <view class="btn tc s29 ">八字排盘</view>
            </view> -->

        </view>
        <template v-if="chartInfo">
            <view class="bz s27 cf tc">
                <view class="flex-a bor">
                    <view class="c1 s31 wdv">
                        新历
                    </view>
                    <view class="f1">{{ base_info.gongli }}</view>
                </view>
                <view class="flex-a bor">
                    <view class="c1 s31 wdv">
                        农历
                    </view>
                    <view class="f1">{{ base_info.nongli }}</view>
                </view>
                <view class="flex-a bor">
                    <view class="c1 s31 wdv ">
                        四柱
                    </view>
                    <view class="c1 s31 wdv f1" v-for="item in ['年柱', '月柱', '日柱', '时柱']" :key="item">
                        {{ item }}
                    </view>
                </view>
                <view class="flex-a bor">
                    <view class="c1 s31 wdv">
                        十神
                    </view>
                    <view class="f1">
                        {{ detail_info.zhuxing.year }}
                    </view>
                    <view class="f1">
                        {{ detail_info.zhuxing.month }}
                    </view>
                    <view class="f1">
                        {{ detail_info.zhuxing.day }}
                    </view>
                    <view class="f1">
                        {{ detail_info.zhuxing.hour }}
                    </view>
                </view>
                <view class="flex-a bor">
                    <view class="c1 s31 wdv">
                        副星
                    </view>

                    <view class="f1">
                        {{ detail_info.fuxing.year.join(',') }}
                    </view>
                    <view class="f1">
                        {{ detail_info.fuxing.month.join(',') }}
                    </view>
                    <view class="f1">
                        {{ detail_info.fuxing.day.join(',') }}
                    </view>
                    <view class="f1">
                        {{ detail_info.fuxing.hour.join(',') }}
                    </view>

                </view>
                <view class="flex-a bor">
                    <view class="c1 s31 wdv">
                        藏干
                    </view>
                    <view class="f1">
                        {{ detail_info.canggan.year.join(',') }}
                    </view>
                    <view class="f1">
                        {{ detail_info.canggan.month.join(',') }}
                    </view>
                    <view class="f1">
                        {{ detail_info.canggan.day.join(',') }}
                    </view>
                    <view class="f1">
                        {{ detail_info.canggan.hour.join(',') }}
                    </view>
                </view>
                <view class="flex-a bor">
                    <view class="c1 s31 wdv">
                        星运
                    </view>

                    <view class="f1">
                        {{ detail_info.xingyun.year }}
                    </view>
                    <view class="f1">
                        {{ detail_info.xingyun.month }}
                    </view>
                    <view class="f1">
                        {{ detail_info.xingyun.day }}
                    </view>
                    <view class="f1">
                        {{ detail_info.xingyun.hour }}
                    </view>
                </view>
                <view class="flex-a bor">
                    <view class="c1 s31 wdv">
                        纳音
                    </view>

                    <view class="f1">
                        {{ detail_info.nayin.year }}
                    </view>
                    <view class="f1">
                        {{ detail_info.nayin.month }}
                    </view>
                    <view class="f1">
                        {{ detail_info.nayin.day }}
                    </view>
                    <view class="f1">
                        {{ detail_info.nayin.hour }}
                    </view>
                </view>
                <view class="flex-a bor">
                    <view class="c1 s31 wdv">
                        自做
                    </view>

                    <view class="f1">
                        {{ detail_info.zizuo.year }}
                    </view>
                    <view class="f1">
                        {{ detail_info.zizuo.month }}
                    </view>
                    <view class="f1">
                        {{ detail_info.zizuo.day }}
                    </view>
                    <view class="f1">
                        {{ detail_info.zizuo.hour }}
                    </view>
                </view>

                <view class="flex-a bor">
                    <view class="c1 s31 wdv">
                        空亡
                    </view>
                    <view class="f1">
                        {{ detail_info.kongwang.year }}
                    </view>
                    <view class="f1">
                        {{ detail_info.kongwang.month }}
                    </view>
                    <view class="f1">
                        {{ detail_info.kongwang.day }}
                    </view>
                    <view class="f1">
                        {{ detail_info.kongwang.hour }}
                    </view>
                </view>
                <!-- <view class="flex bor" style="padding: 0;">
                <view class="left" style="width: 244rpx;">
                    <view>
                        喜用神: 木
                    </view>
                    <view style="border-top: 1rpx solid #5F5342;">
                        旺相休囚死
                        水木金土火
                    </view>
                </view>
                <view class=" flex-a" style="flex: 1;">
                    <view class="f1" style="height: 206rpx;line-height: 206rpx;"
                        v-for="item in ['四柱', '年柱', '月柱', '日柱']" :key="item">
                        {{ item }}
                    </view>
                </view>
            </view> -->
            </view>
            <!--  -->
            <view class="bz s27 cf tc ">
                <view class="title" style="background: rgba(201,143,83,0.24);padding: 27rpx 0;">出生后{{ base_info.qiyun }}
                </view>
                <view class="time flex-a">
                    <view class="child f1" v-for="(item, index) in dayun_info.big_start_year" v-if="index < 9">
                        <view class="top">
                            {{ item }}
                            </br>
                            {{ dayun_info.xu_sui[index] }}岁
                        </view>
                        <view class="bto s31 c1 fw">
                            {{ dayun_info.big_god[index] }}
                        </view>
                    </view>


                </view>
                <view class="time time1 flex-a">
                    <view class="child f1" v-for="(item, index) in dayun_info.big_start_year" v-if="index < 9">
                        <view class="top">
                            {{ item }}
                        </view>
                        <view class="bto s31 c1 fw">
                            {{ dayun_info.big_cs[index] }}
                        </view>
                    </view>

                </view>
                <view class="time time2 flex-a">
                    <view class="child f1" v-for="(item, index) in dayun_info.years_info0" v-if="index < 9">
                        <view class="top">
                            {{ index + 1 }}月
                        </view>
                        <view class="bto s31 c1 fw">
                            {{ item ? item.year_char : '无' }}
                        </view>
                    </view>

                </view>
            </view>
            <view style="height: 300rpx;"></view>

            <!--  -->
            <view class="bg flex-a bgLine">
                <view class="list s27 c1 tc f1" @click="toFN(item.to)" v-for="item in funList" :key="item.name">
                    <image :src="item.img" mode="widthFix" />

                    <view class="cf s29">
                        {{ item.name }}
                    </view>
                </view>
                <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                </view>
            </view>

            <!--  -->
            <view class="popup" v-if="showPopup.show" @click="showPopup.show = false">
                <view class="content  tc c3" @click.stop="() => { }">
                    <view class="f1" style="overflow: auto;">

                        <view class="title s46  " style="margin-bottom: 40rpx;padding-top: 34px;">
                            {{ showPopup.title }}
                        </view>
                        <view class="title s27" style="margin-bottom: 30rpx; padding-top: 34px;">
                            {{ showPopup.val }}
                        </view>
                    </view>
                    <view class="flex-a" style="justify-content: center;">
<!--                        <view class="btn tc c3" @click.stop="aaa">咨询</view>-->
                    </view>
                    <view class="angle">
                        <image :class="'img' + item" :key="item" v-for="item in 4"
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                    </view>

                </view>
            </view>
        </template>
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
            showPopup: {
                title: '',
                val: "",
                show: false
            },
            dataInfo: uni.getStorageSync('myArchivers') || '',
            funList: [
                {
                    name: "八字详解",
                    val: '',
                    to: '/pages/baZi/baZi',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/bzxj.png?x-oss-process=image/quality,Q_100',
                },
                {
                    name: "72格局判断",
                    val: '',
                    to: '72',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/gjpd.png?x-oss-process=image/quality,Q_100',

                },
                {
                    name: "用神详解",
                    val: '',
                    to: '用神',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/ysxj.png?x-oss-process=image/quality,Q_100',

                },
                {
                    name: "择日",
                    val: '',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/zeri.png?x-oss-process=image/quality,Q_100',
                    to: '/pages/prophetDate/prophetDate',
                },
            ],
            detail_info: {},
            base_info: {},
            dayun_info: {},
            chartInfo: ''
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        this.getInfor()

        uni.removeStorageSync('myArchivers')
    },
    onShow() {
        let myArchivers = uni.getStorageSync('myArchivers') || ''
        if (myArchivers) {
            this.dataInfo = myArchivers
            this.getData()
        }
    },
    methods: {
        // 
        getInfor() {
            this.reqFN({
                url: '/calculate-api/api/secure/member/archive/pageByUserId',
                data: {
                    pageNum: 1,
                    pageSize: 1000,
                },
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    if (!res.data.data.list[0]) {
                        uni.showToast({
                            title: '还没有个人资料',
                            icon: 'none'
                        })
                        setTimeout(() => {

                            uni.navigateTo({
                                url: '/pages/myArchives/myArchives?isChoose=true'
                            })
                        }, 1450)

                        return
                    }
                    if (!res.data.data.list) return
                    this.dataInfo = res.data.data.list[0]
                    this.getData()
                }
            })


        },
        toAFN() {
            uni.setStorageSync('myArchivers', this.dataInfo)
            uni.navigateTo({
                url: '/pages/myArchives/myArchives?isChoose=true'
            })
        },
        backFN() {
            uni.navigateBack({ delta: 1 })
        },
        aaa() {
            this.showPopup.show = false
            uni.showToast({
                title: '该功能暂未开放',
                icon: 'none',
                mask: true
            })
        },
        toFN(url) {
            if (url == 72) {
                this.showPopup = {
                    title: '72格局判断',
                    // val: '格局是指八字呈现出来的整体状态，会对你的人生层次和方向进行高度凝练的总结。',
                    val: '暂未开通，敬请期待！',
                    show: true
                }
            } else if (url == '用神') {
                this.showPopup = {
                    title: '用神详解',
                    val: '暂未开通，敬请期待！',
                    // val: '用神就是你喜欢的，对你有用的五行或干支，是对八字论断最核心的部分，弄清用神可以帮你判断运势吉凶、教你如何改善和调整命运。',
                    show: true
                }
            } else uni.navigateTo({ url })

            // if (!url) 

        },
        // 
        getData() {
            // console.log(this.dataInfo.birthday, '----birthday');
            let date = new Date(this.dataInfo.birthday)
            this.reqFN({
                url: '/calculate-api/api/secure/community/home/chart',
                data: {
                    // city: '北京市',
                    day: date.getDate(),
                    // factor: 0,
                    hours: date.getHours(),
                    minute: date.getMinutes(),
                    month: date.getMonth() + 1,
                    name: this.dataInfo.nickName,
                    // province: '北京',
                    // sect: 1,
                    sex: this.dataInfo.sex,
                    type: 1,
                    year: date.getFullYear(),
                    // zhen: 1,
                },
            }).then(res => {
                if (res.data.code == 0) {
                    this.chartInfo = res.data.data
                    this.base_info = res.data.data.base_info || {}
                    this.detail_info = res.data.data.detail_info || {}
                    this.dayun_info = res.data.data.dayun_info || {}
                }
                console.log(res)
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

#baZiPai {

    .topBar {
        padding: 75rpx 35rpx 55rpx;
        position: fixed;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 6;

        .huan {
            height: 1rpx;
            width: 46rpx;
        }

        .back {
            height: 1rpx;
            width: 34rpx;
            transform: rotateY(180deg);
        }

    }

    .bz {
        margin: 0 50rpx 50rpx;

        view {
            padding: 17rpx 0;
            border-right: 1rpx solid #5F5342;
        }

        border: 1rpx solid #5F5342;



        .bor {
            border: 1rpx solid #5F5342;
            border-right: none;
            border-left: none;


        }

        .bto,
        .top {
            border: none;
        }

        .flex-a {
            padding: 0;
            border-bottom: none;
        }


        .wdv {
            width: 107rpx;
        }

        .time,
        .title {
            border-right: none;

        }

        .time {
            :last-child {
                border-right: none;


            }

            .child {
                border-top: 1rpx solid #5F5342;
            }
        }

        .time1 {
            .bto {
                font-size: 27rpx;
            }
        }
    }

    .bg {
        position: fixed;
        bottom: 120rpx;
        left: 50rpx;
        padding: 10rpx 0 20rpx;
        width: calc(100% - 100rpx);

        image {
            height: 1rpx;
            width: 98rpx;
        }

        &::after {
            display: none;
        }

        .angle {
            image {
                position: absolute;
                height: 1rpx;
                width: 30rpx;
                z-index: 3;
            }

            .img1 {
                top: -9rpx;
                left: -9rpx;
            }

            .img2 {
                top: -9rpx;
                right: -9rpx;
                transform: rotateZ(90deg);
            }

            .img3 {
                bottom: -9rpx;
                left: -9rpx;
                transform: rotateZ(270deg);

            }

            .img4 {
                bottom: -9rpx;
                right: -9rpx;
                transform: rotateZ(180deg);

            }
        }
    }

    .popup {
        position: fixed;
        top: 0;
        left: 0;
        background: rgba(28, 17, 5, 0.8);
        backdrop-filter: blur(20rpx);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;

        .content {
            width: calc(100% - 240rpx);
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/baziAlert.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            // overflow: auto;
            padding: 70rpx 30rpx;
            display: flex;
            flex-direction: column;
            min-height: 684rpx;
            position: relative;

            .btn {
                background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
                background-size: 100% auto;
                line-height: 87rpx;
                width: 254rpx;
                height: 87rpx;
                position: relative;
                z-index: 2;
            }

            &::before,
            &::after {
                position: absolute;
                border: 2rpx solid rgba(212, 203, 200, .6);

                content: ' ';
            }

            &::before {
                height: calc(100% + 36rpx);
                width: calc(100% + 40rpx);
                top: -20rpx;
                left: -20rpx;

            }

            &::after {
                height: calc(100% + 28rpx);
                width: calc(100% + 32rpx);
                top: -16rpx;
                left: -16rpx;
            }

            .angle {
                image {
                    height: 54rpx;
                    width: 54rpx;

                }

                .img1 {
                    top: -20rpx;
                    left: -20rpx;
                }

                .img2 {
                    top: -20rpx;
                    right: -20rpx;
                }

                .img3 {
                    bottom: -20rpx;
                    left: -20rpx;
                }

                .img4 {
                    bottom: -20rpx;
                    right: -20rpx;
                }
            }
        }
    }

}
</style>