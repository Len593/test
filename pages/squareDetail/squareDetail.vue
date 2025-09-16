<!--
 * @Author: fujihang
 * @Date: 2025-01-25 22:34:31
 * @LastEditTime: 2025-06-15 17:45:26
 * @Description: 宣传广场 详情
-->
<template>
    <view :style="'font-family:' + (fontfamily)" id='squareDetail' class="c1">

        <view class="topBar flex-a">
            <view class="bu" @click="backFN">
                <image
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
            <image :src="dataInfo.icon + '?x-oss-process=image/quality,Q_100'" mode="aspectFill" class="head">

            </image>
            <view class="s31">
                {{ dataInfo.nickName }}
            </view>
        </view>

        <view v-if="isVideo" class="videoView">
            <!-- @loadedmetadata="loadedmetadataFN" -->
            <video v-if="!showObj2.show" @fullscreenchange="fullscreenchangeFN" :controls="controls" :duration="1000"
                :autoplay="true" @timeupdate="timeupdateFN" id="myVideo" :src="videoDetail"
                :style="'width: 100%;height:' + swpHeight2">

                <cover-image class="coverImg" @click="quanpingFN"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/quanping.png?x-oss-process=image/quality,Q_100"></cover-image>
            </video>


            <view style="height: 200rpx;"></view>
        </view>
        <swiper v-else indicator-color="#FFE7C4" :style="'height:' + swpHeight" class="swiper" circular
            :indicator-dots="true" :autoplay="false" :duration="300">
            <swiper-item v-for="(item, index) in dataInfo.momentDetailList" :key="index">
                <image style="width: 100%;height: 1rpx;" @load="swpHeightTap" :src="item.imgUrl" mode="widthFix"
                    @click="bigImgFN(index)" />

            </swiper-item>
        </swiper>
        <!--  -->
        <view class="dzhf c1 s30 tc" v-if="isVideo">
            <view class="child" @click="dianzanFN()">
                <image
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/zhang.png?x-oss-process=image/quality,Q_100"
                    :style="'filter: brightness(' + (isLike ? '1' : '0.5') + ')'" mode="widthFix" />
                <view>
                    {{ dataInfo.likeCount }}
                </view>
            </view>
            <view class="child" @click="showSend = !showSend">
                <image
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/newNum.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
                <view>
                    {{ dataInfo.commentCount }}
                </view>
            </view>
        </view>
        <!--  -->
        <view class="fixedBt" v-if="isVideo">
            <view class="title_time">
                <view class="title s27 cf">
                    {{ dataInfo.title }}
                </view>
                <view class="time s23 c1">
                    发布时间： {{ getTimeName(dataInfo.createTime) }}
                </view>
            </view>
            <view class="control flex-a">
                <view class="f1" :style="'font-family:' + (fontfamily)" id="myElement">
                    <view @touchmove="touchmoveFN" class="dian" :style="{ left: dianLeft + 'px' }"></view>
                </view>
                <view>
                    {{ dianLeftTip }}/{{ durationTip }}
                </view>
            </view>
        </view>
        <!--  -->
        <view class="content" v-else>

            <view class="title s38">
                {{ dataInfo.title }}
            </view>
            <view class="cf s27">
                <view v-html="handleFN(dataInfo.momentText)"></view>

            </view>
            <view class="fun flex-a s23">
                <template @click="dianzanFN">
                    <image
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/zhang.png?x-oss-process=image/quality,Q_100"
                        :style="'filter: brightness(' + (isLike ? '1' : '0.5') + ')'" mode="widthFix" />
                    {{ dataInfo.likeCount }}
                </template>
                <view style="width: 40rpx;"></view>
                <template @click="commentFN">
                    <image
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/newNum.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                    {{ dataInfo.commentCount }}
                </template>

            </view>
        </view>

        <!-- 评价 -->
        <view class="comContent" :style="'padding-top:' + (isVideo ? '100rpx' : '0')">
            <view class="list c1 flex" v-for="(item, index) in comList" @click="comBackFN(item)" :key="index">
                <image :src="item.icon + '?x-oss-process=image/quality,Q_100'" class="headimg" mode="aspectFill" />
                <view class="f1">

                    <view class="head_time flex-a">
                        <view class="name s31 f1">{{ item.userName }}</view>
                        <view class="time s23">
                            {{ getTimeName(item.createTime) }}
                        </view>
                    </view>
                    <view class="value cf s27">
                        {{ item.commentText }}
                    </view>
                    <view class="fun flex-a s23">
                        <template @click.stop="dianzanFN">
                            <image
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/zhang.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                            {{ item.likeCount }}
                        </template>
                        <view style="width: 40rpx;"></view>
                        <template>
                            <image
                                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/newNum.png?x-oss-process=image/quality,Q_100"
                                mode="widthFix" />
                            {{ item.commentCount }}
                        </template>
                    </view>
                    <view class="callBack s23 flex-a" style="color: rgba(255, 232, 206, 0.50);">
                        <image :src="item.icon + '?x-oss-process=image/quality,Q_100'" mode="aspectFill" />
                        查看全部回复
                    </view>
                </view>

            </view>
        </view>

        <view style="height: 200rpx;"></view>


        <!--  -->
        <view class="inputSend flex-a" v-if="showSend">
            <view class="zhang" @click="dianzanFN()">
                <image
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/zhang.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix"
                    :style="'filter: brightness(' + (showObj2.show ? (diz ? '1' : '0.5') : (isLike ? '1' : '0.5')) + ');'" />
                <view class="name s21 cf" v-if="showObj2.show">点赞</view>
                <view class="name s21 cf" v-else>点赞</view>
            </view>
            <view class="f1 input flex-a">
                <input v-model="commentText" style="width: 100%;position: relative;z-index: 3;" type="text"
                    placeholder="请输入">
                <view class="angle">
                    <image :class="'img' + item" :key="item" v-for="item in 4"
                        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                        mode="widthFix" />
                </view>
            </view>
            <view class="send s31" @click="sendFN">
                发送
            </view>
        </view>

        <!--  -->
        <fuPopup :showPopup.sync="showObj2.show" :title="showObj2.title">
            <view class="comContent">
                <view class="list c1 flex" v-for="(item, index) in comSubList" :key="index">
                    <image :src="item.icon + '?x-oss-process=image/quality,Q_100'" class="headimg" mode="aspectFill" />
                    <view class="f1">

                        <view class="head_time flex-a">
                            <view class="name s31 f1">{{ item.userName }}</view>
                            <view class="time s23">
                                {{ getTimeName(item.createTime) }}
                            </view>
                        </view>
                        <view class="value cf s27">
                            {{ item.commentText }}
                        </view>

                    </view>

                </view>
                <view style="color: #999;" class="tc p10 s23" v-if="!comSubList.length">
                    没有更多的
                </view>
            </view>



        </fuPopup>
        <image
        @load="swpHeightTap2" 
            v-if="videoDetail"
            style="height: 0rpx;width: 0rpx;"
            :src="videoDetail+'?x-oss-process=video/snapshot,t_10,f_jpg,m_fast'"
       
        />
    </view>
