import Figure from "./Figure.js";
import Field from "./Field.js";

export default class Game {
    static points = {
        '1': 40,
        '2': 100,
        '3': 300,
        '4': 1200,
    }
    score = 0;
    lines = 0;
    overFlowed = false;
    field = new Field();
    currentFigure = new Figure();
    nextFigure = new Figure();

    get level() {
        return Math.floor(this.lines / 10);
    }

    // Функции движения фигур по полю
    moveFigureRight() {
        this.currentFigure.x += 1;

        if(this.isCollision()){
            this.currentFigure.x -= 1;
        }
    }

    moveFigureLeft() {
        this.currentFigure.x -= 1;

        if(this.isCollision()){
            this.currentFigure.x += 1;
        }
    }

    moveFigureDown() {
        if(this.isCollision()){
            return;
        }
        this.currentFigure.y += 1;

        if(this.isCollision()) {
            this.currentFigure.y -= 1;
            this.insertFigure();
            this.countScore(this.clearLines());
            this.currentFigure = this.nextFigure;
            this.nextFigure = new Figure();
        }

        if (this.isCollision()){
            this.overFlowed = true;
        }

    }
    //

    // Проверка -- вышла ли фигура за пределы поля
    isCollision() {
        let box = this.field.box;
        let figure = this.currentFigure;

        for (let y = 0; y < figure.shape.length; y ++){
            for (let x = 0; x < figure.shape.length; x++){
                if (figure.shape[y][x]
                && (box[figure.y + y] === undefined || box[figure.y + y][figure.x + x] === undefined
                || box[figure.y + y][figure.x + x]))
                {
                    return true;
                    }
                }
            }

        return false;
    }

    // Вставка фигуры в поле (Вызывется только, когда фигура "упала" на пол или на другую фигуру)
    insertFigure() {
        let shape = this.currentFigure.shape;

        for(let y = 0; y < shape.length; y++){
            for(let x = 0; x < shape.length; x++) {
                if (shape[y][x]) {
                    this.field.box[this.currentFigure.y + y][this.currentFigure.x + x] = shape[y][x];
                }
            }
        }
    }

    clearLines() {
        let lines = [];

        for (let y = 19; y >= 0; y--) {
            let numberOfBlocks = 0;
            for (let x = 0; x < 10; x++) {
                if (this.field.box[y][x]) {
                    numberOfBlocks++;
                }
            }
            if (numberOfBlocks === 0) {
                break;
            } else if (numberOfBlocks < 10){
                continue;
            }else {
                lines.unshift(y);
                }
            }

            for (let index of lines){
                this.field.box.splice(index, 1);
                this.field.box.unshift([0,0,0,0,0,0,0,0,0,0]);
            }

            return lines.length;
        }

        countScore(clearedLines){
            if(clearedLines > 0){
                this.score += Game.points[clearedLines] * (this.level + 1);
                this.lines += clearedLines;
            }
        }




    // Метод поворота фигуры
    rotateFigure() {
        let oldShape = this.currentFigure.shape;
        //let newShape = this.currentFigure.rotate();

        this.currentFigure.shape = this.currentFigure.rotate();

        if(this.isCollision()){
            this.currentFigure.shape = oldShape;
        }
    }

    // Получение "скриншота" игры -- её состояния на данный момент времени
    getGameShot() {
        let boxCopy = this.field.box.map(i => [...i]);
        let currentFigure = this.currentFigure;
        let nextFigure = this.nextFigure;


        for (let y = 0; y < this.currentFigure.shape.length; y++){
            for (let x = 0; x < this.currentFigure.shape[y].length; x++){
                if(this.currentFigure.shape[y][x]){
                    boxCopy[this.currentFigure.y + y][this.currentFigure.x + x] = this.currentFigure.shape[y][x];
                }
            }
        }
        return {
            boxCopy,
            currentFigure,
            nextFigure,
            level: this.level,
            score: this.score,
            lines: this.lines,
            isGameOver: this.overFlowed
        };
    }

    writeScore() {
        let index = window.localStorage.length - 1;
        let elem = JSON.parse(window.localStorage.getItem(index.toString()));
        console.log(elem);
        window.localStorage.removeItem(index.toString());
        window.localStorage.setItem(index.toString(), JSON.stringify({'name': elem.name, 'score': this.score}));
    }
}

