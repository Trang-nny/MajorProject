package models

type User struct {
	ID       string `json:"id" gorm:"type:uuid;primaryKey"`
	Username string `json:"username"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"password"`
}
