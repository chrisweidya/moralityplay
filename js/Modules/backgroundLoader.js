/***************************************************************
Creates draggable backgrounds and icons that follow drag movement.
***************************************************************/
"use strict";

//Dependencies
const Text = require('./Text'),
    Image = require('./Image');

var _instance = null;
var _game = null;
var _text = [];
var _choiceFont = null;
var _bgImage = null;
var _iconGroup = null;

const bgImageKeyEnum = 'IMAGE_BACKGROUND';

/***************************************************************
Creates background image.
***************************************************************/
function CreateBgImage(key, draggable) {
    _bgImage = new Image(0, 0, key, bgImageKeyEnum);
    _bgImage.addImageToGame(_game, _game.mediaGroup);
    _bgImage.changeImage(_game, draggable);
}

/***************************************************************
Adds images to group that follows dragged background position.
***************************************************************/
function AddIconsToGroup(icons) {
    _iconGroup = _game.add.group();
    _game.mediaGroup.add(_iconGroup);
    icons.forEach(function(icon) {
        _iconGroup.add(icon.getPhaserImage());
    });
}

/***************************************************************
Initializes drag follow for icon group.
***************************************************************/
function StartDragUpdate() {
    _bgImage.getPhaserImage().events.onDragStart.add(dragStart);
    _bgImage.getPhaserImage().events.onDragUpdate.add(dragUpdate);
    _iconGroup.x = _bgImage.getPhaserImage().x;
    _iconGroup.y = _bgImage.getPhaserImage().y;
}

function dragStart() {
}

/***************************************************************
Icons follow dragged background position every update.
***************************************************************/
function dragUpdate() {
    _iconGroup.x = _bgImage.getPhaserImage().x;
    _iconGroup.y = _bgImage.getPhaserImage().y;
}

function dragStop() {
}

module.exports = {
    init: function(game) {
        //Initialize singleton variables.
        if(_instance !== null)
            return _instance;
        _game = game;
        _instance = this;
        return _instance;
    },
    preload: function() {
    },
    create: function(bgKey, draggable) {
        if(bgKey)
            CreateBgImage(bgKey, draggable);
    },
    attachIconsToBg: function(icons) {
        AddIconsToGroup(group);
        StartDragUpdate();
    }
}
