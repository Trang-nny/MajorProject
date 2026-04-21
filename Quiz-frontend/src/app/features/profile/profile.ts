import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {
  private http = inject(HttpClient);
  private cd = inject(ChangeDetectorRef);

  user = {
    id: '',
    name: 'Guest Player',
    title: 'Master of Logic & Digital Lore',
    avatar: '/User.png',
    games: 0,
    points: 0,
    rank: 0,
    avgScore: 0
  };

  currentMode: 'solo' | 'multi' = 'solo';
  
  stats = {
    solo: { games: 0, points: 0, rank: 0, avgScore: 0 },
    multi: { games: 0, points: 0, rank: 0, avgScore: 0 }
  };

  historyMode: 'solo' | 'multi' = 'solo';
  rawHistory: any[] = [];
  historySessions: any[] = [];

  createdQuizzes: any[] = [];

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        this.user.name = parsed.username || parsed.name || 'Alex Rivera';
        this.user.title = parsed.bio || 'Master of Logic & Digital Lore';
        this.user.avatar = parsed.avatar || '/User.png';
        this.user.id = parsed.id || '';
      } catch(e) {}
    }

    if (this.user.id) {
      this.fetchUserStats();
      this.fetchUserHistory();
    }
    this.fetchMyQuizzes();
  }

  fetchUserStats() {
    this.http.get<any>(`http://localhost:8080/api/stats/${this.user.id}`).subscribe({
      next: (res) => {
        this.stats = res;
        this.updateDisplayedStats();
      },
      error: (err) => console.error('Failed to load user stats', err)
    });
  }

  fetchUserHistory() {
    this.http.get<any[]>(`http://localhost:8080/api/users/${this.user.id}/history`).subscribe({
      next: (history) => {
        if (history) {
           this.rawHistory = history;
           this.updateDisplayedHistory();
        }
      },
      error: (err) => console.error('Failed to load user history', err)
    });
  }

  setMode(mode: 'solo' | 'multi') {
    this.currentMode = mode;
    this.updateDisplayedStats();
  }

  setHistoryMode(mode: 'solo' | 'multi') {
    this.historyMode = mode;
    this.updateDisplayedHistory();
  }

  updateDisplayedHistory() {
    if (this.historyMode === 'solo') {
      this.historySessions = this.rawHistory.filter(h => h.is_solo);
    } else {
      this.historySessions = this.rawHistory.filter(h => !h.is_solo);
    }
    this.cd.detectChanges();
  }

  updateDisplayedStats() {
    const currentStats = this.stats[this.currentMode];
    this.user.games = currentStats.games || 0;
    this.user.points = currentStats.points || 0;
    this.user.rank = currentStats.rank || 0;
    this.user.avgScore = currentStats.avgScore ? Math.round(currentStats.avgScore) : 0;
    this.cd.detectChanges();
  }

  fetchMyQuizzes() {
    this.http.get<any[]>('http://localhost:8080/api/quizzes').subscribe({
      next: (allQuizzes) => {
        // Nếu user.id rỗng (chưa đăng nhập chuẩn), hiện tất cả. Nếu có, hiện những cái khớp ID hoặc không có ID (quá khứ)
        const myQuizzes = allQuizzes.filter(q => (this.user.id && q.created_by === this.user.id) || (q.creator && q.creator.id === this.user.id) || (!q.creator && q.created_by && q.created_by !== null)); 
        this.createdQuizzes = myQuizzes.map(q => ({
          id: q.id || q.ID,
          title: q.title,
          image: q.cover_image || '/Space-Quiz.png',
          plays: q.plays || 0,
          hosts: q.hosts || 0,
          comments: q.comments || 0,
          rating: 5.0,
          category: q.level ? q.level.toUpperCase() : 'GENERAL',
          color: '#6c2bd9'
        }));
        this.cd.detectChanges();
      },
      error: (err) => console.error('Failed to load quizzes', err)
    });
  }
}