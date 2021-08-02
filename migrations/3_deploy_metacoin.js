const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  // 将已部署的库链接到合约或多个合约
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
};
