import 'https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.js';

const coordinates = [
	[ 121.089592, 14.61992 ]
	// [ -0.127758, 51.507351 ],
	// [ -0.127758, 51.507351 ],
	// [ -0.127758, 51.507351 ],
	// [ -122.419416, 37.774929 ],
	// [ -122.419416, 37.774929 ],
	// [ 139.691706, 35.689487 ],
	// [ 139.691706, 35.689487 ],
	// [ 139.691706, 35.689487 ],
	// [ 139.691706, 35.689487 ],
	// [ 139.691706, 35.689487 ],
	// [ 139.691706, 35.689487 ],
	// [ 139.691706, 35.689487 ]
];

//

mapboxgl.accessToken = 'pk.eyJ1IjoiYm9iYnlmZXJyZXIiLCJhIjoiY2p5and1aXo4MDhjdjNibjRsZ2VnbnI5diJ9.EvMqr1VHIa3eFhcEmeKPzQ';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/dark-v10',
	zoom: 12,
	center: [ -122.447303, 37.753574 ]
});

map.on('load', function() {
	/* Sample feature from the `examples.8fgz4egr` tileset:
{
"type": "Feature",
"properties": {
"ethnicity": "White"
},
"geometry": {
"type": "Point",
"coordinates": [ -122.447303, 37.753574 ]
}
}
*/
	map.addSource('ethnicity', {
		type: 'vector',
		url: 'mapbox://examples.8fgz4egr'
	});
	map.addLayer({
		id: 'population',
		type: 'circle',
		source: 'ethnicity',
		'source-layer': 'sf2010',
		paint: {
			// make circles larger as the user zooms from z12 to z22
			'circle-radius': {
				base: 1.75,
				stops: [ [ 12, 2 ], [ 22, 180 ] ]
			},
			// color circles by ethnicity, using a match expression
			// https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
			'circle-color': [
				'match',
				[ 'get', 'ethnicity' ],
				'White',
				'#fbb03b',
				'Black',
				'#223b53',
				'Hispanic',
				'#e55e5e',
				'Asian',
				'#3bb2d0',
				/* other */ '#ccc'
			]
		}
	});
});
