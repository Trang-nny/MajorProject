import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-multi-mode-selection',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './multi-mode-selection.html',
  styleUrls: ['./multi-mode-selection.css']
})
export class MultiModeSelection {
  selectedMode: 'classic' | 'focus' = 'classic';


  // Thông tin quiz (có thể truyền qua route state hoặc service)
  quizTitle = 'Mastering Cyber Security 2024';
  quizDescription = 'Test your defense mechanisms against modern threats with friends.';
  quizLevel = 'Pro';
  quizQuestions = 25;


  constructor(private router: Router, private route: ActivatedRoute) {}


  selectMode(mode: 'classic' | 'focus') {
    this.selectedMode = mode;
  }


  hostGame() {
    this.router.navigate(['/play/multi/lobby'], {
      queryParams: { mode: this.selectedMode }
    });
  }
}
