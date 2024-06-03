export const API_URL =
  process.env.HOST === "dev" || process.env.NEXT_PUBLIC_HOST === "dev"
    ? "http://localhost:8080/api/"
    : "https://e-invitaion-6db5dd66a01c.herokuapp.com/api/";

// export const API_URL = "https://e-invitaion-6db5dd66a01c.herokuapp.com/api/";

export const CLIENT_DOMAIN =
  process.env.HOST === "dev" || process.env.NEXT_PUBLIC_HOST === "dev"
    ? "http://localhost:3000/"
    : "https://e-invitaion-6db5dd66a01c.herokuapp.com/";
