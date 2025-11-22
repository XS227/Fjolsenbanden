/**
 * Representerer Vipps-innstillinger for en streamer/konto.
 */
export class VippsSettings {
  constructor({
    merchant_serial_number,
    client_id,
    client_secret,
    subscription_key,
    callback_url,
    environment = 'test',
    active = true,
  }) {
    this.merchant_serial_number = merchant_serial_number;
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.subscription_key = subscription_key;
    this.callback_url = callback_url;
    this.environment = environment;
    this.active = Boolean(active);
  }

  toJSON() {
    return {
      merchant_serial_number: this.merchant_serial_number,
      client_id: this.client_id,
      client_secret: this.client_secret,
      subscription_key: this.subscription_key,
      callback_url: this.callback_url,
      environment: this.environment,
      active: this.active,
    };
  }

  static fromJSON(data = {}) {
    return new VippsSettings(data);
  }
}
