function initMap() {
        let selfMap = new google.maps.Map(document.getElementById('selfLoc'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 11
        });
        let infoWindow = new google.maps.InfoWindow;
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(pos);
            infoWindow.setContent('Here you are Bitches');
            infoWindow.open(selfMap);
            selfMap.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, selfMap.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, selfMap.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(selfMap);
      }
