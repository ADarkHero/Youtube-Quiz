var songs = [];
var yt_quiz_nextSong; //Broadcast channel for streamer mode
var yt_quiz_revealSong;
var yt_quiz_pauseSong;
var yt_quiz_playSong;
var yt_quiz_changeInputContent;


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

    //Check, if streamer mode is played
    streamerMode(gameSet);

    loadGameSet(gameSet, urlParams.has('streamerMode'));
}



/*
* Loads the set by id
*/
function loadGameSet(gameSet, streamerMode){
    $.ajax({url: "loadGameSet.php?gameSet="+gameSet, success: function(result){
        json = jQuery.parseJSON(result);
        json.forEach(element => {
            songs.push(element);
        });

        //Don't play first song on streamermode
        if(!streamerMode){ setTimeout(() => {  nextSong(); }, 2000); }  
    }});  
}



/*
* Plays next song
*/
function nextSong(){
    nextSong(-1)
}
function nextSong(fixedNumber){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    if(songs.length > 0){  
        
        //Hide song info or show them on modmode
        (urlParams.has('modMode') || urlParams.has('admin')) ? revealSong() : unrevealSong();
        if(urlParams.has('admin')){ $("#revealSong").html('Reveal song'); }

        //Choose a fixed song number (for streamer mode sync)
        if(fixedNumber > -1){
            var songNumber = fixedNumber;
        }
        //Choose a song randomly
        else if(urlParams.has('random')){
            var songNumber = Math.floor(Math.random() * songs.length);
        }
        //Don't choose randomly
        else{
            var songNumber = 0;
        }

        //Pass number to stremer mode
        if(urlParams.has('admin')){
            yt_quiz_nextSong.postMessage(songNumber);
        }
        
        //If it's the first song and the autoplay checkbox was not set: Don't autoplay first song
        //Don't autoplay in the admin mode
        //Autoplay all other songs
        ((!urlParams.has('autoplay') && $("#songsPlayed").text() == 0) || urlParams.has('admin')) ? loadSong(songs[songNumber], false) : loadSong(songs[songNumber], true);
        
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
    var url = "https://www.youtube.com/embed/" + songId + "?rel=0&enablejsapi=1";
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



/*
*
*/
function streamerMode(gameSet){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    //Open msg channel
    if(urlParams.has('admin') || urlParams.has('streamerMode')){
        yt_quiz_nextSong = new BroadcastChannel('youtube_quiz_nextSong');       
        yt_quiz_revealSong = new BroadcastChannel('youtube_quiz_revealSong');       
        yt_quiz_pauseSong = new BroadcastChannel('youtube_quiz_pauseSong');       
        yt_quiz_playSong = new BroadcastChannel('youtube_quiz_playSong');       
        yt_quiz_changeInputContent = new BroadcastChannel('youtube_quiz_changeInputContent');       
    }
    //Receive message
    if(urlParams.has('admin')){
        window.open('game.php?streamerMode=true&set=' + gameSet, '_blank').focus(); 
    }
    //Open streamer panel
    if(urlParams.has('streamerMode')){ 
        yt_quiz_nextSong.onmessage = function (ev) { 
            console.log(ev);
            console.log(songs);
            nextSong(ev.data);
        }
        yt_quiz_revealSong.onmessage = function (ev) { 
            revealSong();
        }
        yt_quiz_pauseSong.onmessage = function (ev) { 
            stopYoutubeVideo();
        }
        yt_quiz_playSong.onmessage = function (ev) { 
            playYoutubeVideo();
        }
        yt_quiz_changeInputContent.onmessage = function (ev) { 
            changeInputContent(ev);
        }
    } 
    
}



/*
*
*/
function stopYoutubeVideo(){
    $('#youtubeSrc').each(function(){
        this.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
    });
}



/*
*
*/
function playYoutubeVideo(){
    $('#youtubeSrc').each(function(){
        this.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
    });
}



/*
* Sends a changed value to the other tab, if streamer mode is enabled
*/
function changeValueAdmin(identifier){
    yt_quiz_changeInputContent.postMessage(identifier + " " + $("#"+identifier).val());
}




/*
* Receives data from the admin tab, if streamer mode is enabled
*/
function changeInputContent(ev){
    var data = ev.data.split(" ");
    $("#" + data[0]).val(data[1])
}