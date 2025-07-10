class HandleTokens {
  public getAccessToken(): string | null {
    return localStorage.getItem("access-token") || null;
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem("refresh-token") || null;
  }

  public setTokens(tokens: {
    "access-token": string;
    "refresh-token": string;
  }) {
    localStorage.setItem("refresh-token", tokens["refresh-token"]);
    localStorage.setItem("refresh-token", tokens["refresh-token"]);
  }

  public removeTokens() {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
  }
}

const HandleTokensInstance = new HandleTokens();

const getAccessToken =
  HandleTokensInstance.getAccessToken.bind(HandleTokensInstance);
const getRefreshToken =
  HandleTokensInstance.getRefreshToken.bind(HandleTokensInstance);
const setTokens = HandleTokensInstance.setTokens.bind(HandleTokensInstance);
const removeTokens =
  HandleTokensInstance.removeTokens.bind(HandleTokensInstance);

export { getAccessToken, getRefreshToken, setTokens, removeTokens };
