import createLnRpc, { LnRpc, LnRpcClientConfig } from '@radar/lnrpc';

/**
 * Manages the application LND client instance
 *
 * @class Lightning
 */
export class Lightning {
  public static client: LnRpc;

  public static async init(): Promise<void> {
    Lightning.client = await LnRpcClientFactory.createLnRpcClient();
  }
}

/**
 * Creates LN RPC clients
 *
 * @class LnRpcClientFactory
 */
class LnRpcClientFactory {
  public static async createLnRpcClient(): Promise<LnRpc> {
    const config: LnRpcClientConfig = {
      server: process.env.LND_URL,
      macaroon:
        '0201036C6E6402CF01030A106988B51C5C6C9F8E8366A6EE2849703E1201301A160A0761646472657373120472656164120577726974651A130A04696E666F120472656164120577726974651A170A08696E766F69636573120472656164120577726974651A160A076D657373616765120472656164120577726974651A170A086F6666636861696E120472656164120577726974651A160A076F6E636861696E120472656164120577726974651A140A057065657273120472656164120577726974651A120A067369676E6572120867656E65726174650000062096BE99E65B815429D808B40F702F2F284D6794929C9D176F1C6968D4F3BD60F2',
      cert:
        '-----BEGIN CERTIFICATE-----\nMIIB6DCCAY6gAwIBAgIQXNQ+t49fC2uVWBe90uG4XjAKBggqhkjOPQQDAjA4MR8w HQYDVQQKExZsbmQgYXV0b2dlbmVyYXRlZCBjZXJ0MRUwEwYDVQQDEwxlM2E0Mjk4 NDdmNjkwHhcNMTkwNzExMTcwODQxWhcNMjAwOTA0MTcwODQxWjA4MR8wHQYDVQQK ExZsbmQgYXV0b2dlbmVyYXRlZCBjZXJ0MRUwEwYDVQQDEwxlM2E0Mjk4NDdmNjkw WTATBgcqhkjOPQIBBggqhkjOPQMBBwNCAAQhPCzxx2/SSENwdEaSR085LmbFg9f0 nz66xuEsP+U6Sc9DK6Cr6IBRe8s76b0U1rbkUkIqtbIx0Wxd3KPFapbHo3oweDAO BgNVHQ8BAf8EBAMCAqQwDwYDVR0TAQH/BAUwAwEB/zBVBgNVHREETjBMggxlM2E0 Mjk4NDdmNjmCCWxvY2FsaG9zdIIBKoIEdW5peIIKdW5peHBhY2tldIcEfwAAAYcQ AAAAAAAAAAAAAAAAAAAAAYcErBIAAzAKBggqhkjOPQQDAgNIADBFAiEA1UHOHvki /ymy+g1gtR/v45aQ7lYi0KFxyOwtwyKvlZYCIA1qy8CaxA89KBS8YRTvfr7PN4lX a/fG8/kZFs/hm4Yr\n-----END CERTIFICATE-----',
    };

    // if (process.env.LND_MACAROON_PATH) {
    //   config.macaroonPath = process.env.LND_MACAROON_PATH;
    // }

    // if (process.env.LND_CERT_PATH) {
    //   config.tls = process.env.LND_CERT_PATH;
    // }

    console.log('config: ', config);

    return createLnRpc(config);
  }
}
