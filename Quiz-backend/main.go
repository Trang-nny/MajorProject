package main

import (
	"quiz-backend/config"
	"quiz-backend/controllers" // Nhập thư mục controllers vào

	"github.com/gin-gonic/gin"
)

func main() {
	// 1. Khởi tạo server Gin
	r := gin.Default()

	// 2. Kết nối Database
	config.ConnectDatabase()

	// 3. Khai báo các API Routes
	auth := r.Group("/auth")
	{
		auth.POST("/register", controllers.Register) // Đường dẫn: localhost:8080/auth/register
		auth.POST("/login", controllers.Login)       // Đường dẫn: localhost:8080/auth/login
	}

	// 4. Chạy Server ở cổng 8080
	r.Run(":8080")
}
