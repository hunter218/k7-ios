import Vue from 'vue'
import App from './App'
// import WebsocketTask from './websocket.js'
// let websocket = new WebsocketTask('ws://156.236.64.100:2346',1000)
// Vue.prototype.$websocket = websocket;

Vue.config.productionTip = false

Vue.prototype.checkLogin = function(){
	const token = uni.getStorageSync('token')
	if(token === ''){ 
		uni.reLaunch({url:'/pages/user/login'})
		return false
	}
	return token
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
