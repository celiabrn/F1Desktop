"use script";

class Fondo{
    constructor(nombrePais, capital, nombreCircuito){
        this.nombrePais = nombrePais;
        this.capital = capital;
        this.nombreCircuito = nombreCircuito;
    }

    getImagenFondo(){        
        $.getJSON("https://api.flickr.com/services/rest/",
        {
            method:"flickr.photos.search",
            api_key: "9b886cf9f0ebe1f436d674688fc40f0d",
            tags: this.nombreCircuito,
            format: "json",
            nojsoncallback: "?"
        })
        .done(function(data){
            var item = data.photos.photo[0]
            var src = "https://live.staticflickr.com/"+ item.server +"/"+ item.id +"_"+  item.secret +"_b.jpg";
                $("body").css("background-image", `url(\"${src}\")`)
                $("body").css("background-repeat", "no-repeat");
                $("body").css("background-size", "cover");
                $("body").css("background-position", "center");
                $("body").css("height", "100vh");
                return;
            }
        )
    }
}