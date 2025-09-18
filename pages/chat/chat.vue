<!--
 * @Author: fujihang
 * @Date: 2025-01-26 16:27:26
 * @LastEditTime: 2025-06-29 16:43:18
 * @Description: 聊天
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='chat' class=" s27">
        <topBar title="" :showImg="true"></topBar>


        <!--  -->
        <view class="bgsss flex">

            <scroll-view :scroll-with-animation="true" :scroll-into-view="scrollIntoView" refresher-background="none"
                :refresher-triggered="triggered" :refresher-enabled="true" @refresherrefresh="refresherrefresh"
                class="f1" scroll-y="true">
                <view class="teacher">
                    <view class="list flex s27">
                        <image class="head" :src="teachDetail.icon + '?x-oss-process=image/quality,Q_100'"
                            mode="aspectFill" />
                        <view class="f1 c1 flex contant">
                            <view class="name s31" style="margin-bottom: 17rpx;">{{ teachDetail.nickName }}</view>
                            <view class="type flex-a">
                                <view class="child tc" v-for="(item, index) in typeObj" :key="index">
                                    <view style="font-size: 40rpx;" class="fw">
                                        {{ teachDetail[index] || '无' }}
                                    </view>
                                    <view class="s23">
                                        {{ item }}

                                    </view>
                                </view>
                            </view>
                            <view class="det f1 cf">
                                {{ teachDetail.introduction || '无' }}

                            </view>
                        </view>
                        <view class="angle">
                            <image :class="'img' + item" :key="item" v-for="item in 4"
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                        </view>
                        <image class="bgGuang"
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/bgGuang.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" />
                    </view>

                    <!--  -->
                    <!--  -->
                    <view style="color: #999;" class="tc s23" v-if="!chatList.length">
                        暂无历史消息
                    </view>
                    <view style="color: #999;" class="tc s23" v-if="pageNum == 'finsh'">
                        没有更多历史消息了
                    </view>
                    <view class="chatList" v-for="(item, index) in chatList" :key="index">
                        <view class="tc s23 c1" style="padding: 10rpx 0;" v-if="index % 10 == 0">{{
                            getDate(item.sentTime) }}
                        </view>
                        <view :class="['child flex', targetMemberId != item.senderUserId && 'child2']">
                            <image v-if="targetMemberId == item.senderUserId" class="head"
                                :src="teachDetail.icon + '?x-oss-process=image/quality,Q_100'" mode="aspectFill" />

                            <view class="content cf s27" v-if="item.messageType != 5">

                                <view v-html="item.text" v-if="item.messageType == 2 || item.messageType == 0">

                                </view>
                                <image v-else-if="item.messageType == 4" @click="bigImgFN(item.remote)" class="textImg"
                                    :src="item.remote + '?x-oss-process=image/quality,Q_100'" mode="widthFix" />
                                <view v-else-if="item.messageType == 3" class="luyin flex-a"
                                    @click="playAuFN(item.remote, index)">
                                    <view class="flex-a f1">
                                        {{ playIndex == index ? '播放中' : '播放' }}
                                        <image
                                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/laba.png?x-oss-process=image/quality,Q_100"
                                            mode="widthFix" />
                                    </view>
                                    <view>
                                        {{ item.duration }}s
                                    </view>
                                </view>

                                <view class="angle" v-if="item.messageType != 3">
                                    <image :class="'img' + item" :key="item" v-for="item in 4"
                                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                                        mode="widthFix" />
                                </view>
                                <text v-if="targetMemberId != item.senderUserId" class="tip cf s21"
                                    :style="targetMemberId != item.senderUserId ? 'left:-25px' : 'right:-55rpx'">{{
                                        item.readState
                                            ? '已读' : '未读' }}</text>
                            </view>

                            <template v-else-if="item.messageType == 5">
                                <view class="funList" style="width: 500rpx;" v-if="getServer(item.chatTargetId)">

                                    <view class="list flex s27 " :key="index">

                                        <view class="f1 c1 flex contant">
                                            <view class="name s31" style="margin-bottom: 17rpx;">{{
                                                getServer(item.chatTargetId).consultTitle }}
                                            </view>

                                            <view class="det f1 cf">
                                                {{ getServer(item.chatTargetId).consultIntroduce }}
                                            </view>
                                            <view class="btnV flex-a fw">
                                                <view class="f1 flex-a fw">
                                                    <image
                                                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100"
                                                        mode="widthFix" />{{ getServer(item.chatTargetId).consultPrice
                                                        }}
                                                    <view class="fee s27 "
                                                        v-if="getServer(item.chatTargetId).discountRate > 0">{{
                                                            getServer(item.chatTargetId).discountRate }}%折扣
                                                    </view>
                                                </view>
                                                <view class="btn tc c3" @click="fuWuFn(getServer(item.chatTargetId))">
                                                    服务下单</view>

                                            </view>

                                        </view>

                                    </view>

                                </view>



                            </template>
                            <image v-if="targetMemberId != item.senderUserId" class="head head2"
                                :src="userInfo.icon + '?x-oss-process=image/quality,Q_100'" mode="aspectFill" />

                        </view>
                    </view>
                    <!--  -->
                </view>
                <view :style="'font-family:' + (fontfamily)" id="scrollIntoView" style="height: 100rpx;"></view>

            </scroll-view>

            <!--  -->
            <view :class="['funBtn', showFu && 'showFu']">
                <view style="padding: 0 32rpx 36rpx;">
                    <view class="btn tc c3" @click="showAlert = true">服务下单</view>
                </view>
                <view class="bg">

                    <view class="inputSend flex-a">
                        <view class="img s31 c1 tc">
                            <image
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/recording.png?x-oss-process=image/quality,Q_100"
                                v-if="!voicePath" mode="widthFix" @click="showInput = !showInput" />
                            <text @click="cancalFN" v-else>
                                取消
                            </text>
                        </view>

                        <view class="f1 input flex-a">
                            <input v-model="inputVal" class="c1" v-if="showInput"
                                style="width: 100%;position: relative;z-index: 9;" type="text" placeholder="请输入" />
                            <view v-else class="luyin jc s27 c3 flex-a" @touchstart.stop="touchstartFN">
                                <template v-if="!touch && !voicePath">
                                    长按对话
                                </template>
                                <template v-else-if="touch || voicePath">
                                    <view class="flex-a" v-if="voicePath" @touchstart.stop="" @touchend.stop=""
                                        @click.stop="playFN">
                                        播放
                                        <image
                                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/laba.png?x-oss-process=image/quality,Q_100"
                                            mode="widthFix" />
                                    </view>
                                    <view class="f1" @longpress="() => { }" v-if="touch || voicePath"
                                        style="text-align: right;" @touchstart.stop="() => { }"
                                        @touchend.stop="() => { }" @click.stop="playFN">
                                        {{ time }}s
                                    </view>
                                </template>

                            </view>
                            <view class="angle">
                                <image :class="'img' + item" :key="item" v-for="item in 4"
                                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                                    mode="widthFix" />
                            </view>
                        </view>
                        <!-- 右边按钮 -->
                        <view class="img s31 c1 tc">
                            <text v-if="touch && !voicePath" @click.stop="touchendFN">
                                结束
                            </text>
                            <image
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/add.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" v-else-if="!voicePath && !inputVal" @click="showFu = !showFu" />
                            <text v-else @click="sendFN">
                                发送
                            </text>
                        </view>
                    </view>
                    <!--  -->
                    <view class="funlist flex-a">
                        <view class="child tc" @click="funFn('album')">
                            <image style="margin-bottom: 5rpx;"
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/imgCont.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                            <view class="s29 cf">
                                照片
                            </view>
                        </view>
                        <view class="child tc" @click="funFn('camera')">
                            <image style="margin-bottom: 5rpx;"
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/crame.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                            <view class="s29 cf">
                                拍照
                            </view>
                        </view>
                        <view class="child tc" @click="funFn('rewardTea')">
                            <image style="margin-bottom: 5rpx;" src="/static/rewardTea.jpg" mode="widthFix" />
                            <view class="s29 cf">
                                打赏
                            </view>
                        </view>

                    </view>
                </view>

            </view>
        </view>

        <!--  -->

        <!-- 弹窗 -->
        <fuPopup2 :showPopup.sync="showAlert" :title="'评论回复'">

            <view class="alert" style="padding: 0 70rpx;">
                <navTab :list="navList" @choose="chooseFN"></navTab>
            </view>
            <view class="funList" v-if="choose < 2">

                <view class="list flex s27 bgLine" v-for="(item, index) in navList[choose].list" :key="index">

                    <view class="f1 c1 flex contant">
                        <view class="name s31" style="margin-bottom: 17rpx;">{{ item.consultTitle }}</view>

                        <view class="det f1 cf">
                            {{ item.consultIntroduce }}
                        </view>
                        <view class="btnV flex-a fw">
                            <view class="f1 flex-a fw">
                                <image
                                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100"
                                    mode="widthFix" />{{ item.consultPrice }}
                                <view class="fee s27 " v-if="item.discountRate > 0">{{ item.discountRate }}%折扣
                                </view>
                            </view>
                            <view class="btn tc c3" @click="fuWuFn(item)">服务下单</view>

                        </view>

                    </view>
                    <view class="angle">
                        <image :class="'img' + item" :key="item" v-for="item in 4"
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" />
                    </view>
                </view>
            </view>


            <!--  -->



        </fuPopup2>


        <!--  -->
        <!--  -->
        <!-- 弹窗 -->
        <fuPopup2 :showPopup.sync="showObj.show" :title="showObj.title">

            <!--  -->
            <template v-if="showObj.type == 'zf'">

                <view class="funList">
                    <view class="list flex s27 bgLine" style="min-height: 100rpx;">
                        <view class="f1 c1 flex contant">
                            <view class="name s31" style="margin-bottom: 17rpx;">{{ showDetail.consultTitle }}</view>
                            <view class="det f1 cf">
                                {{ showDetail.consultIntroduce }}
                            </view>

                        </view>
                        <view class="angle">
                            <image :class="'img' + item" :key="item" v-for="item in 4"
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                        </view>
                    </view>
                </view>
                <view class="coupon flex-a s27 c1 bgLine" @click="toCouponFN">
                    <text class="f1">优惠券</text>
                    <text style="color: #FFEAD4;">{{ couponDetail.discountRate ? couponDetail.discountRate + '%折扣' :
                        '暂无可用优惠'
                        }}</text>
                    <view class="angle">
                        <image :class="'img' + item" :key="item" v-for="item in 4"
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" />
                    </view>
                </view>

                <view class="btnCV flex-a fw c1 s27">
                    <view class="f1 flex-a fw">
                        <image
                            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100"
                            mode="widthFix" />
                        {{ toFix(showDetail.consultPrice * (100 - (couponDetail.discountRate || 0)) / 100) }}
                    </view>
                    <view class="btn tc c3" @click="showPaymentOptions()">立即支付</view>

                </view>
            </template>
            <!--  -->



        </fuPopup2>

        <!-- 支付方式选择弹窗 -->
        <fuPopup2 :showPopup.sync="paymentMethodPopup.show" :title="paymentMethodPopup.title">
            <view class="payment-methods">
                <view class="payment-option" @click="selectPaymentMethod('wallet')">
                    <view class="option-content">
                        <image class="option-icon" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                        <view class="option-text">
                            <view class="option-title">钱包支付</view>
                            <view class="option-desc" v-if="WalletBalance >= showDetail.consultPrice">使用账户余额支付</view>
                            <view class="option-desc insufficient-balance" v-else>余额不足，点击充值</view>
                        </view>
                    </view>
                    <image class="option-arrow" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                </view>
                
                <view class="payment-option" @click="selectPaymentMethod('direct')">
                    <view class="option-content">
                        <image class="option-icon" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                        <view class="option-text">
                            <view class="option-title">在线支付</view>
                            <view class="option-desc">支持多种支付方式</view>
                        </view>
                    </view>
                    <image class="option-arrow" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                </view>
            </view>
        </fuPopup2>

        <fuPopup :showPopup.sync="showObj2.show" title="打赏" @sureFN="getRewardTokenFN">
            <input type="number" class="s32 c3" placeholder="请输入打赏金额" v-model="showObj2.num"
                style="background: rgb(233, 233, 233); margin: 20rpx;padding: 0 20rpx; border-radius: 60rpx;height: 68rpx;line-height: 68rpx;" />
        </fuPopup>
        <!--  -->
        <view style="opacity: 0;width: 1rpx;height: 1rpx;overflow: hidden;">{{ newList }}</view>
    </view>
