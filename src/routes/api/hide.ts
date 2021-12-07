import type { Response, Request } from '@sveltejs/kit';
import type { ResponseHeaders } from '@sveltejs/kit/types/helper';
import type { SecretContent, EncryptedContent } from '$lib/types';
import { secretContentValidation } from '$lib/validations';
import { encrypt } from '$lib/crypto';

export const post = async (request: Request<any, SecretContent>): Promise<Response> => {

    let headers: ResponseHeaders = {
        'Content-type': 'application/json; charset=UTF-8'
    };

    if (request.body === null) {
        return {
            status: 400,
            headers
        };
    }

    var secretContent: SecretContent = request.body;

    await secretContentValidation.validate(secretContent)

    const secretContentString = JSON.stringify({
        secret: secretContent.secret,
        expiration: secretContent.expiration
    });

    const encrypted  = encrypt(secretContentString, secretContent.passphrase);

    var encryptedContent: EncryptedContent = {
        encrypted: encrypted.data.toString('hex') + "." + encrypted.iv.toString('hex'),
        passphrase: secretContent.passphrase
    };

    return {
        status: 200,
        body: JSON.stringify(encryptedContent),
        headers: headers
    }
}