window.onload = function() {
    fadeOut();
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
messages = ["Hello!", "Hello :3", "Haiii", "Yooooo!", ":P", ":3", ":]"];        // Specifically this
sillyMessages = ["Meowww :P :3 >_<"]                                            // ...and this
prevIndex = 0;

sillyMode = false;
sillyModeString = "silly";
currInput = "";

document.addEventListener('keypress', function(event) {
    if (sillyMode) return;
    
    if (event.key == sillyModeString[currInput.length]) currInput += event.key;
    else currInput = "";

    if (currInput.length == 5) activateSillyMode();
});

function activateSillyMode() {
    sillyMode = true;
    messages = messages.concat(sillyMessages);
}

function randomizeHelloMessage() {
    index = Math.floor(Math.random() * (messages.length - 1));
    if (index >= prevIndex) index += 1;
    prevIndex = index;

    document.getElementById("hello_text").textContent = messages[index];;
}