<template>
    <view>
        <web-view :src="url" @error="onError" @message="onMessage"></web-view>
    </view>
</template>

<script>
export default {
    name: 'WebViewPage',
    data() {
        return {
            url: '',
        }
    },
    onLoad({ url }) {
        this.url = decodeURIComponent(url || '')
    },
    methods: {
        onError(event) {
            console.error('WebView error:', event)
        },
        onMessage(event) {
            console.log('Message from WebView:', event.detail.data)
        },
    },
}
</script>