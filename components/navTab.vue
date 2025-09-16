<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:53:39
 * @LastEditTime: 2025-02-19 23:14:31
 * @Description: 标签切换功能
-->
<template>
    <view class="fuNavTab">


        <scroll-view v-if="isMoreTab" :show-scrollbar="true" :scroll-with-animation="true" :scroll-x="true" class="navTapCom navTapCom1  s29"
            :scroll-into-view="'index' + choose">
            <view :class="['child tc c2 fw isMoreTab', choose == index ? 'choose' : 'chooseNot']"
                @click="chooseFN(item, index)" v-for="(item, index) in list" :key="index">
                <view>
                    {{ item.name }}
                </view>
                <image class="chooseImg" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/chooseImg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>

        </scroll-view>
        <!--  -->
        <view v-else  class="navTapCom navTapCom2 flex s29"
            >
            <view :class="['child tc c2 fw f1', choose == index ? 'choose' : 'chooseNot']"
                @click="chooseFN(item, index)" v-for="(item, index) in list" :key="index">
                <view>
                    {{ item.name }}
                </view>
                <image class="chooseImg" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/chooseImg.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
        </view>
    </view>

</template>
<script>
export default {
    props: ['list', 'isMoreTab'],
    data() {
        return {
            choose: 0,

        }
    },
    methods: {
        chooseFN(item, index) {
            this.$emit('choose', { item, index })
            this.choose = index
        }
    },
}
</script>
<style lang='scss'>
.navTapCom {
    padding: 0 15rpx;
    text-align: center;
    // border-bottom: 1rpx solid #eee;
    overflow-y: hidden;
    overflow-x: scroll !important;
    white-space: nowrap;

    .child {
        // min-width: 158rpx;

        font-size: 32rpx;
        position: relative;
        display: inline-block !important;
        transition: .3s;

        .chooseImg {
            height: 1rpx;
            width: 137rpx;
            opacity: 0;
            // transition: .3s;
        }
    }

    .isMoreTab {
        min-width: 180rpx;
    }


    .chooseNot {
        color: #ffe7cb82;
    }

    .choose {
        .chooseImg {
            opacity: 1;
        }
    }

}
.navTapCom1{
    width: 100vw;
}
.navTapCom2{
    width: 100%;
    padding:  0 40rpx;
}
</style>