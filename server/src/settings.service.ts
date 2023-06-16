import {Injectable} from '@nestjs/common';
const fs = require('fs');
const path = require("path")

@Injectable()
export class SettingsService {
    // Получение дат, когда биржа работала
    getDates(): string {
        let data = JSON.parse(fs.readFileSync("C:\\Users\\user\\WebstormProjects\\lab5\\server\\src\\" + "json-storage\\aapl.json"))
        const dates = []
        for (let x = data.length-1; x >= 0; x--){
            dates.push(data[x].Date)
        }
        return JSON.stringify({"dates": dates})
    }
}