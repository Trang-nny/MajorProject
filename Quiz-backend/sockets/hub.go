package sockets

import (
	"fmt"
	"sync"

	"github.com/gorilla/websocket"
)

// Message đại diện cho dữ liệu gửi qua lại giữa Client và Server
type Message struct {
	Action string      `json:"action"` // Ví dụ: "join_room", "chat", "submit_answer"
	RoomID string      `json:"roomId"`
	UserID string      `json:"userId"`
	Data   interface{} `json:"data"`
}

// Client đại diện cho 1 kết nối WebSocket của 1 người chơi
type Client struct {
	Conn   *websocket.Conn
	UserID string
	RoomID string
	Send   chan Message
}

// Hub quản lý danh sách các phòng chơi
type Hub struct {
	Rooms      map[string]map[*Client]bool // Danh sách Client trong từng RoomID
	Broadcast  chan Message                // Kênh phát sóng tin nhắn
	Register   chan *Client                // Kênh đăng ký Client mới
	Unregister chan *Client                // Kênh hủy đăng ký Client
	mu         sync.Mutex                  // Tránh xung đột khi nhiều người vào cùng lúc
}

// Tạo một Hub mới
func NewHub() *Hub {
	return &Hub{
		Rooms:      make(map[string]map[*Client]bool),
		Broadcast:  make(chan Message),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
	}
}

// Vòng lặp xử lý chính của Hub (Chạy nền)
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			h.mu.Lock()
			if h.Rooms[client.RoomID] == nil {
				h.Rooms[client.RoomID] = make(map[*Client]bool)
			}
			h.Rooms[client.RoomID][client] = true
			h.mu.Unlock()
			fmt.Printf("User %s joined room %s\n", client.UserID, client.RoomID)

		case client := <-h.Unregister:
			h.mu.Lock()
			if _, ok := h.Rooms[client.RoomID][client]; ok {
				delete(h.Rooms[client.RoomID], client)
				close(client.Send)
				// Nếu phòng trống thì xóa phòng
				if len(h.Rooms[client.RoomID]) == 0 {
					delete(h.Rooms, client.RoomID)
				}
			}
			h.mu.Unlock()
			fmt.Printf("User %s left room %s\n", client.UserID, client.RoomID)

		case message := <-h.Broadcast:
			h.mu.Lock()
			// Gửi tin nhắn cho tất cả Client trong cùng 1 Room
			if clients, ok := h.Rooms[message.RoomID]; ok {
				for client := range clients {
					select {
					case client.Send <- message:
					default:
						close(client.Send)
						delete(h.Rooms[client.RoomID], client)
					}
				}
			}
			h.mu.Unlock()
		}
	}
}
