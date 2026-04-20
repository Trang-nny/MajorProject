import { Component, Input, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './quiz-detail.html',
  styleUrl: './quiz-detail.css'
})
export class QuizDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private quizService = inject(QuizService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  isOwner: boolean = false;
  selectedVisibility: string = 'private';
  quizId: string = '';
  currentUser: any = null;

  quizData: any = {
    title: 'Loading...',
    plays: '0',
    questionsCount: 0,
    duration: '0 min Avg.',
    level: 'Loading...',
    engagementRate: 0,
    lastUpdated: '',
    category: 'Loading...',
    author: 'Loading...',
    description: '',
    imageUser: '/Cyber Security Theme.png',
    imageGuest: '/Cyber security concept.png'
  };

  questions: any[] = [];

  ngOnInit(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        this.currentUser = JSON.parse(userStr);
      } catch (e) {}
    }

    this.route.paramMap.subscribe(params => {
      this.quizId = params.get('id') || '';
      console.log('QuizDetail Init with ID:', this.quizId);
      if (this.quizId) {
        this.fetchQuizDetail();
      } else {
        console.error('QuizDetail was loaded without an ID parameters!');
      }
    });
  }
 
  fetchQuizDetail() {
    console.log('Fetching quiz data for ID:', this.quizId);
    this.quizService.getQuiz(this.quizId).subscribe({
      next: (res) => {
        console.log('Got quiz from BE:', res);
        if (!res) {
           this.quizData.title = 'ERROR: Empty response';
           this.cd.detectChanges();
           return;
        }

        // Kiểm tra xem user hiện tại có phải là người tạo không
        if (this.currentUser && res.created_by === this.currentUser.id) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }

        this.selectedVisibility = res.visibility || 'private';

        // Calculate total time
        let totalSeconds = 0;
        if (res.questions) {
          totalSeconds = res.questions.reduce((acc: number, q: any) => acc + (q.time_limit || 20), 0);
        }
        const totalMinutes = Math.ceil(totalSeconds / 60);

        // Cập nhật thông tin hiện tại
        this.quizData = {
          ...this.quizData,
          title: res.title || 'Untitled',
          plays: res.plays || 0,
          author: res.creator?.username || 'Unknown',
          description: res.description || '',
          level: res.level || 'Easy',
          category: 'General', 
          questionsCount: res.questions ? res.questions.length : 0,
          duration: totalMinutes + ' min',
          imageUser: res.cover_image || '/Cyber Security Theme.png',
          imageGuest: res.cover_image || '/Cyber security concept.png',
          lastUpdated: new Date(res.updated_at || res.created_at).toLocaleDateString()
        };

        // Format questions
        if (res.questions) {
          this.questions = res.questions.map((q: any, i: number) => {
            let options = [];
            if (typeof q.options === 'string') {
              try {
                options = JSON.parse(q.options);
              } catch (e) {}
            } else if (Array.isArray(q.options)) {
              options = q.options;
            }

            return {
              id: i + 1,
              type: q.multiple_correct ? 'MULTIPLE CHOICE' : 'SINGLE CHOICE',
              points: q.points || 100,
              time: (q.time_limit || 20) + 's',
              text: q.content || 'Question content',
              options: options
            };
          });
        }

        // Render lại component với các params Data và params Questions
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching quiz detail', err);
        // Ngừng nhảy trang, hiển thị thông báo lỗi
        this.quizData.title = 'Lỗi không tải được Quiz!';
        this.cd.detectChanges();
        alert('Could not load quiz details. ' + (err.error?.error || err.message));
      }
    });
  }

  updateVisibility(visibility: string) {
    if (!this.isOwner) return;
    
    this.quizService.updateVisibility(this.quizId, visibility).subscribe({
      next: (res) => {
        this.selectedVisibility = visibility;
        console.log('Visibility updated:', visibility);
      },
      error: (err) => {
        console.error('Failed to update visibility', err);
        alert('Cập nhật trạng thái hiển thị thất bại');
      }
    });
  }
 
  cancel() {
    console.log('Action cancelled');
  }

  shareQuiz() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert('Đã copy đường dẫn: ' + url);
    }).catch(err => {
      console.error('Không thể copy link', err);
      alert('Lỗi copy link: ' + url);
    });
  }
}