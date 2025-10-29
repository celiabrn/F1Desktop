<!DOCTYPE HTML>

<html lang="es">
    <?php
        class Record {
            protected $server;
            protected $user;
            protected $pass;
            protected $dbname;

            public function __construct(){
                $this->server = "localhost";
                $this->user = "DBUSER2024";
                $this->pass = "DBPSWD2024";
                $this->dbname = "records";
            }

            public function insertRecord($nombre, $apellidos, $dificultad, $tiempo){
                $db = new mysqli($this->server,$this->user,$this->pass,$this->dbname);
                if($db->connect_error) {
                    exit ("<h2>ERROR de conexión:".$db->connect_error."</h2>");  
                } 
                $query = $db->prepare("INSERT INTO registro (nombre, apellidos, dificultad, tiempo) VALUES (?,?,?,?)");   
                $query->bind_param('ssdd', $nombre, $apellidos, $dificultad, $tiempo);    
                $query->execute();
                $query->close();
                $db->close();    
            }

            public function mostrarRanking($dificultad){
                $db = new mysqli($this->server,$this->user,$this->pass,$this->dbname);
                if($db->connect_error) {
                    exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
                } 
                $preparedQuery = $db->prepare("SELECT Distinct * FROM registro WHERE Dificultad LIKE ? ORDER BY Tiempo ASC LIMIT 10");   
                $preparedQuery->bind_param('d', $dificultad);    
                $preparedQuery->execute();
                $resultado = $preparedQuery->get_result();
                echo "<section>";
                echo "<h3>Dificultad ".$dificultad." - Top 10 jugadores</h3>";
                echo "<ol>";
                while($row = $resultado->fetch_assoc()) {
                    echo "<li>". $row['Nombre'] . " - " . $row['Apellidos']." - ". $row['Tiempo'] ." ms</li>"; 
                }
                echo "</ol>";
                echo "</section>";
        
                $preparedQuery->close();
                $db->close();    
            }
        }
    ?>

<head>
    <!-- Datos que describen el documento -->
    <title>F1 Desktop</title>
    <meta charset="UTF-8" />
    <meta name ="author" content ="Celia Bobo Rodríguez-Noriega" />
    <meta name ="description" content ="Página del juego del semáforo" />
    <meta name ="keywords" content ="juego, semáforo, reacción, fórmula 1" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href ="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href ="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href ="estilo/semaforo_grid.css" />
    <link rel="icon" href="multimedia/imagenes/favicon.png"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
     integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
    crossorigin="anonymous"></script>
    <script src="js/semaforo.js"></script>

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
            <a href="calendario.html" title="Enlace a la página dlñ calendario">Calendario</a>
            <a href="meteorología.html" title="Enlace a la página de meteorología">Meteorología</a>
            <a href="circuito.html" title="Enlace a la página del circuito">Circuito</a>
            <a href="viajes.php" title="Enlace a la página de viajes">Viajes</a>
            <a href="juegos.html" title="Enlace a la página de juegos">Juegos</a>
        </nav>
    </header>

    <p>Estás en: <a href= "index.html">Inicio</a> >> <a href= "juegos.html">Juegos</a> >> Juego de tiempo de reacción</p>

    <section>
        <h2>Juegos</h2>
        <p><a href="memoria.html">Juego de memoria</a></p>
        <p><a href="semaforo.php">Juego de tiempo de reacción</a></p>
        <p><a href="api.html">Puzzle</a></p>
    </section>

    <main>
        <script>
            semaforo = new Semaforo()
        </script>
        <section>
            <h3>Guardar resultado</h3>
        </section>
        <?php
            if (count($_POST)>0) {       
                $nombre = $_POST["nombre"];
                $apellidos = $_POST["apellidos"];
                $dificultad = $_POST["dificultad"];
                $tiempo = $_POST["tiempo"];
        
                $rec = new Record();
                $rec->insertRecord($nombre, $apellidos, $dificultad, $tiempo);       
                $rec->mostrarRanking($dificultad);            
            }       
        ?>
    </main>
</body>
</html>