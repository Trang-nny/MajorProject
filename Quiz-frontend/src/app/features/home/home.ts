import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  // Hàm xử lý tự động nhảy ô
  moveFocus(event: any, nextElement: HTMLInputElement | null, prevElement: HTMLInputElement | null) {
    const input = event.target as HTMLInputElement;
    const length = input.value.length;


    // Nếu đã gõ xong 1 chữ số và có ô tiếp theo -> Nhảy tới
    if (length === 1 && nextElement) {
      nextElement.focus();
    }


    // Nếu nhấn Backspace khi ô đang trống và có ô phía trước -> Quay lại
    if (event.key === 'Backspace' && length === 0 && prevElement) {
      prevElement.focus();
    }
  }
}
