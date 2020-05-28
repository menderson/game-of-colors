    var gameOn = true;
    var score = 0;
    var time = 12;
    document.getElementById("rule").innerHTML = "Clique no circulo com a cor diferente antes que o tempo acabe";
    diferentColorId = getRandom(1, 10);
    changeColor(diferentColorId);

    function getRandom(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    };

    function changeColor(id) {
      var button1 = document.getElementById('1');
      var button2 = document.getElementById('2');
      var button3 = document.getElementById('3');
      var button4 = document.getElementById('4');
      var button5 = document.getElementById('5');
      var button6 = document.getElementById('6');
      var button7 = document.getElementById('7');
      var button8 = document.getElementById('8');
      var button9 = document.getElementById('9');
      var red = getRandom(0, 255);
      var green = getRandom(0, 255);
      var blue = getRandom(0, 255);
      button1.style.background = "rgb(" + red + "," + green + "," + blue + ")";
      button2.style.background = "rgb(" + red + "," + green + "," + blue + ")";
      button3.style.background = "rgb(" + red + "," + green + "," + blue + ")";
      button4.style.background = "rgb(" + red + "," + green + "," + blue + ")";
      button5.style.background = "rgb(" + red + "," + green + "," + blue + ")";
      button6.style.background = "rgb(" + red + "," + green + "," + blue + ")";
      button7.style.background = "rgb(" + red + "," + green + "," + blue + ")";
      button8.style.background = "rgb(" + red + "," + green + "," + blue + ")";
      button9.style.background = "rgb(" + red + "," + green + "," + blue + ")";
      var diferentButton = document.getElementById(id);
      red = red + (50 - score);
      green = green + (50 - score);
      blue = blue + (50 - score);
      diferentButton.style.background = "rgb(" + red + "," + green + "," + blue + ")";
    };

    function changeId() {
      diferentColorId = getRandom(1, 10);
      return diferentColorId;
    }

    function verifyId(id) {
      if (diferentColorId === id && gameOn==true) {
        score++;
        document.getElementById("score").innerHTML = "Pontuação: "+score;
        if (time < 6) {
          time += 6;
          document.getElementById("time").innerHTML = "Tempo: " + time;
        }
        else {
          time = 12;
          document.getElementById("time").innerHTML = "Tempo: " + time;
        }
        id = changeId();
        changeColor(id);
      } else {
        if (time > 5) time -= 5;
        else {
            gameOn = false;
          time = 0;
          document.getElementById("rule").innerHTML = "Fim de Jogo";
        }
        document.getElementById("time").innerHTML = "Tempo: " + time;
      }
    };

    setInterval(function () {
      if (time > 0) {
        time--;
        document.getElementById("time").innerHTML = "Tempo: " + time;
      }
      else {
          gameOn = false;
        score = 0;
        document.getElementById("rule").innerHTML = "Fim de Jogo";
        
      }
    }, 1000);