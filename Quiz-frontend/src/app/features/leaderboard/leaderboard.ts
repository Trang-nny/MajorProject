import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.html',
  styleUrl: './leaderboard.css',
})
export class Leaderboard {
  topChampions = [
    { rank: 2, name: 'Marcus Chen', points: '14,250', img: '/User.png', color: 'silver' },
    { rank: 1, name: 'Sophia Vancity', points: '18,920', img: '/User.png', color: 'gold', title: 'Master Quizzer' },
    { rank: 3, name: 'Elena Rodriguez', points: '12,800', img: '/User.png', color: 'bronze' }
  ];

  rankings = [
    { rank: '04', name: 'Liam Wilson', subtitle: '82 Quizzes Completed', badge: 'TOP PERFORMER', points: '11,400', trend: '+2 ranks', img: '/User.png' },
    { rank: '05', name: 'Aria Thorne', subtitle: '12 Day Streak', badge: 'CONSISTENT', points: '10,950', trend: 'STABLE', img: '/User.png' },
    { rank: '06', name: 'Jordan Smith', subtitle: 'History Buff', points: '9,820', trend: '-1 rank', trendDown: true, img: '/User.png' },
    { rank: '07', name: 'Alex Rivera (You)', subtitle: 'Current Rank', badge: 'RISING STAR', points: '8,440', trend: '+5 ranks', isUser: true, img: '/User.png' },
    { rank: '08', name: 'Leo Kim', subtitle: 'Science Expert', points: '7,100', trend: 'STABLE', img: '/User.png' },
    { rank: '09', name: 'Mia Tran', subtitle: 'Math Genius', points: '6,850', trend: 'UP', img: '/User.png' },
{ rank: '10', name: 'David Nguyen', subtitle: 'History Buff', points: '6,500', trend: 'DOWN', img: '/User.png' },
{ rank: '11', name: 'Anna Pham', subtitle: 'Tech Enthusiast', points: '6,200', trend: 'STABLE', img: '/User.png' }
  ];
}