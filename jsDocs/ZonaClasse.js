class Zona {
    constructor(indexZona, x, y, r) {
        this.indexZona = indexZona;
        this.indexSom = 0


        //mapping da proporção de 16:9 1920x1080 
        this.x = map(x, 0, 1920, width / 2 - imgWidth / 2, width / 2 + imgWidth / 2);
        this.y = map(y, 0, 1080, 0, height);
        this.raio = map(r, 0, 1920, 0, imgWidth);
        this.alpha = 0;
        this.cor;

        this.growCircle = 0
        this.growAmount = this.raio / 70

        this.ativa = false;

        this.clock = 0
        this.checkClock = 0
        this.fadeTime_In = 4
        this.fadeTime_Out = 2
    }


    run() {
        if (this.ativa == true) {
            this.drawCircle();

            //fade in do círculo   
            if (this.alpha < 180) // máximo de transparência
                this.alpha += 3
        }


        //para parar o som após fade out (conforme clock) e fazer fade out do círculo após detetado o parar som
        if (this.ativa == false && sonsMapa[this.indexZona][this.indexSom].isPlaying()) {

            this.clock = millis();
            this.drawCircle();

            if (this.alpha > 0)
                this.alpha -= 3

            if (this.clock - this.checkClock > this.fadeTime_Out * 1000) {
                sonsMapa[this.indexZona][this.indexSom].stop();
                this.alpha = 0;

                //passa para o som seguinte da zona
                this.indexSom++

                if (this.indexSom >= sonsMapa[this.indexZona].length)
                    this.indexSom = 0;
            }
        }


        //for debug 
        if (this.ativa == false && debug == true) {
            fill(20, 0, 0, 200)
            ellipse(this.x, this.y, this.raio * 2)
        }
    }

    drawCircle() {
        this.cor = color(110, 55, 85, this.alpha)

        noStroke();
        fill(this.cor)

        //animação do círculo
        this.growCircle += this.growAmount

        if (this.growCircle > this.raio / 1.5 || this.growCircle < 0)
            this.growAmount *= -1

        ellipse(this.x, this.y, this.raio + this.growCircle + random(-imgWidth / 400, imgWidth / 400))
    }

    playSound() {
        //certifica-se que o volume está a zero antes de começar o fade in
        sonsMapa[this.indexZona][this.indexSom].setVolume(0);

        sonsMapa[this.indexZona][this.indexSom].loop();
        sonsMapa[this.indexZona][this.indexSom].setVolume(1, this.fadeTime_In, 0);
    }

    stopSounds() {
        sonsMapa[this.indexZona][this.indexSom].setVolume(0, this.fadeTime_Out, 0);
        //o som não pára de tocar com o fade out, este millis serve para no run fazer o check do fim do fade
        this.checkClock = millis();
    }

    stopSoundsAtNight() {
        //fadeout mais curto e sem fade do círculo
        sonsMapa[this.indexZona][this.indexSom].setVolume(0, this.fadeTime_Out / 10, 0);
        this.alpha = 0;
    }
}
