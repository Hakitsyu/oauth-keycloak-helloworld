package main

import (
	"os"

	"github.com/Hakitsyu/oauth-keycloak-helloworld/server/api"
)

const DEFAULT_PORT string = "8080"

func main() {
	port := os.Getenv("APP_PORT")
	if port == "" {
		port = DEFAULT_PORT
	}

	api.ListenAndServe(port)
}
