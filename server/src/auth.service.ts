import {Injectable} from '@nestjs/common';
const fs = require('fs');
const path = require("path")

@Injectable()
export class AuthService {
    login(body){
        let data =  JSON.parse(fs.readFileSync("C:\\Users\\user\\WebstormProjects\\lab6\\server\\src\\json-storage\\auth.json"))
        if (body.email in data && data[body.email] === body.password){
            return JSON.stringify({status: body.email})
        }
        return JSON.stringify({status: ""})
    }
}