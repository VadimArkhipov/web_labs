export default class Controller {
    constructor(game, view) {
        this.game = game;
        this.view = view;

        this.intervalId = setInterval(() => {
            this.game.moveFigureDown();
            this.updateView();
        }, 1000 - 100 * this.game.getGameShot().level > 0 ? 1000 - 100 * this.game.getGameShot().level : 100);

        this.bind = this.pressKey.bind(this);
        document.addEventListener("keydown", this.bind); // bind(this) -- НАДА НИ НАДА?
        this.view.render(this.game.getGameShot());
    }

    // Обработка нажатия клавиш
    pressKey(event) {
        switch (event.keyCode) {
            case 37: // LEFT
                this.game.moveFigureLeft();
                this.updateView();
                break;
            case 38: // UP
                this.game.rotateFigure();
                this.updateView();
                break;
            case 39: // RIGHT
                this.game.moveFigureRight();
                this.updateView();
                break;
            case 40: // DOWN
                this.game.moveFigureDown();
                this.updateView();
                break;
        }
    }

    updateView() {
        if(this.game.getGameShot().isGameOver){
            clearInterval(this.intervalId);
            document.removeEventListener("keydown", this.bind);
            this.view.renderGameOver(this.game.getGameShot());
            this.game.writeScore();

        } else {
            this.view.render(this.game.getGameShot());
        }

    }

}