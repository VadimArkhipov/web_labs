import {Injectable} from '@nestjs/common';
const fs = require('fs');
const path = require("path")

@Injectable()
export class AdminService {
    getBrokers(): string {
        let data =  JSON.parse(fs.readFileSync('C:\\Users\\user\\WebstormProjects\\lab6\\server\\src\\json-storage\\brokers.json'))
        let brokers = []
        for (let broker in data){
            brokers.push({...data[broker], email: broker})
        }
        return JSON.stringify(brokers)
    }
}