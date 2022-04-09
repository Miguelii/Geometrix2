var segundos = 0;
function segundo(){
    segundos++;
}

var lines = [];
var j = 0; 
var um = false;
var dois = false; 
var timer;
var score = 0; 
var textScore;
var pause = false; 

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
        this.load.image('info', 'assets/quadroinfo.png');
        this.load.image('btsim', 'assets/btsim.png');
        this.load.image('btnao', 'assets/btnao.png');
    }
        
    create (){
        segundos = 0;
        var contaTempo = setInterval(function(){ segundo() },1000);
        
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'background');
        this.background.setScale(0.79);
        this.titulo1 = this.add.sprite(0.5 * game.config.width, 0.15 *game.config.height, 'titulo1');
        this.titulo1.setScale(0.6);
        var info = this.add.sprite(-10000,-100000, 'info');

        var color =  0xffffff;
        var contador = 0;
        var certas = 0; 
        var level = 9; 

        var texto = this.add.text(850, 150, '', { fontFamily: 'font1',align: 'right'});
        
        texto.setFontSize(15);

        var aceita = false; 
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
        this.infoexit = this.add.sprite(0.5 * game.config.width, 0.55 *game.config.height, "info");
        this.infoexit.setScale(0.75);
        this.infoexit.visible = false;
        this.infoexit.name = 'infoexit';

        this.btsim = this.add.sprite(0.6 * game.config.width, 0.7 * game.config.height, 'btsim');
        this.btsim.setScale(0.35);
        this.btsim.visible = false;
        this.btsim.name = 'btsim';

        this.btnao = this.add.sprite(0.4 * game.config.width, 0.7 * game.config.height, 'btnao');
        this.btnao.setScale(0.35);
        this.btnao.visible = false;
        this.btnao.name = 'btnao';

        timer = this.add.text(0.065 * game.config.width, 55, segundos + ' s',{
            fontFamily: 'font1',
        });

        textScore = this.add.text(0.88 * game.config.width, 55, 'Score: ' + score,{
            fontFamily: 'font1',
        });



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
        var point3 = new Phaser.Geom.Point(x1, y1);// point at 400/300

        var letraa = this.add.text(x+5,y+5,'A',{
            fontFamily: 'font1',
        });
        var letrab = this.add.text(x1+5,y1+5,'B',{
            fontFamily: 'font1',
        });
        var letrac = this.add.text(-10000,-10000,'C',{
            fontFamily: 'font1',
        });;
        var letrad = this.add.text(-10000,-10000,'D',{
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
        var midlePoint = null;
        var posto = false;
        var point; 
        var point4;
        var pointsLine = getPointsOnLine(point2,point3);
        switch(level){
            case 1: 
                texto.setText([
                'Level: ' + level,
                'Segmento de reta: [AB]',
                ]);
                break;
            case 2: 
                texto.setText([
                'Level: ' + level,
                'Segmento de reta: [BA]'
                ]);
                break;
            case 3: 
                texto.setText([
                'Level: ' + level,
                'Semi-reta: [AB['
                ]);
                break; 
            case 4: 
                texto.setText([
                'Level: ' + level,
                'Semi-reta: ]BA]'
                ]);
                break;
            case 5: 
                texto.setText([
                'Level: ' + level,
                'Reta'
                ]);
                break; 
            case 6: 
                texto.setText([
                'Level: ' + level,
                'Reta: AB'
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
            case 7: 
                texto.setText([
                'Level: ' + level,
                'Segmento de reta: [AB]'
                ]);
                escondePontos([ponto3,letrac]);
                break; 
            case 8: 
                texto.setText([
                'Level: ' + level,
                'Reta: AB'
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

            case 9: 
                texto.setText([
                'Level: ' + level,
                'Reta: AB'
                ]);

                lines[j] = new Phaser.Geom.Line();
                line = lines[j];
                [point,point4] = perpendicular(point2,point3);
                var pointsLine2 = getPointsOnLine(point,point4);
                console.log(point,point4);
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
        }

        this.input.on('gameobjectdown', function(pointer, gameObject) {
            graphics.clear();

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
                    score += 5;
                    pause = true;
                    break;
                
                case 'btsim':
                    lines = [];
                    pointsLine = [];
                    pointsLine2 = [];
                    clearInterval(contaTempo);
                    score = 0;
                    this.scene.transition({ target: 'Menu', duration: 100 });
                    pause = false; 
                    break;
                
                case 'btnao':
                    pause = false; 
                    this.btHome.setInteractive({ useHandCursor: true });
                    this.infoexit.visible = false;
                    this.btnao.visible = false;
                    this.btsim.visible = false;
                    this.btnao.disableInteractive();
                    this.btsim.disableInteractive();
                    score += 5;
                    letraa.x = x+5;
                    letraa.y = y+5;
                    letrab.x = x1+5;
                    letrab.y = y1+5;
                    ponto1.x=x;
                    ponto1.y=y;
                    ponto2.x=x1;
                    ponto2.y=y1;
                    if (level==6){
                        letrac.x = point.x+5;
                        letrac.y = point.y+5;
                        ponto3.x=point.x;
                        ponto3.y=point.y;  
                        for(var i= 0;i<lines.length;i++){
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(lines[i]);
                        }
                    }
                    if(level==7){
                        letrad.x = point4.x+5; 
                        letrad.y = point4.y+5;
                        letrac.x = point.x+5;
                        letrac.y = point.y+5;
                        ponto4.x = point4.x;
                        ponto4.y = point4.y;    
                        ponto3.x=point.x;
                        ponto3.y=point.y;  
                    }
                    if(level==8){
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
            }
        }, this);

        var aceitaMidle = false;
        segundos = 0;
        var sgm = false;


        this.input.on('pointerdown', function (pointer) {
            
            var ultimo = false;
            if(ultimo==false){
                line.setTo(pointer.x, pointer.y, pointer.x, pointer.y);
            }

            if (level==7){
                if(posto==false){
                    var mid = midpoint(point2,point3);
                    if(pointer.x<=mid.x+50 && pointer.x>=mid.x-50 && pointer.y<=mid.y+50 && pointer.y>=mid.y-50){
                        midlePoint = new Phaser.Geom.Point(mid.x,mid.y);
                        if(sgm){
                            aceitaMidle = true;
                            posto=true;
                            graphics.fillPointShape(midlePoint, 10);
                        }
                        else{
                            graphics.fillPointShape(midlePoint, 10);
                        }
                    }
                    else{
                        midlePoint = new Phaser.Geom.Point(pointer.x,pointer.y);
                        graphics.fillPointShape(midlePoint, 10);
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
                        if (level == 6 && pointer.x <= point.x+50 && pointer.x >= point.x-50 && pointer.y <= point.y+50 && pointer.y >= point.y-50){
                            line.setTo(point.x, point.y, point.x, point.y);
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

            if(level != 6 && level !=8){
                if (level==7){
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
                else{
                    graphics.clear();
                    graphics.lineStyle(4, color);
                    graphics.strokeLineShape(line);
                }
            }
            else{
                graphics.clear();
                for(var i= 0;i<lines.length;i++){
                    graphics.lineStyle(4, color);
                    graphics.strokeLineShape(lines[i]);
                }             
                graphics.strokeLineShape(line);
            }
        });

        this.input.on('pointermove', function (pointer) { 
            
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
                            if(level == 6 && pointer.x <= point.x+50 && pointer.x >= point.x-50 && pointer.y <= point.y+50 && pointer.y >= point.y-50){
                                line.x2 = point.x; 
                                line.y2 = point.y; 
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
                
            if(level != 6 && level!=8){
                if(level==7){
                    if (segmentoReta(point2,point3,line)){
                        sgm = true;
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
                }
                else{
                    graphics.clear();
                    graphics.lineStyle(4, color);
                    graphics.strokeLineShape(line);
                }
            }
            else{
                graphics.clear();
                for(var i= 0;i<lines.length;i++){
                    graphics.lineStyle(4, color);
                    graphics.strokeLineShape(lines[i]);
                }
                graphics.lineStyle(4, color);
                graphics.strokeLineShape(line);
                }
            }
        });

        this.input.on('pointerup', function (pointer) {

            if(level != 6 && level!=8){
                 if (level==7){
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
                }
                else{
                    graphics.clear();
                    graphics.lineStyle(4, color);
                    graphics.strokeLineShape(line);
                }
            }
            else{
                if(level==6){
                    if (contador==1){
                        lines.push(line);
                    }
                    contador = 1;
                    if(reta(point2,point3,line)){
                        um = true; 
                        texto.setText([
                            'Level: ' + level,
                            'Reta: BC'
                        ]);
                    }
                    else{
                        if(reta(point,point3,line) && um == true){
                            dois = true; 
                        }
                        else{
                            score-=5;
                            lines.pop();
                            graphics.clear();
                        }
                    }                
                    for(var i= 0;i<lines.length;i++){
                        graphics.strokeLineShape(lines[i]);
                    }
                    line = new Phaser.Geom.Line(); 

                    if(um && dois){
                        aceita=true;
                    }
                }
                if(level==8){
                    if (contador==1){
                        lines.push(line);
                    }
                    contador = 1;
                    if(reta(point2,point3,line)){
                        um = true; 
                        texto.setText([
                            'Level: ' + level,
                            'Reta Paralela'
                        ]);
                    }
                    else{
                        if(reta(point,point4,line) && um == true){
                            dois = true; 
                        }
                        else{
                            score-=5;
                            lines.pop();
                            graphics.clear();
                        }
                    }                
                    for(var i= 0;i<lines.length;i++){
                        graphics.strokeLineShape(lines[i]);
                    }
                    line = new Phaser.Geom.Line(); 
    
                    if(um && dois){
                        aceita=true;
                    }
                }
                
            }
            
            if ((level==1 && segmentoReta(point2,point3,line)) || (level==2 && segmentoReta(point3,point2,line)) 
            || (level==3 && semiReta(point2,point3,line)) || (level==4 && comecaAntesAcabaNoPonto(point3,point2,line))
            ||(level==5 && reta(point2,point3,line)) ){
                aceita = true; 
            }

            else{
                if(level==7){
                    if(sgm){
                        texto.setText([
                            'Level: ' + level,
                            'Ponto Medio'
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
                }
            else{
                line = new Phaser.Geom.Line(); 
                }
            }
    
            if (aceita){
                clearInterval(contaTempo);
                setTimeout(() =>{
                    contador = 0;
                    sgm = false;
                    aceitaMidle = false;
                    posto = false;
                    um = false;
                    dois = false; 
                    lines = [];
                    j = 0;
                    certas += 1;
                    midlePoint = null; 
                    x = Math.random()*(800 - 300) + 300;
                    y = Math.random()*(600 - 300) + 300;
                    x1 = Math.random()*(800 - 300) + 300;
                    y1 = Math.random()*(600 - 300) + 300;
                    var flag = false; 
                    while (y > 450 || y1>450 || x==x1 || x==y || x==y1 || x1==y1 || y==x1 || y==y1 || dist(x,y,x1,y1)<=150 ){
                        x = Math.random()*(800 - 300) + 300;
                        y = Math.random()*(600 - 300) + 300;
                        x1 = Math.random()*(800 - 300) + 300;
                        y1 = Math.random()*(600 - 300) + 300;
                    }

                    letraa.x = x+5; 
                    letraa.y = y+5;
                    letrab.x = x1+5;
                    letrab.y = y1+5;
                    
                    if (segundos >= 100){
                        score += 5;
                    }
                    else{
                        score += (100-segundos) * level;
                    }
                    segundos = 0; 

                    if (certas == 3){
                        level += 1; 
                        certas = 0;
                        flag = true;
                    }
                
                    if (level==1){
                        texto.setText([
                            'Level: ' + level,
                            'Segmento de reta: [AB]'
                        ]);
                    }
                    var p = false; 
                    if (level==2){
                        texto.setText([
                            'Level: ' + level,
                            'Segmento de reta: [BA]'
                        ]);
                        if(flag){
                            clearInterval(contaTempo);
                            info.x = 0.5 * game.config.width;
                            info.y = 0.5 *game.config.height;
                            escondePontos([letraa,letrab,ponto1,ponto2]);
                            p = true;

                            setTimeout(() =>{
                                escondePontos([info])
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                contaTempo = setInterval(function(){ segundo() },1000);
                            }, 1000);

                        segundos = 0;
                        }
                    }
                
                    if (level==3){
                        texto.setText([
                            'Level: ' + level,
                            'Semi-reta: [AB['
                        ]);
                        if (flag){
                            clearInterval(contaTempo);

                            info.x = 0.5 * game.config.width;
                            info.y = 0.5 *game.config.height;
                            escondePontos([letraa,letrab,ponto1,ponto2]);
                            p = true;

                            setTimeout(() =>{
                                escondePontos([info]);
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                contaTempo = setInterval(function(){ segundo() },1000);
                            }, 1000);
                            segundos = 0;
                        }
                    }
                
                    if (level==4){
                        texto.setText([
                            'Level: ' + level,
                            'Semi-reta: ]BA]'
                        ]);
                        if(flag){
                            clearInterval(contaTempo);

                            info.x = 0.5 * game.config.width;
                            info.y = 0.5 *game.config.height;
                            escondePontos([letraa,letrab,ponto1,ponto2]);
                            p = true;

                            setTimeout(() =>{
                                escondePontos([info]);
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                contaTempo = setInterval(function(){ segundo() },1000);
                            }, 1000);
                            segundos = 0;
                        }
                    }
                
                    if (level==5){
                        texto.setText([
                            'Level: ' + level,
                            'Reta'
                        ]);
                        if(flag){
                            clearInterval(contaTempo);

                            info.x = 0.5 * game.config.width;
                            info.y = 0.5 *game.config.height;
                            escondePontos([letraa,letrab,ponto1,ponto2]);
                            p = true;

                            setTimeout(() =>{
                                escondePontos([info]);
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                contaTempo = setInterval(function(){ segundo() },1000);
                            }, 1000);
                        segundos = 0;
                        }
                    }
        
                    graphics.clear();
                    point2 = new Phaser.Geom.Point(x, y);
                    point3 = new Phaser.Geom.Point(x1, y1);
                    pointsLine = getPointsOnLine(point2,point3); 
        
                    if(level==6){
                        texto.setText([
                            'Level: ' + level,
                            'Reta: AB'
                        ]);
                        graphics.clear();
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
                        for(var i=0;i<pointsLine2.length;i++){
                            pointsLine.push(pointsLine2[i]);
                        }
                        if(flag){
                            clearInterval(contaTempo);
                            info.x = 0.5 * game.config.width;
                            info.y = 0.5 *game.config.height;
                            escondePontos([letraa,letrab,letrac,ponto1,ponto2,ponto3]);

                            p = true;

                            setTimeout(() =>{
                                escondePontos([info]);
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
                            }, 1000);

                            segundos = 0;
                        }
                        if(!p){
                            letrac.x = a+5; 
                            letrac.y = b+5;
                            ponto3.x = a;
                            ponto3.y = b;
                        }
                    }   
                    if(level==7){
                        texto.setText([
                            'Level: ' + level,
                            'Segmento de reta: [AB]'
                        ]);
                        escondePontos([ponto3,letrac]);
                        if(flag){
                            clearInterval(contaTempo);
                            info.x = 0.5 * game.config.width;
                            info.y = 0.5 *game.config.height;
                            escondePontos([letraa,letrab,ponto1,ponto2]);
                            p = true;
                            setTimeout(() =>{
                                escondePontos([info]);
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                contaTempo = setInterval(function(){ segundo() },1000);
                            }, 500);
                            segundos = 0; 
                        }
                    }

                    if(level==8){
                        texto.setText([
                            'Level: ' + level,
                            'Reta: AB'
                        ]);
                        graphics.clear();
                        lines[j] = new Phaser.Geom.Line();
                        line = lines[j];
                        [point,point4] = pontosParalelo(x,y,x1,y1);                    
                        var pointsLine2 = getPointsOnLine(point,point4);
                        for(var i=0;i<pointsLine2.length;i++){
                            pointsLine.push(pointsLine2[i]);
                        }
                        if(flag){   
                            clearInterval(contaTempo);
                            info.x = 0.5 * game.config.width;
                            info.y = 0.5 *game.config.height;
                            escondePontos([letraa,letrab,letrac,letrad,ponto1,ponto2,ponto3,ponto4]);
                            p = true;
                            setTimeout(() =>{
                                escondePontos([info]);
                                ponto1.x=x;
                                ponto1.y=y;
                                ponto2.x=x1;
                                ponto2.y=y1;
                                ponto4.x = point4.x;
                                ponto4.y = point4.y;
                                letraa.x = x+5;
                                letraa.y = y+5;
                                letrad.x = point4.x+5;
                                letrad.y = point4.y+5;
                                letrab.x = x1+5;
                                letrab.y = y1+5;
                                letrac.x = point.x+5; 
                                letrac.y = point.y+5;
                                ponto3.x = point.x;
                                ponto3.y = point.y;
                                contaTempo = setInterval(function(){ segundo() },1000);
                            }, 1000);
                            segundos = 0;
                        }
                        else{
                            ponto3.x = point.x;
                            ponto3.y = point.y;
                            ponto4.x = point4.x;
                            ponto4.y = point4.y;
                            letrad.x = point4.x+5;
                            letrad.y = point4.y+5;
                            letrac.x = point.x+5; 
                            letrac.y = point.y+5;
                        }
                    }

                    if (p==false){  
                        ponto1.x=x;
                        ponto1.y=y;
                        ponto2.x=x1;
                        ponto2.y=y1;
                    }

                    aceita = false;

                },1000);  
                contaTempo = setInterval(function(){ segundo() },1000);
            }
            else{
                graphics.clear();
                if(level!=6 && level!=8){
                    if (level==7){
                        if(midlePoint!=null){
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
                    }
                    else{
                        graphics.clear();
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                }
                else{
                    for(var i= 0;i<lines.length;i++){
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(lines[i]);
                    }
                }
                if(score>=5){
                    score -= 5;
                }
                else{
                    score = 0;
                }
                line = new Phaser.Geom.Line(); 
            }
        });
    }

    update(){
        timer.setText([segundos + ' s' ]);
        textScore.setText(['Score: ' + score ]);
    }
}


function segmentoReta(a,b,line){ //Verifica se é um segmento de reta de A para b 

    if (line.getPointB().x == b.x && line.getPointB().y == b.y && line.getPointA().x==a.x  && line.getPointA().y==a.y){
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

    while(pontoA.x> 450){
        for(var i=0; i<points.length;i++){
            if(points[i].x<450 && dist(points[i].x,points[i].y,pontoB.x,pontoB.y)>50){
                pontoA = points[i];
            }
        }
    }
    while(pontoB.x> 450){
        for(var i=0; i<points.length;i++){
            if(points[i].x<450 && dist(points[i].x,points[i].y,pontoA.x,pontoA.y)>50){
                pontoB = points[i];
            }
        }
    }

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
    var declive = (ponto1.y-ponto2.y)/(ponto1.x-ponto2.x);
    console.log(declive);
    if(declive<0){
        pointerLine.setTo(ponto1.x,ponto1.y,ponto2.x,ponto2.y);
    }
    else{
        pointerLine.setTo(ponto2.x,ponto2.y,ponto1.x,ponto1.y);
    }
    var normalAngle = Phaser.Geom.Line.NormalAngle(pointerLine);
    var ponto = pointerLine.getRandomPoint(); 
    while(dist(ponto.x,ponto.y,ponto1.x,ponto1.y)<50 && dist(ponto.x,ponto.y,ponto2.x,ponto2.y)<50){
        ponto = pointerLine.getRandomPoint(); 
    }
    var perp = new Phaser.Geom.Line();
    
    Phaser.Geom.Line.SetToAngle(perp,ponto.x,ponto.y,normalAngle,200);
    
    var pontoA = perp.getPointA();
    var pontoB = perp.getPointB(); 

    return [pontoA,pontoB];
}