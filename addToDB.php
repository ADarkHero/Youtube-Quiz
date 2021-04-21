<?php
  if(isset($_POST["youtubeID"])){
    if($_POST["password"] == $addToDBPass){
        require_once 'config.php';

        $youtubeID = $_POST["youtubeID"];

        //Remove everything before =
        if(strpos($youtubeID, "=")){
            $youtubeID = strstr($youtubeID, '=');
            $youtubeID = substr($youtubeID, 1);
        }
        
        //Remove everything after ?
        if(strpos($youtubeID, "?")){
            $youtubeID = substr($youtubeID, 0, strpos($youtubeID, "?"));
        }
        
        //Insert into db
        $sql = "INSERT INTO songs (SongLink, SetID) VALUES ('" . $youtubeID . "', '" . $_POST["set"] . "')";
        
        if ($conn->query($sql) === TRUE) {
            echo "Added to database successfully!";
        } else {
            echo "ERROR: " . $sql . "<br>" . $conn->error;
        }
    }
    else{
        echo "ERROR: Wrong password!";
    } 
  }
  else{
    require_once 'config.php';
  }
?>

<link href="css/bootstrap.min.css" rel="stylesheet">
<main class="px-3">
    <h1>Add video to game set:</h1>
    <form action="addToDB.php" method="post">
        <label for="setId">Set</label>
        <select id="setId" name="set" class="form-control">
            <?php
            $sql = "SELECT * FROM sets ORDER BY SetID";
            $result = $conn->query($sql);
            
            if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc()) {
                echo '<option value="'.$row["SetID"].'">'.$row["SetDescription"].'</option>';
                }
            } else {
                //Fallback, if database throughts an error
                echo '<option value="0">Random songs from all categories</option>';
            }
            $conn->close();
            ?>
        </select>

        <br>

        <label for="youtubeID" class="form-label">Youtube-ID / Video link</label>
        <input type="text" class="form-control" name="youtubeID" id="youtubeID" placeholder="dQw4w9WgXcQ"><br>

        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" name="password" id="password" placeholder="hunter2"><br>

        <button type="submit" class="btn btn-primary mb-3">Add to gameset</button>
    </form>
</main>