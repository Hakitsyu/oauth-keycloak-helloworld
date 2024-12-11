package middleware

import (
	"net/http"

	"github.com/coreos/go-oidc"
	"github.com/gorilla/mux"
)

const ClientId string = "oauth-kck-server"
const IssuerUrl string = "http://localhost:8020/realms/company"

func ConfigureAuthMiddleware(router *mux.Router) {
	router.Use(authMiddleware)
}

func authMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		provider, err := oidc.NewProvider(ctx, IssuerUrl)
		if err != nil {
			http.Error(w, "Internal error", http.StatusInternalServerError)
			return
		}

		verifier := provider.Verifier(&oidc.Config{
			ClientID: ClientId,
		})

		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Missing Authorization header", http.StatusUnauthorized)
			return
		}

		rawIDToken := authHeader[len("Bearer "):]

		_, err = verifier.Verify(ctx, rawIDToken)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}

		next.ServeHTTP(w, r)
	})
}
