<!--
 * @Author: fujihang
 * @Date: 2019-08-22 19:41:20
 * @LastEditTime: 2025-06-17 21:26:19
 * @Description: 首页
-->

<template>
  <view :style="'font-family:' + (fontfamily)" id="homepage" class="mtBg">
    <image style="position: fixed;top: 0;left: 0;width: 100%;height: 100%;z-index: -1"
      src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100"
      mode="widthFix" />
    <!-- <topBar title="算命测算" :showImg="false"></topBar> -->
    <view class="indexLogo flex-a">

      <image src="/static/indexLogo.jpg" mode="widthFix" />
      <view style="background: #936B4C;color: #FFE4C5;padding: 6rpx 10rpx 4rpx;border-radius: 20rpx;" class="s23">农历 {{
        oldCalendar.ganzhi.monthzhi }}月{{ getDayFN(oldCalendar.yinli) }}</view>
    </view>

    <!--  -->
    <view style="padding: 0 20rpx;" class="mb20">

      <swiper indicator-color="#FFE7C4" :style="'border-radius: 20rpx;overflow: hidden;height:' + '396rpx'"
        class="swiper" circular :indicator-dots="true" :autoplay="true" :duration="300">
        <swiper-item @click="towzFN(item.id)" v-for="(item, index) in [
          {
            imgUrl: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/home613.png',
            id: '169'
          },
          {
            imgUrl: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/bbhj.jpg',
            id: '178'
          },
        ]" :key="index">
          <image style="width: 100%;height: 1rpx;" :src="item.imgUrl" mode="widthFix" />

        </swiper-item>
      </swiper>
    </view>



    <!-- <view style="padding: 0 20rpx;" class="mb20">
      <image @click="towzFN" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/home613.png"
        style="width: 100%;height: 1rpx;" mode="widthFix" />
    </view> -->
    <!--  -->
    <view class="funs mb20">
      <view class="tc" @click="toFN(item.to)" v-for="(item, index) in funs" :key="index">

        <image :src="item.img" mode="widthFix" />
        <view class="name s25" style="color: rgb(212 187 159);">{{ item.name }}</view>
      </view>

    </view>
    <!--  -->
    <view class="abc flex-a mb20">
      <image src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/27.png"
        @click="toSwitchFN('/pages/square/square', 'gx')" class="f1" style="height: 1rpx;" mode="widthFix" />
      <view class="f1 flex"
        style="height: 408rpx; margin-left: 20rpx;flex-direction: column;justify-content: space-between; ">
        <image style="width: 100%;height: 1rpx;" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/28.png"
          mode="widthFix" @click="toFN('/pages/AIHand/AIHand')" />
        <image style="width: 100%;height: 1rpx;" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/29.png"
          mode="widthFix" @click="toFN('/pages/AIExplain/AIExplain')" />
      </view>
    </view>
    <!--  -->
    <view class="flex-a mb20" style="padding: 0 20rpx;">
      <image style="width: 100%;height: 1rpx;" src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/30.png"
        mode="widthFix" @click="toSwitchFN('/pages/square/square', 'gf')" />
      <image style="width: 100%;height: 1rpx; margin-left: 20rpx;"
        src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/31.png" mode="widthFix"
        @click="toSwitchFN('/pages/square/square', 'gy')" />
    </view>
    <!--  -->
    <view class="conList">
      <view class="flex-a chooseList">
        <view :class="['child', index == choose && 'childA']" v-for="(item, index) in navList" @click="chooseFN(index)"
          :key="index">
          {{ item.name }}
        </view>
      </view>
      <view class="newList">
        <view :style="'width:' + (item.memberUserService ? '100%' : '48%')"
          v-for="(item, index) in navList[choose].list" :key="index">
          <view class="child flex-a" v-if="item.memberUserService">
            <view class="image_a" @click="toChat(item.memberUserService)">
              <image :src="item.memberUserService.icon" mode="aspectFill" />
              <view class="s22 tc">在线</view>
            </view>
            <view class="f1 m-l-20 s24 " @click="toChat(item.memberUserService)">
              <view class="name s28 mb10">
                {{ item.memberUserService.nickName }}
              </view>
              <view class="flex-a">

                <view class="plCy flex-a c3">
                  <view class="cy">
                    从业 {{ item.memberUserService.workYear }}年，已帮助{{ item.memberUserService.serviceNum }}人
                  </view>
                  <view class="pl">
                    好评率{{ item.memberUserService.score }}
                  </view>
                </view>

              </view>
              <view class="tline" style="-webkit-line-clamp: 1;">
                擅长:{{ item.memberUserService.introduction }}
              </view>
            </view>
          </view>
          <!--  -->
          <view class="childCon childCon1 " @click="toReckon(item)" v-if="item.reckon">
            <image style="width:100%;height: 300rpx;" :src="item.reckon.reckonImgUrl" mode="aspectFill" />

            <view class="val s28 c3 tline" style="height: 80rpx;margin: 10rpx 10rpx 20rpx; -webkit-line-clamp: 2;">{{
              item.reckon.reckonName }}</view>

          </view>
          <!--  -->
          <view class="childCon childCon2 childCon1" v-if="item.moment" @click="toSquare(item.moment)">
            <image style="width:100%;height: 300rpx;" :src="getImgUrl(item.moment)" mode="aspectFill" />
            <view class=" s28 c3 " style="margin: 10rpx 10rpx 20rpx; ">
              <view class="type cf s21 mb10">
                {{ item.moment.title }}
              </view>
              <view class="flex-a s23 c3">
                <image class="head" :src="item.moment.icon" mode="aspectFill" />
                <view class="f1">
                  <!-- 阿达 -->
                  {{ item.moment.nickName }}
                </view>
                <image class="dz"
                  src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/zhang.png?x-oss-process=image/quality,Q_100"
                  mode="widthFix" />
                <!-- 1 -->
                {{ item.moment.likeCount }}
              </view>

            </view>


          </view>

        </view>


      </view>


    </view>

    <!--  -->
    <!-- <view class="bazi cf s29" @click="toccc">
      <view class="topView flex-a">
        <view class="f1">
          <view class="time">
            {{ oldCalendar.yangli }}
            <text class="s31 ml10">
              {{ oldCalendar.xingqi }}
            </text>

          </view>
          <view class="val s21">
            {{ oldCalendar.wuxing }}
          </view>
        </view>
        <view class="btn tc s29 c3">八字排盘</view>
      </view>
      <view class="num_shiyi flex-a">
        <view class="f1 cf">
          <view style="font-size: 122rpx">{{ day }}</view>
          <view class="s29">农历 {{ oldCalendar.ganzhi.monthzhi }}月{{ getDayFN(oldCalendar.yinli) }}</view>
        </view>
        <view class="bgC s21 cf flex jc">
          <view class="img_val flex-a">
            <image
              src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/yi.png?x-oss-process=image/quality,Q_100"
              mode="widthFix" />
            <view class="f1 tline" style="padding-right: 20rpx;    -webkit-line-clamp: 2;">
              {{ oldCalendar.yi }}

            </view>
          </view>
          <view class="img_val flex-a">
            <image
              src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/ji.png?x-oss-process=image/quality,Q_100"
              mode="widthFix" />
            <view class="f1 tline" style="padding-right: 20rpx;    -webkit-line-clamp: 2;">
              {{ oldCalendar.ji }}
            </view>
          </view>
        </view>
      </view>
      <view class="angle">
        <image :class="'img' + item" :key="item" v-for="item in 4"
          src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
          mode="widthFix" />
      </view>
    </view> -->

    <!--  -->
    <!-- <view class="funList flex-a" @click="toPage">
      <view class="f1" style="margin-right: 36rpx;" @click.stop="toPageFN('/pages/fortune/fortune')">
        <view class="nowDay">
          <view class="name cf s31">今日运势</view>
          <view class="btn c3 s23 tc">
            摇签
          </view>
          <view class="angle">
            <image :class="'img' + item" :key="item" v-for="item in 4"
              src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
              mode="widthFix" />
          </view>
        </view>

      </view>
      <view class="flex" style="height:353rpx;flex-direction: column;justify-content: space-between;">
        <view class="child c1 flex jc gy" @click.stop="toPageFN('/pages/solveSign/solveSign')">
          <view class="name s27">观音灵签</view>
          <view class="val s21">一事一签测先机</view>
          <view class="angle">
            <image :class="'img' + item" :key="item" v-for="item in 4"
              src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
              mode="widthFix" />
          </view>
        </view>
        <view class="child c1 flex jc qf" @click.stop="toPageFN('/pages/beacon/beacon')">
          <view class="name s27">祈福广场</view>
          <view class="val s21">许愿祈福必备</view>
          <view class="angle">
            <image :class="'img' + item" :key="item" v-for="item in 4"
              src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle.png?x-oss-process=image/quality,Q_100"
              mode="widthFix" />
          </view>
        </view>
      </view>
    </view> -->
    <!--  -->
    <!-- <view
      :style="'background:' + (bgTop ? 'rgba(24, 27, 37,1 );' : 'none;') + 'position: sticky;top: 140rpx;left: 0;z-index: 2;'">

      <navTab :list="navList" @choose="chooseFN">
      </navTab>
    </view> -->


    <!--  -->
    <!-- <view class="contentList" @cliick="toAAA()">
      <view class="leftList">
        <view v-for="(item, index) in navList[choose].list" :key="index">

          <view class="childCon childCon0 s29 c3 tc " v-if="item.memberUserService"
            @click="toChat(item.memberUserService)">
            <view class="flex-a jc">
              <view class="btnC">
                1V1私聊
              </view>
            </view>
            <view class="tc">
              <image :src="item.memberUserService.icon" mode="aspectFill" />
            </view>
            <view class="name mb10">{{ item.memberUserService.nickName }}</view>
            <view class="val s21 mb10 tline" style="-webkit-line-clamp: 2;">
              {{ item.memberUserService.introduction }}
            </view>
            <view class="flex-a s21 c3">
              <view class="f1  " style="text-align: left;">
                服务：
                <text style="color: rgba(48,39,29,0.77);margin-left: 4rpx;">{{ item.memberUserService.consultPrice
                }}</text>
              </view>
              <view class="val">
                评分：
                <text class="s29" style="color: #DC0000;margin-left: 4rpx;">{{ item.memberUserService.score }}</text>
              </view>
            </view>

          </view>
          <view class="childCon childCon1 bgLine" @click="toReckon(item)"
            :style="'background:url(' + item.reckon.reckonImgUrl + ') no-repeat;background-size:90%'"
            v-if="item.reckon">
            <view style="flex-direction: column;justify-content: space-between; min-height: 323rpx;" class="flex ">
              <view class="btn s23 c3 tc">
      
              </view>
              <view class="val s21 cf tline" style="-webkit-line-clamp: 1;">{{ item.reckon.reckonName }}</view>

            </view>
            <view class="angle">
              <image :class="'img' + item" :key="item" v-for="item in 4"
                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                mode="widthFix" />
            </view>
          </view>
          <view class="childCon childCon2"
            :style="'background:url(' + getImgUrl(item.moment) + ') no-repeat;background-size:100%'" v-if="item.moment"
            @click="toSquare(item.moment)">
            <view class="flex aaa">
              <view class="btn c3">
                文章动态
              </view>
              <view class="f1">
              </view>

              <view class="type cf s21 mb10">
                {{ item.moment.title }}
              </view>
              <view class="flex-a s23 c1">
                <image class="head" :src="item.moment.icon" mode="aspectFill" />
                <view class="f1">
                  {{ item.moment.nickName }}
                </view>
                <image class="dz"
                  src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/zhang.png?x-oss-process=image/quality,Q_100"
                  mode="widthFix" />
                {{ item.moment.likeCount }}
              </view>

            </view>
          </view>
        </view>

      </view>
      <view class="rightList">
        <view v-for="(item, index) in navList[choose].list2" :key="index">

          <view class="childCon childCon0 s29 c3 tc " v-if="item.memberUserService"
            @click="toChat(item.memberUserService)">
            <view class="flex-a jc">
              <view class="btnC">
                1V1私聊
              </view>
            </view>
            <view class="tc">
              <image :src="item.memberUserService.icon" mode="aspectFill" />
            </view>
            <view class="name mb10 ">{{ item.memberUserService.nickName }}</view>
            <view class="val s21 mb10 tline" style="-webkit-line-clamp: 2;">
              {{ item.memberUserService.introduction }}
            </view>
            <view class="flex-a s21 c3">
              <view class="f1" style="text-align: left;">
                服务：
                <text style="color: rgba(48,39,29,0.77);margin-left: 4rpx;">{{ item.memberUserService.consultPrice
                }}</text>
              </view>
              <view class="val">
                评分：
                <text class="s29 " style="color: #DC0000;margin-left: 4rpx;">{{ item.memberUserService.score }}</text>
              </view>
            </view>
            <view class="angle">
              <image :class="'img' + item" :key="item" v-for="item in 4"
                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                mode="widthFix" />
            </view>
          </view>
          <view class="childCon childCon1 bgLine" @click="toReckon(item)"
            :style="'background:url(' + item.reckon.reckonImgUrl + ') no-repeat;background-size:90%'"
            v-if="item.reckon">
            <view style="flex-direction: column;justify-content: space-between; min-height: 323rpx;" class="flex ">
              <view class="btn s23 c3 tc">
        
              </view>
              <view class="val s21 cf tline" style="-webkit-line-clamp: 1;">{{ item.reckon.reckonName }}</view>

            </view>
            <view class="angle">
              <image :class="'img' + item" :key="item" v-for="item in 4"
                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                mode="widthFix" />
            </view>
          </view>
          <view class="childCon childCon2"
            :style="'background:url(' + getImgUrl(item.moment) + ') no-repeat;background-size:100%'" v-if="item.moment"
            @click="toSquare(item.moment)">
            <view class="flex aaa">
              <view class="btn c3">
                文章动态
              </view>
              <view class="f1">
              </view>

              <view class="type cf s21 mb10">
                {{ item.moment.title }}
              </view>
              <view class="flex-a s23 c1">
                <image class="head" :src="item.moment.icon" mode="aspectFill" />
                <view class="f1">
                  {{ item.moment.nickName }}
                </view>
                <image class="dz"
                  src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/zhang.png?x-oss-process=image/quality,Q_100"
                  mode="widthFix" />
                {{ item.moment.likeCount }}
              </view>

            </view>
          </view>
        </view>
      </view>
    </view> -->
    <view style="height: 200rpx;clear: both;"></view>
    <!--  -->

    <tabbar to="/pages/index/index"></tabbar>
    <!--  -->
    <fuUpdate :showPopup.sync="showObj.show" @okFN="downloadFN" :title="showObj.title"></fuUpdate>
  </view>

