<?php
    require_once 'config.php';
    if(isset($_GET["gameSet"])){
        $gameSet = $_GET["gameSet"];
    }
    else{
        $gameSet = 0;
    }


    //Gameset 0 plays songs from all sets
    if($gameSet == 0){
        $sql = "SELECT DISTINCT SongLink FROM songs";
    }
    else{
        $sql = "SELECT DISTINCT SongLink FROM songs WHERE SetID = " . $gameSet;
    }
    
    
    $result = $conn->query($sql);
    
    $songs = array();
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            array_push($songs, $row["SongLink"]);
        }
    } else {
        //Fallback, if database throughts an error
        array_push($songs, 'dQw4w9WgXcQ');
    }
    $conn->close();

    echo json_encode($songs);
?>