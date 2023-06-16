file = require("fs");

class BookController {
    storagePath = "./storage/library.json";
    library = JSON.parse(file.readFileSync(this.storagePath, "utf-8"));

    // Показать все книги с учетем фильтра
    showBooks(filter){
        if(filter === "all"){
            return this.library;
        }
        else if(filter === "in_place"){
            return this.library.filter(book => book.issued === false);
        }
        else if(filter === "issued"){
            let newArr = this.library.filter(book => book.issued === true);
            newArr.sort(function (a,b){
                return new Date(a.date_of_issue) - new Date(b.date_of_issue);
            });
            return newArr;
        }
    }

    // Добавление новой книги
    addNewBook({title, author, description}){
        let newId = this.library.length === 0 ? 0 : this.library[this.library.length - 1].id + 1;
        this.library.push({id: newId , title, author, description, issued: false, reader: null, date_of_issue: null});

        file.writeFileSync(this.storagePath, JSON.stringify(this.library));
    }

    // Удаление книги
    deleteBook(id){
        id = Number(id);
        let newLibrary = [];
        for (let book of this.library){
            if (book.id !== id){
                newLibrary.push(book);
            }
        }
        this.library = newLibrary;
        file.writeFileSync(this.storagePath, JSON.stringify(this.library));
    }

    // Изменить книгу
    changeBook(id, {title, author, description}){
        for (let i = 0; i < this.library.length; i++){
            if(this.library[i].id === id){
                let book = this.library[i];
                book.title = title;
                book.author = author;
                book.description = description;
            }
        }
        file.writeFileSync(this.storagePath, JSON.stringify(this.library));
    }

    // Выдать книгу
    assignBook(id, readerName){
        let today = new Date();
        for (let i = 0; i < this.library.length; i++){
            if(this.library[i].id === id){
                let book = this.library[i];
                book.issued = true;
                book.reader = readerName;
                book.date_of_issue = today;
            }
        }
        file.writeFileSync(this.storagePath, JSON.stringify(this.library));
    }

    // Вернуть книгу в библиотеку
    getOverBook(id){
        for (let i = 0; i < this.library.length; i++){
            if(this.library[i].id === id){
                let book = this.library[i];
                book.issued = false;
                book.reader = null;
                book.date_of_issue = null;
            }
        }
        file.writeFileSync(this.storagePath, JSON.stringify(this.library));
    }


}

module.exports = BookController;