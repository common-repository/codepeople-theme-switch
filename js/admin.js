(function ($){
	function empty( v )
	{
		return typeof v != 'undefined' && /^\s*$/.test( v );
	};

	function clear()
	{
		// Clear
		$( '#cpts_screen_width' ).val( '' );
		$( '#cpts_predefined_screen option:first' ).prop( 'selected', true );
	};

	window[ 'cptsDisplayPreview' ] = function()
	{
		var device_w = 510,
			device_h = 680,
			t = $( '[name="cpts_theme"]:checked' ),
			w = Math.min($( '#cpts_screen_width' ).val(), $('.cp-preview').width()-2*25), h,
			p = $( '.cp-preview-container' );

		if( empty( w ) )
		{
			alert( 'The screen width is required' );
			return;
		}

		h = Math.min(Math.floor(device_h*w/device_w), 804);
		p.show().html( '' );

		$( '<iframe width="'+w+'" height="'+h+'" src="' + cptsObj[ 'home' ] + '/?theme_switch_preview=1&theme_switch_stylesheet=' + escape( t.attr( 'stylesheet' ) ) + '"></iframe>' ).appendTo( p );
		$('.cp-preview .cp-preview-container,.cp-preview .device-frame').width(w).height(h);
		$('.cp-preview .device').width(w*1+25*2).height(h*1+62*2);
	};

	window[ 'cptsLoadScreenSizes' ] = function( e )
	{
		var o = $( e.options[ e.selectedIndex ] );
		if( o.attr( 'w' ) )
		{
			$( '#cpts_screen_width'  ).val( o.attr( 'w' ) );
		}

	};
})(jQuery);