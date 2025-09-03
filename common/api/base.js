// 接口前缀地址
let baseURL = 'http://43.155.11.101/';
let showHttpLog = false;

function sendRequest(url, options) {
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseURL + url,
			method:options.method || 'GET',
			header:options.headers || {},
			data:options.data || {},
			success:(res)=> {
				if (res.statusCode === 401) {
					return uni.showModal({
						title: '系统提示',
						content:res.data,
						showCancel:false,
						success:function(res){
							setTimeout(function(){
								uni.reLaunch({
								    url: '/pages/mine/login'
								});
							} , 1500);
						}
					})
				} else if (res.data.status == 'FAILURE') {
					return uni.showModal({
						title: '系统提示',
						content: res.data.error_message,
						showCancel:false
					})
				}
				resolve(res)
			},
			fail: (err) => {
				uni.showToast({
					title:"请求接口失败",
					icon:"none"
				})
				reject(err)
			}
		})
	})
};

module.exports = {
	sendRequest,
	baseURL
}