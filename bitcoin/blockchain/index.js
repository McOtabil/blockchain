const Block = require('./block');


class Blockchain {
    constructor(){
        this.chain = [Block.genesis()]; // initializes an instance of the blockchain with the genesis block as the first block
    }


    addBlock(data) {
     const block = Block.mineBlock(this.chain[this.chain.length-1],data); // initializes block with a newly mined block whose lastblock is this.chain's block -1 position
     this.chain.push(block); // appends this.chain with the newly mined block
     
     return block;
   }  
   
   isValidChain(chain) {
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) return false; // compares the JSON string form of both the contents of first block in the new incoing chain and genesis block of the current chain to see if equal

        for (let i=1;i<chain.length;i++){    // this is to run through all the blocks in the new incoming chain till the most recent block which are the indices in the array
        const block = chain[i];                 // block is a placeholder to hold the current block in the new incoming chain which represents the current number in the iteration
        const lastBlock = chain[i-1];           // lastblock is same as above , only it holds the block preceding the current one
       
        if (

            block.lastHash !== lastBlock.hash ||  // it compares the lasthash of the current block and the hash of the previous block (all of the new incoming chain) to see if equal
             block.hash !== Block.blockHash(block) // it compares the hash of the current block
         ) {
            return false;
        }

    }
    return true;
}

  replaceChain(newChain){          
      if(newChain.length <= this.chain.length){  // checks to see if the new incoming chain has the same length or is shorter than the length of the current chain
      console.log('Received a chain that is not longer than the current chain');
      return;

      }else if (!this.isValidChain(newChain)){  // if not it subjects the new incoming chain to the validation process in isvalidchain
      console.log('The chain received is not valid');
      }
      console.log('Replacing chain with the new chain') // if it passes it replaces the current existing chain with the new incoming chain
      this.chain = newChain;
  }

}

module.exports = Blockchain;