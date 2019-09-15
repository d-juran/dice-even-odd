App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function () {
    $.getJSON("../build/contracts/Dice.json", function (dice) {
      App.contracts.Dice = TruffleContract(dice);
      App.contracts.Dice.setProvider(App.web3Provider);

      App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function () {
    App.contracts.Dice.deployed().then(function (instance) {
      instance.GameResult({}, {}).watch(function (error, event) {
        App.render(event);
      });

    });
  },

  render: function (event) {
    // Load account data
    web3.eth.getCoinbase(function (err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account : " + account);
      }
    });

    // Only right result if game is completed
    if (event === undefined) return;
    if (event.event == "GameResult") {
      var betWon = event.args.betWon;
      if (betWon) {
        $("#result").text("You rolled " + event.args.rollResult + ". We have a winner");
      } else {
        $("#result").text("You rolled " + event.args.rollResult + ". Sorry bad luck, you got it wrong");
      }
    }
  },

  // Function for Betting and Rolling the dice
  betAndRoll: function (isEven) {
    $("#result").text("");
    App.contracts.Dice.deployed().then(function (instance) {
      return instance.betAndRoll(isEven);
    }).then(function () {
      // Give feedback on bet
      if (isEven) {
        $("#newBet").text("You bet even");
      }
      else {
        $("#newBet").text("You bet odd");
      }
    }).catch(function (err) {
      console.error(err);
    });
  }
};

$(function () {
  $(window).load(function () {
    App.init();
  });
});