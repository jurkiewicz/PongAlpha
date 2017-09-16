document.addEventListener("DOMContentLoaded", function(){

    var key = [];

    onkeydown = onkeyup = function (e){
        var e = e || event;
        key[e.keyCode] = e.type == 'keydown';
    }

    function draw() {

        //czyścimy obszar canvasu
        c.clearRect(0, 0, 800, 494.44);

        //naliczanie punktów i rozpoczynanie nowej rundy
        if (ballX + 10 < 0) {
            ballX = 151;
            ballY = Math.random()*140;
            stepX = 0.1;
            stepY = 0.1;
            znakY = Math.random();
            document.getElementById('prawy').innerHTML = ++prawy;
            if (prawy === 10) {
                document.getElementById('prawy').style.left = '685px';
            }
            if (znakY <= 0.5) {
                stepY = -stepY
            }
        } else if(ballX >= 300){
            ballX = 138.5;
            ballY = Math.random()*140;
            stepX = -0.1;
            stepY = 0.1;
            var znakY = Math.random();
            document.getElementById('lewy').innerHTML = ++lewy;
            if (znakY <= 0.5) {
                stepY = -stepY
            }
        }

        //rysujemy piłkę w nowym miejscu
        c.fillRect(ballX, ballY, 10, 10);

        //odbicie od krawędzi
        if (ballY < 0 || ballY >= 150-10) {
            stepY = -stepY;
        }

        for(i = 0; i < key.length; i ++){
            if(key[i]){
                switch (i) {
                    case 65: // a
                        LP = -0.5;
                        console.log(key[i]);
                    break;
                 
                    case 90: // z
                        LP = 0.5;
                        console.log(key[i]);
                    break;
                 
                    case 75: // k
                        RP = -0.5;
                        console.log(key[i]);
                    break;
                 
                    case 77: // m
                        RP = 0.5;
                        console.log(key[i]);
                    break;
                }
            }
        }

        //odbicie od paletki
        if (ballX <= 34 && ballX >= 33 && ((ballY + 10 >= LY || ballY >= LY) && (ballY <= LY + 20 || ballY + 10 <= LY + 20))) {
            stepX -= 0.05;
            if (stepY < 0) {
                stepY -= 0.05;
            } else {
                stepY += 0.05;
            }
            stepX = -stepX;
        }
        if (ballX + 10 >= 266 && ballX + 10 <= 267 && ((ballY + 10 >= RY || ballY >= RY) && (ballY <= RY + 20 || ballY + 10 <= RY + 20))) {
            stepX += 0.05;
            if (stepY < 0) {
                stepY -= 0.05;
            } else {
                stepY += 0.05;
            }
            stepX = -stepX;
        }
        
        //do x i y piłki dodajemy przesuniecie
        ballX += stepX;
        ballY += stepY;

        //przesunięcie paletek
        if (LY <= 0 && LP == -0.5) {
            LP = 0;
            LY = 0;
        } else if (LY >= 130 && LP == 0.5) {
            LP = 0;
            LY = 130;
        } else {
            LY += LP;
            LP = 0;
        }
        if (RY <= 0 && RP == -0.5) {
            RP = 0;
            RY = 0;
        } else if (RY >= 130 && RP == 0.5) {
            RP = 0;
            RY = 130;
        } else {
            RY += RP;
            RP = 0;
        }

        //Komputer
        // RY = ballY-5;

        //rysowanie paletek
        c.fillRect(30, LY, 4, 20);
        c.fillRect(266, RY, 4, 20);

        //linia środkowa
        for (var i = 0; i < 494.44;) {
            c.fillRect(middle, i, 4, 10);
            i += 20;
        }

        //zakończenie gry
        if (prawy === 21) {
            clearInterval(play);
            c.clearRect(0, 0, 800, 494.44);
            body.style.cursor = 'default';
            end.style.visibility = 'visible';
            end.innerHTML = 'Wygrał gracz z prawej!'
            end.addEventListener('click', function(){
                location.reload();
            });
        } else if (lewy === 21) {
            clearInterval(play);
            c.clearRect(0, 0, 800, 494.44);
            body.style.cursor = 'default';
            end.style.visibility = 'visible';
            end.innerHTML = 'Wygrał gracz z lewej!'
            end.addEventListener('click', function(){
                location.reload();
            });
        }
    }

    //punkty
    var lewy = 0;
    var prawy = 0;

    //paletki
    var i;
    var LY = 65;
    var RY = 65;
    var LP = 0;
    var RP = 0;
        
    //x i y piłki
    var middle = 148;
    var ballX = 145;
    var ballY = 75;

    //przemieszczenie piłki i losowanie na początku gry
    var stepX = 0.1;
    var stepY = 0.1;
    var znakY = Math.random();
    if (znakY <= 0.5) {
        stepY = -stepY
    }
    var znakX = Math.random();
    if (znakX <= 0.5) {
        stepX = -stepX
    }

    var body = document.getElementsByTagName('body')[0];

    var end = document.getElementById('end');


    var table = document.getElementById('table');
    var c = table.getContext('2d');
    c.fillStyle = "#ffffff";

    var play;
    
    body.addEventListener('click', function x(){
        document.getElementById('menu').style.visibility = 'hidden';
        body.style.cursor = 'none';
        play = setInterval(draw, 1);
        body.removeEventListener('click', x);
    });
});