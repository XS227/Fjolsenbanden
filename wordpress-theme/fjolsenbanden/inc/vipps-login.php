<?php
if (!defined('ABSPATH')) {
    exit;
}

function fjolsenbanden_get_vipps_login_url($redirect = '') {
    $redirect = !empty($redirect) ? $redirect : home_url('/');

    if (function_exists('wc_gateway_vipps')) {
        $gateway = wc_gateway_vipps();
        if (is_object($gateway) && method_exists($gateway, 'get_login_url')) {
            return $gateway->get_login_url($redirect);
        }
    }

    $filtered = apply_filters('fjolsenbanden_vipps_login_url', '', $redirect);
    if (!empty($filtered)) {
        return esc_url_raw($filtered);
    }

    return wp_login_url($redirect);
}

function fjolsenbanden_render_vipps_icon() {
    return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z" fill="currentColor"/></svg>';
}

function fjolsenbanden_vipps_login_shortcode($atts) {
    $atts = shortcode_atts(
        [
            'redirect' => home_url('/'),
            'label'    => __('Login with Vipps MobilePay', 'fjolsenbanden'),
        ],
        $atts,
        'vipps_login'
    );

    $url = fjolsenbanden_get_vipps_login_url($atts['redirect']);

    ob_start();
    ?>
    <a class="vipps-login-button" href="<?php echo esc_url($url); ?>">
        <?php echo fjolsenbanden_render_vipps_icon(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
        <span><?php echo esc_html($atts['label']); ?></span>
    </a>
    <?php if ($url === wp_login_url($atts['redirect'])) : ?>
        <p class="notice-block" style="margin-top:0.75rem;">
            <?php esc_html_e('Install and configure the official Vipps MobilePay plugin to replace this fallback login URL.', 'fjolsenbanden'); ?>
        </p>
    <?php endif; ?>
    <?php
    return ob_get_clean();
}
add_shortcode('vipps_login', 'fjolsenbanden_vipps_login_shortcode');

function fjolsenbanden_login_form_vipps_button() {
    echo do_shortcode('[vipps_login redirect="' . esc_url(home_url('/')) . '"]');
}
add_action('login_form', 'fjolsenbanden_login_form_vipps_button');
