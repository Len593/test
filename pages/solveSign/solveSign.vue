<!--
 * @Author: fujihang
 * @Date: 2025-01-24 16:15:30
 * @LastEditTime: 2025-04-04 16:36:49
 * @Description: 马上解签
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='solveSign'>

        <topBar title="" :showImg="true"></topBar>

        <view v-if="!getQian">
            <!--  -->
            <view class="imgABC flex">

                <image v-if="isShow" :class="['isShow']" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/fortuneBg3.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
                <image v-else :class="['bg3']" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/fortuneBg3.png?x-oss-process=image/quality,Q_100" mode="widthFix" />



            </view>
            <view class="btnV flex-a jc c3">
                <view class="btn tc s38 " @click="go">立即抽签</view>
            </view>


            <view class="bgw" v-if="isShow">

            </view>
        </view>
        <!--  -->
        <view style="height: 100%;background: rgba(0, 0, 0, 0.6);" v-else>


            <view style="height: 30%;"></view>
            <!--  -->
            <view class="sign flex-a">
                <text>第{{ getQian }}签</text>

            </view>

            <!--  -->
            <view class="btnV flex-a jc c3">
                <view class="btn tc s38 " @click="toFN">查看签文</view>
            </view>
        </view>

    </view>
</template>
<script>
import topBar from '../../components/topBar.vue'

const numToChinese = {
    '0': '零',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
    '7': '七',
    '8': '八',
    '9': '九'
};
export default {
    components: {
        topBar
    },
    data() {
        return {
            isShow: false,
            getQian: '',
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        this.dataInfo = uni.getStorageSync('solveSign')

    },

    methods: {
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
                url: '/calculate-api/api/secure/community/home/guanyin',

            }).then(res => {
                this.getQian = this.numberToChinese(123)

                if (res.data.code == 0) {
                    this.getQian = this.numberToChinese(res.data.data.id)
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

        toFN() {
            uni.redirectTo({ url: '/pages/signDetail/signDetail' })
        },

    }
}
</script>
<style lang='scss'>
#solveSign {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/oracleBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    height: 100vh;
    width: 100vw;

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

    .imgABC {
        justify-content: center;

        padding-top: 70%;

        image {
            height: 1rpx;
            width: 550rpx;
        }

        .bg3 {
            height: 1rpx;
            width: 210rpx;

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