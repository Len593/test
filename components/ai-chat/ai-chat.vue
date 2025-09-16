<template>
  <view
    class="container"
    :style="{ height: containerHeight + 'px' }"
    v-if="!(option.stream && uniPlatform == 'app')"
  >
    <scroll-view
      class="chat_top_box"
      scroll-y="true"
      :scroll-top="scrollTop"
      @scroll="onScroll"
    >
      <view class="chat_list">
        <view
          class="chat_bubble_box"
          :class="item.role === 'user' ? 'textRight' : ''"
          v-for="(item, index) in chatListData"
          :key="index"
        >
          <image
            v-if="item.role !== 'user'"
            class="avatar"
            src="/static/deepseek.png"
          />
          <view
            :class="item.role === 'user' ? 'chat_bubble_right' : 'chat_bubble'"
          >
            <mark-view :markdown="item.content"></mark-view>
          </view>
          <image
            v-if="item.role === 'user'"
            class="avatar"
            src="/static/user.png"
          />
        </view>
        <view class="typing-indicator" v-if="isLoading">
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
      </view>
    </scroll-view>
    <view class="chat_bottom_box">
      <view class="input-container">
        <textarea
          class="chat-input"
          v-model="keyword"
          placeholder="请输入您的问题"
          :disabled="isLoading"
          :adjust-position="adjustPosition"
          @keypress.enter.prevent="sendDeepseek"
        ></textarea>
        <view
          @click="sendDeepseek"
          class="send-button"
          :class="{ disabled: isLoading || !keyword.trim() }"
        >
          <image
            style="width: 100%; height: 100%"
            class="send-icon"
            src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/liaotian/aiexplain-send.svg"
            mode="widthFix"
          />
        </view>
      </view>
    </view>
  </view>
  <web-view
    ref="webviewRef"
    :src="'/hybrid/html/index.html?option=' + JSON.stringify(option)"
    @message="onMessage"
    v-else
  ></web-view>
