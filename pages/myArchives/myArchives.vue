<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:52:28
 * @LastEditTime: 2025-04-04 16:35:29
 * @Description: 我的档案
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='myArchives' class="mtBg">
        <topBar title="我的档案" :showImg="true"></topBar>


        <!--  -->
        <view class="list cf s27" :style="{ transform: `translateX(${item.translateX}rpx)` }"
            @touchstart="handleTouchStart(index, $event)" @touchmove="handleTouchMove(index, $event)"
            @touchend="handleTouchEnd(index, $event)" v-for="(item, index) in list" :key="index"
            @click="chooseFN(item)">
            <view class="f1">
                <view class="name_price fw flex mb10 pr34">
                    <text class=" s38  cf mr10">{{ item.nickName }}</text>
                    <image class="mr10" v-if="item.sex" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/man.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                    <image class="mr10" v-else src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/women.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                    <view class="tips tc c3">{{ ['我的', '亲人', '朋友'][item.archiveType] }}</view>
                </view>
                <view class="timeUse mb10 ">
                    阳历 {{ item.birthday }}
                </view>
                <view class="timeUse ">
                    {{ item.birthplace }}
                </view>

            </view>
            <image class="to" src="" mode="widthFix" />
            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
            <view class="butView" v-if="item.showDelete">
                <view class="flex-a bj f1 c3" @click="editFN(item)">编辑</view>
                <view class="flex-a del f1" @click="delFN(item)">删除</view>
            </view>

        </view>

        <!--  -->
        <view class="noMore" v-if="list.length == 0">
            <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/noMore.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        </view>
        <view style="height: 200rpx;"></view>

        <!--  -->
        <view class="btnV flex-a fw">

            <view class="btn tc s38 " @click="toFN">添加资料</view>

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
            list: [],
            pageNum: 1,
            isChoose: false,
            startX: 0, // 触摸开始时的 X 坐标
            currentIndex: null, // 当前操作的列表项的索引
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad(options) {
        this.isChoose = options.isChoose
        this.getListFN()
    },
    onShow() {
        if (uni.getStorageSync('reccc')) {
            this.pageNum = 1
            this.list=[]
            uni.removeStorageSync('reccc')
            this.getListFN()

        }
    },
    onReachBottom() {
        this.getListFN()
    },
    methods: {
        editFN(item) {
            uni.setStorageSync('editInfor', item)
            uni.navigateTo({
                url: '/pages/editInfor/editInfor'
            })
        },
        delFN(item) {

            this.reqFN({
                url: '/calculate-api/api/secure/member/archive/del?id=' + item.memberArchiveId,
                data: {},
                method: 'delete'
            }).then(res => {
                if (res.data.code == 0) {
                    this.pageNum = 1
                    this.list = []
                    this.getListFN()

                }
            })
        },
        chooseFN(item) {
            if (this.isChoose) {
                uni.setStorageSync('myArchivers', item)
                uni.navigateBack({ delta: 1 })
            }else{

            }

        },
        handleTouchStart(index, event) {
            this.startX = event.touches[0].clientX;
            this.currentIndex = index;
        },
        handleTouchMove(index, event) {
            if (index !== this.currentIndex) return;

            const moveX = event.touches[0].clientX - this.startX;
            const translateX = Math.min(0, moveX); // 保证只向左滑动

            this.$set(this.list, this.currentIndex, {
                ...this.list[this.currentIndex],
                translateX: translateX < -200 ? -200 : translateX,
                showDelete: translateX < -50, // 当滑动距离超过50px时显示删除按钮
            });
        },
        handleTouchEnd(index) {
            if (index !== this.currentIndex) return;

            const item = this.list[this.currentIndex];
            if (item.showDelete) {
                // 这里可以添加删除逻辑，比如发送请求到服务器删除数据
                // 然后从本地列表中移除该项
                this.$set(this.list, this.currentIndex, {
                    ...item,
                    translateX: -200,
                });
            } else {
                // 重置位置
                this.$set(this.list, this.currentIndex, {
                    ...item,
                    translateX: 0,
                    showDelete: false,
                });
            }
            this.currentIndex = null; // 重置当前操作的列表项索引
        },
        toFN() {

            uni.navigateTo({
                url: '/pages/editInfor/editInfor'
            });
        },
        getListFN() {
            if (this.pageNum == 'finsh') return
            let data = {
                pageNum: this.pageNum,
                pageSize: 10,
            }
            this.reqFN({
                url: '/calculate-api/api/secure/member/archive/pageByUserId',
                data,
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    if (this.pageNum == 1) {
                        this.list = []
                    }
                    this.list = [...this.list, ...res.data.data.list,]
                    if (this.pageNum < res.data.data.totalPage) {
                        this.pageNum += 1
                    } else {
                        this.pageNum = 'finsh'
                    }
                }
            })
        },

    },
}
</script>
<style lang='scss'>
page {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    height: 100%;
    overflow: auto;

}

#myArchives {
    padding-top: 210rpx;
    background: linear-gradient(180deg, rgba(24, 27, 37, .8) 0%, rgba(24, 27, 37, 1) 100%);
    min-height: calc(100% - 100rpx);
    overflow-x: hidden;

    .list {
        // background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/couponBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        // background-size: 100% auto;
        transition: .3s;
        height: 256rpx;
        margin: 0 17rpx 30rpx;
        padding: 53rpx 50rpx 40rpx 50rpx;
        position: relative;

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

        .name_price {
            align-items: center;

            image {
                height: 1rpx;
                width: 40rpx;
            }

            .tips {
                background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/tips.png?x-oss-process=image/quality,Q_100) no-repeat;
                background-size: 100%;
                width: 82rpx;
                line-height: 46rpx;
                height: 46rpx;
            }
        }

        .to {
            height: 1rpx;
            width: 40rpx;
        }

        .butView {
            background-color: #A74B42;
            color: #fff;
            position: absolute;
            right: -200rpx;
            display: flex;
            width: 200rpx;
            height: 100%;
            border-radius: 0 20rpx 20rpx;
            font-size: 30rpx;
            top: 0;

            view {
                justify-content: center;
                height: 100%;

            }

            .bj {
                background: #FFE8CE;
            }
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