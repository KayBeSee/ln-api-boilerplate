import { LnRpc } from '@radar/lnrpc';
import { Lightning } from '../../../src/services/lnd';
import { expect, lnrpcStub, rest } from '../../lib';

describe('channel route', () => {
  const client = rest.client();
  const ABI_BASE = '/api/channel';

  beforeEach(() => {
    Lightning.client = { ...lnrpcStub } as LnRpc;
  });

  it('should GET channels', async () => {
    const { status, body } = await client.get(ABI_BASE);
    console.log('status: ', status, 'body: ', body);
    expect(status).to.equal(200);
    expect(body.invoice).to.not.be.undefined;
  });

  it('should POST invoice/pay to pay route and return preimage', async () => {
    const { status, body } = await client.post(`${ABI_BASE}/pay`).send({
      invoice: 'invoice',
    });
    expect(status).to.equal(200);
    expect(body.preimage).to.equal('deadbeef');
  });

  it('should return error on POST invoice/pay with >10000 sats', async () => {
    Lightning.client.decodePayReq = () => {
      return {
        numSatoshis: 10001,
      } as any;
    };
    const { status, body } = await client.post(`${ABI_BASE}/pay`).send({
      invoice: 'invoice',
    });
    expect(status).to.equal(400);
    expect(body.error[0].msg).to.match(
      /^Payment Request amount exceeds 10000 satoshi.*$/,
    );
  });

  it('should return paymentError on POST invoice/pay if LND SendPayment fails', async () => {
    const expectedPaymentError = 'invoice expired';
    Lightning.client.sendPaymentSync = () => {
      return {
        paymentError: expectedPaymentError,
      } as any;
    };
    const { status, body } = await client.post(`${ABI_BASE}/pay`).send({
      invoice: 'invoice',
    });
    expect(status).to.equal(400);
    expect(body.error).to.equal(expectedPaymentError);
  });
});
