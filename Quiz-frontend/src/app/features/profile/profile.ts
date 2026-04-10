import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile {
  user = {
    name: 'Alex Rivera',
    title: 'Master of Logic & Digital Lore',
    games: 142,
    points: 42850,
    rank: 12,
    avgScore: 88
  };

  historySessions = [
    { name: 'Retro Sci-Fi Trivia', date: 'Oct 24, 2024', score: 950, rank: '1st', players: 248, icon: 'public', color: '#6c2bd9' },
    { name: 'JS Mastery Challenge', date: 'Oct 22, 2024', score: 820, rank: '4th', players: 1024, icon: 'code', color: '#3d4aed' },
    { name: 'Geography Sprint', date: 'Oct 20, 2024', score: 1100, rank: '2nd', players: 56, icon: 'terrain', color: '#d92b5a' }
  ];

  createdQuizzes = [
    { id: 1, title: 'Galactic Frontiers', image: '/Space-Quiz.png', plays: '1.2k plays', rating: 4.8, category: 'SCI-FI', color: '#6c2bd9' },
    { id: 2, title: 'Exotic Ecosystems', image: '/Nature-Quiz.png', plays: '856 plays', rating: 4.5, category: 'NATURE', color: '#d92b5a' },
    { id: 3, title: 'Python Logic Puzzles', image: '/Code-Quiz.png', plays: '3.4k plays', rating: 4.9, category: 'CODING', color: '#3d4aed' }
  ];
}