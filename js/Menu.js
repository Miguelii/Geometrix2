var x; 
var y;
var flag = false; 
var nome;
var nome2;  
var d = new Date();
var m = d.getMonth();
var n = d.getFullYear();
if (m > 7) {
    var x = n;
    var y = n +1;
}
else {
    var x = n - 1;
    var y = n;
}
let di = x+"-09-01";
let df = y + "-08-31";
var hide = false; 
class Menu extends Phaser.Scene {
    constructor() {
        super('Menu');
    }

    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('titulo1', 'assets/titulo1.png');
        this.load.image('btplay', 'assets/btPlay.png');
        this.load.image('btinfo', 'assets/btInfo.png');
        this.load.image('bttop', 'assets/btTop.png');
        this.load.image('nave', 'assets/nave.png');
        this.load.image('btcredittos', 'assets/btCreditos.png');
        this.load.image('creditos', 'assets/creditos.png');
        this.load.image('btclose', 'assets/btclose.png');
        this.load.image('btlogin', 'assets/login.png');
        this.load.image('quadrologin', 'assets/quadrologin.png');
        this.load.image('btlogout', 'assets/logout.png');

    }


    create() {
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'background');
        this.background.setScale(1);

        this.btplay = this.add.sprite(0.5 * game.config.width, 0.3 *game.config.height, "btplay");
        this.btplay.setScale(1.3);
        this.btplay.setInteractive({ useHandCursor: true });
        this.btplay.name = 'btplay';

        this.btplay.on('pointerover', () => {
        this.btplay.displayHeight += 5;
        this.btplay.displayWidth += 5;

        });
        this.btplay.on('pointerout', () => {
        this.btplay.displayHeight -= 5;
        this.btplay.displayWidth -= 5;
        });

        this.title = this.add.sprite(0.5 * game.config.width, 0.85   *game.config.height, "titulo1");
        this.title.setScale(1);

        this.btcreditos = this.add.sprite(0.30 * game.config.width, 0.5*game.config.height, "btcredittos");
        this.btcreditos.setScale(1.3);
        this.btcreditos.setInteractive({ useHandCursor: true });
        this.btcreditos.name = 'btcreditos';

        this.btcreditos.on('pointerover', () => {
            this.btcreditos.displayHeight += 5;
            this.btcreditos.displayWidth += 5;
        });
        this.btcreditos.on('pointerout', () => {
            this.btcreditos.displayHeight -= 5;
            this.btcreditos.displayWidth -= 5;
        });

        this.creditos = this.add.sprite(0.5 * game.config.width, 0.4 * game.config.height, 'creditos');
        this.creditos.setScale(1.5);
        this.creditos.visible = false;
        this.creditos.name = 'creditos';


        this.bttop = this.add.sprite(0.5 * game.config.width, 0.6*game.config.height, "bttop");
        this.bttop.setScale(1.3);
        this.bttop.name = 'top';
        this.bttop.setInteractive({ useHandCursor: true });

        
        this.bttop.on('pointerover', () => {
            this.bttop.displayHeight += 5;
            this.bttop.displayWidth += 5;
        });
        this.bttop.on('pointerout', () => {
            this.bttop.displayHeight -= 5;
            this.bttop.displayWidth -= 5;
        });


        this.btinfo = this.add.sprite(0.7 * game.config.width, 0.5*game.config.height, "btinfo");
        this.btinfo.setScale(1.3);
        this.btinfo.setInteractive({ useHandCursor: true });

        this.btinfo.on('pointerover', () => {
            this.btinfo.displayHeight += 5;
            this.btinfo.displayWidth += 5;
        });
        this.btinfo.on('pointerout', () => {
            this.btinfo.displayHeight -= 5;
            this.btinfo.displayWidth -= 5;
        });

        this.nave = this.add.sprite(0.87 * game.config.width ,0.8 * game.config.height, "nave");
        this.nave.setScale(1);


        //LOGIN
        this.btlogin = this.add.sprite(0.95 * game.config.width ,0.11 * game.config.height, "btlogin");
        this.btlogin.setScale(0.8);
        this.btlogin.setInteractive({ useHandCursor: true });
        this.btlogin.name = 'btlogin';

        this.quadrologin = this.add.sprite(0.5 * game.config.width, 0.4 * game.config.height, "quadrologin");
        this.quadrologin.setScale(1.5);
        this.quadrologin.visible = false;

        this.loginfinal = this.add.sprite(0.5 * game.config.width, 0.58 * game.config.height, "btlogin");
        this.loginfinal.setInteractive({ useHandCursor: true });
        this.loginfinal.setScale(0.8);
        this.loginfinal.visible = false;

        this.logout = this.add.sprite(0.95 * game.config.width ,0.11 * game.config.height, "btlogout");
        this.logout.setInteractive({ useHandCursor: true });
        this.logout.setScale(0.8);
        this.logout.visible = false;
        this.logout.name = 'logout';

        this.loginfinal.on('pointerover', () => {
            this.loginfinal.displayHeight += 5;
            this.loginfinal.displayWidth += 5;

        });
        this.loginfinal.on('pointerout', () => {
            this.loginfinal.displayHeight -= 5;
            this.loginfinal.displayWidth -= 5;

        });
        this.btlogin.on('pointerover', () => {
            this.btlogin.displayHeight += 5;
            this.btlogin.displayWidth += 5;

        });
        this.btlogin.on('pointerout', () => {
            this.btlogin.displayHeight -= 5;
            this.btlogin.displayWidth -= 5;

        });
        this.logout.on('pointerover', () => {
            this.logout.displayHeight += 5;
            this.logout.displayWidth += 5;

        });
        this.logout.on('pointerout', () => {
            this.logout.displayHeight -= 5;
            this.logout.displayWidth -= 5;

        });
        
        this.loginErrorMsg = this.add.text(0.42 * game.config.width, 0.49 * game.config.height,"Utilizador ou Password Errados",{ fontFamily: 'font1',fontSize: 25,color: '#ff0000',align: 'center'});
        this.loginErrorMsg.visible = false;

        this.utilizador = this.add.text(0.46 * game.config.width, 0.22 * game.config.height, "Utilizador:", { fontFamily: 'font1', fontSize: 40, color: '#403217' })
        this.utilizador.visible = false;

        this.password = this.add.text(0.46 * game.config.width, 0.37 * game.config.height, "Password:", { fontFamily: 'font1', fontSize: 40, color: '#403217' })
        this.password.visible = false;
           
        let user = `
        <input type="text" name="username" style="font-size: 15px;font-family:'font1';text-align:center;">
        `;
        
        let pass = `
        <input type="password" name="password" style="font-size: 15px;font-family:'font1';text-align:center;">
        `;      
                
        x = this.add.dom(0.5 * game.config.width, 0.3 * game.config.height).createFromHTML(user);
        x.setScale(2.5);
        x.visible = false;
        


        y = this.add.dom(0.5 * game.config.width, 0.45 * game.config.height).createFromHTML(pass);
        y.setScale(2.5);
        y.visible = false;

        
        ////

        this.btclose = this.add.sprite(0.69 * game.config.width, 0.18 * game.config.height, 'btclose');
        this.btclose.setScale(0.9);
        this.btclose.visible = false;
        this.btclose.name = 'btclose';

        this.btcloseLog = this.add.sprite(0.69 * game.config.width, 0.18 * game.config.height, 'btclose');
        this.btcloseLog.setScale(0.9);
        this.btcloseLog.visible = false;
        this.btclose.name = 'btcloseLog';

        this.btclose.on('pointerover', () => {
            this.btclose.displayHeight += 5;
            this.btclose.displayWidth += 5;
        });
        this.btclose.on('pointerout', () => {
            this.btclose.displayHeight -= 5;
            this.btclose.displayWidth -= 5;
        });
        this.ola = this.add.text(0.1 * game.config.width ,0.08 * game.config.height,"Olá " + nome2,{ fontFamily: 'font1',fontSize: 50,color: '#ffffff',align: 'center'});
        this.ola.visible = false;


        this.btcloseLog.on('pointerover', () => {
            this.btcloseLog.displayHeight += 5;
            this.btcloseLog.displayWidth += 5;

        });
        this.btcloseLog.on('pointerout', () => {
            this.btcloseLog.displayHeight -= 5;
            this.btcloseLog.displayWidth -= 5;

        });
        this.input.on('gameobjectdown', function(pointer, gameObject) {
            switch (gameObject.name) {
                case 'btplay':
                    stop = true; 
                    this.scene.transition({ target: 'Jogo', duration: 100 });
                    this.btcreditos.disableInteractive();
                    this.btinfo.disableInteractive();
                    this.bttop.disableInteractive();
                    this.btplay.disableInteractive();
                    this.loginfinal.disableInteractive();
                    break;
                case 'btcreditos':
                    this.creditos.visible = true;
                    this.btclose.visible = true;
                    this.btcreditos.visible = false;
                    this.btinfo.visible = false;
                    this.bttop.visible = false;
                    this.btplay.visible = false;
                    this.btclose.setInteractive({ useHandCursor: true });
                    this.btclose.on('pointerup', function () {
                        hide = true; 
                    }, this);
                    break;

                case 'btclose':
                    //Enable menu sprites
                    this.btclose.disableInteractive();
                    this.btcreditos.setInteractive();
                    this.btinfo.setInteractive();
                    this.bttop.setInteractive();
                    this.btplay.setInteractive();

                    this.creditos.visible = false;
                    this.btclose.visible = false;
                    this.quadrologin.visible = false;
                    this.loginfinal.visible = false;
                    this.btcreditos.visible = true;
                    this.btinfo.visible = true;
                    this.bttop.visible = true;
                    this.btplay.visible = true;
                    break;
                case 'top':
                    getTOP(di, df, "", "", this);
                    
                    flag = true; 
                    break;
                case 'btlogin':
                    //Disable menu sprites
                    this.btcreditos.disableInteractive();
                    this.btinfo.disableInteractive();
                    this.bttop.disableInteractive();
                    this.btplay.disableInteractive();
                    this.quadrologin.visible = true;
                    this.btcloseLog.visible = true;
                    this.btcloseLog.setInteractive({ useHandCursor: true });
                    this.loginfinal.visible = true;
                    this.password.visible = true;
                    this.utilizador.visible = true;
                    x.visible = true;
                    y.visible = true;

                    this.loginfinal.on('pointerup', function () {
                        let user = x.getChildByName("username").value
                        let password = y.getChildByName("password").value

                        if (user != '' && password != '') {
                            let r = login(user, password,this);
                            x.getChildByName("username").value = '';
                            y.getChildByName("password").value = '';
                            
                    }
                    }, this);

                    this.btcloseLog.on('pointerup', function () {
                        hide = true; 
                    }, this);

                    break;
                case 'logout': 
                    this.logout.visible = false; 
                    this.btlogin.visible = true; 
                    this.ola.visible = false;
                    infoUser.logout();
                    break;
        
                default:
                    break;
            }
        }, this); 
       
        
    }
        

    update() {

        
        if(hide){
            this.btclose.disableInteractive();
            this.btcloseLog.disableInteractive();
            this.btcreditos.setInteractive();
            this.btinfo.setInteractive();
            this.bttop.setInteractive();
            this.btplay.setInteractive();

            this.creditos.visible = false;
            this.btclose.visible = false;

            this.btcloseLog.visible = false;
            this.quadrologin.visible = false;
            this.loginfinal.visible = false;
            this.btcreditos.visible = true;
            this.btinfo.visible = true;
            this.bttop.visible = true;
            this.btplay.visible = true;
            //Login hide
            this.password.visible = false;
            this.utilizador.visible = false;
            x.visible = false;
            y.visible = false;
            this.loginErrorMsg.visible = false;
            hide = false; 
        }

        if(infoUser.user!='') {
            nome = infoUser.firstName.split(" ");
            nome2 = nome[0] + " " + nome[nome.length - 1];
            this.ola.setText(['Olá ' + nome2]);

            this.ola.visible = true;
            this.loginErrorMsg.visible = false;
            this.quadrologin.visible = false;
            this.btcloseLog.visible = false;
            this.loginfinal.visible = false;
            this.password.visible = false;
            this.utilizador.visible = false;
            
            this.btlogin.visible = false;    
                    
            if(!stop){
                x.visible = false;
                y.visible = false;
                if(!flag){
                    this.btcreditos.setInteractive();
                    this.btinfo.setInteractive();
                    this.bttop.setInteractive();
                    this.btplay.setInteractive();
                }
                
            }

            
            this.logout.visible = true;
        } 
    }
}