</template>
<script>
import fuPopup from '../../components/fuPopup2.vue'
export default {
    components: {
        fuPopup
    },
    data() {
        return {
            showObj2: {
                title: '评论回复',
                show: false,
            },
            videoContext: '',
            duration: 0,
            durationTip: 0,
            dianLeft: 0,
            dianLeftTip: '00:00',
            widthTip: 0,
            videoDetail: '',
            dataInfo: '',
            isVideo: false,
            replyUserName: '',
            replyUserId: '',
            replyCommentId: '',
            commentText: '',
            pageNum: 1,
            comList: [],
            comSubList: [],
            isLike: false,
            diz: false,
            isLikeHC: false,
            showSend: true,
            controls: false,
            swpHeight: '300rpx',
            swpHeight2:'300rpx',
        }
    },
    computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
        videoHei(){

        },
    },
    onLoad() {
        this.videoContext = uni.createVideoContext('myVideo')
        console.log(this.videoContext, '----videoContext');

        uni.removeStorageSync('isLikeHC')
        uni.removeStorageSync('commentCount')

        this.dataInfo = uni.getStorageSync('square')
        this.dataInfo.momentDetailList.forEach(s => {
            console.log(s.videoUrl, '---');

            if (s.videoUrl) {
                this.isVideo = true
                this.showSend = false
                this.videoDetail = s.videoUrl
                setTimeout(() => {
                    const query = uni.createSelectorQuery().in(this);
                    query.select('#myElement').boundingClientRect(data => {
                        this.widthTip = data.width
                    }).exec();
                }, 1000)
                console.log('videoSecond',s.videoSecond);
                
                this.duration = s.videoSecond

                this.durationTip = this.formatSecondsToHHMMSS(s.videoSecond)
                console.log(this.duration, '---durationTip--', this.durationTip);


            }
        })
        this.isDianZanFN()
        this.getFirstCommentFN()
    },
    onReachBottom() {
        if (this.pageNum == 'finsh') return
        this.pageNum++
        this.getFirstCommentFN()
    },
    methods: {
        swpHeightTap(e) {
            var winWid = uni.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
            var imgh = e.detail.height; //图片高度
            var imgw = e.detail.width; //图片宽度
            console.log(winWid, '----', imgh, imgw);

            this.swpHeight = (winWid * imgh) / imgw + 'px';
            //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度 ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度

        },
        swpHeightTap2(e){
            var winWid = uni.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
            var imgh = e.detail.height; //图片高度
            var imgw = e.detail.width; //图片宽度
            console.log(winWid, '----', imgh, imgw);

            this.swpHeight2 = (winWid * imgh) / imgw + 'px';
        },
        handleFN(val) {
            return val.replace(/\n/g, '</br>')
        },
        bigImgFN(current) {
            let urls = this.dataInfo.momentDetailList.map(s => s.imgUrl)
            uni.previewImage({
                urls,
                current: current + 1,

            });

        },
        fullscreenchangeFN(e) {
            this.controls = e.detail.fullScreen


        },
        formatSecondsToHHMMSS(seconds) {
            // 计算小时数
            const hours = Math.floor(seconds / 3600);
            // 计算剩余的分钟数（不包括小时部分）
            const minutes = Math.floor((seconds % 3600) / 60);
            // 计算剩余的秒数
            const secs = (seconds % 60).toFixed(0);
            // 确保分钟数和秒数都是两位数，不足则前面补0
            const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
            let secsStr = secs < 10 ? '0' + secs : secs.toString();
            // 返回格式化的字符串

            if (hours) {
                return hours.toString() + ':' + minutesStr + ':' + secsStr

            } else {
                return minutesStr + ':' + secsStr

            }
        },
        backFN() {
            uni.navigateBack({
                delta: 1, fail: err => {


                }
            })
        },
        // 评论别人评论
        comBackFN(item) {
            this.showObj2.show = true
            this.showObj2.commentId = item.commentId
            this.replyCommentId = item.commentId
            this.replyUserName = item.userName
            this.replyUserId = item.userId
            this.targetId = item.targetId
            this.comSubList = []
            this.getSubComFN()
            this.isDian2ZanFN()
        },
        getSubComFN() {
            this.reqFN({
                url: `/calculate-api/api/secure/community/comment/pageSubComment?commentId=${this.showObj2.commentId}&pageNum=1&pageSize=1000`,
                method: 'GET',
            }).then(res => {
                if (res.data.code == 0) {
                    if (this.showObj2.pageNum == 1) this.comSubList = []
                    this.comSubList = [...this.comSubList, ...res.data.data.list]
                    if (this.showObj2.pageNum >= res.data.data.totalPage) this.showObj2.pageNum = 'finsh'
                }
            })
        },
        getFirstCommentFN() {
            this.reqFN({
                url: `/calculate-api/api/secure/community/comment/pageMomentComment?momentId=${this.dataInfo.momentId}&pageNum=${this.pageNum}&pageSize=10`,
                method: 'GET',
            }).then(res => {
                if (res.data.code == 0) {
                    if (this.pageNum == 1) this.comList = []
                    this.comList = [...this.comList, ...res.data.data.list]
                    if (this.pageNum >= res.data.data.totalPage) this.pageNum = 'finsh'
                }
            })
        },
        sendFN() {
            if (!this.commentText) return uni.showToast({
                title: '请输入评论内容',
                icon: 'none'
            })
            this.reqFN({
                url: `/calculate-api/api/secure/community/comment/add`,
                data: {
                    "commentText": this.commentText,
                    "replyCommentId": this.replyCommentId || '',
                    "replyUserId": this.replyUserId || this.dataInfo.userId,
                    "replyUserName": this.replyUserName || '',
                    "targetId": this.targetId || this.dataInfo.momentId
                },
            }).then(res => {
                if (res.data.code == 0) {
                    this.commentText = ''
                    if (this.showObj2.show) {

                        this.replyCommentId = ''
                        this.replyUserName = ''
                        this.replyUserId = ''
                        this.targetId = ''
                        this.comSubList = []
                        this.getSubComFN()
                    } else {
                        this.pageNum = 1
                        this.getFirstCommentFN()
                        this.dataInfo.commentCount += 1
                        uni.setStorageSync('commentCount', this.dataInfo.commentCount)
                    }

                }
            })

        },
        isDianZanFN() {
            this.reqFN({
                url: `/calculate-api/api/secure/community/isLike?targetId=${this.dataInfo.topicId}&likeType=1`,
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.isLike = res.data.data
                    this.isLikeHC = res.data.data
                }

            })
        },
        isDian2ZanFN() {
            this.reqFN({
                url: `/calculate-api/api/secure/community/isLike?targetId=${this.replyCommentId}&likeType=2`,
                method: 'GET'
            }).then(res => {
                console.log(res, '----');
                if (res.data.code == 0) {
                    this.diz = res.data.data
                }

            })
        },
        dianzanFN() {
            this.reqFN({
                url: (this.showObj2.show ? this.diz : this.isLike) ? '/calculate-api/api/secure/community/unlike' : '/calculate-api/api/secure/community/like',
                data: {
                    targetId: this.replyCommentId || this.dataInfo.topicId,
                    likeType: this.showObj2.show ? 2 : 1,
                },
                method: 'POST'
            }).then(res => {
                console.log(res.data);

                if (res.data.code == 0) {
                    if (this.showObj2.show) {
                        this.comList.forEach(s => {
                            if (s.commentId == this.replyCommentId) {
                                if (this.diz) {
                                    s.likeCount -= 1
                                } else {
                                    s.likeCount += 1
                                }
                            }
                        })
                        this.isDian2ZanFN()

                    } else {
                        this.isLike = !this.isLike
                        if (this.isLike) {
                            this.dataInfo.likeCount += 1
                        } else {
                            this.dataInfo.likeCount -= 1
                        }
                        if (this.isLike != this.isLikeHC) {
                            uni.setStorageSync('isLikeHC', this.isLikeHC == true ? 1 : 2)
                        } else {
                            uni.removeStorageSync('isLikeHC')

                        }
                    }
                }
            })
        },
        commentFN() {
            this.reqFN({
                url: '/api/moment/like',
                data: {
                    momentId: this.dataInfo.id
                },
                method: 'POST'
            }).then(res => {

            })
        },


        quanpingFN() {
            this.controls = true
            this.videoContext.requestFullScreen()
        },

        timeupdateFN(event) {

            this.dianLeftTip = this.formatSecondsToHHMMSS(event.detail.currentTime)

         

            this.dianLeft = (event.detail.currentTime / this.duration) * this.widthTip  // 当前时间/总时间*总长度       
        },
        touchmoveFN(event) {
            if (event.changedTouches[0].clientX >= this.widthTip) this.dianLeft = this.widthTip
            else if (event.changedTouches[0].clientX <= 0) this.dianLeft = 0
            else this.dianLeft = event.changedTouches[0].clientX
            this.dianLeftTip = this.formatSecondsToHHMMSS(((this.dianLeft / this.widthTip) * this.duration).toFixed(0))
            this.videoContext.seek((this.dianLeft / this.widthTip * this.duration).toFixed(0))
            this.videoContext.seek((this.dianLeft / this.widthTip * this.duration).toFixed(0))
            this.videoContext.play()
            this.videoContext.play()

        },
        // loadedmetadataFN(event) {
        //     this.duration = event.detail.duration
        //     this.durationTip = this.formatSecondsToHHMMSS(event.detail.duration)
        // },
    },
}
</script>
<style lang='scss'>
page {
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
    height: 100vh;
    overflow: auto;
    background: #181B25;
}

