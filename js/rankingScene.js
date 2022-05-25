/**
 * Class of Scene that shows ranking between players
 */
class rankingScene extends Phaser.Scene {
    /**
     * Create new empty scene
     */
     constructor() {
        super('rankingScene');
    }
    
    /**
     * Get data passed from calling scene
     * @param {*} data Data 
     */
     init(data) {
        this.array = data;
    }
    
    /**
     * Preload needed plugin
     */
    preload(){
        this.load.image('titulo1', 'assets/titulo1.png');
        this.load.image('btHome','assets/btHome.png');
        this.load.image('background', 'assets/background.png');  
        this.load.scenePlugin('rexuiplugin', 'gridTable.min.js', 'rexUI', 'rexUI');

    }

    /**
     * Create needed images and get ranking values
     */
    create() {

        var gridConfig = {
            'scene': this,
            'cols': 15,
            'rows': 15
        }
        this.aGrid = new AlignGrid(gridConfig);

        var d = new Date();
        var m = d.getMonth();
        var n = d.getFullYear();
        if (m > 7) {
            var x = n;
            var y = n + 1;
        }
        else {
            var x = n - 1;
            var y = n;
        }

        this.di = x + "-09-01";
        this.df = y + "-08-31";
        this.dificulty = 1;

        //BACKGROUND
        this.background = this.add.sprite(0.5 * game.config.width, 0.5 *game.config.height, 'background');
        this.background.setScale(1);

        //TABLEE
        var scrollMode = 0; // 0:vertical, 1:horizontal
        
        this.table = this.rexUI.add.gridTable({
            x: 1138,
            y: 686,
            width:1575,
            height:706,

            scrollMode: scrollMode,

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0xFF0000).setAlpha(0.2),

            table: {
                cellWidth: 50,
                cellHeight: 50,
                columns: 6,

                mask: {
                    padding: 2,
                    updateMode: 0,
                },

                reuseCellContainer: true,
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0x260e04),
            },
            space: {
                left: 10,
                right: 26,
                top: 132,
                bottom: 30,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {
                let newwith ;

                if (cell.index % 6 == 0) {//index
                    newwith = 10;
                }
                if (cell.index % 6 == 1) {//nome
                    newwith = 10;
                }
                if (cell.index % 6 == 2) {//pontos
                    newwith = 500;
                }
                if (cell.index % 6 == 3) {//Escola
                    newwith = 1305;
                }
                if (cell.index % 6 == 4) {//turm
                    newwith = 2140;
                }
                if (cell.index % 6 == 5) {
                    newwith = 2370;
                }


                var scene = cell.scene,
                    width = newwith,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index,

                        cellContainer = scene.rexUI.add.label({
                            width: width,
                            height: height,

                            orientation: 'top-to-bottom',
                            text: scene.add.text(50, 50, item.name, { fontFamily: "font1", fontSize: 21, color: '#000000', align: 'center' }),
                            align: 'center',
                        });

                return cellContainer;
            },
            items: this.CreateItems(600)
        }).layout();

        this.aGrid.placeAt(7, 8, this.table);


        this.titulo1 = this.add.sprite(0, 0, 'titulo1');
        this.titulo1.setScale(0.9);
        this.aGrid.placeAtIndex(37, this.titulo1);

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
        
        this.input.on('gameobjectdown', function(pointer, gameObject) {
            switch (gameObject.name) {
                case 'btHome':
                    this.scene.transition({ target: 'Menu', duration: 100 });
                    flag = false;
                    break;

                default:
                    break;
            }
        }, this); 



        this.container = this.rexUI.add.roundRectangle(0, 0, 200, 700, 0, 0xFF0000).setAlpha(0.2);
        this.container.setOrigin(0.15, 0.5);
        this.aGrid.placeAtIndex(133, this.container);

        this.lastclick;

