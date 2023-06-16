import file from 'fs';
import {rollbarJournal} from "./app.js";

export default class SocialNetwork{
    userListPath = './src/storage/userList.json';
    listOfUsers = JSON.parse(file.readFileSync(this.userListPath, 'utf-8'));
    friendsListPath = './src/storage/friendsList.json'
    friendsList = JSON.parse(file.readFileSync(this.friendsListPath, 'utf-8'));
    usersNewsPath = './src/storage/usersNews.json';
    usersNews = JSON.parse(file.readFileSync(this.usersNewsPath, 'utf-8'));

    createUser({name, birth, email, role}){
        let id = this.listOfUsers.length === 0 ? 0: this.listOfUsers[this.listOfUsers.length - 1].id + 1;
        let newUser = {
            id: id,
            name: name,
            birth: birth,
            email: email,
            photo: 'default.jpg',
            role: role,
            status: 'waiting'
        }

        this.friendsList.push({id: id,
                                friends: []});
        file.writeFileSync(this.friendsListPath, JSON.stringify(this.friendsList));
        this.listOfUsers.push(newUser);
        file.writeFileSync(this.userListPath, JSON.stringify(this.listOfUsers));
        rollbarJournal.info(`Новый пользователь с id ${id} и именем ${name} успешно создан`);
    }

    deleteUser(id){
        //Удаление юзера из списка
        this.listOfUsers = this.listOfUsers.filter(item => item.id !== id);
        file.writeFileSync(this.userListPath, JSON.stringify(this.listOfUsers));

        //Удаление юзера из друзей остальных юзеров
        this.friendsList = this.friendsList.filter(item => item.id !== id);
        this.friendsList = this.friendsList.map(elem => ({id: elem.id, friends: elem.friends.filter(elem=> elem !== id)}));
        file.writeFileSync(this.friendsListPath, JSON.stringify(this.friendsList));


        //Удаление новостей юзера
        this.usersNews = this.usersNews.filter(elem => elem.id !== id);
        file.writeFileSync(this.usersNewsPath, JSON.stringify(this.usersNews));
        rollbarJournal.info(`Пользователь с id ${id} успешно удален`);
    }

    selectUser(id){
        return this.listOfUsers.filter(item => item.id === id)[0];
    }

    updateUserInfo(id, {name, birth, email, role, status}) {
        for (let i = 0; i < this.listOfUsers.length; i++) {
            if (this.listOfUsers[i].id === id) {
                let user = this.listOfUsers[i];
                user.name = name;
                user.birth = birth;
                user.email = email;
                user.role = role;
                user.status = status;
            }
        }
        file.writeFileSync(this.userListPath, JSON.stringify(this.listOfUsers));
        rollbarJournal.info(`Информация о пользователе с id ${id} успешно обновлена`);
    }

    getUsersFriends(id){
        let friendsArray = this.friendsList.filter(elem => elem.id === id)[0].friends;
        return this.listOfUsers.filter(elem => friendsArray.includes(elem.id));
    }

    getUsersFriendsNews(id){
        let friendsArray = this.friendsList.filter(elem => elem.id === id)[0].friends;
        let friendsNews = this.usersNews.filter(elem => friendsArray.includes(elem.id));
        let news = [];
        friendsNews.map(elem =>  news.push(elem));
        rollbarJournal.log(`Список друзей пользователя с id ${id} успешно получен`);
        return news.sort(function (a,b){
            return new Date(b.time) - new Date(a.time);
        });

    }

    getUsersNews(id){
        return this.usersNews.filter(elem => elem.id === id);
    }

    login({email}){

        return this.listOfUsers.find((elem)=>elem.email === email);
    }

    updateUserPhoto(id, userPic){
        let tempPath = userPic.path;
        let targetPath = './src/public/userPics/'+userPic.originalname;

        file.rename(tempPath, targetPath, (error)=>{
            if(error){

                rollbarJournal.error(`При загрузке фотографии ${targetPath} произошла ошибка`);
            }
        });

        let user = this.listOfUsers.find(elem => elem.id === id);

        if(user.photo!=='default.jpg'){
            file.unlink('./src/public/userPics/'+user.photo, (err)=>{
                if(err){
                    rollbarJournal.error(`При попытке удаления фотографии './src/public/userPics/${user.photo}' произошла ошибка`);
                }
            });
        }
        user.photo = userPic.originalname;
        file.writeFileSync(this.userListPath, JSON.stringify(this.listOfUsers), (error)=>{
            rollbarJournal.error(`При обновлении данных о фотографии пользователя произошла ошибка`);
        });
    }
    deletePhoto(id){
        let user = this.listOfUsers.find(elem => elem.id === id);
        if(user.photo!=='default.jpg'){
            file.unlink('./src/public/userPics/'+user.photo, (err)=>{
                if(err){
                    rollbarJournal.error(`При попытке удаления фотографии пользователя произошла ошибка`);
                }
            });
        }
        user.photo = 'default.jpg';
        file.writeFileSync(this.userListPath, JSON.stringify(this.listOfUsers), (error)=>{
            rollbarJournal.error(`При попытке обновления информации о пользователе произошла ошибка`);
        });
    }

    createPost(body){
        let post = {
            id: Number(body.id),
            time: body.time,
            description: body.description
        };
        this.usersNews.push(post);
        file.writeFileSync(this.usersNewsPath, JSON.stringify(this.usersNews), (error)=>{
            rollbarJournal.error(`При попытке добавления записи произошла ошибка`);
        });
        rollbarJournal.info(`Новая запись от пользователя с id ${body.id} успешно добавлена`);
    }
    sum1(a,b){
        return a+b;
    }

}
