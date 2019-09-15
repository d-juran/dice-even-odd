pragma solidity ^0.5.3;

contract Dice{

	struct Bet{
		uint256 rollResult;
		bool betWon;
	}

	mapping(address => Bet) private bets;

	uint256 private randomFactor; // Variable for randomizing results

	event GameResult(address bidder, bool betWon , uint256 rollResult); // Event for tracking the game results

	constructor() public{
		randomFactor = 10;
	}

	// This function rolls the dice and emits the result
	function betAndRoll  (bool isBetEven) public {
		bets[msg.sender].rollResult = random();
		randomFactor += bets[msg.sender].rollResult; // Set a new random factor for next roll

		// Check if the result is even
		bool isResultEven = false;
		isResultEven = bets[msg.sender].rollResult % 2 == 0;

		// Check if we won
		bets[msg.sender].betWon = isResultEven == isBetEven;
		// if (bets[msg.sender].betWon){
		// 	msg.sender.transfer(100000000000000);
		// }
		emit GameResult(msg.sender, bets[msg.sender].betWon, bets[msg.sender].rollResult);
	}

	// Function for getting a new random number between 2 and 12
    function random() private view returns (uint256) {
       	uint256 blockValue = uint256(blockhash(block.number-1 + block.difficulty));
        blockValue = blockValue + uint256(randomFactor);
        uint256 result = (blockValue % 11) + 2;
		return result;
    }

	// Fallback function in case contract is called, but no other function is called or no data is sent
    function() external payable{}

}