        this.dropdown = this.rexUI.add.gridTable({
            x: 1911,
            y: 490,
            width: 180,
            height: 250,

            scrollMode: scrollMode,

            table: {
                cellWidth: 100,
                cellHeight: 50,
                columns: 1,

                mask: {
                    padding: 2,
                    updateMode: 0,
                },

                reuseCellContainer: true,
            },



            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x260e04),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, 0x7b5e57),
            },
            space: {
                left: 20,
                right: 0,
                top: 20,
                bottom: 20,

                table: 10,
                header: 10,
                footer: 10,
            },

            createCellContainerCallback: function (cell, cellContainer) {

                var scene = cell.scene,
                    width = cell.width,
                    height = cell.height,
                    item = cell.item,
                    index = cell.index,

                cellContainer = scene.rexUI.add.label({
                    width: width,
                    height: height,

                    orientation: 0,
                    icon: scene.add.circle(0,50,10).setFillStyle('0xffffff'),
                    text: scene.add.text(50, 50, item, { fontFamily: "font1", fontSize: 25, color: '#000000', align: 'center' }),
                    align: 'center',
                    space: {
                        icon: 20,
                    }
                });


                var m = d.getMonth();
                var n = d.getFullYear();
                if (m > 7) {
                    var x = n;
                    var y = n + 1;
                }
                else {
                    var x = n - 1;
                    var y = n;
                }

                x = "" + x;
                y = "" + y;

                cellContainer.setInteractive({ useHandCursor: true });
                cellContainer.on('pointerdown', () => {
                    if (scene.lastclick) {
                        scene.lastclick.setFillStyle('0xffffff');
                    }
                    scene.lastclick = cellContainer.getElement('icon').setFillStyle('0x000000');

                    if (cellContainer.getElement('text')._text != "Todos") {
                        scene.di = "20" + cellContainer.getElement('text')._text.split('-')[0] + "-9-1";
                        scene.df = "20"+cellContainer.getElement('text')._text.split('-')[1] + "-8-31";

                    }
                    else {
                        scene.di = "2015-09-01"
                        scene.df = new Date().toISOString().slice(0, 10)
                    }
                    updateTOP(scene.di, scene.df, infoUser.turma, infoUser.escola, scene.flag, scene);
                });

                let tmp = x.slice(2, 4) +"-" +y.slice(2,4);
                if (cellContainer.getElement('text')._text == tmp) {
                    scene.lastclick = cellContainer.getElement('icon').setFillStyle('0x000000');
                }

                return cellContainer;


            },
            items: this.selectYear()
        })
            .layout()


        this.ano = this.add.text(0, 0, 'Ano letivo', { fontFamily: 'font1', fontSize: 25, color: '#000000' });
        this.ano.setOrigin(0, 0.5);
        this.aGrid.placeAtIndex(73, this.ano);

        this.todos = this.add.text(0, 0, 'Todos', { fontFamily: "font1", fontSize: 25, color: '#000000', align: 'left' });


        this.todos.setOrigin(-0.5, 1.4);

        this.aGrid.placeAtIndex(178, this.todos);
        this.todos_icon = this.add.circle(0,0,10).setFillStyle('0xffffff');

        this.todos_icon.setOrigin(0.5, 2);
        this.aGrid.placeAtIndex(178, this.todos_icon);
        this.todos.setInteractive({ useHandCursor: true });
        this.escola_icon = this.add.circle(0,0,10).setFillStyle('0xffffff');

        this.escola_icon.setOrigin(0.5, -0.5);
        this.aGrid.placeAtIndex(178, this.escola_icon);

        this.turma_filtro = this.add.text(0, 0, 'Turma', { fontFamily: "font1", fontSize: 25, color: '#000000', align: 'left' });
        this.turma_filtro.setOrigin(-0.5, -1.3);
        this.aGrid.placeAtIndex(178, this.turma_filtro);
        this.turma_icon = this.add.circle(0,0,10).setFillStyle('0xffffff');
        this.escola_filtro = this.add.text(0, 0, 'Escola', { fontFamily: "font1", fontSize: 25, color: '#000000', align: 'left' });

        this.escola_filtro.setOrigin(-0.45, -0.05);
        this.aGrid.placeAtIndex(178, this.escola_filtro);

        this.filtro = this.add.text(0, 0, 'Filtro', { fontFamily: 'font1', fontSize: 25, color: '#403217' });
        this.filtro.setOrigin(0, 0.5);
        this.aGrid.placeAtIndex(163.3, this.filtro);


        this.turma_icon.setOrigin(0.5, -2.7);
        this.aGrid.placeAtIndex(178, this.turma_icon);

        this.todos.input.hitArea.setTo(-50, -5, this.todos.width + 60, this.todos.height);

        this.todos.on('pointerdown', () => {

            this.todos_icon.setFillStyle('0x000000');

            this.escola_icon.setFillStyle('0xffffff');

            this.turma_icon.setFillStyle('0xffffff');

            this.flag = 2;
            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this);

        });
        this.escola_filtro.setInteractive({ useHandCursor: true });
        this.escola_filtro.input.hitArea.setTo(-50, -5, this.escola_filtro.width + 60, this.escola_filtro.height);
        this.escola_filtro.on('pointerdown', () => {

            this.todos_icon.setFillStyle('0xffffff');

            this.escola_icon.setFillStyle('0x000000');

            this.turma_icon.setFillStyle('0xffffff');

            this.flag = 1;
            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this);
        });
        this.turma_filtro.setInteractive({ useHandCursor: true });
        this.turma_filtro.input.hitArea.setTo(-50, -5, this.turma_filtro.width + 60, this.turma_filtro.height);
        this.turma_filtro.on('pointerdown', () => {
            console.log("Ola");
            this.todos_icon.setFillStyle('0xffffff');

            this.escola_icon.setFillStyle('0xffffff');

            this.turma_icon.setFillStyle('0x000000');

            this.flag = 0;

            updateTOP(this.di, this.df, infoUser.turma, infoUser.escola, this.flag, this);
        });
        this.todos.visible = false;
        this.todos_icon.visible = false; 
        this.escola_icon.visible = false; 
        this.turma_icon.visible = false; 
        this.turma_filtro.visible = false;
        this.filtro.visible = false; 
        this.escola_filtro.visible = false;

        if (infoUser.user != '') {
            this.todos.visible = true;
            this.todos_icon.visible = true;
            this.escola_icon.visible = true; 
            this.turma_icon.visible = true; 
            this.turma_filtro.visible = true; 
            this.filtro.visible = true; 
            this.escola_filtro.visible = true;

        }

        this.jogador = this.add.text(0, 0, 'Jogador', { fontFamily: 'font1', fontSize: 40, color: '#000000' });
        this.jogador.setOrigin(0.4,1);

        this.pontos = this.add.text(0, 0, 'Pontos', { fontFamily: 'font1', fontSize: 40, color: '#000000' });
        this.pontos.setOrigin(0.55,1);

        this.escola = this.add.text(0, 0, 'Escola', { fontFamily: 'font1', fontSize: 40, color: '#000000' });
        this.escola.setOrigin(0.35,1);

        this.turma = this.add.text(0, 0, 'Turma', { fontFamily: 'font1', fontSize: 40, color: '#000000' });
        this.turma.setOrigin(-0.1,1);

        this.data = this.add.text(0, 0, 'Data', { fontFamily: 'font1', fontSize: 40, color: '#000000' });
        this.data.setOrigin(0.65,1);

        this.aGrid.placeAtIndex(77, this.jogador);
        this.aGrid.placeAtIndex(79, this.pontos);
        this.aGrid.placeAtIndex(79, this.pontos);
        this.aGrid.placeAtIndex(82, this.escola);
        this.aGrid.placeAtIndex(85, this.turma);
        this.aGrid.placeAtIndex(87, this.data);
    }

    /**
     * Create array from scene data
     * @param {number} count number of items
     */
     CreateItems(count) {
        var data = [];
        for (var i = 0; i < count; i++) {
            if (this.array[i] != "") {
                data.push({
                    name: this.array[i],
                });
            }
        }
        if (this.array.length < 4) {
            return []
        }
        return data;
    }

    /**
     * Select ranking year to check
     * @returns {data} Ranking information
     */
    selectYear() {
        var data = []

        var d = new Date();
        var m = d.getMonth();
        var n = d.getFullYear();
        if (m > 7) {
            var x = n;
            var y = n + 1;
        }
        else {
            var x = n - 1;
            var y = n;
        }
        let di = x + "-09-01";
        let df = y + "-08-31";
        let j = 15;
        for (let i = 2015; i < y; i++) {

            data.push("" + j + "-" + (j + 1));
            j++;
        }
        data.push("Todos");
        data = data.reverse();
        return data;
    }


}
