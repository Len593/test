/*
 * @Author: fujihang
 * @Date: 2025-02-02 23:25:16
 * @LastEditTime: 2025-06-29 16:46:58
 * @Description: 请求api
 */
let errVal=false
const reqFN = ({ url, data = {}, method = 'POST',showLoading }) => {


    return new Promise((resolve) => {
        // uni.showLoading({
        //     title: '加载中...',
        //     mask: true
        // })
        uni.request({
            
			// APP开发环境
            // url: 'http://8.138.94.195:8095' + url,
			
			// APP正式环境
            url: 'https://admins.gdxingchuan.com' + url,
			
			// H5环境
            // url,
			
            data,
			
            header: {
                authorization: uni.getStorageSync('token')
            },
            method,
            success: res => {
                let toOk=uni.getStorageSync('toOk')
                
                if (res.data.code == 401 && !toOk) {
                    uni.removeStorageSync('memberCloudToken')
                    uni.setStorageSync('toOk',true)
                    let path=getCurrentPages()
                
                    if(!errVal&&path[0].route!='pages/login/login'){
                        errVal=true
                      
                        
                        uni.showModal({
                            title: '提示',
                            content: '登录已过期，请重新登录',
                            showCancel: false,
                            success: ({ confirm, cancel }) => {
                                if(confirm){
                               
                                    uni.reLaunch({ url: '/pages/login/login' })
                                }
                            }
                        })
                    }

                    return
                }
                if (res.data.code != 0) {
                    if(!errVal){
                        if(res.data.msg.includes('請授') ) return
                        uni.showToast({
                            title: res.data.msg,
                            icon: 'none',
                            duration: 1500
                        });
                    }
                    resolve(res)
                    console.log('报错url',url);
                    return
                }
                !showLoading&&uni.hideLoading()
                setTimeout(()=>{
                    errVal=false

                },3000)

                // toOk = false
                resolve(res)
            }, fail: err => {
                console.log(err, '---err');
                uni.hideLoading()
            },
        })
    })
}
export {
    reqFN
}