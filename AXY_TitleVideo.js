//=============================================================================
// A XueYu Plugins - Title Video
// AXY_TitleVideo.js
// Version: 1.03
// License: MIT(or respect PrimeHover's Creative Commons Attribution 4.0 International License)
//=============================================================================
/*:
 * @plugindesc v1.03 Allows to Change Title Screen Background to Video.
 * @author A XueYu Plugins
 *
 * @help
 * Introduction
 * This plugin allows to Change Title Screen Background to Video.
 * This plugin base on PrimeHover's PH - Video Title plugin that's version 1.1 post on 4 years ago which 11/12/2015.
 * And his work is licensed under the Creative Commons Attribution 4.0 International License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by/4.0/
 *
 * changelog
 * 1.03 2019.11.14
 * add: param: title1Alpha, videoAlpha, title2Alpha. If you want to set the transparent of the video, title1 or title2 ;
 * 1.02 2019.11.13
 * add: click or touch event, pause or play video;
 * add: support system title2 layer, so you can put a title image on the video;
 * 1.01 2019.11.12
 * add: support mobile device;
 * fix: black title screen background when play video but sound is normal play;
 * fix: always play video when leave title screen;
 * modify: use new param format;
 * modify: video name without ext;
 * modify: image name chooser;
 * optimize: memory and performance;
 * 1.00 2019.11.11
 * first release.
 *
 * //=============================================================================
 * End of Help File
 * //=============================================================================
 *
 * @param videoName
 * @text Video Name
 * @desc File name for the video without ext name in movies folder
 * @type text
 *
 * @param imageName
 * @text Image Name
 * @desc File path for the image shown when the video is loading
 * @type file
 * @dir img
 * @require 1
 *
 * @param x
 * @text X
 * @desc The x position of video upper left corner. default:0
 * @type number
 * @default 0
 *
 * @param y
 * @text Y
 * @desc The y position of video upper left corner. default:0
 * @type number
 * @default 0
 *
 * @param width
 * @text Width
 * @desc The video box width. default:816
 * @type number
 * @default 816
 *
 * @param height
 * @text Height
 * @desc The video box height. default:624
 * @type number
 * @default 624
 *
 * @param muted
 * @text Muted
 * @desc Video muted? true/false default:false
 * @type boolean
 * @default false
 *
 * @param loop
 * @text Loop
 * @desc Video loop? true/false default:true
 * @type boolean
 * @default true
 *
 * @param title1Alpha
 * @text Title 1 Alpha
 * @desc The alpha of title 1 that is lower layer. ranges:0-1 default:1
 * @type text
 * @default 1
 *
 * @param videoAlpha
 * @text Video Alpha
 * @desc The alpha of video that is middle layer. ranges:0-1 default:0.5
 * @type text
 * @default 0.5
 *
 * @param title2Alpha
 * @text Title 2 Alpha
 * @desc The alpha of title 2 that is upper layer. ranges:0-1 default:0.5
 * @type text
 * @default 0.5
 *
 *
 */

// Imported
var Imported = Imported || {};
Imported.AXY_TitleVideo = true;

// Parameter Variables
var AXY = AXY || {};
AXY.TitleVideo = AXY.TitleVideo || {};

AXY.TitleVideo.Parameters = PluginManager.parameters('AXY_TitleVideo');
AXY.TitleVideo.Param = AXY.TitleVideo.Param || {};
AXY.TitleVideo.Alias = AXY.TitleVideo.Alias || {};
AXY.TitleVideo.Variables = AXY.TitleVideo.Variables || {};

//=============================================================================
// Utils
//=============================================================================
// Create a utility function to parse complex parameters.
//=============================================================================
Utils.recursiveParse = function (param) {
	try {
		if (typeof JSON.parse(param) == 'object') {
			return JSON.parse(
				param,
				function (key, value) {
					try {
						return this.recursiveParse(value);
					} catch (e) {
						return value;
					}
				}.bind(this)
			);
		} else {
			return JSON.parse(
				param,
				function (key, value) {
					return value;
				}.bind(this)
			);
		}
	} catch (e) {
		return param;
	}
};

//=============================================================================
// Parameters
//=============================================================================
// Read and parse parameters into a locally scoped Parameters object.
//=============================================================================
Object.keys(AXY.TitleVideo.Parameters).forEach(function (key) {
	return (AXY.TitleVideo.Param[key] = Utils.recursiveParse(
		AXY.TitleVideo.Parameters[key]
	));
});

// Main
// Video Title Class
//var PH_VideoTitle = null;

