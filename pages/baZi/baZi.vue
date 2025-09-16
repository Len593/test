<!--
 * @Author: fujihang
 * @Date: 2025-02-23 10:24:56
 * @LastEditTime: 2025-03-13 23:01:34
 * @Description: 八字排盘
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id="baZi" class="mtBg">
        <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
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
            <view class="btnV flex-a jc c3" @click.stop="toFN('/pages/baZiPai/baZiPai')">
                <view class="btn tc s29 ">八字排盘</view>
            </view>

        </view>

        <view class="title c1 fw tc">
            {{ detail_desc }}
        </view>
        <view class="wuxin tc" style="color: rgba(255, 255, 255, .5);">
            您的五行特征
        </view>


        <view class="bagua" style="opacity: .7;">
            <qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
            <!-- <view class="child" :style="'background:' + item.color + ';z-index:' + index" v-for="(item, index) in bagua"
                :key="index">

            </view>
            <view class="zhu">

            </view> -->

        </view>

        <view class="bagua2 flex-a">
            <view class="child tc" :style="'color:' + item.color" v-for="(item, index) in bagua" :key="index">
                <view class="name s27">
                    <text class="big">{{ item.val }}</text>%
                </view>
                <image :src="item.img" mode="widthFix" />
                <view class="val">
                    {{ item.name }}
                </view>
            </view>
        </view>

        <!--  -->
        <view class="detail s27" style="color: rgba(255,255,255,0.5);">
            {{ simple_description }}
        </view>

        <!--  -->
        <!-- <view class="map">
            <view :class="['wg flex', index == 0 && 'notRigth', index == list.length - 1 && 'lastWg']"
                v-for="(item, index) in list" :key="index">
                <view class="name s23 ">
                    {{ item }}
                </view>
                <view class="f1 flex-a">
                    <view :class="['child', indexc == 0 && 'border']" v-for="(itemc, indexc) in listA" :key="itemc">
                        <view class="zu" v-if="index == list.length - 1">
                            <view class="bar"></view>
                            <view class="barAc s23 c1">
                                {{ itemc.name }}
                            </view>
                        </view>
                    </view>
                </view>
            </view>

        </view> -->


        <!-- <view class="mtBg cf nei s27">
            <view class="name s31 c1 fw" style="margin-bottom: 10rpx;">
                正印 ZHENG YIN
            </view>
            阿萨德卡苏卡达看来是
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
        </view> -->

        <!--  -->
        <view style="height: 300rpx;"></view>

        <view class="bg flex-a bgLine">
            <view class="list s27 c1 tc f1" @click="toFNa(item.to)" v-for="item in funList" :key="item.name">
                <image :src="item.img" mode="widthFix" />

                <view class="cf s29">
                    {{ item.name }}
                </view>
            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>


        <!--  -->
        <view class="popup" v-if="showPopup.show" @click="showPopup.show = false">
            <view class="content  tc c3" @click.stop="() => { }">
                <view class="f1" style="overflow: auto;">

                    <view class="title s46  " style="margin-bottom: 40rpx;">
                        {{ showPopup.title }}
                    </view>
                    <view class="title s27" style="margin-bottom: 30rpx;">
                        {{ showPopup.val }}
                    </view>
                </view>
                <view class="flex-a" style="justify-content: center;">
<!--                    <view class="btn tc c3" @click.stop="aaa">咨询</view>-->

                </view>
                <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                </view>

            </view>
        </view>
    </view>
</template>
<script>
import topBar from '../../components/topBar.vue'

