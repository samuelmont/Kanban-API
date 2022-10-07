export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECTION_STRING: string;
      PORT: number;
      SALT: number
    }
  }
}
