import crypto from 'crypto';
import { getServerConfiguration } from './config';

const algorithm = 'aes-256-ctr';

export interface Encrypted {
    iv: Buffer;
    data: Buffer;
}

export const encrypt = (text: string, passPhrase: string): Encrypted => {

    const iv = crypto.randomBytes(16);

    const localSecret = getServerConfiguration().secretKey + passPhrase;

    const key = crypto.pbkdf2Sync(localSecret, passPhrase, 42000, 32, 'sha512');

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const data = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        data,
        iv
    };
};

export const decrypt = (encrypted: string, iv: string, passPhrase: string): string => {
    const localSecret = getServerConfiguration().secretKey + passPhrase;
    const key = crypto.pbkdf2Sync(localSecret, passPhrase, 42000, 32, 'sha512');

    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);

    return decrypted.toString();
};