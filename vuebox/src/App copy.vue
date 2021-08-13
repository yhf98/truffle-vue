<template>
	<div id="app">
		<div>
			<h1 style="text-align: center;">年度最佳MVP</h1>
			<table style="width:600px;height:300px;position: absolute;left:35%;" border="1">
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
		</div>
	</div>
</template>

<script>
	const bytes32 = require('bytes32');
	export default {
		data() {
			return {
				address: '',
				count: '',
				balance: 0,
				status: '待处理...',
				MetaCoin: {},
				Voting:{},
				curry:0,
				tps:0,
				kd:0,
				person:[
					{name:"Curry",num:0},
					{name:"Thompson",num:0},
					{name:"Durant",num:0},
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
			this.init2(() => {
				this.getBlance()
			});
		},
		methods: {
			async getPerson(){
				for(var i in this.person){
					this.person[i].num=await this.Voting.getTotol(bytes32({input:this.person[i].name}))
					console.info(i,this.person)
				}
			},
			async voteForCandidate(name){
				await this.Voting.handleVote(bytes32({ input:name})).then(res=>{})
				this.getPerson()
			},
			// async totol(name){
			// 	return await this.Voting.getTotol(name);
			// },
			delBlank(str) {
				return str.replace(/\s*/g, "");
			},

			async getBlance() {
				let balance = await this.MetaCoin.getBalance();
				this.balance = balance;
			},
			statu(str) {
				this.status = str;
			},
			send() {
				let { address, count, delBlank } = this;
				address = delBlank(address);
				count = parseInt(count);
				console.log(address, count);
				if (address === "" || count === "") {
					alert('请输入地址和数量')
				}
				else {
					this.MetaCoin.send(address, count).then(res => {
						console.log(res);
						this.getBlance()
						this.statu('交易成功')
					}).catch(err => {
						console.log(err);
					})
				}

			},
			async init(callback) {
				this.$DApp.voting.init().then(res => {
					this.Voting = res;
					console.log(this.Voting);
					callback();
				})
			},
			async init2(callback) {
				this.$DApp.metaCoin.init().then(res => {
					this.MetaCoin = res;
					console.log(this.MetaCoin);
					callback();
				})
			}
		}
	}
</script>

<style>
	#app {
		margin-top: 200px;
		text-align: center;

	}
</style>