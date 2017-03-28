//Dependency: Nonde
"use strict";

const Image = require('./Image'),
    Video = require('./videoLoader');

var _instance = null;
var _game = null;
var _graphics = null;
var _pauseImage = null;

const pauseButtonImageKeyEnum = 'IMAGE_PAUSE';

function DrawPauseButton() {
    if(!_pauseImage)
        _pauseImage = new Image(10, 10, 'thoughtIcon', pauseButtonImageKeyEnum);
    _pauseImage.addImageToGame(_game, _game.uiGroup);
    _pauseImage.changeImage(_game, _game.global.gameManager.getPauseSignal());
}

function Pause() {
    if(!_game.paused) {
        _game.input.onDown.addOnce(Unpause, self);
        _game.paused = true;
        Video.stop();
        if(_graphics)
            _graphics.visible = true;
        else
            DrawRect();
    }

    function Unpause() {
        Video.play();
        _game.paused = false;
        _graphics.visible = false;;
    }
}

function DrawRect() {
    _graphics = _game.add.graphics(0, 0);
    _graphics.beginFill(0x000000, 0.8);
    _graphics.drawRect(0, 0, _game.width, _game.height);
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
        _instance = this;
        _game = game;
        return _instance;
    },
    preload: function() {
    },
    create: function() {
        DrawPauseButton();
    },
    pause: function() {
        Pause();
    }
}
