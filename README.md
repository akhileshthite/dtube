<p align="center">
  <img align="center" src="https://github.com/AkhileshThite/DTube/blob/main/src/logo.png" width="200" height="200"></img>
</p>

<h1 align="center">DTube</h1>

<p aign="center">
  <p align="center">Decentralized video sharing & social media platform on Ethereum blockchain.</p>
  <p align="center">Website: <a href="https://dtube-eth.on.fleek.co"></a>https://dtube-eth.on.fleek.co</p>
</p>

<div align="center">
  <img src="https://visitor-badge.glitch.me/badge?page_id=AkhileshThite.dtube" alt="visitors" />
  <img src="https://img.shields.io/github/v/release/AkhileshThite/DTube?color=1FC71F" alt="GitHub release" />
</div>

## Contracts

- https://goerli.etherscan.io/address/0x678af4458950d0aefbc427e663050f50ebdab52a
- https://mumbai.polygonscan.com/address/0xffded6c68ccf4ed30d2b9c85ba21a926cccc8e0e
> ⚠️ Deprecated chains, [learn more](https://blog.ethereum.org/2022/06/21/testnet-deprecation):
- https://rinkeby.etherscan.io/address/0xcda87299367d6b29fef13ca08448bfaaf2e4a175
- https://ropsten.etherscan.io/address/0xc6eb38be0949a63f7c3ac36a053de209970fa19b

## About

> ⚠️ Use this DApp for educational purposes only! DTube is not responsible for the harm caused by the content you're uploading.

DTube uploads the video files to [IPFS](https://ipfs.tech/) by using [web3.storage](https://web3.storage/) and stores those IPFS [CID](https://docs.ipfs.tech/concepts/content-addressing/)s to the blockchain network. Read the step-by-step tutorial 📝 "[Build a Social Media dApp & Deploy it on Polygon](https://learn.figment.io/tutorials/build-a-social-media-dapp-and-deploy-it-on-polygon)" to learn how to BUIDL it from scratch. If you have any queries, then please create a [discussion thread](https://github.com/akhileshthite/dtube/discussions).

This DApp is inspired by the [Dapp University](https://www.youtube.com/channel/UCY0xL8V6NzzFcwzHCgB8orQ) YouTube channel.

## Demo

<div align="center">
  <img src="https://github.com/akhileshthite/dtube/blob/main/demo.gif" />
</div>

## Development instructions

### Installation & setup

Make sure you have truffle installed on your computer.

```sh
# Install Truffle globally
npm install -g truffle
```

- Ensure you create an `.env` file in `root` directory. Then to access the Ethereum network/node, create a project on [infura](https://infura.io/) and copy-paste the `infura project-id url` in `.env` with a variable name `REACT_APP_INFURA_RINKEBY` or `any network you like`.

```sh
REACT_APP_INFURA_RINKEBY=https://rinkeby.infura.io/v3/YOUR_PROJECT_ID
```

- Paste the 12 word Secret Recovery Phrase of your (preferably newly generated and testnet-only) MetaMask wallet in `.env` with the variable name `REACT_APP_MNEMONIC`. This will be loaded by truffle at runtime, and the environment variable can then be accessed with `process.env.REACT_APP_MNEMONIC`.

```sh
REACT_APP_MNEMONIC=for example put your twelve word BIP39 secret recovery phrase here
```

- For development and testing, you have to create your own web3.storage API token. To do that, `login to` [web3.storage](https://web3.storage/) -> `create a new API token` -> `copy the API token`.

Then create a `.env` file in the root directory.

```bash
REACT_APP_API_TOKEN=PASTE_YOUR_API_TOKEN
```

OR

To develop on ganache blockchain, open ganache and import the accounts by adding your ganache private keys in MetaMask.

```sh
$ ganache-cli
```

### Deployment

To deploy the smart contracts on blockchain networks, follow the given truffle command below.

```sh
# truffle migrate --network NETWORK_NAME
truffle migrate --network rinkeby

# --reset: Run all migrations from the beginning, instead of running from the last completed migration.

```

For more information, read [truffle docs](https://trufflesuite.com/docs/truffle/).

### React client

Start react app.

```sh
npm start
Starting the development server...
```

> ⚠️ If dealing with “JavaScript heap out of memory” error after `npm start` then use the following command to solve it: `export NODE_OPTIONS="--max-old-space-size=8192"`

> 📌 Note: I cannot update this repo (main-branch) with react hooks because the initial [educational tutorial](https://learn.figment.io/tutorials/build-a-social-media-dapp-and-deploy-it-on-polygon) was written with react classes. However, if you want to work on this issue, then please `fork` the main branch and push your changes to `react-hooks` branch and send a [pull request](https://github.com/akhileshthite/dtube/pulls) for the same.

## License

DTube is licensed under the [MIT license](https://github.com/AkhileshThite/DTube/blob/main/LICENSE).

<hr>

Hope you've learned something new. Don't forget to leave a 🌟 and <a href="https://twitter.com/cryptoroots_xyz" target="_blank"><img src="https://img.shields.io/twitter/follow/akhileshthite_?style=social" alt="twitter" /></a>
