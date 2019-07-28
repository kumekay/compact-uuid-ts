import { decode, encode, validUUID, validZUID } from '../src/index';
import uuid from 'uuid/v4';

const validIDs = [
    ['00000000-0000-0000-0000-000000000000', '00000000000000000000000000'],
    ['8AFFb7d3-f2e7-4053-8cf8-2da9f80964c3', '8nzxqtfseeg2k8sy1dn7w0js63'],
    ['ffffffff-ffff-ffff-ffff-ffffffffffff', 'fzzzzzzzzzzzzfzzzzzzzzzzzz'],
];

const invalidUUIDs = ['', 'sdaf', 'cd3cd9e1-326-43ed-a63c-ae1929a07e08', '0h5b7819-a497-4956-992b-2569a8f606f1'];

const invalidZUIDs = ['', 'asdf', '8uzxqtfseeg2k8sy1dn7w0js63'];

test('#validUUID', (): void => {
    for (let id of validIDs) {
        expect(validUUID(id[0])).toBe(true);
    }

    for (let id of invalidUUIDs) {
        expect(validUUID(id)).toBe(false);
    }
});

test('#encode', (): void => {
    for (let id of validIDs) {
        expect(encode(id[0])).toBe(id[1]);
    }

    expect((): void => {
        encode('bad-string');
    }).toThrow(/invalid/i);
});

test('#validZUID', (): void => {
    for (let id of validIDs) {
        expect(validZUID(id[1])).toBe(true);
    }

    for (let id of invalidZUIDs) {
        expect(validZUID(id)).toBe(false);
    }
});

test('#decode', (): void => {
    for (let id of validIDs) {
        expect(decode(id[1])).toBe(id[0].toLowerCase());
    }

    expect((): void => {
        decode('bad-string');
    }).toThrow(/invalid/i);
});

test('round trip', (): void => {
    for (let i = 0; i < 1000; i++) {
        const id = uuid();
        expect(decode(encode(id))).toBe(id);
    }
});
