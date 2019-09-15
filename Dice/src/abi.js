var abi = [
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "bidder",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "currentBet",
          "type": "bool"
        },
        {
          "indexed": false,
          "name": "rollResult",
          "type": "uint256"
        }
      ],
      "name": "GameResult",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "isBetEven",
          "type": "bool"
        }
      ],
      "name": "betAndRoll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];