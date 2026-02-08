import axios from "./axiosInstance";

// ---------------- LOGIN ----------------
export const login = (data) => {
  return axios.post("/api/accounts/login/", data);
};

// ---------------- SIGNUP ----------------
export const signup = (data) => {
  return axios.post("/api/accounts/signup/", data);
};

// ---------------- SEND OTP ----------------
export const sendOtp = (email) => {
  return axios.post("/api/common/send-otp/", {
    email: email,
  });
};

// ---------------- VERIFY OTP ----------------
export const verifyOtp = (email, otp) => {
  return axios.post("/api/common/verify-otp/", {
    email: email,
    otp: otp,
  });
};
