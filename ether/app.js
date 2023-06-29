import web3 from './web3';
import NFTFactory from './build/contracts/NFT.json';

const contractAddress = "0x2Ded813fC1f31de959c5F985931751D4dD5Bcc36";

const contract = new web3.eth.Contract(NFTFactory.abi, contractAddress);

export default contract;