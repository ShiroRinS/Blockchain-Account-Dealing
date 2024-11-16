const TradeKey = artifacts.require("./TradeKey");

module.exports = function (deployer) {
    deployer.deploy(TradeKey);
};
