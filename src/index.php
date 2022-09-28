<?php
if (is_cart()) {
	get_template_part('views/shop-cart');
} elseif (is_checkout()) {
	get_template_part('views/shop-checkout');
} elseif (is_account_page()) {
	if (is_user_logged_in()) {
		get_template_part('views/shop-account');
	} else {
		get_template_part('views/login');
	}
} elseif (is_home()) {
	get_template_part('views/home');
} elseif (is_page('blog')) {
	get_template_part('views/blog-index');
} elseif (is_page()) {
	get_template_part('views/page');
} else {
	get_template_part('views/page');
}
?>