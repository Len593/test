/*
 * @Author: fujihang
 * @Date: 2023-04-07 15:12:06
 * @LastEditTime: 2025-06-15 19:06:49
 * @Description: 
 */
import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import { reqFN } from './common/req'
import store from './common/store'
import CryptoJS from 'crypto-js';




Vue.prototype.connectFN = async (conVal, that) => {
  await that.engine.disconnect(false);
  let callback = {
    onDatabaseOpened: (res) => {
      //...
    },
    onConnected: (res) => {
      // console.log(res, '--1--onConnected---');


      //...
    }
  };
  // console.log(conVal || uni.getStorageSync('memberCloudToken'), '---conVal---');

  let code = await that.engine.connect(conVal || uni.getStorageSync('memberCloudToken'), 6, callback);


  that.engine.setOnConnectedListener((resr) => {
    //...
    // console.log('setOnConnectedListener', resr);


  });
  that.engine.setOnMessageReceivedListener((resrs) => { //监听获取到的消息
    //...
    // console.log(resrs, '----setOnMessageReceivedListener---');
    store.commit('upNewPushFN', resrs);

  });
}




Vue.config.productionTip = false

Vue.prototype.baseImg = 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/'
// Vue.prototype.baseUrl = 'http://8.138.94.195:8095'

Vue.prototype.baseUrl = 'https://admins.gdxingchuan.com'

// Vue.prototype.baseUrl = ''
Vue.prototype.reqFN = reqFN
Vue.prototype.getTimeName = (val) => {

  
  const date = new Date(val)
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const oneDay = 24 * 60 * 60 * 1000; // 一天的毫秒数
  const oneWeek = 7 * oneDay; // 一周的毫秒数

  // 计算日期差
  const dateDifference = Math.floor((now - date) / oneDay);

  // 根据日期差格式化输出
  if (date.getTime() === today.getTime()) {
    return "今天";
  } else if (dateDifference === 1) {
    return "昨天";
  } else if (dateDifference > 1 && dateDifference < 8) {
    return `${dateDifference}天前`;
  } else if (Math.floor((now - date) / oneWeek) === 1) {
    return "一星期前";
  } else {
    // 如果超过一星期，则显示绝对日期格式
    // const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // return date.toLocaleDateString('zh-CN', options);
    return formatTimestamp(val)

  }



}


function formatTimestamp(timestamp) {
  // 创建一个新的Date对象
  const date = new Date(timestamp);

  // 提取年份、月份、日期、小时和分钟
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以需要加1，并且用padStart确保是两位数
  const day = String(date.getDate()).padStart(2, '0'); // 用padStart确保是两位数
  const hours = String(date.getHours()).padStart(2, '0'); // 用padStart确保是两位数
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 用padStart确保是两位数

  // 拼接成所需的格式
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// 融云
import RCIMIWEngine from "@/uni_modules/RongCloud-IMWrapper-V2/js_sdk/RCIMEngine"


let chatNum = 0
function akc() {


  reqFN({
    url: "/calculate-api/api/secure/sysConfigure/getCloudInfo",
    data: {},
    method: 'GET',
  }).then(res => {
    if (res.data.code == 0) {
      // 解密
      // console.log(res.data.data, '---res.data.data');


      let appKey = decryptAES(res.data.data)
      // console.log(appKey, 'appKey');

      let optionsSW = {}

      RCIMIWEngine.create(appKey, optionsSW).then((res) => {
        // console.log('初始化引擎融云res---')
        Vue.prototype.engine = res


        if (uni.getStorageSync('memberCloudToken')) {
          Vue.prototype.connectFN(uni.getStorageSync('memberCloudToken'), Vue.prototype)
        }
      }).catch(err => {
        if (chatNum < 6) {
          chatNum++
          setTimeout(() => {
            akc()

          }, 1000)
        }
        // console.log(err, '---232--err');

      })

    } else {
      if (chatNum < 6) {
        chatNum++
        setTimeout(() => {
          akc()

        }, 1000)
      }
    }


  })
}

akc()

Vue.prototype.akcFN = () => {

  reqFN({
    url: "/calculate-api/api/secure/sysConfigure/getCloudInfo",
    data: {},
    method: 'GET',
  }).then(res => {
    // console.log('-getCloudInfo---', res);
    if (res.data.code == 0) {
      // 解密
      // console.log(res.data.data, '---res.data.data');


      let appKey = decryptAES(res.data.data)
      // console.log(appKey, '---appKey');

      let optionsSW = {}
      RCIMIWEngine.create(appKey, optionsSW).then(async (res) => {

        Vue.prototype.engine = res


        Vue.prototype.connectFN(uni.getStorageSync('memberCloudToken'), Vue.prototype)

      }).catch(err => {
        if (chatNum < 6) {
          chatNum++
          setTimeout(() => {
            akc()

          }, 1000)
        }
        // console.log(err, '---232--err');

      })

    } else {
      if (chatNum < 6) {
        chatNum++
        setTimeout(() => {
          akc()

        }, 1000)
      }
    }


  })
}



function decryptAES(ciphertext, setSecretKey) {

  let secretKey = setSecretKey || "bmdehs6pbnk2ssfw";
  // console.log(secretKey, '---secretKey');

  // 密钥处理（必须与Java的getBytes(StandardCharsets.UTF_8)一致）
  const key = CryptoJS.enc.Utf8.parse(secretKey);

  // 处理Base64特殊字符（防止URL安全编码干扰）
  const processedText = ciphertext.replace(/-/g, '+').replace(/_/g, '/');

  // 执行解密[2,4](@ref)
  const decrypted = CryptoJS.AES.decrypt(
    processedText,
    key,
    {
      mode: CryptoJS.mode.ECB, // 对应Hutool的默认模式[1](@ref)
      padding: CryptoJS.pad.Pkcs7 // 兼容Java的PKCS5Padding[4](@ref)
    }
  );

  return decrypted.toString(CryptoJS.enc.Utf8);
}
Vue.prototype.toFix = function (a, decimalPlaces = 2, isZheng) {
  if (isZheng) decimalPlaces = Math.abs(decimalPlaces)
  let factor = Math.pow(10, decimalPlaces);
  let result = Math.round(a * factor) / factor;
  return result.toFixed(decimalPlaces);



};
uni.$decryptAES = decryptAES
uni.$baseUrl = Vue.prototype.baseUrl
uni.$baseImg = Vue.prototype.baseImg
uni.$reqFN = reqFN

App.mpType = 'app'
const app = new Vue({
  ...App, store
})

app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif