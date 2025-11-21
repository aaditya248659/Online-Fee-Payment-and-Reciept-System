import React, { createContext, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

/* Pages / Components (keeps your existing imports the same) */
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import AdminDashboard from "./Pages/AdminDashboard";
import PaymentPage from "./Pages/PaymentPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import AboutPage from "./Pages/AboutPage";
import FeaturesPage from "./Pages/FeaturesPage";

/*
  ApiContext: expose apiBase and axios instance to any component that wants it
  (optional — your components keep working unchanged, this is for new usage)
*/
export const ApiContext = createContext({
  apiBase: "",
  axiosInstance: axios,
});

/*
  Helper: normalize the value in REACT_APP_API_URL
  precedence:
    1) process.env.REACT_APP_API_URL
    2) if running on localhost (dev) default to http://localhost:5000
    3) else attempt to guess the deployed backend using window location base (fallback)
*/
const resolveApiBase = () => {
  // 1. env variable (set this in frontend env)
  const envUrl = process.env.REACT_APP_API_URL;
  if (envUrl && envUrl.trim() !== "") return envUrl.replace(/\/$/, ""); // strip trailing slash

  // 2. if localhost dev
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return "http://localhost:5000"; // change if your local backend runs on a different port
  }

  // 3. guess: use same host but different path (NOT ideal, fallback only)
  // Example: if frontend served from Vercel, backend might be on Render; still fallback
  return `${window.location.protocol}//${window.location.host}`;
};

/*
  Global fetch rewrite:
  - Intercepts window.fetch so old code doing fetch('/api/whatever') or fetch('http://localhost:5000/api/...') 
    will get redirected to apiBase + path automatically.
  - This is a non-invasive global shim that doesn't require changes to pages.
*/
const installFetchRewrite = (apiBase) => {
  if (!window || !window.fetch) return;

  // Avoid installing multiple times
  if (window.__API_REWRITE_INSTALLED__) return;
  window.__API_REWRITE_INSTALLED__ = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    try {
      let url = typeof input === "string" ? input : input?.url ?? "";
      let requestObj = input;

      // If input is a Request object, clone to read url
      if (typeof input !== "string" && input && input.url) {
        url = input.url;
      }

      // If url is relative (starts with /), prepend apiBase only if it looks like an API call
      // We consider '/api' routes to be backend calls; also rewrite any explicit localhost backends.
      const looksLikeApi =
        url.startsWith("/api") ||
        url.includes("localhost:") ||
        url.includes("127.0.0.1:");

      if (looksLikeApi) {
        // if relative path, combine
        if (url.startsWith("/")) {
          url = apiBase + url;
        } else {
          // if absolute but localhost, rewrite host & port
          const parsed = new URL(url, window.location.origin);
          // if host is localhost or 127.0.0.1 rewrite to apiBase host
          if (
            parsed.hostname === "localhost" ||
            parsed.hostname === "127.0.0.1"
          ) {
            const apiParsed = new URL(apiBase);
            parsed.hostname = apiParsed.hostname;
            parsed.port = apiParsed.port;
            parsed.protocol = apiParsed.protocol;
            url = parsed.toString();
          }
        }

        // rebuild Request when input was a Request object
        if (typeof input !== "string" && input instanceof Request) {
          requestObj = new Request(url, {
            method: input.method,
            headers: input.headers,
            body: input._bodyInit || input.body,
            mode: input.mode,
            credentials: input.credentials,
            cache: input.cache,
            redirect: input.redirect,
            referrer: input.referrer,
            integrity: input.integrity,
            keepalive: input.keepalive,
            signal: input.signal,
          });
        }
      }

      // call original fetch with rewritten url or original request object
      return await originalFetch(requestObj instanceof Request ? requestObj : url, init);
    } catch (err) {
      // If something fails, fallback to original fetch behavior
      return originalFetch(input, init);
    }
  };
};

/*
  App component
*/
const App = () => {
  const apiBase = useMemo(() => resolveApiBase(), []);
  // Create axios instance with correct base url
  const axiosInstance = useMemo(() => {
    const inst = axios.create({
      baseURL: apiBase, // axios requests like axios.get('/api/users') will go to apiBase + /api/users
      // optional: set timeout, headers etc
      timeout: 20000,
    });
    return inst;
  }, [apiBase]);

  // install fetch rewrite once
  React.useEffect(() => {
    installFetchRewrite(apiBase);
    // also set global axios default just in case some code uses axios global import
    axios.defaults.baseURL = apiBase;
  }, [apiBase, axiosInstance]);

  return (
    <ApiContext.Provider value={{ apiBase, axiosInstance }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </ApiContext.Provider>
  );
};

export default App;