export default {
    components:{
        
    },
    data() {
        return {
            funList: [
              
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
            chartData: {},
            //您可以通过修改 config-ucharts.js 文件中下标为 ['ring'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
            opts: {
                rotate: false,
                rotateLock: false,
                color: ["#C19F60", "#7AB49A", "#829DCE", "#DF554D", "#D3B8AB",],

                dataLabel: false,
                enableScroll: false,
                legend: {
                    show: false,
                    position: "right",
                    lineHeight: 25
                },
                title: {
                    name: "金",
                    fontSize: 60,
                    color: "#fff",
                    offsetY: -10,
                },
                subtitle: {
                    name: "",
                    fontSize: 25,
                    color: "#7cb5ec"
                },
                extra: {
                    ring: {
                        centerColor: '#16181b',
                        ringWidth: 40,
                        activeOpacity: 0.5,
                        activeRadius: 10,
                        offsetAngle: 0,
                        labelWidth: 15,
                        border: true,
                        borderWidth: 3,
                        borderColor: "none",

                    }
                }
            },
            bagua: [
                {
                    name: "金",
                    val: '',
                    color: '#C19F60',
                    data: "jin_score_percent",
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/jin.png?x-oss-process=image/quality,Q_100',

                },
                {
                    name: "木",
                    val: '',
                    data: "mu_score_percent",
                    color: '#7AB49A',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/mu.png?x-oss-process=image/quality,Q_100',
                },
                {
                    name: "水",
                    val: '',
                    data: "shui_score_percent",
                    color: '#829DCE',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/shui.png?x-oss-process=image/quality,Q_100',
                },
                {
                    name: "火",
                    val: '',
                    data: "huo_score_percent",
                    color: '#DF554D',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/huo.png?x-oss-process=image/quality,Q_100',
                },
                {
                    name: "土",
                    val: '',
                    data: "tu_score_percent",
                    color: '#D3B8AB',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/tu.png?x-oss-process=image/quality,Q_100',
                },
            ],
            list: [100, 80, 60, 40, 20, 0],
            listA: [
                {
                    name: "偏印",
                    value: '',
                    data: '',
                },
                {
                    name: "正印",
                    value: '',
                    data: '',
                },
                {
                    name: "比肩",
                    value: '',
                    data: '',
                },
                {
                    name: "劫财",
                    value: '',
                    data: '',
                },
                {
                    name: "食神",
                    value: '',
                    data: '',
                },
                {
                    name: "伤官",
                    value: '',
                    data: '',
                },
                {
                    name: "偏财",
                    value: '',
                    data: '',
                },
                {
                    name: "正财",
                    value: '',
                    data: '',
                },
                {
                    name: "七杀",
                    value: '',
                    data: '',
                },
                {
                    name: "正官",
                    value: '',
                    data: '',
                },
            ],
            canvasWidth: 300,  // 画布样式宽度
            canvasHeight: 300,  // 画布样式高度
            dataInfo: {},
            chartInfo: {},
            simple_description: "",
            detail_desc: "",
            showPopup: {
                title: '',
                val: "",
                show: false
            },
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {

        this.getInfor()
        this.getServerData()

    },
    onShow() {
        let myArchivers = uni.getStorageSync('myArchivers') || ''
        if (myArchivers) {
            this.dataInfo = myArchivers
            this.getData()
        }
    },
    methods: {
        toFNa(url) {
            if (url == 72) {
                this.showPopup = {
                    title: '72格局判断',
                    val: '暂未开通，敬请期待！',
                    // val: '格局是指八字呈现出来的整体状态，会对你的人生层次和方向进行高度凝练的总结。',
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
        backFN() {
            uni.navigateBack({ delta: 1 })
        },
        getServerData() {
            //模拟从服务器获取数据时的延时
            setTimeout(() => {
                //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接

            }, 500);
        },
        // 
        toFN(url) {
            console.log(url, '----');


            uni.redirectTo({
                url
            })


        },
        toAFN() {
            uni.setStorageSync('myArchivers', this.dataInfo)
            uni.navigateTo({
                url: '/pages/myArchives/myArchives?isChoose=true'
            })
        },
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
                console.log(res, '-----222');

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
                    this.dataInfo = res.data.data.list[0]
                    console.log(this.dataInfo, '-dataInfo---');

                    this.getData()
                }
            })


        },
        // 
        getData() {
            let date = new Date(this.dataInfo.birthday)
            this.reqFN({
                url: '/calculate-api/api/secure/community/home/preciseCalc',
                data: {
                    // city: '北京市',
                    day: date.getDay(),
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
                console.log(res, '-----dataat');

                if (res.data.code == 0) {
                    let { xiyongshen } = res.data.data.base_info
                    let { sizhu_info: { sizhu_indication } } = res.data.data.detail_info

                    this.bagua.forEach(s => {
                        s.val = xiyongshen[s.data].split('%')[0]
                    })

                    let kkk = {
                        series: [
                            {
                                data: this.bagua.map(s => {

                                    return {
                                        name: s.name,
                                        value: parseFloat(s.val),
                                    }
                                })
                            }
                        ]
                    };
                    this.opts.title.name = sizhu_indication.wuxing.simple_desc
                    this.simple_description = sizhu_indication.wuxing.simple_description
                    this.detail_desc = sizhu_indication.wuxing.detail_desc

                    this.chartData = JSON.parse(JSON.stringify(kkk));
                    this.chartInfo = res.data.data
                }

            })
        },

    },
}
</script>
<style lang="scss">
page {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    overflow: auto;
    height: 100%;
}

#baZi {
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

    .title {
        font-weight: 61rpx;
        margin: 0 0 20rpx;
        padding-top: 60rpx;
    }

    .wuxin {
        font-size: 27rpx;
    }

    .bagua {
        height: 537rpx;
        width: 537rpx;
        margin: 40rpx auto 0;
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/Vector.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        position: relative;



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

    .bagua2 {
        justify-content: center;

        .child {
            margin: 0 5rpx;

            .name {
                margin-bottom: -20rpx;
            }

            .val {
                margin-top: -30rpx;
                font-size: 46rpx;
            }

            .big {
                font-size: 36rpx;
            }

            image {
                height: 1rpx;
                width: 103rpx;
            }
        }

    }

    .detail {
        margin: 56rpx 56rpx 30rpx;
        line-height: 60rpx;
    }

    .map {
        margin-bottom: 90rpx;

        .wg {
            align-items: flex-end;

            .name {
                width: 50rpx;
                color: rgba(255, 211, 144, 0.42);
                margin-right: 10rpx;
                text-align: right;
                line-height: 4rpx;


            }

            .child {
                width: 64rpx;
                height: 64rpx;
                border-bottom: 2rpx dashed rgba(255, 255, 255, 0.3);
                border-right: 2rpx dashed rgba(255, 255, 255, 0.3);
                position: relative;

                .zu {
                    height: 320rpx;
                    width: 26rpx;
                    position: absolute;
                    left: 18rpx;
                    bottom: 0;
                    background: rgba(237, 228, 214, 0.4);

                    .bar {
                        width: 100%;
                        height: 100rpx;
                        border-radius: 50rpx 50rpx 0 0;
                        background: #B99867;
                        position: absolute;
                        bottom: 0;
                    }

                    .barAc {
                        position: absolute;
                        bottom: -70rpx;


                    }
                }
            }

            .border {
                border-left: 2rpx dashed rgba(255, 255, 255, 0.3);

            }

        }

        .notRigth {
            .child {
                border-left: none;

                border-right: none !important;

            }
        }
    }

    .nei {
        margin: 0 20rpx;
        position: relative;
        padding: 32rpx;
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
</style>