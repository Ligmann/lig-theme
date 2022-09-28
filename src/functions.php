<?php 

define("THEME_URI", get_template_directory_uri());

add_action("init", function () {
	register_nav_menus([
		"top-menu" => "Nawigacja",
	]);
});

add_action("wp_enqueue_scripts", function () {
	// Vendor styles
	wp_enqueue_style("bootstrap-style", THEME_URI . "/vendor/styles/bootstrap-5.1.1/bootstrap.css");
	wp_enqueue_style("swiper-style", THEME_URI . "/vendor/styles/swiper-7.0.5/swiper.css");

	// Custom styles
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
