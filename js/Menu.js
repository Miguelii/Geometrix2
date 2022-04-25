
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

    }


    create() {
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'background');
        this.background.setScale(0.79);

        this.btplay = this.add.sprite(0.5 * game.config.width, 175, "btplay");
        this.btplay.setScale(0.8);
        this.btplay.setInteractive({ useHandCursor: true });
        this.btplay.name = 'btplay'; // É necessário ter isto para o ciclo gameobjectdown funcionar

        this.btplay.on('pointerover', () => {
        this.btplay.displayHeight += 5;
        this.btplay.displayWidth += 5;

        });
        this.btplay.on('pointerout', () => {
        this.btplay.displayHeight -= 5;
        this.btplay.displayWidth -= 5;
        });

        this.title = this.add.sprite(0.5 * game.config.width, 510, "titulo1");
        this.title.setScale(0.8);


        this.btcreditos = this.add.sprite(0.5 * game.config.width - 200, 320, "btcredittos");
        this.btcreditos.setScale(0.65);
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
        this.creditos.setScale(0.75);
        this.creditos.visible = false;
        this.creditos.name = 'creditos';



        this.bttop = this.add.sprite(0.5 * game.config.width, 365, "bttop");
        this.bttop.setScale(0.65);
        this.bttop.setInteractive({ useHandCursor: true });

        
        this.bttop.on('pointerover', () => {
            this.bttop.displayHeight += 5;
            this.bttop.displayWidth += 5;
        });
        this.bttop.on('pointerout', () => {
            this.bttop.displayHeight -= 5;
            this.bttop.displayWidth -= 5;
        });


        this.btinfo = this.add.sprite(0.5 * game.config.width + 200, 320, "btinfo");
        this.btinfo.setScale(0.65);
        this.btinfo.setInteractive({ useHandCursor: true });

        this.btinfo.on('pointerover', () => {
            this.btinfo.displayHeight += 5;
            this.btinfo.displayWidth += 5;
        });
        this.btinfo.on('pointerout', () => {
            this.btinfo.displayHeight -= 5;
            this.btinfo.displayWidth -= 5;
        });

        this.nave = this.add.sprite(0.5 * game.config.width + 390, 480, "nave");
        this.nave.setScale(0.5);


        //LOGIN
        this.btlogin = this.add.sprite(0.85 * game.config.width ,0.15 * game.config.height, "btlogin");
        this.btlogin.setScale(0.65);
        this.btlogin.setInteractive({ useHandCursor: true });
        this.btlogin.name = 'btlogin';

        this.quadrologin = this.add.sprite(0.5 * game.config.width, 0.4 * game.config.height, "quadrologin");
        this.quadrologin.setScale(0.75);
        this.quadrologin.visible = false;

        this.loginfinal = this.add.sprite(0.5 * game.config.width, 0.58 * game.config.height, "btlogin");
        this.loginfinal.setInteractive({ useHandCursor: true });
        this.loginfinal.setScale(0.5);
        this.loginfinal.visible = false;

        this.loginErrorMsg = this.add.text(0.40 * game.config.width, 0.51 * game.config.height,"Utilizador ou Password Errados",{ fontFamily: 'font1',fontSize: 15,color: '#ff0000',align: 'center'});
        this.loginErrorMsg.visible = false;

        /*
        this.utilizador = this.add.text(0.44 * game.config.width, 0.2 * game.config.height, "Utilizador:", { fontFamily: 'font1', fontSize: 25, color: '#403217' })
        this.utilizador.visible = false;

        this.password = this.add.text(0.44 * game.config.width, 0.35 * game.config.height, "Password:", { fontFamily: 'font1', fontSize: 25, color: '#403217' })
        this.password.visible = false;    

        */
       
        ////



        //Tem que ficar em ultimo para ficar em cima de qualquer imagem
        this.btclose = this.add.sprite(0.69 * game.config.width, 0.18 * game.config.height, 'btclose');
        this.btclose.setScale(0.35);
        this.btclose.visible = false;
        this.btclose.name = 'btclose';

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
                    
                    this.btclose.on('pointerover', () => {
                        this.btclose.displayHeight += 5;
                        this.btclose.displayWidth += 5;
                    });
                    this.btclose.on('pointerout', () => {
                        this.btclose.displayHeight -= 5;
                        this.btclose.displayWidth -= 5;
                    });
                    break;

                case 'btclose':
                    this.btclose.setInteractive(false);
                    this.creditos.visible = false;
                    this.btclose.visible = false;
                    this.quadrologin.visible = false;
                    this.loginfinal.visible = false;
                    this.btcreditos.visible = true;
                    this.btinfo.visible = true;
                    this.bttop.visible = true;
                    this.btplay.visible = true;
                    break;

                case 'btlogin':

                    this.quadrologin.visible = true;
                    this.btclose.visible = true;
                    this.loginfinal.visible = true;
                    this.btcreditos.visible = false;
                    this.btinfo.visible = false;
                    this.bttop.visible = false;
                    this.btplay.visible = false;
                    this.btclose.setInteractive({ useHandCursor: true });

                    break;
        
                default:
                    break;
            }
        }, this);
    }
        

    update() {
    }
}