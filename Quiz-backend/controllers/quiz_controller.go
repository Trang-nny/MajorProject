package controllers

import (
	"encoding/json"
	"net/http"
	"quiz-backend/config"
	"quiz-backend/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateQuizInput struct {
	Title       string                `json:"title"`
	Description string                `json:"description"`
	Level       string                `json:"level"`
	Visibility  string                `json:"visibility"`
	CoverImage  string                `json:"cover_image"`
	UserID      string                `json:"user_id"` // Receive user_id from frontend since no token middleware
	Questions   []CreateQuestionInput `json:"questions"`
}

type AnswerInput struct {
	Text      string `json:"text"`
	IsCorrect bool   `json:"is_correct"`
}

type CreateQuestionInput struct {
	Content         string        `json:"content"`
	TimeLimit       int           `json:"time_limit"`
	Points          int           `json:"points"`
	MultipleCorrect bool          `json:"multiple_correct"`
	Answers         []AnswerInput `json:"answers"`
}

func CreateQuiz(c *gin.Context) {
	var input CreateQuizInput

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body", "details": err.Error()})
		return
	}

	if input.Title == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Title is required"})
		return
	}

	var createdBy *uuid.UUID = nil
	if input.UserID != "" {
		parsedUUID, err := uuid.Parse(input.UserID)
		if err == nil {
			createdBy = &parsedUUID
		}
	}

	tx := config.DB.Begin()

	quiz := models.Quiz{
		Title:       input.Title,
		Description: input.Description,
		Level:       input.Level,
		Visibility:  input.Visibility,
		CoverImage:  input.CoverImage,
		CreatedBy:   createdBy,
	}

	if err := tx.Create(&quiz).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create quiz"})
		return
	}

	var questions []models.Question
	for _, qData := range input.Questions {
		optionsJSON, err := json.Marshal(qData.Answers)
		if err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not marshal answers"})
			return
		}

		q := models.Question{
			QuizID:          quiz.ID,
			Content:         qData.Content,
			TimeLimit:       qData.TimeLimit,
			Points:          qData.Points,
			MultipleCorrect: qData.MultipleCorrect,
			Options:         string(optionsJSON),
		}
		questions = append(questions, q)
	}

	if len(questions) > 0 {
		if err := tx.Create(&questions).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create questions", "details": err.Error()})
			return
		}
	}

	tx.Commit()

	c.JSON(http.StatusCreated, gin.H{
		"message": "Quiz created successfully",
		"quiz":    quiz,
	})
}

func GetQuizzes(c *gin.Context) {
	var quizzes []models.Quiz
	if err := config.DB.Preload("Creator").Preload("Questions").Order("created_at desc").Find(&quizzes).Error; err != nil {
	}
	c.JSON(http.StatusOK, quizzes)
}

func GetQuiz(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "ID is required"})
		return
	}

	var quiz models.Quiz

	if err := config.DB.Preload("Creator").Preload("Questions").First(&quiz, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Quiz not found"})
		return
	}

	c.JSON(http.StatusOK, quiz)
}

func UpdateQuizVisibility(c *gin.Context) {
	id := c.Param("id")
	var input struct {
		Visibility string `json:"visibility"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	var quiz models.Quiz
	if err := config.DB.First(&quiz, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Quiz not found"})
		return
	}

	quiz.Visibility = input.Visibility
	config.DB.Save(&quiz)

	c.JSON(http.StatusOK, gin.H{"message": "Visibility updated", "visibility": quiz.Visibility})
}

func DeleteQuiz(c *gin.Context) {
	id := c.Param("id")

	var quiz models.Quiz
	if err := config.DB.First(&quiz, "id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Quiz not found"})
		return
	}

	if err := config.DB.Delete(&quiz).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete quiz"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Quiz deleted successfully"})
}
