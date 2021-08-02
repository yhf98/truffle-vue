const Migrations = artifacts.require("Migrations");

module.exports = function(deployer) {
   // 任务就是 部署迁移合约
  deployer.deploy(Migrations);
};