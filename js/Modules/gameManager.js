"use strict";

const StateManager = require('../States/StateManager'),
    InteractState = require('../States/interactState'),
    LocationState = require('../States/locationState'),
    Icons = require('./iconsLoader'),
    Choices = require('./choiceLoader'),
    Thoughts = require('./thoughtsLoader'),
    Transition = require('./transition'),
    UI = require('./uiLoader'),
    Video = require('./videoLoader');

var _instance = null;
var _game = null;

var GameManager = function() {
    if(_instance === null)
        _instance = this;

    this._changeSceneSignal = null;

    this._fadeInTransitionSignal = null;
    this._fadeOutTransitionSignal = null;

    this._triggerInteractionSignal = null;
    this._endInteractionSignal = null;

    this._createThoughtsSignal = null;
    this._createChoicesSignal = null;
    this._createThoughtsAndChoicesSignal = null;

    this._displayImageSignal = null;

    this._toggleUISignal = null;
    this._pauseSignal = null;
    this._toggleSubtitleSignal = null;

    return _instance;
}

GameManager.prototype.initSignals = function() {
    this._changeSceneSignal = new Phaser.Signal();
    this._changeSceneSignal.add(StateManager.changeScene, this);

    this._fadeInTransitionSignal = new Phaser.Signal();
    this._fadeInTransitionSignal.add(Transition.fadeInTransition, this);
    this._fadeOutTransitionSignal = new Phaser.Signal();
    this._fadeOutTransitionSignal.add(Transition.fadeOutTransition, this);

    this._triggerInteractionSignal = new Phaser.Signal();
    this._triggerInteractionSignal.add(InteractState.createThought, this);
    this._endInteractionSignal = new Phaser.Signal();
    this._endInteractionSignal.add(InteractState.endInteraction, this);

    this._createThoughtsSignal = new Phaser.Signal();
    this._createThoughtsSignal.add(Thoughts.create, this);
    this._createChoicesSignal = new Phaser.Signal();
    this._createChoicesSignal.add(Choices.create, this);

    this._displayImageSignal = new Phaser.Signal();
    this._displayImageSignal.add(LocationState.displayImage, this);

    this._toggleUISignal = new Phaser.Signal();
    this._toggleUISignal.add(UI.toggleUI, this);
    this._pauseSignal = new Phaser.Signal();
    this._pauseSignal.add(UI.pause, this);
    this._toggleSubtitleSignal = new Phaser.Signal();
    this._toggleSubtitleSignal.add(Video.toggleSubtitle, this);

    this._createThoughtsAndChoicesSignal = new Phaser.Signal();
    this._createThoughtsAndChoicesSignal.add(Icons.createThoughtsAndChoices, this);
}

GameManager.prototype.getChangeSceneSignal = function() {
    return this._changeSceneSignal;
}

GameManager.prototype.getFadeInTransitionSignal = function() {
    return this._fadeInTransitionSignal;
}

GameManager.prototype.getFadeOutTransitionSignal = function() {
    return this._fadeOutTransitionSignal;
}

GameManager.prototype.getTriggerInteractionSignal = function() {
    return this._triggerInteractionSignal;
}

GameManager.prototype.getEndInteractionSignal = function() {
    return this._endInteractionSignal;
}

GameManager.prototype.getCreateThoughtsSignal = function() {
    return this._createThoughtsSignal;
}

GameManager.prototype.getCreateChoicesSignal = function() {
    return this._createChoicesSignal;
}

GameManager.prototype.getCreateThoughtsAndChoicesSignal = function() {
    return this._createThoughtsAndChoicesSignal;
}

GameManager.prototype.getDisplayImageSignal = function() {
    return this._displayImageSignal;
}

GameManager.prototype.getToggleUISignal = function() {
    return this._toggleUISignal;
}

GameManager.prototype.getPauseSignal = function() {
    return this._pauseSignal;
}

GameManager.prototype.getToggleSubtitleSignal = function() {
    return this._toggleSubtitleSignal;
}

module.exports = GameManager;
