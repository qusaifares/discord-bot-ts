declare namespace NodeJS {
  export interface ProcessEnv extends Dict<string> {
    CLIENT_ID: string;
    TOKEN: string;
    PREFIX: string;
  }
}
