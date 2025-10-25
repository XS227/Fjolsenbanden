<?php
$navLinks = [
    ['href' => '#medlem', 'label' => 'Medlemskap'],
    ['href' => '#premier', 'label' => 'Premier'],
    ['href' => '#aktiviteter', 'label' => 'Aktiviteter'],
    ['href' => '#foreldre', 'label' => 'Foreldre'],
    ['href' => '#community', 'label' => 'Community'],
    ['href' => '#sponsor', 'label' => 'Sponsorer'],
];

$heroHighlights = [
    ['label' => 'Trygge turneringer for 8–16 år', 'gradient' => 'from-pink-400 via-orange-300 to-yellow-200'],
    ['label' => 'Premier og quester hver uke', 'gradient' => 'from-sky-300 via-violet-300 to-pink-200'],
    ['label' => 'Foreldre har full oversikt', 'gradient' => 'from-green-200 via-green-300 to-emerald-200'],
];

$membershipLevels = [
    [
        'title' => 'Gratis',
        'price' => '0 kr',
        'tagline' => 'Start eventyret',
        'features' => ['Discord og trygg chat', 'Åpne aktivitetskvelder', 'Stem på fremtidige streams'],
        'accent' => 'sunrise',
    ],
    [
        'title' => 'Premie',
        'price' => '49 kr/mnd',
        'tagline' => 'Vinn og glitr',
        'features' => ['Eksklusive premier hver uke', 'VIP-plasser i turneringer', 'Foreldreverifisering via Vipps'],
        'accent' => 'lagoon',
    ],
    [
        'title' => 'Sponsor',
        'price' => '299 kr/mnd',
        'tagline' => 'Gi tilbake',
        'features' => ['Logo i sending', 'Skreddersydde sponsor-events', 'Samarbeid med trygge rollemodeller'],
        'accent' => 'starlight',
    ],
];

$accentStyles = [
    'sunrise' => [
        'card' => 'from-[#FFD6E8] via-[#FFF6B7] to-[#FFC8DD] text-[#3B0764]',
        'badge' => 'text-[#C026D3]',
    ],
    'lagoon' => [
        'card' => 'from-[#C8F2FF] via-[#8DE5FF] to-[#B5F5DC] text-[#083344]',
        'badge' => 'text-[#0E7490]',
    ],
    'starlight' => [
        'card' => 'from-[#E8E7FF] via-[#D4C5FF] to-[#FFDEE9] text-[#1E1B4B]',
        'badge' => 'text-[#6D28D9]',
    ],
];

$activityCards = [
    [
        'title' => 'Kreative byggedager',
        'description' => 'Minecraft, Roblox og byggeutfordringer med veiledere til stede.',
        'gradient' => 'from-pink-100 to-cyan-100',
    ],
    [
        'title' => 'Squad challenges',
        'description' => 'Lag vennelag, spill trygge e-sport-kamper og vinn badges.',
        'gradient' => 'from-green-100 to-sky-200',
    ],
    [
        'title' => 'Feelgood fredager',
        'description' => 'Kahoot, tegne-quiz og musikkbingo ledet av Fjolsenbanden.',
        'gradient' => 'from-violet-100 to-pink-100',
    ],
];

$monthlyPrizes = [
    ['brand' => 'Lenovo', 'item' => 'Legendarisk gaming-kit', 'gradient' => 'from-[#FFAFBD] to-[#ffc3a0]'],
    ['brand' => 'Samsung', 'item' => 'Superfresh 27” skjerm', 'gradient' => 'from-[#A0E9FF] to-[#AEBAF8]'],
    ['brand' => 'Philips', 'item' => 'Hue party-pack', 'gradient' => 'from-[#FDC5F5] to-[#F7AEF8]'],
    ['brand' => 'NKI', 'item' => 'Kreativt kursstipend', 'gradient' => 'from-[#B9FBC0] to-[#98F5E1]'],
];

$communityStats = [
    ['num' => '3 200+', 'label' => 'Twitch-venner', 'gradient' => 'from-[#FF9A9E] to-[#FAD0C4]'],
    ['num' => '4 200+', 'label' => 'TikTok-heiarop', 'gradient' => 'from-[#B5FFFC] to-[#CFFAFE]'],
    ['num' => '2 500+', 'label' => 'Discord-prater', 'gradient' => 'from-[#E0C3FC] to-[#8EC5FC]'],
    ['num' => '350+', 'label' => 'YouTube-klipp', 'gradient' => 'from-[#FBC2EB] to-[#A6C1EE]'],
];

$sponsorLogos = ['Lenovo', 'Samsung', 'Philips', 'NKI', '+ Din logo'];

