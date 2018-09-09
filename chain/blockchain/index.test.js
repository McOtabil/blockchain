const Blockchain = require('./index');


const Block = require('./block');


describe('Blockchain', () => {
    let bc, bc2;
          

   beforeEach(() => {
        bc = new Blockchain();  // creates a new instance of the blockchain
        bc2 = new Blockchain();
  
    });
  

    it('starts with the genesis block', () =>{ 
        expect(bc.chain[0]).toEqual(Block.genesis()); // checks to see if the first block in the newly created blockchain is the same as the genesis block
    });
    

    it('adds a new block', () =>{
        const data = 'foo';     // data variable is initalized with foo before the test
        bc.addBlock(data);      // a block is added to bc which is the new chain with data (foo)        // expect(bc.chain[bc.chain.length-1].data).toEqual(data); // checks to see if the first block in the bc blockchain's data is same as data
        expect(bc.chain[bc.chain.length-1].data).toEqual(data);

    });
    it('validates a valid chain', () =>{
        bc2.addBlock('foo');      
        expect(bc.isValidChain(bc2.chain)).toBe(false); 
    });

    it('invalidates a chain with corrupt genesis block', () => {
        bc2.chain[0].data = 'Bad data';  // initializes block1's data in bc2 with bad data
       expect(bc.isValidChain(bc2.chain)).toBe(false) // compares bc1 and bc2 and expects it to be false since bc2's data has been tampered with, replaced with 'Bad data' 
    });

    it('invalidates a corrupt chain' , () => {
        bc2.addBlock('foo'); // adds another block to bc2 with data (foo)
        bc2.chain[1].data = 'Not foo'; // which is now block 1, its data is changed to 'Not Foo'
        expect(bc.isValidChain(bc2.chain)).toBe(false); // checks bc2 for validity and expects it to be false
    });

    it('replaces chain with a valid chain', () => {
        bc2.addBlock('goo');
        bc.replaceChain(bc2.chain); // replaces bc with bc2 since it meets the criteria for replacing it
        expect(bc.chain).toEqual(bc2.chain); // expects both to be the equal
    });
    
});
