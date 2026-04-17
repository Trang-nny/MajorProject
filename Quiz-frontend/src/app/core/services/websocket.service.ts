import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface WsMessage {
  action: string;
  roomId: string;
  userId: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<WsMessage>();
  
  // Trả về luồng dữ liệu để các Component có thể .subscribe() vào
  public getMessages(): Observable<WsMessage> {
    return this.messageSubject.asObservable();
  }

  // Hàm kết nối lên WebSocket Server
  public connect(roomId: string, userId: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      console.log('Đã kết nối sẵn rồi, không kết nối lại nữa.');
      return;
    }

    // Đổi lại IP của bạn nếu cần nhé (26.133.44.175)
    const url = `ws://localhost:8080/api/ws?roomId=${roomId}&userId=${userId}`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('✅ Đã kết nối WebSockets tới phòng:', roomId);
    };

    this.socket.onmessage = (event) => {
      try {
        const msg: WsMessage = JSON.parse(event.data);
        console.log('📥 Nhận được tin nhắn từ Server:', msg);
        this.messageSubject.next(msg);
      } catch (error) {
        console.error('Lỗi khi Parse JSON dữ liệu WebSocket', error);
      }
    };

    this.socket.onclose = () => {
      console.log('❌ Ngắt kết nối WebSockets.');
      // Có thể thêm code auto-reconnect ở đây
    };

    this.socket.onerror = (error) => {
      console.error('Lỗi WebSockets:', error);
    };
  }

  // Hàm gửi tin nhắn qua WebSocket
  public sendMessage(msg: WsMessage) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
    } else {
      console.error('Chưa kết nối WebSockets, không thể gửi tin nhắn.');
    }
  }

  // Đóng kết nối khi rời Lobby / GameRomm
  public disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}