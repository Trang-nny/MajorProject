package models

import "github.com/google/uuid"

type User struct {
	ID       uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	Username string    `json:"username"`
	Email    string    `json:"email" gorm:"unique"`
	Password string    `json:"password"`
	Avatar   *string   `json:"avatar"`
	Bio      *string   `json:"bio"`
}
