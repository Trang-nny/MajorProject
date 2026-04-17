import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-detail.html',
  styleUrl: './quiz-detail.css'
})
export class QuizDetail implements OnInit {
  @Input() isOwner: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private cd: ChangeDetectorRef) {}

  quizData: any = {
    id: 0,
    title: 'Loading...',
    plays: '0',
    questionsCount: 0,
    duration: '0 min',
    level: 'Unknown',
    visibility: 'public',
    engagementRate: 0,
    lastUpdated: '-',
    author: 'JUST4QUIZ',
    description: '',
    imageUser: '',
    imageGuest: ''
  };

  mockQuizzes: any[] = [
    {
      id: 1,
      title: 'World Geography Challenge',
      plays: '1.2k', questionsCount: 15, duration: '10 min', level: 'Easy',
      lastUpdated: 'Nov 12, 2023', author: 'Elena Vance',
      description: 'Explore the world map, guess the capitals, and identify unique geographical landmarks from all around the globe.',
      imageUser: '/Geography.png', imageGuest: '/Geography.png'
    },
    {
      id: 2,
      title: 'Arts and Music',
      plays: '850', questionsCount: 10, duration: '15 min', level: 'Mid',
      lastUpdated: 'Oct 24, 2023', author: 'Alex Rivera',
      description: 'Explore the fascinating world of arts and music, learning about classical compositions, modern masterpieces, and cultural history.',
      imageUser: '/Arts.png', imageGuest: '/Arts.png'
    },
    {
      id: 3,
      title: 'Who is a millionaire?',
      plays: '3.4k', questionsCount: 12, duration: '20 min', level: 'Mid',
      lastUpdated: 'Dec 05, 2023', author: 'JUST4QUIZ',
      description: 'Classic trivia questions spanning multiple topics including history, science, pop culture, and sports.',
      imageUser: '/Money.png', imageGuest: '/Money.png'
    },
    {
      id: 4,
      title: 'Who is smarter than the fifth grade?',
      plays: '2.1k', questionsCount: 20, duration: '25 min', level: 'Easy',
      lastUpdated: 'Jan 10, 2024', author: 'JUST4QUIZ',
      description: 'Test your elementary school knowledge with math, grammar, and basic science questions.',
      imageUser: '/School.png', imageGuest: '/School.png'
    },
    {
      id: 5,
      title: 'JavaScript Basics',
      plays: '5.6k', questionsCount: 25, duration: '20 min', level: 'Easy',
      lastUpdated: 'Feb 20, 2024', author: 'Tech Academy',
      description: 'Master the fundamentals of JavaScript, including variables, loops, arrays, and basic functions.',
      imageUser: '/JS.png', imageGuest: '/JS.png'
    },
    {
      id: 11,
      title: 'World History Masters',
      plays: '1.2k', questionsCount: 15, duration: '25 min', level: 'Mid',
      lastUpdated: 'Mar 15, 2024', author: 'Elena Vance',
      description: 'Dive deep into the historical events that shaped our modern world. From ancient civilizations to the modern era.',
      imageUser: '/World.png', imageGuest: '/World.png'
    },
    {
      id: 12,
      title: 'Network Security',
      plays: '850', questionsCount: 10, duration: '15 min', level: 'Pro',
      lastUpdated: 'Oct 24, 2023', author: 'Alex Rivera',
      description: 'A comprehensive deep-dive into modern cybersecurity threats, defense mechanisms, and ethical hacking protocols updated for the late 2024 landscape.',
      imageUser: '/Cyber.png', imageGuest: '/Cyber.png'
    },
    {
      id: 13,
      title: 'Quantum Physics',
      plays: '2k', questionsCount: 20, duration: '30 min', level: 'Pro',
      lastUpdated: 'Dec 11, 2023', author: 'Dr. Smith',
      description: 'Test your understanding of quantum mechanics, wave-particle duality, and the foundational theories of physics.',
      imageUser: '/Science.png', imageGuest: '/Science.png'
    },
    {
      id: 14,
      title: 'Pop Culture 2024',
      plays: '5k', questionsCount: 25, duration: '15 min', level: 'Easy',
      lastUpdated: 'Jan 05, 2024', author: 'Sarah J.',
      description: 'How well do you know the latest trends, memes, and celebrity news of 2024? Find out here.',
      imageUser: '/Music.png', imageGuest: '/Music.png'
    },
    {
      id: 15,
      title: 'Renaissance Art',
      plays: '1.1k', questionsCount: 12, duration: '10 min', level: 'Mid',
      lastUpdated: 'Feb 14, 2024', author: 'Da Vinci',
      description: 'Can you identify the masterpiece? A visual journey through the most famous artworks of the Renaissance.',
      imageUser: '/Arts1.png', imageGuest: '/Arts1.png'
    },
    {
      id: 16,
      title: 'Angular Expert',
      plays: '8k', questionsCount: 30, duration: '40 min', level: 'Pro',
      lastUpdated: 'Apr 02, 2024', author: 'Dev Team',
      description: 'Everything about Angular: Components, Directives, Pipes, Dependency Injection, and modern standalone architectures.',
      imageUser: '/Tech.png', imageGuest: '/Tech.png'
    }
  ];

  questions: any[] = [
    { id: 1, type: 'MULTIPLE CHOICE', points: 100, time: '30s', text: 'Which of the following is correct?', expanded: false, answers: [] },
    { id: 2, type: 'TRUE / FALSE', points: 50, time: '20s', text: 'An answer to this question usually spans across true or false.', expanded: false, answers: [] },
    { id: 3, type: 'MULTIPLE CHOICE', points: 200, time: '45s', text: 'Another tricky question for you to solve.', expanded: false, answers: [] }
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(async params => {
      const idParam = params.get('id');
      
      // Kiểm tra xem ID có phải là UUID (ID thực từ database) không
      if (idParam && idParam.includes('-')) {
        try {
          const res: any = await firstValueFrom(
            this.http.get(`http://localhost:8080/api/quizzes/${idParam}`)
          );
          
          if (res) {
            let totalSeconds = 0;
            const mappedQuestions: any[] = [];
            
            // Lấy thời gian từng câu hỏi và gộp vào questions hiển thị
            if (res.questions && res.questions.length > 0) {
              res.questions.forEach((q: any, i: number) => {
                totalSeconds += q.time_limit;

                // parse answers tá»« q.options
                let parsedAnswers: any[] = [];
                if (q.options) {
                  try {
                    parsedAnswers = typeof q.options === 'string' ? JSON.parse(q.options) : q.options;
                  } catch (e) {
                    console.error("LÃ´i parse answers", e);
                  }
                }

                // Xác định loại câu hỏi theo logic số lượng đáp án
                let questionType = 'SINGLE CHOICE';
                const correctCount = parsedAnswers.filter(a => a.is_correct).length;
                if (parsedAnswers.length === 2) {
                  questionType = 'TRUE / FALSE';
                } else if (parsedAnswers.length >= 4 && correctCount >= 2) {
                  questionType = 'MULTIPLE CHOICE';
                } else {
                  questionType = 'SINGLE CHOICE';
                }

                mappedQuestions.push({
                  id: i + 1,
                  type: questionType,
                  points: q.points,
                  time: q.time_limit + 's',
                  text: q.content,
                  answers: parsedAnswers,
                  expanded: false
                });
              });
            }
            
            this.questions = mappedQuestions;
            
            // Tính toán duration (trung bình hoặc tổng thời gian, ở đây hiển thị tổng)
            const minutes = Math.floor(totalSeconds / 60);
            const seconds = totalSeconds % 60;
            let durationStr = '';
            if (minutes > 0) durationStr += `${minutes} min `;
            if (seconds > 0 || minutes === 0) durationStr += `${seconds}s`;
            
            // Format Last Updated
            const dateObj = new Date(res.updated_at || res.created_at);
            const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
            
            // Lấy tên Author
            const authorName = res.creator && res.creator.username ? res.creator.username : 'Anonymous';

            // Kiá»ƒm tra Owner logic mÃ¡Â»â€ºi 
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    const parsedUser = JSON.parse(storedUser);
                    if (parsedUser && parsedUser.id) {
                      const userId = String(parsedUser.id).toLowerCase();
                      const createdById = res.created_by ? String(res.created_by).toLowerCase() : '';
                      const creatorId = (res.creator && res.creator.id) ? String(res.creator.id).toLowerCase() : '';
                      this.isOwner = (createdById === userId) || (creatorId === userId);
                    }
                } catch(e) {}
            }

            // Gán giá trị thẳng từ server (không tự động tính toán Level nữa)
            this.quizData = {
              id: res.id,
              title: res.title,
              plays: res.plays !== undefined && res.plays !== null ? res.plays.toString() : '0', 
              questionsCount: this.questions.length,
              duration: durationStr.trim(),
              level: res.level || 'Mid',
              visibility: res.visibility || 'public',
              engagementRate: 0,
              lastUpdated: dateStr,
              author: authorName,
              description: res.description || 'No description available for this quiz.',
              imageUser: res.cover_image || '/Cyber.png', 
              imageGuest: res.cover_image || '/Cyber.png'
            };
            this.cd.detectChanges();
          }
          return; // Dừng việc tải mock code
        } catch (error) {
          console.error("Không thể lấy Quiz từ backend:", error);
          // Rơi xuống Fallback
        }
      }

      // Xử lý quiz từ mảng Mock
      const id = Number(idParam);
      const foundQuiz = this.mockQuizzes.find(q => q.id === id);
      
      if (foundQuiz) {
        this.quizData = foundQuiz;
      } else {
        // Fallback default
        this.quizData = {
          title: 'Mastering Cyber Security 2024',
          plays: '12.4k', questionsCount: 25, duration: '15 min',
          level: 'Pro', visibility: 'public', lastUpdated: 'Oct 24, 2023', author: 'JUST4QUIZ',
          description: 'A comprehensive deep-dive into modern cybersecurity threats, defense mechanisms.',
          imageUser: '/Cyber security concept.png', imageGuest: '/Cyber Security Theme.png'
        };
      }
      this.cd.detectChanges();
    });
  }

  goToSelectMode() {
    // Đảm bảo lấy đúng các trường cho dù là quiz lấy từ backend hay từ mock
    const lengthToPass = this.quizData.questionsCount || this.questions.length || 0;
    const levelToPass = this.quizData.level || 'Mid';
    const descToPass = this.quizData.description || 'Test your defense mechanisms against modern threats.';

    this.router.navigate(['/play/mode'], { 
      queryParams: { 
        id: this.quizData.id,
        title: this.quizData.title,
        desc: descToPass,
        level: levelToPass,
        length: lengthToPass
      } 
    });
  }

  async setVisibility(status: string) {
    this.quizData.visibility = status;
    this.cd.detectChanges();
    
    if (this.quizData && this.quizData.id && String(this.quizData.id).includes('-')) {
      try {
        await firstValueFrom(
          this.http.patch(`http://localhost:8080/api/quizzes/${this.quizData.id}/visibility`, {
            visibility: status
          })
        );
      } catch (e) {
        console.error('Failed to update visibility', e);
      }
    }
  }

  async deleteQuiz() {
    if (!this.isOwner) return;
    
    const confirmDelete = confirm('Are you sure you want to delete this quiz? This action cannot be undone.');
    if (!confirmDelete) return;

    if (this.quizData && this.quizData.id && String(this.quizData.id).includes('-')) {
      try {
        await firstValueFrom(
          this.http.delete(`http://localhost:8080/api/quizzes/${this.quizData.id}`)
        );
        alert('Quiz deleted successfully');
        this.router.navigate(['/app/quizzes']);
      } catch (e) {
        console.error('Failed to delete quiz', e);
        alert('Failed to delete quiz');
      }
    } else {
      alert('Mock quiz deleted locally');
      this.router.navigate(['/app/quizzes']);
    }
  }

  getShareLink(): string {
    return window.location.href; 
  }
}