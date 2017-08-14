
var autocomplete;
var placeID;
function initDate() {
    $('#booking-date-from').dateDropper();
    $('#booking-date-to').dateDropper();
}
initDate();
var input;
function initAutocomplete() {
    //https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
    input = document.getElementById('location');
    var options = {
        types: ['(cities)'],
        componentRestrictions: {country: "ar"}
    };
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(input, options)

}
initAutocomplete();

autocomplete.addListener('place_changed', onPlaceChanged);

// When the user selects a city, get the place details for the city and
// zoom the map in on the city.
function onPlaceChanged() {
    var place = autocomplete.getPlace();
    if (place.geometry) {
        console.log("econtre")
        var place = autocomplete.getPlace();
        placeID = place.place_id;
        console.log(placeID);
        sessionStorage.setItem('place',input.value);
        sessionStorage.setItem('placeID',placeID);

    } else {
        document.getElementById('location').value = '';
        // Debe mejorar con un toast
        window.alert("No details available for input: '" + place.name + "'");
        return;
    }
}

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            //https://developers.google.com/maps/documentation/geocoding/start
            $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true', function (data) {
                var cityStatCountry = data.results[1].formatted_address;
                document.getElementById('location').value = cityStatCountry;
                var place = data.results[1];
                autocomplete.set("place", place);
            });


        });
    }
}


