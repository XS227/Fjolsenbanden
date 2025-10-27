<?php
$navLinks = [
    ['href' => 'updates.php', 'label' => 'Oppdateringer'],
    ['href' => '#medlem', 'label' => 'Medlemskap'],
    ['href' => '#premier', 'label' => 'Premier'],
    ['href' => '#aktiviteter', 'label' => 'Aktiviteter'],
    ['href' => '#foreldre', 'label' => 'Foreldre'],
    ['href' => '#community', 'label' => 'Community'],
    ['href' => '#giles', 'label' => 'Giles'],
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

$hostSpotlight = [
    'name' => 'Giles',
    'role' => 'Game Master & trygghetsvert',
    'description' => 'Giles leder de familievennlige streamene våre med et våkent blikk på både chat og spillflyt. Han sørger for at alle føler seg sett, og at konkurransene holder et positivt tempo for alle aldre.',
    'highlights' => [
        'Sertifisert barne- og ungdomsarbeider med fokus på digital trygghet',
        'Planlegger ukentlige quester og koordinerer premier med partnere',
        'Moderator på Discord med null-toleranse for toksisk oppførsel',
    ],
    'funFact' => 'Favorittspill: Kreative Minecraft-bygg og co-op eventyr. Giles er også kjent for å dele random high-fives i chatten!',
    'quote' => 'Jeg vil at alle skal føle seg velkommen – både spillere, foreldre og de som er helt nye i gaming.',
];

$latestUpdate = [
    'date' => 'Mai 2024',
    'title' => 'Lansering av Fjolsenbanden Quest-board',
    'summary' => 'Vi introduserer ukentlige quester og nye familievennlige turneringer slik at både spillere og foreldre får tydelig oversikt.',
    'highlights' => [
        'Ukentlige quester med digitale badges og premier',
        'Foreldrepanel med tidsplan og aktivitetsvarsler',
        'Utvidet trygghetsgaranti med verifiserte veiledere',
    ],
    'cta' => [
        'href' => 'updates.php',
        'label' => 'Les hele oppdateringen',
    ],
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
  <body id="top" class="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FFF6F0] via-[#F6F7FF] to-white text-slate-900">
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div class="blob absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-[#FFB4D3]/50"></div>
      <div class="blob absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-[#A5F3FC]/40"></div>
      <div class="blob absolute left-8 top-1/3 h-72 w-72 rounded-full bg-[#FDE68A]/40"></div>
    </div>

    <header class="sticky top-0 z-40 border-b border-white/40 bg-white/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a class="flex items-center gap-3" href="#top" aria-label="Gå til toppen">
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
          <a class="hidden rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C] sm:inline-flex" href="#foreldre">
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
        <a class="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C]" href="#foreldre" data-menu-close>
          Logg inn med Vipps
        </a>
      </nav>
    </div>

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
            <a
              class="rounded-full border border-[#FF7AD9]/30 bg-white px-6 py-3 text-sm font-semibold text-[#FF7AD9] shadow-sm transition hover:border-[#FF7AD9]"
              href="https://player.twitch.tv/?channel=fjolsenbanden"
              target="_blank"
              rel="noopener noreferrer"
            >
              Se demo stream
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

      <section id="giles" class="py-16">
        <div class="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <div class="rounded-3xl border border-[#22D3EE]/20 bg-gradient-to-br from-[#111C2F] via-[#0F1A2B] to-[#0B1320] p-8 text-white shadow-2xl">
            <span class="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-300">
              <span aria-hidden>✨</span>
              Ukens spotlight
            </span>
            <div class="mt-4 space-y-2">
              <h2 class="text-3xl font-extrabold">Møt <?= htmlspecialchars($hostSpotlight['name']) ?></h2>
              <p class="text-sm uppercase tracking-widest text-cyan-300"><?= htmlspecialchars($hostSpotlight['role']) ?></p>
            </div>
            <p class="mt-4 text-base text-slate-200">
              <?= htmlspecialchars($hostSpotlight['description']) ?>
            </p>
            <ul class="mt-6 space-y-3 text-sm text-slate-200">
              <?php foreach ($hostSpotlight['highlights'] as $highlight): ?>
                <li class="flex items-start gap-3">
                  <span class="mt-1 text-cyan-300">✨</span>
                  <span><?= htmlspecialchars($highlight) ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
            <div class="mt-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-4 text-sm text-slate-100">
              <strong class="block text-cyan-200">Fun fact</strong>
              <p class="mt-2 text-slate-100">
                <?= htmlspecialchars($hostSpotlight['funFact']) ?>
              </p>
            </div>
          </div>

          <div class="flex flex-col justify-between rounded-3xl border border-white/10 bg-white/80 p-8 shadow-xl">
            <div>
              <div class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#FF7AD9]">
                <span aria-hidden>❝</span>
                Giles sier
              </div>
              <p class="mt-4 text-lg font-semibold text-slate-700">
                “<?= htmlspecialchars($hostSpotlight['quote']) ?>”
              </p>
            </div>
            <div class="mt-6 rounded-2xl border border-[#FF7AD9]/20 bg-gradient-to-br from-[#FFF5F7] via-[#F6F7FF] to-[#ECFEFF] p-5 text-sm text-slate-600">
              <p>
                Si hei til Giles i chatten under neste stream – han svarer alltid på spørsmål og tipser om hvilke quester som passer for hele familien.
              </p>
            </div>
          </div>
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

      <section id="oppdateringer" class="py-16">
        <div class="rounded-3xl border border-white/60 bg-white/80 p-10 shadow-xl">
          <span class="inline-flex items-center gap-2 rounded-full bg-[#FF7AD9]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#FF7AD9]">
            <span aria-hidden>🌟</span>
            Ny oppdatering <?= htmlspecialchars($latestUpdate['date']) ?>
          </span>
          <div class="mt-6 grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div class="space-y-4">
              <h2 class="text-3xl font-extrabold text-slate-800">
                <?= htmlspecialchars($latestUpdate['title']) ?>
              </h2>
              <p class="text-base text-slate-600">
                <?= htmlspecialchars($latestUpdate['summary']) ?>
              </p>
              <ul class="space-y-2 text-sm text-slate-600">
                <?php foreach ($latestUpdate['highlights'] as $highlight): ?>
                  <li class="flex items-start gap-3">
                    <span class="mt-1 text-[#FF7AD9]">✔</span>
                    <span><?= htmlspecialchars($highlight) ?></span>
                  </li>
                <?php endforeach; ?>
              </ul>
              <a
                class="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#34D399] to-[#22D3EE] px-6 py-3 text-sm font-semibold text-white shadow transition hover:from-[#22C55E] hover:to-[#0EA5E9]"
                href="<?= htmlspecialchars($latestUpdate['cta']['href']) ?>"
              >
                <?= htmlspecialchars($latestUpdate['cta']['label']) ?>
                <span aria-hidden>→</span>
              </a>
            </div>
            <div class="rounded-3xl bg-gradient-to-br from-[#FFF5F7] via-[#E0EAFF] to-[#F8F9FF] p-6 text-sm text-slate-600 shadow-inner">
              <h3 class="text-lg font-semibold text-slate-800">Hvorfor dette er viktig</h3>
              <p class="mt-3">
                Quest-boardet gjør det lettere for foreldre å se hva som skjer denne uken, samtidig som barna får tydelige mål med
                premier og heiarop. Alt er koblet til Vipps-innloggingen for trygghet.
              </p>
              <p class="mt-3">
                Besøk oppdateringssiden for å se hele veikartet og få tips til hvordan familien kan delta i vårens eventyr.
              </p>
            </div>
          </div>
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

    <div class="fixed inset-x-0 bottom-0 z-40 border-t border-white/60 bg-white/90 backdrop-blur md:hidden">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" class="flex items-center gap-2" data-menu-close>
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF87F3] to-[#FFC46C] text-sm font-extrabold text-white">FB</div>
          <span class="text-xs font-semibold uppercase tracking-widest text-[#FF7AD9]">Fjolsenbanden</span>
        </a>
        <div class="flex items-center gap-2">
          <a class="inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-r from-[#FF7AD9] to-[#FF9B6A] px-4 text-xs font-bold text-white shadow-md transition hover:from-[#FF87F3] hover:to-[#FFB86C]" href="#foreldre" data-menu-close>
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
