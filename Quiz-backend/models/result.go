package models

import (
	"time"

	"github.com/google/uuid"
)

type Result struct {
	ID             uuid.UUID  `gorm:"type:uuid;default:gen_random_uuid();primaryKey"`
	QuizID         *uuid.UUID `gorm:"type:uuid"`
	RoomID         *uuid.UUID `gorm:"type:uuid"`
	PlayerID       *uuid.UUID `gorm:"type:uuid"`
	UserID         *uuid.UUID `gorm:"type:uuid"`
	Score          int        `gorm:"default:0"`
	CorrectAnswers int        `gorm:"default:0"`
	PlayCount      int        `gorm:"default:1"`
	CreatedAt      time.Time  `gorm:"autoCreateTime"`

	Quiz *Quiz `json:"quiz" gorm:"foreignKey:QuizID;references:ID"`
}
