package middleware

import "github.com/gorilla/mux"

func ConfigureMiddlewares(router *mux.Router) {
	ConfigureAuthMiddleware(router)
}
