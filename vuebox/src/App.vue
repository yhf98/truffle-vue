<template>
	<div id="app">
		<div>
			<h1 style="text-align: left;">年度最佳MVP</h1>
			<table style="width:600px;height:300px;" border="1">
				<thead>
					<tr>
						<th>
							候选人
						</th>
						<th>
							票数
						</th>
						<th>
							操作
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							库里
						</td>
						<td>
							{{person[0].num}}
						</td>
						<td>
							<button @click="voteForCandidate('Curry')" class="btnbtn-primary">
								投票
							</button>
						</td>
					</tr>
					<tr>
						<td>
							汤普森
						</td>
						<td id="candidate-2">
							{{person[1].num}}
						</td>
						<td>
							<button @click="voteForCandidate('Thompson')" class="btnbtn-primary">
								投票
							</button>
						</td>
					</tr>
					<tr>
						<td>
							杜兰特
						</td>
						<td>
							{{person[2].num}}
						</td>
						<td>
							<button  @click="voteForCandidate('Durant')" class="btnbtn-primary">
								投票
							</button>
						</td>
					</tr>
				</tbody>
			</table>
			<ul v-if="orderList">
				<li style="text-align:left;" v-for="(item,index) in orderList" :key="index">
					<span>id: {{item.id}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
					<span>商品名称: {{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
					<span>订单号: {{item.goodID}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	const bytes32 = require('bytes32');
	export default {
		data() {
			return {
				Voting:{},
				curry:0,
				tps:0,
				kd:0,
				person:[
					{name:"Curry",num:0},
					{name:"Thompson",num:0},
					{name:"Durant",num:0},
				],
				path:"ws://127.0.0.1:28019/imserver/1",
           		socket:"",
				orderList:[
					{id:1,name:"",goodID:""}
				]
			}
		},
		name: 'app',
		components: {

		},
		mounted() {
			this.init(() => {
				this.getPerson()
			});
			this.wsInit()
		},
		methods: {
			wsInit: function () {
            if(typeof(WebSocket) === "undefined"){
                alert("您的浏览器不支持socket")
            }else{
                // 实例化socket
                this.socket = new WebSocket(this.path)
                // 监听socket连接
                this.socket.onopen = this.open
                // 监听socket错误信息
                this.socket.onerror = this.error
                // 监听socket消息
                this.socket.onmessage = this.getMessage
            }
        },
        open: function () {
            console.log("socket连接成功")
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msg) {
            console.log(msg.data)

			// {"result":{"msg":"下单成功！！","orderID":"1241241212","userID":1}}
			var data=JSON.parse(msg.data).result
			console.info("data:",data)
			this.orderList.push({
				id:data.userID,
				name:data.msg,
				goodID:data.orderID
			})

        },
        send: function () {
            this.socket.send(params)
        },
        close: function () {
            console.log("socket已经关闭")
        },destroyed () {
        // 销毁监听
        this.socket.onclose = this.close
    	},

			async getPerson(){
				console.info("======================================================")
				for(var i in this.person){
					this.person[i].num=await this.Voting.getTotol(bytes32({input:this.person[i].name}))
					console.info("候选人：",this.person[i].name," 票数：",this.person[i].num)
				}
			},
			async voteForCandidate(name){
				await this.Voting.handleVote(bytes32({ input:name})).then(res=>{})
				this.getPerson()
			},
			async init(callback) {
				this.$DApp.voting.init().then(res => {
					this.Voting = res;
					console.log(this.Voting);
					callback();
				})
			}
		}
	}
</script>

<style>
	#app {
		/* margin-top: 200px;
		text-align: center; */
	}
</style>