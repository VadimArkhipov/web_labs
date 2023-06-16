import {Injectable} from '@nestjs/common';
const fs = require('fs');
const path = require("path")

@Injectable()
export class SharesService {
    // Получение информации об акциях конкретной компании
    getShare(company: string): string {
        let share = JSON.parse(fs.readFileSync("C:\\Users\\user\\WebstormProjects\\lab5\\server\\src\\" + "json-storage\\" + company + ".json"))
        const labels = []
        const values = []
        for (let x = share.length-1; x >= 0; x--){
            labels.push(share[x].Date)
            values.push(share[x].Open.slice(1))
        }
        return JSON.stringify({"labels": labels, "values": values})
    }
}