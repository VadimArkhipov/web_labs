import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import {IPost} from "../interfaces/news";


const api = 'wss://127.0.0.1:7000';

@Injectable()
export class WebsocketService {

  socket: io.Socket;

  constructor() {
    this.socket = io.connect(api);
  }

  public listenToServer(connection: string): Observable<IPost> {
    return new Observable<IPost>(observer => {
      this.socket.on(connection, (data: IPost) => observer.next(data));
    });
  }

  emitToServer(connection: string, data: any): void {
    this.socket.emit(connection, data);
  }
}
