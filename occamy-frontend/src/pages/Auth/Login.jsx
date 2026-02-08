import { useState } from "react";
import { login as loginApi, signup, sendOtp, verifyOtp } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const emailRegex = /@(occamy\.com|distributor\.com)$/;

export default function Login() {
  const { login } = useAuth();
  const { t, i18n } = useTranslation();

  const [mode, setMode] = useState("LOGIN");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    otp: "",
  });

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await loginApi({
        username: form.username,
        password: form.password,
      });
      login(res.data.user, res.data.access);
    } catch {
      setMessage(t("invalid_credentials"));
    }
    setLoading(false);
  };

  const handleSignup = async () => {
    setLoading(true);
    setMessage("");

    if (!emailRegex.test(form.email)) {
      setMessage(t("invalid_email"));
      setLoading(false);
      return;
    }

    try {
      await signup({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      await sendOtp(form.email);
      setMode("VERIFY_OTP");
      setMessage(t("otp_sent"));
    } catch {
      setMessage(t("signup_failed"));
    }

    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setMessage("");
    try {
      await verifyOtp(form.email, form.otp);
      setMode("LOGIN");
      setMessage(t("otp_verified"));
    } catch {
      setMessage(t("otp_invalid"));
    }
    setLoading(false);
  };

  return (
    <div className="center" style={{ minHeight: "100vh" }}>
      <div style={styles.card}>

        {/* Language Toggle */}
        <div style={{ textAlign: "right", marginBottom: 10 }}>
          <button
            onClick={() =>
              i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")
            }
            style={{
              background: "transparent",
              border: "1px solid #1e293b",
              color: "#cbd5f5",
              padding: "4px 10px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            EN / हिंदी
          </button>
        </div>

        <h1 style={styles.title}>{t("title")}</h1>

        <p style={styles.subtitle}>
          {mode === "LOGIN" && t("subtitle_login")}
          {mode === "SIGNUP" && t("subtitle_signup")}
          {mode === "VERIFY_OTP" && t("subtitle_otp")}
        </p>

        {message && <div style={styles.message}>{message}</div>}

        {(mode === "LOGIN" || mode === "SIGNUP") && (
          <>
            <input
              style={styles.input}
              placeholder={t("username")}
              value={form.username}
              onChange={(e) =>
                setForm({ ...form, username: e.target.value })
              }
            />

            {mode === "SIGNUP" && (
              <input
                style={styles.input}
                placeholder={t("email")}
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            )}

            <input
              type="password"
              style={styles.input}
              placeholder={t("password")}
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button
              style={styles.button}
              onClick={mode === "LOGIN" ? handleLogin : handleSignup}
              disabled={loading}
            >
              {loading
                ? t("please_wait")
                : mode === "LOGIN"
                ? t("login")
                : t("create")}
            </button>
          </>
        )}

        {mode === "VERIFY_OTP" && (
          <>
            <input
              style={styles.input}
              placeholder={t("otp")}
              value={form.otp}
              onChange={(e) =>
                setForm({ ...form, otp: e.target.value })
              }
            />
            <button
              style={styles.button}
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? t("verifying") : t("verify")}
            </button>
          </>
        )}

        <div style={styles.footer}>
          {mode === "LOGIN" && (
            <span onClick={() => setMode("SIGNUP")}>
              {t("new_here")} <b>{t("create")}</b>
            </span>
          )}
          {mode !== "LOGIN" && (
            <span onClick={() => setMode("LOGIN")}>
              {t("already")} <b>{t("login")}</b>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#020617",
    padding: 32,
    borderRadius: 14,
  },
  title: { textAlign: "center", fontSize: 28, color: "#e5e7eb" },
  subtitle: { textAlign: "center", marginBottom: 20, color: "#cbd5f5" },
  input: { width: "100%", padding: 14, marginBottom: 12 },
  button: { width: "100%", padding: 14, marginTop: 10 },
  footer: { marginTop: 16, textAlign: "center", color: "#cbd5f5" },
  message: { marginBottom: 12, textAlign: "center" },
};
