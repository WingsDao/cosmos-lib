/**
 * Address lib tests.
 */
'use strict';

require('chai').should();

const cosmos = require('../index.js');

const PREFIX     = 'cosmos';
const WPREFIX    = 'wallets';

const ADDRESS    = `${PREFIX}1um27s6ee62r8evnv7mz85fe4mz7yx6rka29h2m`;
const WADDRESS   = 'wallets1um27s6ee62r8evnv7mz85fe4mz7yx6rkawd57y';
const BYTES_HEX  = 'e6d5e86b39d2867cb26cf6c47a2735d8bc436876';
const BYTES32_HEX = BYTES_HEX + Buffer.alloc(12).toString('hex');
const PUBLIC_KEY  = '037613839479ae3b2a00be35ec9a97a27c53ef551788de7ef51628970458b3d38f';

describe('lib/address', () => {
    let bytes;
    let bytes32;

    it('Should generate address from public key', () => {
        const addr = cosmos.address.getAddress(Buffer.from(PUBLIC_KEY, 'hex'));
        addr.should.be.equal(ADDRESS);
    });

    it('Should get bytes from address', () => {
        bytes = cosmos.address.getBytes(ADDRESS);

        bytes.length.should.be.equal(20);
        bytes.toString('hex').should.be.equal(BYTES_HEX);
    });

    it('Should get address from bytes', () => {
        const addr = cosmos.address.getAddressFromBytes(bytes);
        addr.should.be.equal(ADDRESS);
    });

    it('Should get bytes32 from address', () => {
        bytes32 = cosmos.address.getBytes32(ADDRESS);

        bytes32.length.should.be.equal(32);
        bytes32.toString('hex').should.be.equal(BYTES32_HEX);
    });

    it('Should get address from bytes32', () => {
        const addr = cosmos.address.getAddressFromBytes32(bytes32);
        addr.should.be.equal(ADDRESS);
    });

    it('Should use different prefix for address', () => {
      let addr = cosmos.address.getAddress(Buffer.from(PUBLIC_KEY, 'hex'), WPREFIX);
      addr.should.be.equal(WADDRESS);

      addr = cosmos.address.getAddressFromBytes32(bytes32, WPREFIX);
      addr.should.be.equal(WADDRESS);
    });
});
