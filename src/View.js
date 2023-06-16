export default class View {

    static colors = ['#f05f74', '#f76d3c', '#f7d842', '#2ca8c2', '#98cb4a', '#839098', '#5381e6'];

    constructor() {
        this.canvas = document.getElementById('canvas');
        //this.panel = document.getElementById('panel');
        //this.panelContext = this.panel.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.context = this.canvas.getContext('2d');

        this.boxWidth = 320;
        this.boxHeight = this.height;


        this.blockWidth = this.boxWidth / 10;
        this.blockHeight = this.boxHeight / 20;

        this.panelX = this.boxWidth + 15;
        this.panelY = 0;
    }

    // Отрисовка игры
    render(gameShot){

        // Чистим холст
        this.context.clearRect(0,0, this.width, this.height);
        this.renderPanel(gameShot.level, gameShot.score, gameShot.lines, gameShot.nextFigure);

        // Рисуем стакан и фигурку
        const box = gameShot.boxCopy;
        for (let y = 0; y < box.length; y++){
            const line = box[y];
            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                // Пустая клетка
                if(!block){
                    this.context.strokeStyle = 'black';
                    this.context.lineWidth = 1;
                    this.context.strokeRect(x * this.blockWidth,
                        y * this.blockHeight, //+this.boxY
                        this.blockWidth,
                        this.blockHeight);
                }

                // Клетка с блоком
                if (block) {
                    this.context.fillStyle = View.colors[block - 1];
                    this.context.strokeStyle = 'black';
                    this.context.lineWidth = 1;

                    this.context.fillRect(x * this.blockWidth,
                        y * this.blockHeight,
                        this.blockWidth,
                        this.blockHeight);
                    this.context.strokeRect(x * this.blockWidth,
                        y * this.blockHeight,
                        this.blockWidth,
                        this.blockHeight);
                }
            }

        }
    }

    renderPanel(level, score, lines, nextFigure){
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'black';
        this.context.font = '30px "Jura"';

        this.context.fillText(`Уровень: ${level}`, this.panelX, this.panelY);
        this.context.fillText(`Счёт: ${score}`, this.panelX, this.panelY + 40);
        this.context.fillText('Следующая фигура:', this.panelX, this.panelY + 100);

        for (let y = 0; y < nextFigure.shape.length; y++){
            for (let x = 0; x < nextFigure.shape.length; x++){
                const block = nextFigure.shape[y][x];

                if (block){
                    this.context.fillStyle = View.colors[block - 1];
                    this.context.strokeStyle = 'black';
                    this.context.lineWidth = 1;

                    this.context.fillRect(x * this.blockWidth + this.panelX + 90,
                        y * this.blockHeight + this.panelY + 160,
                        this.blockWidth,
                        this.blockHeight);

                    this.context.strokeRect(x * this.blockWidth + this.panelX + 90,
                        y * this.blockHeight + + this.panelY + 160,
                        this.blockWidth,
                        this.blockHeight);
                }
            }
        }
    }

    renderGameOver(gameShot) {

        this.context.clearRect(0,0, this.width, this.height);


        this.context.fillStyle = 'black';
        this.context.font = '35px "Jura"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Игра окончена', this.width/2, this.height / 2 - 48);
        this.context.fillText(`Ваш счёт: ${gameShot.score}`, this.width/2, this.height / 2);

        let place = document.querySelector(".btn");
        place.innerHTML += "<form class='links-start-page' action='record_table_page.html' method='get' <br>" +
            "<button class='links-start-page' type='submit'> Таблица рекордов </button>" +
            "</form>";

    }
}