var ballCount = 30;

var gnd = document.querySelector('.playground');
var res = document.querySelector('.result');

var lamps = [];
var started = false;
var ballCurrent = 0;
var ballWin = 0;

var timeout;
var delayDefault = 250;
var delay = 250;

function init(){

    for(var i=0; i<ballCount; i++){
        var angle = 360 / ballCount * i;
        var lamp = document.createElement('div');
            lamp.className = 'lamp';
            lamp.style.transform = 'rotate('+angle+'deg)';
            gnd.appendChild(lamp);
            lamps.push(lamp);
    }    

    document.addEventListener('keydown',function(){
        (started) ? stop() : start();
    });
    
}

function start(){
    console.log('start');
    timeout = setInterval(loop,delay);
    started = true;
    // set win ball
    ballWin = Math.floor(Math.random() * ballCount);
    for(var lamp of lamps) lamp.classList.remove('win');
    lamps[ballWin].classList.add('win');
    // reset playground
    gnd.className = "playground";
    // console.log('win',ballWin);
}
function stop(){
    console.log('stop');
    clearTimeout(timeout);
    if(ballCurrent == ballWin){
        gnd.classList.add("win");
        delay /= 1.5;
        console.info("delay "+delay+" OK");
    }else{
        gnd.classList.add("red");
        delay = delayDefault;
        console.info("delay "+delay+" Fail");
    }
    started = false;
}
function loop(){
    // off
    lamps[ballCurrent].classList.remove('red');
    // up
    ballCurrent++;if(ballCurrent >= ballCount) ballCurrent=0;
    // on
    lamps[ballCurrent].classList.add('red');
}

init();