</template>
<script>
import "../../utils/textDecoder";
import markView from "@/components/mark-view/mark-view.vue";
import axios from "axios";
export default {
  name: "ai-chat",
  components: {},
  props: {
    option: Object,
  },
  emits: [],
  data() {
    return {
      chatListData: [
        {
          role: "deepseek",
          content: "您好，我是DeepSeek，您的AI助手，很高兴可以为你服务",
        },
      ],
      keyword: "",
      isLoading: false,
      containerHeight: 0,
      keyboardHeight: 0,
      adjustPosition: false,
      currentStreamingMessage: "",
      scrollTop: 0,
      triggered: false,
      uniPlatform: uni.getSystemInfoSync().uniPlatform,
    };
  },
  watch: {
    chatListData: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      },
      deep: true,
    },
  },
  created() {
    // 监听键盘高度变化
    uni.onKeyboardHeightChange((res) => {
      this.keyboardHeight = res.height;
      // 更新容器高度
      const systemInfo = uni.getSystemInfoSync();
      this.containerHeight =
        systemInfo.windowHeight - (res.height > 0 ? res.height : 0);
    });
  },
  mounted() {
    const systemInfo = uni.getSystemInfoSync();
    this.containerHeight = systemInfo.windowHeight;

    // 设置系统导航栏标题
    uni.setNavigationBarTitle({
      title: "DeepSeek助手",
    });
  },
  methods: {
    onMessage(e) {
      const type = e.detail.data[0].type;
      if (type === "goBack") {
        uni.navigateBack();
      }
    },
    // 发送
    async sendDeepseek() {
      if (this.isLoading || !this.keyword.trim()) return;

      const currentMessage = this.keyword.trim();
      let aiMessageIndex = this.chatListData.length;
      // 添加用户消息到显示列表
      const userMessage = {
        role: "user",
        // 并用命理大师的语气，
        content:
          "你是专业的命理大师，根据以下内容算命或算运：" + currentMessage,
      };
      this.chatListData.push(userMessage);
      this.scrollToBottom();

      this.keyword = "";
      this.isLoading = true;

      let _this = this;

      if (this.option.stream) {
        // 添加AI空消息
        aiMessageIndex = this.chatListData.length;
        this.chatListData.push({
          type: "deepseek",
          content: "",
        });
      }

      try {
        if (
          !this.option.stream ||
          (this.option.stream &&
            uni.getSystemInfoSync().uniPlatform == "mp-weixin")
        ) {
          //非流式 或者微信小程序 流式处理
          const requestTask = uni.request({
            url: this.option.apiUrl,
            method: "POST",
            header: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.option.apiKey}`, // 官网申请的API key 有次数上限 换成自己的即可
            },
            data: {
              model: this.option.apiModel,
              // 请求数据
              messages: [userMessage],
              stream: this.option.stream,
              max_tokens: 8192,
            },
            enableChunked: this.option.stream,
            success: (res) => {
              _this.isLoading = false;
              // #ifdef MP-WEIXIN
              if (_this.option.stream) {
                return;
              }
              // #endif
              if (typeof res.data == "object") {
                _this.chatListData.push(res.data.choices[0].message);
              } else {
                _this.$set(
                  _this.chatListData[aiMessageIndex],
                  "content",
                  `抱歉，服务暂时不可用，请稍后再试。\n错误信息：${res.data}`
                );
              }
              _this.scrollToBottom();
            },
            fail: (err) => {
              _this.$set(
                _this.chatListData[aiMessageIndex],
                "content",
                `抱歉，服务暂时不可用，请稍后再试。\n错误信息：${err.errMsg}`
              );
              _this.scrollToBottom();
            },
            complete: () => {
              _this.isLoading = false;
              _this.scrollToBottom();
            },
          });
          // 监听数据块
          // #ifdef MP-WEIXIN
          requestTask.onChunkReceived((response) => {
            try {
              const chunk = new TextDecoder().decode(response.data);
              const lines = chunk.split("\n");
              for (const line of lines) {
                if (line.trim() === "") continue;
                if (line.startsWith("data: ")) {
                  const jsonStr = line.slice(6);
                  if (jsonStr.trim() === "[DONE]") continue;

                  try {
                    const data = JSON.parse(jsonStr);
                    if (
                      data.choices &&
                      data.choices[0].delta &&
                      data.choices[0].delta.content
                    ) {
                      const content = data.choices[0].delta.content;
                      // 更新显示的消息
                      this.$set(
                        this.chatListData[aiMessageIndex],
                        "content",
                        this.chatListData[aiMessageIndex].content + content
                      );

                      this.scrollToBottom();
                    }
                  } catch (e) {
                    console.error("解析JSON数据出错:", e, jsonStr);
                  }
                }
              }
            } catch (e) {
              console.error("处理数据块出错:", e);
            }
          });
          // #endif
        } else {
          //H5 流式处理
          axios({
            method: "post",
            url: this.option.apiUrl,
            responseType: "stream", // or 'blob' depending on your needs
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${this.option.apiKey}`, // 官网申请的API key 有次数上限 换成自己的即可
              Accept: "text/event-stream",
            },
            data: {
              model: this.option.apiModel,
              // 请求数据
              messages: [userMessage],
              stream: this.option.stream,
              max_tokens: 8192,
            },
            adapter: "fetch",
          }).then(async (response) => {
            const stream = response.data;
            // consume response
            const reader = stream
              .pipeThrough(new TextDecoderStream())
              .getReader();
            while (true) {
              const { value, done } = await reader.read();
              if (done) {
                _this.isLoading = false;
                break;
              }
              try {
                const chunk = value;
                const lines = chunk.split("\n");
                for (const line of lines) {
                  if (line.trim() === "") continue;
                  if (line.startsWith("data: ")) {
                    const jsonStr = line.slice(6);
                    if (jsonStr.trim() === "[DONE]") continue;

                    try {
                      const data = JSON.parse(jsonStr);
                      if (
                        data.choices &&
                        data.choices[0].delta &&
                        data.choices[0].delta.content
                      ) {
                        const content = data.choices[0].delta.content;
                        // 更新显示的消息
                        this.$set(
                          this.chatListData[aiMessageIndex],
                          "content",
                          this.chatListData[aiMessageIndex].content + content
                        );

                        this.scrollToBottom();
                      }
                    } catch (e) {
                      console.error("解析JSON数据出错:", e, jsonStr);
                    }
                  }
                }
              } catch (e) {
                console.error("处理数据块出错:", e);
              }
            }
          });
        }
      } catch (error) {
        console.error("API请求错误:", error);
        this.$set(
          this.chatListData[aiMessageIndex],
          "content",
          `抱歉，服务暂时不可用，请稍后再试。\n错误信息：${error.message}`
        );
        this.isLoading = false;
        this.scrollToBottom();
      }
    },
    // 添加格式化消息的方法
    formatMessage(message) {
      if (!message) return "";

      // 将文本转换为HTML
      let formattedText = message
        // 处理标题
        .replace(/^###\s+(.+)$/gm, "<h3>$1</h3>") // 三级标题
        .replace(/^##\s+(.+)$/gm, "<h2>$1</h2>") // 二级标题
        .replace(/^#\s+(.+)$/gm, "<h1>$1</h1>") // 一级标题
        // 处理换行
        .replace(/\n/g, "<br>");

      return formattedText;
    },
    scrollToBottom() {
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".chat_list")
        .boundingClientRect((res) => {
          if (res) {
            this.scrollTop = res.height;
          }
        })
        .exec();
    },

    onScroll(e) {
      // console.log('滚动事件：', e.detail);
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  background: #fff;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.chat_top_box {
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  position: relative;
  background: #f8f8f8;
}

.chat_list {
  padding: 10px 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.chat_bubble_box {
  display: flex;
  align-items: flex-start;
  margin: 16px 0;
  padding: 0 16px;

  &.textRight {
    justify-content: flex-end;

    .chat_bubble_right {
      margin-right: 8px;
      margin-left: 0;
    }

    .avatar {
      margin: 0;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.chat_bottom_box {
  position: relative;
  z-index: 100;
  background: #fff;
  border-top: 1px solid #f0f0f0;
  padding: 10px 16px;
}

.input-container {
  display: flex;
  align-items: center;
  background: #f5f5f5;
  border-radius: 16px;
  padding: 4px 8px;
  transition: all 0.3s ease;
}

.chat-input {
  flex: 1;
  min-height: 16px;
  max-height: 80px;
  font-size: 14px;
  line-height: 18px;
  padding: 4px 0;
  background: transparent;
  border: none;
}

.send-button {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #007aff;
  border-radius: 14px;
  margin-left: 6px;

  &.disabled {
    background: #ccc;
    opacity: 0.7;
  }
}

.send-icon {
  width: 16px;
  height: 16px;
}

.chat_bubble {
  max-width: 80%;
  background: #fff;
  border-radius: 12px;
  // padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-left: 8px;
  white-space: pre-wrap;
  word-wrap: break-word;

  ::v-deep {
    h1,
    h2,
    h3 {
      margin: 0;
      font-weight: 600;
      line-height: 1.4;
    }

    h1 {
      font-size: 18px;
      margin-bottom: 8px;
    }

    h2 {
      font-size: 16px;
      margin-bottom: 6px;
    }

    h3 {
      font-size: 15px;
      margin-bottom: 4px;
    }

    br {
      display: block;
      margin: 8px 0;
    }
  }
}

.chat_bubble_right {
  max-width: 80%;
  background: #007aff;
  color: #fff;
  border-radius: 12px;
  // padding: 12px 16px;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  white-space: pre-wrap;
  word-wrap: break-word;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 16px;
  flex-shrink: 0;
}

.typing-indicator {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin-left: 48px;

  .dot {
    width: 8px;
    height: 8px;
    background: #999;
    border-radius: 50%;
    margin: 0 2px;
    animation: typing 1s infinite ease-in-out;

    &:nth-child(1) {
      animation-delay: 0.2s;
    }

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes typing {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}
</style>
