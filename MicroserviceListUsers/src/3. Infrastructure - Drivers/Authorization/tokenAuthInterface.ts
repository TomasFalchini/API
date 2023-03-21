export interface TokenAuthInterface {
  verify: (token: string) => any;
}
