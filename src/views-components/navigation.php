<div class="top-navigation">
	<div class="container-xs">
		<div class="row">
			<div class="col-3 top-navigation__left-column">
				<a class="top-navigation__logo-container" href="<?= get_home_url() ?>" class="href">
					<img class="top-navigation__logo-item" src="<?= get_template_directory_uri() ?>/images/logo-compensa.svg" alt="">
				</a>
			</div>
			<div class="col-9 top-navigation__right-column">
				<div class="navigation">
					<?php
					$primari_navigation = array(
						'menu'	=>	"master navigation",
						'container'	=>	'nav',
						'menu_class'	=> "navigation__container",
						'add_li_class'	=> 'navigation__list-item text text--font-size-12 text--header',
						'add_anchor_class'	=> 'navigation__anchor text--reset-anchor',
					);
					wp_nav_menu($primari_navigation);
					?>
				</div>
			</div>
		</div>
	</div>
	<div class="container">
		<section class="col-lg-6 col-md-8 col-sm-9 col-12 baner-top ">
			<h1 class="text--header text--color-tertiary text--font-size-28 pb-2">Przychodnia Online</h1>
			<span class="text text--font-size-9">Szybki i bezgotówkowy dostęp do opieki zdrowotnej. Bez ankiety medycznej!</span>
			<ul class="baner-top__list-item-box">
				<li class="baner-top__list-item text text--font-size-9"><b>e-wizyta</b> przez czat/wideo/telefon u <b>lekarzy 16 specjalność</b></li>
				<li class="baner-top__list-item text text--font-size-9"><b>Badania diagnostyczne</b>w placówkach stacjonarnych</li>
				<li class="baner-top__list-item text text--font-size-9">Składka ju od <b>70 zł za rok</b></li>
			</ul>
			<button class="button button--primary text text--weight-bold text--font-size-9">
				POZNAJ PAKIETY
			</button>
		</section>
	</div>
</div>