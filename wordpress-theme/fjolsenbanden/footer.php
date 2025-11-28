<?php
if (!defined('ABSPATH')) {
    exit;
}
?>
<footer class="footer" style="text-align:center;padding:2rem 1rem;color:var(--muted);">
    <p>&copy; <?php echo esc_html(date_i18n('Y')); ?> <?php bloginfo('name'); ?>.</p>
    <?php if (has_nav_menu('footer')) : ?>
        <nav class="footer-nav" aria-label="Footer" style="margin-top:0.5rem;">
            <?php
            wp_nav_menu(
                [
                    'theme_location' => 'footer',
                    'container'      => false,
                    'menu_class'     => 'footer-menu',
                    'fallback_cb'    => false,
                ]
            );
            ?>
        </nav>
    <?php endif; ?>
</footer>
<?php wp_footer(); ?>
</body>
</html>
