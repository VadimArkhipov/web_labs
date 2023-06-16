import SocialNetwork from './SocialNetwork.js';
import express from 'express';
import bodyParser from "body-parser";

const router = express.Router();
const controller = new SocialNetwork();
export let ctrl = controller;
const urlencodedParser = express.urlencoded({extended: true});


import multer from "multer";
const upload = multer({ dest: "./public/userPics" });



router.get('/users', (req, res) => {
    // res.status(200).render('usersList', {
    //     title: 'Список пользователей',
    //     users: controller.listOfUsers});
    //
        res.status(200).json(controller.listOfUsers);
});


router.get('/users/create', (req, res) => {
    res.render('createUser', {
        title: 'Добавление нового пользователя'
    });
})

router.post('/users', bodyParser.json(), (req, res)=>{
    controller.createUser(req.body);
    res.status(200).send({msg:'Все прошло хорошо'});
})

router.delete('/users/:id', (req, res) => {
    controller.deleteUser(Number(req.params.id));
    res.status(200).send();
})

router.get('/users/:id', (req, res) => {
    res.status(200).json(controller.selectUser(Number(req.params.id)));
})

router.get('/users/:id/edit', (req, res) =>{
    res.status(302).render('editUser', {
        title: 'Изменить инофрмацию о пользователе',
        user: controller.selectUser(Number(req.params.id))
    })
})

router.post('/users/:id/edit', urlencodedParser, (req, res) => {

    controller.updateUserInfo(Number(req.params.id), req.body);
    res.redirect('back');
})

router.get('/users/:id/friends', (req, res) => {
    res.status(200).json(controller.getUsersFriends(Number(req.params.id)));
});

router.get('/users/:id/news', (req, res) => {
    res.status(200).json(controller.getUsersNews(Number(req.params.id)));
})

router.get('/users/:id/friends/news', (req, res) =>{
    res.status(200).json(controller.getUsersFriendsNews(Number(req.params.id)));
})

router.patch('/users/:id', bodyParser.json(), (req, res)=>{
    controller.updateUserInfo(Number(req.params.id), req.body);
    res.status(200).send({msg: 'Смена прошла успешно'});
})

router.post('/users/login', bodyParser.json(), (req, res)=>{
    res.status(200).send(controller.login(req.body));
})

router.post('/users/:id/upload-photo', upload.single("photo"),(req, res)=>{
    controller.updateUserPhoto(Number(req.params.id), req.file);
    res.status(200).send({msg: 'Все хорошо'});
})

router.delete('/users/:id/delete-photo', (req, res)=>{
    controller.deletePhoto(Number(req.params.id));
    res.status(200).send({msg:'Фото успешно удалено'});
})

router.post('/users/:id/create-post', bodyParser.json(), (req, res)=> {

    controller.createPost(req.body);
    res.status(200).send({msg: 'Получено'});
})

export default router;
