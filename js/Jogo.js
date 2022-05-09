var segundos = 0;
function segundo(){
    segundos++;
}

var contador = 0;
var lines = [];
var j = 0; 
var um = false;
var dois = false; 
var tres = false; 
var quatro = false; 
var timer;
var score = 0; 
var textScore;
var pause = false; 
var level = 1; 
var sim;
var nao;
var info;
var f1 = false; 
var f2 = false; 
var muda = false; 
var armazenado = 0;
var aux = false; 
var aceita = false; 
var vidas = 3; 
var contador = 0;
var certas = 0; 
var aceitaMidle = false;
var sgm = false;
var posto = false;
var midlePoint = null;
var contaTempo;
var disable = false; 
var signal = false; 
var levelText; 
var changeLevel = false; 
var changeLives = true; 
var naoMexe = false; 
var pts; 

class Jogo extends Phaser.Scene {

    constructor() {
        super('Jogo');
    }
    
    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('btHome','assets/btHome.png');
        this.load.image('base1','assets/base1.png');
        this.load.image('base2','assets/base2.png');
        this.load.image('base3','assets/base3.png');
        this.load.image('base4','assets/base4.png');
        this.load.image('ponto', 'assets/ponto.png');
        this.load.image('titulo1', 'assets/titulo1.png');        
        this.load.image('ponto', 'assets/ponto.png');
        this.load.image('info', 'assets/quadropassar.png');
        this.load.image('infoexit', 'assets/quadroinfo.png');
        this.load.image('btsim', 'assets/btsim.png');
        this.load.image('btnao', 'assets/btnao.png');
        this.load.image('clock', 'assets/clock.png');
        this.load.image('coracao1', 'assets/coracao1.png');
        this.load.image('coracao2', 'assets/coracao2.png');
        this.load.image('btExtra', 'assets/btExtra.png');
        //this.load.image('circulo', 'assets/circulo.png');
    }
        
    create (){
        contaTempo = setInterval(function(){ segundo() },1000);
        segundos = 0;
        
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'background');
        this.background.setScale(1);

        this.titulo1 = this.add.sprite(0.5 * game.config.width, 0.15 *game.config.height, 'titulo1');
        this.titulo1.setScale(0.9);
        
        

        var color =  0xffffff;
        var texto = this.add.text(0.35 * game.config.width, 0.26 *game.config.height, '', { fontFamily: 'font1',align: 'right'});
        texto.setFontSize(30);

        levelText = this.add.text(0.465 * game.config.width, 0.17 *game.config.height, '', { fontFamily: 'font1',align: 'right'});
        levelText.setFontSize(45);
        
        var graphics = this.add.graphics({fillStyle: { color: 0x2266aa } });

        // menu/bases
        this.base1=this.add.sprite(0.91 * game.config.width, 0.17 *game.config.height, "base1");
        this.base1.setScale(1);
        this.base4=this.add.sprite(0.09 * game.config.width, 0.17 *game.config.height, "base4");
        this.base4.setScale(1);

        this.btHome = this.add.sprite(0.05 * game.config.width, 0.9*game.config.height, "btHome");
        this.btHome.setScale(1);
        this.btHome.setInteractive({ useHandCursor: true });
        this.btHome.name = 'btHome';

        this.btHome.on('pointerover', () => {
        this.btHome.displayHeight += 5;
        this.btHome.displayWidth += 5;
    
        });
        this.btHome.on('pointerout', () => {
        this.btHome.displayHeight -= 5;
        this.btHome.displayWidth -= 5;
        });

        //Exit
        this.infoexit = this.add.sprite(0.5 * game.config.width, 0.6 *game.config.height, "infoexit");
        this.infoexit.setScale(1.3);
        this.infoexit.visible = false;
        this.infoexit.name = 'infoexit';

        this.btsim = this.add.sprite(0.56 * game.config.width, 0.72 * game.config.height, 'btsim');
        this.btsim.setScale(0.9);
        this.btsim.visible = false;
        this.btsim.name = 'btsim';

        this.btnao = this.add.sprite(0.44 * game.config.width, 0.72 * game.config.height, 'btnao');
        this.btnao.setScale(0.9);
        this.btnao.visible = false;
        this.btnao.name = 'btnao';

        info = this.add.sprite(10000, 10000, 'info');
        timer = this.add.text(0.064 * game.config.width, 0.06 * game.config.height, segundos,{
            fontFamily: 'font1',
        });

        timer.setFontSize(60);
        
        this.clock = this.add.sprite(0.12 * game.config.width, 0.1 * game.config.height, 'clock');
        this.clock.setScale(0.9);


        pts = this.add.text(0.93 * game.config.width, 0.08 * game.config.height, " pts",{
            fontFamily: 'font1',
        });

        pts.setFontSize(40);

        textScore = this.add.text(0.89 * game.config.width, 0.06 * game.config.height, score,{
            fontFamily: 'font1',
        });
        
        textScore.setFontSize(60);

        // --- vidas ---
        //Coracao cheio
        this.coracaocheio1 = this.add.sprite(0.18 * game.config.width, 0.17 * game.config.height, 'coracao1');
        this.coracaocheio1.setScale(0.7);
        this.coracaocheio1.visible = true;

        this.coracaocheio2 = this.add.sprite(0.22 * game.config.width, 0.17 * game.config.height, 'coracao1');
        this.coracaocheio2.setScale(0.7);
        this.coracaocheio2.visible = true;

        this.coracaocheio3 = this.add.sprite(0.26 * game.config.width, 0.17 * game.config.height, 'coracao1');
        this.coracaocheio3.setScale(0.7);
        this.coracaocheio3.visible = true;

        //Coracao vazio
        this.coracaovazio1 = this.add.sprite(0.18 * game.config.width, 0.17 * game.config.height, 'coracao2');
        this.coracaovazio1.setScale(0.7);
        this.coracaovazio1.visible = false;

        this.coracaovazio2 = this.add.sprite(0.22 * game.config.width, 0.17 * game.config.height, 'coracao2');
        this.coracaovazio2.setScale(0.7);
        this.coracaovazio2.visible = false;

        this.coracaovazio3 = this.add.sprite(0.26 * game.config.width, 0.17 * game.config.height, 'coracao2');
        this.coracaovazio3.setScale(0.7);
        this.coracaovazio3.visible = false;


        sim = this.add.sprite(-10000,-100000, 'btsim');
        nao = this.add.sprite(-10000,-100000, 'btnao');
        sim.name = 'sim';
        nao.name = 'nao';
        nao.setScale(1);
        sim.setScale(1);
        sim.setInteractive({ useHandCursor: true});
        nao.setInteractive({ useHandCursor: true });

        sim.on('pointerdown', () => {
            if(!changeLevel){
                level += 1;
                changeLevel = true;
            }
            changeLives = false; 
            armazenado = 0;
            f2 = true;
            aceita = true;
        });

        nao.on('pointerdown', () => {
            
            if(!changeLevel){
                aceita = true; 
                changeLevel = true;
            }
            score -= armazenado;
            segundos = 0;
            certas = -1;
            changeLives = false;
            
        });
        
        nao.on('pointerup', () => {
            armazenado = 0;
        });
        
        
        var letras = pontosAleatorios(); 
        var letra1 = letras[0];
        var letra2 = letras[1];
        var letra3 = letras[2];
        var letra4 = letras[3];
        var letra5 = letras[4];
        
        var pon = generate2points(); 
        var point2 = pon[0];
        var point3 = pon[1];

        var x = point2.x;
        var y = point2.y; 
        var x1 = point3.x; 
        var y1 = point3.y; 

        var letraa = this.add.text(x+15,y+15,letra1,{
            fontFamily: 'font1',
        });
        var letrab = this.add.text(x1+15,y1+15,letra2,{
            fontFamily: 'font1',
        });
        var letrac = this.add.text(-10000,-10000,letra3,{
            fontFamily: 'font1',
        });;
        var letrad = this.add.text(-10000,-10000,letra4,{
            fontFamily: 'font1',
        });;
        var letrae = this.add.text(-10000,-10000,letra5,{
            fontFamily: 'font1',
        });;
        letraa.setFontSize(30);
        letrab.setFontSize(30);
        letrac.setFontSize(30);
        letrad.setFontSize(30);
        letrae.setFontSize(30);

        var ponto1 = this.add.sprite(x,y, "ponto");
        var ponto2 = this.add.sprite(x1,y1, "ponto");
        var ponto3 = this.add.sprite(10000,10000,"ponto");
        var ponto4 = this.add.sprite(10000,10000,"ponto");
        var ponto5   = this.add.sprite(10000,10000,"ponto");

        var pontoExtra = this.add.sprite(10000,10000,"btExtra");
        pontoExtra.setScale(1.2);
        ponto1.setScale(1.3);
        ponto2.setScale(1.3);
        ponto3.setScale(1.3);
        ponto4.setScale(1.3);
        ponto5.setScale(1.3);

        var line = new Phaser.Geom.Line(); 
        var point; 
        var point4;
        var point5; 
        var pointsLine = getPointsOnLine(point2,point3);

        switch(level){
            case 1:
                texto.setText([
                textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                break;
            case 2: 
                texto.x = 0.36 * game.config.width;

                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                point = generateExtraPoint([point2,point3],1);                    
                var a = point.x;
                var b = point.y
                
                ponto1.x=x;
                ponto1.y=y;
                ponto2.x=x1;
                ponto2.y=y1;
                letraa.x = x+15;
                letraa.y = y+15;
                letrab.x = x1+15;
                letrab.y = y1+15;
                letrac.x = a+15; 
                letrac.y = b+15;
                ponto3.x = a;
                ponto3.y = b;
                segundos = 0;
                break;
            case 3: 
                texto.x = 0.34 * game.config.width; 

                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear(); 
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                point = generateExtraPoint([point2,point3],1); 
                point4 = generateExtraPoint([point2,point3,point],1); 
                var a = point.x;
                var b = point.y; 
                var px = point4.x; 
                var py = point4.y;

                ponto1.x=x;
                ponto1.y=y;
                ponto2.x=x1;
                ponto2.y=y1;
                ponto3.x = a;
                ponto3.y = b;
                ponto4.x = px; 
                ponto4.y = py; 
                letraa.x = x+15;
                letraa.y = y+15;
                letrab.x = x1+15;
                letrab.y = y1+15;
                letrac.x = a+15; 
                letrac.y = b+15;
                letrad.x = px+15; 
                letrad.y = py+15; 
                segundos = 0;
                break; 
            case 4: 
                texto.x = 0.34 * game.config.width; 

                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear(); 
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                var aux = pontosParalelo(point2.x+30,point2.y,point3.x-20,point3.y-80);
                point = aux[1]; 
                point4 = aux[0];
                var a = point.x;
                var b = point.y; 
                var px = point4.x; 
                var py = point4.y;

                ponto1.x=x;
                ponto1.y=y;
                ponto2.x=x1;
                ponto2.y=y1;
                ponto3.x = a;
                ponto3.y = b;
                ponto4.x = px; 
                ponto4.y = py; 
                letraa.x = x+15;
                letraa.y = y+15;
                letrab.x = x1+15;
                letrab.y = y1+15;
                letrac.x = a+15; 
                letrac.y = b+15;
                letrad.x = px+15; 
                letrad.y = py+15; 
                segundos = 0;
                break; 
            case 5: 
                texto.x = 0.39 * game.config.width; 

                texto.setText([
                    textoLevel(level) + letra1 + ' e ' +  letra2
                ]);
                break; 
            case 6: 
                

                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                point = generateExtraPoint([point2,point3],1);                    
                var a = point.x;
                var b = point.y
                
                ponto1.x=x;
                ponto1.y=y;
                ponto2.x=x1;
                ponto2.y=y1;
                letraa.x = x+15;
                letraa.y = y+15;
                letrab.x = x1+15;
                letrab.y = y1+15;
                letrac.x = a+15; 
                letrac.y = b+15;
                ponto3.x = a;
                ponto3.y = b;
                segundos = 0;
                break;
            case 7: 
                

                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                point = generateExtraPoint([point2,point3],1);                    
                var a = point.x;
                var b = point.y
                
                ponto1.x=x;
                ponto1.y=y;
                ponto2.x=x1;
                ponto2.y=y1;
                letraa.x = x+15;
                letraa.y = y+15;
                letrab.x = x1+15;
                letrab.y = y1+15;
                letrac.x = a+15; 
                letrac.y = b+15;
                ponto3.x = a;
                ponto3.y = b;
                segundos = 0;
                break;
            case 8: 
                
                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                    graphics.clear(); 
                    lines[j] = new Phaser.Geom.Line();
                    line = lines[j];
                    point = generateExtraPoint([point2,point3],1); 
                    point4 = generateExtraPoint([point2,point3,point],1); 
                    var a = point.x;
                    var b = point.y; 
                    var px = point4.x; 
                    var py = point4.y;

                    ponto1.x=x;
                    ponto1.y=y;
                    ponto2.x=x1;
                    ponto2.y=y1;
                    ponto3.x = a;
                    ponto3.y = b;
                    ponto4.x = px; 
                    ponto4.y = py; 
                    letraa.x = x+15;
                    letraa.y = y+15;
                    letrab.x = x1+15;
                    letrab.y = y1+15;
                    letrac.x = a+15; 
                    letrac.y = b+15;
                    letrad.x = px+15; 
                    letrad.y = py+15; 
                    segundos = 0;
                    break; 
            case 9: 
                escondePontos([ponto3,ponto4,letrac,letrad]);
                texto.setText([
                    textoLevel(level)[0] + letra1 + textoLevel(level)[1] + letra2
                ]);
                break;
            case 10: 
                escondePontos([ponto3,letrac]);
                texto.setText([
                    textoLevel(level)[0] + letra1 +  textoLevel(level)[1] + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                point = generateExtraPoint([point2,point3],1);                    
                var a = point.x;
                var b = point.y
                ponto1.x=x;
                ponto1.y=y;
                ponto2.x=x1;
                ponto2.y=y1;
                letraa.x = x+15;
                letraa.y = y+15;
                letrab.x = x1+15;
                letrab.y = y1+15;
                letrac.x = a+15; 
                letrac.y = b+15;
                ponto3.x = a;
                ponto3.y = b;
                segundos = 0;
                break;
            case 11: 
                texto.setText([
                textoLevel(level)[0] + letra1 +  textoLevel(level)[1] + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                point = generateExtraPoint([point2,point3],1);                    
                var a = point.x;
                var b = point.y
                
                ponto1.x=x;
                ponto1.y=y;
                ponto2.x=x1;
                ponto2.y=y1;
                letraa.x = x+15;
                letraa.y = y+15;
                letrab.x = x1+15;
                letrab.y = y1+15;
                letrac.x = a+15; 
                letrac.y = b+15;
                ponto3.x = a;
                ponto3.y = b;
                segundos = 0;
                break;
            case 12: 
                texto.setText([
                    textoLevel(level)[0] + letra1 + textoLevel(level)[1] + letra2
                ]);
                graphics.clear(); 
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                point = generateExtraPointAlign([point2,point3]);
                point4 = generateExtraPoint([point2,point3],1); 
                var a = point.x;
                var b = point.y; 
                var px = point4.x; 
                var py = point4.y;

                ponto1.x=x;
                ponto1.y=y;
                ponto2.x=x1;
                ponto2.y=y1;
                ponto3.x = a;
                ponto3.y = b;
                ponto4.x = px; 
                ponto4.y = py; 
                letraa.x = x+15;
                letraa.y = y+15;
                letrab.x = x1+15;
                letrab.y = y1+15;
                letrac.x = a+15; 
                letrac.y = b+15;
                letrad.x = px+15; 
                letrad.y = py+15; 
                segundos = 0;
                break;    
            case 13: 
                
                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
               
                ponto3.x = point.x;
                ponto3.y = point.y;
                ponto4.x = point4.x;
                ponto4.y = point4.y; 
                letrac.x = point.x+15;
                letrac.y = point.y+15;
                letrad.x = point4.x+15;
                letrad.y = point4.y+15;
                break; 
            case 14: 
                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = perpendicular(point2,point3);    
                ponto4.x = point4.x;
                ponto4.y = point4.y; 
                letrad.x = point4.x+15;
                letrad.y = point4.y+15;
                segundos = 0;
                break;
            case 15: 
                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = perpendicular(point2,point3);    
                ponto4.x = point4.x;
                ponto4.y = point4.y; 
                letrad.x = point4.x+15;
                letrad.y = point4.y+15;
                segundos = 0;
                break;
            case 16: 
                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                ponto3.x = point.x;
                ponto3.y = point.y; 
                letrac.x = point.x+15;
                letrac.y = point.y+15;
                segundos = 0;
                break;
            case 17: 
                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                ponto3.x = point.x;
                ponto3.y = point.y; 
                letrac.x = point.x+15;
                letrac.y = point.y+15;
                segundos = 0;
            case 18: 
                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                graphics.clear();
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = perpendicular(point2,point3);
                point5 = pontosParaleloF(point2.x,point2.y,point3.x,point3.y,point4);
                ponto3.x = point4.x;
                ponto3.y = point4.y; 
                letrac.x = point4.x+15;
                letrac.y = point4.y+15;
                segundos = 0;
                break;
            case 19: 
                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                ponto3.x = point.x;
                ponto3.y = point.y;
                ponto4.x = point4.x;
                ponto4.y = point4.y; 
                letrac.x = point.x+15;
                letrac.y = point.y+15;
                letrad.x = point4.x+15;
                letrad.y = point4.y+15;
                break; 
            case 20: 
                texto.setText([
                    textoLevel(level) + letra1 + ' e ' + letra2
                ]);
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                point5 = generateExtraPointAlign([point2,point3]);
                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);

                ponto3.x = point.x;
                ponto3.y = point.y;
                ponto4.x = point4.x;
                ponto4.y = point4.y; 
                ponto5.x = point5.x; 
                ponto5.y = point5.y; 
                letrac.x = point.x+15;
                letrac.y = point.y+15;
                letrad.x = point4.x+15;
                letrad.y = point4.y+15;
                letrae.x = point5.x+15;
                letrae.y = point5.y+15; 
                break; 

        }
        
        this.input.on('gameobjectdown', function(pointer, gameObject) {
            if(!aceita){
                switch (gameObject.name) {
                    case 'btHome':
                        changeLives = false; 
                        graphics.clear();
                        this.btHome.disableInteractive();
                        this.infoexit.visible = true;
                        this.btnao.visible = true;
                        this.btnao.setInteractive({ useHandCursor: true });
                        this.btsim.visible = true;
                        this.btsim.setInteractive({ useHandCursor: true });
                        escondePontos([letraa,letrab,letrac,letrad,ponto1,ponto2,ponto3,ponto4]);
                        clearInterval(contaTempo);
                        vidas += 1; 
                        score += 5;
                        break;
                    case 'btsim':
                        lines = [];
                        pointsLine = [];
                        clearInterval(contaTempo);
                        segundos = 0;
                        score = 0;
                        this.scene.transition({ target: 'Menu', duration: 100 });
                        pause = false; 
                        level = 1; 
                        vidas = 3; 
                        changeLives = true;
                        reset();
                        break;
                    case 'btnao':
                        changeLives = true; 
                        clearInterval(contaTempo);
                        contaTempo = setInterval(function(){ segundo() },1000);
                        pause = false; 
                        this.btHome.setInteractive({ useHandCursor: true });
                        this.infoexit.visible = false;
                        this.btnao.visible = false;
                        this.btsim.visible = false;
                        this.btnao.disableInteractive();
                        this.btsim.disableInteractive();
                        vidas += 1;
                        score += 5;
                        letraa.x = x+15;
                        letraa.y = y+15;
                        letrab.x = x1+15;
                        letrab.y = y1+15;
                        ponto1.x=x;
                        ponto1.y=y;
                        ponto2.x=x1;
                        ponto2.y=y1;
                        if (level==2 || level==1 || level==6|| level==7|| level==10|| level==11|| level==16){
                            letrac.x = point.x+15;
                            letrac.y = point.y+15;
                            ponto3.x=point.x;
                            ponto3.y=point.y;  
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                        }
                        if(level==14||level==15|| level==18){
                            letrad.x = point4.x+15;
                            letrad.y = point4.y+15;
                            ponto4.x=point4.x;
                            ponto4.y=point4.y;
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                        }
                        if(level==3 || level==4 || level==5||level==8|| level==12|| level==13|| level==19){
                            letrac.x = point.x+15;
                            letrac.y = point.y+15;
                            ponto3.x=point.x;
                            ponto3.y=point.y;
                            letrad.x = point4.x+15;
                            letrad.y = point4.y+15;
                            ponto4.x=point4.x;
                            ponto4.y=point4.y;
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                        }
                        if(level==20){
                            letrac.x = point.x+15;
                            letrac.y = point.y+15;
                            ponto3.x=point.x;
                            ponto3.y=point.y;
                            letrad.x = point4.x+15;
                            letrad.y = point4.y+15;
                            letrae.x = point5.x+15;
                            letrae.y = point5.y+15;
                            ponto4.x=point4.x;
                            ponto4.y=point4.y;
                            ponto5.x=point5.x;
                            ponto5.y=point5.y;
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                        }
                        break;
                }
            }   
        }, this);

        aceitaMidle = false;
        segundos = 0;
        sgm = false;


        this.input.on('pointerdown', function (pointer) {
            if(!muda){
                var ultimo = false;
                if(ultimo==false){
                    line.setTo(pointer.x, pointer.y, pointer.x, pointer.y);
                }
                var pontosLine;

                if(level==1||level==5||level==7||level==9||level==13||level==19){
                    pontosLine= getPretendedLine(level,point2,point3);
                }
                if(level==8||level==20){
                    pontosLine= getPretendedLine(level,point2,point);
                }
                if(level==15||level==17){
                    pontosLine= getPretendedLine(level,point4,point);
                }

                if (((level == 1||level==5||level==7||level==8||level==9||level==13||level==15||level==17||level==19||level==20) && certas ==1)){
                    
                    if(posto==false){
                        signal = true; 
                       
                        for(var i=0;i<pontosLine.length;i++){
                            var mid = pontosLine[i];
                            if ((pointer.x<=mid.x+20 && pointer.x>=mid.x-20 && pointer.y<=mid.y+20 && pointer.y>=mid.y-20)){
                                midlePoint = new Phaser.Geom.Point(mid.x,mid.y);
                                if(sgm){
                                    aceitaMidle = true;
                                    if(!posto){
                                        pontoExtra.x = mid.x;
                                        pontoExtra.y = mid.y; 
                                        graphics.strokeLineShape(lines[0]);
                                    }
                                    posto=true;
                                }
                            }
                            else{
                                midlePoint = new Phaser.Geom.Point(pointer.x,pointer.y);
                            }
                        }
                    }
                }

                for(var i=0;i<=pointsLine.length;i++){
                    if (pointer.x <= x+80 && pointer.x >= x-80 && pointer.y <= y+80 && pointer.y >= y-80){
                        line.setTo(x, y, x, y);
                    }
                    else {
                        if (pointer.x <= x1+80 && pointer.x >= x1-80 && pointer.y <= y1+80 && pointer.y >= y1-80){
                        line.setTo(x1, y1, x1, y1);
                        }
                        else{
                            if ((level == 2||level==3||level==4||level==6||level==7||level==8||
                                level == 10 || level==11 || level==12||level==13||level==16||level==17||level==19||level==20
                                ) && pointer.x <= point.x+80 && pointer.x >= point.x-80 && pointer.y <= point.y+80 && pointer.y >= point.y-80){
                                line.setTo(point.x, point.y, point.x, point.y);
                            }
                            else{ 
                                if((level==3 ||level==4||level==8||level==12||level==13
                                    ||level==14||level==15||level==18||level==19||level==20)&& pointer.x <= point4.x+80 && pointer.x >= point4.x-80 && pointer.y <= point4.y+80 && pointer.y >= point4.y-80){
                                    line.setTo(point4.x, point4.y, point4.x, point4.y);
                                }
                                else{
                                    if(level==20&& pointer.x <= point5.x+80 && pointer.x >= point5.x-80 && pointer.y <= point5.y+80 && pointer.y >= point5.y-80){
                                        line.setTo(point5.x, point5.y, point5.x, point5.y);
                                    }
                                    else{
                                        if(pointer.x<=pointsLine[i].x+80 &&pointer.x >= pointsLine[i].x-80 && pointer.y <= pointsLine[i].y+80 && pointer.y >= pointsLine[i].y-80 ){
                                            line.setTo(pointsLine[i].x, pointsLine[i].y, pointsLine[i].x, pointsLine[i].y);
                                            ultimo = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                

                switch (level){
                    case 1:
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){

                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                    case 2: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }             
                        graphics.strokeLineShape(line);
                        break;
                    case 3: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }             
                        graphics.strokeLineShape(line);
                        break;
                    case 4: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }   
                        graphics.lineStyle(10, color);
          
                        graphics.strokeLineShape(line);
                        break;
                    case 5: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                    case 6:
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }             
                        graphics.strokeLineShape(line);
                        break;
                    case 7: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                    case 8: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break; 
                    case 9: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                    case 10: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }   
                        graphics.lineStyle(10, color);
          
                        graphics.strokeLineShape(line);
                        break;
                    case 11: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }   
                        graphics.lineStyle(10, color);
          
                        graphics.strokeLineShape(line);
                        break;
                    case 12: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }   
                        graphics.lineStyle(10, color);
          
                        graphics.strokeLineShape(line);
                        break;
                    case 13: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break; 
                    case 14: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }   
                        graphics.lineStyle(10, color);
          
                        graphics.strokeLineShape(line);
                        break;
                    case 15: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break; 
                    case 16: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }   
                        graphics.lineStyle(10, color);
          
                        graphics.strokeLineShape(line);
                        break;
                    case 17: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break; 
                    case 18: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }   
                        graphics.lineStyle(10, color);
          
                        graphics.strokeLineShape(line);
                        break;
                    case 19: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                    case 20: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);

                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }

                        if(certas==1){
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(midlePoint!=null){
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                }
            }
        });

        this.input.on('pointermove', function (pointer) { 
            if(!muda){
                signal = false; 
                var p = false; 
                if (pointer.isDown)
                {
                    if(posto==false){
                        midlePoint = null;
                    }
                    
                    if(p==false){
                        line.x2 = pointer.x; 
                        line.y2 = pointer.y;        
                    }

                    for (var i=0;i<pointsLine.length;i++){
                        if (pointer.x <= x+80 && pointer.x >= x-80 && pointer.y <= y+80 && pointer.y >= y-80){
                            line.x2 = x; 
                            line.y2 = y; 
                        }
                        else {
                            if (pointer.x <= x1+80 && pointer.x >= x1-80 && pointer.y <= y1+80 && pointer.y >= y1-80){
                                line.x2 = x1; 
                                line.y2 = y1; 
                            }
                            else{
                                if((level == 2|| level==3 || level==4||level==6||level==7||level==8
                                    ||level==10||level==11||level == 12||level==13||level==16||level==17||level==19||level==20) && 
                                    pointer.x <= point.x+80 && pointer.x >= point.x-80 && pointer.y <= point.y+80 && pointer.y >= point.y-80){
                                    line.x2 = point.x; 
                                    line.y2 = point.y; 
                                }
                                else{
                                    if((level==3||level==4||level==8||level==12||level==13||level==14||level==15||level==18||level==19||level==20
                                        ) && pointer.x <= point4.x+80 && pointer.x >= point4.x-80 && pointer.y <= point4.y+80 && pointer.y >= point4.y-80){
                                        line.x2 = point4.x; 
                                        line.y2 = point4.y; 
                                    }
                                    else{
                                        if(level==20 && pointer.x <= point5.x+80 && pointer.x >= point5.x-80 && pointer.y <= point5.y+80 && pointer.y >= point5.y-80){
                                            line.x2 = point5.x; 
                                            line.y2 = point5.y; 
                                        }
                                        else{
                                            if(pointer.x<=pointsLine[i].x+80 &&pointer.x >= pointsLine[i].x-80 && pointer.y <= pointsLine[i].y+80 && pointer.y >= pointsLine[i].y-80){
                                                line.x2 = pointsLine[i].x;
                                                line.y2 = pointsLine[i].y;
                                                
                                                }
                                            }
                                        }
                                    }
                                }   
                            }
                        }
                    
                    switch(level){
                        case 1: 
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (segmentoReta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe){
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                        case 2: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            break; 
                        case 3: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(10, color);
           
                            graphics.strokeLineShape(line);
                            break;
                        case 4: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(10, color);
           
                            graphics.strokeLineShape(line);
                            break;
                        case 5: 
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (reta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe){
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                        case 6:
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            break; 
                        case 7: 
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (reta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe){
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                        case 8: 
                        graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (reta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe){
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                        case 9: 
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (comecaAntesAcabaNoPonto(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe){
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                        case 10: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(10, color);
           
                            graphics.strokeLineShape(line);
                            break;
                        case 11: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(10, color);
           
                            graphics.strokeLineShape(line);
                            break;
                        case 12: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(10, color);
           
                            graphics.strokeLineShape(line);
                            break;
                        case 13: 
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (segmentoReta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe){
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                        case 14: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(10, color);
           
                            graphics.strokeLineShape(line);
                            break;
                        case 15: 
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (reta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe){
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                        case 16: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(10, color);
           
                            graphics.strokeLineShape(line);
                            break;
                        case 17: 
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (reta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe){
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                        case 18: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(10, color);
           
                            graphics.strokeLineShape(line);
                            break;
                        case 19: 
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (segmentoReta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe){
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }
                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);
                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                        case 20: 
                            graphics.clear();
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (segmentoReta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                }
                                else{
                                    if(!naoMexe && contador==0){
                                        contador += 1;
                                        graphics.clear();
                                        lines.pop();
                                        sgm = false;
                                    }
                                }

                                graphics.clear();
                                graphics.lineStyle(10, color);

                                graphics.strokeLineShape(line);

                                for(var i= 0;i<lines.length;i++){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[i]);
                                }

                                if(midlePoint!=null){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }  
                                }
                                if(sgm){
                                    graphics.clear();
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[i]);
                                    }                                 
                                }
                            }
                            break;
                    }
                }
            }
        });

        this.input.on('pointerup', function (pointer) {
            if(!muda){
                switch (level){
                    case 1: 
                        if (segmentoReta(point2,point3,line) && certas == 0){
                            aceita = true; 
                        }
                        else{
                            if (sgm){
                                naoMexe = true;
                                if(midlePoint!=null && sgm==true){
                                    posto = true;
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    posto = false;
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                texto.x = 0.3 * game.config.width;

                                texto.setText([
                                    'Marca um ponto do segmento de reta [' + letra1 + letra2 + '] que não seja um extremo'
                                ]);
                                if(sgm){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[0]);
                                    if(aceitaMidle){
                                        certas+=1;
                                        aceita = true;
                                        if (segundos >= 100){
                                            score += 5;
                                            armazenado += 5;
                                        }
                                        else{
                                            score += (100-segundos) * level;
                                            armazenado += (100-segundos) * level;
                                        }
                                        clearInterval(contaTempo);
                                        contaTempo = setInterval(function(){ segundo() },1000);
                                        segundos = 0;
                                    }
                                    else{
                                        midlePoint = null;
                                        if(signal && changeLives){
                                            score -= 5;
                                            vidas -= 1;
                                        }
                                    }
                                }
                                else{
                                    if(!aceitaMidle){
                                        midlePoint = null;
                                        posto = false;
                                    }
                                    if(!sgm){
                                        line = new Phaser.Geom.Line();
                                    }
                                }
                            }
                            else{
                                if(changeLives){
                                    score -= 5;
                                    vidas -= 1;
                                }
                            }
                        }
                        break; 
                    case 2: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(segmentoReta(point2,point3,line)){
                            texto.x = 0.4 * game.config.width;

                            um = true; 
                            
                            texto.setText([
                                'Traça o segmento de reta [' + letra1 + letra3 + ']'
                            ]);
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point2,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                        }
                        else{
                            if(segmentoReta(point2,point,line) && um == true){
                                dois = true; 
                                texto.setText([
                                    'Termina a representação do triângulo'
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point3,point);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point3,point,line) && dois==true){
                                    tres = true; 
                                    certas = 2;
                                }
                                else{
                                    if(changeLives){
                                        score -= 5;
                                        vidas -= 1;
                                    }
                                    lines.pop();
                                    graphics.clear();
                                }
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                            disable = true; 
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 3: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(segmentoReta(point2,point3,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point3,point4);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.x = 0.4 * game.config.width; 

                            texto.setText([
                                'Traça o segmento de reta [' + letra2 + letra4 + ']'
                            ]);
                        }
                        else{
                            if(segmentoReta(point3,point4,line) && um == true){
                                dois = true; 
                                texto.setText([
                                    'Traça o segmento de reta [' + letra1 + letra4 + ']'
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point2,point4);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point2,point4,line) && dois==true){
                                    tres = true; 
                                    certas = 2;
                                }
                                else{
                                    if(changeLives){
                                        score -= 5;
                                        vidas -= 1;
                                    }
                                    lines.pop();
                                    graphics.clear();
                                }
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 4: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(segmentoReta(point2,point3,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point3,point4);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.x = 0.42 * game.config.width; 

                            texto.setText([
                                'Traça o segmento de reta [' + letra2 + letra3 + ']'
                            ]);
                        }
                        else{
                            if(segmentoReta(point3,point,line) && um == true){
                                dois = true; 
                                texto.setText([
                                    'Traça o segmento de reta [' + letra1 + letra4 + ']'
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point2,point4);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point2,point4,line) && dois==true){
                                    texto.x = 0.4 * game.config.width; 

                                    texto.setText([
                                        'Termina a representação do quadrilátero'
                                    ]);
                                    tres = true; 
                                    pointsLine = [];
                                    var pointsLine4 = getPointsOnLine(point,point4);

                                    for(var i=0;i<pointsLine4.length;i++){
                                        pointsLine.push(pointsLine4[i]);
                                    }
                                }
                                else{
                                    if(segmentoReta(point,point4,line) && tres==true){
                                        quatro = true; 
                                        certas = 2; 
                                        pointsLine = [];
                                    }
                                    else{
                                        if(changeLives){
                                            score -= 5;
                                            vidas -= 1;
                                        }
                                        lines.pop();
                                        graphics.clear();
                                    }
                                }
                                
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres && quatro){
                            aceita=true;
                            aceita=true;
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 5: 
                        if (reta(point2,point3,line)&&certas == 0) aceita = true; 
                        else{
                            if (reta(point2,point3,line)&&certas == 1); 
                            if (sgm){
                                if(midlePoint!=null && sgm==true){
                                    
                                    posto = true;
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    posto = false;
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                
                                naoMexe = true;
                                texto.setText([
                                    'Marca um ponto alinhado com ' + letra1 + ' e ' +  letra2
                                ]);
                                if(sgm){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[0]);
                                    if(aceitaMidle){
                                        certas+=1;
                                        aceita = true;
                                        if (segundos >= 100){
                                            score += 5;
                                            armazenado += 5;
                                        }
                                        else{
                                            score += (100-segundos) * level;
                                            armazenado += (100-segundos) * level;
                                        }
                                        clearInterval(contaTempo);
                                        contaTempo = setInterval(function(){ segundo() },1000);
                                        segundos = 0;
                                    }
                                    else{
                                        midlePoint = null; 
                                        if(signal&&changeLives){
                                            score-=5; 
                                            vidas -=1; 
                                        }
                                    }
                                }
                                else{
                                    if(!aceitaMidle){
                                        midlePoint = null;
                                        posto = false;
                                    }
                                    if(!sgm){
                                        line = new Phaser.Geom.Line();
                                    }
                                }
                            }
                            else{
                                if(changeLives){
                                    score -= 5;
                                    vidas -= 1;
                                }
                            }
                        } 
                        break;
                    case 6: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            um = true; 
                            
                            texto.setText([
                                'Traça o segmento de reta [' + letra2 + letra3 + ']'
                            ]);
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point3,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                        }
                        else{
                            if(segmentoReta(point3,point,line) && um == true){
                                dois = true;
                                texto.x = 0.44 * game.config.width; 

                                texto.setText([
                                    'Traça a reta ' + letra1 + letra3 
                                ]); 
                                pointsLine = [];
                                var pointsLine2 = getPointsOnLine(point2,point);
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                            }
                            else{
                                if(reta(point2,point,line)&&dois){
                                    tres = true;
                                }
                                else{
                                    lines.pop();
                                    graphics.clear();  
                                    if(changeLives){
                                        score -= 5;
                                        vidas -= 1;
                                    }
                                }
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                            certas = 2;
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 7: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            um = true; 
                            
                            texto.setText([
                                'Traça o segmento de reta [' + letra2 + letra3 + ']'
                            ]);
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point3,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                        }
                        else{
                            if(segmentoReta(point3,point,line) && um == true){
                                dois = true;
                                certas = 1;
                                texto.x = 0.32 * game.config.width; 
                                naoMexe = true;
                                texto.setText([
                                    'Marca um ponto alinhado com ' + letra1 +' e ' + letra2 + ' e que não pertence a [' + letra1 + letra2 + ']'
                                ]); 
                                sgm = true;
                            }
                            else{
                                lines.pop();
                                if (sgm){
                                    if(midlePoint!=null && sgm==true){
                                        posto = true;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    else{
                                        graphics.clear();
                                        posto = false;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    if(sgm){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[0]);
                                        if(aceitaMidle){
                                            tres = true;
                                            certas+=1;
                                            aceita = true;
                                            if (segundos >= 100){
                                                score += 5;
                                                armazenado += 5;
                                            }
                                            else{
                                                score += (100-segundos) * level;
                                                armazenado += (100-segundos) * level;
                                            }
                                            clearInterval(contaTempo);
                                            contaTempo = setInterval(function(){ segundo() },1000);
                                            segundos = 0;
                                        }
                                    else{
                                        midlePoint = null;
                                        if(signal&&changeLives){
                                            score -= 5; 
                                            vidas -= 1;
                                        }
                                    }
                                }
                                else{
                                    if(!aceitaMidle){
                                        midlePoint = null;
                                        posto = false;
                                    }
                                    if(!sgm){
                                        line = new Phaser.Geom.Line();
                                    }
                                }
                            }
                            else{
                                if(changeLives){
                                    score -= 5;
                                    vidas -= 1;
                                }
                            } 
                        }
                    }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                            certas = 2; 
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        
                        break;
                    case 8: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            um = true; 
                            texto.x = 0.44 * game.config.width; 

                            texto.setText([
                                'Traça a reta ' + letra1 + letra3 
                            ]);
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point2,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                        }
                        else{
                            if(reta(point2,point,line) && um == true){
                                dois = true;
                                texto.x = 0.4 * game.config.width; 

                                texto.setText([
                                    'Traça o segmento de reta [' + letra2 + letra4 +']'
                                ]); 
                                pointsLine = [];
                                var pointsLine2 = getPointsOnLine(point3,point4);
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point3,point4,line)&&dois){
                                    tres = true; 
                                    sgm = true; 
                                    texto.x = 0.32 * game.config.width; 

                                    certas = 1; 
                                    naoMexe = true;
                                    texto.setText([
                                        'Marca um ponto alinhado com ' + letra1 + letra3 +' e que não pertence a '
                                        + '[' + letra1 + letra3 + ']'
                                    ]); 
                                }
                                else{
                                    lines.pop();
                                }

                                if (sgm){
                                    if(midlePoint!=null && sgm==true){
                                        
                                        posto = true;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    else{
                                        graphics.clear();
                                        posto = false;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    if(sgm){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[0]);
                                        if(aceitaMidle){
                                            quatro = true;
                                            certas+=1;
                                            aceita = true;
                                            if (segundos >= 100){
                                                score += 5;
                                                armazenado += 5;
                                            }
                                            else{
                                                score += (100-segundos) * level;
                                                armazenado += (100-segundos) * level;
                                            }
                                            clearInterval(contaTempo);
                                            contaTempo = setInterval(function(){ segundo() },1000);
                                            segundos = 0;
                                        }
                                    else{
                                        midlePoint = null;
                                        if(signal&&changeLives){
                                            score -= 5; 
                                            vidas -= 1;
                                        }
                                    }
                                }
                                else{
                                    if(!aceitaMidle){
                                        midlePoint = null;
                                        posto = false;
                                    }
                                    if(!sgm){
                                        line = new Phaser.Geom.Line();
                                    }
                                }
                            }
                            else{
                                if(changeLives){
                                    score -= 5;
                                    vidas -= 1;
                                }
                            } 
                        }
                    }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres && quatro){
                            aceita=true;
                            certas = 2; 
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        
                        break;
                    case 9: 
                        if (semiReta(point2,point3,line)&&certas==0){
                            aceita = true; 
                        } 
                        else{
                            if (sgm){
                                if(midlePoint!=null && sgm==true){
                                    
                                    posto = true;
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    posto = false;
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(line);
                                }
                                
                                naoMexe = true;
                                texto.x = 0.38 * game.config.width; 

                                texto.setText([
                                    'Marca outro ponto da semirreta |' + letra1 + letra2
                                ]);
                                if(sgm){
                                    graphics.lineStyle(10, color);

                                    graphics.strokeLineShape(lines[0]);
                                    if(aceitaMidle){
                                        certas+=1;
                                        aceita = true;
                                        if (segundos >= 100){
                                            score += 5;
                                            armazenado += 5;
                                        }
                                        else{
                                            score += (100-segundos) * level;
                                            armazenado += (100-segundos) * level;
                                        }
                                        clearInterval(contaTempo);
                                        contaTempo = setInterval(function(){ segundo() },1000);
                                        segundos = 0;
                                    }
                                    else{
                                        midlePoint = null;
                                        if(signal&&changeLives){
                                            score -= 5; 
                                            vidas -= 1;
                                        }
                                    }
                                }
                                else{
                                    if(!aceitaMidle){
                                        midlePoint = null;
                                        posto = false;
                                    }
                                    if(!sgm){
                                        line = new Phaser.Geom.Line();
                                    }
                                }
                            }
                            else{
                                if(changeLives){
                                    score -= 5;
                                    vidas -= 1;
                                }
                            }
                        }
                        break;
                    case 10: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(semiReta(point2,point3,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point2,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.x = 0.44 * game.config.width; 

                            texto.setText([
                                'Traça a reta ' + letra1 + letra3
                            ]);
                        }
                        else{
                            if(reta(point2,point,line) && um == true){
                                dois = true; 
                                texto.x = 0.38 * game.config.width;

                                texto.setText([
                                    'Traça o segmento de reta [' + letra2 + letra3 + ']'
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point3,point);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point3,point,line) && dois==true){
                                    tres = true; 
                                }
                                else{
                                    if(changeLives){
                                        score -= 5;
                                        vidas -= 1;
                                    }
                                    lines.pop();
                                    graphics.clear();
                                }
                                
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                            certas = 2;
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 11: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(semiReta(point2,point3,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point3,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.x = 0.38 * game.config.width;

                            texto.setText([
                                'Traça o segmento de reta [' + letra2 + letra3 + ']'
                            ]);
                        }
                        else{
                            if(segmentoReta(point3,point,line) && um == true){
                                dois = true; 
                                texto.x = 0.34 * game.config.width;

                                texto.setText([
                                    'Traça a reta SUPORTE da semirreta |' + letra1 + letra2
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point2,point3);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(reta(point2,point3,line) && dois==true){
                                    tres = true; 
                                }
                                else{
                                    if(changeLives){
                                        score -= 5;
                                        vidas -= 1;
                                    }
                                    lines.pop();
                                    graphics.clear();
                                }
                                
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                            certas = 2;
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 12: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(comecaAntesAcabaNoPonto(point2,point,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point2,point4);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.x = 0.38 * game.config.width;

                            texto.setText([
                                'Traça o segmento de reta [' + letra1 + letra4 +']'
                            ]);
                        }
                        else{
                            if(segmentoReta(point2,point4,line) && um == true){
                                dois = true; 
                                texto.x = 0.44 * game.config.width; 

                                texto.setText([
                                    'Traça a reta ' + letra2 + letra4 
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point3,point4);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(reta(point3,point4,line) && dois==true){
                                    tres = true; 
                                }
                                else{
                                    if(changeLives){
                                        score -= 5;
                                        vidas -= 1;
                                    }
                                    lines.pop();
                                    graphics.clear();
                                }
                                
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                            certas = 2;
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 13: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            um = true; 
                            texto.x = 0.42 * game.config.width; 

                            texto.setText([
                                'Traça a semirreta |' + letra1 + letra3 
                            ]);
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point2,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                        }
                        else{
                            if(comecaAntesAcabaNoPonto(point2,point,line) && um == true){
                                dois = true;
                                texto.x = 0.38 * game.config.width;

                                texto.setText([
                                    'Traça o segmento de reta [' + letra2 + letra4 +']'
                                ]); 
                                pointsLine = [];
                                var pointsLine2 = getPointsOnLine(point3,point4);
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point3,point4,line)&&dois){
                                    tres = true; 
                                    sgm = true; 
                                    certas = 1; 
                                    naoMexe = true;
                                    texto.x = 0.32 * game.config.width;

                                    texto.setText([
                                        'Marca um ponto alinhado com ' + letra1 + letra2 +' e que não pertence a '
                                        + '|' + letra1 + letra2
                                    ]); 
                                }
                                else{
                                    lines.pop();
                                }

                                if (sgm){
                                    if(midlePoint!=null && sgm==true){
                                        
                                        posto = true;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    else{
                                        graphics.clear();
                                        posto = false;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    if(sgm){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[0]);
                                        if(aceitaMidle){
                                            quatro = true;
                                            certas+=1;
                                            aceita = true;
                                            if (segundos >= 100){
                                                score += 5;
                                                armazenado += 5;
                                            }
                                            else{
                                                score += (100-segundos) * level;
                                                armazenado += (100-segundos) * level;
                                            }
                                            clearInterval(contaTempo);
                                            contaTempo = setInterval(function(){ segundo() },1000);
                                            segundos = 0;
                                        }
                                    else{
                                        midlePoint = null;
                                        if(signal&&changeLives){
                                            score -= 5; 
                                            vidas -= 1;
                                        }
                                    }
                                }
                                else{
                                    if(!aceitaMidle){
                                        midlePoint = null;
                                        posto = false;
                                    }
                                    if(!sgm){
                                        line = new Phaser.Geom.Line();
                                    }
                                }
                            }
                            else{
                                if(changeLives){
                                    score -= 5;
                                    vidas -= 1;
                                }
                            } 
                        }
                    }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres && quatro){
                            aceita=true;
                            certas = 2; 
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        
                        break;
                    case 14: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point,point4);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.x = 0.32 * game.config.width;

                            texto.setText([
                                'Traça a reta perpendicular a ' + letra1 + letra2 +' que passa por ' + letra4 
                            ]);
                        }
                        else{
                            if(reta(point,point4,line) && um == true){
                                dois = true; 
                                texto.x = 0.38 * game.config.width;

                                texto.setText([
                                    'Traça o segmento de reta [' + letra2 + letra4 + ']'
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point3,point4);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point3,point4,line) && dois==true){
                                    tres = true; 
                                }
                                else{
                                    if(changeLives){
                                        score -= 5;
                                        vidas -= 1;
                                    }
                                    lines.pop();
                                    graphics.clear();
                                }
                                
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                            certas = 2;
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 15: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            um = true; 
                            texto.x = 0.32 * game.config.width;

                            texto.setText([
                                'Traça a reta perpendicular a ' + letra1 + letra2 + ' que passa por ' + letra4
                            ]);
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point4,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                        }
                        else{
                            if(reta(point4,point,line) && um == true){
                                dois = true;
                                naoMexe = true;
                                texto.x = 0.3 * game.config.width;

                                texto.setText([
                                    'Marca um ponto da reta perpendicular a ' + letra1 + letra2 +' que passa por '+ letra4
                                ]); 
                                sgm = true; 
                                certas = 1; 
                            }
                            else{
                                lines.pop();
                            }
                                if (sgm){
                                    if(midlePoint!=null && sgm==true){
                                        
                                        posto = true;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    else{
                                        graphics.clear();
                                        posto = false;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    if(sgm){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[0]);
                                        if(aceitaMidle){
                                            quatro = true;
                                            certas+=1;
                                            aceita = true;
                                            if (segundos >= 100){
                                                score += 5;
                                                armazenado += 5;
                                            }
                                            else{
                                                score += (100-segundos) * level;
                                                armazenado += (100-segundos) * level;
                                            }
                                            clearInterval(contaTempo);
                                            contaTempo = setInterval(function(){ segundo() },1000);
                                            segundos = 0;
                                        }
                                    else{
                                        midlePoint = null;
                                        if(signal&&changeLives){
                                            score -= 5; 
                                            vidas -= 1;
                                        }
                                    }
                                }
                                else{
                                    if(!aceitaMidle){
                                        midlePoint = null;
                                        posto = false;
                                    }
                                    if(!sgm){
                                        line = new Phaser.Geom.Line();
                                    }
                                }
                            }
                            else{
                                if(changeLives){
                                    score -= 5;
                                    vidas -= 1;
                                }
                            }  
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres && quatro){
                            aceita=true;
                            certas = 2; 
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        
                        break;
                    case 16: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point,point4);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.x = 0.32 * game.config.width;

                            texto.setText([
                                'Traça a reta paralela a ' + letra1 + letra2 +'que passa por ' + letra3
                            ]);
                        }
                        else{
                            if(reta(point,point4,line) && um == true){
                                dois = true; 
                                texto.x = 0.38 * game.config.width;

                                texto.setText([
                                    'Traça o segmento de reta [' + letra2 + letra3 + ']'
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point3,point);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point3,point,line) && dois==true){
                                    tres = true; 
                                }
                                else{
                                    if(changeLives){
                                        score -= 5;
                                        vidas -= 1;
                                    }
                                    lines.pop();
                                    graphics.clear();
                                }
                                
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                            certas = 2;
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 17: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            um = true; 
                            texto.x = 0.32 * game.config.width;

                            texto.setText([
                                'Traça a reta paralela a ' + letra1 + letra2 + ' que passa por ' + letra3
                            ]);
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point4,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                        }
                        else{
                            if(reta(point4,point,line) && um == true){
                                dois = true;
                                texto.x = 0.3 * game.config.width;

                                texto.setText([
                                    'Marca um ponto da reta paralela a ' + letra1 + letra2 +' que passa por '+ letra3
                                ]); 
                                sgm = true; 
                                certas = 1; 
                            }
                            else{
                                lines.pop();
                            }
                                if (sgm){
                                    if(midlePoint!=null && sgm==true){
                                        
                                        posto = true;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    else{
                                        graphics.clear();
                                        posto = false;
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(line);
                                    }
                                    if(sgm){
                                        graphics.lineStyle(10, color);

                                        graphics.strokeLineShape(lines[0]);
                                        if(aceitaMidle){
                                            quatro = true;
                                            certas+=1;
                                            aceita = true;
                                            if (segundos >= 100){
                                                score += 5;
                                                armazenado += 5;
                                            }
                                            else{
                                                score += (100-segundos) * level;
                                                armazenado += (100-segundos) * level;
                                            }
                                            clearInterval(contaTempo);
                                            contaTempo = setInterval(function(){ segundo() },1000);
                                            segundos = 0;
                                        }
                                    else{
                                        midlePoint = null;
                                        if(signal){
                                            score -= 5; 
                                            vidas -= 1;
                                        }
                                    }
                                }
                                else{
                                    if(!aceitaMidle){
                                        midlePoint = null;
                                        posto = false;
                                    }
                                    if(!sgm){
                                        line = new Phaser.Geom.Line();
                                    }
                                }
                            }
                            else{
                                if(changeLives){
                                    score -= 5;
                                    vidas -= 1;
                                }
                            }  
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres && quatro){
                            aceita=true;
                            certas = 2; 
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        
                        break;
                    case 18: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point,point4);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.x = 0.32 * game.config.width;

                            texto.setText([
                                'Traça a reta perpendicular a ' + letra1 + letra2 +' que passa por ' + letra3
                            ]);
                        }
                        else{
                            if(reta(point,point4,line) && um == true){
                                dois = true; 
                                
                                texto.setText([
                                    'Traça a reta paralela a ' + letra1 + letra2 +' que passa por ' + letra3
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point4,point5);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(reta(point4,point5,line) && dois==true){
                                    tres = true; 
                                    texto.x = 0.38 * game.config.width;

                                    texto.setText([
                                        'Traça o segmento de reta [' + letra2 + letra3 + ']'
                                    ]);
                                    var pointsLine3 = getPointsOnLine(point3,point4);

                                    for(var i=0;i<pointsLine3.length;i++){
                                        pointsLine.push(pointsLine3[i]);
                                    }
                                }
                                else{
                                    if(segmentoReta(point3,point4,line)&&tres){
                                        quatro = true;    
                                    }
                                    else{
                                        if(changeLives){
                                            score -= 5;
                                            vidas -= 1;
                                        }
                                        lines.pop();
                                        graphics.clear();
                                    }
                                }
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres &&quatro){
                            aceita=true;
                            certas = 2;
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        break;
                    case 19: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            um = true; 
                            texto.x = 0.42 * game.config.width;

                            texto.setText([
                                'Traça a semirreta |' + letra1 + letra3 
                            ]);
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point2,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                        }
                        else{
                            if(comecaAntesAcabaNoPonto(point2,point,line) && um == true){
                                dois = true;
                                texto.x = 0.38 * game.config.width;

                                texto.setText([
                                    'Traça o segmento de reta [' + letra2 + letra4 +']'
                                ]); 
                                pointsLine = [];
                                var pointsLine2 = getPointsOnLine(point3,point4);
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point3,point4,line)&&dois){
                                    tres = true; 
                                    sgm = true; 
                                    certas = 1; 
                                    naoMexe = true;
                                    
                                    texto.x = 0.32 * game.config.width;

                                    texto.setText([
                                        'Marca um ponto alinhado com ' + letra1 + letra2 +' e que não pertence a '
                                        + '|' + letra1 + letra2 
                                    ]); 
                                }
                                else{
                                    if (sgm){
                                        if(midlePoint!=null && sgm==true){
                                            posto = true;
                                            graphics.lineStyle(10, color);

                                            graphics.strokeLineShape(line);
                                        }
                                        else{
                                            graphics.clear();
                                            posto = false;
                                            graphics.lineStyle(10, color);

                                            graphics.strokeLineShape(line);
                                        }
                                        if(sgm){
                                            graphics.lineStyle(10, color);

                                            graphics.strokeLineShape(lines[0]);
                                            if(aceitaMidle){
                                                var pointsLine2 = getPointsOnLine(point,point4);
                                                for(var i=0;i<pointsLine2.length;i++){
                                                    pointsLine.push(pointsLine2[i]);
                                                }
                                                texto.x = 0.32 * game.config.width;

                                                texto.setText([
                                                    'Traça a reta paralela a ' + letra1 + letra2 +' que passa por '
                                                    + letra3
                                                ]); 
                                                if(reta(point,point4,line)){
                                                    lines.push(line);
                                                    quatro = true; 
                                                    aceita = true; 
                                                    certas += 1; 
                                                    if (segundos >= 100){
                                                        score += 5;
                                                        armazenado += 5;
                                                    }
                                                    else{
                                                        score += (100-segundos) * level;
                                                        armazenado += (100-segundos) * level;
                                                    }
                                                    clearInterval(contaTempo);
                                                    contaTempo = setInterval(function(){ segundo() },1000);
                                                    segundos = 0;
                                                }
                                                else{
                                                    lines.pop();
                                                }
                                            }
                                        else{
                                            midlePoint = null;
                                            if(signal&&changeLives){
                                                score -= 5; 
                                                vidas -= 1;
                                            }
                                        }
                                    }
                                    else{
                                        if(!aceitaMidle){
                                            midlePoint = null;
                                            posto = false;
                                        }
                                        if(!sgm){
                                            line = new Phaser.Geom.Line();
                                        }
                                    }
                                    
                                }
                                else{
                                    lines.pop();
                                    if(changeLives){
                                        score -= 5;
                                        vidas -= 1;
                                    }
                                } 
                            }
                        }
                    }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres && quatro){
                            aceita=true;
                            certas = 2; 
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        
                        break;
                    case 20: 
                        var cinco = false; 
                        var seis = false; 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)&&(!um)){
                            um = true; 
                            texto.x = 0.42 * game.config.width;

                            texto.setText([
                                'Traça a semirreta |' + letra1 + letra3 
                            ]);
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point2,point);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                        }
                        else{
                            if(comecaAntesAcabaNoPonto(point2,point,line) && um == true && dois==false){
                                dois = true;
                                graphics.clear(); 
                                texto.x = 0.3 * game.config.width;

                                lines.pop();
                                texto.setText([
                                    'Traça a semirreta OPOSTA à semirreta com origem em ' + letra1 + ' e que passa por ' + letra2
                                ]); 
                                pointsLine = [];
                                var pointsLine2 = getPointsOnLine(point2,point);
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                            }
                            else{
                                if(comecaAntesAcabaNoPonto(point2,point,line)&&dois==true){
                                    tres = true; 
                                    sgm = true; 
                                    certas = 1; 
                                    
                                    for(var i= 0;i<lines.length;i++){
                                        graphics.strokeLineShape(lines[i]);
                                    }
                                    texto.x = 0.38 * game.config.width;

                                    texto.setText([
                                        'Traça o segmento de reta [' + letra2 + letra4 + ']'
                                    ]); 
                                    pointsLine = [];
                                    var pointsLine2 = getPointsOnLine(point3,point4);
                                    for(var i=0;i<pointsLine2.length;i++){
                                        pointsLine.push(pointsLine2[i]);
                                    }
                                }
                                else{
                                    if(segmentoReta(point3,point4,line)&&tres){
                                        quatro = true; 
                                        naoMexe = true;
                                        texto.x = 0.3 * game.config.width;

                                        texto.setText([
                                            'Marca um ponto alinhado com ' + letra1 + ' e '  + letra3 +' e que não pertence a |' + letra1 + letra3 
                                        ]); 
                                    }
                                    else{
                                        if (sgm && !cinco){ 
                                            if(midlePoint!=null && sgm==true){
                                                posto = true;
                                                graphics.lineStyle(10, color);

                                                graphics.strokeLineShape(line);
                                            }
                                            else{
                                                graphics.clear();
                                                posto = false;
                                                graphics.lineStyle(10, color);

                                                graphics.strokeLineShape(line);
                                            }
                                            if(sgm&& !cinco && !seis){
                                                graphics.lineStyle(10, color);

                                                graphics.strokeLineShape(lines[0]);
                                                if(aceitaMidle){
                                                    var pointsLine2 = getPointsOnLine(point2,point5);
                                                    for(var i=0;i<pointsLine2.length;i++){
                                                        pointsLine.push(pointsLine2[i]);
                                                    }
                                                    texto.x = 0.38 * game.config.width;

                                                    texto.setText([
                                                        'Traça a reta SUPORTE da semirreta |' + letra1 + letra5
                                                    ]); 

                                                    if(reta(point2,point5,line)&&quatro){
                                                        cinco=true;
                                                        texto.x = 0.32 * game.config.width;

                                                        texto.setText([
                                                            'Traça a reta paralela a ' + letra1 + letra2 + ' que passa por ' + letra3 
                                                        ]); 
                                                        var pointsLine2 = getPointsOnLine(point,point4);
                                                        for(var i=0;i<pointsLine2.length;i++){
                                                            pointsLine.push(pointsLine2[i]);
                                                        }
                                                    }
                                                    else{
                                                        if(reta(point,point4,line)){
                                                            seis = true; 
                                                            lines.push(line);
                                                            aceita = true; 
                                                            certas += 1; 
                                                            if (segundos >= 100){
                                                                score += 5;
                                                                armazenado += 5;
                                                            }
                                                            else{
                                                                score += (100-segundos) * level;
                                                                armazenado += (100-segundos) * level;
                                                            }
                                                            clearInterval(contaTempo);
                                                            contaTempo = setInterval(function(){ segundo() },1000);
                                                            segundos = 0;
                                                            }
                                                            else{
                                                                lines.pop();
                                                            }
                                                        }
                                                    }
                                            else{
                                                midlePoint = null;
                                                if(signal&&changeLives){
                                                    score -= 5; 
                                                    vidas -= 1;
                                                }
                                            }
                                        }
                                        else{
                                            if(!aceitaMidle){
                                                midlePoint = null;
                                                posto = false;
                                            }
                                            if(!sgm){
                                                line = new Phaser.Geom.Line();
                                            }
                                        }
                                    }
                                    else{
                                        lines.pop();
                                        if(changeLives){
                                            score -= 5;
                                            vidas -= 1;
                                        }
                                    } 
                                }
                            }
                        }
                    }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres && quatro && cinco && seis){
                            aceita=true;
                            certas = 2; 
                            if (segundos >= 100){
                                score += 5;
                                armazenado += 5;
                            }
                            else{
                                score += (100-segundos) * level;
                                armazenado += (100-segundos) * level;
                            }
                            clearInterval(contaTempo);
                            contaTempo = setInterval(function(){ segundo() },1000);
                            segundos = 0;
                        }
                        
                        break;
                }

                line = new Phaser.Geom.Line(); 
            }
            if (aceita){
                letras = pontosAleatorios(); 
                letra1 = letras[0];
                letra2 = letras[1];
                letra3 = letras[2];
                letra4 = letras[3];
                clearInterval(contaTempo);
                setTimeout(() =>{
                    letraa.text = letra1; 
                    letrab.text = letra2; 
                    letrac.text = letra3; 
                    letrad.text = letra4;
                    certas += 1;
                    naoMexe = false;
                    midlePoint = null;
                    changeLevel = false;
                    changeLives = true; 
                    f1 = false; 
                    f2 = false; 
                    contador = 0;
                    sgm = false;
                    aceitaMidle = false;
                    posto = false;
                    um = false;
                    dois = false; 
                    tres = false;
                    quatro = false; 
                    signal = false; 
                    lines = [];
                    j = 0;
                    letraa.x = x+15; 
                    letraa.y = y+15;
                    letrab.x = x1+15;
                    letrab.y = y1+15;
                    if (certas == 3){
                        graphics.clear();
                        clearInterval(contaTempo);
                        escondePontos([ponto1,ponto2,letraa,letrab,pontoExtra]);
                        escondePontos([ponto3,ponto4,letrac,letrad]);
                        certas = -1;
                        muda = true; 
                        f1 = false; 
                    }
                    else{
                        f1 = true;
                    }

                    if(f1 || f2){  
                        escondePontos([info,sim,nao]);
                        graphics.clear();
                        pon = generate2points(); 
                        point2 = pon[0];
                        point3 = pon[1];
                        x = point2.x; 
                        y = point2.y; 
                        x1 = point3.x; 
                        y1 = point3.y;
                        pointsLine = getPointsOnLine(point2,point3);
                        switch (level){
                            case 1: 
                                if(certas == 0){
                                  texto.setText([
                                        textoLevel(level) + letra1 + ' e ' + letra2
                                        ]);
                                }
                                if(certas == 1){
                                    texto.x = 0.4 * game.config.width;
                                    
                                    texto.setText([
                                        'Traça o segmento de reta [' + letra1 + letra2 + ']'
                                    ]);
                                }
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                break;
                            case 2: 
                                texto.x = 0.36 * game.config.width;

                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                point = generateExtraPoint([point2,point3],1);                    
                                var a = point.x;
                                var b = point.y;
                                clearInterval(contaTempo);
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                ponto3.x = a;
                                ponto3.y = b;
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break;
                            case 3: 
                                texto.x = 0.34 * game.config.width; 

                                clearInterval(contaTempo);
                                escondePontos([info]);

                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear(); 
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                var aux 
                                point = generateExtraPoint([point2,point3],1); 
                                point4 = generateExtraPoint([point2,point3,point],1);
                                var a = point.x;
                                var b = point.y; 
                                var px = point4.x; 
                                var py = point4.y;
                
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                ponto3.x = a;
                                ponto3.y = b;
                                ponto4.x = px; 
                                ponto4.y = py; 
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                letrad.x = px+15; 
                                letrad.y = py+15; 
                                segundos = 0;      
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break; 
                            case 4: 
                                texto.x = 0.34 * game.config.width; 

                                clearInterval(contaTempo);
                                escondePontos([info]);

                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear(); 
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                var aux = pontosParalelo(point2.x-50,point2.y,point3.x+80,point3.y+80); 
                                point = aux[1]; 
                                point4 = aux[0];
                                var a = point.x;
                                var b = point.y; 
                                var px = point4.x; 
                                var py = point4.y;
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                ponto3.x = a;
                                ponto3.y = b;
                                ponto4.x = px; 
                                ponto4.y = py; 
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                letrad.x = px+15; 
                                letrad.y = py+15; 
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;

                                break; 
                            case 5: 
                                texto.x = 0.39 * game.config.width; 

                                escondePontos([ponto3,ponto4,letrac,letrad]); 
                                if(certas == 0 || certas == 1){
                                    texto.setText([
                                        textoLevel(level) + letra1 + ' e ' + letra2
                                    ]);
                                    clearInterval(contaTempo);
                                    ponto1.x=x;
                                    ponto1.y=y;
                                    ponto2.x=x1;
                                    ponto2.y=y1;
                                    letraa.x = x+15;
                                    letraa.y = y+15;
                                    letrab.x = x1+15;
                                    letrab.y = y1+15;
                                }
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break;
                            case 6: 
                                
                                clearInterval(contaTempo);

                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                point = generateExtraPoint([point2,point3],1);                    
                                var a = point.x;
                                var b = point.y
                                
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                ponto3.x = a;
                                ponto3.y = b;
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break;
                            case 7: 
                                texto.x = 0.4 * game.config.width; 

                                clearInterval(contaTempo);
                                
                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                point = generateExtraPoint([point2,point3],1);                    
                                var a = point.x;
                                var b = point.y
                                
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                ponto3.x = a;
                                ponto3.y = b;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break;
                            case 8: 
                                texto.x = 0.4 * game.config.width; 
                                clearInterval(contaTempo);
                                texto.setText([
                                        textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear(); 
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                point = generateExtraPoint([point2,point3],1);
                                point4 = generateExtraPoint([point2,point3,point],1);
                                var a = point.x;
                                var b = point.y; 
                                var px = point4.x; 
                                var py = point4.y;
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                ponto3.x = a;
                                ponto3.y = b;
                                ponto4.x = px; 
                                ponto4.y = py; 
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                letrad.x = px+15; 
                                letrad.y = py+15; 
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break; 
                            case 9: 
                                escondePontos([ponto2,ponto3,letrac,letrad]);
                                if (certas==0){
                                    
                                    texto.setText([
                                        textoLevel(level)[0] + letra1 + textoLevel(level)[1] + letra2
                                    ]);
                                }
                                if(certas==1){
                                    texto.x = 0.42 * game.config.width; 

                                    texto.setText([
                                        'Traça a semirreta |' + letra1 + letra2 
                                    ]);
                                }
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                break;
                            case 10:
                                texto.x = 0.32 * game.config.width;
                                clearInterval(contaTempo);
                                texto.setText([
                                    textoLevel(level)[0] + letra1 + textoLevel(level)[1] + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                point = generateExtraPoint([point2,point3],1);                    
                                var a = point.x;
                                var b = point.y
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                ponto3.x = a;
                                ponto3.y = b;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break;
                            case 11: 
                                texto.x = 0.32 * game.config.width; 
                                clearInterval(contaTempo);
                                texto.setText([
                                textoLevel(level)[0] + letra1 + textoLevel(level)[1] + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                point = generateExtraPoint([point2,point3],1);                    
                                var a = point.x;
                                var b = point.y
                                
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                ponto3.x = a;
                                ponto3.y = b;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break;
                            case 12: 
                                texto.x = 0.32 * game.config.width; 
                                clearInterval(contaTempo);
                                texto.setText([
                                    textoLevel(level)[0] + letra1 + textoLevel(level)[1] + letra2
                                ]);
                                graphics.clear(); 
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                point = generateExtraPointAlign([point2,point3]);
                                point4 = generateExtraPoint([point2,point3],1); 
                                var a = point.x;
                                var b = point.y; 
                                var px = point4.x; 
                                var py = point4.y;
                
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                ponto3.x = a;
                                ponto3.y = b;
                                ponto4.x = px; 
                                ponto4.y = py; 
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                letrad.x = px+15; 
                                letrad.y = py+15; 
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break;    
                            case 13: 
                                texto.x = 0.39 * game.config.width; 

                                clearInterval(contaTempo);

                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                                var a = point.x;
                                var b = point.y; 
                                var px = point4.x; 
                                var py = point4.y;
                
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                ponto3.x = a;
                                ponto3.y = b;
                                ponto4.x = px; 
                                ponto4.y = py; 
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                letrac.x = a+15; 
                                letrac.y = b+15;
                                letrad.x = px+15; 
                                letrad.y = py+15; 
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break; 
                            case 14: 

                                texto.x = 0.39 * game.config.width; 

                                escondePontos([letrac,ponto3]);
                                clearInterval(contaTempo);
                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = perpendicular(point2,point3);    
                                ponto4.x = point4.x;
                                ponto4.y = point4.y; 
                                letrad.x = point4.x+15;
                                letrad.y = point4.y+15;
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break; 
                            case 15: 
                                texto.x = 0.39 * game.config.width; 

                                clearInterval(contaTempo);
                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = perpendicular(point2,point3);  
                                 
                                ponto4.x = point4.x;
                                ponto4.y = point4.y; 
                                letrad.x = point4.x+15;
                                letrad.y = point4.y+15;
                                letraa.x = x+15;
                                letraa.y = y+15;
                                letrab.x = x1+15;
                                letrab.y = y1+15;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break;
                            case 16:
                                texto.x = 0.39 * game.config.width; 

                                escondePontos([letrad,ponto4]);
                                clearInterval(contaTempo); 
                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                                ponto3.x = point.x;
                                ponto3.y = point.y; 
                                letrac.x = point.x+15;
                                letrac.y = point.y+15;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break;
                            case 17: 
                                texto.x = 0.39 * game.config.width; 

                                clearInterval(contaTempo); 
                                
                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                                ponto3.x = point.x;
                                ponto3.y = point.y; 
                                letrac.x = point.x+15;
                                letrac.y = point.y+15;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break; 
                            case 18: 
                                texto.x = 0.39 * game.config.width; 

                                clearInterval(contaTempo); 
                                
                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = perpendicular(point2,point3);
                                point5 = pontosParaleloF(point2.x,point2.y,point3.x,point3.y,point4);
                                ponto3.x = point4.x;
                                ponto3.y = point4.y; 
                                letrac.x = point4.x+15;
                                letrac.y = point4.y+15;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break;
                            case 19: 
                                texto.x = 0.39 * game.config.width; 

                                clearInterval(contaTempo); 
                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                                ponto3.x = point.x;
                                ponto3.y = point.y;
                                ponto4.x = point4.x;
                                ponto4.y = point4.y; 
                                letrac.x = point.x+15;
                                letrac.y = point.y+15;
                                letrad.x = point4.x+15;
                                letrad.y = point4.y+15;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0; 
                                break; 
                            case 20: 
                                texto.x = 0.39 * game.config.width; 

                                clearInterval(contaTempo); 
                                
                                texto.setText([
                                    textoLevel(level) + letra1 + ' e ' + letra2
                                ]);
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                point5 = generateExtraPointAlign([point2,point3]);
                                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                
                                ponto3.x = point.x;
                                ponto3.y = point.y;
                                ponto4.x = point4.x;
                                ponto4.y = point4.y; 
                                ponto5.x = point5.x; 
                                ponto5.y = point5.y; 
                                letrac.x = point.x+15;
                                letrac.y = point.y+15;
                                letrad.x = point4.x+15;
                                letrad.y = point4.y+15;
                                letrae.x = point5.x+15;
                                letrae.y = point5.y+15; 
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break; 
                        }
                    
                        ponto1.x=x;
                        ponto1.y=y;
                        ponto2.x=x1;
                        ponto2.y=y1;
                        letraa.x = x+15;
                        letraa.y = y+15;
                        letrab.x = x1+15;
                        letrab.y = y1+15;
            
                      
                    }
                },1000); 
                contaTempo = setInterval(function(){ segundo() },1000);
                f1 = false; 
                f2 = false;
                muda = false;
                aceita = false;
                disable = false; 
                 
            }
            else{
                graphics.clear();
                switch (level){
                    case 1:  
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }                      
                        break; 
                    case 2: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 3: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 4: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 5: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }                       
                        break;
                    case 6: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 7: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }     
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }                 
                        break; 
                    case 8: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }     
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }                 
                        break; 
                    case 9: 
                        graphics.clear();
                        graphics.lineStyle(10, color);

                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }                      
                        break; 
                    case 10: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 11: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 12: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 13: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        
                    case 14: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break; 
                    case 15: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 16: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 17: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 18: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                    break;
                    case 19: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }

                        break;
                    case 20: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(10, color);

                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                } 
                line = new Phaser.Geom.Line(); 
            }
        });
    }

    update(){
        timer.setText([segundos]);
        textScore.setText([score]);
        levelText.setText(['Nivel ' + level ]);
        
        if(score>0) {
            textScore.x = 0.89 * game.config.width;
            if (score>99){
                textScore.x = 0.88 * game.config.width;
                if(score>999){
                    textScore.x = 0.86 * game.config.width;
                    if(score>9999) {
                        textScore.x = 0.85 * game.config.width;
                        if(score>99999) {
                            textScore.x = 0.83 * game.config.width;
                        }
                    }
                }
                
            }
        }
        else{
            textScore.x = 0.9 * game.config.width;
        }

        if(segundos>9) {
            timer.x = 0.060 * game.config.width;
            if(segundos>99) {
                timer.x = 0.044 * game.config.width;
                if(segundos>999) {
                    timer.x = 0.016 * game.config.width;
                    if(segundos>9999) {
                        timer.x = 0.022 * game.config.width;
                    }
                }
            }
        }
        
        switch (vidas){
            case 0: 
                this.coracaocheio3.visible = false;
                this.coracaocheio2.visible = false;
                this.coracaocheio1.visible = false;
                this.coracaovazio1.visible = true;
                this.coracaovazio2.visible = true;
                this.coracaovazio3.visible = true;
                this.scene.transition({ target: 'Menu', duration: 100 });  
                reset();
                aux = false;

            case 1: 
                this.coracaocheio3.visible = false;
                this.coracaocheio2.visible = false;
                this.coracaovazio2.visible = true;
                this.coracaovazio3.visible = true;
            case 2: 
                this.coracaocheio3.visible = false;
                this.coracaovazio3.visible = true;
        }

        if(certas==2){
            this.btHome.disableInteractive();
            setTimeout(() =>{
            aux = true;},1000);
        }
        
        if(level==20 && certas == 2){
            this.scene.transition({ target: 'Menu', duration: 100 });
            reset();
            
        }
        
        if(muda){
            this.btHome.disableInteractive();
            aux = true; 
            
            if(level>20){
                this.scene.transition({ target: 'Menu', duration: 100 });  
                reset();
            }
            else{
                info.x = 0.5 * game.config.width;
                info.y = 0.6 *game.config.height;
                sim.x = 0.56 * game.config.width;
                sim.y = 0.70 * game.config.height;
                nao.x = 0.44 * game.config.width;
                nao.y = 0.70 * game.config.height;
            }
        }

        if((aux&&!muda)){
            this.btHome.setInteractive({ useHandCursor: true });
            aux = false; 
        }
       
        if(score<=5){
            score = 0;
        }
    }
}

function getPretendedLine (level,ponto1,ponto2){
    var linha = new Phaser.Geom.Line(); 
    var x = ponto1.x; 
    var y = ponto1.y; 
    var x1 = ponto2.x; 
    var y1 = ponto2.y; 
    var lineWanted = new Phaser.Geom.Line(); 
    var lineWantedInverse = new Phaser.Geom.Line(); 

    lineWanted.setTo(x,y,x1,y1);
    lineWantedInverse.setTo(x1,y1,x,y);


    var angle = Phaser.Geom.Line.Angle(lineWanted);
    var angleInverse = Phaser.Geom.Line.Angle(lineWantedInverse);
    var lineAuxInverse = new Phaser.Geom.Line();
    var lineaux =new Phaser.Geom.Line();   
    
    Phaser.Geom.Line.SetToAngle(lineAuxInverse,x1,y1,angleInverse,3000);
    Phaser.Geom.Line.SetToAngle(lineaux,x,y,angle,3000);

    var otherLine=new Phaser.Geom.Line(); 
    Phaser.Geom.Line.SetToAngle(otherLine,x,y,angleInverse,3000);

    var otherLine2=new Phaser.Geom.Line(); 
    Phaser.Geom.Line.SetToAngle(otherLine2,x1,y1,angle,3000);

    var end = lineaux.getPointB();
    var end2 = lineAuxInverse.getPointB(); 
    var lineTeste = new Phaser.Geom.Line();   

    switch (level){
        case 1: 
            linha.setTo(ponto1.x,ponto1.y,ponto2.x,ponto2.y);
            var ang = Phaser.Geom.Line.Angle(linha);
            var nova =new Phaser.Geom.Line(); 
            Phaser.Geom.Line.SetToAngle(nova,x,y,ang,dist(ponto1.x,ponto1.y,ponto2.x,ponto2.y)-80);

            var inversa = new Phaser.Geom.Line();
            inversa.setTo(ponto2.x,ponto2.y,ponto1.x,ponto1.y);

            var angInv = Phaser.Geom.Line.Angle(inversa);
            var novaInv =new Phaser.Geom.Line();

            Phaser.Geom.Line.SetToAngle(novaInv,x1,y1,angInv,dist(ponto1.x,ponto1.y,ponto2.x,ponto2.y)-80);
            var acaba1 = nova.getPointB(); 
            var acaba2 = novaInv.getPointB();
            var pretended = new Phaser.Geom.Line();
            pretended.setTo(acaba1.x,acaba1.y,acaba2.x,acaba2.y);

            var pontos = pretended.getPoints(400);

            return pontos;
        case 5: 
            lineTeste.setTo(end.x,end.y,end2.x,end2.y);
            return lineTeste.getPoints(1200);
        case 7: 
            var pontos = []; 
            var pontosAux = otherLine2.getPoints(100);
            var pontosAuxInv = otherLine.getPoints(100);
            
            for(var i=0;i<pontosAux.length;i++){
                pontos.push(pontosAux[i]);
            }
            for(var i=0;i<pontosAuxInv.length;i++){
                pontos.push(pontosAuxInv[i]);
            }
            
            return pontos; 
        case 8: 
            var pontos = []; 
            var pontosAux = otherLine2.getPoints(100);
            var pontosAuxInv = otherLine.getPoints(100);
            
            for(var i=0;i<pontosAux.length;i++){
                pontos.push(pontosAux[i]);
            }
            for(var i=0;i<pontosAuxInv.length;i++){
                pontos.push(pontosAuxInv[i]);
            }
            
            return pontos; 
        case 9: 
            return lineAuxInverse.getPoints(300);
        case 13: 
            Phaser.Geom.Line.SetToAngle(lineaux,x1,y1,angle,1000);
            return lineaux.getPoints(300);
        case 15: 
            linha.setTo(ponto1.x,ponto1.y,ponto2.x,ponto2.y);
            var ang = Phaser.Geom.Line.Angle(linha);
            var nova =new Phaser.Geom.Line(); 
            Phaser.Geom.Line.SetToAngle(nova,x,y,ang,2000);

            var inversa = new Phaser.Geom.Line();
            inversa.setTo(ponto2.x,ponto2.y,ponto1.x,ponto1.y);

            var angInv = Phaser.Geom.Line.Angle(inversa);
            var novaInv =new Phaser.Geom.Line();

            Phaser.Geom.Line.SetToAngle(novaInv,x1,y1,angInv,2000);
            var acaba1 = nova.getPointB(); 
            var acaba2 = novaInv.getPointB();
            var pretended = new Phaser.Geom.Line();
            pretended.setTo(acaba1.x,acaba1.y,acaba2.x,acaba2.y);

            var pontos = pretended.getPoints(400);

        return pontos;
        case 19: 
            Phaser.Geom.Line.SetToAngle(lineaux,x1,y1,angle,1000);
            return lineaux.getPoints(300);
        case 20: 
            Phaser.Geom.Line.SetToAngle(lineaux,x1,y1,angle,1000);
            return lineaux.getPoints(300);
    }
}

function segmentoReta(a,b,line){ //Verifica se é um segmento de reta de A para b 

    if (line.getPointB().x == b.x && line.getPointB().y == b.y && line.getPointA().x==a.x  && line.getPointA().y==a.y){
        return true; 
    }
    if (line.getPointA().x == b.x && line.getPointA().y == b.y && line.getPointB().x==a.x  && line.getPointB().y==a.y){
        return true; 
    }

    return false;
}

function midpoint(a,b){
    lineAux = new Phaser.Geom.Line(); 
    lineAux.setTo(a.x,a.y,b.x,b.y);
    var midPoint = Phaser.Geom.Line.GetMidPoint(lineAux);
    return midPoint;
}

function semiReta(a,b,line){ //Verifica se é semi-reta que começa em a e passa em b
    lineAux = new Phaser.Geom.Line(); 
    lineAux.setTo(a.x,a.y,b.x,b.y);
    var midPoint = Phaser.Geom.Line.GetMidPoint(lineAux);
    var pontos = line.getPoints(1000); 
    var continua = false;
    var continua1 = false;
    var continua2 = false;
    var continua3 = false; 
    var inicio = lineAux.getPointA();
    var fim = lineAux.getPointB();

    for (var i=0;i<pontos.length;i++){
        if (pontos[i].x <= midPoint.x+2 && pontos[i].x >= midPoint.x-2 && pontos[i].y <= midPoint.y+2 && pontos[i].y >= midPoint.y-2){
            continua1 = true;
        }
        if (pontos[i].x <= inicio.x+2 && pontos[i].x >= inicio.x-2 && pontos[i].y <= inicio.y+2 && pontos[i].y >= inicio.y-2){
            continua2 = true;
        }
        if (pontos[i].x <= fim.x+2 && pontos[i].x >= fim.x-2 && pontos[i].y <= fim.y+2 && pontos[i].y >= fim.y-2){
            continua3 = true; 
        }
    }
    
    if(continua1&&continua2&&continua3){
        continua=true;
    }
    if(continua){
        if (pontoEsquerda(a,b)== a && line.getPointA().x==a.x &&  line.getPointA().y==a.y && line.getPointB().x>b.x){
            return true; 
        }
        else{
            if (pontoEsquerda(a,b) == b && line.getPointA().x==a.x &&  line.getPointA().y==a.y && line.getPointB().x<b.x){
                return true;
            }
            else{
                if (pontoDeCima(a,b)==a && line.getPointA().x==a.x &&  line.getPointA().y==a.y && line.getPointB().y<b.y){
                    return true;
                }
                else{
                    if (pontoDeCima(a,b)==b && line.getPointA().x==a.x &&  line.getPointA().y==a.y && line.getPointB().y>b.y){
                        return true;
                    }
                }
            }
        }
    }
    return false; 
}  

function comecaAntesAcabaNoPonto(a,b,line){ //começa antes de a e acaba em b
    lineAux = new Phaser.Geom.Line(); 
    lineAux.setTo(a.x,a.y,b.x,b.y);
    var midPoint = Phaser.Geom.Line.GetMidPoint(lineAux);
    var pontos = line.getPoints(1000); 
    var continua = false;
    var continua1 = false;
    var continua2 = false;
    var continua3 = false; 
    var inicio = lineAux.getPointA();
    var fim = lineAux.getPointB();

    for (var i=0;i<pontos.length;i++){
        if (pontos[i].x <= midPoint.x+2 && pontos[i].x >= midPoint.x-2 && pontos[i].y <= midPoint.y+2 && pontos[i].y >= midPoint.y-2){
            continua1 = true;
        }
        if (pontos[i].x <= inicio.x+2 && pontos[i].x >= inicio.x-2 && pontos[i].y <= inicio.y+2 && pontos[i].y >= inicio.y-2){
            continua2 = true;
        }
        if (pontos[i].x <= fim.x+2 && pontos[i].x >= fim.x-2 && pontos[i].y <= fim.y+2 && pontos[i].y >= fim.y-2){
            continua3 = true; 
        }
    }
    
    if(continua1&&continua2&&continua3){
        continua=true;
    }

    if(continua){
        if(line.getPointB().x == b.x && line.getPointB().y==b.y && pontoEsquerda(a,b) == a && line.getPointA().x<a.x){
            return true;
        }
        else{
            if(line.getPointB().x == b.x && line.getPointB().y==b.y && pontoEsquerda(a,b) == b && line.getPointA().x>a.x){
                return true;
            }
            else{
                if(line.getPointB().x == b.x && line.getPointB().y==b.y && pontoDeCima(a,b) == a && line.getPointA().y>a.y){
                    return true; 
                }
                else{
                    if (line.getPointB().x == b.x && line.getPointB().y==b.y && pontoDeCima(a,b) == b && line.getPointA().y<a.y){
                        return true; 
                    }
                }
            }
        }
    }
    return false; 
}

function reta(a,b,line){ //Verifica se é uma reta que passa em a e em b 
    lineAux = new Phaser.Geom.Line(); 
    lineAux.setTo(a.x,a.y,b.x,b.y);
    var midPoint = Phaser.Geom.Line.GetMidPoint(lineAux);
    var inicio = lineAux.getPointA(); 
    var fim = lineAux.getPointB(); 
    var pontos = line.getPoints(1000); 
    var continua = false;
    var continua1 = false;
    var continua2 = false;
    var continua3 = false; 

    for (var i=0;i<pontos.length;i++){
        if (pontos[i].x <= midPoint.x+2 && pontos[i].x >= midPoint.x-2 && pontos[i].y <= midPoint.y+2 && pontos[i].y >= midPoint.y-2){
            continua1 = true;
        }
        if (pontos[i].x <= inicio.x+2 && pontos[i].x >= inicio.x-2 && pontos[i].y <= inicio.y+2 && pontos[i].y >= inicio.y-2){
            continua2 = true;
        }
        if (pontos[i].x <= fim.x+2 && pontos[i].x >= fim.x-2 && pontos[i].y <= fim.y+2 && pontos[i].y >= fim.y-2){
            continua3 = true; 
        }
    }
    if(continua1&&continua2&&continua3 &&  dist(a.x,a.y,b.x,b.y) < dist(line.getPointA().x,
    line.getPointA().y,line.getPointB().x,line.getPointB().y)){
        continua=true;
        
    }

    if(continua){
        if (pontoEsquerda(a,b) == a && ((line.getPointA().x<a.x-20 && line.getPointB().x>b.x + 20) || (line.getPointA().x>b.x+20 &&  
            line.getPointB().x<a.x-20))){
            return true; 
        }
        else{
            if (pontoEsquerda(a,b) == b && ((line.getPointA().x>a.x+20 && line.getPointB().x<b.x-20) || (line.getPointA().x<b.x-20 &&  
            line.getPointB().x>a.x+20))){
                return true;
            }
            else{
                if (pontoDeCima(a,b)==a && ((line.getPointA().y>a.y && line.getPointB().y<b.y)|| (line.getPointA().y<b.y &&  
                line.getPointB().y>a.y))){
                    return true;
                }
                else{
                    if (pontoDeCima(a,b)==b && ((line.getPointA().y<a.y && line.getPointB().y>b.y)|| (line.getPointA().y>b.y &&  
                    line.getPointB().y<a.y))){
                        return true;
                    }
                }
            }
        }
    }
    return false; 
}


function getPointsOnLine(a,b){
    x = a.x; 
    y = a.y; 
    x1 = b.x; 
    y1 = b.y; 

    var lineWanted = new Phaser.Geom.Line(); 
    var lineWantedInverse = new Phaser.Geom.Line(); 

    lineWanted.setTo(x,y,x1,y1);
    lineWantedInverse.setTo(x1,y1,x,y);


    var angle = Phaser.Geom.Line.Angle(lineWanted);
    var angleInverse = Phaser.Geom.Line.Angle(lineWantedInverse);
    var lineAuxInverse = new Phaser.Geom.Line();
    var lineaux =new Phaser.Geom.Line();   
    
    Phaser.Geom.Line.SetToAngle(lineAuxInverse,x1,y1,angleInverse,3000);
    Phaser.Geom.Line.SetToAngle(lineaux,x,y,angle,3000);


    var end = lineaux.getPointB();
    var end2 = lineAuxInverse.getPointB(); 
    var lineTeste =new Phaser.Geom.Line();   

    lineTeste.setTo(end.x,end.y,end2.x,end2.y);
    return lineTeste.getPoints(1800);
}

function dist(x,y,x1,y1){
    let ret = ((x1-x)^2 + (y1-y)^2)
    if (ret<0){
        return -ret
    }
    else{
    return ret
    }
}

function pontoDeCima(a,b){
    if (a.y>b.y){
        return a;
    }
    else{
        return b; 
    }
}

function pontoEsquerda(a,b){
    if (a.x>b.x){
        return b;
    }
    else{
        return a; 
    }
}

function pontosParalelo(x,y,x1,y1){
    
    var linha = new Phaser.Geom.Line(x, y, x1, y1);
    var angle = Phaser.Geom.Line.Angle(linha);
    var paralela = new Phaser.Geom.Line();
    var k = -500;
    Phaser.Geom.Line.SetToAngle(paralela,x,y -k,angle,dist(x,y,x1,y1));
    var pontoA = paralela.getPointA();
    var pontoB = paralela.getPointB(); 
    var z = dist(x,y,x1,y1);
    var iterations = 0; 
    var acaba = false;
    while((pontoB.y<400 || pontoB.y>800 || pontoA.y<400 || pontoA.y>800||dist(pontoA.x,pontoA.y,x,y)<=180)&&!acaba){

        iterations += 1; 
        if(iterations==200){
            if(y>600){
                if(y1>y){
                    Phaser.Geom.Line.SetToAngle(paralela,x,y-100,angle,z);
                }
                else{
                    Phaser.Geom.Line.SetToAngle(paralela,x,y1-100,angle,z);
                }
            }
            else{
                if(y1>y){
                    if(y1<700){
                        Phaser.Geom.Line.SetToAngle(paralela,x,y1+100,angle,z);
                    }
                    else{
                        Phaser.Geom.Line.SetToAngle(paralela,x,y+100,angle,z);
                    }
                }
                else{
                    Phaser.Geom.Line.SetToAngle(paralela,x,y+100,angle,z);
                }
            }
            pontoA = paralela.getPointA();
            pontoB = paralela.getPointB();
            acaba = true; 
        }
        else{
            k+=30;
            Phaser.Geom.Line.SetToAngle(paralela,x,y +k,angle,z);
            pontoA = paralela.getPointA();
            pontoB = paralela.getPointB();
            console.log(pontoA.x,pontoA.y);
            console.log(pontoB.x,pontoB.y);
        }
    }
    
    return [pontoA,pontoB];
}

function pontosParaleloF(x,y,x1,y1,pF){
    
    var linha = new Phaser.Geom.Line(x, y, x1, y1);
    var angle = Phaser.Geom.Line.Angle(linha);
    var paralela = new Phaser.Geom.Line();
    Phaser.Geom.Line.SetToAngle(paralela,pF.x,pF.y,angle,80);
    var points = paralela.getPoints(); 
    var pontoA = paralela.getPointA();
    var pontoB = paralela.getPointB(); 
    return pontoB;
}

function escondePontos(pontos){
    for (var i=0; i<pontos.length;i++){
        pontos[i].x = 10000; 
        pontos[i].y = 10000;
    }
}

function entre (ponto,ponto2){
    if (ponto.x<=ponto2.x+80 && ponto.x>=ponto2.x-80 && ponto.x<=ponto2.y+80 && ponto.y >= ponto2.y-80 ) return false; 
    return true;
}

function perpendicular(ponto1,ponto2){
    var pointerLine = new Phaser.Geom.Line();
    pointerLine.setTo(ponto1.x,ponto1.y,ponto2.x,ponto2.y);
    var normalAngle = Phaser.Geom.Line.NormalAngle(pointerLine);
    var ponto = pointerLine.getRandomPoint(); 
    while((dist(ponto.x,ponto.y,ponto1.x,ponto1.y)<180 && dist(ponto.x,ponto.y,ponto2.x,ponto2.y)<180) || !entre(ponto,ponto1) ||
    !entre(ponto,ponto2)
    ){    
        ponto = pointerLine.getRandomPoint(); 
    }
    var perp = new Phaser.Geom.Line();
    var perpInverse = new Phaser.Geom.Line();
    var distancia = 300; 
    Phaser.Geom.Line.SetToAngle(perp,ponto.x,ponto.y,normalAngle,distancia);
    Phaser.Geom.Line.SetToAngle(perpInverse,ponto.x,ponto.y,normalAngle+3.14,distancia);
    var pontoA = perp.getPointA();
    var pontoB = perp.getPointB(); 

    while (pontoB.x>1700 ||pontoA.x>1700 ||pontoB.y<400 || pontoB.y>800 || (dist(pontoB.x,pontoB.y,ponto1.x,ponto1.y)<180 && dist(pontoB.x,pontoB.y,ponto2.x,ponto2.y)<180) ||!entre(ponto,ponto1) ||
    !entre(ponto,ponto2) ){
        distancia -= 10;
        Phaser.Geom.Line.SetToAngle(perp,ponto.x,ponto.y,normalAngle,distancia);
        pontoA = perp.getPointA();
        pontoB = perp.getPointB(); 
    }

    return [pontoA,pontoB];
}

function pontosAleatorios(){
    let alphabet;

    for(i=9,alphabet="";++i<36;)
        alphabet += i.toString(36).toUpperCase();
    var rand = Math.random()* 23; 

    while(alphabet[Math.floor(rand)]=='Z'||alphabet[Math.floor(rand)]=='X'|| alphabet[Math.floor(rand)]=='Y'
    || alphabet[Math.floor(rand)]=='W'||alphabet[Math.floor(rand)]=='V'){
        rand = 0; 
    }
    return [alphabet[Math.floor(rand)],alphabet[Math.floor(rand)+1],
    alphabet[Math.floor(rand)+2]
    ,alphabet[Math.floor(rand)+3],alphabet[Math.floor(rand)+4]];
}

function generate2points(){
    let x = Math.random()*(2024 - 300) + 300;
    let y = Math.random()*(1200 - 300) + 300;
    let x1 =Math.random()*(2024 - 300) + 300;
    let y1 = Math.random()*(1200 - 300) + 300;

    while (x>1700||x1>1700 || y > 800 || y<400 || y1>800 ||y1<400 || x==x1 || x==y || x==y1 || x1==y1 || y==x1 || y==y1 || dist(x,y,x1,y1)<=300){
        x = Math.random()*(2024 - 300) + 300;
        y = Math.random()*(1200 - 300) + 300;
        x1 = Math.random()*(2024 - 300) + 300;
        y1 = Math.random()*(1200 - 300) + 300;
    }
    var point2 = new Phaser.Geom.Point(x, y);
    var point3 = new Phaser.Geom.Point(x1, y1);
    return [point2,point3];
}

function generateExtraPointAlign(pontos){
    var linha = new Phaser.Geom.Line(pontos[0].x, pontos[0].y, pontos[1].x, pontos[1].y);

    var ponto = linha.getRandomPoint(); 

    while(dist(ponto.x,ponto.y,pontos[0].x,pontos[0].y)<80 ||dist(ponto.x,ponto.y,pontos[1].x,pontos[1].y)<80){
        ponto = linha.getRandomPoint(); 
    }
    return ponto;
}

function generateExtraPoint(pontos,quantos){
    var point2; var point3; 
    point2 = pontos[0]; 
    point3 = pontos[1];
    var point = pontos[2];
    var x = point2.x; 
    var y = point2.y; 
    var x1 = point3.x; 
    var y1 = point3.y;
    var a1; 
    var b1;

    var a = Math.random()*(2024 - 300) + 300;
    var b = Math.random()*(1200 - 300) + 300;
    var teste = pontoDeCima(point2,point3); 
    var teste2 = point2; 
    if(teste==point2){
        teste2 = point3; 
    }
    var iterations = 0; 
    var continua = true; 

    if(point==null){
        while(( (b<y+100 && b>y-100) || (b<y1+80 && b>y1-80) ||a>1700||b>800 || b<400 ||a==x || a==x1 || b==y || b==y1 || dist(a,b,point2.x,point2.y)<=180 || dist(a,b,point3.x,point3.y)<=180 ||(b<=teste.y+80 && b>=teste2.y-80))&&continua){
            a = Math.random()*(2024 - 300) + 300;
            b = Math.random()*(1200 - 300) + 300;
            iterations += 1; 
            if(iterations>300){
                continua = false; 
                a = x+y/2; 
                if(pontoDeCima(point2,point3).y<600){
                    b = pontoDeCima(point2,point3).y+180;
                }
                else{
                    if(teste2.y>600){
                        b = teste2.y - 200; 
                    }
                    else{
                        b = teste2.y + 100; 
                    }
                }
            }
        }
        var ponto = new Phaser.Geom.Point(a, b);
        return ponto; 
    }
    
    
    var iterations = 0; 
    var continua = true; 

    if(point!=null){
        a1 = point.x;
        b1=point.y;        
        while(( (b<y+80 && b>y-80) || (b<y1+80 && b>y1-80) || a>1700||b>800 || b<400 ||a==x || a==x1 || b==y || b==y1 || a==a1 || a==b1 || dist(a,b,point2.x,point2.y)<=180 || dist(a,b,point3.x,point3.y)<=180 || dist(a,b,point.x,point.y)<=180||(b<=teste.y+80 && b>=teste2.y-80))&&continua){
            a = Math.random()*(2024 - 300) + 300;
            b = Math.random()*(1200 - 300) + 300;
            iterations += 1; 
            if(iterations>300){
                continua = false; 
                a = pontoEsquerda(point3,point).x+80; 
                if(pontoDeCima(point2,point3).y<600){
                    b = pontoDeCima(point2,point3).y+180;
                }
                else{
                    if(teste2.y>600){
                        b = teste2.y - 200; 
                    }
                    else{
                        b = teste2.y + 100; 
                    }
                }
            }
        }
    }

    var ponto = new Phaser.Geom.Point(a, b);

    return ponto; 
}

function textoLevel(level){
    
    switch (level){
        case 1: 
            return 'Traça o segmento de reta com extremos em ';
        case 2:
            return 'Traça o segmento de reta com extremos em ';
        case 3: 
            return 'Traça o segmento de reta com extremos em ';
        case 4: 
            return 'Traça o segmento de reta com extremos em ';
        case 5: 
            return 'Traça a reta que passa por ';
        case 6:
            return 'Traça a reta que passa por ';
        case 7: 
            return 'Traça a reta que passa por ';
        case 8: 
            return 'Traça a reta que passa por ';
        case 9: 
            return ['Traça a semirreta com origem ',' e que passa por '];
        case 10: 
            return ['Traça a semirreta com origem ',' e que passa por '];
        case 11: 
            return ['Traça a semirreta com origem ',' e que passa por '];
        case 12: 
            return ['Traça a semirreta OPOSTA à semirreta com origem em ',' ne que passa por '];
        case 13: 
            return 'Traça a reta que passa por ';
        case 14: 
            return 'Traça a reta que passa por ';
        case 15: 
            return 'Traça a reta que passa por ';
        case 16: 
            return 'Traça a reta que passa por ';
        case 17: 
            return 'Traça a reta que passa por ';
        case 18: 
            return 'Traça a reta que passa por ';
        case 19: 
            return 'Traça a reta que passa por ';
        case 20: 
            return 'Traça a reta que passa por ';
    }
}

function reset(){
    midlePoint = null;
    f1 = false; 
    f2 = false; 
    contador = 0;
    sgm = false;
    aceitaMidle = false;
    posto = false;
    um = false;
    dois = false; 
    tres = false;
    quatro = false; 
    lines = [];
    j = 0;
    certas = 0;
    score = 0;
    pause = false; 
    level = 1; 
    armazenado = 0; 
    aux = false; 
    aceita = false; 
    vidas = 3; 
    signal = false; 
    clearInterval(contaTempo);
}  