<?php
header('Access-Control-Allow-Methods: GET, POST');
include("functions.php");

if(isset($_POST['vrsta_pica_id']) && isset($_POST['ime']) && isset($_POST['cena']) && isset($_POST['opis'])){


    $vrsta_pica_id = $_POST['vrsta_pica_id'];
    $ime = $_POST['ime'];
    $cena = $_POST['cena'];
    $opis = $_POST['opis'];

    echo dodajPice($vrsta_pica_id, $ime, $cena, $opis);
}
?>