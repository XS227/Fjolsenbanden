<?php
$navLinks = [
    ['href' => 'updates.php', 'label' => 'Oppdateringer'],
    ['href' => 'index.php#medlem', 'label' => 'Medlemskap'],
    ['href' => 'index.php#premier', 'label' => 'Premier'],
    ['href' => 'index.php#aktiviteter', 'label' => 'Aktiviteter'],
    ['href' => 'index.php#foreldre', 'label' => 'Foreldre'],
    ['href' => 'index.php#community', 'label' => 'Community'],
    ['href' => 'index.php#giles', 'label' => 'Giles'],
    ['href' => 'index.php#sponsor', 'label' => 'Sponsorer'],
];
?>
<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fjolsenbanden – Oppdatering: Quest-board</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&display=swap" rel="stylesheet" />
    <style>
      body {
        font-family: "Nunito", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
    </style>
  </head>
  <body id="top" class="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-[#FFF5F7] via-[#F6F7FF] to-[#ECFEFF] text-slate-900">
    <header class="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a class="flex items-center gap-3" href="index.php" aria-label="Gå til forsiden">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF87F3] to-[#FFC46C] text-lg font-extrabold text-white shadow-lg">FB</div>
          <div class="leading-tight">
            <span class="block text-xs uppercase tracking-[0.3em] text-[#FF7AD9]">Fjolsenbanden</span>
            <span class="text-base font-semibold">Spillglede for hele familien</span>
          </div>
        </a>
        <div class="flex items-center gap-3">
          <nav class="hidden items-center gap-4 text-sm font-semibold text-slate-600 md:flex">
            <?php foreach ($navLinks as $link): ?>
              <a class="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[#FF7AD9]" href="<?= htmlspecialchars($link['href']) ?>">
                <?= htmlspecialchars($link['label']) ?>
              </a>
            <?php endforeach; ?>
          </nav>
          <a class="hidden rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C] sm:inline-flex" href="index.php#foreldre">
            Logg inn med Vipps
          </a>
          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#FF7AD9]/30 bg-white text-[#FF7AD9] shadow-sm transition hover:border-[#FF7AD9] md:hidden"
            aria-controls="mobile-menu-panel"
            aria-expanded="false"
            data-menu-toggle
          >
            <span class="sr-only">Åpne meny</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
              <path d="M4 7.5h16M4 12h16M4 16.5h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div id="mobile-menu-panel" class="fixed inset-0 z-50 hidden md:hidden" role="dialog" aria-modal="true">
      <div class="absolute inset-0 bg-slate-900/50" data-menu-close aria-hidden="true"></div>
      <nav class="absolute left-1/2 top-24 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 space-y-4 rounded-3xl bg-white/95 p-6 shadow-2xl">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF87F3] to-[#FFC46C] text-sm font-extrabold text-white">FB</div>
            <span class="text-sm font-semibold text-slate-700">Meny</span>
          </div>
          <button type="button" class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#FF7AD9]/30 text-[#FF7AD9] transition hover:border-[#FF7AD9]" data-menu-close>
            <span class="sr-only">Lukk meny</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="h-4 w-4">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
        <div class="space-y-2 text-sm font-semibold text-slate-600">
          <?php foreach ($navLinks as $link): ?>
            <a class="flex items-center justify-between rounded-2xl border border-transparent bg-slate-50 px-4 py-3 transition hover:border-[#FF7AD9]/40 hover:bg-white hover:text-[#FF7AD9]" href="<?= htmlspecialchars($link['href']) ?>" data-menu-close>
              <?= htmlspecialchars($link['label']) ?>
              <span aria-hidden>→</span>
            </a>
          <?php endforeach; ?>
        </div>
        <a class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C]" href="index.php#foreldre" data-menu-close>
          Logg inn med Vipps
        </a>
      </nav>
    </div>

    <main class="mx-auto max-w-5xl px-4 py-16">
      <a class="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#FF7AD9] shadow-sm ring-1 ring-[#FF7AD9]/20 transition hover:bg-white" href="index.php">
        ← Tilbake til forsiden
      </a>
      <header class="mt-8 space-y-4 text-center">
        <span class="inline-flex items-center gap-2 rounded-full bg-[#22D3EE]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#0EA5E9]">
          🌟 Oppdatering • Mai 2024
        </span>
        <h1 class="text-4xl font-black leading-tight sm:text-5xl">Lansering av Fjolsenbanden Quest-board</h1>
        <p class="mx-auto max-w-3xl text-base text-slate-600">
          Vi gjør spillhverdagen enda enklere for hele familien. Quest-boardet samler ukens aktiviteter, premier og trygghetsinformasjon på ett sted.
          Her får du full oversikt – uansett om du er forelder, spiller eller sponsor.
        </p>
      </header>

      <section class="mt-12 grid gap-6 md:grid-cols-3">
        <article class="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl">
          <h2 class="text-xl font-bold text-slate-800">Hva er nytt?</h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-600">
            <li class="flex items-start gap-3">
              <span class="mt-1 text-[#FF7AD9]">✔</span>
              <span>Ukentlige quester med digitale badges og spesialpremier fra våre partnere.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 text-[#FF7AD9]">✔</span>
              <span>Foreldre får et eget panel med tidsplan, anbefalt skjermtid og aktivitetsvarsler.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 text-[#FF7AD9]">✔</span>
              <span>Verifiserte veiledere følger hvert oppdrag med fokus på trygg chat og god språkbruk.</span>
            </li>
          </ul>
        </article>

        <article class="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl">
          <h2 class="text-xl font-bold text-slate-800">Tidsplan</h2>
          <ul class="mt-4 space-y-3 text-sm text-slate-600">
            <li>
              <strong>Uke 1–2:</strong> Quest-board for Minecraft- og Roblox-kvelder. Foreldretester sendes ut.
            </li>
            <li>
              <strong>Uke 3:</strong> Lansering av familie-turneringer med Vipps-baserte påmeldinger.
            </li>
            <li>
              <strong>Uke 4:</strong> Nye streaming overlays og sponsoroppdrag live på Twitch.
            </li>
          </ul>
        </article>

        <article class="rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl">
          <h2 class="text-xl font-bold text-slate-800">Hvordan bli med</h2>
          <p class="mt-4 text-sm text-slate-600">
            Logg inn via Vipps, besøk «Quest-board» i dashboardet og velg ukens oppdrag. Spillere får automatisk badges og trekker premie-lodd når oppdraget er fullført. Foreldre kan godkjenne deltakelse og få varsler om neste aktivitet rett i e-post og Discord.
          </p>
          <a class="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#34D399] to-[#22D3EE] px-6 py-3 text-sm font-semibold text-white shadow transition hover:from-[#22C55E] hover:to-[#0EA5E9]" href="index.php#medlem">
            Meld inn familien nå
            <span aria-hidden>→</span>
          </a>
        </article>
      </section>

      <section class="mt-16 rounded-3xl border border-white/60 bg-white/80 p-8 shadow-xl">
        <h2 class="text-2xl font-extrabold text-slate-800">Forberedelser for foreldre</h2>
        <div class="mt-4 grid gap-6 md:grid-cols-2">
          <ul class="space-y-3 text-sm text-slate-600">
            <li class="flex items-start gap-3">
              <span class="mt-1 text-[#22D3EE]">💡</span>
              <span>Sett opp familiens brukere i Vipps-innloggingen for å få riktige varsler.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 text-[#22D3EE]">💡</span>
              <span>Planlegg spilltid sammen og velg hvilke quester som passer best denne uken.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-1 text-[#22D3EE]">💡</span>
              <span>Bruk foreldrepanelet til å sende heiarop og emojis direkte inn i barnets quest-feed.</span>
            </li>
          </ul>
          <div class="rounded-3xl bg-gradient-to-br from-[#FFF5F7] via-[#E0EAFF] to-[#F8F9FF] p-6 text-sm text-slate-600 shadow-inner">
            <h3 class="text-lg font-semibold text-slate-800">Tips til gamerne</h3>
            <p class="mt-3">
              Fullfør minst tre quester i måneden for å låse opp «Quest Master»-badgen. Badgen gir ekstra lodd i månedens premiepotte og spesielle shoutouts under stream.
            </p>
            <p class="mt-3">
              Del fremgang på Discord i kanalen <strong>#quest-board</strong> for å inspirere andre og få bonuspoeng.
            </p>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-white/40 bg-white/70 py-8 text-center text-xs text-slate-500">
      © <?= date('Y') ?> Fjolsenbanden – Oppdateringer og nyheter.
    </footer>

    <div class="fixed inset-x-0 bottom-0 z-40 border-t border-white/60 bg-white/90 backdrop-blur md:hidden">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" class="flex items-center gap-2" data-menu-close>
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF87F3] to-[#FFC46C] text-sm font-extrabold text-white">FB</div>
          <span class="text-xs font-semibold uppercase tracking-widest text-[#FF7AD9]">Fjolsenbanden</span>
        </a>
        <div class="flex items-center gap-2">
          <a class="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-4 text-xs font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C]" href="index.php#foreldre" data-menu-close>
            Vipps
          </a>
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#FF7AD9]/30 bg-white text-[#FF7AD9] shadow-sm transition hover:border-[#FF7AD9]"
            aria-controls="mobile-menu-panel"
            aria-expanded="false"
            data-menu-toggle
          >
            <span class="sr-only">Åpne meny</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
              <path d="M4 7.5h16M4 12h16M4 16.5h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <script>
      document.addEventListener('DOMContentLoaded', () => {
        const menuPanel = document.getElementById('mobile-menu-panel');
        if (!menuPanel) return;

        const toggleButtons = document.querySelectorAll('[data-menu-toggle]');
        const setMenuState = (open) => {
          menuPanel.classList.toggle('hidden', !open);
          document.body.classList.toggle('overflow-hidden', open);
          toggleButtons.forEach((btn) => btn.setAttribute('aria-expanded', open ? 'true' : 'false'));
        };

        toggleButtons.forEach((btn) => {
          btn.addEventListener('click', () => {
            const isHidden = menuPanel.classList.contains('hidden');
            setMenuState(isHidden);
          });
        });

        document.addEventListener('click', (event) => {
          const closeTarget = event.target.closest('[data-menu-close]');
          if (closeTarget && !menuPanel.classList.contains('hidden')) {
            setMenuState(false);
          }
        });

        document.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && !menuPanel.classList.contains('hidden')) {
            setMenuState(false);
          }
        });
      });
    </script>
  </body>
</html>
