export interface SecretContent {
    secret: string;
    passphrase: string;
    expiration: number;
}

export interface EncryptedContent
{
    encrypted: string;
}