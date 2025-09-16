<!--
 * @Author: fujihang
 * @Date: 2025-06-02 14:50:29
 * @LastEditTime: 2025-06-15 21:20:53
 * @Description: 
-->
<template>
    <view id='payPage'>
        <topBar title='请填写信息' :showImg='true'></topBar>
        <!--  -->
        <view class="bg bgLine">

          <view class="list s27 c1 flex-a">
            <text style="width: 160rpx;">支付渠道</text>
            <view class="f1">

              <picker @change="channeFN" range-key="channelName" mode="selector" :value="channelObj.value"
                      :range="range">
                {{ channelObj.channelName || '请选择支付渠道' }}
              </picker>
            </view>
            <image
                src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100"
                mode="widthFix" />
          </view>

            <view class="list s27 c1 flex-a" v-for="(item, index) in funList" :key="item.name" v-if="channelObj.channelType === 'VISA'">
                <text style="width: 160rpx;">{{ item.name }}</text>
                <view class="f1">
                    <input style="background: none;border: none; width: 100%;" class="s27 c1 inputCC" v-model="item.val"
                        :placeholder="item.plr" :type="item.type1 || 'text'" v-if="item.type == 'input'">
                    <template v-if="item.type == 'picker'">


                        <view @click="visible = true" v-if="item.type1 == 'region'" style="width: 100%;height: 100%;">

                            {{ item.val || item.plr }}
                        </view>
                        <view @click="showObj2FN(index)" v-if="item.type1 == 'country'"
                            style="width: 100%;height: 100%;">

                            {{ item.val || item.plr }}
                        </view>
                        <!-- <picker :disabled="!item.arrow" v-else-if="item.type1 == 'country'"
                            @change="e => change2FN(e, index)" range-key="cn" :range="country" mode=selector
                            :value="item.val">
                            {{ item.sname || item.plr }}
                        </picker> -->
                        <picker :disabled="!item.arrow" :start='startDate' @change="e => changeFN(e, index)" v-else
                            :mode="item.type1" :value="item.val">
                            {{ item.val || item.plr }}
                        </picker>


                    </template>

                </view>
                <image v-if="item.arrow"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/backImg.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>

            <view class="angle">
                <image :class="'img' + item" :key="item" v-for="item in 4"
                    src="https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/angle2.png?x-oss-process=image/quality,Q_100"
                    mode="widthFix" />
            </view>
        </view>
        <view style="height: 170rpx;"></view>

        <view class="btnV flex-a fw">
			<button class="btn tc s38" :disabled="isPaying" @click="getPaymentTokenFN">提交</button>
            <!-- <view class="btn tc s38" @click="getPaymentTokenFN">提交</view> -->
        </view>

        <fuPopup @sureFN="sureFN" :showPopup.sync="showObj2.show" :title="showObj2.title">

            <view style="height: 1000rpx;flex-direction: column;overflow: hidden;" class="flex">
                <view style="border: 1px solid #eee;border-radius: 40rpx;margin: 0 60rpx;">
                    <input class="tc" placeholder="请输入搜索的收货国家" v-model="search" style="height: 70rpx;" type="text" />
                </view>
                <view class="f1">
                    <picker-view v-if="showObj2.show" style="height: 100%;" @change="e => change2FN(e)">
                        <picker-view-column>
                            <view class="item tc" v-for="(item, index) in countryFilter" :key="index">{{ item.cn }}</view>
                        </picker-view-column>
                    </picker-view>
                </view>
            </view>
        </fuPopup>
    </view>
</template>

