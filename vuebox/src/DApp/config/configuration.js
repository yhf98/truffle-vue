import Web3Init from 'web3-init';
Web3Init.url = 'http://127.0.0.1:8545';
import file from './file.js';

export default {
	async metaCoinInit(){
		let {metaCoin} = file;
		let instance = new Web3Init({
			//参数引入合约
			artifact:metaCoin
		});
		let obj = await instance.init();
		return obj;
	},
	async votingInit(){
		let {voting} = file;
		let instance = new Web3Init({
			//参数引入合约
			artifact:voting
		});
		let obj = await instance.init();
		return obj;
	}
}