import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {Socket} from "socket.io"
import {SettingsDto} from "./settings.dto";
import {ReaderService} from "./reader.service";
import {CoursesService} from "./courses.service";

@WebSocketGateway(9999, {cors: "*"})
export class AppGateway {

  private inProgress: boolean = false
  private nextDate: string
  private timePointer: any;

  constructor(private reader: ReaderService, private courses: CoursesService) {

  }

  @WebSocketServer() server

  changeCourse(date, data, shift){
    // data = {Компания : {даты, цены},...}
    // {Цены акций на сегодня, следующая дата работы биржи}
    const courseInfo = this.courses.getCourses(data, date)
    // рассылка клиентам актуальной информации о стоимости акций
    this.server.emit("course-changed", courseInfo.courses, date)
    // получение следующей даты работы биржи
    this.nextDate = courseInfo.nextDate
    if (this.inProgress && this.nextDate){
      this.timePointer = setTimeout(() => this.changeCourse(this.nextDate, data, shift), shift)
    } else {
      ////this.server.emit("end")
      //this.inProgress = false

      // go to the final -- stop tranding
      // clearTimeout(this.timePointer);
      // this.server.emit("end");
      // this.inProgress = false;
    }
  }

  @SubscribeMessage('trading')
  handleStart(client: Socket, settings: SettingsDto): void {
    this.inProgress = true
    // {Компания : {даты, цены},...}
    const data = this.reader.configureData(settings.tradingShares)
    // Запуск биржи
    this.changeCourse(settings.start, data, settings.shift * 1000)
  }

  @SubscribeMessage('stoptrading')
  handleStop(): void {
    clearTimeout(this.timePointer);
    this.server.emit("end");
    this.inProgress = false;
  }
}
