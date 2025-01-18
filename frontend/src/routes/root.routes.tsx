import AuthLayout from "@/pages/auth/auth.layout";
import ClientLayout from "@/pages/client/client.layout";
import RootLayout from "@/pages/root.layout";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const rootRoutes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />}>
        {/* Client Routes */}
        <Route path="/" element={<ClientLayout />}>
          {/* Base routes */}
          <Route
            index
            lazy={async () => {
              const { default: Home } = await import(
                "@/pages/client/home/home"
              );
              return { Component: Home };
            }}
          />
          <Route
            path="about"
            lazy={async () => {
              const { default: AboutUs } = await import(
                "@/pages/client/about/about"
              );
              return { Component: AboutUs };
            }}
          />
          <Route
            path="contact"
            lazy={async () => {
              const { default: ContactUs } = await import(
                "@/pages/client/contact/contact"
              );
              return { Component: ContactUs };
            }}
          />
          {/* Apply for welfare */}
          <Route
            path="apply/:id"
            lazy={async () => {
              const { default: ApplyWelfare } = await import(
                "@/pages/client/apply/welfare"
              );
              return { Component: ApplyWelfare };
            }}
          />
        </Route>
        {/* Auth Routes */}
        <Route path="auth" element={<AuthLayout />}>
          <Route
            path="login"
            lazy={async () => {
              const { default: Login } = await import(
                "@/pages/auth/login/login"
              );
              return { Component: Login };
            }}
          />
          <Route
            path="register"
            lazy={async () => {
              const { default: Register } = await import(
                "@/pages/auth/register/register"
              );
              return { Component: Register };
            }}
          />
          <Route
            path="forgot-password"
            lazy={async () => {
              const { default: ForgotPassword } = await import(
                "@/pages/auth/forgot-password/forgot-password"
              );
              return { Component: ForgotPassword };
            }}
          />
          <Route
            path="verify-otp"
            lazy={async () => {
              const { default: VerifyOTP } = await import(
                "@/pages/auth/forgot-password/verify-otp/verify-otp"
              );
              return { Component: VerifyOTP };
            }}
          />
          <Route
            path="reset-password"
            lazy={async () => {
              const { default: ResetPassword } = await import(
                "@/pages/auth/forgot-password/reset-password/reset-password"
              );
              return { Component: ResetPassword };
            }}
          />
        </Route>
        {/* Admin Routes */}
      </Route>
    </>
  )
);

export default rootRoutes;
