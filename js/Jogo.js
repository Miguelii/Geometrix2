var segundos = 0;
function segundo(){
    segundos++;
}

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
    }
        
    create (){
        contaTempo = setInterval(function(){ segundo() },1000);
        segundos = 0;
        
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'background');
        this.background.setScale(0.79);
        this.titulo1 = this.add.sprite(0.5 * game.config.width, 0.15 *game.config.height, 'titulo1');
        this.titulo1.setScale(0.6);
        info = this.add.sprite(-10000,-100000, 'info');
        info.setScale(0.7);

        var color =  0xffffff;
        var texto = this.add.text(850, 150, '', { fontFamily: 'font1',align: 'right'});
        
        texto.setFontSize(15);

        
        var graphics = this.add.graphics({fillStyle: { color: 0x2266aa } });

        // menu/bases
        this.base1=this.add.sprite(0.91 * game.config.width, 100, "base1");
        this.base1.setScale(0.5);
        this.base4=this.add.sprite(0.09 * game.config.width, 100, "base4");
        this.base4.setScale(0.5);

        this.btHome = this.add.sprite(0.05 * game.config.width, 535, "btHome");
        this.btHome.setScale(0.5);
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
        this.infoexit = this.add.sprite(0.5 * game.config.width, 0.55 *game.config.height, "infoexit");
        this.infoexit.setScale(0.7);
        this.infoexit.visible = false;
        this.infoexit.name = 'infoexit';

        this.btsim = this.add.sprite(0.56 * game.config.width, 0.68 * game.config.height, 'btsim');
        this.btsim.setScale(0.45);
        this.btsim.visible = false;
        this.btsim.name = 'btsim';

        this.btnao = this.add.sprite(0.44 * game.config.width, 0.68 * game.config.height, 'btnao');
        this.btnao.setScale(0.45);
        this.btnao.visible = false;
        this.btnao.name = 'btnao';

        timer = this.add.text(0.065 * game.config.width, 55, segundos,{
            fontFamily: 'font1',
        });
        
        this.clock = this.add.sprite(0.12 * game.config.width, 60, 'clock');
        this.clock.setScale(0.4);

        // --- vidas ---
        //Coracao cheio
        this.coracaocheio1 = this.add.sprite(0.18 * game.config.width, 0.17 * game.config.height, 'coracao1');
        this.coracaocheio1.setScale(0.3);

        this.coracaocheio2 = this.add.sprite(0.22 * game.config.width, 0.17 * game.config.height, 'coracao1');
        this.coracaocheio2.setScale(0.3);

        this.coracaocheio3 = this.add.sprite(0.26 * game.config.width, 0.17 * game.config.height, 'coracao1');
        this.coracaocheio3.setScale(0.3);

        //Coracao vazio
        this.coracaovazio1 = this.add.sprite(0.18 * game.config.width, 0.17 * game.config.height, 'coracao2');
        this.coracaovazio1.setScale(0.3);
        this.coracaovazio1.visible = false;

        this.coracaovazio2 = this.add.sprite(0.22 * game.config.width, 0.17 * game.config.height, 'coracao2');
        this.coracaovazio2.setScale(0.3);
        this.coracaovazio2.visible = false;

        this.coracaovazio3 = this.add.sprite(0.26 * game.config.width, 0.17 * game.config.height, 'coracao2');
        this.coracaovazio3.setScale(0.3);
        this.coracaovazio3.visible = false;


        textScore = this.add.text(0.88 * game.config.width, 55, score + " pts",{
            fontFamily: 'font1',
        });

        sim = this.add.sprite(-10000,-100000, 'btsim');
        nao = this.add.sprite(-10000,-100000, 'btnao');
        sim.name = 'sim';
        nao.name = 'nao';
        nao.setScale(0.45);
        sim.setScale(0.45);
        sim.setInteractive({ useHandCursor: true});
        nao.setInteractive({ useHandCursor: true });
        sim.on('pointerdown', () => {
            level += 1;
            armazenado = 0;
            f2 = true;
            aceita = true;
        });
        nao.on('pointerdown', () => {
            score -= armazenado;
            aceita = true; 
            segundos = 0;
            certas = -1;
        });
        nao.on('pointerup', () => {
            armazenado = 0;
        });
        
        var letras = pontosAleatorios(); 
        var letra1 = letras[0];
        var letra2 = letras[1];
        var letra3 = letras[2];
        var letra4 = letras[3];
        
        var pon = generate2points(); 
        var point2 = pon[0];
        var point3 = pon[1];

        var x = point2.x;
        var y = point2.y; 
        var x1 = point3.x; 
        var y1 = point3.y; 

        var letraa = this.add.text(x+5,y+5,letra1,{
            fontFamily: 'font1',
        });
        var letrab = this.add.text(x1+5,y1+5,letra2,{
            fontFamily: 'font1',
        });
        var letrac = this.add.text(-10000,-10000,letra3,{
            fontFamily: 'font1',
        });;
        var letrad = this.add.text(-10000,-10000,letra4,{
            fontFamily: 'font1',
        });;
        
        var ponto1 = this.add.sprite(x,y, "ponto");
        var ponto2 = this.add.sprite(x1,y1, "ponto");
        var ponto3 = this.add.sprite(10000,10000,"ponto");
        var ponto4 = this.add.sprite(10000,10000,"ponto");

        ponto1.setScale(0.5);
        ponto2.setScale(0.5);
        ponto3.setScale(0.5);
        ponto4.setScale(0.5);

        var line = new Phaser.Geom.Line(); 
        var point; 
        var point4;
        var pointsLine = getPointsOnLine(point2,point3);

        switch(level){
            case 1: 
                texto.setText([
                'Level: ' + level,
                'Segmento de reta: ]' + letra1 + letra2 + '['
                ]);
                break;
            case 2: 
                texto.setText([
                    'Level: ' + level,
                    'Segmento de reta: ]' + letra1 + letra2 + '['
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
                letraa.x = x+5;
                letraa.y = y+5;
                letrab.x = x1+5;
                letrab.y = y1+5;
                letrac.x = a+5; 
                letrac.y = b+5;
                ponto3.x = a;
                ponto3.y = b;
                segundos = 0;
                break;
            case 3: 
                texto.setText([
                'Level: ' + level,
                'Segmento de reta: ]' + letra1 + letra2 + '['
                ]);
                graphics.clear(); 
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                var aux = generateExtraPoint([point2,point3],2); 
                point = aux[0]; 
                point4 = aux[1];
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
                letraa.x = x+5;
                letraa.y = y+5;
                letrab.x = x1+5;
                letrab.y = y1+5;
                letrac.x = a+5; 
                letrac.y = b+5;
                letrad.x = px+5; 
                letrad.y = py+5; 
                segundos = 0;
                break; 
            case 4: 
                texto.setText([
                'Level: ' + level,
                'Segmento de reta: ]' + letra1 + letra2 + '['
                ]);
                graphics.clear(); 
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                var aux = generateExtraPoint([point2,point3],2); 
                point = aux[0]; 
                point4 = aux[1];
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
                letraa.x = x+5;
                letraa.y = y+5;
                letrab.x = x1+5;
                letrab.y = y1+5;
                letrac.x = a+5; 
                letrac.y = b+5;
                letrad.x = px+5; 
                letrad.y = py+5; 
                segundos = 0;
                break; 
            case 5: 
                texto.setText([
                'Level: ' + level,
                'Reta: ' + letra1 + letra2
                ]);
                break; 
            case 6: 
                texto.setText([
                    'Level: ' + level,
                    'Reta: ' + letra1 + letra2 
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
                letraa.x = x+5;
                letraa.y = y+5;
                letrab.x = x1+5;
                letrab.y = y1+5;
                letrac.x = a+5; 
                letrac.y = b+5;
                ponto3.x = a;
                ponto3.y = b;
                segundos = 0;
                break;
            case 7: 
                texto.setText([
                    'Level: ' + level,
                    'Reta: ' + letra1 + letra2
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
                letraa.x = x+5;
                letraa.y = y+5;
                letrab.x = x1+5;
                letrab.y = y1+5;
                letrac.x = a+5; 
                letrac.y = b+5;
                ponto3.x = a;
                ponto3.y = b;
                segundos = 0;
                break;
            case 8: 
                texto.setText([
                    'Level: ' + level,
                    'Reta: ' + letra1 + letra2
                    ]);
                    graphics.clear(); 
                    lines[j] = new Phaser.Geom.Line();
                    line = lines[j];
                    var aux = generateExtraPoint([point2,point3],2); 
                    point = aux[0]; 
                    point4 = aux[1];
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
                    letraa.x = x+5;
                    letraa.y = y+5;
                    letrab.x = x1+5;
                    letrab.y = y1+5;
                    letrac.x = a+5; 
                    letrac.y = b+5;
                    letrad.x = px+5; 
                    letrad.y = py+5; 
                    segundos = 0;
                    break; 
            case 9: 
                escondePontos([ponto2,ponto3,letrac,letrad]);
                texto.setText([
                'Level: ' + level,
                'SemiRreta: [' + letra1 + letra2 + '['
                ]);
                break;
            case 10: 
                escondePontos([ponto3,letrac]);
                texto.setText([
                    'Level: ' + level,
                    'SemiRreta que começa em: ' + letra1 + '\ne passa por ' + letra2 
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
                letraa.x = x+5;
                letraa.y = y+5;
                letrab.x = x1+5;
                letrab.y = y1+5;
                letrac.x = a+5; 
                letrac.y = b+5;
                ponto3.x = a;
                ponto3.y = b;
                segundos = 0;
                break;
            case 11: 
                texto.setText([
                'Level: ' + level,
                'Segmento de reta: [' + letra1 + letra2 + ']'
                ]);
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                var pointsLine2 = getPointsOnLine(point,point4);
                for(var i=0;i<pointsLine2.length;i++){
                    pointsLine.push(pointsLine2[i]);
                }

                ponto3.x = point.x;
                ponto3.y = point.y;
                ponto4.x = point4.x;
                ponto4.y = point4.y; 
                letrac.x = point.x+5;
                letrac.y = point.y+5;
                letrad.x = point4.x+5;
                letrad.y = point4.y+5;
                break; 
            case 12: 
                texto.setText([
                'Level: ' + level,
                'Reta ' + letra1 + letra2 
                ]);
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                var pointsLine2 = getPointsOnLine(point,point4);
                var pointsLine3 = getPointsOnLine(point2,point);
                var pointsLine4 = getPointsOnLine(point3,point4);

                for(var i=0;i<pointsLine2.length;i++){
                    pointsLine.push(pointsLine2[i]);
                }
                for(var i=0;i<pointsLine3.length;i++){
                    pointsLine.push(pointsLine3[i]);
                }
                for(var i=0;i<pointsLine4.length;i++){
                    pointsLine.push(pointsLine4[i]);
                }
                ponto3.x = point.x;
                ponto3.y = point.y;
                ponto4.x = point4.x;
                ponto4.y = point4.y; 
                letrac.x = point.x+5;
                letrac.y = point.y+5;
                letrad.x = point4.x+5;
                letrad.y = point4.y+5;
                break; 
            case 13: 
                texto.setText([
                'Level: ' + level,
                'Segmento de reta [' + letra1 + letra2 + ']'
                ]);
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                var pointsLine2 = getPointsOnLine(point,point4);
                var pointsLine3 = getPointsOnLine(point2,point4);

                for(var i=0;i<pointsLine2.length;i++){
                    pointsLine.push(pointsLine2[i]);
                }
                for(var i=0;i<pointsLine3.length;i++){
                    pointsLine.push(pointsLine3[i]);
                }
                ponto3.x = point.x;
                ponto3.y = point.y;
                ponto4.x = point4.x;
                ponto4.y = point4.y; 
                letrac.x = point.x+5;
                letrac.y = point.y+5;
                letrad.x = point4.x+5;
                letrad.y = point4.y+5;
                break; 
            case 14: 
                texto.setText([
                'Level: ' + level,
                'Segmento de Reta: [' + letra1 + letra4 + ']'
                ]);
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = perpendicular(point2,point3);
                var pointsLine2 = getPointsOnLine(point,point4);
                var pointsLine3 = getPointsOnLine(point3,point4);
                var pointsLine4 = getPointsOnLine(point2,point4);

                for(var i=0;i<pointsLine2.length;i++){
                    pointsLine.push(pointsLine2[i]);
                }

                for(var i=0;i<pointsLine3.length;i++){
                    pointsLine.push(pointsLine3[i]);
                }
                for(var i=0;i<pointsLine4.length;i++){
                    pointsLine.push(pointsLine4[i]);
                }
                ponto3.x = point.x;
                ponto3.y = point.y;
                ponto4.x = point4.x;
                ponto4.y = point4.y; 
                letrac.x = point.x+5;
                letrac.y = point.y+5;
                letrad.x = point4.x+5;
                letrad.y = point4.y+5;
                break; 
            case 15: 
                texto.setText([
                'Level: ' + level,
                'Semi Reta: ]' + letra1 + letra2 + ']'
                ]);
                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                var a = Math.random()*(800 - 300) + 300;
                var b = Math.random()*(600 - 300) + 300;
                for(var i =0;i<pointsLine.length;i++){
                    while((a<=pointsLine[i].x+50 && a>=pointsLine[i].x-50 && b<=pointsLine[i].y+50 && b>=pointsLine[i].y-50)||(b>450 ||a==x || a==x1 || b==y || b==y1 || dist(a,b,x,y)<=150 || dist(x,y,x1,y1)<=150) ){
                        a = Math.random()*(800 - 300) + 300;
                        b = Math.random()*(600 - 300) + 300;
                    }
                }
                point = new Phaser.Geom.Point(a,b);
                var pointsLine2 = getPointsOnLine(point3,point);
                ponto3.x = a; 
                ponto3.x = b;
                for(var i=0;i<pointsLine2.length;i++){
                    pointsLine.push(pointsLine2[i]);
                }
                letrac.x = a+5; 
                letrac.y = b+5;
                ponto3.x = a; 
                ponto3.y = b;
                break; 
        }
        
        this.input.on('gameobjectdown', function(pointer, gameObject) {

            switch (gameObject.name) {
                case 'btHome':
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
                    pointsLine2 = [];
                    clearInterval(contaTempo);
                    segundos = 0;
                    score = 0;
                    this.scene.transition({ target: 'Menu', duration: 100 });
                    pause = false; 
                    level = 1; 
                    vidas = 3; 
                    reset();
                    break;
                case 'btnao':
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
                    letraa.x = x+5;
                    letraa.y = y+5;
                    letrab.x = x1+5;
                    letrab.y = y1+5;
                    ponto1.x=x;
                    ponto1.y=y;
                    ponto2.x=x1;
                    ponto2.y=y1;
                    if (level==2 || level==1 || level==6){
                        letrac.x = point.x+5;
                        letrac.y = point.y+5;
                        ponto3.x=point.x;
                        ponto3.y=point.y;  
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                    }
                    
                    if(level==3 || level==4 || level==5){
                        letrac.x = point.x+5;
                        letrac.y = point.y+5;
                        ponto3.x=point.x;
                        ponto3.y=point.y;
                        letrad.x = point4.x+5;
                        letrad.y = point4.y+5;
                        ponto4.x=point4.x;
                        ponto4.y=point4.y;
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                    }
                    break;
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

                if (((level == 1||level==5||level==7||level==8||level==9) && certas ==1)){
                    if(posto==false){
                        signal = true; 
                        var pontosLine = getPointsOnLine(point2,point3);
                        for(var i=0;i<pontosLine.length;i++){
                            var mid = pontosLine[i];
                            if(level==7||level==8){     
                                var paux1 = point2; 
                                var paux2 = point3; 
                                if(level == 8){
                                    paux2 = point; 
                                    pontosLine = getPointsOnLine(point2,point);
                                }  
                                console.log(sgm);                     
                                if ((pontoEsquerda(paux1,paux2) == paux1 && (pointer.x<paux1.x ||
                                pointer.x>paux2.x)) || (pontoEsquerda(paux1,paux2) == paux2 && (pointer.x<paux2.x ||
                                pointer.x>paux1.x)) && 
                                (pointer.x<=mid.x+5 && pointer.x>=mid.x-5 && pointer.y<=mid.y+5 && pointer.y>=mid.y-5)
                                ){
                                    midlePoint = new Phaser.Geom.Point(mid.x,mid.y);
                                    if(sgm){
                                        aceitaMidle = true;
                                        posto=true;
                                        if(!posto){
                                            graphics.fillPointShape(midlePoint, 10);
                                            graphics.strokeLineShape(lines[0]);
                                        }
                                    }
                                }
                                else{
                                    midlePoint = new Phaser.Geom.Point(pointer.x,pointer.y);
                                    graphics.fillPointShape(midlePoint, 10);
                                }

                            }
                            else{
                                if(pointer.x<=mid.x+5 && pointer.x>=mid.x-5 && pointer.y<=mid.y+5 && pointer.y>=mid.y-5){
                                    midlePoint = new Phaser.Geom.Point(mid.x,mid.y);
                                    if(sgm){
                                        aceitaMidle = true;
                                        posto=true;
                                        if(!posto){
                                            graphics.fillPointShape(midlePoint, 10);
                                            graphics.strokeLineShape(lines[0]);
                                        }
                                    }
                                }
                                else{
                                    midlePoint = new Phaser.Geom.Point(pointer.x,pointer.y);
                                    graphics.fillPointShape(midlePoint, 10);
                                }
                            }
                        }
                    }
                }

                for(var i=0;i<=pointsLine.length;i++){
                    if (pointer.x <= x+50 && pointer.x >= x-50 && pointer.y <= y+50 && pointer.y >= y-50){
                        line.setTo(x, y, x, y);
                    }
                    else {
                        if (pointer.x <= x1+50 && pointer.x >= x1-50 && pointer.y <= y1+50 && pointer.y >= y1-50){
                        line.setTo(x1, y1, x1, y1);
                        }
                        else{
                            if ((level == 2||level==3||level==4||level==6||level==7||level==8||
                                level == 10) && pointer.x <= point.x+50 && pointer.x >= point.x-50 && pointer.y <= point.y+50 && pointer.y >= point.y-50){
                                line.setTo(point.x, point.y, point.x, point.y);
                            }
                            else{ 
                                if((level==3 ||level==4||level==8)&& pointer.x <= point4.x+50 && pointer.x >= point4.x-50 && pointer.y <= point4.y+50 && pointer.y >= point4.y-50){
                                    line.setTo(point4.x, point4.y, point4.x, point4.y);
                                }
                                else{
                                    if(pointer.x<=pointsLine[i].x+50 &&pointer.x >= pointsLine[i].x-50 && pointer.y <= pointsLine[i].y+50 && pointer.y >= pointsLine[i].y-50 ){
                                        line.setTo(pointsLine[i].x, pointsLine[i].y, pointsLine[i].x, pointsLine[i].y);
                                        ultimo = true;
                                    }
                                }
                            }
                        }
                    }
                }
                

                switch (level){
                    case 1:
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                    case 2: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }             
                        graphics.strokeLineShape(line);
                        break;
                    case 3: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }             
                        graphics.strokeLineShape(line);
                        break;
                    case 4: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }   
                        graphics.lineStyle(4, color);          
                        graphics.strokeLineShape(line);
                        break;
                    case 5: 
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                    case 6:
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }             
                        graphics.strokeLineShape(line);
                        break;
                    case 7: 
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                    case 8: 
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                        }
                        break; 
                    case 9: 
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                            if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                            else{
                                graphics.clear();
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                        }
                        break;
                    case 10: 
                        console.log("ola");
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }   
                        graphics.lineStyle(4, color);          
                        graphics.strokeLineShape(line);
                        break;
                    case 11: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }             
                        graphics.strokeLineShape(line);
                        if(midlePoint!=null){
                            graphics.clear();
                            graphics.fillPointShape(midlePoint, 10);
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                        }
                        break; 
                    case 12: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        } 
                        graphics.lineStyle(4, color);            
                        graphics.strokeLineShape(line);
                        break;
                    case 13: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        } 
                        graphics.lineStyle(4, color);            
                        graphics.strokeLineShape(line);
                        break;
                    case 14: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        } 
                        graphics.lineStyle(4, color);            
                        graphics.strokeLineShape(line);
                        break;
                    case 15: 
                        graphics.clear();
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }             
                        graphics.strokeLineShape(line);
                        if(midlePoint!=null){
                            graphics.clear();
                            graphics.fillPointShape(midlePoint, 10);
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                        }
                        break; 
                }
            }
        });

        this.input.on('pointermove', function (pointer) { 
            if(!muda){
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
                        if (pointer.x <= x+50 && pointer.x >= x-50 && pointer.y <= y+50 && pointer.y >= y-50){
                            line.x2 = x; 
                            line.y2 = y; 
                        }
                        else {
                            if (pointer.x <= x1+50 && pointer.x >= x1-50 && pointer.y <= y1+50 && pointer.y >= y1-50){
                                line.x2 = x1; 
                                line.y2 = y1; 
                            }
                            else{
                                if((level == 2|| level==3 || level==4||level==6||level==7||level==8
                                    ||level==10) && pointer.x <= point.x+50 && pointer.x >= point.x-50 && pointer.y <= point.y+50 && pointer.y >= point.y-50){
                                    line.x2 = point.x; 
                                    line.y2 = point.y; 
                                }
                                else{
                                    if((level==3||level==4||level==8
                                        ) && pointer.x <= point4.x+50 && pointer.x >= point4.x-50 && pointer.y <= point4.y+50 && pointer.y >= point4.y-50){
                                        line.x2 = point4.x; 
                                        line.y2 = point4.y; 
                                    }
                                    else{
                                        if(pointer.x<=pointsLine[i].x+50 &&pointer.x >= pointsLine[i].x-50 && pointer.y <= pointsLine[i].y+50 && pointer.y >= pointsLine[i].y-50){
                                            line.x2 = pointsLine[i].x;
                                            line.y2 = pointsLine[i].y;
                                            p = true;
                                            }
                                        }
                                    }
                                }   
                            }
                        }
                    
                    switch(level){
                        case 1: 
                            graphics.clear();
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                            if(certas==1){
                                if (segmentoReta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                    graphics.strokeLineShape(lines[0]);
                                }

                                if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                                
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                if(sgm){
                                    graphics.strokeLineShape(lines[0]);
                                }
                            }
                            break;
                        case 2: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                            break; 
                        case 3: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(4, color);           
                            graphics.strokeLineShape(line);
                            break;
                        case 4: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(4, color);           
                            graphics.strokeLineShape(line);
                            break;
                        case 5: 
                            graphics.clear();
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                            if(certas==1){
                                if (reta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                    graphics.strokeLineShape(lines[0]);
                                }

                                if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                                
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                if(sgm){
                                    graphics.strokeLineShape(lines[0]);
                                }
                            }
                            break;
                        case 6:
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                            break; 
                        case 7: 
                            graphics.clear();
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (reta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                    graphics.strokeLineShape(lines[0]);
                                }

                                if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                                
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                if(sgm){
                                    graphics.strokeLineShape(lines[0]);
                                }
                            }
                            break;
                        case 8: 
                            graphics.clear();
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }
                            if(certas==1){
                                if (reta(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                    graphics.strokeLineShape(lines[0]);
                                }

                                if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                                
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                if(sgm){
                                    graphics.strokeLineShape(lines[0]);
                                }
                            }
                            break;
                        case 9: 
                            graphics.clear();
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                            if(certas==1){
                                if (comecaAntesAcabaNoPonto(point2,point3,line)){
                                    sgm = true;
                                    lines.push(line);
                                    graphics.strokeLineShape(lines[0]);
                                }

                                if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                                
                                }
                                else{
                                    graphics.clear();
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                if(sgm){
                                    graphics.strokeLineShape(lines[0]);
                                }
                            }
                            break;
                        case 10: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }  
                            graphics.lineStyle(4, color);           
                            graphics.strokeLineShape(line);
                            break;
                        case 11: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }         
                            graphics.lineStyle(4, color);    
                            graphics.strokeLineShape(line);
                            if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
                            }
                            break; 
                        case 12: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }         
                            graphics.lineStyle(4, color);                
                            graphics.strokeLineShape(line);
                            break;
                        case 13: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            } 
                            graphics.lineStyle(4, color);            
                            graphics.strokeLineShape(line);
                            break;
                        case 14: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            } 
                            graphics.lineStyle(4, color);            
                            graphics.strokeLineShape(line);
                            break;
                        case 15: 
                            graphics.clear();
                            for(var i= 0;i<lines.length;i++){
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(lines[i]);
                            }         
                            graphics.lineStyle(4, color);    
                            graphics.strokeLineShape(line);
                            if(midlePoint!=null){
                                graphics.clear();
                                graphics.fillPointShape(midlePoint, 10);
                                graphics.lineStyle(4, color);
                                graphics.strokeLineShape(line);
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
                        if (reta(point2,point3,line) && certas == 0) aceita = true; 
                        else{
                            if (sgm){
                                if(midlePoint!=null && sgm==true){
                                    graphics.fillPointShape(midlePoint, 10);
                                    posto = true;
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    posto = false;
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                texto.setText([
                                    'Level: ' + level,
                                    'Marca Ponto no segmento de reta'
                                ]);
                                console.log(midlePoint);
                                if(sgm){
                                    graphics.lineStyle(4, color);
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
                                score -= 5;
                                vidas -= 1;
                            }
                        }
                        break; 
                    case 2: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            um = true; 
                            texto.setText([
                                'Level: ' + level,
                                'Segmento de Reta: [' + letra1 + letra3 + ']'
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
                                    'Level: ' + level,
                                    'Segmento de Reta: [' + letra2 + letra3 + ']'
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
                                    score-=5;
                                    vidas -= 1; 
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
                    case 3: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(reta(point2,point3,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point3,point4);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.setText([
                                'Level: ' + level,
                                'Segmento de Reta: [' + letra2 + letra4 + ']'
                            ]);
                        }
                        else{
                            if(segmentoReta(point3,point4,line) && um == true){
                                dois = true; 
                                texto.setText([
                                    'Level: ' + level,
                                    'Segmento de Reta: [' + letra1 + letra4 + ']'
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
                                    score-=5;
                                    vidas -=1; 
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
                        if(reta(point2,point3,line)){
                            pointsLine = [];
                            var pointsLine2 = getPointsOnLine(point3,point4);
                            for(var i=0;i<pointsLine2.length;i++){
                                pointsLine.push(pointsLine2[i]);
                            }
                            um = true; 
                            texto.setText([
                                'Level: ' + level,
                                'Segmento de Reta: [' + letra2 + letra3 + ']'
                            ]);
                        }
                        else{
                            if(segmentoReta(point3,point,line) && um == true){
                                dois = true; 
                                texto.setText([
                                    'Level: ' + level,
                                    'Segmento de Reta: [' + letra1 + letra4 + ']'
                                ]);
                                pointsLine = [];
                                var pointsLine3 = getPointsOnLine(point2,point4);

                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                            }
                            else{
                                if(segmentoReta(point2,point4,line) && dois==true){
                                    texto.setText([
                                        'Level: ' + level,
                                        'Segmento de Reta: [' + letra3 + letra4 + ']'
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
                                        score-=5;
                                        vidas -=1;
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
                                    graphics.fillPointShape(midlePoint, 10);
                                    posto = true;
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    posto = false;
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                texto.setText([
                                    'Level: ' + level,
                                    'Marca Ponto no segmento de reta'
                                ]);
                                if(sgm){
                                    graphics.lineStyle(4, color);
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
                                        if(signal){
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
                                vidas -= 1;
                                score -= 5;
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
                                'Level: ' + level,
                                'Segmento de Reta: [' + letra2 + letra3 + ']'
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
                                texto.setText([
                                    'Level: ' + level,
                                    'Reta: ' + letra1 + letra3 
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
                                    score-=5;
                                    lines.pop();
                                    graphics.clear();  
                                    score -= 5; 
                                    vidas -= 1;
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
                                'Level: ' + level,
                                'Segmento de Reta: [' + letra2 + letra3 + ']'
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
                                texto.setText([
                                    'Level: ' + level,
                                    'Ponto alinhado com: ' + letra1 + letra2
                                ]); 
                                sgm = true;
                            }
                            else{
                                lines.pop();
                                if (sgm){
                                    if(midlePoint!=null && sgm==true){
                                        graphics.fillPointShape(midlePoint, 10);
                                        posto = true;
                                        graphics.lineStyle(4, color);
                                        graphics.strokeLineShape(line);
                                    }
                                    else{
                                        graphics.clear();
                                        posto = false;
                                        graphics.lineStyle(4, color);
                                        graphics.strokeLineShape(line);
                                    }
                                    if(sgm){
                                        graphics.lineStyle(4, color);
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
                                score -= 5; 
                                vidas -= 1;
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
                            texto.setText([
                                'Level: ' + level,
                                'Reta: ' + letra1 + letra3 
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
                                texto.setText([
                                    'Level: ' + level,
                                    'Segmento de Reta: [' + letra2 + letra4 +']'
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
                                    texto.setText([
                                        'Level: ' + level,
                                        'Ponto alinhado: ' + letra1 + letra3 +']'
                                    ]); 
                                }
                                else{
                                    lines.pop();
                                }

                                if (sgm){
                                    if(midlePoint!=null && sgm==true){
                                        graphics.fillPointShape(midlePoint, 10);
                                        posto = true;
                                        graphics.lineStyle(4, color);
                                        graphics.strokeLineShape(line);
                                    }
                                    else{
                                        graphics.clear();
                                        posto = false;
                                        graphics.lineStyle(4, color);
                                        graphics.strokeLineShape(line);
                                    }
                                    if(sgm){
                                        graphics.lineStyle(4, color);
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
                    case 9: 
                        if (semiReta(point2,point3,line)&&certas==0){
                            aceita = true; 
                        } 
                        else{
                            if (sgm){
                                if(midlePoint!=null && sgm==true){
                                    graphics.fillPointShape(midlePoint, 10);
                                    posto = true;
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                else{
                                    graphics.clear();
                                    posto = false;
                                    graphics.lineStyle(4, color);
                                    graphics.strokeLineShape(line);
                                }
                                texto.setText([
                                    'Level: ' + level,
                                    'Marca Ponto na semirreta |' + letra1 + letra2
                                ]);
                                console.log(midlePoint);
                                if(sgm){
                                    graphics.lineStyle(4, color);
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
                                score -= 5;
                                vidas -= 1;
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
                            texto.setText([
                                'Level: ' + level,
                                'Reta: ' + letra1 + letra3
                            ]);
                        }
                        else{
                            if(reta(point2,point,line) && um == true){
                                dois = true; 
                                texto.setText([
                                    'Level: ' + level,
                                    'Segmento de Reta: [' + letra2 + letra3 + ']'
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
                                    score-=5;
                                    vidas -=1;
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
                        if(reta(point2,point3,line)){
                            um = true; 
                            texto.setText([
                                'Level: ' + level,
                                'Segmento de reta ]' + letra3 + letra1 + ']'
                            ]);
                        }
                        else{
                            if(comecaAntesAcabaNoPonto(point,point2,line) && um == true){
                                dois = true; 
                                texto.setText([
                                    'Level: ' + level,
                                    'Segmento de reta [' + letra2 + letra4 + '['
                                ]);
                            }
                            else{
                                if(semiReta(point3,point4,line) && dois == true){
                                    tres = true;
                                    texto.setText([
                                        'Level: ' + level,
                                        'Reta paralela a ' + letra1 + letra2 
                                    ]);
                                }
                                else{
                                    if(reta(point,point4,line) && tres == true){
                                        quatro = true;
                                    }
                                    else{
                                        score-=5;
                                        lines.pop();
                                        graphics.clear();
                                    }
                                }
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres && quatro){
                            aceita=true;
                        }
                        break;
                    case 13: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(segmentoReta(point2,point3,line)){
                            um = true; 
                            texto.setText([
                                'Level: ' + level,
                                'Segmento de reta [' + letra1 + letra4 + '['
                            ]);
                        }
                        else{
                            if(semiReta(point2,point4,line) && um == true){
                                dois = true; 
                                texto.setText([
                                    'Level: ' + level,
                                    'Reta ' + letra3 + letra4 
                                ]);
                            }
                            else{
                                if(reta(point,point4,line) && dois == true){
                                    tres = true;
                                }
                                else{
                                    score-=5;
                                    lines.pop();
                                    graphics.clear();
                                }
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres){
                            aceita=true;
                        }
                        break;  
                    case 14: 
                        if (contador==1){
                            lines.push(line);
                        }
                        contador = 1;
                        if(segmentoReta(point2,point4,line)){
                            um = true; 
                            texto.setText([
                                'Level: ' + level,
                                'Segmento de reta [' + letra4 + letra2 + ']'
                            ]);
                        }
                        else{
                            if(segmentoReta(point4,point3,line) && um == true){
                                dois = true; 
                                texto.setText([
                                    'Level: ' + level,
                                    'Segmento de reta [' + letra1 + letra2 + ']'
                                ]);
                            }
                            else{
                                if(segmentoReta(point2,point3,line) && dois == true){
                                    tres = true;
                                    texto.setText([
                                        'Level: ' + level,
                                        'Segmento de reta: [' + letra3 + letra4 + ']'
                                    ]);
                                }
                                else{
                                    if(segmentoReta(point,point4,line) && tres == true){
                                        quatro = true;
                                    }
                                    else{
                                        score-=5;
                                        lines.pop();
                                        graphics.clear();
                                    }
                                }
                            }
                        }                
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        line = new Phaser.Geom.Line(); 

                        if(um && dois && tres && quatro){
                            aceita=true;
                        }
                        break;
                    case 15: 
                    if (contador==1){
                        lines.push(line);
                    }
                    contador = 1;
                    if(comecaAntesAcabaNoPonto(point2,point3,line)){
                        um = true; 
                        texto.setText([
                            'Level: ' + level,
                            'Semi Reta: [' + letra2 + letra3 + '['
                        ]);
                    }
                    else{
                        if(semiReta(point3,point,line) && um == true){
                            dois = true; 
                        }
                        else{
                            score-=5;
                            lines.pop();
                            graphics.clear();
                        }
                    }                
                    for(var i= 0;i<lines.length;i++){
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(lines[i]);
                    }
                    line = new Phaser.Geom.Line(); 

                    if(um&&dois){
                        sgm = true;
                        texto.setText([
                            'Level: ' + level,
                            'Ponto Medio ' + letra1 + letra2 
                        ]);
                    }

                    if(midlePoint!=null && sgm==true){
                        graphics.fillPointShape(midlePoint, 10);
                        posto = true;
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                    else{
                        graphics.clear();
                        posto = false;
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                    if(sgm){
                        texto.setText([
                            'Level: ' + level,
                            'Ponto Medio ' + letra1 + letra2
                        ]);
                        if(aceitaMidle){
                            aceita = true;
                        }
                        else{
                            midlePoint = null; 
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
                    break;
                }

                line = new Phaser.Geom.Line(); 
            }
            if (aceita){
                disable = true; 
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
                    signal = false; 
                    lines = [];
                    j = 0;
                    letraa.x = x+5; 
                    letraa.y = y+5;
                    letrab.x = x1+5;
                    letrab.y = y1+5;
                    //segundos = 0; 
                    if (certas == 3){
                        graphics.clear();
                        clearInterval(contaTempo);
                        escondePontos([ponto1,ponto2,letraa,letrab]);
                        if(level==2||level==6 || level==7){
                            escondePontos([ponto3,letrac]);
                        }
                        if(level==3 || level == 4 || level == 8){
                            escondePontos([ponto3,ponto4,letrac,letrad]);
                        }
                        certas = -1;
                        muda = true; 
                        f1 = false; 
                    }
                    else{
                        f1 = true;
                    }

                    if(f1 || f2){  
                        console.log(level);
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
                        var p = false;  
                        switch (level){
                            case 1: 
                                if(certas == 0){
                                    texto.setText([
                                        'Level: ' + level,
                                        'Segmento de reta: ]' + letra1 + letra2 + '['
                                        ]);
                                }
                                if(certas == 1){
                                    texto.setText([
                                        'Level: ' + level,
                                        'Segmento de reta: [' + letra1 + letra2 + ']'
                                    ]);
                                }
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                break;
                            case 2: 
                                texto.setText([
                                    'Level: ' + level,
                                    'Segmento de reta: ]' + letra1 + letra2 + '['
                                ]);
                                graphics.clear();
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                point = generateExtraPoint([point2,point3],1);                    
                                var a = point.x;
                                var b = point.y;
                                clearInterval(contaTempo);
                                p = true;
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                letrac.x = a+5; 
                                letrac.y = b+5;
                                ponto3.x = a;
                                ponto3.y = b;
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break;
                            case 3: 
                                clearInterval(contaTempo);
                                escondePontos([info]);

                                texto.setText([
                                'Level: ' + level,
                                'Segmento de reta: ]' + letra1 + letra2 + '['
                                ]);
                                graphics.clear(); 
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                var aux = generateExtraPoint([point2,point3],3); 
                                point = aux[0]; 
                                point4 = aux[1];
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
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                letrac.x = a+5; 
                                letrac.y = b+5;
                                letrad.x = px+5; 
                                letrad.y = py+5; 
                                segundos = 0;
                                
                                p = true;
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break; 
                            case 4: 
                                clearInterval(contaTempo);
                                escondePontos([info]);

                                texto.setText([
                                'Level: ' + level,
                                'Segmento de reta: ]' + letra1 + letra2 + '['
                                ]);
                                graphics.clear(); 
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                var aux = generateExtraPoint([point2,point3],3); 
                                point = aux[0]; 
                                point4 = aux[1];
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
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                letrac.x = a+5; 
                                letrac.y = b+5;
                                letrad.x = px+5; 
                                letrad.y = py+5; 
                                segundos = 0;
                                
                                p = true;
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break; 
                            case 5: 
                                escondePontos([ponto3,ponto4,letrac,letrad]); 
                                if(certas == 0 || certas == 1){
                                    texto.setText([
                                        'Level: ' + level,
                                        'Reta ' + letra1 + letra2
                                    ]);
                                    clearInterval(contaTempo);
                                    p = true;
                                    ponto1.x=x;
                                    ponto1.y=y;
                                    ponto2.x=x1;
                                    ponto2.y=y1;
                                    letraa.x = x+5;
                                    letraa.y = y+5;
                                    letrab.x = x1+5;
                                    letrab.y = y1+5;
                                }
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break;
                            case 6: 
                                clearInterval(contaTempo);

                                texto.setText([
                                    'Level: ' + level,
                                    'Reta: ' + letra1 + letra2 
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
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                letrac.x = a+5; 
                                letrac.y = b+5;
                                ponto3.x = a;
                                ponto3.y = b;
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break;
                            case 7: 
                                clearInterval(contaTempo);
                                texto.setText([
                                    'Level: ' + level,
                                    'Reta: ' + letra1 + letra2
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
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                letrac.x = a+5; 
                                letrac.y = b+5;
                                ponto3.x = a;
                                ponto3.y = b;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break;
                            case 8: 
                                clearInterval(contaTempo);
                                texto.setText([
                                'Level: ' + level,
                                'Reta: ' + letra1 + letra2
                                ]);
                                graphics.clear(); 
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                var aux = generateExtraPoint([point2,point3],2); 
                                point = aux[0]; 
                                point4 = aux[1];
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
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                letrac.x = a+5; 
                                letrac.y = b+5;
                                letrad.x = px+5; 
                                letrad.y = py+5; 
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break; 
                            case 9: 
                                escondePontos([ponto2,ponto3,letrac,letrad]);
                                if (certas==0){
                                    texto.setText([
                                    'Level: ' + level,
                                    'SemiRreta: [' + letra1 + letra2 + '['
                                    ]);
                                }
                                if(certas==1){
                                    texto.setText([
                                        'Level: ' + level,
                                        'SemiRreta: |' + letra1 + letra2 
                                    ]);
                                }
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                break;
                            case 10:
                                clearInterval(contaTempo);
                                texto.setText([
                                    'Level: ' + level,
                                    'SemiRreta que começa em: ' + letra1 + '\ne passa por ' + letra2 
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
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                letrac.x = a+5; 
                                letrac.y = b+5;
                                ponto3.x = a;
                                ponto3.y = b;
                                contaTempo = setInterval(function(){ segundo() },1000); 
                                segundos = 0;
                                break;
                            case 11: 
                                clearInterval(contaTempo);
                                texto.setText([
                                'Level: ' + level,
                                'Segmento de reta: [' + letra1 + letra2 + ']'
                                ]);
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                                var pointsLine2 = getPointsOnLine(point,point4);
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                
                                ponto3.x = point.x;
                                ponto3.y = point.y;
                                ponto4.x = point4.x;
                                ponto4.y = point4.y; 
                                letrac.x = point.x+5;
                                letrac.y = point.y+5;
                                letrad.x = point4.x+5;
                                letrad.y = point4.y+5;
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break;
                            case 12: 
                                clearInterval(contaTempo);
                                texto.setText([
                                'Level: ' + level,
                                'Reta ' + letra1 + letra2
                                ]);
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                                var pointsLine2 = getPointsOnLine(point,point4);
                                var pointsLine3 = getPointsOnLine(point2,point);
                                var pointsLine4 = getPointsOnLine(point3,point4);
                
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                                for(var i=0;i<pointsLine4.length;i++){
                                    pointsLine.push(pointsLine4[i]);
                                }
                                ponto3.x = point.x;
                                ponto3.y = point.y;
                                ponto4.x = point4.x;
                                ponto4.y = point4.y; 
                                letrac.x = point.x+5;
                                letrac.y = point.y+5;
                                letrad.x = point4.x+5;
                                letrad.y = point4.y+5;
                                contaTempo = setInterval(function(){ segundo() },1000);
                                segundos = 0;
                                break;
                            case 13: 
                                texto.setText([
                                'Level: ' + level,
                                'Segmento de reta [' + letra1 + letra2 + ']'
                                ]);
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = pontosParalelo(point2.x,point2.y,point3.x,point3.y);
                                var pointsLine2 = getPointsOnLine(point,point4);
                                var pointsLine3 = getPointsOnLine(point2,point4);
                
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                                ponto3.x = point.x;
                                ponto3.y = point.y;
                                ponto4.x = point4.x;
                                ponto4.y = point4.y; 
                                letrac.x = point.x+5;
                                letrac.y = point.y+5;
                                letrad.x = point4.x+5;
                                letrad.y = point4.y+5;
                                break;
                            case 14: 
                                texto.setText([
                                'Level: ' + level,
                                'Segmento de Reta: [' + letra1 + letra4 + ']'
                                ]);
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                [point,point4] = perpendicular(point2,point3);
                                var pointsLine2 = getPointsOnLine(point,point4);
                                var pointsLine3 = getPointsOnLine(point3,point4);
                                var pointsLine4 = getPointsOnLine(point2,point4);
                
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                
                                for(var i=0;i<pointsLine3.length;i++){
                                    pointsLine.push(pointsLine3[i]);
                                }
                                for(var i=0;i<pointsLine4.length;i++){
                                    pointsLine.push(pointsLine4[i]);
                                }
                                ponto3.x = point.x;
                                ponto3.y = point.y;
                                ponto4.x = point4.x;
                                ponto4.y = point4.y; 
                                letrac.x = point.x+5;
                                letrac.y = point.y+5;
                                letrad.x = point4.x+5;
                                letrad.y = point4.y+5;
                                break; 
                            case 15: 
                                texto.setText([
                                'Level: ' + level,
                                'Semi Reta: ]' + letra1 + letra2 + ']'
                                ]);
                                lines[j] = new Phaser.Geom.Line();
                                line = lines[j];
                                var a = Math.random()*(800 - 300) + 300;
                                var b = Math.random()*(600 - 300) + 300;
                                for(var i =0;i<pointsLine.length;i++){
                                    while((a<=pointsLine[i].x+50 && a>=pointsLine[i].x-50 && b<=pointsLine[i].y+50 && b>=pointsLine[i].y-50)||(b>450 ||a==x || a==x1 || b==y || b==y1 || dist(a,b,x,y)<=150 || dist(x,y,x1,y1)<=150) ){
                                        a = Math.random()*(800 - 300) + 300;
                                        b = Math.random()*(600 - 300) + 300;
                                    }
                                }
                                point = new Phaser.Geom.Point(a,b);
                                var pointsLine2 = getPointsOnLine(point3,point);
                                ponto3.x = a; 
                                ponto3.x = b;
                                for(var i=0;i<pointsLine2.length;i++){
                                    pointsLine.push(pointsLine2[i]);
                                }
                                letrac.x = a+5; 
                                letrac.y = b+5;
                                ponto3.x = a; 
                                ponto3.y = b;
                                break; 
                        }
                        if (p==false){  
                            ponto1.x=x;
                            ponto1.y=y;
                            ponto2.x=x1;
                            ponto2.y=y1;
                        }
                      
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
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }                      
                        break; 
                    case 2: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 3: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 4: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 5: 
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }                       
                        break;
                    case 6: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 7: 
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }     
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }                 
                        break; 
                    case 8: 
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }     
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }                 
                        break; 
                    case 9: 
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                        if(certas==1){
                            graphics.strokeLineShape(lines[0]); 
                        }                      
                        break; 
                    case 10: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        break;
                    case 11: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        if(!um){
                            if(score>=5){
                                score -= 5;
                            }
                            else{
                                score = 0;
                            }
                        }
                        break;
                    case 12: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        if(!um){
                            if(score>=5){
                                score -= 5;
                            }
                            else{
                                score = 0;
                            }
                        }
                        break; 
                    case 13: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        if(!um){
                            if(score>=5){
                                score -= 5;
                            }
                            else{
                                score = 0;
                            }
                        }
                        break; 
                    case 14: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        if(!um){
                            if(score>=5){
                                score -= 5;
                            }
                            else{
                                score = 0;
                            }
                        }
                        break; 
                    case 15: 
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                        if(!um){
                            if(score>=5){
                                score -= 5;
                            }
                            else{
                                score = 0;
                            }
                        }
                        break;
                } 
                line = new Phaser.Geom.Line(); 
            }
        });
    }

    update(){
        timer.setText([segundos]);
        textScore.setText([score + " pts" ]);
        if(level>15){
            this.scene.transition({ target: 'Menu', duration: 100 });
            reset();
        }
        if(aceita){
            this.btHome.disableInteractive();
            aux = true; 
        }

        if(vidas == 0){
            this.scene.transition({ target: 'Menu', duration: 100 });  
            reset();
        }
        
        if(muda){
            this.btHome.disableInteractive();
            aux = true; 
            if(level>15){
                this.scene.transition({ target: 'Menu', duration: 100 });  
            }
            else{
                info.x = 0.5 * game.config.width;
                info.y = 0.5 *game.config.height;
                sim.x = 0.6 * game.config.width;
                sim.y = 0.7 * game.config.height;
                nao.x = 0.4 * game.config.width;
                nao.y = 0.7 * game.config.height;
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
        if (pontoEsquerda(a,b) == a && (line.getPointA().x<a.x && line.getPointB().x>b.x) || (line.getPointA().x>b.x &&  
            line.getPointB().x<a.x)){
            return true; 
        }
        else{
            if (pontoEsquerda(a,b) == b && (line.getPointA().x>a.x && line.getPointB().x<b.x) || (line.getPointA().x<b.x &&  
            line.getPointB().x>a.x) ){
                return true;
            }
            else{
                if (pontoDeCima(a,b)==a && (line.getPointA().y>a.y && line.getPointB().y<b.y)|| (line.getPointA().y<b.y &&  
                line.getPointB().y>a.y) ){
                    return true;
                }
                else{
                    if (pontoDeCima(a,b)==b && (line.getPointA().y<a && line.getPointB().y>b.y)|| (line.getPointA().y>b.y &&  
                    line.getPointB().y>a.y)){
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
    
    Phaser.Geom.Line.SetToAngle(lineAuxInverse,x1,y1,angleInverse,1000);
    Phaser.Geom.Line.SetToAngle(lineaux,x,y,angle,1000);


    var end = lineaux.getPointB();
    var end2 = lineAuxInverse.getPointB(); 
    var lineTeste =new Phaser.Geom.Line();   

    lineTeste.setTo(end.x,end.y,end2.x,end2.y);
    return lineTeste.getPoints(1000);
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
    Phaser.Geom.Line.SetToAngle(paralela,x,y -200,angle,dist(x,y,x1,y1));
    var points = paralela.getPoints(); 
    var pontoA = paralela.getPointA();
    var pontoB = paralela.getPointB(); 

    return [pontoA,pontoB];
}

function escondePontos(pontos){
    for (var i=0; i<pontos.length;i++){
        pontos[i].x = 10000; 
        pontos[i].y = 10000;
    }
}

function perpendicular(ponto1,ponto2){
    var pointerLine = new Phaser.Geom.Line();
    pointerLine.setTo(ponto1.x,ponto1.y,ponto2.x,ponto2.y);
    var normalAngle = Phaser.Geom.Line.NormalAngle(pointerLine);
    var ponto = pointerLine.getRandomPoint(); 
    while(dist(ponto.x,ponto.y,ponto1.x,ponto1.y)<50 && dist(ponto.x,ponto.y,ponto2.x,ponto2.y)<50){
        ponto = pointerLine.getRandomPoint(); 
    }
    var perp = new Phaser.Geom.Line();
    var perpInverse = new Phaser.Geom.Line();
    Phaser.Geom.Line.SetToAngle(perp,ponto.x,ponto.y,normalAngle,200);
    Phaser.Geom.Line.SetToAngle(perpInverse,ponto.x,ponto.y,normalAngle+3.14,200);
    var pontoA = perp.getPointA();
    var pontoB = perp.getPointB(); 
    if (pontoB.y>400){
        pontoA = perpInverse.getPointA();
        pontoB = perpInverse.getPointB(); 
    }
    return [pontoA,pontoB];
}

function pontosAleatorios(){
    let alphabet;

    for(i=9,alphabet="";++i<36;)
        alphabet += i.toString(36).toUpperCase();
    var rand = Math.random()* 23; 

    while(alphabet[Math.floor(rand)]=='Z'||alphabet[Math.floor(rand)]=='X'|| alphabet[Math.floor(rand)]=='Y'
    || alphabet[Math.floor(rand)]=='W'){
        rand = 0; 
    }
    return [alphabet[Math.floor(rand)],alphabet[Math.floor(rand)+1],
    alphabet[Math.floor(rand)+2]
    ,alphabet[Math.floor(rand)+3]];
}

function generate2points(){
    let x = Math.random()*(800 - 300) + 300;
    let y = Math.random()*(600 - 300) + 300;
    let x1 =Math.random()*(800 - 300) + 300;
    let y1 = Math.random()*(600 - 300) + 300;

    while (y > 450 || y1>450 || x==x1 || x==y || x==y1 || x1==y1 || y==x1 || y==y1 || dist(x,y,x1,y1)<=150){
        x = Math.random()*(800 - 300) + 300;
        y = Math.random()*(600 - 300) + 300;
        x1 = Math.random()*(800 - 300) + 300;
        y1 = Math.random()*(600 - 300) + 300;
    }
    var point2 = new Phaser.Geom.Point(x, y);
    var point3 = new Phaser.Geom.Point(x1, y1);
    return [point2,point3];
}

function generateExtraPoint(pontos,quantos){
    var point2; var point3; 
    point2 = pontos[0]; 
    point3 = pontos[1];
    
    var pointsLine = getPointsOnLine(point2,point3);

    var a = Math.random()*(800 - 300) + 300;
    var b = Math.random()*(600 - 300) + 300;

    for(var i =0;i<pointsLine.length;i++){
        while((a<=pointsLine[i].x+10 && a>=pointsLine[i].x-10 && b<=pointsLine[i].y+10 && b>=pointsLine[i].y-10)||
        (b>450 ||a==x || a==x1 || b==y || b==y1 || dist(a,b,x,y)<=150 || dist(x,y,x1,y1)<=150) ){
            a = Math.random()*(800 - 300) + 300;
            b = Math.random()*(600 - 300) + 300;
        }
    }
    var ponto = new Phaser.Geom.Point(a, b);

    if(quantos == 1){
        return ponto; 
    }
    else{
        var pointsLine2 = getPointsOnLine(ponto,point3);
        var pointsLine3 = getPointsOnLine(point2,ponto);
        for(var i =0;i<pointsLine2.length;i++){
            pointsLine.push(pointsLine2[i]);
        }
        for(var i =0;i<pointsLine3.length;i++){
            pointsLine.push(pointsLine3[i]);
        }
        var a1 = Math.random()*(800 - 300) + 300;
        var b1 = Math.random()*(600 - 300) + 300;

        while(b1>450 ||a1==x || a1==x1 || b1==y || b1==y1 ||a1==a || a1==b
            || dist(a1,b1,x,y)<=200 || dist(a1,b1,a,b)<=200
        || dist(a1,b1,x1,y1)<=200){
            a1 = Math.random()*(800 - 300) + 300;
            b1 = Math.random()*(600 - 300) + 300;
        }
        
        
        var pontodois = new Phaser.Geom.Point(a1, b1);
        return [ponto,pontodois];
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