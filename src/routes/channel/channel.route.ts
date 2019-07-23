import BigNumber from 'bignumber.js';
import { NextFunction, Request, Response } from 'express';
import { body, check, validationResult } from 'express-validator/check';
import Rebalancer from 'lnrpc-circular-rebalancer/dist/rebalancer';
import { logger } from '../../services';
import { ChannelRebalancer } from '../../services/lnd';
import { BaseRoute } from '../route';

/**
 * @api {get} /invoice Invoice Request
 * @api {post} /invoice/pay Pay Invoice Request
 * @apiName Invoice
 * @apiGroup Invoice
 *
 * @apiSuccess 200
 */
export class ChannelRoute extends BaseRoute {
  public static path = '/channel';
  private static instance: ChannelRoute;

  /**
   * @class ChannelRoute
   * @constructor
   */
  private constructor() {
    super();
    this.get = this.get.bind(this);
    this.rebalance = this.rebalance.bind(this);
    // this.autoRebalance = this.autoRebalance.bind(this);
    this.init();
  }

  static get router() {
    if (!ChannelRoute.instance) {
      ChannelRoute.instance = new ChannelRoute();
    }
    return ChannelRoute.instance.router;
  }

  private init() {
    logger.info('[ChannelRoute] Creating channel route.');
    this.router.get('/', this.get);
    this.router.post('/rebalance', [], this.rebalance);
  }

  /**
   * Get a newly generated invoice for 1000 sats
   * @class ChannelRoute
   * @method get
   * @param req {Request}
   * @param res {Response}
   * @param next {NextFunction}
   */
  private async get(req: Request, res: Response, next: NextFunction) {
    // try {
    //   const { paymentRequest } = await Lightning.client.addInvoice({
    //     value: '1000',
    //   });
    //   logger.info(`[ChannelRoute] Invoice created: ${paymentRequest}.`);
    //   res.json({ invoice: paymentRequest });
    // } catch (err) {
    //   res.status(400).json({ error: err });
    // }
    next();
  }

  /**
   * Accept an invoice for payment
   * @class ChannelRoute
   * @method post
   * @param req {Request}
   * @param res {Response}
   * @param next {NextFunction}
   */
  private async rebalance(req: Request, res: Response, next: NextFunction) {
    console.log('hits rebalance method');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.info(
        `[ChannelRoute] /rebalance validation error: ${errors.array()}.`,
      );
      res.status(400).json({ error: errors.array() });
      return;
    }
    console.log('req: ', req);
    try {
      logger.info(`[ChannelRoute] /rebalance`);
      ChannelRebalancer.rebalancer.rebalanceChannelWithAmountByPublicKey(
        req.body.amtSats,
        req.body.publicKey,
      );
      res.status(200).json({
        foo: 'bar',
      });
    } catch (err) {
      logger.info(`[ChannelRoute] /pay error: ${err}.`);
      res.status(400).json({ error: err.message });
    }
    next();
  }
}