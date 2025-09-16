<!--
 * @Author: fujihang
 * @Date: 2025-01-24 21:10:43
 * @LastEditTime: 2025-06-29 16:59:54
 * @Description: 运势
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='fortune'>
        <topBar title="" :showImg="true"></topBar>

        <view v-if="!getQian">
            <!--  -->
            <view class="img flex">
                <view class="rel">
                    <image
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/fortuneBg2.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                    <image v-if="isShow" :class="['isShow']"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/fortuneBg3.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                    <image v-else :class="['bg3']"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/fortuneBg3.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                    <view class="name c3">运势灵签</view>
                    <view class="btn c1 fw" @click="go">立即抽签</view>
                </view>

            </view>
            <view class="bgw" v-if="isShow">

            </view>
        </view>


        <view v-else="getQian">

            <view style="height: 20%;"></view>
            <!--  -->
            <view class="sign flex-a">
                <text :style="'font-size:' + (getQian.length >= 4 ? '40rpx' : '54rpx') + ';'">第{{ getQian }}签</text>

            </view>
            <!--  -->
            <view class="btnV flex-a jc c3">
                <view class="btn tc s38 " @click="toFN">马上解签</view>
            </view>
        </view>

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
            isShow: false,
            getQian: false,
            qian: '',
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
        toFN() {
            this.reqFN({
                url: '/calculate-api/api/secure/message/ChatList/getDispatchRoom',
                method: 'GET'
            }).then(res => {
                console.log(res, '----运输');

                if (res.data.code == 0) {
                    this.reqFN({
                        url: `/calculate-api/api/secure/member/getMemberUserService?userId=${res.data.data.chatMemberId}`,
                        data: {
                        },
                        method: 'GET'
                    }).then(ces => {


                        if (ces.data.code == 0) {
                            uni.setStorageSync('teachDetail', ces.data.data)
                            uni.redirectTo({ url: '/pages/chat/chat?chatRoomListId=' + res.data.data.chatRoomListId })

                        }
                    })

                }
            })

        },

        numberToChinese(num) {
            const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
            const units = ['', '十', '百'];

            if (num < 0 || num > 999) {
                return '数字超出范围';
            }

            if (num === 0) {
                return chineseNumbers[0];
            }

            let result = '';
            let strNum = num.toString();
            let length = strNum.length;

            for (let i = 0; i < length; i++) {
                let digit = parseInt(strNum[i]);
                let unit = units[length - i - 1];

                if (digit === 0) {
                    // 避免重复的零
                    if (result[result.length - 1] !== chineseNumbers[0]) {
                        result += chineseNumbers[digit];
                    }
                } else {
                    result += chineseNumbers[digit] + unit;
                }
            }

            // 处理以零结尾的情况
            if (result[result.length - 1] === chineseNumbers[0]) {
                result = result.slice(0, -1);
            }

            return result;
        },





        go() {
            this.isShow = true
            this.reqFN({
                url: '/calculate-api/api/secure/community/home/fortune',

            }).then(res => {
                console.log(res, '----运输');

                if (res.data.code == 0) {
                    this.getQian = this.numberToChinese(res.data.data.number)
                    uni.setStorageSync('solveSign', res.data.data)

                }
            })
            // this.reqFN({
            //     url: '/calculate-api/api/secure/community/home/guanyin',

            // }).then(res => {
            //     console.log(res, '---');

            //     if (res.data.code == 0) {
            //         uni.setStorageSync('solveSign', res.data.data)
            //     }
            // })
            // // 
            // setTimeout(()=>{
            //     uni.navigateTo({ url: '/pages/solveSign/solveSign' })
            // },1500)
        },
    },
}
</script>
<style lang='scss'>
page {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/cqBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    height: 100%;
    overflow: auto;
}

#fortune {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/fortuneBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    height: 100vh;
    width: 100vw;
    padding-top: 16vh;


    .sign {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/qianBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        height: 615rpx;
        width: 133rpx;
        margin: 0 auto;
        writing-mode: vertical-rl;
        font-size: 54rpx;
        color: #30271D;

        text {
            margin-top: 70rpx;
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

    .img {
        justify-content: center;

        .rel {
            position: relative;

        }

        image {
            height: 1rpx;
            width: 550rpx;
        }

        .bg3 {
            height: 1rpx;
            width: 210rpx;
            position: absolute;
            top: 300rpx;
            left: 200rpx;
            animation: aa .8s infinite;
        }

        .isShow {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            animation: bb 1s infinite;
            z-index: 3;
            margin: auto;
            width: 300rpx;
            height: 1rpx;
        }

        .name {
            font-size: 46rpx;
            writing-mode: vertical-rl;
            /* 从右到左的竖向书写 */
            text-orientation: upright;
            /* 保持文字直立 */
        }

        .name,
        .btn {
            position: absolute;
        }

        .name {
            width: 40rpx;
            height: 200rpx;
            top: 186rpx;
            left: 74rpx;
        }

        .btn {
            font-size: 46rpx;
            left: 220rpx;
            top: 666rpx;

        }

    }

    .bgw {
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, .6);
    }

}

@keyframes bb {
    0% {
        transform: translateY(0);
    }

    33% {
        transform: translateY(-10rpx);

    }

    66% {
        transform: translateY(25rpx);

    }

    80% {
        transform: translateY(-25rpx);

    }

    100% {
        transform: translateY(10rpx);

    }
}

@keyframes aa {
    0% {
        transform: rotateZ(0);
    }

    33% {
        transform: rotateZ(-10deg);

    }

    66% {
        transform: rotateZ(15deg);

    }

    80% {
        transform: rotateZ(-15deg);

    }

    100% {
        transform: rotateZ(10deg);

    }
}
</style>