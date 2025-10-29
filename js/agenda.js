"use strict"
class Agenda{
    constructor(){
        this.url = "https://ergast.com/api/f1/current"
    }

    getInfoTemporadaActual(){
            $("main button").attr("disabled", "disabled")
            $.ajax({
                format: "json",
                nojsoncallback: "?",
                url: this.url,
                method: 'GET',
                success: function(datos){                 
                    var tabla = document.querySelector("table")
                    $(datos).find("Race").each(function(i,item){
                        var nombreCarrera = $("RaceName", item).text()
                        var nombreCircuito = $("Circuit CircuitName", item).text()
                        var longitud = $("Circuit Location", item).attr("long")
                        var latitud = $("Circuit Location", item).attr("lat")
                        var fecha = $("Date:first", item).text()
                        var fechaLocal      = (new Date(fecha)).toLocaleDateString("es-ES");

                        var hora = $("Time:first", item).text().slice(0, -1)

                        var filaTabla = document.createElement("tr")
                        var col1 = document.createElement("td")
                        col1.setAttribute("headers", "carrera")
                        col1.textContent = nombreCarrera

                        var col2 = document.createElement("td")
                        col2.setAttribute("headers", "circuito")
                        col2.textContent = nombreCircuito

                        var col3 = document.createElement("td")
                        col3.setAttribute("headers", "coordenadas")
                        col3.textContent = longitud+";"+latitud

                        var col4 = document.createElement("td")
                        col4.setAttribute("headers", "fecha")
                        col4.textContent = fechaLocal

                        var col5 = document.createElement("td")
                        col5.setAttribute("headers", "hora")
                        col5.textContent = hora

                        filaTabla.appendChild(col1)
                        filaTabla.appendChild(col2)
                        filaTabla.appendChild(col3)
                        filaTabla.appendChild(col4)
                        filaTabla.appendChild(col5)
                        tabla.appendChild(filaTabla)

                    })
                },
                error: function(){
                    console.log("Se ha producido un error")
                }
        })
    }

    crearTablaInfoTemporadaActual(){
        var tabla = document.createElement("table")
        var caption = document.createElement("caption")
        caption.textContent ="Carreras de la temporada actual"
        tabla.appendChild(caption)

        var firstRow = document.createElement("tr")
        firstRow.appendChild(this.createColumn("Carrera", "carrera"))
        firstRow.appendChild(this.createColumn("Circuito", "circuito"))
        firstRow.appendChild(this.createColumn("Coordenadas circuito", "coordenadas"))
        firstRow.appendChild(this.createColumn("Fecha", "fecha"))
        firstRow.appendChild(this.createColumn("Hora", "hora"))
        tabla.appendChild(firstRow)
        document.querySelector("body").appendChild(tabla)
        this.getInfoTemporadaActual()

    }

    createColumn(nombre, id){
        var col = document.createElement("th")
        col.textContent = nombre
        col.setAttribute("scope", "col")
        col.setAttribute("id", id)
        return col
    }


}