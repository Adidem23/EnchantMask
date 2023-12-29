async function switchChain(chainID) {

    function decimalToHex(decimalNumber) {
        return decimalNumber.toString(16).toUpperCase();
    }

    const hexadecimalValue = decimalToHex(chainID);
    const RealChainId = `0x${hexadecimalValue}`;
    console.log("ChainId Hex is : "+RealChainId);

    if (window.ethereum) {
        await window.ethereum.request({
            "method": "wallet_switchEthereumChain",
            "params": [
                {
                    "chainId": `${RealChainId}`
                }
            ]
        });

        console.log('Chain Changed Successfully');
    } else {
        throw new Error("Metamask Not Installed!!");
    }

}

async function getPublicEncryptionKey() {

    if (window.ethereum) {

        const accounts = await window.ethereum.request({
            "method": "eth_requestAccounts",
            "params": []
        });

        const Account = accounts[0];

        const publicEncryptionkey = await window.ethereum.request({
            "method": "eth_getEncryptionPublicKey",
            "params": [
                `${Account}`
            ]
        });

        console.log("Public Key is : " + publicEncryptionkey);

        return publicEncryptionkey;

    } else {
        throw new Error("Metamask Not Installed!!");
    }

}

async function connectAccount() {
    if (window.ethereum) {
        const accounts = await window.ethereum.request({
            "method": "eth_requestAccounts",
            "params": []
        });

        const Account = accounts[0];
        console.log("Account Connected: " + Account);
        return Account;

    } else {
        throw new Error("Metamask Not Installed!!");
    }
}


async function signMessage(input) {

    if (window.ethereum) {
        await window.ethereum.enable();

        const accounts = await window.ethereum.request({
            "method": "eth_requestAccounts",
            "params": []
        });

        const Account = accounts[0];

        function hexer(input) {
            const utf8 = toUTF8Array(input);
            const hex = utf8.map(n => n.toString(16));
            const RealHexvalue = '0x' + hex.join('')
            return RealHexvalue;
        }

        function toUTF8Array(str) {
            var utf8 = [];
            for (var i = 0; i < str.length; i++) {
                var charcode = str.charCodeAt(i);
                if (charcode < 0x80) utf8.push(charcode);
                else if (charcode < 0x800) {
                    utf8.push(0xc0 | (charcode >> 6),
                        0x80 | (charcode & 0x3f));
                }
                else if (charcode < 0xd800 || charcode >= 0xe000) {
                    utf8.push(0xe0 | (charcode >> 12),
                        0x80 | ((charcode >> 6) & 0x3f),
                        0x80 | (charcode & 0x3f));
                }
                else {
                    i++;
                    charcode = 0x10000 + (((charcode & 0x3ff) << 10)
                        | (str.charCodeAt(i) & 0x3ff));
                    utf8.push(0xf0 | (charcode >> 18),
                        0x80 | ((charcode >> 12) & 0x3f),
                        0x80 | ((charcode >> 6) & 0x3f),
                        0x80 | (charcode & 0x3f));
                }
            }
            return utf8;
        }

        const MessageHex = hexer(input);

        const SignedMsg = await window.ethereum.request({
            "method": "personal_sign",
            "params": [
                `${MessageHex}`,
                `${Account}`
            ]
        });

        console.log(SignedMsg);
        return SignedMsg;
    } else {
        throw new Error(" Metamask is Not Installed!!");
    }
}

async function getBlockNumber() {

    if (window.ethereum) {
        const blocknumber = await window.ethereum.request({
            "method": "eth_blockNumber",
            "params": []
        });

        console.log("Recent BlockNumber is : " + blocknumber);

        return blocknumber;
    } else {
        throw new Error('Metamask Not Installed')
    }

}

async function getchainId() {

    if (window.ethereum) {
        const ChainID = await window.ethereum.request({
            "method": "eth_chainId",
            "params": []
        });

        const AcutalChainId = parseInt(Number(ChainID))

        console.log("ChainId of connected Network is : " + AcutalChainId);

        return AcutalChainId;
    } else {
        throw new Error('Metamask Not Installed')
    }

}

async function getGasPrice() {

    if (window.ethereum) {
        const gasprice = await window.ethereum.request({
            "method": "eth_gasPrice",
            "params": []
        });

        const RealGasPrice = parseInt(Number(gasprice));

        console.log('Gas Price(wei): ' + RealGasPrice);

        return RealGasPrice;
    } else {
        throw new Error("Metamask Not installed");
    }

}

async function getBalance() {

    if (window.ethereum) {

        const Account = await connectAccount();
        const blockNumber = await getBlockNumber();

        const balance = await window.ethereum.request({
            "method": "eth_getBalance",
            "params": [
                `${Account}`,
                `${blockNumber}`
            ]
        });

        const Acutalbalance = parseInt(Number(balance));

        console.log("Actual balance is (in Wei): " + Acutalbalance);

        return Acutalbalance
    } else {
        throw new Error("Metamask Not installed")
    }

}

async function getBlockinformation(blocknumber) {
    if (window.ethereum) {
        const blockinfo = await window.ethereum.request({
            "method": "eth_getBlockByNumber",
            "params": [
                `${blocknumber}`,
                false
            ]
        });

        const realblockinfo = JSON.stringify(blockinfo);
        console.log("blockinformation : "+realblockinfo);
        return blockinfo;

    } else {
        throw new Error("Metamask Not installed")
    }
}

async function getTransactionCountofBlock(blocknumber) {

    if (window.ethereum) {

        const transactionCount = await window.ethereum.request({
            "method": "eth_getBlockTransactionCountByNumber",
            "params": [
                `${blocknumber}`
            ]
        });

        const realcount = parseInt(Number(transactionCount));

        console.log('Transaction Count is : ' + realcount);

        return realcount
    } else {
        throw new Error("Metamask Not installed")
    }
}

async function getTransactionInformation(blockNumber, transactionCount) {

    if (window.ethereum) {

        const transactioninfo = await window.ethereum.request({
            "method": "eth_getTransactionByBlockNumberAndIndex",
            "params": [
                `${blockNumber}`,
                `${transactionCount}`]
        });

       const realone=JSON.stringify(transactioninfo);
       console.log("transactionCount : "+realblockinfo);
       return transactioninfo;

    } else {
        throw new Error("Metamask Not installed")
    }

}

module.exports={
    switchChain,
    getPublicEncryptionKey,
    connectAccount,
    signMessage,
    getBlockNumber,
    getchainId,
    getGasPrice,
    getBalance,
    getBlockinformation,
    getTransactionCountofBlock,
    getTransactionInformation
}