import dotenv from 'dotenv';
dotenv.config();

export interface IServerConfiguration {
    secretKey: string;
}

export function getServerConfiguration(): IServerConfiguration {
    return {
        secretKey: getEnv('SECRET_KEY'),
    };
}

function getEnv(envKey: string): string {
    const value = process.env[envKey]?.toString();

    if (value == null || value === '') {
        throw new Error(`The environment variable '${envKey}' has not been set.`);
    }

    return value;
}