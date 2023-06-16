const express = require("express");
const router = express.Router();
const BookController = require("./BookController");
const urlencodedParser = express.urlencoded({extended: false});

const controller = new BookController();

//Главная страница библиотеки
router.get("/books", (req, res) => {
    let filter = (req.query.filter !== undefined) ? req.query.filter : "all";

    let filteredBooks = controller.showBooks(filter);

    res.status(302).render('books_list', {
        title: "Библиотека",
        books: filteredBooks,
        state: filter
    })
});

//Создание книги
router.get("/books/create", (req, res) => {
    res.render('create', {
        title: 'Добавление книги'
    })
});

router.post('/books', urlencodedParser, (req, res) => {

    controller.addNewBook(req.body);
    res.status(302).redirect("/books");
});

router.delete('/books/:id', (req, res) => {
    controller.deleteBook(req.params.id);
});

router.get('/books/:id', (req, res) => {
    let book = controller.library.filter(book => book.id === Number(req.params.id))[0];
    res.render('bookCard',{
        title: "Карточка книги",
        book: book
    });
})

router.post('/books/:id', urlencodedParser, (req, res) => {
    controller.changeBook(Number(req.params.id), req.body);
    res.redirect('back');
})

router.post("/books/:id/assign", urlencodedParser, (req, res) => {
    controller.assignBook(Number(req.params.id), req.body.readerName);
    res.redirect('back');
})

router.get('/books/:id/get_over', (req, res) => {
    controller.getOverBook(Number(req.params.id));
    res.redirect(`/books/${req.params.id}`);
})

module.exports = router;