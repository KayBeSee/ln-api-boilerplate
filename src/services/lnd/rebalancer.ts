import { LnRpc } from '@radar/lnrpc';
import Rebalancer from 'lnrpc-circular-rebalancer/dist/rebalancer';

/**
 * Manages the application LND client instance
 *
 * @class Rebalancer
 */
export class ChannelRebalancer {
  public static rebalancer: Rebalancer;

  public static async init(lightningClient: LnRpc): Promise<void> {
    // Rebalancer.client = new Rebalancer(lightningClient);
    ChannelRebalancer.rebalancer = new Rebalancer(lightningClient);
  }
}
