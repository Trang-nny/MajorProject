import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  username: string = 'Alex Rivera';
  joinPin: string = '';
  quizzes: any[] = [];

  constructor(private http: HttpClient, private cd: ChangeDetectorRef) {}

  async ngOnInit() {
    try {
      // Get all quizzes
      const res: any = await firstValueFrom(
        this.http.get('http://localhost:8080/api/quizzes')
      );
      
      // ChÆ°a cÃ³ Creator thÃ¬ cá»© filter nhá»¯ng quiz má»›i nháº¥t (Top 4)
      if (res && Array.isArray(res)) {
        this.quizzes = res.slice(0, 4).map(q => {
          const plays = q.plays || 0;
          return {
            id: q.id,
            title: q.title,
            stats: `${plays} Plays - ` + (q.questions ? q.questions.length : 0) + ' Questions',
            img: q.cover_image || '/Cyber.png'
          };
        });
        this.cd.detectChanges();
      }
    } catch (error) {
      console.error('Lá»—i fetch', error);
    }
  }

  onPinInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.joinPin = input.value;
  }

  getQuizImg(quiz: any): string {
    return quiz.img || '/Cyber.png';
  }
}