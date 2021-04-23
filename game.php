<!doctype html>
<html lang="en" class="h-100">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.80.0">
    <title>YouTube Song Guessing Game</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/cover/">

    

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <!-- Core game js -->
    <script src="js/jquery-3.6.0.min.js"></script>
    <link href="js/bootstrap.min.js" rel="stylesheet">
    <script src="js/game.js"></script>
    <script>
        window.onload = function () {
          startNewGame();
        }
    </script>
    
    <!-- Custom styles for this template -->
    <link href="css\cover.css" rel="stylesheet">
    <link href="css\game.css" rel="stylesheet">
  </head>
  <body class="d-flex h-100 text-center text-white bg-dark">
    
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="mb-auto <?php if(isset($_GET["streamerMode"])){ echo "d-none"; } ?>">
    <div class="container">
      <div class="row mb-3">
        <div class="col-sm-5 d-grid gap-2">
          <button class="btn btn-primary" type="button" id="revealSong" onclick="
            <?php
              if(isset($_GET["admin"])){ echo "yt_quiz_revealSong.postMessage(true)"; }
              else { echo "switchRevealSong()"; }
            ?>
          ">Reveal song</button>
        </div>
        <div class="col-sm-5 d-grid gap-2">
          <button class="btn btn-info" type="button" id="nextSong" onclick="nextSong()">Next song</button>
        </div>
        <div class="col-sm-1 d-grid gap-2">
          <button class="btn btn-danger" type="button" id="quitGame" onclick="quitGame()">X</button>
        </div>
        <div class="col-sm-1 d-grid gap-2">
          <button class="btn btn-success" type="button" id="songsPlayed">0</button>
        </div>
      </div>
      <div class="row <?php if(!isset($_GET["admin"])){ echo "d-none"; } ?>">
        <div class="col-sm-5 d-grid gap-2">
          <button class="btn btn-success" type="button" id="nextSong" onclick="yt_quiz_playSong.postMessage(true)">Play song</button>
        </div>
        <div class="col-sm-5 d-grid gap-2">
          <button class="btn btn-danger" type="button" id="nextSong" onclick="yt_quiz_pauseSong.postMessage(true)">Pause song</button>
        </div>
      </div>
    </div>
  </header>

  <main class="px-3">
      <div id="outerSong" class="showOuterSong">
        <div id="innerSong" class="showInnerSong">
          <iframe id="youtubeSrc" class="youtubeSrcSmall" src=""></iframe>
        </div>
      </div>
  </main>

  <footer class="mt-auto text-white-50">
    <div class="container">
        <div class="row">
          <?php
            //How many players?
            if(isset($_GET["players"]) && $_GET["players"] != ""){
              $playernumber = $_GET["players"];
            }
            else{
              $playernumber = 3;
            }

            for($i = 1; $i <= $playernumber; $i++){
          ?>
            <div class="col-sm d-grid gap-2">
              <input type="text" class="form-control" id="player<?php echo $i; ?>Name" onchange="changeValueAdmin('player<?php echo $i; ?>Name')" placeholder="Player<?php echo $i; ?>" <?php if(isset($_GET["streamerMode"])){ echo "disabled"; } ?>>
              <input type="number" class="form-control" id="player<?php echo $i; ?>Score" onchange="changeValueAdmin('player<?php echo $i; ?>Score')" value="0" <?php if(isset($_GET["streamerMode"])){ echo "disabled"; } ?>>
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" onclick="changeScore('player<?php echo $i; ?>Score', '+');changeValueAdmin('player<?php echo $i; ?>Score')" 
                    id="player<?php echo $i; ?>ScorePlus" class="btn btn-outline-success <?php if(isset($_GET["streamerMode"])){ echo "d-none"; } ?>">+</button>
                  <button type="button" onclick="changeScore('player<?php echo $i; ?>Score', '-');changeValueAdmin('player<?php echo $i; ?>Score')" 
                    id="player<?php echo $i; ?>ScoreMinus" class="btn btn-outline-danger <?php if(isset($_GET["streamerMode"])){ echo "d-none"; } ?>">-</button>
                </div>
            </div>
          <?php    
            }
          ?>
        </div>
      </div>
  </footer>
</div>


    
  </body>
</html>
