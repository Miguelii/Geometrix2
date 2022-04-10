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

        this.btclose = this.add.sprite(0.69 * game.config.width, 0.18 * game.config.height, 'btclose');
        this.btclose.setScale(0.35);
        this.btclose.visible = false;
        this.btclose.name = 'btclose';

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

        

        this.input.on('gameobjectdown', function(pointer, gameObject) {
            switch (gameObject.name) {
                case 'btplay':
                    this.scene.transition({ target: 'Jogo', duration: 100 });
                    this.btcreditos.disableInteractive();
                    this.btinfo.disableInteractive();
                    this.bttop.disableInteractive();
                    this.btplay.disableInteractive();
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
                    this.btcreditos.visible = true;
                    this.btinfo.visible = true;
                    this.bttop.visible = true;
                    this.btplay.visible = true;
                    break;
        
                default:
                    break;
            }
        }, this);


    }
        

    update() {
    }
}