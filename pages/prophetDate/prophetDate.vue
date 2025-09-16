<!--
 * @Author: fujihang
 * @Date: 2025-01-24 12:13:56
 * @LastEditTime: 2025-04-04 16:27:33
 * @Description: 择日
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='prophetDate' class="c1 mtBg">
        <topBar :title="'问吉'" :showImg="true"></topBar>

        <view class="eventCon">
            <view class="title s23 c1">
                <text class="big fw s31">事项选择</text>
                选择你要问吉的具体事项
            </view>
            <view style="position: relative;z-index: 9;">
                <navTab :list="navList" @choose="chooseFN"></navTab>
            </view>
            <view class="cont flex">
                <view @click="choose2FN(index)"
                    :style="'background:' + (index == fChoose ? 'url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/prophet.png?x-oss-process=image/quality,Q_100)' : '#524b48;')"
                    :class="['child s23 c1 tc', index == fChoose && 'c3']" v-for="(item, index) in navList[choose].list"
                    :key="index">
                    {{ item.name }}
                </view>
            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
            <image class="bgGuang" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/bgGuang.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        </view>
        <!--  -->
        <view class="eventCon">
            <view class="title s23 c1">
                <text class="big fw s31">档案</text>
                选择问吉对象的档案
            </view>
            <view class="add tc" @click="showFN()" v-if="nowVal < needValue">
                <view class="img">
                    <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/add.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                </view>
                <view class="name ">选择档案</view>
                <image class="bgGuang" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/bgGuang.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
            <!--  -->
            <view class="listPeo s23 flex-a" v-for="(item, index) in choosePeo" :key="index">
                <view class="f1">
                    <view class="top flex-a">
                        <text class="name cf">{{ item.nickName }}</text>
                        <text class="sex">{{ item.sex ? '男' : '女' }}</text>
                        <text class="addr">{{ item.birthplace }}</text>
                    </view>
                    <view class="bom flex-a">
                        <view class="child">
                            阳历
                        </view>
                        <view class="child">
                            {{ item.birthday }}
                        </view>
                        <!-- <view class="child">
                            时辰未知
                        </view> -->
                    </view>
                </view>
                <image style="width:46rpx;height: 1rpx;margin-right: 13rpx;"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/timeChoose.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                <text class="s27 fw" @click="showFN(index)">
                    切换档案
                </text>

            </view>
            <!--  -->
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
            <image class="bgGuang" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/bgGuang.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        </view>
        <!--  -->
        <view class="eventCon">
            <view class="title s23 c1">
                <text class="big fw s31">时间范围</text>
                选择问吉的时间范围
            </view>
            <view class="time flex-a">
                <view class="child tc s27" @click="timeFN('start')">
                    <view class="big fw ">
                        {{ timeObj.start || '开始时间' }}
                    </view>
                    {{ timeObj.startT || '请选择开始时间' }}
                </view>
                <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/timeChoose.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                <view class="child tc s27" @click="timeFN('end')">
                    <view class="big fw ">
                        {{ timeObj.end || '结束时间' }}
                    </view>
                    {{ timeObj.endT || '请选择结束时间' }}
                </view>
            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
            <image class="bgGuang" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/bgGuang.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        </view>


        <!--  -->

        <view class="btnV flex-a jc fw c3" @click="okFN()">
            <view class="btn tc s38 ">问吉</view>
        </view>

        <!--  -->
        <view class="okDay tc" v-if="getCache">
            <!-- /Users/fujihang/Downloads/dayBg.png?x-oss-process=image/quality,Q_100 -->
            <view class="titleP s38">
                <text>适宜{{ navList[choose].list[fChoose].name }}的日子
                </text>
            </view>
            <view class="dateTime s31">{{ timeObj.start }} 至 {{ timeObj.end }}</view>
            <view class="flex-a jc">
                <image style="width: 98rpx;height: 1rpx;" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/suo.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
            <view class="s29" style="color: #5F5342;">解锁查看具体吉日</view>
            <view class="s23" style="color: #5F5342;margin-bottom: 11rpx;">专业老师帮你分析,生成具体吉时推荐</view>
            <view class="flex-a jc" style="margin-bottom: 21rpx;">
                <view class="btn tc s38 ">44铜币解锁</view>
            </view>
            <view class="s23" style="color: #5F5342;">(专业风水八字老师需要问卦,预计回复时间为1~2分钟)</view>


        </view>

        <!-- 时间选择器 -->
        <timeAlert :showPopup.sync="showObj.show" :title="showObj.title" @choose="timeTypeChoose">
            <picker-view :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view ">
                <picker-view-column>
                    <view class="itemPic" :style="'color:' + (year == item ? '#FFE8CE' : 'rgba(255,232,206,0.4)')"
                        v-for="(item, index) in years" :key="index">{{ item }}</view>
                </picker-view-column>
                <picker-view-column>
                    <view class="itemPic" :style="'color:' + (month == item ? '#FFE8CE' : 'rgba(255,232,206,0.4)')"
                        v-for="(item, index) in months" :key="index">{{ item }}</view>
                </picker-view-column>
                <picker-view-column>
                    <view class="itemPic" :style="'color:' + (day == item ? '#FFE8CE' : 'rgba(255,232,206,0.4)')"
                        v-for="(item, index) in days" :key="index">{{ item }}</view>
                </picker-view-column>
                <picker-view-column>
                    <view class="itemPic "
                        :style="'color:' + (time == item.value ? '#FFE8CE' : 'rgba(255,232,206,0.4)')"
                        v-for="(item, index) in times" :key="index">{{ item.value }}({{ item.name }})</view>
                </picker-view-column>
            </picker-view>

            <view @click="timeOkFN" style="padding: 38rpx 0;justify-content: center; " class="flex-a">
                <view class="btnOk tc s31 c3">
                    确认选择
                </view>
            </view>
        </timeAlert>

        <!--  -->
        <fuPopup2 :showPopup.sync="showObj2.show" :title="showObj2.title">
            <view style="padding: 0rpx 0 30rpx;justify-content: center; " class="flex-a">
                <view class="btnOk tc s31 c3" @click="toFN('/pages/editInfor/editInfor')">
                    新建档案
                </view>
            </view>
            <!--  -->
            <view style="padding: 0 53rpx;min-height: 30vh;">
                <view class="listPeo s23 flex-a" @click="peoFN(item)" v-for="(item, index) in peolist" :key="index">
                    <view class="f1">
                        <view class="top flex-a">
                            <text class="name cf">{{ item.nickName }}</text>
                            <text class="sex">{{ !item.sex ? '女' : '男' }}</text>
                            <text class="addr">{{ item.birthplace }}</text>
                        </view>
                        <view class="bom flex-a">
                            <view class="child">
                                阳历
                            </view>
                            <view class="child">
                                {{ item.birthday }}
                            </view>
                            <!-- <view class="child">
                                时辰未知
                            </view> -->
                        </view>
                    </view>
                    <view :class="['gou', choosePeo[item.memberArchiveId] && 'noBorder']">
                        <image v-if="choosePeo[item.memberArchiveId]" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/gou.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" />
                    </view>

                </view>
            </view>
            <!-- <view style="padding: 0rpx 0 30rpx;justify-content: center;position: relative;z-index: 2; "
                class="flex-a">
                <view class="btnOk2 tc s31 c3">
                    确认选择
                </view>
            </view> -->


        </fuPopup2>
    </view>
