import {Component} from '@angular/core';
import {SocketService} from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public isShow = false;
  public text: string;
  public checkMessage: string;
  public messageFromServer: string;

  constructor(private socketService: SocketService) {
  }

  public getConnect() {
    this.socketService.connect();
    this.isShow = true;
  }

  public getDisconnect() {
    this.socketService.disconnect();
    this.isShow = false;
  }

  public sendMes() {
    this.socketService.sendMessage('hello');
  }

  public sendMessageToServ() {
    this.socketService.sendMessage(this.text);
    this.checkStatus();
    this.text = '';
  }

  public checkStatus() {
    this.socketService.getStatus().subscribe((message: string) => {
      this.checkMessage = message;
    });
  }

  public getMessage() {
    this.socketService.getMessages().subscribe((message: string) => {
      this.messageFromServer = message;
    });
  }

  public clear() {
    const mes = '';
    this.socketService.clearFile(mes);
  }
}
