var audio_shoot = new Audio("assets/shoot_2.wav");
audio_shoot.volume = 0.3;
var audio_explosion1 = new Audio("assets/explosion_1.wav");
var audio_explosion2 = new Audio("assets/explosion_4.wav");
var audio_confirm = new Audio("assets/click_3.wav");
var audio_ingame_song = new Audio("assets/song.wav");
audio_ingame_song.volume = 0.5;
audio_ingame_song.addEventListener("ended", function(){
	this.currentTime = 0;
	this.play();
}, false);