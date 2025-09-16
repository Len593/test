<!--
 * @Author: fujihang
 * @Date: 2025-01-18 15:52:28
 * @LastEditTime: 2025-04-13 00:10:52
 * @Description: 我的订单
-->
<template>
  <aiChat :option="option"></aiChat>
</template>
<script>
import topBar from "../../components/topBar.vue";

import aiChat from "@/components/ai-chat/ai-chat.vue";
export default {
  components: {
    topBar,
    aiChat,
  },
  data() {
    return {
      option: {
        apiUrl: `https://api.deepseek.com/chat/completions`, // deepseek官方提供的接口地址 换成自己的即可
        apiKey: "sk-8b2146e9adc342e5a2236bcf2ba11ff0", // 官网申请的API key 有次数上限 换成自己的即可
        apiModel: "deepseek-chat", // 模型名称，此处仅为示例，请替换为实际使用的模型名称
        stream: true, // 流式传输，此处仅为示例，请根据实际需求选择是否开启
      },
    };
  },
  computed: {
    fontfamily() {
      return this.$store.state.fontfamily;
    },
  },
  onReachBottom() {},
  methods: {},
};
</script>
<style lang="scss">
page {
  background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100)
    no-repeat;
  background-size: 100% auto;
  height: 100%;
  overflow: auto;
}

#storedValRecord {
}
</style>
