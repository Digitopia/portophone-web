// PARA DEBUG E CRIAçÃO DAS ZONAS: colocar true para definir zonas, colocar false para correr
let debug = false;
// let debug = true;

let somHelp, somSwitch_on, somSwitch_off;


let zonasNum = 10 // EDITÁVEL: numero de zonas a usar

let zonaMapa = new Array(zonasNum);
let sonsMapa = new Array(zonaMapa.length);

function definirImgWidth() {
    // resolução padrão da imagem
    imgWidth = height * (2048 / 1536)
}

function loadBackgroundImg() {
    //EDITÁVEL: path da imagem que corresponde ao mapa
    imgBackground = loadImage('./data/images/highres/day.jpg');
}

function loadSoundsZonas() {
    // inicia 2d array para os sons
    for (let i = 0; i < zonaMapa.length; i++) {
        sonsMapa[i] = [];
    }

    /* EDITÁVEL: sons para cada zona. Mudar:
    - o path do ficheiro
    - o numero da zona no 1º index da array 
    - e número máximo de sons para a zona: i < numero máximo de sons da zona 
    !! nota: o i +1 no path é porque os ficheiros começam no _1 e não no _0 */

    //sons da zona 0 
    for (let i = 0; i < 3; i++) {
        sonsMapa[0][i] = loadSound(`./data/sounds/batalha/batalha_${i + 1}.mp3`)
    }

    //sons da zona 1
    for (let i = 0; i < 3; i++) {
        sonsMapa[1][i] = loadSound(`./data/sounds/bolhao/bolhao_${i + 1}.mp3`)
    }

    //sons da zona 2
    for (let i = 0; i < 3; i++) {
        sonsMapa[2][i] = loadSound(`./data/sounds/casa_musica/casa_musica_${i + 1}.mp3`)
    }

    //sons da zona 3
    for (let i = 0; i < 3; i++) {
        sonsMapa[3][i] = loadSound(`./data/sounds/metro/metro_${i + 1}.mp3`)
    }

    //sons da zona 4
    for (let i = 0; i < 3; i++) {
        sonsMapa[4][i] = loadSound(`./data/sounds/parque_cidade/parque_cidade_${i + 1}.mp3`)
    }

    //sons da zona 5 — ribeira bloco 1
    for (let i = 0; i < 3; i++) {
        sonsMapa[5][i] = loadSound(`./data/sounds/ribeira/ribeira_${i + 1}.mp3`)
    }

    //sons da zona 6 — ribeira bloco 2
    for (let i = 0; i < 3; i++) {
        sonsMapa[6][i] = loadSound(`./data/sounds/ribeira/ribeira_${i + 1}.mp3`)
    }

    //sons da zona 7 — ribeira bloco 3
    for (let i = 0; i < 3; i++) {
        sonsMapa[7][i] = loadSound(`./data/sounds/ribeira/ribeira_${i + 1}.mp3`)
    }

    //sons da zona 8
    for (let i = 0; i < 3; i++) {
        sonsMapa[8][i] = loadSound(`./data/sounds/santa_catarina/santa_catarina_${i + 1}.mp3`)
    }

    //sons da zona 9
    for (let i = 0; i < 2; i++) {
        sonsMapa[9][i] = loadSound(`./data/sounds/serralves/serralves_${i + 1}.mp3`)
    }

}

function definirZonas() {
    /* EDITÁVEL: coordenadas das zonas
    zonaMapa[0] = new Zona(index_zona, x, y, raio)
    nas coordenadas: 
        valores no x: 0 - 1920; 
        valores no y: 0 - 1080; 
        valores no raio: 0 - 1920, pq varia conforme width
    ou seja, vai ser feito mapping da proporção de 16:9 1920x1080 para o tamanho real */

    //BATALHA
    zonaMapa[0] = new Zona(0, 1500, 790, 250)

    //BOLHAO
    zonaMapa[1] = new Zona(1, 880, 200, 150)

    //CASA DA MUSICA
    zonaMapa[2] = new Zona(2, 1625, 150, 150)

    //METRO
    zonaMapa[3] = new Zona(3, 170, 200, 100)

    //PARQUE DA CIDADE
    zonaMapa[4] = new Zona(4, 520, 600, 280)

    //RIBEIRA — bloco 1
    zonaMapa[5] = new Zona(5, 0, 470, 230)

    //RIBEIRA — bloco 2
    zonaMapa[6] = new Zona(6, 0, 810, 230)

    //RIBEIRA — bloco 3
    zonaMapa[7] = new Zona(7, 220, 1080, 210)

    //SANTA CATARINA
    zonaMapa[8] = new Zona(8, 1330, 320, 180)

    //SERRALVES
    zonaMapa[9] = new Zona(9, 820, 920, 200)
}

function condicionantesZonas(zonaIndex) {

    /* EDITÁVEL: condições para zonas que são constituídas por blocos i.e., várias zonas
       
    if (zonaIndex == 1º bloco da zona — index dessa zona) {
        if (zonaMapa[2º bloco — index dessa zona].ativa == true || zonaMapa[3º bloco — index dessa zona].ativa == true) {
            condicionante = true;
        }
        else
            condicionante = false;
    }

    !!! de seguida é preciso fazer isto com "else if" para todos os blocos da zona

    */

    // a variável condicionante começa como falsa e depois altera o seu valor caso a zona em questão esteja proposta para condicionantes
    let condicionante = false;

    // BLOCO DE ZONAS RIBEIRA
    if (zonaIndex == 5) {
        if (zonaMapa[6].ativa == true || zonaMapa[7].ativa == true) {
            condicionante = true;
        }
        else
            condicionante = false;
    } else if (zonaIndex == 6) {
        if (zonaMapa[5].ativa == true || zonaMapa[7].ativa == true) {
            condicionante = true;
        }
        else
            condicionante = false;
    } else if (zonaIndex == 7) {
        if (zonaMapa[5].ativa == true || zonaMapa[6].ativa == true) {
            condicionante = true;
        }
        else
            condicionante = false;
    }

    return condicionante;
}

function definirHelpSwitch() {
    //EDITÁVEL: zona do help e do switch: mapping da proporção de 16:9 1920x1080
    helpCord = {
        x: map(1720, 0, 1920, width / 2 - imgWidth / 2, width / 2 + imgWidth / 2),
        y: map(450, 0, 1080, 0, height),
        w: map(100, 0, 1920, 0, imgWidth),
        h: map(125, 0, 1080, 0, height)
    }

    switchCord = {
        x: map(1740, 0, 1920, width / 2 - imgWidth / 2, width / 2 + imgWidth / 2),
        y: map(895, 0, 1080, 0, height),
        w: map(100, 0, 1920, 0, imgWidth),
        h: map(115, 0, 1080, 0, height)
    }
}

function loadSoundsHelpSwitch() {
    //EDITÁVEL: caminhos dos sons do help e do switch
    somHelp = loadSound(`./data/sounds/others/help.wav`)
    somSwitch_on = loadSound(`./data/sounds/others/switch_on.wav`)
    somSwitch_off = loadSound(`./data/sounds/others/switch_off.wav`)
}