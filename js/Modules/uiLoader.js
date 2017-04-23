//Dependency: Nonde
"use strict";

const Image = require('./Image'),
    Text = require('./Text'),
    Graphic = require('./Graphics'),
    Video = require('./videoLoader'),
    ImageViewer = require('./imageViewer');

var _instance = null;
var _game = null;
var _graphics = null;
var _pauseImage = null;
var _playImage = null;
var _toggleSubtitleImage = null;
var _pausedByEngine = false;

var _overlayGraphic = null;
var _overlayCloseButton = null;
var _overlayText = null;

var _uiVisible = true;

const pauseButtonImageKeyEnum = 'IMAGE_BUTTON_PAUSE';
const playButtonImageKeyEnum = 'IMAGE_BUTTON_PLAY';
const toggleSubtitleButtonImageKeyEnum = 'IMAGE_BUTTON_TOGGLE_SUBTITLE';

function DrawPauseButton() {
    if(!_pauseImage)
        _pauseImage = new Image(10, 10, 'pauseButton', pauseButtonImageKeyEnum);
    _pauseImage.addImageToGame(_game, _game.uiGroup);
    _pauseImage.changeImage(_game, _game.global.gameManager.getPauseSignal());
}

function DrawToggleSubtitleButton() {
    if(!_toggleSubtitleImage)        
        _toggleSubtitleImage = new Image(10, 100, 'subtitleButton', toggleSubtitleButtonImageKeyEnum);    
    _toggleSubtitleImage.addImageToGame(_game, _game.uiGroup);
    _toggleSubtitleImage.changeImage(_game, _game.global.gameManager.getToggleSubtitleSignal());
}

function DrawPlayButton() {
    if(!_playImage)
        _playImage = new Image(_game.world.centerX, _game.world.centerY, 'playButton', playButtonImageKeyEnum);
    _playImage.addImageToGame(_game, _game.uiGroup);
    _playImage.changeImage(_game);
    _playImage.setVisible(false);
}

function Pause() {
    if(!Video.paused()) {
        _game.paused = true;
        Video.stop();
        if(_graphics) {
            _graphics.visible = true;
        }
        if(_playImage) {
            _playImage.setVisible(true);
        }
        _game.input.onDown.addOnce(Play, self);
    }
}

function Play() {
    if(!Video.isPausedByGame()) {
        Video.play();
        _game.paused = false;
        _graphics.visible = false;
        _playImage.setVisible(false);
    }
}

function ToggleUI() {
    _uiVisible = !_uiVisible;
    _pauseImage.setVisible(_uiVisible);
    //_toggleSubtitleImage.setVisible(_uiVisible);
}

function HideUI() {
    _uiVisible = false;
    _pauseImage.setVisible(_uiVisible);
    //_toggleSubtitleImage.setVisible(_uiVisible);
}

function ShowUI() {
    _uiVisible = true;
    _pauseImage.setVisible(_uiVisible);
    //_toggleSubtitleImage.setVisible(_uiVisible);
}

function DrawPauseOverlay() {
    _graphics = _game.add.graphics(0, 0);
    _graphics.beginFill(0x000000, 0.8);
    _graphics.drawRect(0, 0, _game.width, _game.height);
    _graphics.endFill();
    _graphics.visible = false;
    _game.uiGroup.add(_graphics);
}

function drawUI() {
    _graphics = _game.add.graphics(0, 0);
    drawName();
}

function drawName() {
    _game.add.text(0, 0, 'Chris', {})
    _graphics.beginFill(0x000000);
    _graphics.drawRoundedRect(0, 0, _game.width, _game.height, 10);
}

module.exports = {
    init: function(game) {
        if(_instance !== null)
            return _instance;
        ImageViewer.init(game);
        _instance = this;
        _game = game;
        return _instance;
    },
    preload: function() {
    },
    create: function(drawPause, drawSubtitleToggle) {
        _uiVisible = true;
        if(drawSubtitleToggle)
            //DrawToggleSubtitleButton();
        if(drawPause) {
            DrawPauseButton();
            DrawPauseOverlay();
            DrawPlayButton();
        }
    },
    pause: function(byGame) {
        Pause(byGame);
    },
    play: function() {
        Play();
    },
    toggleUI: function() {
        ToggleUI();
    },
    showUI: function() {
        ShowUI();
    },
    hideUI: function() {
        HideUI();
    },
    createInfoOverlay() {
        ImageViewer.createOverlay();
    },
    showInfoOverlay(image) {
        ImageViewer.setVisible(true, image);
    },
    hideInfoOverlay() {
        ImageViewer.setVisible(false);
    }
}
