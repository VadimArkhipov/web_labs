export default class Figure {

    // Конструктор случайным образом генерирует одну из семи фигур
    constructor() {
        const listFigures = {
            'I': {
                shape: [
                    [0, 0, 0, 0],
                    [1, 1, 1, 1],
                    [0, 0, 0, 0],
                    [0, 0, 0, 0]
                ], color: "#fe747c"
            },
            'J': {
                shape: [
                    [2, 0, 0],
                    [2, 2, 2],
                    [0, 0, 0],
                ], color: "#fdf6a4"
            },
            'L': {
                shape: [
                    [0, 0, 3],
                    [3, 3, 3],
                    [0, 0, 0],
                ], color: "#fdf6a4"
            },
            'O': {
                shape: [
                    [4, 4],
                    [4, 4],
                ], color: "#ffcc70"
            },
            'S': {
                shape: [
                    [0, 5, 5],
                    [5, 5, 0],
                    [0, 0, 0],
                ], color: "#01976f"
            },
            'Z': {
                shape: [
                    [6, 6, 0],
                    [0, 6, 6],
                    [0, 0, 0],
                ], color: "#01976f"
            },
            'T': {
                shape: [
                    [0, 7, 0],
                    [7, 7, 7],
                    [0, 0, 0],
                ], color: "#26c89f"
            }
        }


        let number = Math.floor(Math.random() * 7);
        let types = Object.keys(listFigures);

        this.shape = listFigures[types[number]].shape; //types[number]
        this.color = listFigures[types[number]].color; //types[number]
        this.type = types[number];
        this.x = Math.floor((10 - this.shape.length)/ 2);
        this.y = 0;
    }

    // Функция поворота фигуры на 90 градусов
    rotate() {
        let newShape = [];
        let n = this.shape.length;
        let newRow = [];

        for(let i = 0; i < n; i++){
            for(let j = 0; j < n; j++){
                newRow.push(this.shape[n - j - 1][i]);
            }
            newShape.push(newRow);
            newRow = [];
        }

        return newShape;
    }

}



