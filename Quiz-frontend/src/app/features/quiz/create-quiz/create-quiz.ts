import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../../../services/quiz.service';
import { Router } from '@angular/router';

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: number;
  text: string;
  multipleCorrect: boolean;
  timeLimit: number;
  points: number;
  answers: Answer[];
}

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-quiz.html',
  styleUrls: ['./create-quiz.css']
})
export class CreateQuiz {
  private quizService = inject(QuizService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  quizTitle = '';
  quizDescription = '';
  quizLevel = 'Easy';
	quizCoverImage: string | null = null;
	quizCoverFileName: string | null = null;


  questions: Question[] = [
    this.generateNewQuestion(1)
  ];

  activeQuestionIndex = 0;

  get activeQuestion(): Question {
    return this.questions[this.activeQuestionIndex];
  }

  generateNewQuestion(id: number): Question {
    return {
      id,
      text: '',
      multipleCorrect: false,
      timeLimit: 20,
      points: 100,
      answers: [
        { id: 1, text: '', isCorrect: true },
        { id: 2, text: '', isCorrect: false },
        { id: 3, text: '', isCorrect: false },
        { id: 4, text: '', isCorrect: false },
      ]
    };
  }

  onCoverImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.quizCoverImage = e.target.result;
			this.quizCoverFileName = file.name;
			this.cd.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  removeCoverImage() {
    this.quizCoverImage = null;
		this.quizCoverFileName = null;
  }

  selectLevel(level: string) {
    this.quizLevel = level;
  }

  addQuestion() {
    const newId = this.questions.length > 0 ? Math.max(...this.questions.map(q => q.id)) + 1 : 1;
    this.questions.push(this.generateNewQuestion(newId));
    this.activeQuestionIndex = this.questions.length - 1;
  }

  selectQuestion(index: number) {
    this.activeQuestionIndex = index;
  }

  deleteQuestion(index: number) {
    if (this.questions.length === 1) {
      alert("A quiz must have at least one question.");
      return;
    }
    this.questions.splice(index, 1);
    if (this.activeQuestionIndex >= this.questions.length) {
      this.activeQuestionIndex = this.questions.length - 1;
    }
  }

  copyQuestion(index: number) {
    const original = this.questions[index];
    const newId = Math.max(...this.questions.map(q => q.id)) + 1;
    const copy: Question = JSON.parse(JSON.stringify(original));
    copy.id = newId;
    this.questions.splice(index + 1, 0, copy);
    this.activeQuestionIndex = index + 1;
  }

  addAnswer() {
    const q = this.activeQuestion;
    if (q.answers.length >= 4) {
      alert("Maximum 4 answers allowed.");
      return;
    }
    const newId = q.answers.length > 0 ? Math.max(...q.answers.map(a => a.id)) + 1 : 1;
    q.answers.push({ id: newId, text: '', isCorrect: false });
  }

  deleteAnswer(ansIndex: number) {
    if (this.activeQuestion.answers.length <= 2) {
      alert("A question must have at least 2 answers.");
      return;
    }
    this.activeQuestion.answers.splice(ansIndex, 1);
  }

  toggleCorrectAnswer(ansIndex: number) {
    const q = this.activeQuestion;
    if (!q.multipleCorrect) {
      q.answers.forEach((ans, i) => {
        ans.isCorrect = (i === ansIndex);
      });
    } else {
      q.answers[ansIndex].isCorrect = !q.answers[ansIndex].isCorrect;
    }
  }

  onMultipleCorrectChange() {
    const q = this.activeQuestion;
    if (!q.multipleCorrect) {
      let foundCorrect = false;
      q.answers.forEach(ans => {
        if (ans.isCorrect) {
          if (!foundCorrect) foundCorrect = true;
          else ans.isCorrect = false;
        }
      });
      if (!foundCorrect && q.answers.length > 0) {
        q.answers[0].isCorrect = true;
      }
    }
  }

  saveQuiz() {
    if (!this.quizTitle.trim()) {
      alert('Vui lòng nhập tên Quiz');
      return;
    }

    // Validation (optional check, customize per need)
    for (let i = 0; i < this.questions.length; i++) {
        const q = this.questions[i];
        if (!q.text.trim()) {
            alert(`Câu hỏi ${i + 1} không được để trống`);
            return;
        }
    }

    const storedUser = localStorage.getItem('user');
    let userId = '';
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        userId = user.id || '';
      } catch (e) {}
    }

    const payload = {
      title: this.quizTitle,
      description: this.quizDescription,
      level: this.quizLevel,
      visibility: 'private', // Mặc định là private
      cover_image: this.quizCoverImage || undefined,
      user_id: userId,
      questions: this.questions.map(q => {
        return {
           content: q.text,
           time_limit: q.timeLimit,
           points: q.points,
           multiple_correct: q.multipleCorrect,
           answers: q.answers.map(a => ({
             text: a.text,
             is_correct: a.isCorrect
           }))
        };
      })
    };

    console.log("Saving quiz with payload:", payload);
    
    this.quizService.createQuiz(payload).subscribe({
      next: (res: any) => {
        alert('Tạo Quiz thành công!');
        // Thay vì chuyển đến quizzes, chuyển đến quiz detail
        this.router.navigate(['/app/quiz-detail', res.quiz?.id || res.quiz?.ID || res.data?.id || res.id || res.ID]);
      },
      error: (err) => {
        console.error(err);
        alert('Có lỗi xảy ra khi tạo Quiz: ' + (err.error?.message || err.message));
      }
    });

  }
}
