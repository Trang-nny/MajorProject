import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result implements OnInit {
  // Chuyển false để xem giao diện Guest, true để xem Host
  isOwner: boolean = false; 

  quizResult = {
    description: "Amazing effort! You've navigated JUST4QUIZ with luminous intelligence.",
    totalPoints: 24500,
    rank: 2,
    avgTime: '1.2s',
    accuracy: 88,
    correctAnswers: 22,
    totalQuestions: 25,
    bestStreak: 12,
    masteryInsight: 'You excelled in the Logic & Patterns section with a 100% accuracy rate. Your speed was 15% faster than the global average.',
    imageSummary: '/Celebratory.png'
  };

  leaderboard = [
    { rank: 1, name: 'Alex Rivera', points: 15890, avatar: '/User.png', badge: 'WINNER' },
    { rank: 2, name: 'Sarah', points: 12450, avatar: '/User.png', badge: '' },
    { rank: 3, name: 'Quinn', points: 10120, avatar: '/User.png', badge: '' },
    { rank: 4, name: 'Jordan P.', points: 9840, avatar: '/User.png', badge: 'TOP PERFORMER' },
    { rank: 5, name: 'Mia Wong', points: 8200, avatar: '/User.png', badge: 'CONSISTENT' }
  ];

  ngOnInit(): void {}
}