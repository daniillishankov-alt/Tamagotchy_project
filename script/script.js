        //stats
const character_image = document.getElementById('character-image');

let honger;
let sleep;
let joy;

let isDead = false;

let decrease_interval;

const hongerBar = document.getElementById('honger-bar');
const sleepBar = document.getElementById('sleep-bar');
const happinessBar = document.getElementById('happiness-bar');

let actionTimeout = null;

let isActionPlaying = false;

        //functions

        function show_values() {
                document.getElementById('honger-value').innerText = honger;
                document.getElementById('sleep-value').innerText = sleep;
                document.getElementById('happiness-value').innerText = joy;

                hongerBar.style.width = honger + "%";
                sleepBar.style.width = sleep + "%";
                happinessBar.style.width = joy + "%";

                setBarColor(hongerBar, honger);
                setBarColor(sleepBar, sleep);
                setBarColor(happinessBar, joy);
        }

        function start_game() {
            honger = 100;
            sleep = 100;
            joy = 100;

            clearInterval(decrease_interval);
            decrease_interval = setInterval(decreasing_values, 1000);
        }

        function decreasing_values(){
            honger = Math.max(0, honger - 2);
            sleep = Math.max(0, sleep - 10);
            joy = Math.max(0, joy - 3);

            show_values();

            if (!isActionPlaying) {
                character_set_status();
            }

            if (honger === 0 || sleep === 0 || joy === 0) {
                character_image.src = "img/character_dead.png";
                character_image.alt = "Pusheen cat ghost";

                honger = 0;
                sleep = 0;
                joy = 0;

                show_values();

                isDead = true;
                clearInterval(decrease_interval);
            }
        }

        function restart_decreasing() {
            clearInterval(decrease_interval);
            decrease_interval = setInterval(decreasing_values, 1500);
        }

        function character_set_status(){
            if(honger >= 75 && sleep >= 75 &&  joy >= 75){
                character_image.src="img/character_happy.png";
                character_image.alt="Happy Pusheen cat";
            }else if(honger >= 35 && joy >= 35 && sleep >= 35){
                character_image.src="img/character_basic.png";
                character_image.alt="Pusheen cat image";
            }else{
                character_image.src="img/character_sad.png";
                character_image.alt="Sad Pusheen cat";
            }
        }

        function setBarColor(bar, value) {
            if (value > 60) bar.style.filter = "brightness(1)";
            else if (value > 30) bar.style.filter = "brightness(0.8)";
            else bar.style.filter = "brightness(0.6)";
        }

        function showAction(imageSrc, altText) {
            clearTimeout(actionTimeout);
            isActionPlaying = true;

            character_image.src = imageSrc;
            character_image.alt = altText;

            actionTimeout = setTimeout(() => {
                isActionPlaying = false;
                character_set_status();
            }, 1500);
        }

        start_game();

        setBarColor(hongerBar, honger);
        setBarColor(sleepBar, sleep);
        setBarColor(happinessBar, joy);

        //buttons actions

document.getElementById('feed-button').addEventListener('click', () => {
    if(!isDead){
        honger = 100;
        show_values();
        showAction("img/character_feed.png", "Pusheen cat eat donut");
        restart_decreasing();
    }
});
document.getElementById('sleep-button').addEventListener('click', () => {
    if (!isDead){
        sleep = 100;
        show_values();
        showAction("img/character_sleep.png", "Pusheen cat sleep");
        restart_decreasing();
    }
});
document.getElementById('happiness-button').addEventListener('click', () => {
    if (!isDead){
        joy = 100;
        show_values();
        showAction("img/character_play.png", "Pusheen cat play");
        restart_decreasing();
    }
});
