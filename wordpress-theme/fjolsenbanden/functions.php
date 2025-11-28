<?php
if (!defined('ABSPATH')) {
    exit;
}

define('FJOLSENBANDEN_THEME_VERSION', '1.0.0');

define('FJOLSENBANDEN_THEME_PATH', get_template_directory());
define('FJOLSENBANDEN_THEME_URL', get_template_directory_uri());

require_once FJOLSENBANDEN_THEME_PATH . '/inc/demo-wizard.php';
require_once FJOLSENBANDEN_THEME_PATH . '/inc/vipps-login.php';

function fjolsenbanden_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('editor-styles');
    add_theme_support('automatic-feed-links');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script']);
    add_theme_support(
        'custom-logo',
        [
            'height'      => 80,
            'width'       => 80,
            'flex-width'  => true,
            'flex-height' => true,
        ]
    );

    register_nav_menus(
        [
            'primary' => __('Primary Menu', 'fjolsenbanden'),
            'footer'  => __('Footer Menu', 'fjolsenbanden'),
        ]
    );
}
add_action('after_setup_theme', 'fjolsenbanden_setup');

function fjolsenbanden_enqueue_assets() {
    wp_enqueue_style('fjolsenbanden-style', get_stylesheet_uri(), [], FJOLSENBANDEN_THEME_VERSION);
    wp_enqueue_style(
        'fjolsenbanden-front',
        FJOLSENBANDEN_THEME_URL . '/assets/front.css',
        ['fjolsenbanden-style'],
        FJOLSENBANDEN_THEME_VERSION
    );
}
add_action('wp_enqueue_scripts', 'fjolsenbanden_enqueue_assets');

function fjolsenbanden_register_editor_styles() {
    add_editor_style('style.css');
}
add_action('admin_init', 'fjolsenbanden_register_editor_styles');

function fjolsenbanden_body_classes($classes) {
    $classes[] = 'fjolsenbanden-theme';
    return $classes;
}
add_filter('body_class', 'fjolsenbanden_body_classes');
