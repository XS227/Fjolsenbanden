const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');

function hideModal() {
  modal?.classList.remove('show');
  if (modalContent) {
    modalContent.innerHTML = '';
  }
}

function bindModalClose() {
  modal?.querySelectorAll('[data-close-modal]').forEach((el) => {
    el.addEventListener('click', hideModal);
  });
}

async function loadForm(sectionKey) {
  const res = await fetch(`/admin/editor-form/${sectionKey}`);
  if (!res.ok) throw new Error(`Kunne ikke hente form for ${sectionKey}`);
  return res.text();
}

async function openEditor(sectionKey) {
  if (!modal || !modalContent) return;
  try {
    const html = await loadForm(sectionKey);
    modalContent.innerHTML = html;
    modal.classList.add('show');
    bindModalClose();
  } catch (err) {
    modalContent.innerHTML = `<div class="card"><p>Kunne ikke laste skjema for <strong>${sectionKey}</strong>.</p><pre>${err.message}</pre></div>`;
    modal.classList.add('show');
    bindModalClose();
  }
}

window.openEditor = openEditor;
window.closeEditor = hideModal;

bindModalClose();
