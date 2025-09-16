<template>
    <view>
        <topBar title="支付结果" :showImg="true"></topBar>
    </view>
</template>

<script>
import topBar from "../../components/topBar.vue"

export default {
    name: 'QRCodePage',
    components: { topBar },
    data() {
        return {
            url: '',
            rechargeRecordId: '',
            interval: null
        }
    },
    onLoad({ url, rechargeRecordId }) {
        this.url = decodeURIComponent(url || '')
        this.rechargeRecordId = rechargeRecordId || ''
        this.interval = setInterval(() => {
            this.checkPaymentStatus()
        }, 3000)
    },
    methods: {
        // 查询支付状态
        async checkPaymentStatus() {

            uni.showLoading({
                title: '正在查询扣款状态，请耐心等待...',
                mask: true
            })

            this.reqFN({
                url: '/calculate-api/api/secure/oms/wallet/queryRechargeRecord?rechargeRecordId=' + this.rechargeRecordId,
                method: 'GET',
                showLoading: true
            }).then(res => {
                if (res.data.code === 0) {
                    switch (res.data.data.rechargeStatus) {
                        case 1:
                            this.postNum += 1
                            if (this.postNum === 60) {
                                uni.hideLoading()
                                clearInterval(this.interval)
                                uni.showToast({
                                    title: '支付超时，请查看是否扣款成功',
                                    icon: 'none',
                                    mask: true
                                })
                            }
                            break;
                        case 2:
                            clearInterval(this.interval)
                            uni.hideLoading()
                            uni.showToast({
                                title: '支付成功',
                                icon: 'none',
                                mask: true
                            })
                            setTimeout(() => {
                                uni.navigateTo({
                                    url: `/pages/myWallet/myWallet`,
                                })
                            }, 3 * 1000)
                            break;
                        case 3:
                            clearInterval(this.interval)
                            uni.hideLoading()
                            uni.showToast({
                                title: '支付失败，请重试',
                                icon: 'none',
                                mask: true
                            })
                            setTimeout(() => {
                                uni.navigateTo({
                                    url: `/pages/myWallet/myWallet`,
                                })
                            }, 3 * 1000)
                            break;
                        case 4:
                            clearInterval(this.interval)
                            uni.hideLoading()
                            uni.showToast({
                                title: '订单已关闭，请重试',
                                icon: 'none',
                                mask: true
                            })
                            setTimeout(() => {
                                uni.navigateTo({
                                    url: `/pages/myWallet/myWallet`,
                                })
                            }, 3 * 1000)
                            break;
                        case 5:
                            clearInterval(this.interval)
                            uni.hideLoading()
                            uni.showToast({
                                title: '订单已退款，请重试',
                                icon: 'none',
                                mask: true
                            })
                            break;

                        case 6:
                            clearInterval(this.interval)
                            uni.hideLoading()
                            uni.showToast({
                                title: '订单已部分退款，请重试',
                                icon: 'none',
                                mask: true
                            })
                            break;
                    }
                } else uni.hideLoading()
            })
        }
    },
}
</script>