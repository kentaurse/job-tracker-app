/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@contexts/ThemeContext";
import { AuthProvider } from "@contexts/AuthContext";
import MainLayout from "@layouts/MainLayout";
import Loading from "@components/common/Loading";
import ProtectedRoute from "@/router/ProtectedRoute";
import { routes } from "@config/routes";
import "@ant-design/v5-patch-for-react-19";
import { I18nextProvider } from 'react-i18next';
import i18n from '@i18n/i18n';

// Import components
const Landing = lazy(() => import("@pages/landing/Landing"));
const Login = lazy(() => import("@pages/auth/Login"));
const Register = lazy(() => import("@pages/auth/Register"));
const Dashboard = lazy(() => import("@pages/dashboard/Dashboard"));
const ErrorPage = lazy(() => import("@components/common/ErrorPage"));
const OAuthCallback = lazy(() => import("@pages/auth/OAuthCallback"));
const EmailVerification = lazy(() => import("@pages/auth/EmailVerification"));

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Suspense fallback={<Loading />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route path="/login/success" element={<OAuthCallback />} />

                {/* Protected dashboard route */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <MainLayout>
                        <Dashboard />
                      </MainLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Other protected routes */}
                {routes.map(({ path, component: Component }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      <ProtectedRoute>
                        <MainLayout>
                          <Component />
                        </MainLayout>
                      </ProtectedRoute>
                    }
                  />
                ))}

                {/* Error route */}
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </I18nextProvider>
  );
};

export default App;
