import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-quiz-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz-detail.html',
  styleUrl: './quiz-detail.css'
})
export class QuizDetail implements OnInit {
  @Input() isOwner: boolean = true;
  selectedVisibility: string = 'public';


  quizData = {
    title: 'Mastering Cyber Security 2024',
    plays: '12.4k',
    questionsCount: 25,
    duration: '15 min',
    level: 'Pro Level',
    engagementRate: 88,
    lastUpdated: 'Oct 24, 2023',
    category: 'Technology',
    author: 'JUST4QUIZ',
    description: 'A comprehensive deep-dive into modern cybersecurity threats, defense mechanisms, and ethical hacking protocols updated for the late 2024 landscape.',
    imageUser: '/Cyber Security Theme.png',
    imageGuest: '/Cyber security concept.png'
  };


  questions = [
    { id: 1, type: 'MULTIPLE CHOICE', points: 100, time: '30s', text: 'What is the primary purpose of a "Zero Trust" security architecture?' },
    { id: 2, type: 'TRUE / FALSE', points: 50, time: '20s', text: 'Salting a password helps prevent Rainbow Table attacks.' },
    { id: 3, type: 'MULTIPLE CHOICE', points: 200, time: '45s', text: 'Which encryption algorithm is considered post-quantum resistant?' }
  ];


  ngOnInit(): void {}
 
  saveChanges() {
     console.log('Visibility changed to:', this.selectedVisibility);
  }
 
  cancel() {
    console.log('Action cancelled');
  }
}



