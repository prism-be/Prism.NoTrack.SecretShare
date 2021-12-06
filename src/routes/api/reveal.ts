import type { Response, Request } from '@sveltejs/kit';
import type { ResponseHeaders } from '@sveltejs/kit/types/helper';
import type { EncryptedContent, RevealedContent, SecretContent } from '$lib/types';
import { encryptedContentValidation } from '$lib/validations';
import { decrypt } from '$lib/crypto';
import { getUnixTime } from 'date-fns';

export const post = async (request: Request<any, EncryptedContent>): Promise<Response> => {
    let headers: ResponseHeaders = {
        'Content-type': 'application/json; charset=UTF-8'
    };

    if (request.body === null) {
        return {
            status: 400,
            headers
        };
    }

    var encryptedContent: EncryptedContent = request.body;

    await encryptedContentValidation.validate(encryptedContent)

    const secretContentString = encryptedContent.encrypted.split('.');

    if (secretContentString.length !== 2) {
        return {
            status: 400,
            headers
        };
    }

    const encrypted = secretContentString[0];
    const iv = secretContentString[1];

    var secretContent: SecretContent = JSON.parse(decrypt(encrypted, iv, encryptedContent.passphrase));

    const nowUnixTime = getUnixTime(new Date());

    if (nowUnixTime > secretContent.expiration)
    {
        return {
            status: 410,
            headers: headers
        }
    }

    const decrypted: RevealedContent = {
        secret: secretContent.secret
    }

    return {
        status: 200,
        body: JSON.stringify(decrypted),
        headers: headers
    }
}