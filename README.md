# dice-even-odd

Prerequisite

* Truffle
* Ganache
* Metamask
* live-server

To run the project on a local network

* Install Truffle, Ganache and live-server using the following:

npm install -g truffle ganache-cli live-server

* Move to the Dice folder using terminal
* Start Ganache in another terminal using the following:

ganache-cli -p 8545

* Deploy the code to the blockchain by typing the following in the first terminal window:

truffle migrate -network development

* Copy a private key from the Ganache terminal and import the account into Metamask while connected to the local network
* In the first terminal start the live-server using the command:

live-server

* Navigate to the src folder to start the application
