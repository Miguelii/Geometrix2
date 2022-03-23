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


    }


    create() {
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'background');
        this.background.setScale(0.79);


        this.btplay = this.add.sprite(0.5 * game.config.width, 175, "btplay");
        this.btplay.setScale(0.8);
        this.btplay.setInteractive({ useHandCursor: true });

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

        this.btcreditos.on('pointerover', () => {
            this.btcreditos.displayHeight += 5;
            this.btcreditos.displayWidth += 5;
        });
        this.btcreditos.on('pointerout', () => {
            this.btcreditos.displayHeight -= 5;
            this.btcreditos.displayWidth -= 5;
        });

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

        
        this.btplay.once('pointerdown', function (event) {
            this.btcreditos.disableInteractive();
            this.btinfo.disableInteractive();
            this.bttop.disableInteractive();
            this.btplay.disableInteractive();
            this.scene.transition({ target: 'Jogo', duration: 100 });
        }, this);

    }
        

    update() {
    }
}