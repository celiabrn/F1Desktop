"use script";
class Pais {
    constructor(nombre, capital, poblacion){
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
    }

    inicializarAtributos(){
        this.circuito = "Red Bull Ring";
        this.tipoGobierno = "República federal parlamentaria";
        this.coordLongitud = 14.7648796
        this.coordLatitud = 47.2199124
        this.coordAltitud = 678.9420204
        this.religion = "Cristianismo católico"
    }

    getNombre(){
        return this.nombre;
    }

    getCapital(){
        return this.capital;
    }

    getInfo(){
        return "<ul>\n\t<li>Nombre del circuito: "+this.circuito
        +"</li>\n\t<li>Población: "+this.poblacion
        +"</li>\n\t<li>Forma de gobierno: "+this.tipoGobierno
        +"</li>\n\t<li>Religión mayoritaria: "+this.religion
        +"</li>\n</ul>";
    }

    escribirCoordenadas(){
        document.write("<p>Coordenadas meta: "+this.coordLongitud+","+this.coordLatitud+","+this.coordAltitud+"</p>");
    }


    cargarPrediccionTiempo(){
        this.apikey = "fd6cea0cc4a1d62443cb8abefbd48f2b";
        this.tipo = "&mode=xml";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "https://api.openweathermap.org/data/2.5/forecast?lat="+this.coordLatitud+"&lon="+this.coordLongitud+ this.tipo + this.unidades + this.idioma + "&APPID=" + this.apikey;

        $.ajax({
            dataType: "xml",
            url: this.url,
            method: 'GET',
            success: function(datos){
                var j = 0
                $(datos).find("time").each(function(i,item){
                    if($(item).attr("from").split("T")[1] =="12:00:00"){
                       var fecha = $(item).attr("from"); 
                        var tempMin = $('temperature',item).attr("min"); 
                        var tempMax = $('temperature',item).attr("max"); 
                        var porHum = $('humidity',item).attr("value"); 
                        var iconoLluvia = $('symbol',item).attr("var"); 
                        var textoIcono =  $('symbol',item).attr("name"); 
                        var stringDatos =  "<ul><li>Día y fecha: " +fecha  +"</li>";
                        stringDatos += "<li>Temperatura mínima: " + tempMin + "</li>";
                        stringDatos += "<li>Temperatura máxima: " + tempMax + "</li>";
                        stringDatos += "<li>Porcentaje de humedad: " + porHum + "</li>";
                        stringDatos += "<li>Icono lluvia: " + iconoLluvia + "</li>";
                        var cantidadLluvia =  0;
                        
                        var horaMedidaMiliSeg1970 = Date.parse(fecha);
                        var minutosZonaHoraria = new Date().getTimezoneOffset();
                        horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                        var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                        var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");

                        var article = document.querySelector("article:nth-of-type("+(j+1)+") ")
                        article.querySelector("p:first-of-type").textContent = fechaMedidaLocal +" "+horaMedidaLocal
                        article.querySelector("p:nth-of-type(2)").textContent = tempMin
                        article.querySelector("p:nth-of-type(3)").textContent = tempMax
                        article.querySelector("p:nth-of-type(4)").textContent = porHum
                        article.querySelector("p:nth-of-type(5)").textContent = "no disponible"
                        var imgSrc = "https://openweathermap.org/img/wn/"+iconoLluvia+ "@2x.png"
                        article.querySelector("img").setAttribute("src", imgSrc)
                        article.querySelector("img").setAttribute("alt", textoIcono)
                        j= j+1
                    }                    
                })    
            }
        })
    }

    verInfoMeteorológica(){
        var main = document.querySelector("main")
        var section = document.createElement("section")

        var encabezado = document.createElement("h3")
        encabezado.textContent = "Datos meteorológicos"
        section.appendChild(encabezado)
        for(var i = 0; i < 5;i++){
            var article = document.createElement("article"); 
            var imagen = document.createElement("img")
            for(var j = 0; j < 5;j++){
                article.appendChild(document.createElement("p"))
            }

            article.appendChild(imagen)
            
            section.appendChild(article)

        }
        main.appendChild(section)
        this.cargarPrediccionTiempo();
    }    
}

