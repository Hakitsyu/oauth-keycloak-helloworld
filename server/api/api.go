package api

import (
	"net/http"

	"github.com/Hakitsyu/oauth-keycloak-helloworld/server/api/handler"
	"github.com/Hakitsyu/oauth-keycloak-helloworld/server/api/middleware"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func ListenAndServe(port string) {
	router := mux.NewRouter()

	handler.ConfigureHandlers(router)
	middleware.ConfigureMiddlewares(router)

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Authorization", "Content-Type"},
		AllowCredentials: true,
	})

	http.ListenAndServe(":"+port, c.Handler(router))
}