</template>

<script>
import navTab from '../../components/navTab.vue'
import timeAlert from '../../components/timeAlert.vue'
import fuPopup2 from '../../components/fuPopup2.vue'
import topBar from '../../components/topBar.vue'
import Vue from 'vue'

var { Solar, Lunar } = require('./lunar');
export default {
    components: {
        navTab, timeAlert, fuPopup2, topBar
    },
    data() {
        const date = new Date()
        const years = []
        const year = date.getFullYear()
        const months = []
        const month = date.getMonth() + 1
        const days = []
        const day = date.getDate()
        for (let i = date.getFullYear(); i <= date.getFullYear() + 11; i++) {
            years.push(i)
        }
        for (let i = 1; i <= 12; i++) {
            if (i < 10) {
                months.push('0' + i)

            } else {
                months.push(i)

            }
        }
        for (let i = 1; i <= 31; i++) {
            if (i < 10) {
                days.push('0' + i)
            } else {
                days.push(i)

            }
        }
        const times = [
            {
                name: '子',
                value: '23:00-00:00'
            },
            {
                name: '子',
                value: '00:00-01:00'
            },
            {
                name: '丑',
                value: '01:00-02:00'
            },
            {
                name: '丑',
                value: '02:00-03:00'
            },
            {
                name: '寅',
                value: '03:00-04:00'
            },
            {
                name: '寅',
                value: '04:00-05:00'
            },
            {
                name: '卯',
                value: '05:00-06:00'
            },
            {
                name: '卯',
                value: '06:00-07:00'
            },
            {
                name: '辰',
                value: '07:00-08:00'
            },
            {
                name: '辰',
                value: '08:00-09:00'
            },
            {
                name: '巳',
                value: '09:00-10:00'
            },
            {
                name: '巳',
                value: '10:00-11:00'
            },
            {
                name: '午',
                value: '11:00-12:00'
            },
            {
                name: '午',
                value: '12:00-13:00'
            },
            {
                name: '未',
                value: '13:00-14:00'
            },
            {
                name: '未',
                value: '14:00-15:00'
            },
            {
                name: '申',
                value: '15:00-16:00'
            },
            {
                name: '申',
                value: '16:00-17:00'
            },
            {
                name: '酉',
                value: '17:00-18:00'
            },
            {
                name: '酉',
                value: '18:00-19:00'
            },
            {
                name: '戌',
                value: '19:00-20:00'
            },
            {
                name: '戌',
                value: '20:00-21:00'
            },
            {
                name: '亥',
                value: '21:00-22:00'
            },
            {
                name: '亥',
                value: '22:00-23:00'
            }
        ]
        return {
            timeObj: {
                start: "",
                end: "",
                startT: "",
                endT: "",
            },
            showObj: {
                title: ' ',
                show: false,
            },
            showObj2: {
                title: '选择档案',
                show: false,
            },
            choose: 0,
            fChoose: 0,
            navList: [
                {
                    name: "常用",
                    list: [
                        {
                            name: '婚嫁',
                            type: 3,
                        },
                        {
                            name: '出行',
                            type: 11,
                        },
                        {
                            name: '搬迁',
                            type: 0,
                        },
                        {
                            name: '约会',
                            type: 32,
                        },
                        {
                            name: '聚会',
                            type: 32,
                        }, {
                            name: '开业',
                            type: 7,
                        },
                    ],
                    page: 1,
                    post: '',
                },
                {
                    name: "生活",
                    list: [
                        {
                            name: '置业',
                            type: 9,
                        },
                        {
                            name: '置家具',
                            type: 2,
                        },
                        {
                            name: '装修',
                            type: 1,
                        },
                        {
                            name: '游戏',
                            type: 29,
                        },
                        {
                            name: '减肥',
                            type: 6,
                        },
                        {
                            name: '医疗',
                            type: 35,
                        },
                        {
                            name: '搬迁',
                            type: 9,
                        },
                        {
                            name: '聚会',
                            type: 32,
                        },],
                    page: 1,
                    post: '',
                },
                {
                    name: "婚恋",
                    list: [
                        {
                            name: '领证',
                            type: 4,
                        },
                        {
                            name: '定亲',
                            type: 3,
                        },
                        {
                            name: '表白',
                            type: 3,
                        },
                        {
                            name: '婚嫁',
                            type: 4,
                        },
                        {
                            name: '约会',
                            type: 9,
                        },],
                    page: 1,
                    post: '',
                }, {
                    name: "事业",
                    list: [
                        {
                            name: '创业',
                            type: 8,
                        },
                        {
                            name: '汇报',
                            type: 6,
                        },
                        {
                            name: '离职',
                            type: 19,
                        },
                        {
                            name: '入职',
                            type: 33,
                        },
                        {
                            name: '面试',
                            type: 30,
                        },
                        {
                            name: '签约',
                            type: 16,
                        },
                        {
                            name: '交易',
                            type: 8,
                        },
                        {
                            name: '开业',
                            type: 7,
                        },],
                    page: 1,
                    post: '',
                },
            ],
            title: 'picker-view',
            years,
            year,
            months,
            month,
            days,
            day,
            times,
            time: '23:00-00:00',
            value: [0, month - 1, day - 1, 0],
            visible: true,
            indicatorStyle: `height: 50px;background:none`,
            peolist: [],
            choosePeo: {

            },
            needValue: 2,
            changeIndex: -1,
            getCache: '',
        }
    },


    onLoad() {

    },
    computed: {
        nowVal() {
            return Object.keys(this.choosePeo)
        },
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onShow() {
        console.log(this.year, '---');
        setTimeout(() => {
            console.log(this.year, '---');

        }, 10000)
        this.getListFN()
    },
    methods: {
        timeTypeChoose(index) {
            // console.log(index,'----', this.timeObj.start );

            if (index == 1) {
                let solar = Solar.fromYmd(this.year, this.month, this.day);
                let sss = solar.getLunar().toString()
                this.year = sss.split('年')[0]
                this.month = sss.split('年')[1].split('月')[0]
                this.day = sss.split('年')[1].split('月')[1]
            } else {
                let solar = Lunar.fromYmd(this.year, this.month, this.day);
                let sss = solar.getSolar().toString()
                this.year = sss.split('-')[0]
                this.month = sss.split('-')[1]
                this.day = sss.split('-')[2]
            }
            if(this.month<10&&!this.month.toString().includes('0')) this.month='0'+this.month
            if(this.day<10&&!this.day.toString().includes('0')) this.day='0'+this.day
      
            this.value = [
                this.years.findIndex(s => parseInt(s) == parseInt(this.year)),
                this.months.findIndex(s => parseInt(s) == parseInt(this.month)),
                this.days.findIndex(s => parseInt(s) == parseInt(this.day)),
                0
            ]
            console.log(this.month,'---',this.value);

            


        },
        timeOkFN() {
            if (this.showObj.type == 'start') {
                this.timeObj.start = this.year + '-' + this.month + '-' + this.day
                this.timeObj.startT = this.time
            } else {
                this.timeObj.end = this.year + '-' + this.month + '-' + this.day
                this.timeObj.endT = this.time
            }
            this.showObj.show = false
            this.getCache = ''
        },
        okFN() {
            if (Object.keys(this.choosePeo).length != this.needValue) return uni.showToast({
                title: '档案未选完',
                icon: 'none'
            })
            if (!this.timeObj.start || !this.timeObj.end) return uni.showToast({
                title: '时间未选完',
                icon: 'none'
            })
            this.reqFN({
                url: '/calculate-api/api/secure/community/home/auspiciousDay?future=3&incident=' + this.navList[this.choose].list[this.fChoose].type,
                data: {

                },
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.getCache = res.data.data
                    // this.peolist = res.data.data.list

                }
            })

        },
        peoFN(item) {
            if (this.changeIndex) Vue.delete(this.choosePeo, this.changeIndex)
            if (this.choosePeo[item.memberArchiveId]) Vue.delete(this.choosePeo, item.memberArchiveId)
            else this.$set(this.choosePeo, item.memberArchiveId, item)
            this.getCache = ''
            this.changeIndex = -1
            this.showObj2.show = false

        },
        toFN(url) {

            uni.navigateTo({
                url,
            });
        },
        showFN(index) {
            this.changeIndex = index

            this.showObj2.show = true
        },
        getListFN() {

            let data = {
                pageNum: 1,
                pageSize: 1000,
            }
            this.reqFN({
                url: '/calculate-api/api/secure/member/archive/pageByUserId',
                data,
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {

                    this.peolist = res.data.data.list

                }
            })
        },
        timeFN(type) {
            this.showObj.show = true
            this.showObj.type = type



        },
        bindChange: function (e) {



            const val = e.detail.value

            this.value = val
            this.year = this.years[val[0]]
            this.month = this.months[val[1]]
            this.day = this.days[val[2]]
            if (this.times[val[3]]) {
                this.time = this.times[val[3]].value

            }
            let dayNum = new Date(this.year, this.month, 0).getDate()
            let days = []
            for (let i = 1; i <= dayNum; i++) {
                if (i < 10) {
                    days.push('0' + i)
                } else days.push(i)

            }
            this.days = days



        },
        chooseFN({ item, index }) {
            if (index == 0 || index == 2) this.needValue = 2
            else this.needValue = 1
            this.choose = index
            this.fChoose = 0
            this.choosePeo = {}
            this.getCache = ''

        },
        choose2FN(index) {
            if ((this.choose == 0 && (index == 0 || index == 3)) || this.choose == 2) this.needValue = 2
            else this.needValue = 1
            this.fChoose = index
            this.getCache = ''

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

::v-deep .uni-picker-view-mask {
    background: none !important;
}

::v-deep .uni-picker-view-wrapper>:last-child {
    flex: 2;
}

#prophetDate {
    // background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    // background-size: 100% auto;
    height: 100vh;
    width: 100vw;

    .okDay {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/dayBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        margin: 0 21rpx;
        color: #30271D;
        height: 513rpx;

        .titleP {
            padding: 33rpx 0 32rpx;
            text-align: center;
            font-weight: bold;


            text {
                position: relative;

                &::before,
                &::after {
                    position: absolute;
                    top: 20rpx;
                    width: 106rpx;
                    height: 13rpx;
                    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/titleBg2.png?x-oss-process=image/quality,Q_100) no-repeat 100%;
                    content: ' ';
                }

                &::before {
                    left: -140rpx;
                    transform: rotateZ(180deg);

                }

                &::after {
                    right: -140rpx;
                }
            }

        }

        .btn {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btn2.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            line-height: 110rpx;
            width: 336rpx;
            height: 110rpx;
        }
    }

    .picker-view {
        width: 750rpx;
        height: 600rpx;
        margin-top: 20rpx;
    }

    .itemPic {
        background: none;
        line-height: 100rpx;
        text-align: center;
    }

    .eventCon {
        padding: 34rpx 28rpx;
        margin: 0 19rpx 20rpx;
        position: relative;
        background: #171B24;

        .bgGuang {
            position: absolute;
            top: 0;
            left: 0;
            height: 1rpx;
            width: 300rpx;
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

        .title {
            margin-bottom: 42rpx;

            .big {
                margin-right: 19rpx;
            }
        }

        .add {
            padding: 20rpx 0;
            border: 2rpx solid #C98F53;
            background: rgba(96, 69, 41, 0.4);
            position: relative;
            color: #FFE7C4;
            z-index: 2;

            .img {
                image {
                    height: 1rpx;
                    width: 76rpx;
                }
            }
        }

        .cont {
            flex-wrap: wrap;
            margin-top: 20rpx;
            z-index: 2;
            position: relative;

            .child {
                width: 114rpx;
                height: 42rpx;
                line-height: 42rpx;
                background-size: 100% auto;
                background-repeat: no-repeat;
                margin: 0 50rpx 34rpx 0;
            }
        }

        .time {
            image {
                height: 1rpx;
                width: 46rpx;
                margin: 0 23rpx;
            }

            .child {
                background: rgba(96, 69, 41, 0.4);
                padding: 30rpx 0 46rpx;
                width: 278rpx;
                border-radius: 0px 0px 0px 0px;
                border: 2rpx solid #C98F53;
                position: relative;
                z-index: 4;

                .big {
                    margin-top: 30rpx;
                }
            }
        }
    }

    .listPeo {
        padding: 23rpx 25rpx 15rpx;
        border: 2rpx solid #C98F53;
        background: rgba(201, 143, 83, .2);
        margin-bottom: 17rpx;
        position: relative;
        z-index: 2;

        .top {
            margin-bottom: 10rpx;

            .name {
                margin-right: 25rpx;
            }

            .sex {
                margin-right: 10rpx;

            }
        }

        .bom {
            .child {
                margin-right: 10rpx;
            }
        }

        .gou {
            width: 27rpx;
            height: 27rpx;
            border-radius: 4rpx 4rpx 4rpx 4rpx;
            border: 2rpx solid #FFD390;

            image {
                height: 1rpx;
                width: 30rpx;
            }
        }

        .noBorder {
            border: none;
        }
    }



    .btnV {
        // position: fixed;
        // bottom: 10vh;
        // left: 50%;
        // transform: translate(-50%);
        padding: 30rpx 0;

        image {
            height: 1rpx;
            width: 30rpx;
        }

        .btn {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            line-height: 110rpx;
            width: 336rpx;
            height: 110rpx;
        }
    }

    .btnOk {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        line-height: 84rpx;
        width: 245rpx;
        height: 84rpx;
    }

    .btnOk2 {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        line-height: 95rpx;
        width: 301rpx;
        height: 95rpx;
    }
}
</style>
