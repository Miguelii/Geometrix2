var nv = 2 ; 
class ChangeLevel extends Phaser.Scene {
    constructor() {
        super('ChangeLevel');
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
        this.load.image('pontoteste', 'assets/pontoteste.png');
        this.load.image('info', 'assets/quadroinfo.png');

    }
    create (){
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'background');
        this.background.setScale(0.79);
        this.titulo1 = this.add.sprite(0.5 * game.config.width, 0.15 *game.config.height, 'titulo1');
        this.titulo1.setScale(0.6);
        this.info = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'info');
        var text = this.add.text(800, 150, '', { fontFamily: 'font1',align: 'right'});
        text.setFontSize(15);
        text.setText(['Level: ' + nv]);
    } 
}