</template>
<script>
import tabbar from '../../components/tabbar.vue'
import navTab from '../../components/navTab.vue'
import topBar from '../../components/topBar.vue'
import fuUpdate from '../../components/fuUpdate.vue'
export default {
  components: {
    tabbar, navTab, topBar, fuUpdate
  },
  data() {
    return {
      showObj: {
        show: false,
        title: "",
      },
      navList: [
        {
          name: "名师推荐",
          list: [],
          list2: [],
          page: 1,
          post: '1',
        },
        {
          name: "情感咨询",
          list: [],
          list2: [],
          page: 1,
          post: '2',
        },
        {
          name: "运势咨询",
          list: [],
          list2: [],
          page: 1,
          post: '3',
        }, {
          name: " 测算法会",
          list: [],
          list2: [],
          page: 1,
          post: '4',
        }
      ],
      choose: 0,
      downloadLink: '',
      oldCalendar: {
        ganzhi: '',
      },
      day: '',
      bgTop: false,
      funs: [
        {
          img: "https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/1.png",
          to: '/pages/baZi/baZi',
          name: "八字排盘",
        },
        {
          img: "https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/2.png",
          to: '/pages/fortune/fortune',
          name: "今日运势",
        },
        {
          img: "https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/3.png",
          to: '/pages/solveSign/solveSign',
          name: "观音灵签",
        },
        {
          img: "https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/4.png",
          to: '/pages/beacon/beacon',
          name: "祈福广场",
        },
        {
          img: "https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/a/5.png",
          // to: '/pages/prophetDate/prophetDate'
          to: '/pages/constellationGuide/constellationGuide',
          name: "星座指南",
        },
      ],
      intFN: '',
    }
  },
  onPageScroll(e) { //nvue暂不支持滚动监听，可用bindingx代替

    if (e.scrollTop > 414) {
      this.bgTop = true
    } else this.bgTop = false
  },
  onPullDownRefresh() {
    this.navList = [
      {
        name: "名师推荐",
        list: [],
        list2: [],
        page: 1,
        post: '1',
      },
      {
        name: "情感咨询",
        list: [],
        list2: [],
        page: 1,
        post: '2',
      },
      {
        name: "运势咨询",
        list: [],
        list2: [],
        page: 1,
        post: '3',
      }, {
        name: "测算法会",
        list: [],
        list2: [],
        page: 1,
        post: '4',
      }
    ]
    this.homePageFN()
    setTimeout(() => {
      uni.stopPullDownRefresh();

    }, 1000);
  },
  methods: {
    getNewFN() {
      this.reqFN({
        url: '/calculate-api/api/secure/message/cloudMessage/client/countAllUnreadMessage',
        method: 'GET'
      }).then(res => {
        if (res.data.code == 0) {
          this.$store.commit('setNewsValFN', res.data.data)
        }
      })
    },
    towzFN(id) {
      this.reqFN({
        url: `/calculate-api/api/secure/community/moment/getMomentDetail?momentId=${id}`,
        data: {},
        method: 'GET'
      }).then(res => {
        if (res.data.code == 0) {
          uni.setStorageSync('square', res.data.data)
          uni.navigateTo({
            url: '/pages/squareDetail/squareDetail'
          })
        }
      })
    },
    toSwitchFN(url, type) {
      uni.setStorageSync('squareType', type)
      uni.switchTab({ url })
    },
    wkfFN() {
      uni.showToast({
        title: '暂未开放',
        icon: 'none',
      })
    },
    toFN(url) {
      uni.navigateTo({
        url
      })
    },
    getDayFN(str) {
      if (!str) return ''
      return str.split('月')[1].split('日')[0]
    },
    toReckon(item) {
      uni.setStorageSync('reckon', item.reckon)
      if (item.reckon.yuanFenJuType == 14) {
        uni.navigateTo({
          url: '/pages/draw/draw'
        })
      }
      if (item.reckon.yuanFenJuType == 13 || item.reckon.yuanFenJuType == 3) {
        uni.navigateTo({
          url: '/pages/otherBg/otherBg'
        })
      }

    },
    formatDateToYYYYDDMM() {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      this.day = day
      return `${year}-${month}-${day}`;
    },
    getNowFN() {
      console.log(this.formatDateToYYYYDDMM(), '----this.formatDateToYYYYDDMM()');

      this.reqFN({
        url: '/calculate-api/api/secure/community/home/oldCalendar?queryTime=' + this.formatDateToYYYYDDMM(),
        method: 'GET'
      }).then(res => {
        console.log(res, '--oldCalendar-');

        if (res.data.code == 0) {
          this.oldCalendar = res.data.data || {}
        }
      })


    },
    getImgUrl(item) {
      console.log(item, '-getImgUrl--');
      return ''
      if (!item.momentDetailList || !item.momentDetailList[0]) return ''
      if (item.momentDetailList[0] && item.momentDetailList[0].videoUrl) {
        return item.momentDetailList[0].videoUrl + '?x-oss-process=video/snapshot,t_10,f_jpg,m_fast'
      } else {
        return item.momentDetailList[0].imgUrl
      }
    },
    toSquare(item) {
      uni.setStorageSync('square', item)
      uni.navigateTo({
        url: '/pages/squareDetail/squareDetail'
      })
    },
    toChat(item) {
      uni.setStorageSync('teachDetail', item)
      uni.navigateTo({
        url: '/pages/chat/chat'
      });
    },
    toPageFN(url) {
      uni.navigateTo({
        url
      })
    },
    homePageFN() {
      let { post, page } = this.navList[this.choose]
      this.reqFN({
        url: `/calculate-api/api/secure/community/home/homePage?pageSize=10&tab=${post}&pageNum=${page}`,
        data: {


        },
        method: 'GET'
      }).then(res => {
        console.log(res, '----');
        if (res.data.code == 0) {
          let pd = 0
          if (page == 1) {
            this.navList[this.choose].list = []
            // this.navList[this.choose].list2 = []
          }
          res.data.data.list.forEach(s => {
            // if (pd % 2 == 0) {
            //   this.navList[this.choose].list.push(s)
            // } else {
            //   this.navList[this.choose].list2.push(s)

            // }
            this.navList[this.choose].list.push(s)
            pd++
          })
          console.log(this.navList, '--navList--');


        }
      })
    },
    toAAA() {
      uni.removeStorageSync('myArchivers')

      uni.navigateTo({
        url: '/pages/chat/chat'
      })
    },
    toPage() {
      uni.navigateTo({
        url: '/pages/chat/chat'
      })
    },
    toccc() {
      uni.navigateTo({ url: '/pages/baZiPai/baZiPai' })
      //      uni.removeStorageSync('token')
      // uni.removeStorageSync('memberCloudToken')
      // uni.navigateTo({
      //   url:'/pages/login/login'
      // })
    },
    getVersionFN() {
      console.log('getVersionFN');
      this.reqFN({
        url: '/calculate-api/api/checkVersion',
        method: 'GET'
      }).then(res => {
        if (res.code == 0) {
          // res.data.releaseVersion,
          this.downloadLink = res.data.downloadLink
          const version = plus.runtime.version;

          if (res.data.releaseVersion && res.data.releaseVersion != version) {
            this.showObj = {
              show: true,
              title: "",
            }
          }

        }
      })
    },
    downloadFN() {
      if (this.downloadLink) {
        plus.runtime.openURL(this.downloadLink)

      } else {
        uni.showToast({
          title: '请去谷歌商店更新',
          icon: 'none',

        })
      }

    },
    chooseFN(index) {
      this.choose = index
      this.navList[this.choose].page = 1
      this.homePageFN()
    },
  },
  computed: {
    fontfamily() {
      return this.$store.state.fontfamily
    },
  },
  onShow() {
    if (process.env.NODE_ENV === 'development') {
      console.log('开发环境');// 发布到生产环境时，此处代码会被摇树移除掉。
    } else {
      clearInterval(this.intFN)
      this.intFN = setInterval(() => {
        this.getNewFN()
      }, 5000)
    }
    this.chooseFN(this.choose)
  },
  onLoad(options) {



    this.getVersionFN()
    uni.hideTabBar({
      fail: err => {
        console.log(err, '---');

      }
    })
    this.homePageFN()
    this.getNowFN()

  },
  onReachBottom() {


  }
}
</script>
<style lang="scss">
page {
  background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
  background-size: 100% auto;
  height: 100%;

  overflow-y: scroll;

}

