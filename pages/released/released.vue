<!--
 * @Author: fujihang
 * @Date: 2025-01-23 17:10:10
 * @LastEditTime: 2025-02-15 11:56:26
 * @Description: 发布宣传
-->
<template>
    <view   :style="'font-family:' + (fontfamily)" id='released'>
        <topBar title="发布宣传" :showImg="false"></topBar>
        <view class="bgRel c1 s27">
            <view style="position: relative;z-index: 2;">
                <view class="tip flex-a" style="margin-bottom: 30rpx;">
                    <view class="c1 " style="margin-right: 20rpx;">标题</view>
                    <input type="text" class="f1 s29" v-model="title" placeholder="请输入标题" />
                </view>

                <view class="title c1">内容</view>
                <view style="width: 670rpx; height: 248rpx; position: relative">
                    <textarea v-model="momentText" class="cf s27" :show-count="false" placeholder="请填写备注内容"
                        :maxlength="50" placeholder-style="font-size:27rpx;color:#ccc;">
                </textarea>
                    <view style="
                position: absolute;
                bottom: 27rpx;
                right: 28rpx;
                font-size: 24rpx;
                color: #a8a8a8;
                ">
                        {{ momentText.length > 300 ? 300 : momentText.length }}/300
                    </view>
                </view>
                <view class="tip flex-a" style="margin-top: 20rpx;">
                    <view class="c1  f1">选择主题</view>
                    <picker class="cf" @change="changeFN" mode="selector" :value="topicTitle" range-key="topicTitle"
                        :range="range">
                        {{ topicTitle || '请选择主题' }}
                    </picker>
                </view>
                <view class="tip">图片</view>
                <view class="tipList flex">
                    <span style="position: relative;" v-for="(item, index) in imgList" :key="item">
                        <image :src="item" mode="aspectFill" @click="chooseImgFN" />
                        <icon class="icon" @click="delFN(index)" type="cancel" size="16" />

                    </span>

                    <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/image.png?x-oss-process=image/quality,Q_100" v-if="imgList.length < 9" mode="aspectFill" @click="chooseImgFN" />
                </view>
                <view class="tip">视频</view>
                <view class="tipList flex">
                    <span v-if="videoUrl" style="position: relative;">
                        <image :src="videoUrl + '?x-oss-process=video/snapshot,t_10,f_jpg,w_800,h_600,m_fast'"
                            mode="aspectFill" @click="chooseVideoFN" />
                        <icon class="icon" @click="delVideoFN" type="cancel" size="16" />
                    </span>


                    <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/image.png?x-oss-process=image/quality,Q_100" mode="aspectFill" @click="chooseVideoFN" />
                </view>
            </view>

            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100" mode="widthFix" />
            </view>
        </view>

        <!--  -->

        <!--  -->
        <view class="btnV flex-a fw">

            <view class="btn tc s38 " @click="okFN">确认</view>

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
            momentText: '',
            range: [],
            topicId: '',
            topicTitle: '',
            momentText: '',
            title: '',
            imgList: [],
            videoUrl: '',
            duration:'',
        }
    },
        computed: {
        fontfamily() {
            return this.$store.state.fontfamily
        },
    },
    onLoad() {
        this.getData()
    },
    methods: {
        delVideoFN() {
            this.videoUrl = ''
        },
        delFN(index) {
            this.imgList.splice(index, 1)
        },
        chooseVideoFN() {
            if (this.imgList.length) return uni.showToast({
                title: '图片和视频只能选择一个',
                icon: 'none'
            })
            let that=this
            uni.chooseVideo({
                sourceType: ['camera', 'album'],
                success: (resj) => {
                    uni.showLoading({
                        title: '上传中'
                    })
                    console.log(resj,'----resj');
                    this.duration=resj.duration
                    uni.uploadFile({
                        url:that.baseUrl+ '/calculate-api/api/secure/file/uploadFile',
                        filePath: resj.tempFilePath,
                        name: 'file',
                        header: {
                            authorization: uni.getStorageSync('token')
                        },
                        formData: {
                            'folderName': "itemcomment",
                        },
                        success: (res) => {
                            uni.hideLoading()
                            var respon = JSON.parse(res.data)
                            if (respon.code == 0) {
                                this.videoUrl = this.baseImg + respon.data
                              
                            }
                            uni.hideLoading()

                        }
                    })
                }
            });
        },
        chooseImgFN() {
            if (this.videoUrl) return uni.showToast({
                title: '图片和视频只能选择一个',
                icon: 'none'
            })
            let that=this
            uni.chooseImage({
                count: 9,
                success: (resj) => {
                    if (this.imgList.length + resj.tempFilePaths.length > 9) return uni.showToast({
                        title: '最多上传9张',
                        icon: 'none'
                    })
                    uni.showLoading({
                        title: '上传中...',
                    })
                    resj.tempFilePaths.map((item, idx) => {
                        uni.uploadFile({
                            url: that.baseUrl+'/calculate-api/api/secure/file/uploadFile',
                            filePath: item,
                            name: 'file',
                            header: {
                                authorization: uni.getStorageSync('token')
                            },
                            formData: {
                                'folderName': "itemcomment",
                            },
                            success: (res) => {
                                uni.hideLoading()
                                console.log(res, '---');

                                var respon = JSON.parse(res.data)
                                if (respon.code == 0) {
                                    this.imgList.push(this.baseImg + respon.data)
                                }
                                if (idx == resj.tempFilePaths.length - 1) {
                                    uni.hideLoading()

                                }
                            }
                        })
                    });



                }
            })
        },
        changeFN(e) {

            this.topicId = this.range[e.detail.value].topicId
            this.topicTitle = this.range[e.detail.value].topicTitle

        },
        getData() {
            this.reqFN({
                url: '/calculate-api/api/secure/community/topic/getDisplayList',
                data: {
                    topicType: 1,
                },
                method: 'GET'
            }).then(res => {
                if (res.data.code == 0) {
                    this.range = res.data.data
                    console.log(this.range, '---22');

                }
            })
        },
        okFN() {
            let momentDetail = []
            if (this.videoUrl) {
                momentDetail.push({
                    videoUrl: this.videoUrl,
                    videoSecond:this.duration,
                })
            } else {
                momentDetail = this.imgList.map(s => {
                    return {
                        imgUrl: s
                    }
                })
            }
            if (!momentDetail.length) return uni.showToast({
                title: '请上传图片或视频',
                icon: 'none'
            })
            if (!this.topicId) return uni.showToast({
                title: '请选择主题',
                icon: 'none'

            })
            if (!this.title) return uni.showToast({
                title: '请输入标题',
                icon: 'none'
            })
            if (!this.momentText) return uni.showToast({
                title: '请输入内容',
                icon: 'none'
            })

            this.reqFN({
                url: '/calculate-api/api/secure/community/moment/publish',
                data: {
                    momentDetail,
                    momentStyle: this.videoUrl ? 2 : 1,
                    title: this.title,
                    momentText: this.momentText,
                    topicId: this.topicId,
                },
            }).then(res => {
                if (res.data.code == 0) {
                    uni.showToast({
                        title: '发布成功',
                        icon: 'none',
                        
                    })

                }
            })
        },
    },
}
</script>
<style lang='scss'>
#released {
    .bgRel {
        padding: 36rpx 29rpx;
        position: relative;
        margin: 160rpx 17rpx 0;
        background: #171b24;

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

    .title {
        margin-bottom: 38rpx;
    }

    .btnV {
        position: fixed;
        bottom: 10vh;
        left: 50%;
        transform: translate(-50%);
        z-index: 7;

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

    .tip {
        margin-bottom: 38rpx;
    }

    .tipList {
        flex-wrap: wrap;

        image {
            height: 122rpx;
            width: 122rpx;
            margin: 0 10rpx 32rpx 0;
        }

        .icon {
            position: absolute;
            top: -5rpx;
            right: 5rpx;
            z-index: 2;
        }
    }
}
</style>