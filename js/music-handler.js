
//YouTube IFrame API player.
var player;

//Create DOM elements for the player.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

var ytScript = document.getElementsByTagName('script')[0];
ytScript.parentNode.insertBefore(tag, ytScript);

//Pick random index to start at.
var index = lib.rand(0, config.music.length);
var title = "n.a.";


function onYouTubeIframeAPIReady() 
{

    var videoId = config.music[index];

    player = new YT.Player('player', {
        width: '1',
        height: '1',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'disablekb': 1,
            'enablejsapi': 1,
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) 
{
    title = event.target.getVideoData().title;
    player.setVolume(config.musicVolume);

    play();
}

function onPlayerStateChange(event) 
{
    if(event.data == YT.PlayerState.PLAYING)
    {
        title = event.target.getVideoData().title;
    }

    if (event.data == YT.PlayerState.ENDED) {
        index++;
        play();
    }
}

function play() 
{
    var idx = index % config.music.length;
    var videoId = config.music[idx];

    player.loadVideoById(videoId, 0, "tiny");
    player.playVideo();
}

function resume()
{
    player.playVideo();
}

function pause() 
{
    player.pauseVideo();
}

function stop() 
{
    player.stopVideo();
}

function setVolume(volume)
{
    player.setVolume(volume)
}