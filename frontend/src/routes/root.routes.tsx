import AuthLayout from "@/pages/auth/auth.layout";
import ClientLayout from "@/pages/client/client.layout";
import NotFound from "@/pages/not-found";
import RootLayout from "@/pages/root.layout";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { AdminProtectedRoute, UserAccountProtected } from "./protected.routes";

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
          {/* Settings */}
          <Route element={<UserAccountProtected />}>
            <Route
              path="settings"
              lazy={async () => {
                const { default: SettingsLayout } = await import(
                  "@/pages/client/settings"
                );
                return { Component: SettingsLayout };
              }}
            >
              {/* Settings */}
              <Route
                index
                lazy={async () => {
                  const { default: Settings } = await import(
                    "@/pages/client/settings/settings"
                  );
                  return { Component: Settings };
                }}
              />
              {/* Account */}
              <Route
                path="account"
                lazy={async () => {
                  const { default: Account } = await import(
                    "@/pages/client/settings/account/account"
                  );
                  return { Component: Account };
                }}
              />
              {/* Payments */}
              <Route
                path="payments"
                lazy={async () => {
                  const { default: PaymentsLayout } = await import(
                    "@/pages/client/settings/payments/index"
                  );
                  return { Component: PaymentsLayout };
                }}
              >
                {" "}
                <Route
                  index
                  lazy={async () => {
                    const { default: Payments } = await import(
                      "@/pages/client/settings/payments/payments"
                    );
                    return { Component: Payments };
                  }}
                />
                {/* Make payment */}
                <Route
                  path="make-payment"
                  lazy={async () => {
                    const { default: MakePayment } = await import(
                      "@/pages/client/settings/payments/forms/make-payment"
                    );
                    return { Component: MakePayment };
                  }}
                />
              </Route>
              {/* Track payments */}
              <Route
                path="track-payments"
                lazy={async () => {
                  const { default: PaymentsTrackerLayout } = await import(
                    "@/pages/client/settings/track-payments/index"
                  );
                  return { Component: PaymentsTrackerLayout };
                }}
              >
                <Route
                  index
                  lazy={async () => {
                    const { default: ViewPayments } = await import(
                      "@/pages/client/settings/track-payments/view-payments"
                    );
                    return { Component: ViewPayments };
                  }}
                />
                {/* Track a payment */}
                <Route
                  path=":id"
                  lazy={async () => {
                    const { default: TrackPayment } = await import(
                      "@/pages/client/settings/track-payments/track-payment"
                    );
                    return { Component: TrackPayment };
                  }}
                />
              </Route>
              {/* Welfares */}
              <Route
                path="welfares"
                lazy={async () => {
                  const { default: Welfares } = await import(
                    "@/pages/client/settings/welfares/welfares"
                  );
                  return { Component: Welfares };
                }}
              />
              {/* Resubmit enrollment */}
              <Route
                path="resubmit/:id/:enrollmentId"
                lazy={async () => {
                  const { default: ResubmitEnrollment } = await import(
                    "@/pages/client/re-submit/re-submit"
                  );
                  return { Component: ResubmitEnrollment };
                }}
              />
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
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
          {/* Not Found */}
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Admin Routes */}
        <Route element={<AdminProtectedRoute />}>
          <Route
            path="admin"
            lazy={async () => {
              const { default: AdminLayout } = await import(
                "@/pages/admin/pages/layout"
              );
              return { Component: AdminLayout };
            }}
          >
            {/* Dashboard */}
            <Route
              index
              lazy={async () => {
                const { default: Dashboard } = await import(
                  "@/pages/admin/pages/dashboard/dashboard"
                );
                return { Component: Dashboard };
              }}
            />
            {/* Members */}
            <Route
              path="members"
              lazy={async () => {
                const { default: MembersLayout } = await import(
                  "@/pages/admin/pages/members"
                );
                return { Component: MembersLayout };
              }}
            >
              <Route
                index
                lazy={async () => {
                  const { default: Members } = await import(
                    "@/pages/admin/pages/members/members"
                  );
                  return { Component: Members };
                }}
              />
              <Route
                path="add"
                lazy={async () => {
                  const { default: AddMembers } = await import(
                    "@/pages/admin/pages/members/add/add-members"
                  );
                  return { Component: AddMembers };
                }}
              />
              <Route
                path="edit/:id"
                lazy={async () => {
                  const { default: EditMember } = await import(
                    "@/pages/admin/pages/members/edit/edit-member"
                  );
                  return { Component: EditMember };
                }}
              />
            </Route>
            {/* Enrollment */}
            <Route
              path="enrollment"
              lazy={async () => {
                const { default: EnrollmentLayout } = await import(
                  "@/pages/admin/pages/enrollments"
                );
                return { Component: EnrollmentLayout };
              }}
            >
              <Route
                index
                lazy={async () => {
                  const { default: Enrollments } = await import(
                    "@/pages/admin/pages/enrollments/enrollments"
                  );
                  return { Component: Enrollments };
                }}
              />
              <Route
                path="add"
                lazy={async () => {
                  const { default: AddEnrollment } = await import(
                    "@/pages/admin/pages/enrollments/add/add-enrollment"
                  );
                  return { Component: AddEnrollment };
                }}
              />
              <Route
                path="edit/:id"
                lazy={async () => {
                  const { default: EditEnrollment } = await import(
                    "@/pages/admin/pages/enrollments/edit/edit-enrollment"
                  );
                  return { Component: EditEnrollment };
                }}
              />
            </Route>
            {/* Welfares */}
            <Route
              path="welfares"
              lazy={async () => {
                const { default: AdminWelfaresLayout } = await import(
                  "@/pages/admin/pages/welfares"
                );
                return { Component: AdminWelfaresLayout };
              }}
            >
              <Route
                index
                lazy={async () => {
                  const { default: AdminWelfares } = await import(
                    "@/pages/admin/pages/welfares/welfares"
                  );
                  return { Component: AdminWelfares };
                }}
              />
              <Route
                path="add"
                lazy={async () => {
                  const { default: AddWelfare } = await import(
                    "@/pages/admin/pages/welfares/add/add-welfare"
                  );
                  return { Component: AddWelfare };
                }}
              />
              <Route
                path="edit/:id"
                lazy={async () => {
                  const { default: EditWelfare } = await import(
                    "@/pages/admin/pages/welfares/edit/edit-welfare"
                  );
                  return { Component: EditWelfare };
                }}
              />
            </Route>
            {/* Expenses */}
            <Route
              path="expenses"
              lazy={async () => {
                const { default: ExpensesLayout } = await import(
                  "@/pages/admin/pages/expenses"
                );
                return { Component: ExpensesLayout };
              }}
            >
              <Route
                index
                lazy={async () => {
                  const { default: Expenses } = await import(
                    "@/pages/admin/pages/expenses/expenses"
                  );
                  return { Component: Expenses };
                }}
              />
              <Route
                path="add"
                lazy={async () => {
                  const { default: AddExpense } = await import(
                    "@/pages/admin/pages/expenses/add/add-expense"
                  );
                  return { Component: AddExpense };
                }}
              />
              <Route
                path="edit/:id"
                lazy={async () => {
                  const { default: EditExpense } = await import(
                    "@/pages/admin/pages/expenses/edit/edit-expense"
                  );
                  return { Component: EditExpense };
                }}
              />
            </Route>
            {/* Settings */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default rootRoutes;
