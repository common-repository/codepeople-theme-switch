jQuery( function ($){

	if( typeof codepeople_theme_switch != 'undefined' )
	{
        function getWidth()
        {
            var myWidth = 0;
            if( typeof( window.innerWidth ) == 'number' ) {
                //Non-IE
                myWidth = window.innerWidth;
            } else if( document.documentElement && document.documentElement.clientWidth ) {
                //IE 6+ in 'standards compliant mode'
                myWidth = document.documentElement.clientWidth;
            } else if( document.body && document.body.clientWidth ) {
                //IE 4 compatible
                myWidth = document.body.clientWidth;
            }
			/* if( typeof window.devicePixelRatio != 'undefined' && window.devicePixelRatio ) myWidth = myWidth/window.devicePixelRatio;     */
            return ( typeof screen != 'undefined' ) ? Math.min( screen.width, myWidth ) : myWidth;
        };

		function resize(dataObj )
		{
			width = getWidth();

			// Get URL
			var data = { 'theme_switch_width': width },
				url = location.protocol + '//' + (location.host + '/' + location.pathname+'/').replace(/\/+/g, '/');
			url = url.replace(/([^:])\/+/g, '$1/');

			if( typeof dataObj[ 'parameters' ] != 'undefined' ) $.extend( data, dataObj[ 'parameters' ] );

			$.post( url, data, function(){
				if( typeof dataObj[ 'callback' ] != 'undefined' ) dataObj[ 'callback' ]();
			} );
		}

		function acceptingThemeSwitch()
		{
			if(
				called == 0 &&
				(
					typeof codepeople_theme_switch[ 'decision_taken' ] == 'undefined'  ||
					! ( codepeople_theme_switch[ 'decision_taken' ] * 1 )
				)  &&
				width * 1 < codepeople_theme_switch[ 'width' ] * 1
			)
			{
				called = 1;
				var selection = window.confirm( codepeople_theme_switch[ 'message' ] );
				if( selection )
				{
					var loc = document.location.href;
					resize( { 'callback': function(){ document.location.href = loc; }, 'parameters' : { 'theme_switch_accepted' : 1 } } );

				}
				else
				{
					$( window ).off( 'resize' );
					resize( { 'parameters': { 'theme_switch_denied' : 1 } } );
				}
			}
		}

		var width,
			called = 0;

		$( window )
		 .on( 'resize', function(){ resize( { 'callback': acceptingThemeSwitch } ); } )
		 .trigger('resize');
	}
});