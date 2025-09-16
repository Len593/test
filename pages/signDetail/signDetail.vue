<!--
 * @Author: fujihang
 * @Date: 2025-01-25 16:48:58
 * @LastEditTime: 2025-04-04 16:36:36
 * @Description: 咨询 签的详情
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='signDetail' class="mtBg">
        <topBar title="" :showImg="true"></topBar>

        <view class="detail">
            <view class="name s31 c1">
                第{{ qian }}簽 {{ dataInfo.guanyin.title }}
            </view>
            <view class="det s27 cf">

            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
        </view>
        <view class="detail" v-for="(item, index) in dataInfo.guanyin.content">
            <view class="name s31 c1">
                {{ index }}
            </view>
            <view class="det s27 cf" >
                {{ item }}
            </view>
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
        </view>

    </view>
</template>
<script>
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
import topBar from '../../components/topBar.vue'

export default {
    components:{
        topBar
    },
    data() {
        return {
            dataInfo: uni.getStorageSync('solveSign') || {},
            qian: '',
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        this.qian = this.twoDigitToChineseFixed(this.dataInfo.id)

    },
    methods: {
        twoDigitToChineseFixed(num) {
            if (num < 10) {
                return numToChinese[num]
            }
            if (num > 99) {
                throw new Error('输入的数字必须是两位数');
            }

            const tensDigit = Math.floor(num / 10);
            const unitsDigit = num % 10;

            let result = '';
            if (tensDigit === 1) {
                if (unitsDigit === 0) {
                    result = '十';
                } else {
                    result = `十一${unitsDigit === 0 ? '' : numToChinese[unitsDigit]}`;
                }
            } else {
                result = `${numToChinese[tensDigit]}十${unitsDigit === 0 ? '' : numToChinese[unitsDigit]}`;
            }

            return result;
        }
    },
}
</script>
<style lang='scss'>
page{
	background-size: 100% auto;
    overflow: auto;
    height: 100%;
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/cqBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-position-y: -6rpx;

}
#signDetail {
    height: 100vh;
    width: 100vw;
    background: none !important;
    // background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    // background-size: 100% auto;
    .detail {
        position: relative;
        background: #171B24;
        margin: 0 17rpx 19rpx;
        padding: 36rpx 32rpx;

        .name {
            margin-bottom: 25rpx;
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
    }
}
</style>