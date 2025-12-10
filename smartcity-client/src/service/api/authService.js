import api from "./api";

export const signUp = (data) => {
  return api.post("/auth/signup", data);
};

export const login = (data)=>{
  return api.post("/auth/login",data);
}
