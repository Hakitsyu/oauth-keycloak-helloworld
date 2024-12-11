package api

import (
	"net/http"

	"github.com/Hakitsyu/oauth-keycloak-helloworld/server/api/handler"
	"github.com/gorilla/mux"
)

func ListenAndServe(port string) {
	router := mux.NewRouter()

	handler.ConfigureHandlers(router)

	http.ListenAndServe(":"+port, router)
}
