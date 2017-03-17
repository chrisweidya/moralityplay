define(['Modules/Linkable', 'Lib/jsmanipulate.min'], function(Linkable) {
    "use strict";

    var _instance = null;
    var _game = null;
    var _video = null;
    var _videoHTML = null;
    var _bitmapCanvas = null;
    var _bitmapSprite = null;
    var _canvas = null;
    var _context = null;
    var _framebuffer = null;
    var _effect = null;
    var _fadeOutSignal = null;
    const REFRESH_TIME_MS = 10;

    function StartFilterFadeIn() {
        Linkable.fadeIn(_game, _bitmapSprite);
        _video.stop();
    }

    function EndFilter() {
        Linkable.fadeOut(_game, _bitmapSprite, false);
    }

    function CreateVideoFilter(filter) {
        if(filter in JSManipulate) {
            _effect = JSManipulate[filter];
         //   _game.time.reset();
            Render();
        //_game.time.events.repeat(10, 1, render, this);
        }
    };

    function Render() {
        if(!_video.playing)
            return;
        RenderFrame();
        _game.time.events.repeat(REFRESH_TIME_MS, 1, Render, this);
        /*
        setTimeout(function() {
            render();
        }, 10)
        */
    };

    function RenderFrame() {
        if(_bitmapSprite.alpha == 0)
            return;
        _context.drawImage(_videoHTML, 0, 0, _video.width,
            _video.height, 0, 0, _game.width, _game.height);
        var data = _context.getImageData(0, 0, _game.width, _game.height);
        _effect.filter(data, _effect.defaultValues);
        _context.putImageData(data, 0, 0);
        return;
    };

    function stopVideo() {
        if(_video !== null)
            _video.stop();
    }

    return {
        init: function(game, video) {
            console.log("Filter initialized");
            //Initialize and add filter canvas before loading to ensure proper object layering (icons on top of filter canvas) 
            _bitmapCanvas = game.add.bitmapData(game.width, game.height);
            _bitmapSprite = game.add.sprite(0, 0, _bitmapCanvas);
            _bitmapSprite.alpha = 0;
            _context = _bitmapCanvas.context;

            if(_instance !== null) 
                return _instance;

            _video = video;
            _videoHTML = _video.video;
            _instance = this;            
            _game = game;
            _canvas = game.canvas;
            _framebuffer = document.createElement("canvas");
            _framebuffer.width = _game.width;
            _framebuffer.height = _game.height;
            _framebuffer.context = _framebuffer.getContext("2d");
            return _instance;
        },
        create: function(filter) {
            CreateVideoFilter(filter);
        },
        startFilterFade: function() {
            StartFilterFadeIn();
        },
        endFilter: function() {
            EndFilter();
        },
        stop: function() {
            _video.stop();
        }
    }
    return _instance;
});
