/**
 * Crypto lib tests.
 */
'use strict';

require('chai').should();

const cosmos = require('../index.js');
const crypto = require('crypto');

const MNEMONIC    = 'cluster unveil differ bright define prosper hunt warrior fetch rough host fringe worry mention gospel enlist elder laugh segment funny avoid regular market fortune';
const PUBLIC_KEY  = '037613839479ae3b2a00be35ec9a97a27c53ef551788de7ef51628970458b3d38f';
const PRIVATE_KEY = '8ce79a8c09c0e899715d33ef091eca92e1d77fbbd335bc8adfc1af0a29945a46';

describe('lib/crypto', () => {
    let keys;
    let signature;

    const bytes = crypto.randomBytes(12);
    const json  = {
        MNEMONIC,
        PUBLIC_KEY,
        data: crypto.randomBytes(128)
    };

    it('Should generate keys from mnemonic', () => {
        keys = cosmos.crypto.getKeysFromMnemonic(MNEMONIC);

        keys.publicKey.toString('hex').should.equal(PUBLIC_KEY);
        keys.privateKey.toString('hex').should.equal(PRIVATE_KEY);
    });

    it('Should sign bytes with private key', () => {
        signature = cosmos.crypto.sign(bytes, keys.privateKey);
        signature.length.should.be.equal(64);
    });

    it('Should verify signature', () => {
        const verify = cosmos.crypto.verify(bytes, signature, keys.publicKey);
        verify.should.be.true;
    });

    it('Should sign JSON with private key', () => {
        signature = cosmos.crypto.signJson(json, keys.privateKey);
        signature.length.should.be.equal(64);
    });

    it('Should verify signature on JSON', () => {
        const verify = cosmos.crypto.verifyJson(json, signature, keys.publicKey);
        verify.should.be.true;
    });

    it('Should reject wrong signature', () => {
        const verify = cosmos.crypto.verifyJson(json, crypto.randomBytes(64), keys.publicKey);
        verify.should.be.false;
    });
});
