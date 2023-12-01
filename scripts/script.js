window.onload = function() {
    fadeOut();
    setSillyMode(isSilly());
};

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) {
        return;
    }
    var fader = document.getElementById('fader');
    fader.classList.remove('fade-in');
});

// Add a fade-in event to all links ('a' elements)
document.addEventListener('DOMContentLoaded', function() {
    if (!window.AnimationEvent) return;

    links = document.getElementsByTagName("a");

    for (i = 0; i < links.length; i++) {
        if (links[i].hostname !== window.location.hostname || links[i].pathname === window.location.pathname) { continue; }

        links[i].addEventListener('click', function(event) {
            var transition = document.getElementById('transition');
            var link = event.currentTarget;

            var listener = function() {
                window.location = link.href;
                transition.removeEventListener('animationend', listener);
            };

            transition.addEventListener('animationend', listener);
            
            event.preventDefault();

            transition.classList.add('fade_in');
        });
    }

});

function fadeOut() { 
    if (!window.AnimationEvent) return;
    document.getElementById("transition").classList.add("fade_out");
}

function scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function setVisibility(tag, ids) {
    for (i = 0; i < ids.length; i++) {
        let element = document.getElementById(ids[i]);
        if (ids[i] === tag) element.style.display = "block"; 
        else element.style.display = "none";
    }
}

function setGallery(section) {
    setVisibility(section, ["images", "favorite_tweets"]);
}

function setGamePage(section) {
    setVisibility(section, ["previous_work", "current_plans"]);
}


// My boyfriend worked on this bit
messages = []
baseMessages = ["Hello!", "Hello :3", "Haiii", "Yooooo!", ":P", ":3", ":]"];            // Specifically this
sillyMessages = ["Meowww :P :3 >_<", "Massive fucking balls"];                          // ...and this
prevIndex = 0;

messages = [].concat(baseMessages);

sillyModeString = "silly";

function isSilly() { return sessionStorage.getItem("silly_mode") == "true"; }
function sillyString() { 
    str = sessionStorage.getItem("silly_string");
    if (str == null) return "";
    return str;
}
function setSillyString(val) { sessionStorage.setItem("silly_string", val); } 

document.addEventListener('keypress', function(event) {
    if (isSilly()) return;
    
    document.title = sillyString();
    if (event.key == sillyModeString[sillyString().length]) setSillyString(sillyString() + event.key);
    else setSillyString("");

    document.getElementById("silly_text").textContent = sillyString().toUpperCase();

    if (sillyString().length == 5) setSillyMode(true);
});

function setSillyMode(val) {
    if (val) {
        messages = messages.concat(sillyMessages);
        sessionStorage.setItem("silly_mode", "true");
    } else {
        setSillyString("");
        messages = [].concat(baseMessages);
        sessionStorage.setItem("silly_mode", "false");
    }

    loadSillyLabel();
}

function loadSillyLabel() {
    document.getElementById("silly_text").textContent = sillyString().toUpperCase();
    pfp = document.getElementById("home_pfp_normal");
    pfp_cat = document.getElementById("home_pfp_cat");

    if (isSilly()) {
        document.getElementById("silly_button").style.display = "block";
        if (pfp != null) pfp.style.display = "none";
        if (pfp_cat != null) pfp_cat.style.display = "block";
    } else {
        document.getElementById("silly_button").style.display = "none";
        if (pfp != null) pfp.style.display = "block";
        if (pfp_cat != null) pfp_cat.style.display = "none";
    }
}

function randomizeHelloMessage() {
    index = Math.floor(Math.random() * (messages.length - 1));
    if (index >= prevIndex) index += 1;
    prevIndex = index;

    document.getElementById("hello_text").textContent = messages[index];
}