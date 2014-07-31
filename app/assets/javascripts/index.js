$(document).ready(function(){
	
	var latitude = (localStorage.getItem('lat')) ? localStorage.getItem('lat') : 51.497830;
	var longitude = (localStorage.getItem('lng')) ? localStorage.getItem('lng') : -0.132523;


	// window.map works like var, but changes scope of following object to whole window, so you can access it from tests
	var mapOptions = {
	  center: new google.maps.LatLng(latitude, longitude),
	  zoom: 10,
	 //  zoomControl: true,
		// zoomControlOpt: {
		// 	style: 'MEDIUM',
		// 	position: 'CENTER_LEFT'
		// },
		// panControl: false,
		// mapTypeControl: false,
		// streetViewControl: false,
		// styles: 
		// [
		// { "featureType": "landscape", 
		// 	"elementType": "all", 
		// 	"stylers": [
		// 	{ "hue": "#ffffff" },
		// 	{ "saturation": -100},
		// 	{ "lightness": 100}
  //     ]
  //     },
  //   ]
	};

	// initializing map object
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);

	// additional map options
	var zoom_options = { minZoom: 9, maxZoom: 17};
	map.setOptions(zoom_options);

	// define empty markers array, marketclusterer var and options
	var markers = [];
	var markerCluster;
	var mcOptions = {gridSize: 80, maxZoom: 12};

	// setting up google autocomplete for address search bar
	var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(51.2901, -0.5651),
		new google.maps.LatLng(51.6167, 0.2463)
		);

	var input = document.getElementById('searchTextField');

	var search_options = {
		bounds: defaultBounds,
		types: ['establishment']
	};

	autocomplete = new google.maps.places.Autocomplete(input, search_options);





	// on page reload render job markers and populate RHS job adverts pane
		$.get("/jobs.json", function(jobs) {
			// jobs.forEach(function(job) {
				renderMarkers(job);
			// });
			updateAdvertColumn(jobs);
			markerCluster = new MarkerClusterer(map, markers, mcOptions);
		});



	// refactored helper methods

	// renders markers and infowindows on map, adds listener to each marker
	var renderMarkers = function(jobs){
		jobs.forEach(function(job) {		
				var category = job.category;
				var popup_template = $('#pop_up_job_advert').html();
				var job_Info = Mustache.render(popup_template,job);	
				var latLng = new google.maps.LatLng(job.latitude,job.longitude);
				
				var marker = new google.maps.Marker({
					position: latLng,
					title: job.advert_title,
					category: job.category,
					icon: "https://dl.dropboxusercontent.com/u/9315601/" + category + ".png",
				});

				marker.infowindow = new google.maps.InfoWindow( {
					content: job_Info
				});

			  google.maps.event.addListener(marker, 'click', function() {
			    marker.infowindow.open(map,marker);
			  });

				markers.push(marker);
		});
	};
	
	// calcs distance between a job marker can map center (in Kms)
	var calcDistanceKms = function(map,job) {
		var mapCenter = map.getCenter();
		var markerLocation = new google.maps.LatLng(job.latitude,job.longitude);
	  var markerDistance = google.maps.geometry.spherical.computeDistanceBetween(mapCenter, markerLocation);
	  return markerDistance/1000;
	};

	// clears all markers on map
	var clearMarkers = function() {
		for (var i = 0; i < markers.length; i++) {
	    markers[i].setMap(null);
	  }
	  markers = [];
	};



	// filters out all job objects from jobs array that lie outside distance scope
	var filterByMaxDistance = function(jobs,max_distance){
		var filtereredJobs = [];
			jobs.forEach(function(job) {
				if (calcDistanceKms(map,job) <= job.max_distance) {	
					filtereredJobs.push(job);
				};
			});
		return filtereredJobs;
	};

	// sorts array of jobs by distance 
	var sortByDistance = function(jobs){
    	jobs.sort(function(a,b){
			  if(a.distance > b.distance){ return 1}
		    if(a.distance < b.distance){ return -1}
	      return 0;
			});
			return jobs;
	};


	var submitFilterForm = function(jobs){
		markers = []
		var advertsRefined = [];
		var max_distance = jobs[0].max_distance;

		filterByMaxDistance(jobs,max_distance).forEach(function(job){
				renderMarker(job);
				advertsRefined.push(job);
		});

		updateAdvertColumn(advertsRefined);
		markerCluster.clearMarkers()
		markerCluster.addMarkers(markers);
	};





	var updateAdvertColumn = function(adverts){
		$('.advert_column').empty();
		var jobs = [];
		var newAdvertArray = [];
		var newAdvert;
    $.each(adverts, function (i, job) {
	      var template = $('#individual_job_advert').html();
				job['linkid'] = i;
				job['distance'] = Math.round(100*calcDistanceKms(map,job))/100; 
				jobs.push(job);
    });

    var jobs = sortByDistance(jobs);

    $.each(jobs, function (i, job) {
      var template = $('#individual_job_advert').html();
			var newAdvert = Mustache.render(template,job);
			$('.advert_column').append(newAdvert);
  
			$('#openlink'+i).on('click', function() {
			    google.maps.event.trigger(markers[i], 'click');
		  });
			
			$('#closelink'+i).on('click', function() {
						var infowindow = markers[i]['infowindow'];
						markers[i].infowindow.close();
		  });

    });

	};


  


	var getFormData = function(){
		var distance = $('#distance_slider').slider('getValue');
		var wage = $('#wage_slider').slider('getValue');		
		var arrayForm = $('#filter_form').serializeArray();
		var form = {};

    $.each(arrayForm, function (i, input) {
        form[input.name] = input.value;
    });
		
		form['distance'] = distance;
		form['wage'] = wage;
		console.log('hello2')
		console.log(form);
		return form;
	};

	$('#filter_form').submit(function(event){
		event.preventDefault();
		console.log('hello1')
		var form = getFormData();

			$.get('/jobs.json', form, function(jobs){
				submitFilterForm(jobs);
			});

	});	


	$('#search_box').on('submit', function(event) {
			event.preventDefault();
			var geocoder = new google.maps.Geocoder();

			geocoder.geocode( {'address': $('#searchTextField').val()}, function(results, status) {
	      if (status == google.maps.GeocoderStatus.OK) {
		        map.setCenter(results[0].geometry.location);
						var form = getFormData();
						$.get('/jobs.json',form, function(jobs) {
							submitFilterForm(jobs);
						});
	      } else {
	        alert("You search address was not recognised: " + status);
	      }
	    });
  
  });


	$('#distance_slider').slider({
		formater: function(value) {
			return 'Current value: ' + value;
		}
	});


	$('#wage_slider').slider({
		formater: function(value) {
			return 'Current value: ' + value;
		}
	});


});