<script>
import topBar from '../../components/topBar.vue'
import fuPopup from '../../components/fuPopup.vue'
export default {
    components: {
        topBar, fuPopup
    },
    data() {
        return {
            showObj2: {
                show: false,
                title: '收货国家',
            },
            funList: [

                // {
                //     name: "收货人",
                //     val: '',
                //     to: '',
                //     plr: '请输入收货人',
                //     type: 'input',
                //     img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                //     data: 'billName',
                // },
                {
                    name: "收货地址",
                    val: '',
                    to: '',
                    plr: '请输入收货地址',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'billAddress',
                },
                {
                    name: "收货邮编",
                    val: '',
                    to: '',
                    plr: '请输入收货邮编',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'billPostcode',
                },
                {
                    name: "收货国家",
                    val: '',
                    to: '',
                    plr: '请选择收货国家',
                    type: 'picker',
                    type1: 'country',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'billCountry',
                    arrow: true,
                    sname: '',
                },
                {
                    name: "收货省/州",
                    val: '',
                    to: '',
                    plr: '请输入收货省/州',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'billState',
                },
                {
                    name: "收货城市",
                    val: '',
                    to: '',
                    plr: '请输入收货城市',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'billCity',
                },
                {
                    name: "收货人邮箱",
                    val: '',
                    to: '',
                    plr: '请输入收货人邮箱',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'billEmail',
                },
                {
                    name: "收货人电话",
                    val: '',
                    to: '',
                    plr: '请输入收货人电话',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'billPhone',
                },
                // {
                //     name: "持卡人全名",
                //     val: '',
                //     to: '',
                //     plr: '请输入持卡人全名',
                //     type: 'input',
                //     img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                //     data: 'cardHolder',
                // },



                {
                    name: "持卡人姓",
                    val: '',
                    to: '',
                    plr: '请输入持卡人姓',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'cardLastName',
                },
                {
                    name: "持卡人名",
                    val: '',
                    to: '',
                    plr: '请输入持卡人名',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'cardFirstName',
                },
                {
                    name: "银行卡信息",
                    val: '',
                    to: '',
                    plr: '请输入银行卡信息',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'cardNumber',
                },
                {
                    name: "CVV 码",
                    val: '',
                    to: '',
                    type1: 'number',
                    plr: '请输入CVV 码',
                    type: 'input',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/myorder.png?x-oss-process=image/quality,Q_100',
                    data: 'cardCvv',
                },
                {
                    name: "到期日期",
                    plr: '请选择到期日期',
                    val: '',
                    to: '',
                    type1: 'date',
                    type: 'picker',
                    img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/help.png?x-oss-process=image/quality,Q_100',
                    data: 'birthday',
                    arrow: true,
                },

                // {
                //     name: "邮箱",
                //     val: '',
                //     plr: '请输入邮箱',
                //     to: '',
                //     type: 'input',
                //     img: 'https://qiyunge-oss.oss-ap-southeast-1.aliyuncs.com/imgs/my/coupon.png?x-oss-process=image/quality,Q_100',
                //     data: 'customerEmail',
                // },




            ],
            search: '',
            channelObj: {
                id: '',
                channelType: "",
            },
            startDate: new Date().toLocaleDateString().replace(/\-/g, '-'),
            range: [],
            rechargeRecordId: "36",
            adFN: "",
            postNum: 0,
            country: [
                { "name": "Afghanistan", "cn": "阿富汗", "val1": "AF", "val2": "AFG" },
                { "name": "Albania", "cn": "阿尔巴尼亚", "val1": "AL", "val2": "ALB" },
                { "name": "Algeria", "cn": "阿尔及利亚", "val1": "DZ", "val2": "DZA" },
                { "name": "American Samoa", "cn": "美属萨摩亚", "val1": "AS", "val2": "ASM" },
                { "name": "Andorra", "cn": "安道尔", "val1": "AD", "val2": "AND" },
                { "name": "Angola", "cn": "安哥拉", "val1": "AO", "val2": "AGO" },
                { "name": "Anguilla", "cn": "安圭拉", "val1": "AI", "val2": "AIA" },
                { "name": "Antarctica", "cn": "南极洲", "val1": "AQ", "val2": "ATA" },
                { "name": "Antigua and Barbuda", "cn": "安提瓜和巴布达", "val1": "AG", "val2": "ATG" },
                { "name": "Argentina", "cn": "阿根廷", "val1": "AR", "val2": "ARG" },
                { "name": "Armenia", "cn": "亚美尼亚", "val1": "AM", "val2": "ARM" },
                { "name": "Aruba", "cn": "阿鲁巴", "val1": "AW", "val2": "ABW" },
                { "name": "Australia", "cn": "澳大利亚", "val1": "AU", "val2": "AUS" },
                { "name": "Austria", "cn": "奥地利", "val1": "AT", "val2": "AUT" },
                { "name": "Azerbaijan", "cn": "阿塞拜疆", "val1": "AZ", "val2": "AZE" },
                { "name": "Bahamas", "cn": "巴哈马", "val1": "BS", "val2": "BHS" },
                { "name": "Bahrain", "cn": "巴林", "val1": "BH", "val2": "BHR" },
                { "name": "Bangladesh", "cn": "孟加拉国", "val1": "BD", "val2": "BGD" },
                { "name": "Barbados", "cn": "巴巴多斯", "val1": "BB", "val2": "BRB" },
                { "name": "Belarus", "cn": "白俄罗斯", "val1": "BY", "val2": "BLR" },
                { "name": "Belgium", "cn": "比利时", "val1": "BE", "val2": "BEL" },
                { "name": "Belize", "cn": "伯利兹", "val1": "BZ", "val2": "BLZ" },
                { "name": "Benin", "cn": "贝宁", "val1": "BJ", "val2": "BEN" },
                { "name": "Bermuda", "cn": "百慕大", "val1": "BM", "val2": "BMU" },
                { "name": "Bhutan", "cn": "不丹", "val1": "BT", "val2": "BTN" },
                { "name": "Bolivia", "cn": "玻利维亚", "val1": "BO", "val2": "BOL" },
                { "name": "Bosnia and Herzegovina", "cn": "波斯尼亚和黑塞哥维那", "val1": "BA", "val2": "BIH" },
                { "name": "Botswana", "cn": "博茨瓦纳", "val1": "BW", "val2": "BWA" },
                { "name": "Bouvet Island", "cn": "布韦岛", "val1": "BV", "val2": "BVT" },
                { "name": "Brazil", "cn": "巴西", "val1": "BR", "val2": "BRA" },
                { "name": "British Indian Ocean Territory", "cn": "英属印度洋领地", "val1": "IO", "val2": "IOT" },
                { "name": "Brunei Darussalam", "cn": "文莱达鲁萨兰国", "val1": "BN", "val2": "BRN" },
                { "name": "Bulgaria", "cn": "保加利亚", "val1": "BG", "val2": "BGR" },
                { "name": "Burkina Faso", "cn": "布基纳法索", "val1": "BF", "val2": "BFA" },
                { "name": "Burundi", "cn": "布隆迪", "val1": "BI", "val2": "BDI" },
                { "name": "Cambodia", "cn": "柬埔寨", "val1": "KH", "val2": "KHM" },
                { "name": "Cameroon", "cn": "喀麦隆", "val1": "CM", "val2": "CMR" },
                { "name": "Canada", "cn": "加拿大", "val1": "CA", "val2": "CAN" },
                { "name": "Cape Verde", "cn": "佛得角", "val1": "CV", "val2": "CPV" },
                { "name": "Cayman Islands", "cn": "开曼群岛", "val1": "KY", "val2": "CYM" },
                { "name": "Central African Republic", "cn": "中非共和国", "val1": "CF", "val2": "CAF" },
                { "name": "Chad", "cn": "乍得", "val1": "TD", "val2": "TCD" },
                { "name": "Chile", "cn": "智利", "val1": "CL", "val2": "CHL" },
                { "name": "China", "cn": "中国", "val1": "CN", "val2": "CHN" },
                { "name": "Christmas Island", "cn": "圣诞岛", "val1": "CX", "val2": "CXR" },
                { "name": "Cocos (Keeling) Islands", "cn": "科科斯（基林）群岛", "val1": "CC", "val2": "CCK" },
                { "name": "Colombia", "cn": "哥伦比亚", "val1": "CO", "val2": "COL" },
                { "name": "Comoros", "cn": "科摩罗", "val1": "KM", "val2": "COM" },
                { "name": "Congo", "cn": "刚果共和国", "val1": "CG", "val2": "COG" },
                { "name": "Cook Islands", "cn": "库克群岛", "val1": "CK", "val2": "COK" },
                { "name": "Costa Rica", "cn": "哥斯达黎加", "val1": "CR", "val2": "CRI" },
                { "name": "Cote D'Ivoire", "cn": "科特迪瓦", "val1": "CI", "val2": "CIV" },
                { "name": "Croatia", "cn": "克罗地亚", "val1": "HR", "val2": "HRV" },
                { "name": "Cuba", "cn": "古巴", "val1": "CU", "val2": "CUB" },
                { "name": "Cyprus", "cn": "塞浦路斯", "val1": "CY", "val2": "CYP" },
                { "name": "Czech Republic", "cn": "捷克共和国", "val1": "CZ", "val2": "CZE" },
                { "name": "Denmark", "cn": "丹麦", "val1": "DK", "val2": "DNK" },
                { "name": "Djibouti", "cn": "吉布提", "val1": "DJ", "val2": "DJI" },
                { "name": "Dominica", "cn": "多米尼克", "val1": "DM", "val2": "DMA" },
                { "name": "Dominican Republic", "cn": "多米尼加共和国", "val1": "DO", "val2": "DOM" },
                { "name": "East Timor", "cn": "东帝汶", "val1": "TL", "val2": "TLS" },
                { "name": "Ecuador", "cn": "厄瓜多尔", "val1": "EC", "val2": "ECU" },
                { "name": "Egypt", "cn": "埃及", "val1": "EG", "val2": "EGY" },
                { "name": "El Salvador", "cn": "萨尔瓦多", "val1": "SV", "val2": "SLV" },
                { "name": "Equatorial Guinea", "cn": "赤道几内亚", "val1": "GQ", "val2": "GNQ" },
                { "name": "Eritrea", "cn": "厄立特里亚", "val1": "ER", "val2": "ERI" },
                { "name": "Estonia", "cn": "爱沙尼亚", "val1": "EE", "val2": "EST" },
                { "name": "Ethiopia", "cn": "埃塞俄比亚", "val1": "ET", "val2": "ETH" },
                { "name": "Falkland Islands (Malvinas)", "cn": "福克兰群岛（马尔维纳斯群岛）", "val1": "FK", "val2": "FLK" },
                { "name": "Faroe Islands", "cn": "法罗群岛", "val1": "FO", "val2": "FRO" },
                { "name": "Fiji", "cn": "斐济", "val1": "FJ", "val2": "FJI" },
                { "name": "Finland", "cn": "芬兰", "val1": "FI", "val2": "FIN" },
                { "name": "France", "cn": "法国", "val1": "FR", "val2": "FRA" },
                { "name": "French Guiana", "cn": "法属圭亚那", "val1": "GF", "val2": "GUF" },
                { "name": "French Polynesia", "cn": "法属波利尼西亚", "val1": "PF", "val2": "PYF" },
                { "name": "French Southern Territories", "cn": "法属南部领地", "val1": "TF", "val2": "ATF" },
                { "name": "Gabon", "cn": "加蓬", "val1": "GA", "val2": "GAB" },
                { "name": "Gambia", "cn": "冈比亚", "val1": "GM", "val2": "GMB" },
                { "name": "Georgia", "cn": "格鲁吉亚", "val1": "GE", "val2": "GEO" },
                { "name": "Germany", "cn": "德国", "val1": "DE", "val2": "DEU" },
                { "name": "Ghana", "cn": "加纳", "val1": "GH", "val2": "GHA" },
                { "name": "Gibraltar", "cn": "直布罗陀", "val1": "GI", "val2": "GIB" },
                { "name": "Greece", "cn": "希腊", "val1": "GR", "val2": "GRC" },
                { "name": "Greenland", "cn": "格陵兰", "val1": "GL", "val2": "GRL" },
                { "name": "Grenada", "cn": "格林纳达", "val1": "GD", "val2": "GRD" },
                { "name": "Guadeloupe", "cn": "瓜德罗普", "val1": "GP", "val2": "GLP" },
                { "name": "Guam", "cn": "关岛", "val1": "GU", "val2": "GUM" },
                { "name": "Guatemala", "cn": "危地马拉", "val1": "GT", "val2": "GTM" },
                { "name": "Guinea", "cn": "几内亚", "val1": "GN", "val2": "GIN" },
                { "name": "Guinea-Bissau", "cn": "几内亚比绍", "val1": "GW", "val2": "GNB" },
                { "name": "Guyana", "cn": "圭亚那", "val1": "GY", "val2": "GUY" },
                { "name": "Haiti", "cn": "海地", "val1": "HT", "val2": "HTI" },
                { "name": "Heard and McDonald Islands", "cn": "赫德岛和麦克唐纳群岛", "val1": "HM", "val2": "HMD" },
                { "name": "Honduras", "cn": "洪都拉斯", "val1": "HN", "val2": "HND" },
                { "name": "Hong Kong", "cn": "中国香港", "val1": "HK", "val2": "HKG" },
                { "name": "Hungary", "cn": "匈牙利", "val1": "HU", "val2": "HUN" },
                { "name": "Iceland", "cn": "冰岛", "val1": "IS", "val2": "ISL" },
                { "name": "India", "cn": "印度", "val1": "IN", "val2": "IND" },
                { "name": "Indonesia", "cn": "印度尼西亚", "val1": "ID", "val2": "IDN" },
                { "name": "Iran (Islamic Republic of)", "cn": "伊朗伊斯兰共和国", "val1": "IR", "val2": "IRN" },
                { "name": "Iraq", "cn": "伊拉克", "val1": "IQ", "val2": "IRQ" },
                { "name": "Ireland", "cn": "爱尔兰", "val1": "IE", "val2": "IRL" },
                { "name": "Israel", "cn": "以色列", "val1": "IL", "val2": "ISR" },
                { "name": "Italy", "cn": "意大利", "val1": "IT", "val2": "ITA" },
                { "name": "Jamaica", "cn": "牙买加", "val1": "JM", "val2": "JAM" },
                { "name": "Japan", "cn": "日本", "val1": "JP", "val2": "JPN" },
                { "name": "Jordan", "cn": "约旦", "val1": "JO", "val2": "JOR" },
                { "name": "Kazakhstan", "cn": "哈萨克斯坦", "val1": "KZ", "val2": "KAZ" },
                { "name": "Kenya", "cn": "肯尼亚", "val1": "KE", "val2": "KEN" },
                { "name": "Kiribati", "cn": "基里巴斯", "val1": "KI", "val2": "KIR" },
                { "name": "North Korea", "cn": "朝鲜", "val1": "KP", "val2": "PRK" },
                { "name": "South Korea", "cn": "韩国", "val1": "KR", "val2": "KOR" },
                { "name": "Kuwait", "cn": "科威特", "val1": "KW", "val2": "KWT" },
                { "name": "Kyrgyzstan", "cn": "吉尔吉斯斯坦", "val1": "KG", "val2": "KGZ" },
                { "name": "Lao People's Democratic Republic", "cn": "老挝人民民主共和国", "val1": "LA", "val2": "LAO" },
                { "name": "Latvia", "cn": "拉脱维亚", "val1": "LV", "val2": "LVA" },
                { "name": "Lebanon", "cn": "黎巴嫩", "val1": "LB", "val2": "LBN" },
                { "name": "Lesotho", "cn": "莱索托", "val1": "LS", "val2": "LSO" },
                { "name": "Liberia", "cn": "利比里亚", "val1": "LR", "val2": "LBR" },
                { "name": "Libya", "cn": "利比亚", "val1": "LY", "val2": "LBY" },
                { "name": "Liechtenstein", "cn": "列支敦士登", "val1": "LI", "val2": "LIE" },
                { "name": "Lithuania", "cn": "立陶宛", "val1": "LT", "val2": "LTU" },
                { "name": "Luxembourg", "cn": "卢森堡", "val1": "LU", "val2": "LUX" },
                { "name": "Macau", "cn": "中国澳门", "val1": "MO", "val2": "MAC" },
                { "name": "North Macedonia", "cn": "北马其顿", "val1": "MK", "val2": "MKD" },
                { "name": "Madagascar", "cn": "马达加斯加", "val1": "MG", "val2": "MDG" },
                { "name": "Malawi", "cn": "马拉维", "val1": "MW", "val2": "MWI" },
                { "name": "Malaysia", "cn": "马来西亚", "val1": "MY", "val2": "MYS" },
                { "name": "Maldives", "cn": "马尔代夫", "val1": "MV", "val2": "MDV" },
                { "name": "Mali", "cn": "马里", "val1": "ML", "val2": "MLI" },
                { "name": "Malta", "cn": "马耳他", "val1": "MT", "val2": "MLT" },
                { "name": "Marshall Islands", "cn": "马绍尔群岛", "val1": "MH", "val2": "MHL" },
                { "name": "Martinique", "cn": "马提尼克", "val1": "MQ", "val2": "MTQ" },
                { "name": "Mauritania", "cn": "毛里塔尼亚", "val1": "MR", "val2": "MRT" },
                { "name": "Mauritius", "cn": "毛里求斯", "val1": "MU", "val2": "MUS" },
                { "name": "Mayotte", "cn": "马约特", "val1": "YT", "val2": "MYT" },
                { "name": "Mexico", "cn": "墨西哥", "val1": "MX", "val2": "MEX" },
                { "name": "Micronesia, Federated States of", "cn": "密克罗尼西亚联邦", "val1": "FM", "val2": "FSM" },
                { "name": "Moldova, Republic of", "cn": "摩尔多瓦共和国", "val1": "MD", "val2": "MDA" },
                { "name": "Monaco", "cn": "摩纳哥", "val1": "MC", "val2": "MCO" },
                { "name": "Mongolia", "cn": "蒙古", "val1": "MN", "val2": "MNG" },
                { "name": "Montserrat", "cn": "蒙特塞拉特", "val1": "MS", "val2": "MSR" },
                { "name": "Morocco", "cn": "摩洛哥", "val1": "MA", "val2": "MAR" },
                { "name": "Mozambique", "cn": "莫桑比克", "val1": "MZ", "val2": "MOZ" },
                { "name": "Myanmar", "cn": "缅甸", "val1": "MM", "val2": "MMR" },
                { "name": "Namibia", "cn": "纳米比亚", "val1": "NA", "val2": "NAM" },
                { "name": "Nauru", "cn": "瑙鲁", "val1": "NR", "val2": "NRU" },
                { "name": "Nepal", "cn": "尼泊尔", "val1": "NP", "val2": "NPL" },
                { "name": "Netherlands", "cn": "荷兰", "val1": "NL", "val2": "NLD" },
                { "name": "Netherlands Antilles", "cn": "荷属安的列斯", "val1": "AN", "val2": "ANT" },
                { "name": "New Caledonia", "cn": "新喀里多尼亚", "val1": "NC", "val2": "NCL" },
                { "name": "New Zealand", "cn": "新西兰", "val1": "NZ", "val2": "NZL" },
                { "name": "Nicaragua", "cn": "尼加拉瓜", "val1": "NI", "val2": "NIC" },
                { "name": "Niger", "cn": "尼日尔", "val1": "NE", "val2": "NER" },
                { "name": "Nigeria", "cn": "尼日利亚", "val1": "NG", "val2": "NGA" },
                { "name": "Niue", "cn": "纽埃", "val1": "NU", "val2": "NIU" },
                { "name": "Norfolk Island", "cn": "诺福克岛", "val1": "NF", "val2": "NFK" },
                { "name": "Northern Mariana Islands", "cn": "北马里亚纳群岛", "val1": "MP", "val2": "MNP" },
                { "name": "Norway", "cn": "挪威", "val1": "NO", "val2": "NOR" },
                { "name": "Oman", "cn": "阿曼", "val1": "OM", "val2": "OMN" },
                { "name": "Pakistan", "cn": "巴基斯坦", "val1": "PK", "val2": "PAK" },
                { "name": "Palau", "cn": "帕劳", "val1": "PW", "val2": "PLW" },
                { "name": "Panama", "cn": "巴拿马", "val1": "PA", "val2": "PAN" },
                { "name": "Papua New Guinea", "cn": "巴布亚新几内亚", "val1": "PG", "val2": "PNG" },
                { "name": "Paraguay", "cn": "巴拉圭", "val1": "PY", "val2": "PRY" },
                { "name": "Peru", "cn": "秘鲁", "val1": "PE", "val2": "PER" },
                { "name": "Philippines", "cn": "菲律宾", "val1": "PH", "val2": "PHL" },
                { "name": "Pitcairn", "cn": "皮特凯恩群岛", "val1": "PN", "val2": "PCN" },
                { "name": "Poland", "cn": "波兰", "val1": "PL", "val2": "POL" },
                { "name": "Portugal", "cn": "葡萄牙", "val1": "PT", "val2": "PRT" },
                { "name": "Puerto Rico", "cn": "波多黎各", "val1": "PR", "val2": "PRI" },
                { "name": "Qatar", "cn": "卡塔尔", "val1": "QA", "val2": "QAT" },
                { "name": "Réunion", "cn": "留尼汪", "val1": "RE", "val2": "REU" },
                { "name": "Romania", "cn": "罗马尼亚", "val1": "RO", "val2": "ROM" },
                { "name": "Russia", "cn": "俄罗斯", "val1": "RU", "val2": "RUS" },
                { "name": "Rwanda", "cn": "卢旺达", "val1": "RW", "val2": "RWA" },
                { "name": "Saint Kitts and Nevis", "cn": "圣基茨和尼维斯", "val1": "KN", "val2": "KNA" },
                { "name": "Saint Lucia", "cn": "圣卢西亚", "val1": "LC", "val2": "LCA" },
                { "name": "Saint Vincent and the Grenadines", "cn": "圣文森特和格林纳丁斯", "val1": "VC", "val2": "VCT" },
                { "name": "Samoa", "cn": "萨摩亚", "val1": "WS", "val2": "WSM" },
                { "name": "San Marino", "cn": "圣马力诺", "val1": "SM", "val2": "SMR" },
                { "name": "Sao Tome and Principe", "cn": "圣多美和普林西比", "val1": "ST", "val2": "STP" },
                { "name": "Saudi Arabia", "cn": "沙特阿拉伯", "val1": "SA", "val2": "SAU" },
                { "name": "Senegal", "cn": "塞内加尔", "val1": "SN", "val2": "SEN" },
                { "name": "Seychelles", "cn": "塞舌尔", "val1": "SC", "val2": "SYC" },
                { "name": "Sierra Leone", "cn": "塞拉利昂", "val1": "SL", "val2": "SLE" },
                { "name": "Singapore", "cn": "新加坡", "val1": "SG", "val2": "SGP" },
                { "name": "Slovakia", "cn": "斯洛伐克", "val1": "SK", "val2": "SVK" },
                { "name": "Slovenia", "cn": "斯洛文尼亚", "val1": "SI", "val2": "SVN" },
                { "name": "Solomon Islands", "cn": "所罗门群岛", "val1": "SB", "val2": "SLB" },
                { "name": "Somalia", "cn": "索马里", "val1": "SO", "val2": "SOM" },
                { "name": "South Africa", "cn": "南非", "val1": "ZA", "val2": "ZAF" },
                { "name": "South Georgia and the South Sandwich Islands", "cn": "南乔治亚岛和南桑威奇群岛", "val1": "GS", "val2": "SGS" },
                { "name": "Spain", "cn": "西班牙", "val1": "ES", "val2": "ESP" },
                { "name": "Sri Lanka", "cn": "斯里兰卡", "val1": "LK", "val2": "LKA" },
                { "name": "St. Helena", "cn": "圣赫勒拿", "val1": "SH", "val2": "SHN" },
                { "name": "St. Pierre and Miquelon", "cn": "圣皮埃尔和密克隆", "val1": "PM", "val2": "SPM" },
                { "name": "Sudan", "cn": "苏丹", "val1": "SD", "val2": "SDN" },
                { "name": "Suriname", "cn": "苏里南", "val1": "SR", "val2": "SUR" },
                { "name": "Svalbard and Jan Mayen Islands", "cn": "斯瓦尔巴和扬马延岛", "val1": "SJ", "val2": "SJM" },
                { "name": "Eswatini", "cn": "斯威士兰", "val1": "SZ", "val2": "SWZ" },
                { "name": "Sweden", "cn": "瑞典", "val1": "SE", "val2": "SWE" },
                { "name": "Switzerland", "cn": "瑞士", "val1": "CH", "val2": "CHE" },
                { "name": "Syria", "cn": "叙利亚", "val1": "SY", "val2": "SYR" },
                { "name": "Taiwan, China", "cn": "中国台湾", "val1": "TW", "val2": "TWN" },
                { "name": "Tajikistan", "cn": "塔吉克斯坦", "val1": "TJ", "val2": "TJK" },
                { "name": "Tanzania", "cn": "坦桑尼亚", "val1": "TZ", "val2": "TZA" },
                { "name": "Thailand", "cn": "泰国", "val1": "TH", "val2": "THA" },
                { "name": "Togo", "cn": "多哥", "val1": "TG", "val2": "TGO" },
                { "name": "Tokelau", "cn": "托克劳", "val1": "TK", "val2": "TKL" },
                { "name": "Tonga", "cn": "汤加", "val1": "TO", "val2": "TON" },
                { "name": "Trinidad and Tobago", "cn": "特立尼达和多巴哥", "val1": "TT", "val2": "TTO" },
                { "name": "Tunisia", "cn": "突尼斯", "val1": "TN", "val2": "TUN" },
                { "name": "Turkey", "cn": "土耳其", "val1": "TR", "val2": "TUR" },
                { "name": "Turkmenistan", "cn": "土库曼斯坦", "val1": "TM", "val2": "TKM" },
                { "name": "Turks and Caicos Islands", "cn": "特克斯和凯科斯群岛", "val1": "TC", "val2": "TCA" },
                { "name": "Tuvalu", "cn": "图瓦卢", "val1": "TV", "val2": "TUV" },
                { "name": "Uganda", "cn": "乌干达", "val1": "UG", "val2": "UGA" },
                { "name": "Ukraine", "cn": "乌克兰", "val1": "UA", "val2": "UKR" },
                { "name": "United Arab Emirates", "cn": "阿拉伯联合酋长国", "val1": "AE", "val2": "ARE" },
                { "name": "United Kingdom", "cn": "英国", "val1": "GB", "val2": "GBR" },
                { "name": "United States", "cn": "美国", "val1": "US", "val2": "USA" },
                { "name": "United States Minor Outlying Islands", "cn": "美国本土外小岛屿", "val1": "UM", "val2": "UMI" },
                { "name": "Uruguay", "cn": "乌拉圭", "val1": "UY", "val2": "URY" },
                { "name": "Uzbekistan", "cn": "乌兹别克斯坦", "val1": "UZ", "val2": "UZB" },
                { "name": "Vanuatu", "cn": "瓦努阿图", "val1": "VU", "val2": "VUT" },
                { "name": "Vatican City", "cn": "梵蒂冈城国", "val1": "VA", "val2": "VAT" },
                { "name": "Venezuela", "cn": "委内瑞拉", "val1": "VE", "val2": "VEN" },
                { "name": "Vietnam", "cn": "越南", "val1": "VN", "val2": "VNM" },
                { "name": "British Virgin Islands", "cn": "英属维尔京群岛", "val1": "VG", "val2": "VGB" },
                { "name": "U.S. Virgin Islands", "cn": "美属维尔京群岛", "val1": "VI", "val2": "VIR" },
                { "name": "Wallis and Futuna", "cn": "瓦利斯和富图纳", "val1": "WF", "val2": "WLF" },
                { "name": "Western Sahara", "cn": "西撒哈拉", "val1": "EH", "val2": "ESH" },
                { "name": "Yemen", "cn": "也门", "val1": "YE", "val2": "YEM" },
                { "name": "Serbia and Montenegro", "cn": "塞尔维亚和黑山", "val1": "CS", "val2": "SCG" },
                { "name": "Democratic Republic of the Congo", "cn": "刚果民主共和国", "val1": "CD", "val2": "COD" },
                { "name": "Zambia", "cn": "赞比亚", "val1": "ZM", "val2": "ZMB" },
                { "name": "Zimbabwe", "cn": "津巴布韦", "val1": "ZW", "val2": "ZWE" }
            ],
            isPaying: false,
        }
    },
    onLoad(options) {
        this.businessId = options.businessId
        this.getData()
        // this.checkFN()
    },
    computed: {
        countryFilter() {

            return this.country.filter(s => {
                if (!this.search) return s
                else if (s.cn.includes(this.search)) return s
            })
        },
    },
    onUnload() { clearInterval(this.adFN) },
    methods: {
        showObj2FN(index) {
            this.search = ''

            this.showObj2.index = index
            this.showObj2.xbIndex = 0
            this.showObj2.show = true
        },
        getPaymentTokenFN() {
            this.reqFN({
                url: '/calculate-api/api/secure/oms/pay/getPaymentToken?businessId=' + this.businessId,
                method: 'GET'
            }).then(res => {
                if (res.data.code === 0) {
                    this.paySubmitFN(res.data.data)
                }
            })
        },
        VISA_PAY(paymentToken) {

            let cardPay = {}, check = ''

            this.funList.forEach(s => {
                if (!s.val) check = s.name
                cardPay[s.data] = s.val
            })
            if (check) return uni.showToast({
                title: '请完善' + check,
                icon: 'none',
            })

            if (new Date(cardPay.birthday).getTime() <= new Date().getTime() + 24 * 60 * 60 * 1000) return uni.showToast({
                title: '时间必须是未来时间',
                icon: 'none',
            })
            cardPay.cardExpireYear = cardPay.birthday.split('-')[0]
            cardPay.cardExpireMonth = cardPay.birthday.split('-')[1]
            cardPay.cardHolder = cardPay.billName = cardPay.cardLastName + cardPay.cardFirstName
            cardPay.customerEmail = cardPay.billEmail
            // siteSessionId
            delete cardPay.birthday

            uni.showLoading({
                title: '信息提交中...',
                mask: true
            })

            this.reqFN({
                url: '/calculate-api/api/secure/oms/pay/submit',
                data: {
                    cardPay: {
                        ...cardPay,
                        browserInfo: 'app',
                        siteSessionId: "ei6r9vcf4b4lql5ovtud19l144",
                        customerIp: "100000000",
                        userAgent: "userAgent",
                    },
                    paymentToken,
                    rechargePlanId: this.businessId,
                    paymentChannelId: this.channelObj.id,

                },
                method: 'POST'
            }).then(res => {
                this.isPaying = false
                uni.hideLoading()
                if (res.data.code == 0) {
                    this.rechargeRecordId = res.data.data.rechargeRecordId
                    uni.showToast({
                        title: '信息提交成功',
                        icon: 'none',
                        mask: true
                    })
                    setTimeout(() => {
                        uni.showLoading({
                            title: '正在查询扣款状态，请耐心等待...',
                            mask: true
                        })
                    }, 1000)
                    this.postNum = 0
                    this.adFN = setInterval(() => {
                        this.checkFN()
                    }, 3000)
                    // uni.showToast({
                    //     title: check,
                    //     icon: 'none',
                    // })
                    // uni.navigateBack({ delta: 1 })
                }
            })
        },
        WECHAT_PAY_H5(paymentToken) {

            const info = uni.getDeviceInfo()

            this.reqFN({
                url: '/calculate-api/api/secure/oms/pay/submit',
                data: {
                    // cardPay: {
                    //     browserInfo: 'app',
                    //     siteSessionId: "ei6r9vcf4b4lql5ovtud19l144",
                    //     customerIp: "100000000",
                    //     userAgent: "userAgent",
                    // },
                    paymentToken,
                    rechargePlanId: this.businessId,
                    paymentChannelId: this.channelObj.id,
                    device: (info?.osName || 'android').toUpperCase()

                },
                method: 'POST'
            }).then(({ data: resp }) => {

                this.isPaying = false

                const { code, data, msg } = resp

                if (code !== 0) return uni.showToast({
                    title: msg || '支付失败',
                    icon : 'none',
                    mask : true
                })

                const payUrl = data.payUrl
                if (!payUrl) return uni.showToast({
                    title: '支付链接不存在',
                    icon : 'none',
                    mask : true
                })
				
				// this.rechargeRecordId = data.rechargeRecordId
				// // uni.showToast({
				// //     title: '信息提交成功',
				// //     icon: 'none',
				// //     mask: true
				// // })
				// // setTimeout(() => {
				// //     uni.showLoading({
				// //         title: '正在查询扣款状态，请耐心等待...',
				// //         mask: true
				// //     })
				// // }, 1000)
				// this.postNum = 0
				// this.adFN = setInterval(() => {
				//     this.checkFN(false)
				// }, 3000)

                uni.navigateTo({
                    url: `/pages/payPage/webview?url=${encodeURIComponent(payUrl)}&rechargeRecordId=${data.rechargeRecordId}`,
                    // fail: err => {
                    //     uni.switchTab({ url })
                    // }
                })

                // // 跳转到支付页面
                // uni.navigateTo({
                //     url: `/pages/webview/webview?url=${encodeURIComponent(payUrl)}`
                // })

                // uni.hideLoading()
                // if (res.data.code === 0) {
                //     this.rechargeRecordId = res.data.data.rechargeRecordId
                //     uni.showToast({
                //         title: '信息提交成功',
                //         icon: 'none',
                //         mask: true
                //     })
                //     setTimeout(() => {
                //         uni.showLoading({
                //             title: '正在查询扣款状态，请耐心等待...',
                //             mask: true
                //         })
                //     }, 1000)
                //     this.postNum = 0
                //     this.adFN = setInterval(() => {
                //         this.checkFN()
                //     }, 3000)
                // }
            })

        },
        paySubmitFN(paymentToken) {

            if (!this.channelObj.id) return uni.showToast({
                title: '请选择支付渠道',
                icon: 'none',
            })

            this.isPaying = true

            switch (this.channelObj.channelType) {
            case 'VISA':
                this.VISA_PAY(paymentToken)
                break;
            case 'WECHAT_PAY_H5':
                this.WECHAT_PAY_H5(paymentToken)
                break;
            // case 'ALIPAY_H5':
            //     this.WECHAT_PAY_H5(paymentToken)
            //     break;
            default:
                this.WECHAT_PAY_H5(paymentToken)
                // uni.showToast({
                //     title: '暂不支持该支付方式',
                //     icon: 'none',
                //     mask: true
                // })
            }
        },
        checkFN(showLoading = true) {

            if (showLoading) uni.showLoading({
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
                                clearInterval(this.adFN)
                                uni.showToast({
                                    title: '支付超时，请查看是否扣款成功',
                                    icon: 'none',
                                    mask: true
                                })
                            }
                            break;
                        case 2:
                            clearInterval(this.adFN)
                            uni.hideLoading()
                            uni.showToast({
                                title: '支付成功',
                                icon: 'none',
                                mask: true
                            })
                            setTimeout(() => {
                                uni.navigateBack({ delta: 1 })
                            }, 1400)
                            break;
                        // case 3:
                        //     clearInterval(this.adFN)
                        //     uni.hideLoading()
                        //     uni.showToast({
                        //         title: '支付成功',
                        //         icon: 'none',
                        //         mask: true
                        //     })

                        //     break;
                        case 3:
                            clearInterval(this.adFN)
                            uni.hideLoading()
                            uni.showToast({
                                title: '支付失败，请重试',
                                icon: 'none',
                                mask: true
                            })

                            break;
                        case 4:
                            clearInterval(this.adFN)
                            uni.hideLoading()
                            uni.showToast({
                                title: '订单已关闭，请重试',
                                icon: 'none',
                                mask: true
                            })

                            break;
                        case 5:
                            clearInterval(this.adFN)
                            uni.hideLoading()
                            uni.showToast({
                                title: '订单已退款，请重试',
                                icon: 'none',
                                mask: true
                            })
                            break;

                        case 6:
                            clearInterval(this.adFN)
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
        },

        getData() {
            this.reqFN({
                url: '/calculate-api/api/secure/oms/pay/channels/list',
                method: 'GET'
            }).then(res => {
                if (res.data.code === 0) {
                    this.range = res.data.data
                }
            })
        },
        changeFN(event, index, sex) {
            this.funList[index].val = event.detail.value
        },
        channeFN(e) {
            this.channelObj = {
                value: e.detail.value,
                ...this.range[e.detail.value]
            }
        },
        change2FN(e, index) {
            this.showObj2.xbIndex = e.detail.value[0] || 0

        },
        sureFN() {
            let { index, xbIndex } = this.showObj2
            this.funList[index].val = this.countryFilter[xbIndex].val1
            this.funList[index].sname = this.countryFilter[xbIndex].cn
            this.showObj2.show=false
        },
    },
}
</script>

<style lang='scss'>
page {
    height: 100%;
    overflow: auto;
}

#payPage {

    .bg {
        margin: 210rpx 17rpx 0;
        padding: 49rpx 0;

        .list {
            height: 100rpx;
            padding: 0 37rpx 0 32rpx;
            position: relative;
            z-index: 3;
        }

        .img {
            height: 1rpx;
            width: 46rpx;
        }

        image {
            height: 1rpx;
            width: 30rpx;
        }
    }

    .btnV {
        position: fixed;
        bottom: 6vh;
        left: 50%;
        transform: translate(-50%);
        z-index: 5;

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

    .inputCC {
        border: none !important;
        outline: none !important;
        background: transparent !important;
        box-shadow: none !important;
        -webkit-appearance: none !important;
        /* 针对 WebKit 浏览器（Chrome/Safari） */
        -moz-appearance: none !important;
        /* 针对 Firefox */
    }

    .inputCC:focus {
        border: none !important;
        /* 聚焦时仍无边框 */
        outline: none !important;
        /* 确保聚焦时无轮廓 */
        box-shadow: none !important;
        /* 可选：移除可能的阴影 */
    }

    .btnP .sad {
        background: #e0bb8e !important;
    }
}
</style>