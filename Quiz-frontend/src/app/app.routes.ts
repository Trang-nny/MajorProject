import { Routes } from '@angular/router';

// Layouts
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { GameLayout } from './layouts/game-layout/game-layout';

// Features - Auth & Home
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';

// Features - Dashboard & Core
import { Dashboard } from './features/dashboard/dashboard';
import { Leaderboard } from './features/leaderboard/leaderboard';
import { Profile } from './features/profile/profile';

// Features - Quiz
import { QuizList } from './features/quiz/quiz-list/quiz-list';
import { CreateQuiz } from './features/quiz/create-quiz/create-quiz';
import { QuizDetail } from './features/quiz/quiz-detail/quiz-detail';

// Features - Game Play
import { GameRoom } from './features/game/game-room/game-room';
import { Lobby } from './features/game/lobby/lobby';
import { ModeSelection } from './features/game/mode-selection/mode-selection';
import { Result } from './features/game/result/result';

export const routes: Routes = [
  // Nhóm 1: Các trang không có Header phức tạp (Sử dụng AuthLayout)
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ]
  },

  // Nhóm 2: Các trang chính của ứng dụng (Sử dụng MainLayout - Có Header/Footer)
  {
    path: 'app',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'quizzes', component: QuizList },
      { path: 'create-quiz', component: CreateQuiz },
      { path: 'quiz-detail/:id', component: QuizDetail },
      { path: 'leaderboard', component: Leaderboard }, // Sửa lỗi nút Leaderboard
      { path: 'profile', component: Profile },         // Sửa lỗi nút Profile
    ]
  },

  // Nhóm 3: Các trang khi đang tham gia trò chơi (Sử dụng GameLayout)
  {
    path: 'play',
    component: GameLayout,
    children: [
      { path: 'mode', component: ModeSelection },
      { path: 'lobby', component: Lobby },
      { path: 'room', component: GameRoom },
      { path: 'result', component: Result },
    ]
  },

  // Đường dẫn mặc định khi nhập sai URL
  { path: '**', redirectTo: '' }
];