<!--
 * @Author: fujihang
 * @Date: 2019-04-01 01:47:12
 * @LastEditTime: 2025-05-22 23:17:11
 * @Description: 
-->

<script>
export default {
	onLaunch: function () {
		setTimeout(() => {

			// uni.loadFontFace({
			// 	global: true,
			// 	family: 'MyTTFFont',
			// 	source: 'url("https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/ft.ttf")',
			// 	success() {
			// 		console.log('successloadFontFace')
			// 	},
			// 	fail: err => {
			// 		console.log(err, '---loadFontFace-11-');

			// 	}
			// })
			// setTimeout(() => {

			// 	uni.loadFontFace({
			// 		global: true,
			// 		family: 'MyTTFFont',
			// 		source: 'url("https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/ft.ttf")',
			// 		success() {
			// 			console.log('successloadFontFace')
			// 		},
			// 		fail: err => {
			// 			console.log(err, '---loadFontFace-11-');

			// 		}
			// 	})
			// }, 4000)
		}, 2000)

		uni.hideTabBar({
			fail: err => {
				// console.log(err, '---');

			}
		})

		let token = uni.getStorageSync('token'), memberCloudToken = uni.getStorageSync('memberCloudToken')
		if (token && memberCloudToken) {
			setTimeout(() => {
				this.connectFN('', this)
			}, 5000)
		}
		// console.log('App Launsdch')
	},
	onShow: function () {
		uni.removeStorageSync('toOk')

		// console.log('App Show')
	},
	onHide: function () {
		// console.log('App Hide')
	}
}
</script>

<style lang="scss">
@font-face {
  font-family: 'ft';
  src: url('/static/ft.TTF') format('truetype');
}
@font-face {
  font-family: 'jt';
  src: url('/static/jt.TTF') format('truetype');
}
page {
	background: url(https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/homeBg.png?x-oss-process=image/quality,Q_100) no-repeat;
	background-size: 100% auto;
	height: 100%;
	overflow: hidden;
	position: relative;
	font-family: 'jt';

}



/*每个页面公共css */

</style>
