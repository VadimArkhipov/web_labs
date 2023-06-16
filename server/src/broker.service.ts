import {Injectable} from '@nestjs/common';
import {BrokerDto} from "./broker.dto";
const fs = require('fs');


@Injectable()
export class BrokerService {
    getBrokers(): string {
        return JSON.parse(fs.readFileSync('C:\\Users\\user\\WebstormProjects\\lab5\\server\\src\\' + "json-storage\\brokers.json"))
    }

    setBroker(broker: BrokerDto): string {
        const brokers = JSON.parse(fs.readFileSync('C:\\Users\\user\\WebstormProjects\\lab5\\server\\src\\' + "json-storage\\brokers.json"))
        brokers.push(broker)
        fs.writeFile('C:\\Users\\user\\WebstormProjects\\lab5\\server\\src\\' + "\\json-storage\\brokers.json", JSON.stringify(brokers), (err) => {
            if (err) throw err
        })
        return JSON.stringify({"status": 200, "message": "Брокер добавлен"})
    }

    deleteBroker(broker: BrokerDto): string {
        let brokers = JSON.parse(fs.readFileSync('C:\\Users\\user\\WebstormProjects\\lab5\\server\\src\\' + "json-storage\\brokers.json"))
        let newBrokers = []
        for (let x = 0; x < brokers.length; x++){
            if (brokers[x].id !== broker.id){
                newBrokers.push(brokers[x])
            }
        }
        fs.writeFile('C:\\Users\\user\\WebstormProjects\\lab5\\server\\src\\' + "json-storage\\brokers.json", JSON.stringify(newBrokers), (err) => {
            if (err) throw err
        })
        return JSON.stringify({"status": 200, "message": "Брокер удалён"})
    }
}