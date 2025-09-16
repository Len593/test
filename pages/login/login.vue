<!--
 * @Author: fujihang
 * @Date: 2025-01-15 21:59:39
 * @LastEditTime: 2025-05-22 23:01:37
 * @Description: 登录页
-->

<template>
    <view  :style="'font-family:' + (fontfamily)" id="login" class="c1">
        <view class="tc">
            <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/logo.jpg?x-oss-process=image/quality,Q_100" mode="widthFix" class="logo"></image>
        </view>
        <view class="brand s31 fw">启运阁</view>
        <!--  -->
        <!-- <view style="padding: 0 100rpx;">

            <navTab :list="funList" @choose="chooseFN"></navTab>
        </view> -->

        <!--  -->
        <view class="input" v-if="choose">
            <view class="name">手机号</view>
            <view class="val flex-a">
                <input v-model="phone" placeholder="请输入手机号" type="text">
            </view>
            <!--  -->
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>
        <view class="input" v-else>
            <view class="name">邮箱</view>
            <view class="val flex-a">
                <input v-model="email" placeholder="请输入邮箱" type="text">
            </view>
            <!--  -->
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>
        <view class="input" style="margin-bottom: 78rpx;">
            <view class="name">验证码</view>
            <view class="val flex-a">
                <input v-model="code" class="f1" placeholder="请输入验证码" type="text">
                <text class="get tc" @click="getSmsFN">{{ codeWord }}</text>
            </view>
            <!--  -->
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>
        <view class="flex-a jc" style="margin: 17rpx 0;">
            <view class="ok c3" @click="loginFN">
                立即登入
            </view>
        </view>
        <view class="argee s27 cf flex">
            <radio @click="checked = !checked" color="#FFD390" :checked="checked" />
            <view>
                我已满18岁且以阅读并同意启运阁
                </br>
                的
                <text class="c1 " @click="toFN(1)">
                    《服务条款》
                </text>
                及 <text class="c1" @click="toFN(2)">
                    《隐私权益政策》
                </text>
            </view>

        </view>
    </view>
</template>
<script>
import navTab from '../../components/navTab.vue'

export default {
    components: {
        navTab
    },
    data() {
        return {
            checked: false,
            phone: '',
            email: '',
            code: '',
            funList: [
                {
                    name: "邮箱登录",
                },
                {
                    name: "手机登录",
                },
            ],
            choose: 0,
            codeWord: '获取验证码',
            setInt: '',
            miao: 60,
            isLoading:false,
        }
    }, 
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad(){

    },
    methods: {
        toFN(type) {
            uni.navigateTo({
                url: `/pages/shuoMing/shuoMing?type=${type}`
            })

        },
        chooseFN(data) {
            this.choose = data.index
            console.log(this.choose, '----choose');

        },
        loginFN() {
   
            if (!this.checked) return uni.showToast({
                icon: 'none',
                title: '请勾选协议'
            })
            let data = {
                code: this.code,
            }
            if (this.choose) {
                data.phone = this.phone
                data.loginType = 2
            } else {
                data.email = this.email
                data.loginType = 1
                data.userType = 1


            }
            this.reqFN({
                url: '/calculate-api/api/login',
                data,
            }).then(res => {
                console.log(res, '--login--errr');

                if (res.data.code == 0) {
                    console.log('--11----',res.data.data);
                    
                    uni.setStorageSync('userId', res.data.data.id)
                    uni.setStorageSync('token', res.data.data.tokenType + ' ' + res.data.data.token)
                    setTimeout(() => {
                    console.log('--getMemberCloud----');

                        this.reqFN({
                            url: '/calculate-api/api/secure/member/getMemberCloud',
                            data: {
                            },
                            method: 'GET'
                        }).then(resv => {
                            console.log(resv, '--resv---');

                            if (resv.data.code == 0) {
                                uni.setStorageSync('memberCloudToken', resv.data.data.memberCloudToken)
                                // this.connectFN(resv.data.data.memberCloudToken, this)
                                this.akcFN()
                                setTimeout(()=>{
                                this.akcFN()

                                    // this.connectFN(resv.data.data.memberCloudToken, this)
                                },2000)
                            }
                        })
                    }, 1000)

                    this.getUserData()
                    uni.removeStorageSync('toOk')

                    uni.switchTab({
                        url: '/pages/index/index'
                    });
                }
            })
        },
        getUserData() {
            this.reqFN({
                url: '/calculate-api/api/secure/member/getInfo',
            }).then(res => {
                if (res.data.code == 0) {
                    uni.setStorageSync('userInfo', res.data.data)
                }
            })
        },
        getSmsFN() {
            let obj = {
                url: '/calculate-api/api/sendCode',
                data: {
                    codeType: 1,
                    type: this.choose + 1,
                }
            }
            if (this.choose) {
                if (!this.phone) return uni.showToast({
                    title: '请输入手机号',
                    icon: 'none'
                })
                obj.data.phone = this.phone
            } else {
                if (!this.email) return uni.showToast({
                    title: '请输入邮箱',
                    icon: 'none'
                })
                obj.data.email = this.email
            }
            console.log(this.codeWord, '----');
            if(this.isLoading) return
            this.isLoading=true
            if (this.codeWord != '获取验证码' && this.codeWord != '重新获取') return
            this.reqFN(obj).then(res => {
                if (res.data.code == 0) {
                    this.setInt = setInterval(() => {
                        this.miao -= 1
                        if (this.miao <= 0) {
                            clearInterval(this.setInt)
                            this.miao = 60
                            this.codeWord = '重新获取'
                            return
                        }
                        this.codeWord = `${this.miao}秒`
                        this.isLoading=false

                    }, 1000)
                }
            })
        },
    },
}
</script>
<style lang="scss">

#login {
    text-align: center;
    font-size: 31rpx;
    padding-top: 140rpx;

    .argee {
        justify-content: center;

        radio {
            margin-top: -8rpx;
            transform: scale(.7);
        }
    }

    .logo {

        height: 1rpx;
        width: 159rpx;
        border-radius: 50%;
        border: 2rpx solid #FFE7C4;


        margin-bottom: 34rpx;
    }


    .brand {
        margin-bottom: 86rpx;
    }

    .input {
        position: relative;
        background: rgba(230, 160, 88, .3);
        margin: 0 40rpx 34rpx;
        padding: 27rpx 38rpx;
        text-align: left;
        z-index: 3;

        .name {
            margin-bottom: 25rpx;
        }

        .val {
            input {
                position: relative;
                z-index: 3;
                width: 100%;
                color: #FFEAD4;
            }

            .get {
                position: relative;
                z-index: 3;
                width: 153rpx;
                color: #FE5656;
            }
        }





        &::after {
            position: absolute;
            border: 1rpx solid #E6A058;

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

        image {
            position: absolute;
            height: 1rpx;
            width: 30rpx;
            z-index: 3;
        }

        .img1 {
            top: -2rpx;
            left: -2rpx;
        }

        .img2 {
            top: -2rpx;
            right: -2rpx;
            transform: rotateZ(90deg);
        }

        .img3 {
            bottom: -2rpx;
            left: -2rpx;
            transform: rotateZ(270deg);

        }

        .img4 {
            bottom: -2rpx;
            right: -2rpx;
            transform: rotateZ(180deg);

        }
    }

    .ok {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        line-height: 87rpx;
        width: 254rpx;
        height: 87rpx;
    }
}
</style>