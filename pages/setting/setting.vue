<!--
 * @Author: fujihang
 * @Date: 2025-01-18 17:58:46
 * @LastEditTime: 2025-01-19 22:35:18
 * @Description: 设置
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='setting'>


        <!--  -->
        <view class="bg">
            <view class="list s27 c1 flex-a" v-for="item in funList" :key="item.name">
                <text class="f1">{{ item.name }}</text>
                <view style="margin-right: 21rpx;">

                    <template v-if="item.type == 'picker'">
                        <picker v-if="item.type1 == 'sex'" mode="selector" :value="item.val" :range="range">
                            {{ item.val || item.plr }}
                        </picker>
                        <picker v-else :mode="item.type1" :value="item.val">
                            {{ item.val || item.plr }}
                        </picker>

                    </template>

                </view>
                <image src="" mode="aspectFill" />
            </view>
        </view>



        <!--  -->
        <view class="btnV tc  c1 s31">

            登出

        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {

            time: '00:00',
            range: ['男', '女'],
            funList: [
                {
                    name: "账号资料",
                    val: '',
                    to: '',
                    plr: '请输入姓名',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100'
                },
                {
                    name: "账号注销",
                    val: '',
                    plr: '请输入邮箱',
                    to: '',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/coupon.png?x-oss-process=image/quality,Q_100'

                },
                {
                    name: "我的订单",
                    plr: '请选择性别',
                    val: '男',
                    to: '',
                    type1: 'sex',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/archives.png?x-oss-process=image/quality,Q_100'

                },
                {
                    name: "语言设置",
                    plr: '请选择出生日期',
                    val: '2010-01-01',
                    to: '',
                    type1: 'date',
                    type: 'picker',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/help.png?x-oss-process=image/quality,Q_100'

                },
                {
                    name: "关于我们",
                    val: '',
                    plr: '请选择出生地区',
                    type1: 'region',
                    to: '/pages/aboutUs/aboutUs',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/aboutUs.png?x-oss-process=image/quality,Q_100'

                },


            ]
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
        toFN(url) {
            uni.navigateTo({
                url
            });
        },
    },
}
</script>
<style lang='scss'>
#setting {
    padding-top: 103rpx;

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
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/settingBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        margin: 0 17rpx;
        padding: 29rpx 0 90rpx;

        .list {
            height: 93rpx;
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
        text-decoration: underline;
    }

}
</style>