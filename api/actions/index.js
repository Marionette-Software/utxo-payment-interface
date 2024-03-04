const getNewAddress = require("./getNewAddress");
const initialDepositData = require("./initialDepositData");
const validateRecipient = require("./validateRecipient");
const recipientSchema = require("./recipientSchema");
const balance = require("./balance");
const blockRequest = require("./blockRequest");
const blockSequence = require("./blockSequence");
const lastHeight = require("./lastHeight");
const analyseBlock = require("./analyseBlock");
const resetBlock = require ("./resetBlock");
const transfer = require ("./transfer");

module.exports = {
    getNewAddress,
    initialDepositData,
    validateRecipient,
    recipientSchema,
    balance,
    blockRequest,
    blockSequence,
    lastHeight,
    analyseBlock,
    resetBlock,
    transfer
}