#squareDetail {
    padding-top: 80rpx;

    .topBar {
        padding: 55rpx 35rpx 20rpx;
        position: sticky;
        width: 100vw;
        top: 0;
        left: 0;
        z-index: 99;

        .bu {
            width: 34rpx;

            image {
                height: 1rpx;
                width: 34rpx;
                transform: rotateY(180deg);
            }
        }

        .head {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            border: 2px solid #000000;
            margin: 0 15rpx;
        }
    }

    .title_time {
        margin-bottom: 15rpx;

        .title {
            margin-bottom: 10rpx;
        }
    }

    .swiper {
        image {
            width: 100vw;
            height: 896rpx;
        }
    }

    .dzhf {
        position: fixed;
        right: 20rpx;
        top: 51vh;
        z-index: 3;

        .child {
            margin-bottom: 20rpx;

        }

        image {
            height: 1rpx;
            width: 61rpx;
        }
    }

    .videoView {
        position: relative;
        height: 421rpx;

        #myVideo {
            position: relative;

        }

        .coverImg {
            display: inline-block;
            z-index: 9999;
            position: absolute;
            right: 20rpx;
            bottom: 23rpx;
            height: 61rpx;
            width: 61rpx;

        }
    }

    .fixedBt {
        padding: 10rpx 23rpx 40rpx;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        background: #181B25;
        z-index: 3;
    }

    .control {

        width: 100%;
        overflow: hidden;

        .f1 {
            height: 2rpx;
            background: #C7B29B;
            position: relative;
            margin-right: 20rpx;

            .dian {
                margin: auto;
                top: 0;
                bottom: 0;
                position: absolute;
                border-radius: 50%;
                width: 25rpx;
                height: 25rpx;
                background: #FFD390;
            }
        }
    }

    .fun {
        image {
            height: 1rpx;
            width: 26rpx;
            margin-right: 10rpx;
        }
    }

    .comContent {
        .list {
            padding: 0 53rpx 30rpx;

            .headimg {
                width: 80rpx;
                height: 80rpx;
                border-radius: 50%;
                border: 2px solid #000000;
                margin-right: 15rpx;
            }

            .head_time {
                margin-bottom: 8rpx;
            }

            .value {
                margin-bottom: 17rpx;

            }

            .fun {
                margin-bottom: 20rpx;

            }

            .callBack {
                image {
                    width: 46rpx;
                    height: 46rpx;
                    border-radius: 50%;
                    border: 2px solid #000000;
                    margin-right: 8rpx;
                }
            }
        }

    }

    .content {
        padding: 42rpx 48rpx;

        .title {
            margin-bottom: 20rpx;
        }

        .cf {
            margin-bottom: 16rpx;

        }
    }

    .inputSend {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 9999;
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/sendBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        height: 165rpx;
        width: 100vw;
        padding: 0 50rpx;

        .zhang {
            image {
                height: 1rpx;
                width: 54rpx;
            }

            .name {}

        }

        .input {
            background: rgba(63, 42, 21, .76);
            margin: 0 20rpx;
            height: 73rpx;
            position: relative;
            padding: 0 23rpx;

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

    ::v-deep .alertContent {
        min-height: 80vh !important;
    }
}
</style>