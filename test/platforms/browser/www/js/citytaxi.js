var geocode="http://maps.googleapis.com/maps/api/geocode/json?latlng=";

$(function() {
  $('nav#menu').mmenu();
});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 5.064084, lng: -75.511013},
    zoom: 14
  });
  var marker=new google.maps.Marker({map: map});
  map.addListener('click', function(event) {
    //map.setZoom(8);
    //map.setCenter(marker.getPosition());
    marker.setPosition(event.latLng);
    geocoder(event.latLng.lat(), event.latLng.lng())
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      marker.setPosition(pos);
      marker.setMap(map);
      geocoder(position.coords.latitude, position.coords.longitude)
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, map.getCenter(), marker);
    });
  } else {
    console.log("el navegador no soporta la geolocalizacion")
    handleLocationError(false, map.getCenter(), marker);
  }
}

function handleLocationError(browserHasGeolocation, pos, marker) {
  marker.setPosition(pos);
  marker.setMap(map);
  geocoder(5.064084,-75.511013)
}

function geocoder(lat, lng){
 $.get( geocode+""+lat+","+lng, function( data ) {
  var address=data.results[0].formatted_address;
  $("#address").html(address)
});
}
