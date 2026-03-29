package controllers

import (
	"net/http"
	"quiz-backend/config"
	"quiz-backend/models"

	"github.com/gin-gonic/gin"
)

// Đăng ký người dùng mới
func Register(c *gin.Context) {
	var input models.User

	// 1. Kiểm tra dữ liệu từ Frontend gửi lên có đúng định dạng không
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dữ liệu không hợp lệ!"})
		return
	}

	// 2. Lưu người dùng vào Database (Supabase) thông qua GORM
	if err := config.DB.Create(&input).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Không thể đăng ký người dùng!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Đăng ký thành công!"})
}

// Đăng nhập
func Login(c *gin.Context) {
	var input models.User
	var user models.User

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Dữ liệu không hợp lệ!"})
		return
	}

	// 3. Tìm người dùng trong DB bằng Email
	if err := config.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email hoặc mật khẩu không đúng!"})
		return
	}

	// 4. Kiểm tra mật khẩu (Tạm thời so sánh chuỗi, sau này nên dùng Bcrypt để mã hóa)
	if user.Password != input.Password {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Email hoặc mật khẩu không đúng!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Đăng nhập thành công!", "user": user})
}
