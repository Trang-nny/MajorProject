import { Routes } from '@angular/router';

// Layouts - Đường dẫn khớp với file thực tế bạn vừa tạo
import { AuthLayout} from './layouts/auth-layout/auth-layout';
import { MainLayout} from './layouts/main-layout/main-layout';
import { GameLayout} from './layouts/game-layout/game-layout';

// Features - Đường dẫn khớp với file thực tế
import { Home} from './features/home/home';
import { Login} from './features/auth/login/login';
import { Register} from './features/auth/register/register';
import { Dashboard} from './features/dashboard/dashboard';
import { QuizList} from './features/quiz/quiz-list/quiz-list';
import { GameRoom} from './features/game/game-room/game-room';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', component: Home },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
    ]
  },
  {
    path: 'app',
    component: MainLayout,
    children: [
      { path: 'dashboard', component: Dashboard },
      { path: 'quizzes', component: QuizList },
    ]
  },
  {
    path: 'play',
    component: GameLayout,
    children: [
      { path: 'room', component: GameRoom },
    ]
  },
  { path: '**', redirectTo: '' }
];