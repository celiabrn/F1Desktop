"use strict"
function leerXML(files){
    var file = files[0];
    var tipoTexto = /text.xml/;
    if (file.type.match(tipoTexto)) 
        {
        var lector = new FileReader();
        lector.onload = function (evento) {
            var xml = $.parseXML(lector.result);
            var circuito = $("circuito", xml);
            var seccion = document.createElement("section")

            var encabezado = document.createElement("h3")
            encabezado.textContent = $("nombre", circuito).text()

            var lista = document.createElement("ul")
            var longitudCirc = document.createElement("li")
            longitudCirc.textContent = "Longitud: "+$("longitud", circuito).text() + " km"
            var anchura = document.createElement("li")
            anchura.textContent = "Anchura media: "+$("anchura", circuito).text() + " m"        
            var fecha = document.createElement("li")
            fecha.textContent = "Fecha carrera: "+$("fecha", circuito).text() 
            var hInicio = document.createElement("li")
            hInicio.textContent = "Hora inicio carrera: "+$("hInicio", circuito).text()
            var nVueltas = document.createElement("li")
            nVueltas.textContent = "Número de vueltas: "+$("nVueltas", circuito).text()

            var localidad = document.createElement("li")
            localidad.textContent = "Localidad: "+$("localidad", circuito).text()
            var pais = document.createElement("li")
            pais.textContent = "Número país:  vueltas: "+$("pais", circuito).text()

            //Lista de tramos
            var listaTramos = document.createElement("li")
            listaTramos.textContent ="Tramos del cicuito"
            var listaSectores = document.createElement("ol")
            var sector = document.createElement("li")
                
            var numSector = 1
            sector.textContent = "Sector "+numSector
            var listaTramosSector = document.createElement("ul")
            $("tramos tramo",circuito).each((i, tramo) => {
                var sectorTramo = $("sector", tramo).text()
                if(parseInt(sectorTramo) != numSector){
                    sector.appendChild(listaTramosSector)
                    listaSectores.appendChild(sector) 

                    numSector = parseInt(sectorTramo)
                    sector = document.createElement("li")
                    sector.textContent = "Sector "+numSector
                    listaTramosSector = document.createElement("ul")
                }
                var nuevoTramo = document.createElement("li")
                nuevoTramo.textContent = "Tramo "+i
                var nuevoTramoLista = document.createElement("ul")
                var nuevoTramoDistancia = document.createElement("li")
                nuevoTramoDistancia.textContent = "Longitud: "+$("distancia",tramo).text()+" "+$("distancia",tramo).attr("unidades")

                var coordenada = $("coordenada",tramo)
                var nuevoTramoCoordenadas = document.createElement("li")
                nuevoTramoCoordenadas.textContent = "Coordenada de inicio: "+coordenada.attr("longitud")+";"+coordenada.attr("latitud")+";"+coordenada.attr("altitud")

                nuevoTramoLista.appendChild(nuevoTramoDistancia)
                nuevoTramoLista.appendChild(nuevoTramoCoordenadas)
                nuevoTramo.appendChild(nuevoTramoLista)
                listaTramosSector.appendChild(nuevoTramo)
            });      
            sector.appendChild(listaTramosSector)
            listaSectores.appendChild(sector) 
            listaTramos.appendChild(listaSectores)

            var seccionFotos = document.createElement("section")
            var encabezadoFotos = document.createElement("h4")
            encabezadoFotos.textContent = "Fotografías del circuito"
            seccionFotos.appendChild(encabezadoFotos)

            $("fotografias fotografia", circuito).each((i, fotografia) => {
                var img = document.createElement("img")
                img.src = $(fotografia).text()
                img.alt = "Imagen relacionada con el circuito"
                seccionFotos.appendChild(img)
            });

            var seccionVideos = document.createElement("section")
            var encabezadoVideos = document.createElement("h4")
            encabezadoVideos.textContent = "Vídeos del circuito"
            seccionVideos.appendChild(encabezadoVideos)
            $("videos video", circuito).each((i, video) => {
                var vd = document.createElement("video")
                vd.src = $(video).text()
                vd.controls = true
                seccionVideos.appendChild(vd)
            });

            var seccionRef = document.createElement("section")
            var encabezadoRef = document.createElement("h4")
            encabezadoRef.textContent = "Referencias"
            seccionRef.appendChild(encabezadoRef)
            $("referencias referencia", circuito).each((i, ref) => {
                var p = document.createElement("p")
                var a = document.createElement("a")
                a.textContent = "Referencia "+(i+1)
                a.href = $(ref).text()
                a.alt = "Enlace a la referencia"
                p.appendChild(a)
                seccionRef.appendChild(p)
            });

            lista.appendChild(longitudCirc)
            lista.appendChild(anchura)
            lista.appendChild(fecha)
            lista.appendChild(hInicio)
            lista.appendChild(nVueltas)
            lista.appendChild(localidad)
            lista.appendChild(pais)
            lista.appendChild(listaTramos)
            seccion.appendChild(encabezado)
            seccion.appendChild(lista)
            seccion.appendChild(seccionFotos)
            seccion.appendChild(seccionVideos)
            seccion.appendChild(seccionRef)
            document.querySelector("main").appendChild(seccion)
        }      
        lector.readAsText(file)
    }
    else {
        var errorArchivo= document.createElement("p")
        errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        document.querySelector("main").appendChild(errorArchivo)
    }           
}

function leerKML(files){
    var file = files[0];
    console.log(file)
    var tipoTexto = "kml";
    var extension = file.name.split(".")[1]
    if (tipoTexto.match(extension)) 
    {
        var lector = new FileReader();
        lector.onload = function (evento) {
            var kml = $.parseXML(lector.result);
            var coordenadas = $("coordinates", kml).text().split("\n").slice(1,-1)
            console.log(coordenadas)
            coordenadas =coordenadas.map(coord => ({
                lat: parseFloat(coord.split(",")[1]), 
                lng: parseFloat(coord.split(",")[0])
            }))

            var centro = coordenadas[0];
            console.log(centro)
            var div = document.createElement("div")
            var seccion = document.createElement("section")
            seccion.appendChild(div)
            var mapaGeoposicionado = new google.maps.Map(div,{
                zoom: 14,
                center:centro,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            })

            const mapa = new google.maps.Polyline({
                path: coordenadas,
                geodesic: false,
                strokeColor: "#FF0000",
                strokeWeight: 2,
                strokeOpacity: 2.0,
            })
            mapa.setMap(mapaGeoposicionado);
            document.querySelector("main").appendChild(seccion)
        }
        lector.readAsText(file)

    }
    else {
        var errorArchivo= document.createElement("p")
        errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        document.querySelector("main").appendChild(errorArchivo)
    }    
}

function leerSVG(files){
    var file = files[0];
    var tipoTexto = "svg";
    var extension = file.name.split(".")[1]
    console.log(files[0])
    if (tipoTexto.match(extension)) {
        var lector = new FileReader();
        lector.onload = function (evento) {
            var seccion =  $("main section:last-of-type")
            var encabezado = document.createElement("h3")
            encabezado.textContent = "Altimetría del circuito"
            var figure = document.createElement("figure")
            figure.innerHTML = lector.result
            seccion.append(encabezado)
            seccion.append(figure)
        }
        lector.readAsText(file)
    }
    else {
        var errorArchivo= document.createElement("p")
        errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        document.querySelector("main").appendChild(errorArchivo)
    }    
}
