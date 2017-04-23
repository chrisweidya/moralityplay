"use strict";

const Linkable = require('./Linkable');

//Image constructor
var Graphic = function(xPos, yPos) {
    this._xPos = xPos;
    this._yPos = yPos;
}

Graphic.prototype.createOverlayBg = function(game, margin) {
    var offset = 5;
    this._graphic = game.add.graphics(this._xPos, this._yPos);    
    this._graphic.beginFill(0x000000, 0.8);
    this._graphic.drawRect(0, 0, margin, game.height);
    this._graphic.drawRect(game.width-margin, 0, margin, game.height);
    this._graphic.drawRect(margin, 0, game.width-(margin<<1), margin);
    this._graphic.drawRect(margin, game.height-margin, game.width-(margin<<1), margin);
    this._graphic.endFill();
    this._graphic.visible = false;
    game.uiGroup.add(this._graphic);

    this._graphic.inputEnabled = true;   
    this._graphic.input.priorityID = 1;
    this._graphic.input.useHandCursor = true;

    this._link = new Linkable(game, this._graphic.events, game.global.gameManager.getHideDisplayedImageSignal());
    this._link2 = new Linkable(game, this._graphic.events, game.global.gameManager.getHideInfoOverlaySignal());
    this._link.setAsButton(false);
    this._link2.setAsButton(false);
}

Graphic.prototype.drawRect = function(game, x, y, width, height, color, opacity, strokeWidth, lineColor) {
    if(!color)
        color = 0x000000;
    if(!opacity)
        opacity = 1;
    if(!lineColor)
        lineColor = 0x000000;

    this._graphic = game.add.graphics(this._xPos, this._yPos);
    game.uiGroup.add(this._graphic);
    this._graphic.beginFill(color, opacity);
    if(strokeWidth) {
        this._graphic.lineStyle(strokeWidth, lineColor);
    }
    this._graphic.drawRect(x, y, width, height);
    this._graphic.endFill();
    this._graphic.visible = true;
}

Graphic.prototype.setVisible = function(value) {
    this._graphic.visible = value;
}

Graphic.prototype.getGraphic = function() {
    return this._graphic;
}

module.exports = Graphic;
