
var autocomplete;

function initDate() {
    $('#booking-date-from').dateDropper();
    $('#booking-date-to').dateDropper();
}
initDate();
function initAutocomplete() {
    //https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
    var input = document.getElementById('location');
    var options = {
        types: ['(cities)'],
        componentRestrictions: {country: "ar"}
    };
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    autocomplete = new google.maps.places.Autocomplete(input, options)

}
initAutocomplete();

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(successCallback,errorCallback,{maximumAge:60000, timeout:5000, enableHighAccuracy:true});
    }
    function successCallback(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        //https://developers.google.com/maps/documentation/geocoding/start
        $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true', function (data) {
            var cityStatCountry = data.results[1].formatted_address;
            document.getElementById('location').value = cityStatCountry;
            var place = data.results[1];
            autocomplete.set("place", place);
        });
    }
    function errorCallback(error) {
        alert('ERROR(' + error.code + '): ' + error.message);
    }
}
