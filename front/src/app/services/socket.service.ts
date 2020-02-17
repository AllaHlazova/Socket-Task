import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SocketService {
  private host = 'http://localhost:3001';
  private socket: any;

  // public sock: WebSocketSubject<any>;

  constructor() {
  }

  public connect() {
    this.socket = io.connect(this.host);
  }

  public disconnect() {
    this.socket.disconnect();
  }

  public sendMessage(message: string) {
    this.socket.emit('new-message', message);
  }

  public clearFile(message: string) {
    this.socket.emit('clear', message);
  }

  public getStatus(): Observable<string> {
    return new Observable<string>(obs => {
      this.socket.on('answer', (data: string) => {
        obs.next(data);
      });
    });
  }

  public getMessages(): Observable<string> {
    this.socket.emit('get-message');
    return new Observable<string>(obs => {
      this.socket.on('get-message', (data: string) => {
        obs.next(data);
      });
    });
  }
}





