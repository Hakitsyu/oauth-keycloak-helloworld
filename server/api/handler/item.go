package handler

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

type Item struct {
	Name string `json:"name"`
}

var (
	items *[]Item
)

func init() {
	items = &[]Item{
		{Name: "Item 1"},
		{Name: "Item 2"},
		{Name: "Item 3"},
	}
}

func ConfigureItemHandlers(router *mux.Router) {
	router.HandleFunc(DEFAULT_PREFIX+"/item", GetItems).Methods("GET")
}

func GetItems(rw http.ResponseWriter, r *http.Request) {
	content, err := json.Marshal(items)
	if err != nil {
		print("HELLASDSAD")
		return
	}

	rw.Header().Set("Content-Type", "application/json")
	rw.Header().Set("Content-Length", fmt.Sprintf("%d", len(content)))
	rw.Header().Set("Access-Control-Allow-Origin", "*")
	rw.WriteHeader(http.StatusOK)

	rw.Write(content)
}
