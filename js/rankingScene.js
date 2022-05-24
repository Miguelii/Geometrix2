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
     * Preload needed plugin
     */
    preload(){
        this.load.image('titulo1', 'assets/titulo1.png');
        this.load.image('background', 'assets/background.png');  
        this.load.scenePlugin('rexuiplugin', 'src/gridTable.min.js', 'rexUI', 'rexUI');

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

            background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, 0xFFFF00).setAlpha(0.2),

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


        // O titulo nao aparece logo o programa nao chega aqui
        this.titulo1 = this.add.sprite(0, 0, 'titulo1');
        this.titulo1.setScale(0.9);
        this.aGrid.placeAtIndex(37, this.titulo1);
        
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
