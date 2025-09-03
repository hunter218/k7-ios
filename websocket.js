export default class WebsocketTask {
    constructor(url, time){
		this.url = url
		this.data = null
		this.socketTask = null
		this.isOpenSocket = false
		this.timeout = time
		this.heartbeat = null // 心跳检测
		this.reconnectTimer = null // 重连检测
 
		try {
			return this.connectSocketInit()
		} catch(e){
			this.isOpenSocket = false
			this.reconnect();
		} 
	}

	connectSocketInit(){
		this.socketTask = uni.connectSocket({
			url: this.url,
			success() {
				clearInterval(this.reconnectTimer)
				console.log("正准备建立websocket中。。。")
				return this.socketTask
			},
			fail() {
				console.log("连接失败。。。")
				return this.socketTask
			}
		});

		this.socketTask.onOpen((res)=>{
			clearInterval(this.reconnectTimer)
			this.start()
			this.isOpenSocket = true
			this.socketTask.onMessage((msg)=>{
				// this.reset()
				let infos = JSON.parse(msg.data);
				if (infos.status == 'success' && infos.result.type == 'tictok') {
					uni.$emit('drawMessage', msg);
				} else if (infos.status == 'success' && infos.result.type == 'jsftTictok') {
					uni.$emit('hallMessageJsft', msg);
				} else if (infos.status == 'success' && infos.result.type == 'jsscTictok') {
					uni.$emit('hallMessageJssc', msg);
				} else if (infos.status == 'success' && infos.result.type == 'azxysTictok') {
					uni.$emit('hallMessageAzxys', msg);
				} else if (infos.status == 'success' && infos.result.type == 'history') {
					uni.$emit('historyDrawMessage', msg);
				} else if ((infos.status == 'success' && infos.result.type != 'tictok') || infos.status == 'error') {
					uni.$emit('chatMessage', msg);
				} else if (infos.status == 'info') {
				} else if (infos.status == 401) {
					console.log(infos)
					uni.reLaunch({
					    url: '/pages/user/login'
					});
				} 
			});
        })

        this.socketTask.onClose(()=>{
			clearInterval(this.heartbeat)
		    this.isOpenSocket = false;
		    this.reconnect();
        })
    }

    // 发送消息
    send(data){
        this.socketTask.send({data})
    }

    // 重新连接
    reconnect(){
		console.log(this.isOpenSocket)
        if(!this.isOpenSocket){
            this.reconnectTimer = setInterval(()=>{
                this.connectSocketInit();
            }, 1000)
        }
    }
	
	//开启心跳检测
	start(){
		this.heartbeat = setInterval(()=>{
		this.data = {type:'Ping'}
		this.send(JSON.stringify(this.data));
		}, this.timeout)
	}
	
	reset(){
		// 清除定时器重新发送一个心跳信息
		clearInterval(this.heartbeat);
　　　　 this.start();
	}

}