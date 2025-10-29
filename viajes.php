<!DOCTYPE HTML>

<html lang="es">
    <?php
        class Carrusel {
            protected $capital;
            protected $pais;
            protected $fotos;

            public function __construct($capital, $pais){
                $this->capital = $capital;
                $this->pais = $pais;
            }

            public function crearCarrusel(){
                $this->fotos = array();

                $api_key = '9b886cf9f0ebe1f436d674688fc40f0d';
                $tag = $this->capital . "," . $this->pais;

                $perPage = 10;
                
                $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
                $url.= '&api_key='.$api_key;
                $url.= '&tags='.$tag;
                $url.= '&per_page='.$perPage;
                $url.= '&format=json';
                $url.= '&nojsoncallback=1';
                $url.= "_b.jpg";

                $respuesta = file_get_contents($url);
                $json = json_decode($respuesta);

                if($json==null) {
                    echo "<h3>Error en el archivo JSON recibido</h3>";
                }
                else {
                    for($i=0;$i<$perPage;$i++) {
                        $this->fotos[$i] = $json->items[$i]->media->m;
                        echo "<img src='".$this->fotos[$i]."' alt=' Imagen ".$i." del carrusel' />";
                    }
                    echo "<button> &gt; </button>";
                    echo "<button> &lt; </button>";
                }
            }
        }
    ?>
<head>
    <!-- Datos que describen el documento -->
    <title>F1 Desktop-Viajes</title>
    <meta charset="UTF-8" />
    <meta name ="author" content ="Celia Bobo Rodríguez-Noriega" />
    <meta name ="description" content ="Página con información de viajes" />
    <meta name ="keywords" content ="viajes, mapa" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href ="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href ="estilo/layout.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.png"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
     integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
    crossorigin="anonymous"></script>
    <script src="js/viajes.js"></script>
</head>

<body>
    <header>
        <!-- Datos con el contenidos que aparece en el navegador -->
        <h1><a href="index.html">F1 Desktop</a></h1>
    
        <!-- Menú de la página web -->
        <nav>
            <a href="index.html" title="Enlace a la página de inicio">Inicio</a>
            <a href="piloto.html" title="Enlace a la página del piloto">Piloto</a>
            <a href="noticias.html" title="Enlace a la página de noticias">Noticias</a>
            <a href="calendario.html" title="Enlace a la página del calendario">Calendario</a>
            <a href="meteorología.html" title="Enlace a la página de meteorología">Meteorología</a>
            <a href="circuito.html" title="Enlace a la página del circuito">Circuito</a>
            <a href="viajes.php" title="Enlace a la página de viajes">Viajes</a>
            <a href="juegos.html" title="Enlace a la página de juegos">Juegos</a>
        </nav>
    </header>

    <p>Estás en: <a href= "index.html">Inicio</a> >> Viajes</p>
    
    <main>
    <script>var v = new Viajes()</script>
    <h2>Viajes</h2>
    <section>
        <h3>Mapa estático</h3>
        <button onclick="v.getMapaEstaticoGoogle()">Mostrar mapa estático</button>
    </section>
    <section>
        <h3>Mapa dinámico</h3>
        <div></div>
        <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU&callback=v.getMapaDinamicoGoogle"></script>
    </section>

    <article>
        <h2>Carrusel de imágenes</h2>
        <?php
            $carrusel = new Carrusel("Viena", "Austria");
            $carrusel -> crearCarrusel();
        ?>
        <script>v.manejadorCarrusel() </script>
    </article>
    <section>
        <h2>Conversión de moneda</h2>
        <?php
            class Moneda {
                private $siglasMonedaBase;
                private $siglasMonedaCambio;
                private $cantidad;
                public function __construct($siglasMonedaBase, $siglasMonedaCambio){
                    $this->siglasMonedaBase = $siglasMonedaBase;
                    $this->siglasMonedaCambio = $siglasMonedaCambio;
                    $this->cantidad = 1;
                }

                function convertirMonedas() {
                    $apiKey ="2aca7983f7f00f0167e866b7" ;  
                    $url = "https://v6.exchangerate-api.com/v6/$apiKey/pair/$this->siglasMonedaBase/$this->siglasMonedaCambio/$this->cantidad";
                    $respuesta = file_get_contents($url);
                    $data = json_decode($respuesta, true);
                    if ($data['result'] == 'success') {                    
                        $convertedAmount = $data["conversion_result"];
                    
                        echo "$this->cantidad $this->siglasMonedaBase son $convertedAmount $this->siglasMonedaCambio";
                    } else {
                        echo "Se ha producido un error.";
                    }
                }
            }

            $moneda = new Moneda("USD", "EUR");
            $moneda -> convertirMonedas();
        ?>
    <section>
    </main>
</body>
</html>