#homepage {

  background-size: 100% auto;
  padding-top: 160rpx;

  // 
  .conList {
    border-radius: 30rpx;
    background: linear-gradient(180deg, #FFE4AF 0.15%, #FFF 19.31%);
    padding: 20rpx;
    margin: 30rpx 20rpx 20rpx;

    .chooseList {
      justify-content: space-around;

      .child {
        padding: 16rpx 8rpx;
        border-radius: 8rpx;
        font-size: 32rpx;
        color: #936B4C;
      }

      .childA {
        background: #936B4C;
        color: #fff;
      }
    }

    // 
    .newList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;

      .child {
        margin-top: 20rpx;
        padding: 38rpx 25rpx 32rpx;
        border-radius: 24rpx;
        border: 2rpx solid #FFE8BB;
        background: #FFF3E7;

        .plCy {
          background: #3c2e1721;

          border-radius: 8rpx;
          margin-bottom: 20rpx;

          view {
            padding: 0 10rpx;
            height: 40rpx;
            line-height: 44rpx;
          }

          .pl {

            background: #FF9C5D;
            color: #fff;
            margin-left: 10rpx;
            padding: 0 16rpx;
            border-radius: 8rpx;

          }
        }

        .image_a {
          margin-right: 20rpx;

          image {
            height: 140rpx;
            width: 140rpx;
            border-radius: 50%;
          }

          view {
            width: 100rpx;
            padding: 8rpx 0 4rpx;
            border-radius: 32rpx;
            margin: 0 auto;
            color: #fff;
            background: #5AC29D;
            margin-top: -30rpx;
            position: relative;
            z-index: 2;
          }
        }
      }
    }
  }

  .funs {
    padding: 0 20rpx;
    display: flex;
    justify-content: space-between;

    image {
      height: 1rpx;
      width: 82rpx;
      margin-bottom: 10rpx;
    }
  }

  .abc {
    padding: 0 20rpx;

  }

  .indexLogo {
    position: fixed;
    left: 5%;
    // transform: translateX(-50%);
    top: 60rpx;
    z-index: 4;
    width: 90%;
    justify-content: space-between;

    image {
      height: 1rpx;
      width: 240rpx;
    }
  }

  .bazi {
    position: relative;
    margin: 52rpx 32rpx;
    padding: 38rpx 32rpx;
    background: rgba(201, 143, 83, .2);

    &::before {
      position: absolute;
      border: 1rpx solid #E6A058;

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

    .topView {
      .btn {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/beaconBtn.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        width: 254rpx;
        height: 87rpx;
        line-height: 87rpx;
      }

      .time {
        margin-bottom: 4rpx;
      }

      .val {
        color: rgba(255, 255, 255, .6);
      }
    }

    .num_shiyi {
      .bgC {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/bazhiBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        width: 372rpx;
        height: 179rpx;
        padding-left: 45rpx;
        flex-direction: column;

        .img_val {
          margin: 8rpx 0;

          image {
            height: 1rpx;
            width: 33rpx;
            margin-right: 16rpx;
          }
        }
      }
    }

    .angle {
      image {
        position: absolute;
        height: 1rpx;
        width: 60rpx;
        z-index: 3;
      }

      .img1 {
        top: -9rpx;
        left: -9rpx;
      }

      .img2 {
        top: -9rpx;
        right: -9rpx;
        transform: rotateZ(90deg);
      }

      .img3 {
        bottom: -9rpx;
        left: -9rpx;
        transform: rotateZ(270deg);

      }

      .img4 {
        bottom: -9rpx;
        right: -9rpx;
        transform: rotateZ(180deg);

      }
    }
  }

  // 
  .funList {
    padding: 0 19rpx;

    .nowDay {
      width: 339rpx;
      height: 353rpx;
      position: relative;
      padding: 21rpx 25rpx;
      background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/jinri.png?x-oss-process=image/quality,Q_100) no-repeat;
      background-size: 100% auto;

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

      .btn {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/choupai.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        width: 127rpx;
        height: 42rpx;
        line-height: 44rpx;
        margin-top: 210rpx;
      }

    }

    .gy {
      background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/lingqian.png?x-oss-process=image/quality,Q_100) no-repeat;

    }

    .qf {
      background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/qifu.png?x-oss-process=image/quality,Q_100) no-repeat;

    }

    .gy,
    .qf {
      background-size: 100% auto;
    }

    .child {
      height: 162rpx;
      width: 339rpx;
      position: relative;
      padding: 0 29rpx;
      flex-direction: column;

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
    }
  }

  ::v-deep .fuNavTab {
    padding: 53rpx 0 15rpx;

    .child {
      font-size: 29rpx !important;
      font-weight: 400 !important;
    }
  }

  ::v-deep .topBar {
    padding-bottom: 10rpx;
    background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
    background-size: 100% auto;
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

  // 
  .contentList {
    clear: both;

    .leftList,
    .rightList {
      width: 50%;
    }


    .childCon {
      margin: 0 19rpx 20rpx;
      position: relative;
      padding: 19rpx 0;


      // &::before,
      // &::after {
      //   position: absolute;
      //   border: 1rpx solid rgba(226, 204, 192, 0.4);

      //   content: ' ';
      // }

      // &::before {
      //   height: calc(100% - 2rpx);
      //   width: calc(100% - 2rpx);
      //   top: 0;
      //   left: 0;

      // }

      // &::after {
      //   height: calc(100% - 10rpx);
      //   width: calc(100% - 10rpx);
      //   top: 4rpx;
      //   left: 4rpx;
      // }

      .btnC {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/btnBg.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        width: 254rpx;
        height: 87rpx;
        line-height: 87rpx;
        margin-bottom: 10rpx;
      }

      .tc {
        margin-bottom: 10rpx;

        image {
          width: 126rpx;
          height: 126rpx;
          border-radius: 50%;
          border: 2rpx solid #000;
        }
      }
    }

    .childCon0 {
      background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/indexTeaBg.png?x-oss-process=image/quality,Q_100);
      background-size: 100% auto;
      min-height: 417rpx;
      padding: 18rpx 30rpx 30rpx;

      &::before,
      &::after {
        display: none;
      }

      .val {}
    }



    .leftList {
      float: left;
    }

    .rightList {
      float: right;
    }

    .childCon2 {
      padding: 48rpx 38rpx;
      min-height: 327rpx;

      .aaa {
        flex-direction: column;
        height: 263rpx;
      }

      .btn {
        background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/tips.png?x-oss-process=image/quality,Q_100) no-repeat;
        background-size: 100% auto;
        width: 127rpx;
        height: 42rpx;
        line-height: 52rpx;
        font-size: 21rpx;
        text-align: center;
      }

      .head {
        border-radius: 50%;
        width: 50rpx;
        height: 50rpx;
        margin-right: 15rpx;
      }

      .dz {
        height: 1rpx;
        width: 31rpx;
        margin-right: 4rpx;
      }
    }
  }

  // 
  .childCon2 {


    .aaa {
      flex-direction: column;
      height: 263rpx;
    }

    .btn {
      background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/tips.png?x-oss-process=image/quality,Q_100) no-repeat;
      background-size: 100% auto;
      width: 127rpx;
      height: 42rpx;
      line-height: 52rpx;
      font-size: 21rpx;
      text-align: center;
    }

    .head {
      border-radius: 50%;
      width: 50rpx;
      height: 50rpx;
      margin-right: 15rpx;
    }

    .dz {
      height: 1rpx;
      width: 31rpx;
      margin-right: 4rpx;
    }
  }

  .childCon1 {
    // padding: 48rpx 38rpx 20rpx;
    min-height: 323rpx;
    // background-position-x: 18rpx !important;
    // background-position-y: 14rpx !important;
    margin-top: 20rpx;
    border-radius: 32rpx;
    border: 1rpx solid #dddddd;
    overflow: hidden;

    .btn {
      // background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/choupai.png?x-oss-process=image/quality,Q_100) no-repeat;
      // background-size: 100% auto;
      width: 127rpx;
      height: 42rpx;
      line-height: 44rpx;
    }
  }
}
</style>