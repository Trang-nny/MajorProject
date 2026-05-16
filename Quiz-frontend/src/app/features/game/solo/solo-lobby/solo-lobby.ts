import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_CONFIG } from '../../../../config/api.config';

@Component({
  selector: 'app-solo-lobby',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './solo-lobby.html',
  styleUrls: ['./solo-lobby.css']
})
export class SoloLobby implements OnInit {
  quizId: string | null = null;
  quizTitle: string = 'Loading...';
  quizDesc: string = '';
  quizLevel: string = 'Mid';
  quizLength: number = 0;
  practiceMode: boolean = false;
  enableTimer: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      // Nhận ID bất kể từ biến nào
      if (params['id']) this.quizId = params['id'];
      else if (params['quizId']) this.quizId = params['quizId'];
      
      // Nếu có sẵn title qua param thì lấy luôn không cần fetch
      if (params['title']) {
        this.quizTitle = params['title'];
        this.quizDesc = params['desc'] || '';
        this.quizLevel = params['level'] || 'Mid';
        this.quizLength = Number(params['length']) || 25;
      } 
      // Nếu có ID mà chưa có title thì gọi backend để fetch chi tiết
      else if (this.quizId) {
        try {
          // Thêm query để tránh cache hoặc gọi đúng Endpoint Backend
          let url = API_CONFIG.ENDPOINTS?.QUIZZES 
            ? `${API_CONFIG.ENDPOINTS.QUIZZES}/${this.quizId}` 
            : `${API_CONFIG.API_BASE}/quizzes/${this.quizId}`;

          const res: any = await firstValueFrom(this.http.get(url));
          const quizData = res.data ? res.data : res;

          if (quizData) {
            // Check cả 2 trường hợp JSON trả về chữ thường hay in hoa chữ đầu
            this.quizTitle = quizData.title || quizData.Title || 'Untitled Quiz';
            this.quizDesc = quizData.description || quizData.Description || 'No description provided';
            this.quizLevel = quizData.level || quizData.Level || 'Mid'; 
            this.quizLength = quizData.questions?.length || quizData.Questions?.length || 0;
          } else {
            this.quizTitle = 'Error Loading Quiz';
          }
        } catch (e) {
          console.error('Failed to load quiz info', e);
          this.quizTitle = 'Error Loading Quiz';
        }
      }
    });
  }

  startGame() {
    this.router.navigate(['/play/solo/room'], { 
      queryParams: { 
        id: this.quizId,
        practiceMode: this.practiceMode ? 'true' : 'false',
        enableTimer: this.enableTimer ? 'true' : 'false'
      } 
    });
  }
}