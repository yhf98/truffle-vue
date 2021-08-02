const Voting = artifacts.require("Voting");

module.exports = function(deployer) {
  // 任务就是 部署迁移合约
  deployer.deploy(Voting, ['Curry', 'Thompson', 'Durant'], {gas: 1000000});
};
