<!--
 * @Author: fujihang
 * @Date: 2025-01-16 20:55:25
 * @LastEditTime: 2025-06-14 21:15:42
 * @Description: 
-->
<template>
    <view class="tabbar flex-a">
        <view class="child flex-a jc tc f1" v-for="(item, index) in list" :key="item.to" @click="toFN(item.to)">
            <view class="num tc s21" v-if="index == 3 && num != 0">
                {{ num > 99 ? 99 : num }}
            </view>
            <view :class="['img',]">
                <image :class="[index == 2 && 'dhua', index == 2 && to == item.to && 'imgA']"
                    :src="(to == item.to ? item.imga : item.img)" :mode="'heightFix'" />
            </view>
            <view :class="['name s28', to == item.to && 'nameA']">
                {{ item.name || '' }}
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: [
        'to'
    ],
    data() {
        return {
       
            list: [
                {
                    name: "首页",
                    img: '/static/tabbar/home.png',
                    imga: '/static/tabbar/home_a.png',
                    to: '/pages/index/index',
                },
                {
                    name: "广场",
                    img: '/static/tabbar/square.png',
                    imga: '/static/tabbar/square_a.png',
                    to: '/pages/square/square',
                },
                {
                    name: "咨询",
                    img: '/static/tabbar/gossip.png?1',
                    imga: '/static/tabbar/gossip_a.png',
                    to: '/pages/consult/consult',
                },
                {
                    name: "消息",
                    img: '/static/tabbar/new.png',
                    imga: '/static/tabbar/new_a.png',
                    to: '/pages/news/news',
                },
                {
                    name: "我的",
                    img: '/static/tabbar/my.png',
                    imga: '/static/tabbar/my_a.png',
                    to: '/pages/my/my',
                },
            ]
        }
    },
    created() {
        console.log('---2323');


    },
    computed:{
        num(){
            return this.$store.state.newsVal||0
        }
    },
    methods: {
        toFN(url) {
            uni.switchTab({
                url
            });
        },
   
    },
}
</script>
<style lang='scss'>
.tabbar {
    position: fixed;
    left: 0;
    z-index: 3;
    width: 100%;

    // background: url(/static/tabbar/TabBar.svg) no-repeat;
    // background-size: 100% auto;

    background: #19181E;
    // bottom: 30rpx;
    bottom: -2rpx;
    justify-content: space-around;
    height: 170rpx;
    padding: 0 26rpx;
    box-sizing: border-box;

    .child {

        flex-direction: column;
        position: relative;

        // align-items:flex-end;
        .num {
            position: absolute;
            background: #f29202;

            border-radius: 50%;
            height: 38rpx;
            width: 38rpx;
            line-height: 38rpx;
            top: 0;
            right: 0;
        }

        .img {
            margin-bottom: 10rpx;
            height: 94rpx;
        }

        .imgA {
            margin-top: -40rpx;
            height: 100rpx !important;
        }

        image {
            height: 54rpx;
            width: 1rpx;
        }

        .dhua {
            height: 64rpx;
            animation: test infinite linear 1s;
        }

        .name {
            margin-top: -25rpx;
            color: #776F6E;
        }

        .nameA {
            color: #FFE4C5;
        }
    }



}

@keyframes test {
    0% {
        transform: rotateZ(0);
    }

    100% {
        transform: rotateZ(360deg);

    }
}
</style>