var songs = [];



function startNewGame(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var gameSet = urlParams.get('set');

    if(gameSet == null || gameSet == ""){
        gameSet = "0";
    }

    //Load set
    loadGameSet(gameSet);
}



/*
* Loads the set by id
*/
function loadGameSet(gameSet){
    $.ajax({url: "loadGameSet.php?gameSet="+gameSet, success: function(result){
        json = jQuery.parseJSON(result);
        json.forEach(element => {
            songs.push(element);
        });

        //Play first song
        nextSong();
    }});  
}



/*
* Plays next song
*/
function nextSong(){
    if(songs.length > 0){
        //Hide song info
        unrevealSong();

        //Choose a song randomly
        var randomSongNumber = Math.floor(Math.random() * songs.length);

        //Load song from Spotify
        loadSong(songs[randomSongNumber]);

        //Remove song from array
        songs.splice(randomSongNumber, 1);

        //Add 1 to the song counter
        $("#songsPlayed").text(parseInt($("#songsPlayed").text())+1)
    }   
    else{
        alert("All songs were already played. Please reload the page to play again!");
    }
}


function loadSong(songId){
    $("#youtubeSrc").attr("src", "https://www.youtube.com/embed/" + songId + "?rel=0&autoplay=1");
}




/*
* Adds or removes points from a player
*/
function changeScore(playerId, identifier) {
    //Read from GUI
    var currentScoreStr = $("#"+playerId).val();
    var currentCoreInt = parseInt(currentScoreStr);
    var result = 0;

    //Add/Remove one point
    if(identifier == '+'){ result = currentCoreInt + 1; }
    else{ result = currentCoreInt - 1; }
    
    //Write to GUI
    $("#"+playerId).val(result);
}



/*
* Reveals song title and name
*/
function revealSong(){
    if($( "#outerSong" ).hasClass( "showOuterSong" )){
        $( "#outerSong" ).removeClass( "showOuterSong" );
        $( "#innerSong" ).removeClass( "showInnerSong" );
        $( "#youtubeSrc" ).removeClass( "youtubeSrcSmall" );
        $( "#youtubeSrc" ).addClass( "youtubeSrcBig" );

        $("#revealSong").html('Unreveal song');
    }
    else{
        unrevealSong();
    }
}



/*
* Hides song info again
*/
function unrevealSong(){
    if(!$( "#outerSong" ).hasClass( "showOuterSong" )){
        $( "#outerSong" ).addClass( "showOuterSong" );
        $( "#innerSong" ).addClass( "showInnerSong" );
        $( "#youtubeSrc" ).addClass( "youtubeSrcSmall" );
        $( "#youtubeSrc" ).removeClass( "youtubeSrcBig" );

        $("#revealSong").html('Reveal song');
    }
}



/*
* Shows popup to quit game
*/
function quitGame(){
    if (confirm('Quit game?')) {
        window.location.replace("index.php");
    }
}