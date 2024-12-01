let runApp = true;
let help = false;
let noite = false;

let imgWidth, helpCord, switchCord;


// WINDOW — CANVAS
function canvasCreation() {
    canvas = createCanvas(windowWidth, windowHeight); // actualiza o tamanho da janela caso se diminua ou aumente
    canvas.position(0, 0);

    if (width / height < 1.6) {
        runApp = false
        noite = false
        help = false
    }
    else
        runApp = true
}

function windowResized() {
    for (i = 0; i < zonaMapa.length; i++) {
        zonaMapa[i].ativa = false
        zonaMapa[i].stopSoundsAtNight();
    }

    setup();
}

function preload() {
    loadBackgroundImg();

    backgroundNoite = loadImage('./data/images/highres/night.jpg')
    backgroundHelp = loadImage('./data/images/highres/help.jpg')

    //esta imagem tem de ser substituída!!! — direitos de autor
    imgRotate = loadImage('./data/images/highres/rotScreen.png')

    loadSoundsZonas();
    loadSoundsHelpSwitch();
}

function setup() {
    canvasCreation();

    // funções no no js dos editáveis

    definirImgWidth();
    definirZonas();
    definirHelpSwitch()
}


function draw() {
    imageMode(CENTER)

    if (runApp && !noite) {
        background(255)
        image(imgBackground, width / 2, height / 2, imgWidth, height);

        for (i = 0; i < zonaMapa.length; i++) {
            zonaMapa[i].run();
        }
        //blur img edges
        blurImgEdges()

    } else if (!runApp && !noite && !help) {
        //pedir para rodar o ecrã
        background(255)
        image(imgRotate, width / 2, height / 2, width / 8, width / 8);

    } else if (noite && !runApp) {
        //noite
        background(0)
        image(backgroundNoite, width / 2, height / 2, imgWidth, height);

        for (i = 0; i < zonaMapa.length; i++) {
            zonaMapa[i].ativa = false
            zonaMapa[i].stopSoundsAtNight();
        }
    }

    if (help && !noite) {
        //help – só funciona fora do noite
        image(backgroundHelp, width / 2, height / 2, imgWidth, height);
        blurImgEdges()
    }

    //for debug
    if (debug == true) {
        fill(20, 0, 0, 200)
        rect(helpCord.x, helpCord.y, helpCord.w, helpCord.h);
        rect(switchCord.x, switchCord.y, switchCord.w, switchCord.h);
    }
}

function blurImgEdges() {
    //blur img edges
    if (width / imgWidth > 1.01) {
        noStroke();
        fill(255, 255)

        let blurPx = imgWidth * 0.01
        let blurMargin = 10
        drawingContext.filter = `blur(${blurPx}px)`;

        rect(-blurMargin, -blurMargin, (width - imgWidth) / 2 + blurMargin + imgWidth * 0.01, height + blurMargin * 2)
        rect(width - (width - imgWidth) / 2 - imgWidth * 0.01, -blurMargin, width + blurMargin, height + blurMargin * 2)
        drawingContext.filter = "blur(0px)";
    }
}

function mousePressed() {

    //detetar zonas apenas de dia e fora do help
    if (runApp && !help) {
        for (i = 0; i < zonaMapa.length; i++) {
            if (dist(mouseX, mouseY, zonaMapa[i].x, zonaMapa[i].y) <= zonaMapa[i].raio) {
                zonaMapa[i].ativa = !zonaMapa[i].ativa;

                if (zonaMapa[i].ativa) {
                    //no caso de zonas que são constituídas por blocos (i.e.várias zonas) apenas um bloco pode estar ativo
                    let ativar = condicionantesZonas(i);

                    if (!ativar)
                        zonaMapa[i].playSound();
                    else
                        //no caso de zonas que são constituídas por blocos caso algum bloco já esteja ativo o novo bloco que foi clickado mantém-se off
                        zonaMapa[i].ativa = false;
                }

                else
                    zonaMapa[i].stopSounds();
            }

        }
    }

    //detetar switch apenas fora do help
    if (!help && mouseX > switchCord.x && mouseX < switchCord.x + switchCord.w && mouseY > switchCord.y && mouseY < switchCord.y + switchCord.h) {
        runApp = !runApp
        noite = !noite

        if (runApp)
            somSwitch_on.play();
        else
            somSwitch_off.play();
    }

    //detetar help apenas quando está de dia
    if (runApp && mouseX > helpCord.x && mouseX < helpCord.x + helpCord.w && mouseY > helpCord.y && mouseY < helpCord.y + helpCord.h) {
        help = !help
        somHelp.play();
    }
}

function keyPressed() {
    //fulscreen mais fácil?
    if (key == 'f') {
        let fs = fullscreen();
        fullscreen(!fs);
    }
}