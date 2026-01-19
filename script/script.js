
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
            sleep = Math.max(0, sleep - 10);
            joy = Math.max(0, joy - 3);

            show_values();

            if (!isActionPlaying) {
                character_set_status();
            }

            if (!isDead) {
                if (hunger < low) showChat("I'm starving!");
                else if (hunger < half) showChat("I'm hungry");

                if (sleep < low) showChat("I need to sleep!");
                else if (sleep < half) showChat("I'm sleepy");

                if (joy < low) showChat("Play with me!");
                else if (joy < half) showChat("I want to play!");
            }

            if (hunger === 0 || sleep === 0 || joy === 0) {
                character_image.src = "img/character_dead.png";
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
                character_image.src="img/character_happy.png";
                character_image.alt="Happy Pusheen cat";
            }else if(hunger >= 35 && joy >= 35 && sleep >= 35){
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

        function showChat(message) {
            clearTimeout(chatTimeout);
            chat.textContent = message;
            chat.style.display = "block";

            chatTimeout = setTimeout(() => {
                chat.style.display = "none";
            }, 2000);
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
        hunger = 100;
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
    character_image.src = "img/character_happy.png";
    againButton.style.display = "none";
});