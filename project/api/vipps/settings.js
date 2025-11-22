import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { VippsSettings } from '../../models/VippsSettings.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const settingsFile = path.resolve(__dirname, '../../static/data/vipps-settings.json');

function readSettings() {
  const raw = fs.readFileSync(settingsFile, 'utf-8');
  return VippsSettings.fromJSON(JSON.parse(raw));
}

function writeSettings(settings) {
  fs.writeFileSync(settingsFile, JSON.stringify(settings.toJSON(), null, 2), 'utf-8');
}

/**
 * GET /api/vipps/settings
 */
export function getVippsSettingsHandler(_req, res) {
  const settings = readSettings();
  return res.status(200).json(settings.toJSON());
}

/**
 * POST /api/vipps/settings
 */
export function updateVippsSettingsHandler(req, res) {
  const settings = readSettings();
  Object.assign(settings, req.body || {});
  writeSettings(settings);
  return res.status(200).json({ success: true, settings: settings.toJSON() });
}

/**
 * POST /api/vipps/payments
 * Body: { amount, orderId, returnUrl }
 */
export function createVippsPaymentHandler(req, res) {
  const settings = readSettings();
  if (!settings.active) {
    return res.status(400).json({ error: 'Vipps er deaktivert' });
  }

  const { amount, orderId, returnUrl } = req.body || {};
  if (!amount || !orderId || !returnUrl) {
    return res.status(400).json({ error: 'Mangler obligatoriske felter (amount, orderId, returnUrl)' });
  }

  // Stub respons – her ville man kalt Vipps ePayment API
  return res.status(200).json({
    redirectUrl: `${settings.callback_url}?orderId=${encodeURIComponent(orderId)}`,
    orderId,
    amount,
    environment: settings.environment,
  });
}
