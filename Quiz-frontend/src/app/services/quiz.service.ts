import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateQuizPayload {
  title: string;
  description?: string;
  level?: string;
  cover_image?: string;
  user_id?: string;
  questions: {
    content: string;
    time_limit: number;
    points: number;
    multiple_correct: boolean;
    answers: {
      text: string;
      is_correct: boolean;
    }[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private http = inject(HttpClient);
  private apiUrl = `http://${window.location.hostname}:8080/api`; // Go Backend API

  createQuiz(payload: CreateQuizPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/quizzes`, payload);
  }

  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quizzes`);
  }
}