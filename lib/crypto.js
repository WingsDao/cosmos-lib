/**
 * Lib helps to work with Cosmos private/public keys.
 *
 * @module lib/crypto
 */
'use strict';

const bip39     = require('bip39');
const bip32     = require('bip32');
const crypto    = require('crypto');
const secp256k1 = require('secp256k1');

/**
 * Get keys (private/public) from mnemonic and path (bip32/39/44).
 *
 * @param  {String} mnemonic        Mnemonic words.
 * @param  {String} path            BIP44 path.
 * @return {Object.<Buffer,Buffer>} Wallet object contains privateKey/publicKey.
 */
exports.getKeysFromMnemonic = function getKeysFromMnemonic(mnemonic, path='44\'/118\'/0\'/0/0') {
    const seed   = bip39.mnemonicToSeedSync(mnemonic);
    const master = bip32.fromSeed(seed);
    const wallet = master.derivePath(path);

    return wallet;
};

/**
 * Sign bytes with private key by secp256k1 algo.
 *
 * @param  {Buffer} bytes      Bytes to sign.
 * @param  {Buffer} privateKey Private key to sign bytes.
 * @return {Buffer}            Signature bytes.
 */
function sign(bytes, privateKey) {
    const hash = crypto.createHash('sha256')
        .update(bytes)
        .digest();

    return secp256k1.sign(hash, privateKey).signature;
}

/**
 * Verify signature by object bytes and public key.
 *
 * @param  {Buffer} bytes     Bytes to verify signature.
 * @param  {Buffer} signature Signature bytes.
 * @param  {Buffer} publicKey Public key to verify signature.
 * @return {Boolean}          Result of verification.
 */
function verify(bytes, signature, publicKey) {
    const hash = crypto.createHash('sha256')
        .update(bytes)
        .digest();

    return secp256k1.verify(hash, signature, publicKey);
}

exports.sign   = sign;
exports.verify = verify;

/**
 * Sign JSON object by private key.
 *
 * @param  {Object} json       Object to sign.
 * @param  {Buffer} privateKey Private key to sign object.
 * @return {Buffer}            Signature bytes.
 */
exports.signJson = function signJson(json, privateKey) {
    const jsonStr = JSON.stringify(json);

    return sign(Buffer.from(jsonStr, 'utf8'), privateKey);
};

/**
 * Verify JSON object by signature and public key.
 *
 * @param  {Object} json      Object to verify signature.
 * @param  {Buffer} signature Signature to bytes.
 * @param  {Buffer} publicKey Public key to verify signature.
 * @return {Boolean}          Result of verification.
 */
exports.verifyJson = function verifyJson(json, signature, publicKey) {
    const jsonStr = JSON.stringify(json);
    return verify(Buffer.from(jsonStr, 'utf8'), signature, publicKey);
};

/**
 * Validate mnemonic words.
 *
 * @param  {String} mnemonic  Mnemonic words string.
 * @return {Boolean}          Result of validation.
 */
exports.validateMnemonic = bip39.validateMnemonic