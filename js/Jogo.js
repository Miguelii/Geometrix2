var segundos = 0;
function segundo(){
    segundos++;
}
setInterval(function(){ segundo() },1000);
var lines = [];
var j = 0; 
var um = false;
var dois = false; 
var timer;
var score = 0; 
var textScore;

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
    }
        
    create (){
        
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'background');
        this.background.setScale(0.79);
        var color =  0xffffff;
        var contador = 0;
        var certas = 0; 
        var level = 1; 

        var text = this.add.text(400, 100, '', { font: '12px Courier', fill: '#00ff00' });
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


        this.btHome.on('pointerover', () => {
        this.btHome.displayHeight += 5;
        this.btHome.displayWidth += 5;
    
        });
        this.btHome.on('pointerout', () => {
        this.btHome.displayHeight -= 5;
        this.btHome.displayWidth -= 5;
        });

        this.btHome.once('pointerdown', function (event) {
        this.scene.transition({ target: 'Menu', duration: 100 });
        }, this);

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

        var letraa = this.add.text(x,y,'A',{
            fontFamily: 'font1',
        });
        var letrab = this.add.text(x1,y1,'B',{
            fontFamily: 'font1',
        });
        var letrac = this.add.text(-10000,-10000,'C',{
            fontFamily: 'font1',
        });;

        
        //this.ponto1 = this.add.sprite(x,y, "ponto");
        //this.ponto2 = this.add.sprite(x1,y1, "ponto");
        //this.ponto1.setScale(0.5);
        //this.ponto2.setScale(0.5);

        var line = new Phaser.Geom.Line(); 
        var midlePoint = null;
        var posto = false;

        if (level==1){
            text.setText([
                'Level: ' + level,
                'Segmento de reta: Do pequeno para o maior',
                'Score: ' + score

            ]);
        }
        if (level==2){
            text.setText([
                'Level: ' + level,
                'Segmento de reta: Do maior para o pequeno',
                'Score: ' + score
            ]);
        }

        if (level==3){
            text.setText([
                'Level: ' + level,
                'Semi-reta: Do pequeno a passar no maior',
                'Score: ' + score
            ]);
        }

        if (level==4){
            text.setText([
                'Level: ' + level,
                'Semi-reta: A acabar no mais pequeno e começa no infinito',               
                 'Score: ' + score
            ]);
        }

        if (level==5){
            text.setText([
                'Level: ' + level,
                'Reta',
                'Score: ' + score
            ]);
        }

        var point; 
        var pointsLine = getPointsOnLine(point2,point3);

        if(level==6){
            text.setText([
                'Level: ' + level,
                'Reta: Pequeno para Maior',
                'Score: ' + score
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
            graphics.fillPointShape(point, 12);
            var pointsLine2 = getPointsOnLine(point3,point);
            for(var i=0;i<pointsLine2.length;i++){
                pointsLine.push(pointsLine2[i]);
            }
            letrac.x = a; 
            letrac.y = b;
        }
        
        if(level==7){
            text.setText([
                'Level: ' + level,
                'Segmento de reta: Pequeno para Maior',
                'Score: ' + score
            ]);
        }

        graphics.fillPointShape(point2, 10);
        graphics.fillPointShape(point3, 15);

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

            if(level != 6){
                if (level==7){
                    if(midlePoint!=null){
                        graphics.clear();
                        graphics.fillPointShape(midlePoint, 10);
                        graphics.fillPointShape(point3, 15);
                        graphics.fillPointShape(point2, 10);
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                    else{
                        graphics.clear();
                        graphics.fillPointShape(point3, 15);
                        graphics.fillPointShape(point2, 10);
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                }
                else{
                    graphics.clear();
                    graphics.fillPointShape(point3, 15);
                    graphics.fillPointShape(point2, 10);
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
                graphics.fillPointShape(point, 12);
                graphics.fillPointShape(point3, 15);
                graphics.fillPointShape(point2, 10);
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
                
            if(level != 6){
                if(level==7){
                    if (segmentoReta(point2,point3,line)){
                        sgm = true;
                    }
                    if(midlePoint!=null){
                        graphics.clear();
                        graphics.fillPointShape(midlePoint, 10);
                        graphics.fillPointShape(point3, 15);
                        graphics.fillPointShape(point2, 10);
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                    else{
                        graphics.clear();
                        graphics.fillPointShape(point3, 15);
                        graphics.fillPointShape(point2, 10);
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                }
                else{
                    graphics.clear();
                    graphics.fillPointShape(point3, 15);
                    graphics.fillPointShape(point2, 10);
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
                graphics.fillPointShape(point3, 15);
                graphics.fillPointShape(point, 12);
                graphics.fillPointShape(point2, 10);
                graphics.lineStyle(4, color);
                graphics.strokeLineShape(line);
                }
            }
        });

        this.input.on('pointerup', function (pointer) {

            if(level != 6){
                 if (level==7){
                    if(midlePoint!=null && sgm==true){
                        graphics.fillPointShape(midlePoint, 10);
                        posto = true;
                        graphics.fillPointShape(point3, 15);
                        graphics.fillPointShape(point2, 10);
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                    else{
                        graphics.clear();
                        posto = false;
                        graphics.fillPointShape(point3, 15);
                        graphics.fillPointShape(point2, 10);
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                    
                }
                else{
                    graphics.clear();
                    graphics.fillPointShape(point3, 15);
                    graphics.fillPointShape(point2, 10);
                    graphics.lineStyle(4, color);
                    graphics.strokeLineShape(line);
                }
            }
            else{
                if (contador==1){
                    lines.push(line);
                }
                contador = 1;
                if(reta(point2,point3,line)){
                    um = true; 
                    text.setText([
                        'Level: ' + level,
                        'Reta: Medio para Maior',
                        'Score: ' + score
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

                graphics.fillPointShape(point3, 15);
                graphics.fillPointShape(point2, 10);
                graphics.fillPointShape(point, 12);
                line = new Phaser.Geom.Line(); 

                if(um && dois){
                    aceita=true;
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
                        text.setText([
                            'Level: ' + level,
                            'Ponto Medio do segmento de reta',
                            'Score: ' + score
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
                
                while (y > 450 || y1>450 || x==x1 || x==y || x==y1 || x1==y1 || y==x1 || y==y1 || dist(x,y,x1,y1)<=150 ){
                    x = Math.random()*(800 - 300) + 300;
                    y = Math.random()*(600 - 300) + 300;
                    x1 = Math.random()*(800 - 300) + 300;
                    y1 = Math.random()*(600 - 300) + 300;
                }

                letraa.x = x; 
                letraa.y = y;
                letrab.x = x1;
                letrab.y = y1;
                
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
                }
                if(level == 8){
                    this.scene.transition({ target: 'Menu', duration: 100 });
                }

                if (level==1){
                    text.setText([
                        'Level: ' + level,
                        'Segmento de reta: Do pequeno para o maior',
                        'Score: ' + score
                    ]);
                }
                if (level==2){
                    text.setText([
                        'Level: ' + level,
                        'Segmento de reta: Do maior para o pequeno',
                        'Score: ' + score
                    ]);
                }
            
                if (level==3){
                    text.setText([
                        'Level: ' + level,
                        'Semi-reta: Do pequeno a passar no maior',
                        'Score: ' + score
                    ]);
                }
            
                if (level==4){
                    text.setText([
                        'Level: ' + level,
                        'Semi-reta: A acabar no mais pequeno e começa no infinito',
                        'Score: ' + score
                    ]);
                }
            
                if (level==5){
                    text.setText([
                        'Level: ' + level,
                        'Reta',
                        'Score: ' + score
                    ]);
                }
    
                graphics.clear();
                point2 = new Phaser.Geom.Point(x, y);
                point3 = new Phaser.Geom.Point(x1, y1);
                pointsLine = getPointsOnLine(point2,point3); 
    
                if(level==6){
                    text.setText([
                        'Level: ' + level,
                        'Reta: Pequeno para Maior',
                        'Score: ' + score
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
                    graphics.fillPointShape(point, 12);
                    
                    var pointsLine2 = getPointsOnLine(point3,point);
                    for(var i=0;i<pointsLine2.length;i++){
                        pointsLine.push(pointsLine2[i]);
                    }
                    letrac.x = a; 
                    letrac.y = b;
                    
                }
                if(level==7){
                    text.setText([
                        'Level: ' + level,
                        'Segmento de reta: Pequeno para Maior',
                        'Score: ' + score
                    ]);
                    letrac.x = -100000;
                    letrac.y = -100000;
                }
                
                graphics.fillPointShape(point2, 10);
                graphics.fillPointShape(point3, 15);
                
                aceita = false;
            }
            else{
                graphics.clear();
                if(level!=6){
                    if (level==7){
                        if(midlePoint!=null){
                            graphics.fillPointShape(midlePoint, 10);
                            posto = true;
                            graphics.fillPointShape(point3, 15);
                            graphics.fillPointShape(point2, 10);
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                        }
                        else{
                            graphics.clear();
                            posto = false;
                            graphics.fillPointShape(point3, 15);
                            graphics.fillPointShape(point2, 10);
                            graphics.lineStyle(4, color);
                            graphics.strokeLineShape(line);
                        }
                    }
                    else{
                        graphics.clear();
                        graphics.fillPointShape(point3, 15);
                        graphics.fillPointShape(point2, 10);
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(line);
                    }
                }
                else{
                    for(var i= 0;i<lines.length;i++){
                        graphics.lineStyle(4, color);
                        graphics.strokeLineShape(lines[i]);
                    }
                    graphics.fillPointShape(point2, 10);
                    graphics.fillPointShape(point3, 15);
                    graphics.fillPointShape(point2, 10);
                    graphics.fillPointShape(point, 12);
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
    if(continua1&&continua2&&continua3 && 100 + dist(a.x,a.y,b.x,b.y) <= dist(line.getPointA().x,
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