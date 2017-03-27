"use strict";

const Text = require('./Text');

var _instance = null;
var _game = null;
var _textSlots = [null, null];

const SUBTITLE_Y_POS = 650;
const SUBTITLE_SPACING = 5;

function CreateSubs(video, subs) {
	var srt = _game.cache.getText(subs);
	var parsedSrt = fromSrt(srt, true);
	console.log(parsedSrt);
	AddSubEvents(parsedSrt, video);
}

function AddSubEvents(parsedSrt, video) {
	parsedSrt.forEach(function(sub) {
		//console.log(sub.startTime);
		video.addEventListener("timeupdate", show, false);

		function show() {
			if(video.currentTime >= sub.startTime){
           		video.removeEventListener("timeupdate", show);
	            var text = new Text(sub.text, 0, -500, _game.global.style.subtitleTextProperties);
	            text.addToGame(_game, _game.mediaGroup);
	            text.changeText(_game, 'TEXT_SUBTITLE');	            
	            var slotIndex = FindSubtitleSlot(text);
	            AddDestroyEvent(video, sub, text, slotIndex);
	            //console.log("added sub");
	        }
		}		
	});
}

function AddDestroyEvent(video, sub, text, slotIndex) {
	video.addEventListener("timeupdate", destroy, false);

	function destroy() {
		if(video.currentTime >= sub.endTime){
       		video.removeEventListener("timeupdate", destroy); 
            text.destroy();
            _textSlots[slotIndex] = null;
            //console.log("destroyed sub");
        }
	}
}

function FindSubtitleSlot(text) {
	if(!_textSlots[0]) {
		_textSlots[0] = text;
		text.setY(SUBTITLE_Y_POS);
		return 0;
	}
	else if(!_textSlots[1]) {
		_textSlots[1] = text;

		text.setY(SUBTITLE_Y_POS - text.getHeight() - SUBTITLE_SPACING);
		return 1;
	}
	else
		console.warn("Max number of concurrent subtitles reached.");
}

function createSubText() {

}

function fromSrt(data, ms) {
    var useMs = ms ? true : false;

    data = data.replace(/\r/g, '');
    var regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
    data = data.split(regex);
    data.shift();

    var items = [];
    for (var i = 0; i < data.length; i += 4) {
        items.push({
            id: data[i].trim(),
            startTime: useMs ? timeMs(data[i + 1].trim()) : data[i + 1].trim(),
            endTime: useMs ? timeMs(data[i + 2].trim()) : data[i + 2].trim(),
            text: data[i + 3].trim()
        });
    }

    return items;
};

function timeMs(val) {
    var regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
    var parts = regex.exec(val);

    if (parts === null) {
        return 0;
    }

    for (var i = 1; i < 5; i++) {
        parts[i] = parseInt(parts[i], 10);
        if (isNaN(parts[i])) parts[i] = 0;
    }

    // hours + minutes + seconds + ms
    return parts[1] * 3600 + parts[2] * 60 + parts[3] + parts[4]/1000;
};


module.exports = {
	init: function (game) {
		if(_instance)
			return _instace;
		_instance = this;
		_game = game;
		return _instance;
	},
	create: function(video, subs) {
		CreateSubs(video, subs);
	}
}