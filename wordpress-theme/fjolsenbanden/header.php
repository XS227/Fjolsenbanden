<?php
if (!defined('ABSPATH')) {
    exit;
}
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header" style="padding:1rem 1.5rem;">
    <div class="site-branding" style="display:flex;align-items:center;gap:0.75rem;">
        <?php if (has_custom_logo()) : ?>
            <?php the_custom_logo(); ?>
        <?php endif; ?>
        <div>
            <a href="<?php echo esc_url(home_url('/')); ?>" style="font-weight:800;font-size:1.2rem;color:var(--dark);text-decoration:none;">
                <?php bloginfo('name'); ?>
            </a>
            <p style="margin:0;color:var(--muted);font-size:0.95rem;"><?php bloginfo('description'); ?></p>
        </div>
    </div>
    <?php if (has_nav_menu('primary')) : ?>
        <nav class="primary-nav" aria-label="Primary" style="margin-top:0.75rem;">
            <?php
            wp_nav_menu(
                [
                    'theme_location' => 'primary',
                    'container'      => false,
                    'menu_class'     => 'primary-menu',
                    'fallback_cb'    => false,
                ]
            );
            ?>
        </nav>
    <?php endif; ?>
</header>
