const uuidRegExp = RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
const zuidRegExp = RegExp(/^[0-9a-f]{1}[0-9a-tv-z]{12}[0-9a-f]{1}[0-9a-tv-z]{12}$/i);
const binaryUUIDRegExp = RegExp(
    /^(.{4})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{4})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})(.{5})$/,
);
const binaryZUIDRegExp = RegExp(
    /^(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})(.{8})$/,
);
const encodeMap: string[] = '0123456789abcdefghjkmnpqrstvwxyz'.split('');

export function validUUID(uuid: string): boolean {
    return !!uuid.match(uuidRegExp);
}

export function encode(uuid: string): string {
    if (!validUUID(uuid)) {
        throw new Error('Invalid format of UUID, should be like "00112233-4455-6677-8899-aabbccddeeff"');
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    return uuid
        .match(/[0-9a-f]{2}/gi)!
        .map((byte): number => parseInt(byte, 16))
        .map((byte): string => byte.toString(2).padStart(8, '0'))
        .join('')
        .match(binaryUUIDRegExp)!
        .slice(1, 27)
        .map((char): string => encodeMap[parseInt(char, 2)!])
        .join('');
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
}

export function validZUID(zuid: string): boolean {
    return !!zuid.match(zuidRegExp);
}

export function decode(zuid: string): string {
    if (!validZUID(zuid)) {
        throw new Error('Invalid format of ZUID');
    }

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    const uuid = zuid
        .replace(/o/g, '0')
        .replace(/[li]/g, '1')
        .split('')
        .map((char): number => encodeMap.indexOf(char)!)
        .map((byte, i): string => byte.toString(2).padStart(i == 0 || i == 13 ? 4 : 5, '0'))
        .join('')
        .match(binaryZUIDRegExp)!
        .slice(1, 17)
        .map((byte): string =>
            parseInt(byte, 2)
                .toString(16)
                .padStart(2, '0'),
        );
    /* eslint-enable @typescript-eslint/no-non-null-assertion */

    uuid.splice(4, 0, '-');
    uuid.splice(7, 0, '-');
    uuid.splice(10, 0, '-');
    uuid.splice(13, 0, '-');
    return uuid.join('');
}
