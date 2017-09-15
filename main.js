document.addEventListener("DOMContentLoaded", function(){

    function draw() {

        //zakończenie gry
        if (prawy === 21 || lewy === 21) {
            clearInterval(play);
        }

        //czyścimy obszar canvasu
        c.clearRect(0, 0, 800, 494.44);

        //naliczanie punktów i rozpoczynanie nowej rundy
        if (ballX < 0) {
            ballX = 145;
            ballY = Math.random()*140;
            stepX = -stepX;
            document.getElementById('prawy').innerHTML = ++prawy;
            if (prawy === 10) {
                document.getElementById('prawy').style.left = '685px';
            }
            if (znakY <= 0.5) {
                stepY = -stepY
            }
        } else if(ballX >= 300-10){
            ballX = 145;
            ballY = Math.random()*140;
            stepX = -stepX;
            document.getElementById('lewy').innerHTML = ++lewy;
            if (znakY <= 0.5) {
                stepY = -stepY
            }
        }

        //odbicie od krawędzi
        if (ballY < 0 || ballY >= 150-10) {
            stepY = -stepY;
        }
        
        //do x i y gwiazdki dodajemy przesuniecie
        ballX += stepX;
        ballY += stepY;

        //rysujemy gwiazdkę w nowym miejscu
        c.fillRect(ballX, ballY, 10, 10);

        //linia środkowa
        for (var i = 0; i < 494.44;) {
            c.fillRect(middle, i, 4, 10);
            i += 20;
        }
    }

    //punkty
    var lewy = 0;
    var prawy = 0;
        
    //x i y piłki
    var middle = 148;
    var ballX = 145;
    var ballY = 75;

    //przemieszczenie piłki
    var stepX = 1;
    var stepY = 1;
    var znakY = Math.random();
    if (znakY <= 0.5) {
        stepY = -stepY
    }
    var znakX = Math.random();
    if (znakX <= 0.5) {
        stepX = -stepX
    }

    var table = document.getElementById('table');
    var c = table.getContext('2d');
    c.fillStyle = "#ffffff";

    var play = setInterval(draw, 10);
});