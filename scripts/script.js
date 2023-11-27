window.onload = function() {
    fadeOut();
    randomizeHelloMessage();
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

window.addEventListener('pageshow', function (event) {
    if (!event.persisted) {
        return;
    }
    var transition = document.getElementById('transition');
    transition.classList.remove('fade_in');
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

prev_message = "";

function randomizeHelloMessage() {
    messages = ["Hello!", "Hello :3", "Haiii", "Yooooo!"];
    messages.splice(messages.indexOf(prev_message), 1);
    prev_message = messages[Math.floor(Math.random() * messages.length)];
    document.getElementById("hello_text").textContent = prev_message;
}

// Static Navigation Bar
function setDisplayPage(page) {
    setVisibility("page_" + page, ["page_home", "page_gallery", "page_games", "page_links"])

    ids = ["button_home", "button_gallery", "button_games", "button_links"]

    for (i = 0; i < ids.length; i++) {
        let button = document.getElementById(ids[i]);
        if (ids[i] == "button_" + page) button.className = "nav_active";
        else button.className = "nav_inactive";
    }
}