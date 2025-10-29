"use script";
class Memoria{
    elementos = 
        [
            {
                "element": "redBull",
                "source": "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
            },
            {
                "element": "redBull",
                "source": "https://upload.wikimedia.org/wikipedia/de/c/c4/Red_Bull_Racing_logo.svg"
            },	
            {
                "element": "mcLaren",
                "source": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
            },	
            {
                "element": "mcLaren",
                "source": "https://upload.wikimedia.org/wikipedia/en/6/66/McLaren_Racing_logo.svg"
            },	
            {
                "element": "alpine",
                "source": "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
            },	
            {
                "element": "alpine",
                "source": "https://upload.wikimedia.org/wikipedia/fr/b/b7/Alpine_F1_Team_2021_Logo.svg"
            },	
            {
                "element": "astonMartin",
                "source": "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
            },	
            {
                "element": "astonMartin",
                "source": "https://upload.wikimedia.org/wikipedia/fr/7/72/Aston_Martin_Aramco_Cognizant_F1.svg"
            },	
            {
                "element": "ferrari",
                "source": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
            },	
            {
                "element": "ferrari",
                "source": "https://upload.wikimedia.org/wikipedia/de/c/c0/Scuderia_Ferrari_Logo.svg"
            },	
            {
                "element": "mercedes",
                "source": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
            },	
            {
                "element": "mercedes",
                "source": "https://upload.wikimedia.org/wikipedia/commons/f/fb/Mercedes_AMG_Petronas_F1_Logo.svg"
            }
        ]      

    constructor(){
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
        this.shuffleElements()
        this.createElements()
        this.addEventListeners()
    }

    shuffleElements(){
        for(var i = this.elementos.length -1; i >= 0;i--){
            var j = Math.floor(Math.random() * (i+1));
            var aux = this.elementos[i];
            this.elementos[i]  = this.elementos[j];
            this.elementos[j] = aux;
        }
    }

    unflipCards(){
        this.lockBoard = true;
        setTimeout(()=>{
            this.firstCard.removeAttribute("data-state");
            this.secondCard.removeAttribute("data-state");
            this.resetBoard();
        }, 1100);
    }

    resetBoard(){
        this.firstCard = null;
        this.secondCard = null;
        this.hasFlippedCard = false;
        this.lockBoard = false;
    }

    checkForMatch(){
        this.firstCard.getAttribute("data-element") === this.secondCard.getAttribute("data-element") ?  this.disableCards() : this.unflipCards();
    }

    disableCards(){
        this.firstCard.setAttribute("data-state", "revealed")
        this.secondCard.setAttribute("data-state", "revealed")
        this.resetBoard()
    }

    createElements(){
        var seccion = document.querySelector("section:last-of-type")
        this.elementos.forEach((tarjeta) => {
            var article = document.createElement("article")
            article.setAttribute("data-element", tarjeta.element)

            var encabezado = document.createElement("h3")
            encabezado.textContent = "Tarjeta de memoria"

            var img = document.createElement("img")
            img.setAttribute("src", tarjeta.source)
            img.setAttribute("alt", tarjeta.element)

            article.appendChild(encabezado)
            article.appendChild(img)
            seccion.appendChild(article)
        })
    }

    addEventListeners(){
        var articles = document.querySelectorAll("section:last-of-type article")
        for(var i = 0; i <articles.length;i++){
            articles[i].onclick = this.flipCard.bind(articles[i], this) 
            articles[i].addEventListener("keydown", (event) => {
                if (event.isComposing || event.keyCode === 229) {
                    return;
                }
                this.flipCard.bind(articles[i], this)
            })
        }
    }

    flipCard(game){
        if(this.getAttribute("data-state") == "revealed" || game.lockBoard 
            || this === game.firstCard){
            return;
        }
        else{
            this.setAttribute("data-state","flip")
            if(game.hasFlippedCard){
                game.secondCard = this
                game.checkForMatch()
            }
            else{
                game.firstCard = this
                game.hasFlippedCard = true;
            }               
        }
    }



}