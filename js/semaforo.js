"use script";
class Semaforo{
    levels = [0.2,0.5,0.8]
    lights = 4
    unload_moment = null
    clic_moment = null

    constructor(){
        this.difficulty = this.levels[Math.floor(Math.random() * 3)]
        this.createStructure()
    }

    createStructure(){
        var seccion = document.createElement("section")
        var encabezado = document.createElement("h2")
        encabezado.textContent = "Juego del semáforo"
        seccion.appendChild(encabezado)
        for(var i = 0; i < this.lights;i++){
            seccion.appendChild(document.createElement("div"))
        }
        var bt1 = document.createElement("button")
        bt1.textContent = "Arranque"
        bt1.onclick = this.initSequence.bind(this)
        seccion.appendChild(bt1)
        var bt2 = document.createElement("button")
        bt2.textContent = "Reacción"
        bt2.disabled = true
        bt2.onclick = this.stopReaction.bind(this)
        seccion.appendChild(bt2)
       // var parrafo= document.createElement("p")
       // seccion.appendChild(parrafo)
       document.querySelector("main").appendChild(seccion)
    }

    endSequence(){
        var btReaccion = document.querySelector("main button:nth-of-type(2)")
        btReaccion.disabled = false
        var main = document.querySelector("main")
        main.classList.add("unload")
    }

    initSequence(){
        var main = document.querySelector("main")
        main.classList.add("load")
        var boton = document.querySelector("main button:first-of-type")
        boton.disabled=true
        setTimeout(() =>{
            this.unload_moment = Date.now()
            this.endSequence()
            }, 2000 + this.difficulty*100);
    }

    stopReaction(){
        this.clic_moment = Date.now()
        this.reaction_time = this.clic_moment - this.unload_moment
        var main = document.querySelector("main")
       /* var parrafo= document.querySelector("main p")
        parrafo.textContent = "Tiempo de reacción: "+this.reaction_time+" ms"*/
        main.classList.remove("load")
        main.classList.remove("unload")
        var btReaccion = document.querySelector("main button:nth-of-type(2)")
        btReaccion.disabled=true 
        var btArranque = document.querySelector("main button:first-of-type")
        btArranque.disabled=false 
        var form = document.querySelector("main form")
        if(form!=null){
            form.remove()
        }
        this.createRecordForm()
    }

    createRecordForm(){
        /*
        //no se ha creado ningún formulario previamente
        if(seccion == null){
            seccion = $("<section>")

            var encabezado = $("<h3>").text("Guardar resultado")
            seccion.append(encabezado)
        }   */

        var form = $("<form>").attr({
            "method": "post"
        })

        this.createCampoFormulario(form, "Nombre", false)
        this.createCampoFormulario(form, "Apellidos", false)
        this.createCampoFormulario(form, "Dificultad", true)
        this.createCampoFormulario(form, "Tiempo", true)

        var p = $("<p>")
        var btForm = $("<input>").attr({
            "type": "submit",
            "value":"Guardar resultado"
        })
        p.append(btForm)
        form.append(p)
        
        $("main section:nth-of-type(2)").append(form)

        $("input:nth-of-type(3)", form).attr("value", this.difficulty)
        $("input:nth-of-type(4)", form).attr("value", this.reaction_time +" ms")
    }

    createCampoFormulario(form, nombre, readonly){
        var p = $("<p>").text(nombre+": ")
        var input =$("<input>").attr({
            "name": nombre.toLowerCase(),
            "type":"text",
            "readOnly": readonly
        })
        form.append(p)
        form.append(input) 

    }
}

