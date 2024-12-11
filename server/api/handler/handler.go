package handler

import (
	"github.com/gorilla/mux"
)

const DEFAULT_PREFIX string = "/api"

func ConfigureHandlers(router *mux.Router) {
	ConfigureItemHandlers(router)
}
