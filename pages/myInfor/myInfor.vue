<!--
 * @Author: fujihang
 * @Date: 2025-01-18 17:58:46
 * @LastEditTime: 2025-04-17 23:46:01
 * @Description: 我的个人资料
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='myInfor' class="mtBg">
        <topBar title="我的资料" :showImg="true"></topBar>

        <view class="logoVers tc " @click="chooseImg">
            <image :src="headimg" mode="aspectFill" class="logo" />
            <view class="name fw flex-a jc s31 c1">
                编辑头像
            </view>

        </view>

        <!--  -->
        <view class="bg">
            <view class="list s27 c1 flex-a" v-for="(item, index) in funList" :key="item.name">
                <text style="width: 160rpx;">{{ item.name }}</text>
                <view class="f1">
                    <input class="s27" v-model="item.val" :disabled="!item.arrow" @blur="okFN" :placeholder="item.plr"
                        type="text" v-if="item.type == 'input'">
                    <template v-if="item.type == 'picker'">
                        <picker :disabled="!item.arrow" @change="e => changeFN(e, index, 'sex')"
                            v-if="item.type1 == 'sex'" mode="selector" :value="item.val" :range="range">
                            {{ item.val || item.plr }}
                        </picker>
                        <picker @change="e => change2FN(e, index)" v-else-if="item.type1 == 'time'" :mode="item.type1"
                            :value="item.val">
                            {{ item.val || item.plr }}
                        </picker>
                        <view @click="visible = true" v-else-if="item.type1 == 'region'"
                            style="width: 100%;height: 100%;">

                            {{ item.val || item.plr }}
                        </view>
                        <picker :disabled="!item.arrow" @change="e => changeFN(e, index)" v-else :mode="item.type1"
                            :value="item.val">
                            {{ item.val || item.plr }}
                        </picker>

                    </template>

                </view>
                <image v-if="item.arrow"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>
        <view style="height: 100rpx;"></view>

        <view class="btnV flex-a fw">
            <view class="btn tc s38 " @click="okFN">保存</view>
        </view>
        <!--  -->
        <cityPicker :column="3" :mask-close-able="true" @confirm="confirm" @cancel="visible = false"
            :visible="visible" />
    </view>
