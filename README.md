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

## About

> ⚠️ Use this DApp for educational purposes only! DTube is not responsible for the harm caused by the content you're uploading.

DTube uploads the video files to [IPFS](https://ipfs.tech/) and stores those IPFS [CID](https://docs.ipfs.tech/concepts/content-addressing/)s to the blockchain network. Read the step-by-step tutorial 📝 "[Build a Social Media dApp & Deploy it on Polygon](https://learn.figment.io/tutorials/build-a-social-media-dapp-and-deploy-it-on-polygon)" to learn how to BUIDL it from scratch. If you have any queries, then please create a [discussion thread](https://github.com/akhileshthite/dtube/discussions).

This DApp is inspired by the [Dapp University](https://www.youtube.com/channel/UCY0xL8V6NzzFcwzHCgB8orQ) YouTube channel.

## Development instructions

### Installation & setup

Make sure you have truffle installed on your computer.

```sh
# Install Truffle globally
npm install -g truffle
```

Ensure you create an `.env` file in `root` directory. Then to access the Ethereum network/node, create a project on [infura](https://infura.io/) and copy-paste the `infura project-id url` in `.env` with a variable name `INFURA_RINKEBY` or `any network you like`.

```sh
INFURA_RINKEBY=https://rinkeby.infura.io/v3/YOUR_PROJECT_ID
```

Paste the 12 word Secret Recovery Phrase of your (preferably newly generated and testnet-only) MetaMask wallet in `.env` with the variable name `MNEMONIC`. This will be loaded by truffle at runtime, and the environment variable can then be accessed with `process.env.MNEMONIC`.

```sh
MNEMONIC=for example put your twelve word BIP39 secret recovery phrase here
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

> 📌 Note: I cannot update this repo (main-branch) with react hooks because the initial [educational tutorial](https://learn.figment.io/tutorials/build-a-social-media-dapp-and-deploy-it-on-polygon) was written with react classes. However, if you want to work on this issue, then please `fork` and push your changes to `react-hooks` branch and send a [pull request](https://github.com/akhileshthite/dtube/pulls) for the same.

## License

DTube is licensed under the [MIT license](https://github.com/AkhileshThite/DTube/blob/main/LICENSE).

<hr>

Hope you've learned something new. Don't forget to leave a 🌟 and <a href="https://twitter.com/cryptoroots_xyz" target="_blank"><img src="https://img.shields.io/twitter/follow/akhileshthite_?style=social" alt="twitter" /></a>