</template>
<script>
const recorderManager = uni.getRecorderManager();
const innerAudioContext = uni.createInnerAudioContext();
innerAudioContext.autoplay = true;
innerAudioContext.volume = 1
import fuPopup2 from '../../components/fuPopup2.vue'
import fuPopup from '../../components/fuPopup.vue'
import navTab from '../../components/navTab.vue'

import permision from "@/js_sdk/wa-permission/permission.js"
import topBar from '../../components/topBar.vue'
export default {
    components: {
        topBar, fuPopup2, navTab, fuPopup
    },
    data() {
        return {
            showObj2: {
                show: false,
                num: '',

            },
            userInfo: uni.getStorageSync('userInfo'),
            typeObj: {
                workYear: '从业年限',
                serviceNum: '服务人数',
                score: '评价',
            },
            voicePath: '',
            touch: false,
            time: 0,
            interFN: '',
            showFu: false,
            showInput: true,
            inputVal: "",
            playIndex: -1,
            targetMemberId: '',
            chatList: [],//消息列表
            triggered: false,
            pageNum: 1,
            chatRoomListId: '',
            scrollIntoView: 'scrollIntoView',
            hasObj: {},//过滤重复数据
            showAlert: false,
            showObj: {
                // title: '评论回复',
                // show: false,
                // type: "pl",
                title: '支付订单',
                show: false,
                type: "zf",
            },
            showDetail: {},
            couponDetail: {},
            navList: [
                {
                    name: "咨询分析",
                    list: [],
                    pageNum: 1,
                    post: '',
                },
                {
                    name: "解决方案",
                    list: [],
                    pageNum: 1,
                    post: '',
                },

            ],
            choose: 0,
            teachDetail: {},
            readIntFN: "",
            chatLimit: '',
            chatTimeout: '',
            cloudUserId: "",
            OrderToken: "",
            WalletBalance: 0,
            paymentMethodPopup: {
                show: false,
                title: '选择支付方式'
            }

        }
    },
    onUnload() {
        clearInterval(this.readIntFN)
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
        newList() {
            let delObj = {
                senderUserIds: {},
                sentTimes: {},
            }
            this.$store.state.newList.forEach(s => {

                if (s.message.senderUserId == this.cloudUserId) {
                    console.log(s.message, '---messa1ge--');

                    s.message.senderUserId = this.targetMemberId

                    delObj.senderUserIds[s.message.senderUserId] = true
                    delObj.sentTimes[s.message.sentTime + ''] = true
                    if (!this.hasObj[s.message.sentTime + '']) {
                        clearInterval(this.readIntFN)
                        this.setReadFN()
                        this.readIntFN = setInterval(() => {
                            this.getReadFN()
                            this.setReadFN()
                        }, 2000)

                        if (s.message.text && s.message.text.includes('chatTargetId=')) {
                            s.message.messageType = 5
                            s.message.chatTargetId = s.message.text.split('chatTargetId=')[1]

                        }
                        console.log(s.message.text, '---s.message.text');

                        if (s.message.text && s.message.text.includes('已赠送')) this.getUserChatPermissionFN()
                        this.chatList.push(s.message)
                        for (let i = this.chatList.length - 1; i >= 0; i--) {
                            this.chatList[i].readState = true
                        }
                        this.hasObj[s.message.sentTime + ''] = true
                    }
                }
            })
            this.gunFN()
            this.$store.commit('delNewFN', delObj)
            return this.$store.state.newList
        }
    },
    onShow() {
        if (uni.getStorageSync('coupon')) {
            this.couponDetail = uni.getStorageSync('coupon')
            if (this.couponDetail.minOrderAmount < this.showDetail.consultPrice) {
                this.couponDetail = {}
            }

        }
        this.getWalletBalanceFN()
    },
    async onLoad(options) {
        this.teachDetail = uni.getStorageSync('teachDetail')
        this.targetMemberId = this.teachDetail.userId
        this.getMemberCloudByUserIdFN()

        if (options.chatRoomListId) {
            this.chatRoomListId = options.chatRoomListId
            setTimeout(() => {
                this.getHistory()

            }, 200)
        } else {
            this.getRoomIdFN()
        }

        this.getListFN()
        this.getUserChatPermissionFN(true)
        uni.getSystemInfo({
            success: async (res) => {
                let isRecord
                if (res.osName == 'ios') {
                    isRecord = await permision.judgeIosPermission('record')
                    if (!isRecord) {
                        uni.showModal({
                            title: '提示',
                            content: '未获取到麦克风权限，可能导致应用运行出现问题',
                            confirmText: '去开启',
                            cancelText: "暂不开启",
                            success: res => {
                                if (res.confirm) {
                                    // 跳转权限页面
                                    permision.gotoAppPermissionSetting()
                                }
                            }
                        })
                    }
                } else if (res.osName == 'android') {
                    isRecord = await permision.requestAndroidPermission('android.permission.RECORD_AUDIO')
                    if (isRecord != 1) {
                        uni.showModal({
                            title: '提示',
                            content: '未获取到麦克风权限，可能导致应用运行出现问题',
                            confirmText: '去开启',
                            cancelText: "暂不开启",
                            success: res => {
                                if (res.confirm) {
                                    // 跳转权限页面
                                    permision.gotoAppPermissionSetting()
                                }
                            }
                        })
                    }
                }
            }
        })





        let self = this;
        recorderManager.onStop(function (res) {
            console.log('recorder stop' + JSON.stringify(res));
            self.voicePath = res.tempFilePath;
        });
        recorderManager.onError(err => {
            console.log(err, '----err');

        })
        innerAudioContext.onEnded(res => {

            this.playIndex = -1
        })

        // 
        this.setReadFN()
        this.readIntFN = setInterval(() => {
            this.getReadFN()
            this.setReadFN()
        }, 2000)


    },
    methods: {
        toFN(url) {
            console.log(url,'---2232');
            
            uni.navigateTo({ url })
        },
        getWalletBalanceFN() {
            this.reqFN({
                url: '/calculate-api/api/secure/oms/wallet/getWalletBalance',
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.WalletBalance = res.data.data.totalBalance
                }
            })
        },
        getOrderTokenFN() {
            uni.showLoading({
                title: '支付中...'
            });
            this.reqFN({
                url: `/calculate-api/api/secure/oms/order/getOrderToken?serviceId=` + this.showDetail.userConsultServiceId,
                data: {
                },
                method: 'GET',
            }).then(res => {
                if (res.data.code == 0) {
                    this.reqFN({
                        url: `/calculate-api/api/secure/oms/order/create`,
                        data: {
                            "actualCopperAmount": this.toFix(this.showDetail.consultPrice * (100 - (this.couponDetail.discountRate || 0)) / 100),
                            "orderDetail": {
                                "serviceId": this.showDetail.userConsultServiceId || this.showDetail.systemConsultServiceId,
                                "serviceType": ['', 'analyse', 'solution'][this.showDetail.serviceType],
                                "serviceUserId": this.targetMemberId
                            },
                            "totalCopperAmount": this.showDetail.consultPrice,
                            "userId": uni.getStorageSync('userId'),
                            couponId: this.couponDetail.couponsId || '',
                            orderToken: res.data.data,

                        },
                        method: 'POST',
                    }).then(res => {
                        uni.hideLoading()
                        this.getWalletBalanceFN()

                        if (res.data.code == 0) {
                            uni.showToast({
                                title: '支付成功',
                                icon: 'none'
                            })
                            this.showAlert = false
                            this.showObj.show = false
                            this.showObj2.show = false
                            this.getUserChatPermissionFN()

                        } else this.showToast({
                            title: '支付订单失败',
                            icon: 'none'
                        })
                    })
                } else uni.hideLoading()
            })
        },
        getMemberCloudByUserIdFN() {
            if(!this.targetMemberId) return
            this.reqFN({
                url: `/calculate-api/api/secure/member/getMemberCloudByUserId?userId=` + this.targetMemberId,
                data: {

                },
                method: 'GET',

            }).then(res => {


                if (res.data.code == 0) {
                    this.cloudUserId = res.data.data.cloudUserId

                }
            })
        },
        getServer(chatTargetId) {


            return this.navList[0].list.filter(s => s.userConsultServiceId == chatTargetId)[0] || this.navList[1].list.filter(s => s.userConsultServiceId == chatTargetId)[0]
        },
        // 

        getRewardTokenFN() {

            this.reqFN({
                url: `/calculate-api/api/secure/oms/order/getRewardToken?teacherId=` + this.teachDetail.userId,
                data: {

                },
                method: 'GET',

            }).then(res => {

                if (res.data.code == 0) {

                    this.reqFN({
                        url: `/calculate-api/api/secure/oms/order/reward`,
                        data: {
                            rewardToken: res.data.data,
                            rewardAmount: this.showObj2.num,
                            teacherId: this.teachDetail.userId,
                        },

                    }).then(resc => {
                        if (resc.data.code == 0) {


                            this.addChatFN({
                                chatMessageType: 2,
                                chatText: resc.data.data,
                                sentTime: new Date().getTime(),
                            })
                        }
                    })
                }
                this.showObj2.show = false
            })
        },

        // 
        getUserChatPermissionFN(isOnLoad) {


            this.reqFN({
                url: `/calculate-api/api/secure/message/PersonalChat/getUserChatPermission`,
                data: {

                },
                method: 'GET',

            }).then(res => {

                if (res.data.code == 0) {
                    this.chatLimit = res.data.data.chatLimit
                    this.chatTimeout = res.data.data.chatTimeout
                    if (uni.getStorageSync('solveSign') && isOnLoad) { //抽签
                        setTimeout(() => {


                            let arrSS = uni.getStorageSync('solveSign').description

                            arrSS = JSON.stringify(arrSS).replace(/\{|\}|'|"/g, '').replace(/,/g, '\n')
                            this.inputVal = arrSS
                            uni.removeStorageSync('solveSign')
                            this.sendFN()
                        }, 1000)
                    }

                }


            })
        },
        setReadFN() {
            if (!this.chatRoomListId || (this.teachDetail && !this.teachDetail.userId)) return
            this.reqFN({
                url: `/calculate-api/api/secure/message/PersonalChat/client/readChat?chatRoomListId=${this.chatRoomListId}&readMemberId=` + this.teachDetail.userId,
                data: {

                },
                method: 'PUT',

            }).then(res => {
            })
        },

        getReadFN() {
            if (!this.chatRoomListId) return
            this.reqFN({
                url: `/calculate-api/api/secure/message/PersonalChat/client/queryChatByRoomId/${this.chatRoomListId}`,
                data: {
                    pageNum: 1,
                    pageSize: 1,
                },
                method: 'GET',

            }).then(res => {

                if (res.data.code == 0) {
                    if (res.data.data.list) {
                        let objRd = {

                        }
                        res.data.data.list.forEach(s => {
                            objRd[s.sendTime] = s.readState

                        })

                        this.chatList.forEach(s => {
                            if (objRd[s.sendTime]) {
                                s.readState = objRd[s.sendTime]

                            }
                        })
                    }

                }

            })

        },

        sureFN() {

        },
        fuWuFn(item) {
            console.log(item);
            this.showDetail = item
            this.getCoupon()
            this.showObj.show = true
        },
        toCouponFN() {
            uni.navigateTo({
                url: '/pages/coupon/coupon?use=true'
            })
        },
        showPaymentOptions() {
            this.paymentMethodPopup.show = true
        },
        selectPaymentMethod(method) {
            this.paymentMethodPopup.show = false
            
            if (method === 'wallet') {
                // 钱包支付 - 检查余额
                if (this.WalletBalance >= this.showDetail.consultPrice) {
                    this.getOrderTokenFN()
                } else {
                    // 余额不足，跳转充值页面
                    this.toFN('/pages/myWallet/myWallet')
                }
            } else if (method === 'direct') {
                // 直接支付
                this.directPayFN()
            }
        },
        directPayFN() {
            // 跳转到支付页面，传递服务ID和优惠券ID
            const serviceId = this.showDetail.userConsultServiceId || this.showDetail.systemConsultServiceId
            const couponId = this.couponDetail.couponsId || ''
            
            uni.navigateTo({
                url: `/pages/payPage/payPage?serviceId=${serviceId}&couponId=${couponId}&isQuickPay=true`
            })
        },
        chooseFN({ item, index }) {
            console.log(item, index);
            this.choose = index
            this.getListFN()
        },
        getListFN() {
            [0, 1].forEach(itc => {

                if (this.navList[itc].pageNum == 'finsh') return
                let data = {
                    pageNum: this.navList[itc].pageNum,
                    pageSize: 1000,
                    serviceType: itc + 1,
                    userId: this.teachDetail.userId
                }
                this.reqFN({
                    url: '/calculate-api/api/secure/community/consult/pageConsultService',
                    data,
                    method: 'GET'
                }).then(res => {
                    console.log(res, '--navList---');


                    if (res.data.code == 0) {
                        if (this.navList[itc].pageNum == 1) {
                            this.navList[itc].list = []
                        }
                        res.data.data.list.forEach(s => {
                            if (this.couponDetail) {
                                let { discountRate = 0, minOrderAmount = 0 } = this.couponDetail
                                if (s.consultPrice > minOrderAmount) {
                                    s.discountRate = discountRate
                                }
                            }
                            this.navList[itc].list.push(s)
                        })
                        // this.navList[itc].list = [...this.navList[itc].list, ...]
                        if (this.navList[itc].pageNum < res.data.data.totalPage) {
                            this.navList[itc].pageNum += 1
                        } else {
                            this.navList[itc].pageNum = 'finsh'
                        }
                    }
                    console.log(this.navList, '---sdnavList');

                })
            })

        },
        getCoupon() {
            this.reqFN({
                url: '/calculate-api/api/secure/oms/coupons/myCoupons',
                data: {
                    couponsStatus: 1,
                    pageNum: 1,
                    pageSize: 1,
                },
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    if (res.data.data && res.data.data.list) {
                        if (res.data.data.list[0]) {
                            this.couponDetail = res.data.data.list[0]
                            if (this.couponDetail.minOrderAmount > this.showDetail.consultPrice) this.couponDetail = {}
                        }


                    }

                }
            })
        },
        getRoomIdFN() {
            this.reqFN({
                url: `/calculate-api/api/secure/message/ChatList/getChatRoom`,
                data: {
                    sendMemberId: uni.getStorageSync('userId'),
                    targetMemberId: this.targetMemberId,
                },
                method: 'GET',
            }).then(res => {
                this.chatRoomListId = res.data.data.chatRoomListId
                this.getHistory()
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
        refresherrefresh() {
            console.log('--2---2-');
            this.triggered = true
            setTimeout(() => {
                this.triggered = false
            }, 1000)
            if (this.pageNum == 'finsh') return
            this.pageNum += 1
            this.getHistory()
        },
        replaceImageUrlsWithTags(text) {
            // 匹配图片URL的正则表达式（支持常见图片格式，包括查询参数和锚点）
            const imageUrlRegex = /https?:\/\/[^\s<>"']+\.(jpg|jpeg|png|gif|bmp|webp|svg)(\?[^\s<>"']*)?/gi;

            return text.replace(imageUrlRegex, (url) => {
                return `<img src="${url}" style="width:100%" />`;
            });
        },
        getHistory() {
            this.reqFN({
                url: `/calculate-api/api/secure/message/PersonalChat/client/queryChatByRoomId/${this.chatRoomListId}`,
                data: {
                    pageNum: this.pageNum,
                    pageSize: 10,
                },
                method: 'GET',

            }).then(res => {
                if (res.data.code == 0) {
                    if (this.pageNum == 1) this.chatList = []
                    this.chatList.forEach(s => {
                        this.hasObj[s.sentTime + ''] = true
                    })
                    res.data.data.list = res.data.data.list.map(s => {
                        if (s.chatText) {
                            s.chatText = s.chatText.replace(/\n/g, '<br/>')
                            if (s.chatText.includes('http')) s.chatText = this.replaceImageUrlsWithTags(s.chatText)


                        }
                        let obj = {
                            ...s,
                            sentTime: s.sendTime,
                            text: s.chatText,
                            senderUserId: s.sendMemberId,
                            messageType: s.chatMessageType,
                            remote: s.chatImgUrl || s.chatMessageUrl || s.remote,
                            duration: s.chatMessageTime,
                        }

                        if (!this.hasObj[s.sendTime + '']) {
                            this.chatList.unshift(obj)
                            this.hasObj[s.sendTime + ''] = true
                        }
                        return obj
                    })
                    console.log('chatList', this.chatList);


                    if (this.pageNum == 1) this.gunFN()

                    if (this.pageNum >= res.data.data.totalPage) this.pageNum = 'finsh'
                }

            })
        },
        gunFN() {
            this.scrollIntoView = ''
            setTimeout(() => {
                this.scrollIntoView = 'scrollIntoView'
            }, 100)
        },
        addChatFN(data) {
            let obj = {
                senderUserId: uni.getStorageSync('userId'),
                messageType: data.chatMessageType,
                sentTime: data.sentTime,


            }

            /*  */
            if (data.chatMessageType == 2) {
                obj.text = data.chatText
            } else if (data.chatMessageType == 3) {
                obj.remote = data.chatMessageUrl
                obj.duration = data.chatMessageTime


            } else if (data.chatMessageType == 4) {
                obj.remote = data.chatImgUrl
            }
            this.chatList.push(JSON.parse(JSON.stringify(obj)))



            this.reqFN({
                url: `/calculate-api/api/secure/message/PersonalChat/client/addChat`,
                data: {
                    ...data,
                    sendMemberId: uni.getStorageSync('userId'),
                    targetMemberId: this.targetMemberId,
                    chatRoomListId: this.chatRoomListId,
                    sendTime: data.sentTime,
                    quoteFlag: false,
                    readState: false,
                },
            }).then(res => {


                if (res.data.code == 0) {
                    this.gunFN()


                } else {
                    this.getUserChatPermissionFN()

                }
            })
        },
        playAuFN(src, playIndex) {
            innerAudioContext.stop();
            if (this.playIndex == playIndex) {
                this.playIndex = -1
                return
            }
            this.playIndex = playIndex
            innerAudioContext.src = src;
            innerAudioContext.play();
        },
        bigImgFN(url) {
            uni.previewImage({
                urls: [url],
                current: 1,

            });

        },

        async sendFN() {
            let that = this
            console.log(this.chatLimit, '--chatLimit-');
            console.log(this.chatTimeout, '--chatTimeout-');


            if (this.chatLimit <= 0 && (!this.chatTimeout || new Date().getTime() > this.chatTimeout)) return uni.showToast({
                title: '已超过免费聊天次数',
                icon: 'none'
            })




            if (this.showInput) {//发送文本
                if (!this.inputVal) return
                let message = await this.engine.createTextMessage(
                    1,
                    this.cloudUserId,
                    null,
                    this.inputVal,
                );
                let callback = {
                    onMessageSaved: (res) => {
                        //...
                        that.addChatFN({
                            chatMessageType: 2,
                            chatText: that.inputVal,
                            sentTime: res.message.sentTime
                        })
                    },
                    onMessageSent: (res) => {
                        //...
                        if (res.code == 0) {
                            this.inputVal = ''
                        } else {
                            uni.showToast({
                                title: '发送信息失败',
                                icon: 'none'
                            })
                        }
                    }
                };
                let code = await this.engine.sendMessage(message, callback);
            } else {
                if (!this.voicePath) return
                let path = 'file:///' + plus.io.convertLocalFileSystemURL(this.voicePath), that = this
                let message = await this.engine.createVoiceMessage(1, this.cloudUserId, null, path, this.time);
                let listener = {
                    onMediaMessageSaved: (res) => {
                        //...


                    },
                    onMediaMessageSending: (res) => {
                        //...
                        uni.showLoading({
                            title: '发送中...',
                            icon: 'none'
                        });
                        console.log('onMediaMessageSending:', res);

                    },
                    onSendingMediaMessageCanceled: (res) => {
                        //...
                        console.log('onSendingMediaMessageCanceled:', res);

                    },
                    onMediaMessageSent: (res) => {
                        //...
                        console.log(res, '---onMediaMessageSent--');

                        uni.hideLoading()
                        that.addChatFN({
                            chatMessageType: 3,
                            sentTime: res.message.sentTime,
                            chatMessageUrl: res.message.remote,
                            chatMessageTime: that.time
                        })
                        that.cancalFN()

                    }
                };
                let code = await this.engine.sendMediaMessage(message, listener);


            }
            this.getUserChatPermissionFN()

        },
        funFn(sourceType) {
            let that = this
            switch (sourceType) {
                case 'album':
                    uni.chooseImage({
                        count: 1,
                        sourceType: [sourceType],
                        success: async (res) => {
                            if (res.tempFilePaths.length < 0) return;
                            //转为平台路径
                            let path = 'file:///' + plus.io.convertLocalFileSystemURL(res.tempFilePaths[0])
                            //创建图片消息
                            let message = await this.engine.createImageMessage(1, this.cloudUserId, null, path);
                            let listener = {
                                onMediaMessageSaved: (res) => {
                                    //...
                                    console.log('onMediaMessageSaved:', res);

                                },
                                onMediaMessageSending: (res) => {
                                    //...
                                    uni.showLoading({
                                        title: '发送中...',
                                        icon: 'none'
                                    });
                                    console.log('onMediaMessageSending:', res);

                                },
                                onSendingMediaMessageCanceled: (res) => {
                                    //...
                                    console.log('onSendingMediaMessageCanceled:', res);

                                },
                                onMediaMessageSent: (res) => {
                                    //...
                                    uni.hideLoading()
                                    that.addChatFN({
                                        chatMessageType: 4,
                                        sentTime: res.message.sentTime,
                                        chatImgUrl: res.message.remote
                                    })

                                }
                            };
                            let code = await this.engine.sendMediaMessage(message, listener);
                        },
                        fail: err => {
                            if (err.errMsg.includes('cancel')) return
                            uni.showModal({
                                title: '提示',
                                content: '未获取到相册权限，可能导致应用运行出现问题',
                                confirmText: '去开启',
                                cancelText: "暂不开启",
                                success: res => {
                                    if (res.confirm) {
                                        // 跳转权限页面
                                        permision.gotoAppPermissionSetting()
                                    }
                                }
                            })

                        }
                    });

                    break;
                case 'camera':
                    uni.chooseImage({
                        count: 1,
                        sourceType: [sourceType],
                        success: async (res) => {
                            if (res.tempFilePaths.length < 0) return;
                            //转为平台路径
                            let path = 'file:///' + plus.io.convertLocalFileSystemURL(res.tempFilePaths[0])
                            //创建图片消息
                            let message = await this.engine.createImageMessage(1, this.cloudUserId, null, path);
                            let listener = {
                                onMediaMessageSaved: (res) => {
                                    //...
                                    console.log('onMediaMessageSaved:', res);

                                },
                                onMediaMessageSending: (res) => {
                                    //...
                                    uni.showLoading({
                                        title: '发送中...',
                                        icon: 'none'
                                    });
                                    console.log('onMediaMessageSending:', res);

                                },
                                onSendingMediaMessageCanceled: (res) => {
                                    //...
                                    console.log('onSendingMediaMessageCanceled:', res);

                                },
                                onMediaMessageSent: (res) => {
                                    //...
                                    uni.hideLoading()
                                    that.addChatFN({
                                        chatMessageType: 4,
                                        sentTime: res.message.sentTime,
                                        chatImgUrl: res.message.remote
                                    })
                                    console.log('onMediaMessageSent:', res);

                                }
                            };
                            let code = await this.engine.sendMediaMessage(message, listener);
                        },
                        fail: err => {
                            if (err.errMsg.includes('cancel')) return

                            uni.showModal({
                                title: '提示',
                                content: '未获取到相机权限，可能导致应用运行出现问题',
                                confirmText: '去开启',
                                cancelText: "暂不开启",
                                success: res => {
                                    if (res.confirm) {
                                        // 跳转权限页面
                                        permision.gotoAppPermissionSetting()
                                    }
                                }
                            })

                        }
                    });
                    break;
                case 'rewardTea':
                    this.showObj2 = {
                        show: true,
                        num: '',

                    }
                    break;
            }



        },
        cancalFN() {
            this.touch = false
            this.voicePath = ''
            this.showInput = true
        },
        touchstartFN() {
            recorderManager.start({
                format: 'mp3', // 录音格式，可以是 'mp3' 或 'aac'
                sampleRate: 44100 // 采样率
            });
            this.time = 0
            this.interFN = setInterval(() => {
                this.time += 1
            }, 1000)
            this.touch = true
        },
        touchendFN() {
            if (!this.interFN) return
            recorderManager.stop();
            clearInterval(this.interFN)
            this.interFN = ''


        },
        playFN() {
            if (this.voicePath) {
                innerAudioContext.src = this.voicePath;
                innerAudioContext.play();
            }
        },
    },
}
</script>
<style lang='scss'>
page {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    height: 100%;
    overflow: hidden;

}

#chat {
    height: 100%;
    overflow: hidden;
    padding-top: 170rpx;

    .bgsss {
        background: linear-gradient(180deg, rgba(24, 27, 37, .8) 0%, rgba(24, 27, 37, 1) 100%);
        flex-direction: column;
        overflow: hidden;
        height: 100%;
    }

    scroll-view {
        overflow-y: auto;
        position: relative;
        z-index: 2;
    }

    .funList {

        .list {

            margin: 0 19rpx 34rpx;
            padding: 32rpx 32rpx 36rpx 31rpx;
            box-sizing: border-box;
            min-height: 260rpx;



            .contant {
                flex-direction: column;
            }
        }

        .type {
            justify-content: space-between;
            margin-bottom: 32rpx;
        }

        .det {}

        .btnV {
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
                z-index: 3;
                position: relative;
            }
        }

        .fee {
            padding: 6rpx 17rpx;
            background: rgba(255, 211, 144, 0.23);
            border-radius: 90rpx;
            margin-left: 25rpx;
        }
    }

    .coupon {
        background: #3F2A15;
        margin: 0 19rpx 408rpx;
        height: 73rpx;
        padding: 0 23rpx;

    }

    .chatList {
        margin-bottom: 20rpx;

        .child2 {
            justify-content: flex-end;
        }

        .child {
            padding: 0 25rpx;


            .head {
                width: 57rpx;
                height: 57rpx;
                margin-right: 23rpx;
                border-radius: 50%;
                border: 2rpx solid #C98F53;
            }

            .head2 {
                margin-right: 0;
                margin-left: 23rpx;

            }

            .textImg {
                width: 276rpx;
                height: 180rpx;
                z-index: 2;
                position: relative;

            }

            .content {
                position: relative;
                max-width: 516rpx;
                min-width: 260rpx;
                min-height: 40rpx;
                padding: 32rpx 29rpx;

                .tip {
                    position: absolute;
                    bottom: 0;
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

            }
        }

    }

    .btnCV {
        padding: 0 17rpx 57rpx 40rpx;

        image {
            height: 1rpx;
            width: 44rpx;
            margin-right: 13rpx;
        }

        .f1 {
            font-size: 61rpx;
        }

        .btn {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            line-height: 98rpx;
            width: 302rpx;
            height: 99rpx;
        }
    }

    ::v-deep .btnP {
        span {
            background: rgb(255, 163, 29) !important;
        }
    }

    .teacher {

        .list {

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

            position: relative;
            margin: 0 19rpx 34rpx;
            padding: 32rpx 32rpx 36rpx 31rpx;
            box-sizing: border-box;
            background: rgba(96, 69, 41, 0.4);

            .bgGuang {
                position: absolute;
                top: 0;
                left: 0;
                height: 1rpx;
                width: 300rpx;
            }


            .contant {
                flex-direction: column;
            }
        }

        .head {
            width: 94rpx;
            height: 94rpx;
            margin-right: 27rpx;
            border-radius: 50%;
        }

        .type {
            justify-content: space-between;
            margin-bottom: 32rpx;
        }

        .det {}


    }

    .luyin {
        padding: 0 23rpx;
        background: #C98F53;
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 7;

        .f1 {
            user-select: none;
            -webkit-user-select: none;
            /* 禁止 iOS 长按菜单 */
            -webkit-touch-callout: none;
        }

        image {
            margin-left: 10rpx;
            height: 1rpx;
            width: 31rpx;
        }
    }

    .funBtn {
        margin-bottom: -300rpx;
        transition: .3s;

        .btn {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
            line-height: 65rpx;
            width: 199rpx;
            height: 65rpx;
            position: relative;
            z-index: 3;
        }

        .bg {
            background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/sendBg.png?x-oss-process=image/quality,Q_100) no-repeat;
            background-size: 100% auto;
        }

        .inputSend {
            z-index: 3;

            height: 165rpx;
            width: 100vw;
            padding: 0 36rpx;



            .input {
                background: rgba(63, 42, 21, .76);
                margin: 0 20rpx;
                height: 78rpx;
                position: relative;
                padding: 0 23rpx;




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

            .img {
                padding-top: 8rpx;
                width: 76rpx;

                image {
                    height: 1rpx;
                    width: 76rpx;
                }
            }
        }

        .funlist {
            padding: 0 36rpx 10vh;

            .child {
                margin-right: 55rpx;
                margin-top: 20rpx;

                image {
                    height: 1rpx;
                    width: 98rpx;
                }
            }
        }
    }

    .showFu {
        margin-bottom: 0;

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

    .payment-methods {
        padding: 0 40rpx 40rpx;

        .payment-option {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 30rpx 20rpx;
            margin-bottom: 20rpx;
            background: rgba(61, 44, 25, 0.6);
            border-radius: 20rpx;
            position: relative;

            &::after {
                position: absolute;
                border: 2rpx solid rgba(226, 204, 192, 0.4);
                content: ' ';
                height: calc(100% - 8rpx);
                width: calc(100% - 8rpx);
                top: 4rpx;
                left: 4rpx;
                border-radius: 16rpx;
            }

            .option-content {
                display: flex;
                align-items: center;
                flex: 1;
                position: relative;
                z-index: 2;

                .option-icon {
                    width: 34rpx;
                    height: 34rpx;
                    margin-right: 30rpx;
                }

                .option-text {
                    flex: 1;

                    .option-title {
                        font-size: 32rpx;
                        color: #fff;
                        margin-bottom: 10rpx;
                    }

                    .option-desc {
                        font-size: 24rpx;
                        color: #FFD390;

                        &.insufficient-balance {
                            color: #ff6b6b;
                        }
                    }
                }
            }

            .option-arrow {
                width: 30rpx;
                height: 30rpx;
                position: relative;
                z-index: 2;
            }

            &:active {
                opacity: 0.8;
            }
        }
    }

}
</style>