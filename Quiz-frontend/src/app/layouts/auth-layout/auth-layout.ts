import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
// Import chính xác dựa trên cấu trúc thư mục trong ảnh của bạn
import { Navbar } from '../../shared/components/navbar/navbar'; 
import { Footer } from '../../shared/components/footer/footer'; 

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  // Quan trọng: Phải đưa Navbar và Footer vào mảng imports này
  imports: [RouterOutlet, Navbar, Footer, CommonModule], 
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css'
})
export class AuthLayout { }