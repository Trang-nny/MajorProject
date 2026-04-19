package models

import (
	"github.com/google/uuid"
)

type Question struct {
	ID              uuid.UUID `json:"id" gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	QuizID          uuid.UUID `json:"quiz_id" gorm:"type:uuid;not null"`
	Content         string    `json:"content" gorm:"type:text;not null"`
	TimeLimit       int       `json:"time_limit" gorm:"type:int;default:20"`
	Points          int       `json:"points" gorm:"type:int;default:100"`
	MultipleCorrect bool      `json:"multiple_correct" gorm:"type:boolean;default:false"`
	Options         string    `json:"options" gorm:"type:jsonb;not null;default:'[]'"`
}
