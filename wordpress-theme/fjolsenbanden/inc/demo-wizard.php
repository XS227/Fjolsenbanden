<?php
if (!defined('ABSPATH')) {
    exit;
}

function fjolsenbanden_register_setup_page() {
    add_theme_page(
        __('Fjølsenbanden Setup', 'fjolsenbanden'),
        __('Fjølsenbanden Setup', 'fjolsenbanden'),
        'manage_options',
        'fjolsenbanden-setup',
        'fjolsenbanden_render_setup_page'
    );
}
add_action('admin_menu', 'fjolsenbanden_register_setup_page');

function fjolsenbanden_render_setup_page() {
    if (!current_user_can('manage_options')) {
        return;
    }

    $imported = [];
    if (isset($_POST['fjolsenbanden_import_demo']) && check_admin_referer('fjolsenbanden_import_demo')) {
        $imported = fjolsenbanden_import_demo_content();
    }
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Fjølsenbanden Plug & Play Wizard', 'fjolsenbanden'); ?></h1>
        <p><?php esc_html_e('Import demo pages, assign the landing template, and set the homepage automatically.', 'fjolsenbanden'); ?></p>

        <?php if (!empty($imported)) : ?>
            <div class="notice notice-success is-dismissible">
                <p><?php echo esc_html(implode(' ', $imported)); ?></p>
            </div>
        <?php endif; ?>

        <form method="post">
            <?php wp_nonce_field('fjolsenbanden_import_demo'); ?>
            <p><?php esc_html_e('One click will create a landing page, assign the landing page template, and place the Vipps login shortcode.', 'fjolsenbanden'); ?></p>
            <p>
                <button type="submit" class="button button-primary" name="fjolsenbanden_import_demo" value="1">
                    <?php esc_html_e('Import demo content', 'fjolsenbanden'); ?>
                </button>
            </p>
            <p class="description">
                <?php esc_html_e('Re-running the wizard will keep existing pages intact and skip duplicates.', 'fjolsenbanden'); ?>
            </p>
        </form>

        <h2><?php esc_html_e('What gets imported?', 'fjolsenbanden'); ?></h2>
        <ol>
            <li><?php esc_html_e('A "Front Page" with the landing page template applied.', 'fjolsenbanden'); ?></li>
            <li><?php esc_html_e('Optional Vipps login shortcode placement inside the imported content.', 'fjolsenbanden'); ?></li>
            <li><?php esc_html_e('Homepage setting to display the imported page.', 'fjolsenbanden'); ?></li>
        </ol>
    </div>
    <?php
}

function fjolsenbanden_import_demo_content() {
    $messages = [];
    $content = fjolsenbanden_get_demo_content('home-content.html');
    $page_id = fjolsenbanden_maybe_create_page(
        __('Front Page', 'fjolsenbanden'),
        'front-page',
        $content,
        'page-templates/landing-page.php'
    );

    if ($page_id) {
        update_option('show_on_front', 'page');
        update_option('page_on_front', $page_id);
        $messages[] = sprintf(
            /* translators: %s: page ID */
            __('Landing page created (ID %s) and set as homepage.', 'fjolsenbanden'),
            $page_id
        );
    } else {
        $messages[] = __('Front page already exists. Nothing changed.', 'fjolsenbanden');
    }

    return $messages;
}

function fjolsenbanden_get_demo_content($filename) {
    $path = trailingslashit(FJOLSENBANDEN_THEME_PATH) . 'demo-content/' . $filename;
    if (!file_exists($path)) {
        return '';
    }

    $raw = file_get_contents($path);
    return wp_kses_post($raw);
}

function fjolsenbanden_maybe_create_page($title, $slug, $content, $template = '') {
    $existing = get_page_by_path($slug);
    if ($existing instanceof WP_Post) {
        return $existing->ID;
    }

    $page_id = wp_insert_post(
        [
            'post_title'   => $title,
            'post_name'    => sanitize_title($slug),
            'post_type'    => 'page',
            'post_status'  => 'publish',
            'post_content' => $content,
        ],
        true
    );

    if (is_wp_error($page_id)) {
        return 0;
    }

    if (!empty($template)) {
        update_post_meta($page_id, '_wp_page_template', $template);
    }

    return $page_id;
}
