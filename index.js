/**
 * Lib helpers to work with cosmos keys and addresses from JS.
 */
'use strict';

exports.address = {};
exports.crypto  = {};

Object.assign(exports.address, require('./lib/address'));
Object.assign(exports.crypto,  require('./lib/crypto'));
