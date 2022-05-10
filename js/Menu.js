
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
        
        this.loginErrorMsg = this.add.text(0.40 * game.config.width, 0.51 * game.config.height,"Utilizador ou Password Errados",{ fontFamily: 'font1',fontSize: 15,color: '#ff0000',align: 'center'});
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
                
        var x = this.add.dom(0.5 * game.config.width, 0.3 * game.config.height).createFromHTML(user);
        x.setScale(2.5);
        x.visible = false;
        
        var y = this.add.dom(0.5 * game.config.width, 0.45 * game.config.height).createFromHTML(pass);
        y.setScale(2.5);
        y.visible = false;
        ////

        this.btclose = this.add.sprite(0.69 * game.config.width, 0.18 * game.config.height, 'btclose');
        this.btclose.setScale(0.9);
        this.btclose.visible = false;
        this.btclose.name = 'btclose';

        this.btclose.on('pointerover', () => {
            this.btclose.displayHeight += 5;
            this.btclose.displayWidth += 5;
        });
        this.btclose.on('pointerout', () => {
            this.btclose.displayHeight -= 5;
            this.btclose.displayWidth -= 5;
        });

        this.input.on('gameobjectdown', function(pointer, gameObject) {
            switch (gameObject.name) {
                case 'btplay':
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

                    //Login hide
                    this.password.visible = false;
                    this.utilizador.visible = false;
                    x.visible = false;
                    y.visible = false;
                    break;

                case 'btlogin':

                    //Disable menu sprites
                    this.btcreditos.disableInteractive();
                    this.btinfo.disableInteractive();
                    this.bttop.disableInteractive();
                    this.btplay.disableInteractive();

                    this.quadrologin.visible = true;
                    this.btclose.visible = true;
                    this.btclose.setInteractive({ useHandCursor: true });
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

                    break;
        
                default:
                    break;
            }
        }, this);
    }
        

    update() {
    }
}