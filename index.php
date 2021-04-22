<?php
  require_once 'config.php';
?>
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
    
    <!-- Custom styles for this template -->
    <link href="css\cover.css" rel="stylesheet">
    <link href="css\game.css" rel="stylesheet">
  </head>
  <body class="d-flex h-100 text-center text-white bg-dark">
    
<div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="mb-auto">
    <div>
      <h3 class="float-md-start mb-0">Youtube song guessing game</h3>
    </div>
  </header>

  <main>
    <h1 class="mb-3">Create a new game:</h1>
    <form action="game.php" method="get">
      <div class="form-group row mb-3">
        <label for="setId" class="col-sm-4 col-form-label">Set</label>
        <div class="col-sm-8">
          <select id="setId" name="set" class="form-control">
            <?php
              $sql = "SELECT sets.SetID as SetNum, SetDescription, COUNT(SongID) as SongCount, (SELECT Count(SetID) from songs) as TotalCount " .
              "FROM sets LEFT OUTER JOIN songs ON songs.SetID = sets.SetID " .
              "GROUP BY sets.SetID ORDER BY sets.SetID";
              $result = $conn->query($sql);
              
              if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc()) {
                  //ID 0 => Songs from all categories
                  ($row["SetNum"] == "0") ? $songCount = $row["TotalCount"] : $songCount = $row["SongCount"];

                  echo '<option value="'.$row["SetNum"].'">'.$row["SetDescription"].' ('.$songCount.' songs)'.'</option>';
                }
              } else {
                //Fallback, if database throughts an error
                echo '<option value="0">Random songs from all categories</option>';
              }
              $conn->close();
            ?>
          </select>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label for="numberOfPlayers" class="col-sm-4 col-form-label">Number of players</label>
        <div class="col-sm-8">
          <input type="number" class="form-control" name="players" id="numberOfPlayers" value="3">
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-4 col-form-label custom-control-label" for="randomCheckBox">Randomize song order</label>
        <div class="col-sm-8 form-check form-switch">
          <input type="checkbox" class="form-check-input" id="randomCheckBox" name="random" checked>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-4 col-form-label custom-control-label" for="autoplayFirstCheckBox">Autoplay first song</label>
        <div class="col-sm-8 form-check form-switch">
          <input type="checkbox" class="form-check-input" id="autoplayFirstCheckBox" name="autoplay">
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-sm-4 col-form-label custom-control-label" for="modModeCheckBox">Moderator mode (always reveal song)</label>
        <div class="col-sm-8 form-check form-switch">
          <input type="checkbox" class="form-check-input" id="modModeCheckBox" name="modMode">
        </div>
      </div>
      <div class="form-group row mb-3">
        <button type="submit" class="btn btn-lg btn-primary">Start game</button>
      </div>
    </form>
  </main>

  <footer class="mt-auto text-white-50">
    <p>Made by <a target="_blank" href="https://www.adarkhero.de" class="text-white">ADarkHero</a> | <a href="addToDB.php" class="text-white">Configuration</a></p>
  </footer>
</div>

    
  </body>
</html>
