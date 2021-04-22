var songs = [];



/*
* Let's begin a new game!
*/
function startNewGame(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);
    var gameSet = urlParams.get('set');

    //Default set => 0 (choose from all songs in the database)
    if(gameSet == null || gameSet == ""){
        gameSet = "0";
    }

    //Load set
    loadGameSet(gameSet);
}



/*
* Loads the set by id
*/
function loadGameSet(gameSet, random){
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
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        //Hide song info or show them on modmode
        (urlParams.has('modMode')) ? revealSong() : unrevealSong();

        //Choose a song randomly
        if(urlParams.has('random')){
            var songNumber = Math.floor(Math.random() * songs.length);
        }
        //Don't choose randomly
        else{
            var songNumber = 0;
        }
        
        //If it's the first song and the autoplay checkbox was not set: Don't autoplay first song
        //Autoplay all other songs
        (!urlParams.has('autoplay') && $("#songsPlayed").text() == 0) ? loadSong(songs[songNumber], false) : loadSong(songs[songNumber], true);
        
        //Remove song from array
        songs.splice(songNumber, 1);

        //Add 1 to the song counter
        $("#songsPlayed").text(parseInt($("#songsPlayed").text())+1)
    }   
    else{
        alert("All songs were already played. Please reload the page to play again!");
    }
}



/*
* Loads a new video
*/
function loadSong(songId, autoplay){
    var url = "https://www.youtube.com/embed/" + songId + "?rel=0";
    if(autoplay){ url += "&autoplay=1"; }
    $("#youtubeSrc").attr("src", url);
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
* Switches between reveal and unreveal
*/
function switchRevealSong(){
    ($( "#outerSong" ).hasClass( "showOuterSong" )) ? revealSong() : unrevealSong();
}



/*
* Reveals song video
*/
function revealSong(){
    if($( "#outerSong" ).hasClass( "showOuterSong" )){
        $( "#outerSong" ).removeClass( "showOuterSong" );
        $( "#innerSong" ).removeClass( "showInnerSong" );
        $( "#youtubeSrc" ).removeClass( "youtubeSrcSmall" );
        $( "#youtubeSrc" ).addClass( "youtubeSrcBig" );

        $("#revealSong").html('Unreveal song');
    }
}



/*
* Hides song video again
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