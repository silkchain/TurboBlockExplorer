# Turbo Block Explorer

Turbo block explorer is an Ethereum block explorer based on TurboSDK.

# Turbo SDK

TurboSDK gives any node.js or javascript apps the ability to access many blockchain services, by providing an universal javascript API and adapters for underlying blockchains. Currently Ethereum adapter based on web3.js Ethereum client was provided.

SDKs in other languages like Java, Go, Python will be available soon. 

# Tutorials

## Installation

**Note:** This project depends on [Nodejs](https://nodejs.org/). Make sure you have [Nodejs](https://nodejs.org/) installed before installation.

```
git clone git@github.com:silkchain/TurboBlockExplorer.git
cd TurboBlockExplorer
npm i
```

## Preview

This project explore blocks for an Ethereum chainb (now with a Ethereum testnet node running behind a server url hardcoded in src/constants/index.js). You can execute npm start command to preview out of the box at http://localhost:3000/

```
npm start
```