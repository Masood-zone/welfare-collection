import { LoginForm } from "./login-form";

export default function Login() {
  return (
    <div className="flex w-full items-center justify-center py-4">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
