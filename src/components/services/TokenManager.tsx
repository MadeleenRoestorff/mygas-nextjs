import { NextRouter } from "next/router";

class TokenManager {
  router: NextRouter;
  token: string;

  constructor(router) {
    this.router = router;
    if (typeof localStorage !== "undefined") {
      this.token = localStorage.getItem("token");
    }
  }
  getToken() {
    if (!this.token || this.token == "undefined") {
      this.token = localStorage.getItem("token");
      if (!this.token || this.token == "undefined") {
        this.goToLogin();
      }
    }
    return this.token;
  }
  logout() {
    localStorage.removeItem("token");
    this.token = null;
    this.goToLogin();
  }
  goToLogin() {
    this.router.push({
      pathname: "/login",
      query: { redirect: this.router.pathname }
    });
  }
  setRouter(router) {
    this.router = router;
  }
}

export default TokenManager;
