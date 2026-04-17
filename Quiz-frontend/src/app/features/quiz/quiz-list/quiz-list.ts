import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';

interface Quiz {
  id: any;
  title: string;
  author: string;
  items: number;
  plays: string;
  level: string;
  image: string;
  description: string;
}

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './quiz-list.html',
  styleUrls: ['./quiz-list.css']
})
export class QuizList implements OnInit, OnDestroy {
  searchTerm: string = '';
  
  selectedLevels: { [key: string]: boolean } = {
    Easy: false,
    Mid: false,
    Pro: false
  };

  quizzes: Quiz[] = [];

  // Phân trang
  currentPage: number = 1;
  pageSize: number = 9;

  constructor(private router: Router, private quizService: QuizService) {}

  private cd = inject(ChangeDetectorRef);

  ngOnInit() {
    const savedState = sessionStorage.getItem('quizFilterState');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.searchTerm = state.searchTerm || '';
      this.selectedLevels = state.selectedLevels || { Easy: false, Mid: false, Pro: false };
    }
    this.fetchQuizzes();
  }

  fetchQuizzes() {
    this.quizService.getQuizzes().subscribe({
      next: (res: any[]) => {
        // Map data từ Backend sang dạng hiển thị trên giao diện
        const apiQuizzes = res.map(q => ({
          id: q.id,
          title: q.title,
          description: q.description || 'Test your knowledge on this topic.',
          author: q.creator ? q.creator.username : 'Unknown Author',
          items: q.questions ? q.questions.length : 0,
          plays: String(q.plays || 0),
          level: q.level || 'Mid',
          image: q.cover_image && q.cover_image.startsWith('data:image') ? q.cover_image : '/Tech.png' // Fallback nếu ko có
        }));

        this.quizzes = apiQuizzes;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load quizzes', err);
      }
    });
  }

  ngOnDestroy() {
    // Chỉ giữ lại filter state nếu chuẩn bị đi vào các trang con của Quiz (chơi game hoặc xem chi tiết)
    // Nếu người dùng điều hướng sang trang khác hoàn toàn như Dashboard, Profile... thì xóa filter.
    if (!this.router.url.includes('/play/') && !this.router.url.includes('/quiz-detail')) {
      sessionStorage.removeItem('quizFilterState');
    }
  }

  saveState() {
    sessionStorage.setItem('quizFilterState', JSON.stringify({
      searchTerm: this.searchTerm,
      selectedLevels: this.selectedLevels
    }));
  }

  get filteredQuizzes(): Quiz[] {
    return this.quizzes.filter(quiz => {
      // Filter by Search Term
      const matchesSearch = quiz.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      // Filter by Selected Levels
      const activeLevels = Object.keys(this.selectedLevels).filter(key => this.selectedLevels[key]);
      const matchesLevel = activeLevels.length === 0 || activeLevels.includes(quiz.level);

      return matchesSearch && matchesLevel;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.filteredQuizzes.length / this.pageSize);
  }

  get paginatedQuizzes(): Quiz[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredQuizzes.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  clearAll() {
    this.searchTerm = '';
    this.selectedLevels = {
      Easy: false,
      Mid: false,
      Pro: false
    };
    this.saveState();
  }
}