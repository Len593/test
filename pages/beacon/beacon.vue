<!--
 * @Author: fujihang
 * @Date: 2025-01-24 10:06:26
 * @LastEditTime: 2025-06-15 14:36:50
 * @Description: 我的明灯
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='beacon'>
        <topBar title="" :showImg="true"></topBar>

        <view class="navTapCom navTapCom2 flex s29">
            <view :class="['child flex-a tc c2 fw f1', choose == index ? 'choose' : 'chooseNot']"
                @click="chooseFN(item, index)" v-for="(item, index) in list" :key="index">
                <image class="chooseImg"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/beacon.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
                <view>
                    {{ item.name }}
                </view>
            </view>
        </view>
        <!--  -->
        <view class="bgCC">

            <view class="beaList flex">
                <view class="child s23 fw tc flex-a" v-for="(item, index) in list[choose].data" @click="toFN(item)"
                    :key="index">
                    <view class="name s27 c1">{{ item.prayName }}</view>
                    <view class="img">

                        <image
                            :src="item.prayImage ? (item.prayImage + '?x-oss-process=image/quality,Q_100') : getImg(index)"
                            mode="heightFix" />
                    </view>
                    <view class="btn c3 ">
                        点灯
                    </view>
                </view>
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
            list: [
                {
                    name: '请灯阁',
                    data: [],
                    post: 1,
                    index: '',
                },
                {
                    name: '我的明灯',
                    data: [],
                    post: 1,
                    index: '',
                },
            ],
            choose: 0,
        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {



    },
    onShow() {
        this.getData()
        this.getData2()
    },
    methods: {
        toFN(item) {
            uni.setStorageSync('lighting', item)
            uni.navigateTo({ url: '/pages/lighting/lighting' })
        },
        getImg(index) {
            return `https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/lin${index % 3}.png?x-oss-process=image/quality,Q_100`
        },

        chooseFN(item, index) {
            this.choose = index
            console.log(this.choose);

        },
        getData() {
            this.reqFN({
                url: '/calculate-api/api/secure/community/praySquare/getPrayTypeList',
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.list[0].data = res.data.data

                }
            })
        },
        getData2() {
            this.reqFN({
                url: '/calculate-api/api/secure/community/praySquare/prayHistory',
                data: {
                    pageNum: 1,
                    pageSize: 1000,
                },
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.list[1].data = res.data.data.list

                }
            })
        }

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

#beacon {
    margin-top: 100rpx;

    .navTapCom {
        padding: 0 62rpx 0 170rpx;
        margin-bottom: 30rpx;

        .child {
            // min-width: 158rpx;
            opacity: .5;
            font-size: 31rpx;
            position: relative;
            transition: .3s;
            filter: grayscale(40%);
            z-index: 9;

            .chooseImg {
                height: 1rpx;
                width: 108rpx;
            }

            view {
                margin-top: 28rpx;

                margin-left: -48rpx;
            }
        }

        .choose {
            opacity: 1;
        }

        .isMoreTab {
            min-width: 180rpx;
        }
    }

    .bgCC {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/beaconBg.svg);
        background-size: 100% auto;
        min-height: 1300rpx;
    }

    .beaList {
        flex-wrap: wrap;



        .child {
            width: 33.333%;
            flex-direction: column;
            margin: 50rpx 0 0;

            .name {
                // margin-bottom: 20rpx;
            }

            .img {
                image {

                    width: 1rpx;
                    height: 131rpx;
                }


            }

            .btn {
                background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/beaconBtn.png?x-oss-process=image/quality,Q_100) no-repeat;
                background-size: 100% auto;
                width: 123rpx;
                height: 40rpx;
                line-height: 40rpx;
            }
        }
    }

}
</style>