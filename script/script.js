
                                               /////////////////////////
                                             //   *   variables   *   //
                                             /////////////////////////

const character_image = document.getElementById('character-image');
const hungerBar = document.getElementById('hunger-bar');
const sleepBar = document.getElementById('sleep-bar');
const happinessBar = document.getElementById('happiness-bar');
const bgm = document.getElementById('bgm');
const musicButton = document.getElementById('music-button');
const chat = document.getElementById('chat');
const againButton = document.getElementById('again-button');
const emotions = [
    "img/character_basic.png",
    "img/character_happy.png",
    "img/character_sad.png",
    "img/character_dead.png",
    "img/character_feed.png",
    "img/character_sleep.png",
    "img/character_play.png"
];
const thoughts = [
    "I'm starving!",
    "I'm hungry",
    "I need to sleep!",
    "I'm sleepy",
    "Play with me!",
    "I want to play!"
];
const reactions = [
    "Nom-nom-nom",
    "Z-z-Z",
    "Yuppie"
];

let hunger;
let sleep;
let joy;

let isDead = false;
let isActionPlaying = false;
let isMusicPlaying = false;

let decrease_interval;

let actionTimeout = null;
let chatTimeout = null;

const half = 50;
const low = 30;

                                           ///////////////////////////
                                         //    -   functions   -    //
                                         ///////////////////////////

        function show_values() {
                document.getElementById('hunger-value').innerText = hunger;
                document.getElementById('sleep-value').innerText = sleep;
                document.getElementById('happiness-value').innerText = joy;

                hungerBar.style.width = hunger + "%";
                sleepBar.style.width = sleep + "%";
                happinessBar.style.width = joy + "%";

                setBarColor(hungerBar, hunger);
                setBarColor(sleepBar, sleep);
                setBarColor(happinessBar, joy);
        }

        function start_game() {
            hunger = 100;
            sleep = 100;
            joy = 100;

            show_values();

            isDead = false;

            clearInterval(decrease_interval);
            decrease_interval = setInterval(decreasing_values, 1000);
        }

        function decreasing_values(){
            hunger = Math.max(0, hunger - 2);
            sleep = Math.max(0, sleep - 1);
            joy = Math.max(0, joy - 3);

            show_values();

            if (!isActionPlaying) {
                character_set_status();
            }

            if (!isDead) {
                if (hunger < low) showChat(reactions[0]);
                else if (hunger < half) showChat(reactions[1]);

                if (sleep < low) showChat(reactions[2]);
                else if (sleep < half) showChat(reactions[3]);

                if (joy < low) showChat(reactions[4]);
                else if (joy < half) showChat(reactions[5]);
            }

            if (hunger === 0 || sleep === 0 || joy === 0) {
                character_image.src = emotions[3];
                character_image.alt = "Pusheen cat ghost";
                chat.style.display = "none";
                againButton.style.display = "block";

                hunger = 0;
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
            if(hunger >= 75 && sleep >= 75 &&  joy >= 75){
                character_image.src=emotions[1];
                character_image.alt="Happy Pusheen cat";
            }else if(hunger >= 35 && joy >= 35 && sleep >= 35){
                character_image.src=emotions[0];
                character_image.alt="Pusheen cat image";
            }else{
                character_image.src=emotions[2];
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

        function showChat(message) {
            clearTimeout(chatTimeout);
            chat.textContent = message;
            chat.style.display = "block";

            chatTimeout = setTimeout(() => {
                chat.style.display = "none";
            }, 1500);
        }


                                             //----------------//
                                          //   functions call   //
                                           //----------------//

        start_game();

        setBarColor(hungerBar, hunger);
        setBarColor(sleepBar, sleep);
        setBarColor(happinessBar, joy);

                                      ////////////////////////////////
                                    //     >  buttons logica  <     //
                                    ////////////////////////////////
                                              //
                                             //-------------
                                            // stats buttons
                                           //---------------
                                          //
                                      //~~~~//

document.getElementById('feed-button').addEventListener('click', () => {
    if(!isDead){
        hunger = Math.min(100, hunger + 20);
        show_values();
        showAction(emotions[4], "Pusheen cat eat donut");
        showChat(reactions[0]);
        restart_decreasing();
    }
});

document.getElementById('sleep-button').addEventListener('click', () => {
    if (!isDead){
        sleep = 100;
        show_values();
        showAction(emotions[5], "Pusheen cat sleep");
        showChat(reactions[1]);
        restart_decreasing();
    }
});

document.getElementById('happiness-button').addEventListener('click', () => {
    if (!isDead){
        joy = Math.min(100, joy + 15);
        sleep = Math.max(0, sleep - 25);
        show_values();
        showAction(emotions[6], "Pusheen cat play");
        showChat(reactions[2]);
        restart_decreasing();
    }
});

                                             //~~~~//
                                               //
                                              //------------
                                             // music button
                                            //--------------
                                           //
                                       //~~~~//

musicButton.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgm.pause();
        musicButton.textContent = 'Music: OFF';
        musicButton.classList.remove('music-on');
    } else {
        bgm.play();
        musicButton.textContent = 'Music: ON';
        musicButton.classList.add('music-on');
    }
    isMusicPlaying = !isMusicPlaying;
});

                                               //~~~~//
                                                 //
                                                //----------------
                                               // Try again button
                                              //------------------
                                             //
                                         //~~~~//

againButton.addEventListener('click', () =>{
    start_game();
    character_image.src = emotions[1];
    againButton.style.display = "none";
});