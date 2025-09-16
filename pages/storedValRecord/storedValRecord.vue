<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:52:28
 * @LastEditTime: 2025-06-08 16:04:34
 * @Description: 储值记录
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='storedValRecord' class="mtBg">
        <topBar title="储值记录" :showImg="true"></topBar>

        <navTab :list="navList" @choose="chooseFN"></navTab>
        <!-- <view class="noMore">
            <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/noMore.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
        </view> -->
        <!--  -->
        <view class="list c1 s21" v-for="(item, index) in navList[choose].list" :key="index">
            <view class="top flex-a mb10" style="margin-bottom: 8rpx;">
                <text class="f1 s31 fw ">
                 {{ item.remark }}
                </text>
                <text class="s23">{{ item.createTime }}</text>
            </view>
            <view class="flex-a s27">
                <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/money.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
                {{ item.amount }}
            </view>
        </view>
        <view class=" tc s21 c1" v-if="navList[choose].pageNum == 'finsh'">
            没有更多的了~
        </view>

    </view>
</template>
<script>
import navTab from '../../components/navTab.vue'
import topBar from '../../components/topBar.vue'

export default {
    components: {
        navTab, topBar
    },
    data() {
        return {
            navList: [
                {
                    name: "增值记录",
                    list: [],
                    pageNum: 1,
                    post: '',
                },
                {
                    name: "赠送记录",
                    list: [],
                    pageNum: 1,
                    post: '',
                },
                {
                    name: "消费记录",
                    list: [],
                    pageNum: 1,
                    post: '',
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
        this.getListFN()
        console.log('---2-');

    },
    methods: {
        chooseFN({ item, index }) {
            console.log(item, index);
            this.choose = index
            this.getListFN()
        },
        getListFN() {
            if (this.navList[this.choose].pageNum == 'finsh') return
            let data = {
                pageNum: this.navList[this.choose].pageNum,
                pageSize: 20,
                type: this.choose + 1,
            }
            this.reqFN({
                url: '/calculate-api/api/secure/oms/wallet/pageFlowRecord',
                data,
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    if (this.navList[this.choose].pageNum == 1) {
                        this.navList[this.choose].list = []
                    }
                    res.data.data.list.forEach(s => {

                        this.navList[this.choose].list.push(s)
                    })
                    // this.navList[this.choose].list = [...this.navList[this.choose].list, ...]
                    if (this.navList[this.choose].pageNum < res.data.data.totalPage) {
                        this.navList[this.choose].pageNum += 1
                    } else {
                        this.navList[this.choose].pageNum = 'finsh'
                    }
                }
            })
        },
    },
}
</script>
<style lang='scss'>
page {	background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
	background-size: 100% auto;
    overflow: auto;
    height: 100%;
}

#storedValRecord {
    .list {
        padding: 30rpx 50rpx;

        image {
            height: 1rpx;
            width: 31rpx;
            margin-right: 13rpx;
        }
    }
}
</style>