<!--
 * @Author: fujihang
 * @Date: 2025-01-18 17:58:46
 * @LastEditTime: 2025-03-18 23:31:40
 * @Description: 编辑资料
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='editInfor'>
        <topBar :title="(infor?'编辑':'新增')+'资料'" :showImg="true"></topBar>


        <!--  -->
        <view class="bg">
            <view class="list s27 c1 flex-a" v-for="(item, index) in funList" :key="item.name">
                <text style="width: 160rpx;">{{ item.name }}</text>
                <view class="f1">
                    <input class="s27" v-model="item.val" :placeholder="item.plr" type="text"
                        v-if="item.type == 'input'">
                    <template v-if="item.type == 'picker'">
                        <picker :disabled="!item.arrow" @change="e => changeFN(e, index, 'sex')"
                            v-if="item.type1 == 'sex'" mode="selector" :value="item.val" :range="range">
                            {{ item.val || item.plr }}
                        </picker>
                        <view @click="visible = true" v-else-if="item.data == 'birthplace'"
                            style="width: 100%;height: 100%;">

                            {{ item.val || item.plr }}
                        </view>

                        <picker :disabled="!item.arrow" @change="e => changeFN(e, index)" v-else :mode="item.type1"
                            :value="item.val">
                            {{ item.val || item.plr }}
                        </picker>


                    </template>

                </view>
                <image v-if="item.arrow" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />

            </view>
                    <!--  -->
        <view class=" s27 c1 ccc" style="padding: 0 20rpx 80rpx;margin-top:0;">
            <view class="choose">
                <view class="name">请选择你的关系</view>
            </view>
            <view class="flex-a" style="z-index: 2;position: relative;">
                <text :class="['child s23 tc', index == archiveType && 'chooseA']" @click="archiveType = index"
                    v-for="(item, index) in chooseList" :key="item">
                    {{ item }}
                </text>
            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
        </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
        </view>


        <!--  -->

        <!--  -->
        <view class="btnV flex-a fw">

            <view class="btn tc s38 " @click="okFN()">保存</view>

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
            choose: '我的',
            chooseList: [
                '我的',
                '亲人',
                '朋友',
            ],
            visible: false,
            archiveType: 0,
            time: '00:00',
            range: ['男', '女'],
            funList: [
                {
                    name: "姓名",
                    val: '',
                    to: '',
                    plr: '请输入姓名',
                    type: 'input',
                    data: 'nickName',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100'
                },

                {
                    name: "性别",
                    plr: '请选择性别',
                    val: '男',
                    data: 'sex',
                    to: '',
                    type: 'picker',
                    type1: 'sex',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/archives.png?x-oss-process=image/quality,Q_100',
                    arrow: true,


                },
                {
                    name: "出生日期",
                    plr: '请选择出生日期',
                    val: '2010-01-01',
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
                    data: 'birthplace',
                    arrow: true,
                    type: 'picker',
                    to: '/pages/aboutUs/aboutUs',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/aboutUs.png?x-oss-process=image/quality,Q_100'

                },
                {
                    name: "时区",
                    plr: '请选择时区',
                    data: 'nickName',
                    type1: 'time',
                    data: 'timeZone',
                    val: '+8',
                    type: 'picker',
                    to: '/pages/aboutUs/aboutUs',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/aboutUs.png?x-oss-process=image/quality,Q_100'

                },

            ],
            infor: '',
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        if (uni.getStorageSync('editInfor')) {
            this.infor = uni.getStorageSync('editInfor')
            this.funList.forEach(s => {
                if (this.infor[s.data]) s.val = this.infor[s.data]

            })
            console.log(this.infor)
            this.funList[1].val = this.infor.sex ? '男' : '女'
            this.funList[2].val = this.funList[2].val.split(' ')[0]
            this.funList[3].val = this.infor.birthday.split(' ')[1]
        }
        uni.removeStorageSync('reccc')

    },
    onUnload() {
        uni.removeStorageSync('editInfor')
    },
    methods: {
        confirm(e) {
            this.funList[4].val = e.name
            this.visible = false
        },
        changeFN(event, index, sex) {
            if (sex) {
                this.funList[index].val = event.detail.value == 1?'女':'男'
            } else {
                this.funList[index].val = event.detail.value
            }
            this.okFN()
        },
        okFN() {
            let data = {
                archiveType: this.archiveType,

            }
            this.funList.forEach(s => {
                data[s.data] = s.val

                if (s.type1 == 'sex') {
                    
                    if (s.val == '男') data[s.data] = 1
                    if (s.val == '女') data[s.data] = 0

                }
            })
            if(data.birthday&&new Date(data.birthday).getTime()>new Date().getTime()) return   uni.showToast({
                            title: '出生日期不能大于现在日期',
                            icon: 'none',
                        })
            data.birthday = this.funList[2].val + ' ' + (this.funList[3].val + ':00').slice(0,8)
            // data.birthday = data.birthday + ' 00:00:00'
            if (this.infor) {
                data.memberArchiveId=this.infor.memberArchiveId
                this.reqFN({
                    url: '/calculate-api/api/secure/member/archive/edit',
                    data,
                    method:"PUT"
                }).then(res => {
                    if (res.data.code == 0) {
                        uni.showToast({
                            title: '编辑成功',
                            icon: 'none',
                        })
                        uni.setStorageSync('reccc', true)
                        uni.navigateBack({ delta: 1 })
                    }
                })
            } else {

                this.reqFN({
                    url: '/calculate-api/api/secure/member/archive/save',
                    data,
                }).then(res => {
                    if (res.data.code == 0) {
                        uni.showToast({
                            title: '新增成功',
                            icon: 'none',
                        })
                        uni.setStorageSync('reccc', true)
                        uni.navigateBack({ delta: 1 })


                    }
                })
            }

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
#editInfor {
    margin-top: 190rpx;
    min-height: calc(100% - 100rpx);



    .list {
        image {
            height: 1rpx;
            width: 26rpx;
            margin-right: 10rpx;
        }
    }

    .bg {
        position: relative;
        background: linear-gradient(180deg, rgba(24, 27, 37, .8) 0%, rgba(24, 27, 37, 1) 100%);

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

        margin: 0 17rpx;
        padding: 49rpx 0;

        .list {
            height: 100rpx;
            padding: 0 37rpx 0 32rpx;
            position: relative;
            z-index: 2;
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

    .ccc {
        padding: 0 37rpx 0 32rpx;

        .name {
            margin-bottom: 30rpx;
        }

        .child {
            width: 114rpx;
            height: 42rpx;
            line-height: 42rpx;
            background: #544e49;
            margin-right: 50rpx;
            border-radius: 5rpx;
            // #
        }

        .chooseA {
            background: #dac3a6;
            color: #333;

        }
    }

    .btnV {
        position: fixed;
        bottom: 10vh;
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