import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment'

export const authConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: environment.idpIssuer,  
  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/#/login?',
  silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',
  // The SPA's id. The SPA is registerd with this id at the auth-server
  clientId: environment.idpClientId,
  // set the scope for the permissions the client should request
  // The first three are defined by OIDC. The 4th is a usecase-specific one
  scope: environment.idpScopes,  
  showDebugInformation: true,
  silentRefreshShowIFrame: false,
  sessionChecksEnabled: false,
  clearHashAfterLogin: false,
  requireHttps: true
}
