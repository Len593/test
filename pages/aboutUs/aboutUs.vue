<!--
 * @Author: fujihang
 * @Date: 2025-01-18 17:58:46
 * @LastEditTime: 2025-06-15 16:17:19
 * @Description: 关于我们
-->
<template>
    <view id='aboutUs' class="mtBg" :style="'font-family:' + (fontfamily)">
        <topBar :title="'关于我们'" :showImg="true"></topBar>

        <view class="logoVers tc">
            <image
                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/logo.jpg?x-oss-process=image/quality,Q_100"
                mode="widthFix" />
            <view class="name s31 c1 fw">启运阁</view>
            <view class="val s27 c1">v.1.0.0</view>

        </view>
        <!--  -->
        <view class="bg bgLine">
            <view class="list s27 c1 flex-a" @click="toFN(item.to)" v-for="(item, index) in funList" :key="item.name">
                <text class="f1">
                    {{ item.name }}
                </text>
                <view class=" " style="margin: 0 10rpx;">
                    <picker @change="e => changeFN(e, index,)" v-if="item.to == 'yyqh'" mode="selector"
                        :value="item.val" :range="range">
                        {{ item.val || item.plr }}
                    </picker>
                </view>

                <image style="width: 30rpx;height: 1rpx;"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>


        <view class="btnV flex-a fw">
            <view class="btn tc s38 " @click="errFN">退出登录</view>
        </view>
        <fuUpdate :showPopup.sync="showObj.show" @okFN="downloadFN" :title="showObj.title"></fuUpdate>

    </view>
</template>
<script>
import fuUpdate from '../../components/fuUpdate.vue'
import topBar from '../../components/topBar.vue'
export default {
    components: {
        fuUpdate, topBar
    },
    data() {
        return {
            showObj: {
                show: false,
                title: "",
            },
            range: [
                '简体中文',
                '繁体中文'
            ],
            funList: [
                // {
                //     name: "去评论",
                //     val: '',
                //     to: '',
                // },
                {
                    name: "隐私政策",
                    val: '',
                    to: '/pages/shuoMing/shuoMing?type=2',
                },
                {
                    name: "用户协议",
                    val: '',
                    to: '/pages/shuoMing/shuoMing?type=1',
                },
                {
                    name: "语言切换",
                    val: uni.getStorageSync('fontfamily') == 'ft' ? '繁体中文' : '简体中文',
                    to: 'yyqh',
                },
                {
                    name: "版本更新",
                    val: '',
                    to: 'gx',
                },
                {
                    name: "注销账户",
                    val: '',
                    to: 'zx',
                },
            ],
            downloadLink: '',
        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },

    onLoad() {


    },

    methods: {
        downloadFN() {
            if (this.downloadLink) {
                plus.runtime.openURL(this.downloadLink)

            } else {
                uni.showToast({
                    title: '请去谷歌商店更新',
                    icon: 'none',

                })
            }

        },
        errFN() {
            uni.clearStorageSync()
            uni.reLaunch({
                url: '/pages/login/login'
            })
        },
        changeFN(event, index,) {
            this.funList[index].val = event.detail.value == 0 ? '简体中文' : '繁体中文'
            this.$store.commit('fontfamilyFN', event.detail.value ? 'ft' : 'jt')
            uni.setStorageSync('fontfamily', event.detail.value ? 'ft' : 'jt')


        },
        toFN(url) {

            if (url == 'yyqh') {

                return
            }
            if (url == 'gx') {
                this.getVersionFN()
                return
            }
            if (url == 'zx') {
                uni.showModal({
                    title: '提示',
                    content: '确定注销账户吗？',
                    showCancel: true,
                    success: ({ confirm, cancel }) => {
                        if (confirm) {
                            this.reqFN({
                                url: '/calculate-api/api/secure/member/delete',
                                method: 'DELETE'
                            }).then(res => {
                                console.log(res, '---');

                                if (res.data.code == 0) {


                                    uni.showToast({
                                        title: `注销成功`,
                                        icon: 'none'
                                    })
                                    setTimeout(() => {
                                        uni.reLaunch({
                                            url: '/pages/login/login'
                                        })
                                    }, 1450)

                                }
                            })
                        }
                    }
                })

                return
            }
            uni.navigateTo({
                url
            })

        },
        getVersionFN() {
            console.log('getVersionFN');
            this.reqFN({
                url: '/calculate-api/api/checkVersion',
                method: 'GET'
            }).then(res => {
                if (res.code == 0) {
                    // res.data.releaseVersion,
                    this.downloadLink = res.data.downloadLink
                    const version = plus.runtime.version;

                    if (res.data.releaseVersion && res.data.releaseVersion != version) {
                        this.showObj = {
                            show: true,
                            title: "",
                        }
                    }

                }
            })
        },
    },
}
</script>
<style lang='scss'>
#aboutUs {
    padding-top: 200rpx;

    .logoVers {
        margin-bottom: 97rpx;

        image {
            height: 1rpx;
            width: 159rpx;
            border-radius: 50%;
            border: 2rpx solid #FFE7C4;
            margin-bottom: 34rpx;
        }

        .name {
            margin-bottom: 11rpx;
        }
    }

    .bg {

        margin: 0 17rpx;
        padding: 48rpx 38rpx 20rpx 30rpx;

        .list {
            margin-bottom: 58rpx;
            position: relative;
            z-index: 2;
        }

        image {
            height: 1rpx;
            width: 30rpx;
        }
    }

    .btnV {
        position: fixed;
        bottom: 6vh;
        left: 50%;
        transform: translate(-50%);

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
}
</style>