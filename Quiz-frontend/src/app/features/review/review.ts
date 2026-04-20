import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.html',
  styleUrls: ['./review.css']
})
export class Review implements OnInit {
  selectedRating = 0; // Lưu số sao người dùng chọn khi click

  // Dữ liệu giả lập (Mock data)
  reviews = [
    {
      userName: 'Jordan Dax',
      userMeta: 'Played 2 days ago • Advanced Learner',
      rating: 5,
      content: 'Great quiz! The questions on social engineering and zero-trust architectures were incredibly well-thought-out. It really tests your practical understanding rather than just rote memorization. Highly recommended for anyone prepping for certifications.',
      avatar: 'User.png'
    },
    {
      userName: 'Sarah Chen',
      userMeta: 'Played 1 week ago • IT Specialist',
      rating: 4,
      content: "Very challenging but fair. Some of the network security questions are quite tricky, so make sure you've brushed up on your OSI model. Could use a few more visual aids in the question stems.",
      avatar: 'User.png'
    },
    {
      userName: 'Marcus Lane',
      userMeta: 'Played 2 weeks ago • Hobbyist',
      rating: 5,
      content: "An absolute pulse-pounder! I've been working in tech for 20 years and even I got stumped twice. The feedback section after each question is incredibly informative. This is the gold standard for quizzes.",
      avatar: 'User.png'
    }
  ];

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }
  
  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  constructor() {}
  ngOnInit(): void {}
}