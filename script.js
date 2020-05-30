var matrixOfCircles = document.querySelector('#app');
var ranking = document.querySelector('#ranking');
var inputElement = document.querySelector('#app input');
//var addName = document.querySelector('#sendButton')
var interval;
var level = 2;
var numberOfCircles;
var idCircleWithDiferentColor;
var gameOn;
var score;
var time;
var red, green, blue;
var record = 0;

start();

function start() {
    if(localStorage.getItem('record')!=null) record = localStorage.getItem('record');
    document.getElementById("record").innerHTML = "Recorde " + record;
    document.getElementById("rule").innerHTML = "Clique no circulo com a cor diferente";
    matrixOfCircles.innerHTML = '';
    var restart = document.createElement('button');
    restart.setAttribute('class', 'start');
    var textButton = document.createTextNode("Jogar");
    restart.appendChild(textButton);
    restart.setAttribute('onclick', 'play()');
    matrixOfCircles.appendChild(restart);
}

function play() {
    gameOn = true;
    score = 0;
    time = 12;
    numberOfCircles = 4;
    renderCircles();
    changeColor();
    interval = setInterval(callback, 1000);
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function generateColor() {
    red = getRandom(0, 255);
    green = getRandom(0, 255);
    blue = getRandom(0, 255);
}

function changeColor() {
    generateColor();
    for (i = 1; i <= numberOfCircles; i++) {
        document.getElementById(i).style.background = "rgb(" + red + "," + green + "," + blue + ")";
    }
    generateAproximateColor();
    document.getElementById(changeId()).style.background = "rgb(" + red + "," + green + "," + blue + ")";
};

function changeId() {
    idCircleWithDiferentColor = getRandom(1, (numberOfCircles + 1));
    return idCircleWithDiferentColor;
}

function updateScore() {
    score++;
    updateRecord();
    if (score % 10 === 0) {
        levelUp();
    }
    document.getElementById("score").innerHTML = "Pontuação: " + score;
}

function saveRecordToStorage(){
    localStorage.setItem('record', record); //salva no localStorage do navegador
}

function levelUp() {
    if (level < 6) {
        level++;
        numberOfCircles = level * level;
        renderCircles();
    }
}

function updateTime() {
    if (time < 6) time += 6;
    else time = 12;
    document.getElementById("time").innerHTML = "Tempo: " + time;
}

function decreaseTime() {
    if (time > 5) time -= 5;
    else endGame();
    document.getElementById("time").innerHTML = "Tempo: " + time;
}

function endGame() {
    gameOn = false;
    time = 0;
    clearInterval(interval)
    document.getElementById("rule").innerHTML = "Fim de Jogo";
    //askname();
    matrixOfCircles.innerHTML = '';
    var restart = document.createElement('button');
    restart.setAttribute('class', 'restart');
    var textButton = document.createTextNode("Jogar Novamente");
    restart.appendChild(textButton);
    restart.setAttribute('onclick', 'restart()');
    matrixOfCircles.appendChild(restart);
    score = 0;
}

function updateRecord() {
    if (score > record) {
        record = score;
        saveRecordToStorage();
        document.getElementById("record").innerHTML = "Recorde " + record;
    }
}

function askname() {
    matrixOfCircles.innerHTML = '';
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Digite seu nome para aparecer no ranking');
    input.setAttribute('class', 'input-name');
    matrixOfCircles.appendChild(input);
    var button = document.createElement('button');
    var textButton = document.createTextNode("Enviar");
    button.setAttribute('onclick', 'addName()');
    button.setAttribute('class', 'send-button');
    button.setAttribute('id', 'sendButton');
    button.appendChild(textButton);
    matrixOfCircles.appendChild(button);
}

function addName() {
    var inputElement = document.querySelector('#app input');
    var name = inputElement.value;
    if (name == "") {
        name = "Sem Nome";
    }
    names.push(name);
    matrixOfCircles.innerHTML = '';
    var restart = document.createElement('button');
    restart.setAttribute('class', 'restart');
    var textButton = document.createTextNode("Jogar Novamente");
    restart.appendChild(textButton);
    restart.setAttribute('onclick', 'restart()');
    matrixOfCircles.appendChild(restart);
}

function restart() {
    interval = setInterval(callback, 1000);
    level = 2;
    numberOfCircles = 4;
    idCircleWithDiferentColor;
    gameOn = true;
    score = 0;
    time = 12;
    document.getElementById("rule").innerHTML = "Clique no circulo com a cor diferente";
    renderCircles();
    changeColor();
    document.getElementById("score").innerHTML = "Pontuação: " + score;
}

function verifyId(idSelectedCircle) {
    if (idCircleWithDiferentColor === idSelectedCircle && gameOn == true) {
        updateScore();
        updateTime();
        changeColor(changeId());
    } else if (gameOn == true) decreaseTime();
};

function callback() {
    if (time > 0) {
        time--;
        document.getElementById("time").innerHTML = "Tempo: " + time;
    }
    else endGame();
}

function renderCircles() {
    matrixOfCircles.innerHTML = '';
    var circlerPerLine = Math.sqrt(numberOfCircles);
    var id = 0;
    for (i = 1; i <= circlerPerLine; i++) {
        var lineOfCircle = document.createElement('tr')
        for (j = 1; j <= circlerPerLine; j++) {
            id++;
            var circleElement = document.createElement('td');
            var circleButton = document.createElement('button')
            circleButton.setAttribute('id', id)
            circleButton.setAttribute('onclick', 'verifyId(' + id + ')')
            circleElement.appendChild(circleButton);
            lineOfCircle.appendChild(circleElement);
        }
        matrixOfCircles.appendChild(lineOfCircle);
    }
}

function generateAproximateColor() {
    if (level == 2) {
        red = red + (50 - score)
        green = green + (50 - score);
        blue = blue + (50 - score);
    }
    else {
        if (level == 3) {
            if (getRandom(0, 2) == 1) red = red + getRandom(25, 35);
            else red = red - getRandom(25, 35);

            if (getRandom(0, 2) == 1) green = green + getRandom(25, 35);
            else green = green - getRandom(25, 35);

            if (getRandom(0, 2) == 1) blue = blue + getRandom(25, 35);
            else blue = blue - getRandom(25, 35);
        }
        else {
            if (level == 4) {
                if (getRandom(0, 2) == 1) red = red + getRandom(15, 22);
                else red = red - getRandom(15, 22);

                if (getRandom(0, 2) == 1) green = green + getRandom(15, 22);
                else green = green - getRandom(15, 22);

                if (getRandom(0, 2) == 1) blue = blue + getRandom(15, 22);
                else blue = blue - getRandom(15, 22);
            }
            else {
                if (getRandom(0, 2) == 1) red = red + getRandom(5, 15);
                else red = red - getRandom(5, 15);

                if (getRandom(0, 2) == 1) green = green + getRandom(5, 15);
                else green = green - getRandom(5, 15);

                if (getRandom(0, 2) == 1) blue = blue + getRandom(5, 15);
                else blue = blue - getRandom(5, 15);
            }
        }
    }
}