$carePillars = [
    'Vipps-verifisering av foreldre',
    'Sertifiserte trygge moderatorer',
    'Positiv chat og venneskole',
];
?>
<!DOCTYPE html>
<html lang="no">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fjolsenbanden – Fargerikt gaming-community</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&display=swap" rel="stylesheet" />
    <style>
      body {
        font-family: 'Nunito', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
      .blob {
        filter: blur(90px);
        opacity: 0.5;
      }
    </style>
  </head>
  <body class="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF6F0] via-[#F6F7FF] to-white text-slate-900">
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div class="blob absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-[#FFB4D3]/50"></div>
      <div class="blob absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-[#A5F3FC]/40"></div>
      <div class="blob absolute left-8 top-1/3 h-72 w-72 rounded-full bg-[#FDE68A]/40"></div>
    </div>

    <header class="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div class="flex items-center gap-3">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF87F3] to-[#FFC46C] text-lg font-extrabold text-white shadow-lg">FB</div>
          <div class="leading-tight">
            <span class="block text-xs uppercase tracking-[0.3em] text-[#FF7AD9]">Fjolsenbanden</span>
            <span class="text-base font-semibold">Spillglede for hele familien</span>
          </div>
        </div>
        <nav class="hidden items-center gap-4 text-sm font-semibold text-slate-600 md:flex">
          <?php foreach ($navLinks as $link): ?>
            <a class="rounded-full px-4 py-2 transition hover:bg-white/80 hover:text-[#FF7AD9]" href="<?= htmlspecialchars($link['href']) ?>">
              <?= htmlspecialchars($link['label']) ?>
            </a>
          <?php endforeach; ?>
        </nav>
        <a class="rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C]" href="#foreldre">
          Logg inn med Vipps
        </a>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4">
      <section class="relative py-20 text-center">
        <div class="mx-auto flex max-w-3xl flex-col items-center gap-6">
          <span class="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#0EA5E9] shadow-sm ring-1 ring-[#0EA5E9]/20">
            <span class="text-[#FF7AD9]">❤</span>
            Norges gladeste gaming-community
          </span>
          <h1 class="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            Fargelegg spillkveldene med <span class="bg-gradient-to-r from-[#FF7AD9] via-[#7DD3FC] to-[#FACC15] bg-clip-text text-transparent">Fjolsenbanden</span>
          </h1>
          <p class="max-w-2xl text-lg text-slate-600">
            Trygge streams, ukentlige quester og en leken verden for barn og unge. Foreldre logger inn via Vipps for enkel, trygg verifisering.
          </p>
          <div class="flex flex-wrap justify-center gap-3">
            <a class="rounded-full bg-gradient-to-r from-[#34D399] to-[#22D3EE] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:from-[#22C55E] hover:to-[#0EA5E9]" href="#medlem">
              Meld inn barn
            </a>
            <a class="rounded-full border border-[#FF7AD9]/30 bg-white px-6 py-3 text-sm font-semibold text-[#FF7AD9] shadow-sm transition hover:border-[#FF7AD9]" href="#aktiviteter">
              Se neste stream
            </a>
          </div>
          <div class="grid gap-3 sm:grid-cols-3">
            <?php foreach ($heroHighlights as $highlight): ?>
              <div class="rounded-full bg-gradient-to-r <?= $highlight['gradient'] ?> px-5 py-3 text-xs font-semibold text-slate-700 shadow">
                <?= htmlspecialchars($highlight['label']) ?>
              </div>
            <?php endforeach; ?>
          </div>
        </div>
      </section>

      <section id="medlem" class="py-16">
        <h2 class="text-center text-3xl font-extrabold text-slate-800">Velg medlemsnivå</h2>
        <p class="mt-3 text-center text-slate-500">
          Et medlemskap for hvert eventyr – alle nivåer får trygghet og spillglede.
        </p>
        <div class="mt-10 grid gap-6 md:grid-cols-3">
          <?php foreach ($membershipLevels as $level): ?>
            <?php $styles = $accentStyles[$level['accent']]; ?>
            <div class="rounded-3xl bg-gradient-to-br <?= $styles['card'] ?> p-6 shadow-xl">
              <span class="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-wide <?= $styles['badge'] ?>">
                <?= htmlspecialchars($level['tagline']) ?>
              </span>
              <h3 class="mt-4 text-2xl font-black"><?= htmlspecialchars($level['title']) ?></h3>
              <p class="mt-1 text-lg font-semibold"><?= htmlspecialchars($level['price']) ?></p>
              <ul class="mt-4 space-y-2 text-sm font-medium">
                <?php foreach ($level['features'] as $feature): ?>
                  <li class="flex items-center gap-2">
                    <span class="text-lg">✨</span>
                    <span><?= htmlspecialchars($feature) ?></span>
                  </li>
                <?php endforeach; ?>
              </ul>
              <a class="mt-6 inline-flex w-full justify-center rounded-full bg-white/80 px-4 py-3 text-sm font-semibold text-slate-700 shadow transition hover:bg-white" href="#foreldre">
                Velg nivå
              </a>
            </div>
          <?php endforeach; ?>
        </div>
      </section>

      <section id="aktiviteter" class="py-16">
        <div class="grid gap-6 md:grid-cols-3">
          <?php foreach ($activityCards as $activity): ?>
            <article class="rounded-3xl border border-white/60 bg-gradient-to-br <?= $activity['gradient'] ?> p-6 shadow-lg">
              <h3 class="text-xl font-bold text-slate-800"><?= htmlspecialchars($activity['title']) ?></h3>
              <p class="mt-2 text-sm text-slate-600"><?= htmlspecialchars($activity['description']) ?></p>
            </article>
          <?php endforeach; ?>
        </div>
      </section>

      <section id="premier" class="rounded-3xl border border-white/60 bg-white/70 p-10 shadow-xl">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-slate-800">Premier &amp; trekninger</h2>
          <p class="mt-3 text-slate-500">Lenovo, Samsung, Philips, NKI og flere gir premier hver måned!</p>
        </div>
        <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <?php foreach ($monthlyPrizes as $prize): ?>
            <div class="rounded-2xl bg-gradient-to-br <?= $prize['gradient'] ?> p-5 text-center shadow-lg">
              <div class="text-xs uppercase tracking-wide text-slate-600">Partner</div>
              <div class="text-lg font-extrabold text-slate-800"><?= htmlspecialchars($prize['brand']) ?></div>
              <div class="mt-2 text-sm text-slate-700"><?= htmlspecialchars($prize['item']) ?></div>
            </div>
          <?php endforeach; ?>
        </div>
      </section>

      <section id="foreldre" class="py-16">
        <div class="grid gap-8 md:grid-cols-2">
          <div class="rounded-3xl border border-[#FF7AD9]/20 bg-white/80 p-8 shadow-xl">
            <h3 class="flex items-center gap-2 text-2xl font-bold text-slate-800">
              <span class="text-[#FF7AD9]">🛡</span>
              Trygg innmelding
            </h3>
            <p class="mt-3 text-sm text-slate-600">
              Foreldre logger inn via Vipps. Vi henter kun navn og fødselsdato for å sikre trygg bruk og tydelig oversikt.
            </p>
            <ul class="mt-4 space-y-2 text-sm text-slate-600">
              <?php foreach ($carePillars as $pillar): ?>
                <li class="flex items-center gap-2">
                  <span>✔</span>
                  <span><?= htmlspecialchars($pillar) ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
            <a class="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-6 py-3 text-sm font-semibold text-white shadow transition hover:from-[#FF87F3] hover:to-[#FFB86C]" href="#">
              Logg inn med Vipps
            </a>
          </div>
          <div class="rounded-3xl bg-gradient-to-br from-[#E0EAFF] via-[#F9F1FF] to-[#FFF5F7] p-8 text-center shadow-xl">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-3xl">▶</div>
            <h3 class="mt-4 text-2xl font-bold text-slate-800">Neste stream: Fredag 19:00</h3>
            <p class="mt-2 text-sm text-slate-600">Bli med live på Twitch eller YouTube.</p>
          </div>
        </div>
      </section>

      <section id="community" class="rounded-3xl border border-white/60 bg-white/80 p-10 shadow-xl">
        <div class="grid gap-6 md:grid-cols-4">
          <?php foreach ($communityStats as $stat): ?>
            <div class="rounded-2xl bg-gradient-to-br <?= $stat['gradient'] ?> p-6 text-center shadow-lg">
              <div class="text-2xl font-black text-slate-800"><?= htmlspecialchars($stat['num']) ?></div>
              <div class="mt-2 text-sm font-semibold text-slate-700"><?= htmlspecialchars($stat['label']) ?></div>
            </div>
          <?php endforeach; ?>
        </div>
      </section>

      <section id="sponsor" class="py-16">
        <div class="rounded-3xl border border-white/60 bg-white/70 p-10 text-center shadow-xl">
          <h2 class="text-3xl font-extrabold text-slate-800">For sponsorer og partnere</h2>
          <p class="mt-3 text-slate-500">Nå over 700+ aktive medlemmer, foreldre og unge gamere. Fjolsenbanden gir trygt engasjement og synlighet.</p>
          <a class="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#34D399] to-[#22D3EE] px-6 py-3 text-sm font-semibold text-white shadow transition hover:from-[#22C55E] hover:to-[#0EA5E9]" href="#">
            Last ned sponsor-deck
          </a>
          <div class="mt-8 flex flex-wrap justify-center gap-4 text-sm font-semibold text-slate-600">
            <?php foreach ($sponsorLogos as $logo): ?>
              <span class="rounded-2xl border border-[#FF7AD9]/30 px-4 py-2"><?= htmlspecialchars($logo) ?></span>
            <?php endforeach; ?>
          </div>
        </div>
      </section>
    </main>

    <footer class="border-t border-white/40 bg-white/70 py-8 text-center text-xs text-slate-500">
      © <?= date('Y') ?> Fjolsenbanden – Et trygt community for unge spillere.
    </footer>
  </body>
</html>
