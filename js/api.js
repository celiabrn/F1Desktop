"use strict"
class Puzzle{
    //imágenes
    elementos = 
        [
            {
                "posPieza": 0,
                "source": "multimedia/imagenes/0_puzzle"
            },
            {
                "posPieza": 1,
                "source": "multimedia/imagenes/1_puzzle"
            },	
            {
                "posPieza": 2,
                "source": "multimedia/imagenes/2_puzzle"
            },	
            {
                "posPieza": 3,
                "source": "multimedia/imagenes/3_puzzle"
            },
            {
                "posPieza": 4,
                "source": "multimedia/imagenes/4_puzzle"
            },	
            {
                "posPieza": 5,
                "source": "multimedia/imagenes/5_puzzle"
            },	
            {
                "posPieza": 6,
                "source": "multimedia/imagenes/6_puzzle"
            },
            {
                "posPieza": 7,
                "source": "multimedia/imagenes/7_puzzle"
            },	
            {
                "posPieza": 8,
                "source": "multimedia/imagenes/8_puzzle"
            },	
        ]      
    constructor(){
        this.barajarPiezas()
        this.crearPuzzleVacio()
    }

    barajarPiezas(){
        for(var i = this.elementos.length -1; i >= 0;i--){
            var j = Math.floor(Math.random() * (i+1));
            var aux = this.elementos[i];
            this.elementos[i]  = this.elementos[j];
            this.elementos[j] = aux;
        }
    }

    crearPuzzleVacio(){
        var seccion = document.querySelector("main section:nth-of-type(1)")
        var seccionPiezas = document.querySelector("main section:last-of-type")
        for(var i = 0; i< this.elementos.length;i++){
            var article = document.createElement("article")
            var imgPiezaVacia = document.createElement("img")
            imgPiezaVacia.src = "multimedia/imagenes/vacio_puzzle.png"
            imgPiezaVacia.setAttribute("data-pos", i)
            imgPiezaVacia.addEventListener("dragover", this.dragOver.bind(this))
            imgPiezaVacia.addEventListener("drop", this.drop.bind(this))
            imgPiezaVacia.alt = "Pieza vacía del puzzle"
            article.appendChild(imgPiezaVacia)

            var pieza =document.createElement("article")
            pieza.draggable = true
            pieza.addEventListener("dragstart", this.dragStart.bind(this))

            var pictPieza = this.crearPieza(i)
                      
            pieza.appendChild(pictPieza)
            seccionPiezas.appendChild(pieza)
            seccion.appendChild(article)
        }
    }

    crearPieza(i){
        var src = this.elementos[i].source
        var pict = document.createElement("picture")
        var sourceS = document.createElement("source")
        sourceS.setAttribute("media", "(max-width:465px)")
        sourceS.setAttribute("srcset", src +"_s.jpg")
        var sourceB = document.createElement("source")
        sourceB.setAttribute("media", "(min-width:465px)")
        sourceB.setAttribute("srcset", src +"_b.jpg")
        var img = document.createElement("img")
        img.src = src +"_b.jpg"
        img.alt = "Pieza del puzzle"
        pict.appendChild(sourceS)
        pict.appendChild(sourceB)
        pict.appendChild(img)   
        pict.setAttribute("data-pos", this.elementos[i].posPieza)
        return pict
    }

    dragOver(e){
        e.preventDefault()
    }

    dragStart(e){
        e.dataTransfer.setData("id", e.target.getAttribute("data-pos"))
    }

    drop(e){
        e.preventDefault()
        var numPieza = e.dataTransfer.getData("id")
        var posDrop = e.target.getAttribute("data-pos")
        if(numPieza == posDrop){
            var img = e.target
            console.log(e.target)

            this.elementos.forEach(pieza => {
                if(pieza.posPieza == numPieza){
                    img.src = pieza.source
                }
            })
            img.alt = "Pieza del puzzle"
            document.querySelectorAll("section:last-of-type article img").forEach(piezaABorrar =>{
                if(piezaABorrar.getAttribute("data-pos") == numPieza){
                    piezaABorrar.parentElement.remove()
                }            
            })

        }


    }
    
    drop2(event) {
        event.preventDefault();
        event.target.classList.remove('hover');
        this.elementos.forEach(elemento => {
            // console.log(elemento.pais + " " + event.target.innerText + " / " + elemento.circuito + " " + event.dataTransfer.getData('text/plain'));
            if(elemento.pais === event.target.innerText && elemento.circuito === event.dataTransfer.getData('text/plain')){
                Array.from($("main section:nth-of-type(2) article")).forEach(element => {
                    //console.log(element.innerText + " || " + event.dataTransfer.getData('text/plain'));
                    if(element.innerText === event.dataTransfer.getData('text/plain')){
                        console.log($("p", element));
                        console.log(element);
                        event.target.appendChild(element);
                        //element.remove();   
                    }
                });
                //console.log(event.target);
                //console.log(event.dataTransfer);
                //event.target.append(event.dataTransfer);
                //event.target.appendChild(event.dataTransfer);
                //event.target.innerText = event.target.innerText + " - " + event.dataTransfer.getData('text/plain');
            }
        });
    }
}