"use strict"
class Viajes{
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.precision        = posicion.coords.accuracy;
        this.altitud          = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalizacion ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
    }

    getMapaEstaticoGoogle(){
        var ubicacion=document.querySelector("section:first-of-type");
        var img = document.createElement("img")
        var apiKey = "&key=AIzaSyBRFusV9KGN7Kmvu4YKBCitK4ymw5ofj84";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud
        var zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false"; 
        
        var imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        img.setAttribute("src", imagenMapa)
        img.setAttribute("alt","mapa estático de google" )
        ubicacion.appendChild(img)
        document.querySelector("button").disabled = true
    }

    getMapaDinamicoGoogle(){
        var centro = {lat: 1, lng: 1};
        var div = document.querySelector("section:nth-of-type(2) div") 
        var mapaGeoposicionado = new google.maps.Map(div,{
            zoom: 8,
            center:centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        
        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
    
                infoWindow.setPosition(pos);
                infoWindow.setContent('Localización encontrada');
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
            }, function() {
                this.handleLocationError(true, infoWindow, mapaGeoposicionado.getCenter());
            });
        } else {
            this.handleLocationError(false, infoWindow, mapaGeoposicionado.getCenter());
        }
    }

    handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: Ha fallado la geolocalización' :
                              'Error: Su navegador no soporta geolocalizaciÃ³n');
        infoWindow.open(mapaGeoposicionado);
    }

    manejadorCarrusel(){
        var fotos = document.querySelectorAll("article img")
        var btNext = document.querySelector("article button:first-of-type")
        var btPrev = document.querySelector("article button:last-of-type")


        var index = 0
        var maxIndex = fotos.length -1

        btNext.onclick = function(){
            if(index == maxIndex){
                index = 0
            }
            else{
                index++
            }   
            this.desplazarImagenes(fotos,index)
        }.bind(this)


        btPrev.onclick = function(){
            if(index == 0){
                index = maxIndex
            }
            else{
                index--
            }   
            this.desplazarImagenes(fotos,index)
        }.bind(this)

    }

    desplazarImagenes(fotos, index){
        fotos.forEach((foto, i) => {
            var trans = 100 * (i - index);
            $(foto).css('transform', 'translateX(' + trans + '%)')
        })
    }

    
        
    
}