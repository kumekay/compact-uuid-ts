# ZUID - Compact UUID representation based on Crockford's Base 32

Sometimes it's necessary to represent UUID in a more compact way: to make URL shorter or to show it with smaller QR code.

This package formats it as 26 chars string.

There are number of benefits from such representation:

1. Shorter! 26 chars vs 36 chars
2. Easy to dictate - Case insensitive, similar looking chars: 0-O and 1-i-l are treated in same way
3. URL-safe
4. Works with node/browser and ts/js
5. No dependencies

## Installation

To use with your project

```
npm install zuid --save
```

or

```
yarn add zuid
```

## Usage

```js
import { encode, decode } from 'zuid';

console.log(encode('8affb7d3-f2e7-4053-8cf8-2da9f80964c3'));
// 8nzxqtfseeg2k8sy1dn7w0js63

console.log(decode('8nzxqtfseeg2k8sy1dn7w0js63'));
// 8affb7d3-f2e7-4053-8cf8-2da9f80964c3
```

## Notes

It encodes UUIDs as [Crockford's Base 32](https://www.crockford.com/base32.html). Chars at positions 0 and 13 are hex values (similar to [this](https://github.com/tonsky/compact-uuids) package).
