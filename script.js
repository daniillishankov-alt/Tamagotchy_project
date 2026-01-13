        //stats

let honger;
let sleep;
let joy;

let isDead = false;

let decrease_interval;

        //functions

        function show_values() {
            document.getElementById('honger-value').innerText = honger;
            document.getElementById('sleep-value').innerText = sleep;
            document.getElementById('happiness-value').innerText = joy;
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

            if(honger === 0 || sleep === 0 || joy === 0){
                document.getElementById("character-image").src="img/character_dead.png";
                document.getElementById("character-image").alt="Pusheen cat ghost";
                document.getElementById("character-image").style.width = "48vh"

                honger = 0;
                sleep = 0;
                joy = 0;

                show_values();

                isDead = true;

                console.log('Your pet is dead');
                clearInterval(decrease_interval);
            }
        }

        function character_set_idol(){
            document.getElementById("character-image").src="img/character_basic.png";
        }

        function restart_decreasing() {
            clearInterval(decrease_interval);
            decrease_interval = setInterval(decreasing_values, 1500);
        }

        start_game();

        //buttons actions

document.getElementById('feed-button').addEventListener('click', () => {
    if(!isDead){
        honger = 100;
        show_values();
        document.getElementById("character-image").src="img/character_feed.png";
        setTimeout(character_set_idol, 1500);
        restart_decreasing();
    }
});
document.getElementById('sleep-button').addEventListener('click', () => {
    if (!isDead){
        sleep = 100;
        show_values();
        document.getElementById("character-image").src = "img/character_sleep.png";
        setTimeout(character_set_idol, 1500);
        restart_decreasing();
    }
});
document.getElementById('happiness-button').addEventListener('click', () => {
    if (!isDead){
        joy = 100;
        show_values();
        document.getElementById("character-image").src = "img/character_play.png";
        setTimeout(character_set_idol, 1500);
        restart_decreasing();
    }
});
