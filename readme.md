# Cosmos Lib

JS implementation of [Cosmos](https://github.com/cosmos/cosmos-sdk) cryptography and addresses logic.

Features:
    * Generate private/public key from mnemonic and path.
    * Sign/verify bytes/JSON with private/public key.s
    * Convert Cosmos bech32 address to bytes32 (solidity capability).

# Installation

Install dependency:

    yarn add cosmos-lib

And use in code:

    const cosmos = require('cosmos-lib');

# Usage

Generate private/public key from mnemonic:

```js
const MNEMONIC = 'cluster unveil differ bright define prosper hunt warrior fetch rough host fringe worry mention gospel enlist elder laugh segment funny avoid regular market fortune';

const keys = cosmos.crypto.getKeysFromMnemonic(MNEMONIC);
console.log(keys.publicKey, keys.privateKey);
```

Sign bytes/JSON:

```js
const bytes = crypto.randomBytes(12);
const json  = {
    data: crypto.randomBytes(128)
};

let signature = cosmos.crypto.sign(bytes, keys.privateKey);
let verify    = cosmos.crypto.verify(bytes, signature, keys.publicKey);

if (!verify) {
    throw 'Cant verify signature';
}

signature = cosmos.crypto.signJson(json, keys.privateKey);
verify = cosmos.crypto.verifyJson(json, signature, keys.publicKey);

if (!verify) {
    throw 'Cant verify signature';
}
```

Get address from public key:

```js
const address = cosmos.address.getAddress(keys.publicKey);
console.log(address);
```

Get bytes32 from address:
```js
bytes32 = cosmos.address.getBytes32(address);
console.log(bytes32.toString('hex'));
```

More examples could be found in [tests](/test).

# Docs

To generate docs:

    yarn global add jsdoc
    yarn run docs

Then server them from `out` directory.

# Tests

To run tests:

    git clone git@github.com:WingsDao/cosmos-lib.git
    cd cosmos-lib/
    yarn install
    yarn test

# LICENSE

MIT.
