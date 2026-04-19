package main

import (
	"fmt"
	"quiz-backend/config"
	"quiz-backend/models"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	config.ConnectDatabase()
	var results []models.Result
	config.DB.Find(&results)
	fmt.Printf("Total results: %d\n", len(results))
	for _, r := range results {
		fmt.Printf("Result ID: %s UserID: %v QuizID: %v RoomID: %v Score: %d IsSolo: %v\n", r.ID, r.UserID, r.QuizID, r.RoomID, r.Score, r.RoomID == nil)
	}
}
