async function fetchSettings() {
  const res = await fetch('/api/vipps/settings');
  if (!res.ok) throw new Error('Kunne ikke hente Vipps-innstillinger');
  return res.json();
}

function fillForm(form, data) {
  Object.entries(data).forEach(([key, value]) => {
    const field = form.elements.namedItem(key);
    if (!field) return;
    if (field.type === 'checkbox') {
      field.checked = Boolean(value);
    } else {
      field.value = value ?? '';
    }
  });
}

async function saveSettings(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const badge = document.getElementById('status-badge');
  badge.textContent = 'Lagrer…';

  const payload = Object.fromEntries(new FormData(form).entries());
  payload.active = form.elements.active.checked;

  const res = await fetch('/api/vipps/settings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    badge.textContent = 'Lagret';
    badge.style.background = 'rgba(34, 197, 94, 0.15)';
    badge.style.borderColor = 'rgba(34, 197, 94, 0.5)';
  } else {
    badge.textContent = 'Feil';
    badge.style.background = 'rgba(248, 113, 113, 0.15)';
    badge.style.borderColor = 'rgba(248, 113, 113, 0.5)';
  }
}

async function simulatePayment(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const payload = Object.fromEntries(new FormData(form).entries());
  payload.amount = Number(payload.amount);

  const logEl = document.getElementById('payment-log');
  logEl.textContent = 'Sender forespørsel…';

  const res = await fetch('/api/vipps/payments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  logEl.textContent = JSON.stringify(data, null, 2);
}

async function boot() {
  const form = document.getElementById('vipps-form');
  const paymentForm = document.getElementById('payment-form');

  if (form) {
    form.addEventListener('submit', saveSettings);
    try {
      const settings = await fetchSettings();
      fillForm(form, settings);
      document.getElementById('status-badge').textContent = settings.active ? 'Aktiv' : 'Av';
    } catch (err) {
      document.getElementById('status-badge').textContent = 'Feil ved lasting';
      console.error(err);
    }
  }

  if (paymentForm) {
    paymentForm.addEventListener('submit', simulatePayment);
  }
}

boot();
