package middleware

import (
	"errors"
	"net/http"

	"github.com/Hakitsyu/oauth-keycloak-helloworld/server/internal/auth"
	"github.com/gorilla/mux"
)

func ConfigureAuthMiddleware(router *mux.Router) {
	router.Use(authMiddleware)
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		rawIDToken, err := getRawIdToken(w, r)
		if err != nil {
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		}

		ctx := r.Context()
		verifier := auth.NewOidcVerifier(ctx)

		_, err = verifier.Verify(ctx, rawIDToken)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func getRawIdToken(w http.ResponseWriter, r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return "", errors.New("Missing Authorization header")
	}

	return authHeader[len("Bearer "):], nil
}
