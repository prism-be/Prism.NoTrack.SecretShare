export interface SecretContent {
    secret: string;
    passphrase: string;
    expiration: number;
}

export interface EncryptedContent
{
    encrypted: string;
    passphrase: string;
}

export interface RevealedContent {
    secret: string;
}