</template>
<script>
import topBar from '../../components/topBar.vue'
import cityPicker from '@/uni_modules/piaoyi-cityPicker/components/piaoyi-cityPicker/piaoyi-cityPicker'
export default {
    components: {
        topBar, cityPicker
    },
    data() {
        return {
            time: '00:00',
            range: ['未知', '男', '女'],
            funList: [
                {
                    name: "姓名",
                    val: '',
                    to: '',
                    plr: '请输入姓名',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'nickName',
                    arrow: true,
                },
                {
                    name: "邮箱",
                    val: '',
                    plr: '请输入邮箱',
                    to: '',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/coupon.png?x-oss-process=image/quality,Q_100',
                    data: 'email',
                },
                {
                    name: "性别",
                    plr: '请选择性别',
                    val: '未知',
                    to: '',
                    type: 'picker',
                    type1: 'sex',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/archives.png?x-oss-process=image/quality,Q_100',
                    data: 'sex',
                    arrow: true,
                },
                {
                    name: "出生日期",
                    plr: '请选择出生日期',
                    val: '',
                    to: '',
                    type1: 'date',
                    type: 'picker',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/help.png?x-oss-process=image/quality,Q_100',
                    data: 'birthday',
                    arrow: true,
                },
                {
                    name: "时间",
                    plr: '请选择时间',
                    val: '',
                    to: '',
                    type1: 'time',
                    type: 'picker',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/help.png?x-oss-process=image/quality,Q_100',
                    data: 'birthday',
                    arrow: true,
                },
                {
                    name: "出生地区",
                    val: '',
                    plr: '请选择出生地区',
                    type1: 'region',
                    type: 'picker',
                    to: '/pages/aboutUs/aboutUs',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/aboutUs.png?x-oss-process=image/quality,Q_100',
                    data: 'birthAddress',
                    arrow: true,
                },
                {
                    name: "时区",
                    plr: '请选择时区',
                    type1: 'time',
                    val: '+8',
                    type: 'picker',
                    to: '/pages/aboutUs/aboutUs',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/aboutUs.png?x-oss-process=image/quality,Q_100',
                    data: 'timeZone',
                },

            ],
            headimg: '',
            visible: false,
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
    methods: {
        confirm(e) {
            this.funList[5].val = e.name
            this.visible = false
        },
        change2FN(e) {

            this.funList[4].val = e.detail.value
            if (!this.funList[3].val || !this.funList[4].val) return

        },
        chooseImg() {
            let that = this
            uni.chooseImage({
                count: 1,
                success: (res) => {
      

                    uni.showLoading({
                        title: '上传中...',
                    })
                    uni.uploadFile({
                        url: that.baseUrl + '/calculate-api/api/secure/file/uploadFile',
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        header: {
                            authorization: uni.getStorageSync('token'),

                            // 'content-type' : 'multipart/form-data' 

                        },

                        success(resc) {
                            console.log(resc, '----resc')

                            uni.hideLoading()
                            var respon = JSON.parse(resc.data)
                            if (respon.code == 0) {
                                that.headimg = that.baseImg + respon.data
                                console.log(that.headimg,'headimg---');
                                
                            }
                        },
                        fail: function (e) {
                            console.log(e, '---fail')
                        }
                    })
                }, fail: err => {
                    console.log(err, '---faerrerril')

                }
            })
        },
        getData() {
            this.reqFN({
                url: '/calculate-api/api/secure/member/getInfo',
            }).then(res => {
                if (res.data.code == 0) {
                    this.funList.forEach(s => {
                        if (res.data.data[s.data]) s.val = res.data.data[s.data]

                        if (s.type1 == 'sex') {
                            let obj = {
                                '-1': '未知',
                                '0': '女',
                                '1': '男',
                            }
                            s.val = obj[res.data.data[s.data]]

                        }
                    })
                    if (res.data.data.birthday) {
                        this.funList[3].val = res.data.data.birthday.split(' ')[0]
                        this.funList[4].val = res.data.data.birthday.split(' ')[1]
                    }
                    this.headimg = res.data.data.icon
                }
            })
        },
        changeFN(event, index, sex) {
            if (sex) {
                let obj = {
                    '0': '未知',

                    '1': '男',
                    '2': '女',
                }
                this.funList[index].val = obj[event.detail.value]
                console.log(this.funList[index].val, '----');

            } else {
                this.funList[index].val = event.detail.value
            }


            if (!this.funList[3].val || !this.funList[4].val) return
        },
        okFN() {
            let data = {
                icon: this.headimg
            }
            this.funList.forEach(s => {
                data[s.data] = s.val
                if (s.type1 == 'sex') {

                    console.log(s, '-ss--');

                    if (s.val == '男') data[s.data] = 1
                    if (s.val == '女') data[s.data] = 0
                    if (s.val == '未知') data[s.data] = -1

                }
            })
            console.log(data, '---data');
         
            data.birthday = this.funList[3].val + ' ' + (this.funList[4].val + ':00').slice(0,8)
            this.reqFN({
                url: '/calculate-api/api/secure/member/updateMemberInfo',
                data,
            }).then(res => {
                if (res.data.code == 0) {
                    this.getData()
                    uni.showToast({
                            title: '保存成功',
                            icon: 'none'
                        })
                    uni.navigateBack({ delta: 1 })

                }
            })
        },
        toFN(url) {
            uni.navigateTo({
                url
            });
        },
    },
}
</script>
<style lang='scss'>
page{
    height: 100%;
    overflow: auto;
}
#myInfor {
    padding-top: 210rpx;

    .logoVers {
        margin: 0 0 47rpx;
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
        }
    }



    .bg {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/myInforBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        margin: 0 17rpx;
        padding: 49rpx 0 140rpx;

        .list {
            height: 100rpx;
            padding: 0 37rpx 0 32rpx;
        }

        .img {
            height: 1rpx;
            width: 46rpx;
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