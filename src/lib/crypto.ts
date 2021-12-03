import crypto from 'crypto';
import type { EncryptedContent } from './types';

const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
const iv = crypto.randomBytes(16);

const encrypt = (text: string, passPhrase: string): string => {

    const localSecret = secretKey + passPhrase;
    const cipher = crypto.createCipheriv(algorithm, localSecret, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex') + " . " + iv.toString('hex');
};

const decrypt = (hash: EncryptedContent): string => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.encrypted, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

module.exports = {
    encrypt,
    decrypt
};