import DApp from '../config/configuration.js';

const API = {
  async handleVote(candidateName) {
    let {vote} = this.meta.methods;
    let {account} = this;
    // let res = await sendCoin(address,count).send({from: account, gas: 500000 });

    let res = await vote(candidateName).send({from: account, gas: 500000 });
    return res
  },
  
  async getTotol(candidateName) {
    let {totalVotesFor} = this.meta.methods;
    let {account} = this;
    // let res = await getBalance(account).call()

    let res = await totalVotesFor(candidateName).call()
    return res
  },
}

export default{
    meta:null,
    account:null,
    web3:null,
    async init(){
        let obj = await DApp.votingInit();
        let {meta,account,web3} = obj;
        this.meta = meta;
        this.account = account;
        this.web3 = web3;
        return this;

      },
      ...API
}
