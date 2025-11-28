<?php
/**
 * Template Name: Fjølsenbanden Landing Page
 * Description: Hero-first landing page tailored for the demo import wizard.
 */

if (!defined('ABSPATH')) {
    exit;
}

global $post;
get_header();
?>

<main id="primary" class="site-main">
    <header class="hero">
        <div class="hero__inner">
            <div class="hero__eyebrow">Plug &amp; Play WordPress Theme</div>
            <h1><?php the_title(); ?></h1>
            <p>Drop in the theme, import the ready-made demo pages, and go live with Vipps MobilePay login baked into your flows.</p>
            <a class="hero__cta" href="#wizard">
                <span>Launch setup wizard</span>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h12m0 0-4-4m4 4-4 4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
        </div>
    </header>

    <section class="section" id="wizard">
        <div class="section__inner content-grid">
            <div class="content-panel">
                <h2>Ready-to-go blocks</h2>
                <p>Use the landing template as-is or extend it with your own sections. Everything is built with semantic markup so Gutenberg blocks drop in smoothly.</p>
                <ul class="feature-list">
                    <li>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                        <span>Responsive hero, cards, and feature list.</span>
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                        <span>Shortcode <code>[vipps_login]</code> for Vipps MobilePay auth.</span>
                    </li>
                    <li>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 13 4 4L19 7" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
                        <span>Demo import wizard that sets your front page.</span>
                    </li>
                </ul>
            </div>

            <div class="admin-panel">
                <h3>Setup wizard</h3>
                <p>Head to <strong>Appearance &gt; Fjølsenbanden Setup</strong> to import demo pages and set the landing page as your homepage with one click.</p>
                <p class="notice-block">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 9v4m0 4h.01M12 5a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    If the Vipps MobilePay plugin is present, the wizard can also drop a login button into your chosen page.
                </p>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="section__inner">
            <h2>Included sections</h2>
            <div class="cards">
                <div class="card">
                    <h3>Event-ready hero</h3>
                    <p>Engaging gradient hero with CTA hook that anchors to your onboarding wizard or any custom URL.</p>
                </div>
                <div class="card">
                    <h3>Reusable cards</h3>
                    <p>Grid cards for partners, sponsors, or feature highlights pulled straight from your WordPress content.</p>
                </div>
                <div class="card">
                    <h3>Vipps login callout</h3>
                    <p>Drop the <code>[vipps_login]</code> shortcode in any block and the theme will render a branded MobilePay button.</p>
                </div>
            </div>
        </div>
    </section>
</main>

<footer class="footer">
    <p>&copy; <?php echo esc_html(date_i18n('Y')); ?> Fjølsenbanden. Built for speed and simplicity.</p>
</footer>

<?php
get_footer();
