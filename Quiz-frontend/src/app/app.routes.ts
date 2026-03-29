import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz';
import { LobbyComponent } from './pages/lobby/lobby';
import { GameRoomComponent } from './pages/game-room/game-room';
import { ResultComponent } from './pages/result/result';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-quiz', component: CreateQuizComponent },
  { path: 'lobby/:id', component: LobbyComponent },
  { path: 'game-room', component: GameRoomComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '' }
];