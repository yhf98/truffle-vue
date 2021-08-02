import DApp from '../config/configuration.js';

const API = {
  async getBalance() {
    let {getBalance} = this.meta.methods;
    let {account} = this;

    let res = await getBalance(account).call()
    return res

  },
  
  async send(address,count) {
    let {sendCoin} = this.meta.methods;
    let {account} = this;
    let res = await sendCoin(address,count).send({from: account, gas: 500000 });
    return res;
  },
}

export default{
    meta:null,
    account:null,
    web3:null,
    async init(){
        let obj = await DApp.metaCoinInit();
        let {meta,account,web3} = obj;
        this.meta = meta;
        this.account = account;
        this.web3 = web3;
        return this;

      },
      ...API
}
