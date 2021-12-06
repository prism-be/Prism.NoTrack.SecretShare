import crypto from 'crypto';
import { getServerConfiguration } from './config';

const algorithm = 'aes-256-ctr';

export const encrypt = (text: string, passPhrase: string, iv: Buffer): Buffer => {

    const localSecret = getServerConfiguration().secretKey + passPhrase;

    const key = crypto.pbkdf2Sync(localSecret, passPhrase, 42000, 32, 'sha256');

    const cipher = crypto.createCipheriv(algorithm, key, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted;
};

// export const decrypt = (hash: EncryptedContent): string => {

//     const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

//     const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.encrypted, 'hex')), decipher.final()]);

//     return decrpyted.toString();
// };