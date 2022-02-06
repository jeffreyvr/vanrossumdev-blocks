<?php

/**
 * Plugin name: vanrossum.dev Blocks
 * Description: Some blocks for the Block editor.
 * Author: Jeffrey van Rossum
 * Author URI: https://vanrossum.dev
 * Version: 0.0.1
 * Textdomain: vanrossumdev-blocks
 */

add_action( 'init', function () {
	load_plugin_textdomain( 'vanrossumdev-blocks', false, dirname( plugin_basename( __FILE__ ) ) . 'languages/' );

	wp_register_script( 'vanrossumdev-blocks-js', plugin_dir_url( __FILE__ ) . '/js/blocks.js', array( 'wp-editor' ) );

	register_block_type( 'vanrossumdev-blocks/background-image-block', [
		'editor_script' => 'vanrossumdev-blocks-js',
	] );

	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'vanrossumdev-blocks-js', 'vanrossumdev-blocks', plugin_dir_path( __FILE__ ) . 'languages/' );
	}
} );