AXY.TitleVideo.VideoTitle = function () {
	this.videoName =
		'movies/' +
		AXY.TitleVideo.Param.videoName +
		Game_Interpreter.prototype.videoFileExt();
	this.imageName = 'img/' + AXY.TitleVideo.Param.imageName + '.png';
	if (Decrypter.hasEncryptedImages) {
		this.imageName = Decrypter.extToEncryptExt(this.imageName);
	}
	//console.log(Decrypter.extToEncryptExt(this.imageName));
	//console.log(AXY.TitleVideo.Param.videoName);
	//console.log(this.videoName);
	//console.log(this);

	// Creating video tag
	this._video = document.createElement('video');
	//this._video.id = 'VideoTitle_' + this.videoName.replace(/[^A-Z0-9]+/gi, '_');
	this._video.src = this.videoName;
	this._video.style.width = 0;
	this._video.style.height = 0;
	this._video.autoPlay = false;
	//this._video.setAttribute('playsinline', '');
	//this._video.setAttribute('x5-video-player-type', 'h5');
	//this._video.setAttribute('x5-video-orientation', 'landscape');
	//this._video.setAttribute('x5-video-player-fullscreen', 'true');
	//this._video.setAttribute('controls', '');
	//this._video.setAttribute('x5-playsinline', '');
	//this._video.setAttribute('webkit-playsinline', '');
	//this._video.setAttribute('x-webkit-airplay', 'allow');
	//this._video.setAttribute('preload', 'auto');

	// Appending the video at the body tag
	//document.body.appendChild(this._video);
	//document.body.append('<button id="play">Play</button><button id="pause">Pause</button>');

	// Starts video and creates the texture
	this.setVideoTexture();

	// Control Options
	this.setControlOptions();
};
AXY.TitleVideo.VideoTitle.prototype.constructor = AXY.TitleVideo.VideoTitle;

AXY.TitleVideo.VideoTitle.prototype.setControlOptions = function () {
	if (AXY.TitleVideo.Param.loop == true) {
		this._video.loop = true;
	} else {
		this._video.loop = false;
	}

	if (AXY.TitleVideo.Param.muted == true) {
		this._video.muted = true;
	} else {
		this._video.muted = false;
	}

	if (this.imageName.trim() != '') {
		this._video.poster = this.imageName;
	}

	/*let playBtn = document.getElementById("play");
	let pauseBtn = document.getElementById("pause");

	playBtn.addEventListener("click", function () {
		this._videoSource.play();
	});
	pauseBtn.addEventListener("click", function () {
		this._videoSource.pause()
	});*/
};

AXY.TitleVideo.VideoTitle.prototype.setVideoTexture = function () {
	//this._texture = PIXI.VideoTexture.textureFromVideo(this._video);
	//this._texture = PIXI.Texture.fromVideo(this._video);
	//this._texture = PIXI.Texture.fromVideo('movies/' + this.name + '.webm');
	this._texture = PIXI.Texture.from(this._video);

	this._spriteVideo = new PIXI.Sprite(this._texture);
	this._spriteVideo.width = AXY.TitleVideo.Param.width;
	this._spriteVideo.height = AXY.TitleVideo.Param.height;
	this._spriteVideo.x = AXY.TitleVideo.Param.x;
	this._spriteVideo.y = AXY.TitleVideo.Param.y;

	//视频元素
	//this._videoSource = this._texture.baseTexture.source;
};

AXY.TitleVideo.VideoTitle.prototype.pauseVideo = function () {
	this._video.pause();
};

AXY.TitleVideo.VideoTitle.prototype.playVideo = function () {
	this._video.play();
};

AXY.TitleVideo.VideoTitle.prototype.removeVideo = function () {
	this._video.pause();
	this._video.src = null;
	this._video.removeAttribute('src');
	this._video.load();
};

AXY.TitleVideo.VideoTitle.prototype.update = function () {
	this._texture.update();
	if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
		if (this._video.paused) {
			this.playVideo();
		} else {
			this.pauseVideo();
		}
	}
};

/* Overwritten Scene_Title methods */
Scene_Title.prototype.create = function () {
	/* Prevent the video to be duplicated */
	/*if (PH_VideoTitle === null) {
		PH_VideoTitle = new AXY.TitleVideo.VideoTitle();
	}*/
	//this.videoTitle = PH_VideoTitle;
	this.videoTitle = new AXY.TitleVideo.VideoTitle();
	//this.videoTitle.playVideo();
	this._backSprite1 = new Sprite(
		ImageManager.loadTitle1($dataSystem.title1Name)
	);
	this._backSprite1.alpha = AXY.TitleVideo.Param.title1Alpha;
	this.addChild(this._backSprite1);
	this.videoTitle._spriteVideo.alpha = AXY.TitleVideo.Param.videoAlpha;
	this.addChild(this.videoTitle._spriteVideo);
	//this.createBackground();
	this._backSprite2 = new Sprite(
		ImageManager.loadTitle2($dataSystem.title2Name)
	);
	this._backSprite2.alpha = AXY.TitleVideo.Param.title2Alpha;
	this.addChild(this._backSprite2);
	this.createForeground();
	this.createWindowLayer();
	this.createCommandWindow();
	//console.log(this);
};

Scene_Title.prototype.start = function () {
	Scene_Base.prototype.start.call(this);
	SceneManager.clearStack();
	if (AXY.TitleVideo.Param.muted == true) {
		this.playTitleMusic();
	}
	this.startFadeIn(this.fadeSpeed(), false);
};

Scene_Title.prototype.terminate = function () {
	Scene_Base.prototype.terminate.call(this);
	this.videoTitle.pauseVideo();
	//this.videoTitle.removeVideo();
	SceneManager.snapForBackground();
};

AXY.TitleVideo.Alias.Scene_Title_update = Scene_Title.prototype.update;
Scene_Title.prototype.update = function () {
	AXY.TitleVideo.Alias.Scene_Title_update.call(this);
	this.videoTitle.update();
};