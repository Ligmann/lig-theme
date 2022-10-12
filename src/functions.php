<?php

define("THEME_URI", get_template_directory_uri());

add_action("init", function () {
	register_nav_menus([
		"top-menu" => "Nawigacja",
	]);
});

// add_filter('woocommerce_add_to_cart_validation', function () {

// });

add_filter('woocommerce_add_to_cart_redirect', function () {
	return wc_get_checkout_url();
});

add_action("wp_enqueue_scripts", function () {
	// Vendor styles
	wp_enqueue_style("swiper-style", THEME_URI . "/vendor/styles/swiper-7.0.5/swiper.css");

	// Custom styles
	wp_enqueue_style("bootstrap-style", THEME_URI . "/assets/styles/bootstrap.css");
	wp_enqueue_style("main-style", THEME_URI . "/assets/styles/main.css");

	// Vendor scripts
	wp_enqueue_script("bootstrap-script",  THEME_URI . "/vendor/scripts/bootstrap-5.1.1.js");
	wp_enqueue_script("swiper-script", THEME_URI . "/vendor/scripts/swiper-7.0.5.js");

	// Custom scripts
	wp_enqueue_script("main-script", THEME_URI . "/assets/scripts/main.js");
	wp_enqueue_script("footer-script", THEME_URI . "/assets/scripts/footer.js", [], false, true);
});

add_action('after_setup_theme', function () {
    add_theme_support('woocommerce');
});

//	NAVIGATION

//	add class list items nav
function add_additional_class_on_li($classes, $item, $args) {
	if(isset($args->add_li_class)) {
			$classes[] = $args->add_li_class;
	}
	return $classes;
}
add_filter('nav_menu_css_class', 'add_additional_class_on_li', 1, 3);

//	add class anchor nav
function add_additional_class_on_a($classes, $item, $args)
{
    if (isset($args->add_anchor_class)) {
        $classes['class'] = $args->add_anchor_class;
    }
    return $classes;
}

add_filter('nav_menu_link_attributes', 'add_additional_class_on_a', 1, 3);