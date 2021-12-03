import type { Response, Request } from '@sveltejs/kit';
import type { ResponseHeaders } from '@sveltejs/kit/types/helper';
import type { SecretContent, PlainContent } from '$lib/types';
import crypto from 'crypto';

export const post = async (request: Request<any, PlainContent>): Promise<Response> => {

    let headers: ResponseHeaders = {
        'Content-type': 'application/json; charset=UTF-8'
    };

    if (request.body === null) {
        return {
            status: 400,
            headers
        };
    }

    const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
    const iv = crypto.randomBytes(16);

    var encrypted = encrypt(request.body.text, secretKey, iv);

    var data : SecretContent = {
        secret: encrypted + "." + iv.toString('hex')
    };

    return {
        status: 200,
        body: JSON.stringify(data),
        headers: headers
    }
}

const encrypt = (text: string, secretKey: string, iv: Buffer): string => {

    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return encrypted.toString('hex');
};