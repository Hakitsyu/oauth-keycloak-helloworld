package auth

import (
	"context"
	"os"

	"github.com/coreos/go-oidc"
)

var (
	config *OAuthConfig
)

type OAuthConfig struct {
	ClientId  string
	IssuerUrl string
}

func init() {
	loadConfiguration()
}

func loadConfiguration() {
	clientId := os.Getenv("OAUTH_CLIENT_ID")
	if clientId == "" {
		panic("OAUTH_CLIENT_ID is not set")
	}

	issuerUrl := os.Getenv("OAUTH_ISSUER_URL")
	if issuerUrl == "" {
		panic("OAUTH_ISSUER_URL is not set")
	}

	config = &OAuthConfig{
		ClientId:  clientId,
		IssuerUrl: issuerUrl,
	}
}

func createOidcProvider(ctx context.Context) *oidc.Provider {
	provider, err := oidc.NewProvider(ctx, config.IssuerUrl)
	if err != nil {
		panic(err)
	}

	return provider
}

func createOidcVerifier(provider *oidc.Provider) *oidc.IDTokenVerifier {
	skipIssuerCheck := os.Getenv("OAUTH_SKIP_ISSUER_CHECK")
	if skipIssuerCheck == "true" {
		return provider.Verifier(&oidc.Config{
			ClientID:        config.ClientId,
			SkipIssuerCheck: true,
		})
	}

	return provider.Verifier(&oidc.Config{
		ClientID: config.ClientId,
	})
}

func NewOidcVerifier(ctx context.Context) *oidc.IDTokenVerifier {
	provider := createOidcProvider(ctx)
	return createOidcVerifier(provider)
}
