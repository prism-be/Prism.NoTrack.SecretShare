export interface SecretContent {
    secret: string;
    passphrase: string;
    expiration: number;
}

export interface PlainContent
{
    text: string;
}

export interface EncryptedContent
{
    encrypted: string;
    iv: string;
    passPhrase: string;
}