interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: "ADMIN" | "MEMBER";
  token: string;
}

interface Enrollments {
  id: string;
  userId: string;
  welfareProgramId: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  user: Pick<User, "id" | "name" | "email">;
  welfareProgram: WelfareProgram;
}

interface WelfareProgram {
  id: string;
  name: string;
  description: string;
  amount: number;
  paymentCycle: "MONTHLY" | "DAILY" | "WEEKLY";
  createdBy?: string;
  createByUser: Pick<User, "id" | "name" | "email" | "phoneNumber" | "role">;
  status?: string;
}

interface Expenses {
  id: string;
  amount: number;
  description: string;
  recordedBy: string;
  welfareProgramId: string;
  recordedBy: string;
  welfareProgram: Pick<
    WelfareProgram,
    "id" | "name" | "description" | "amount" | "payemntCycle"
  >;
}

interface Payments {
  id: string;
  userId: string;
  welfareProgramId: string;
  amount: number;
  paymentDate: string;
  paymentMode: "CASH" | "CARD" | "MOMO";
  receiptNumber: string;
  welfareProgram: Pick<
    WelfareProgram,
    "id" | "name" | "description" | "amount" | "paymentCycle"
  >;
  user: Pick<User, "id" | "name" | "email" | "phoneNumber" | "role">;
}

interface TrackPayments {
  id: string;
  userId: string;
  welfareProgramId: string;
  cycleStart: string;
  cycleEnd: string;
  paymentStatus: "PAID" | "UNPAID";
  paymentId: string;
  welfareProgram: Pick<
    WelfareProgram,
    "id" | "name" | "description" | "amount" | "payemntCycle"
  >;
  payment: Pick<
    Payments,
    "id" | "amount" | "paymentDate" | "paymentMode" | "recieptNumber"
  >;
}

// Global Stores
// Auth Store
interface AuthState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}
// Custom Button Props
interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?:
    | "secondary"
    | "link"
    | "default"
    | "outline"
    | "destructive"
    | "ghost";
}

/*
 * User Types
 */
type RegisterUser = Omit<User, "id" | "role" | "token">;
type LoginUser = Pick<User, "email" | "password">;
type UpdateUser = Partial<Omit<User, "role">>;
type UserLists = Pick<User, "id" | "name" | "email" | "phoneNumber" | "role">;

/*
 * Enrollment Types
 */
type CreateEnrollment = Pick<Enrollments, "userId" | "welfareProgramId">;
type UpdateEnrollment = Partial<Omit<Enrollments, "user" | "welfareProgram">>;
type EnrollmentStatus = Pick<Enrollments, "status">;
type EnrollmentLists = Pick<
  Enrollments,
  "id" | "status" | "user" | "welfareProgram"
>;

/*
 * Payment Types
 */
type CreatePayment = Omit<
  Payments,
  "id" | "user" | "welfareProgram" | "paymentDate" | "receiptNumber"
>;
type UpdatePayment = Partial<Omit<Payments, "user" | "welfareProgram">>;
type PaymentLists = Pick<
  Payments,
  | "id"
  | "amount"
  | "paymentDate"
  | "paymentMode"
  | "recieptNumber"
  | "user"
  | "welfareProgram"
>;

interface PaymentTrack {
  id: string;
  cycleStart: string;
  cycleEnd: string;
  paymentStatus: string;
  welfareProgram: {
    name: string;
    amount: string;
  };
  payment?: {
    amount: string;
    paymentDate: string;
  };
}

/*
 * Welfare Program Types
 */
type CreateWelfareProgram = Omit<WelfareProgram, "createdByUser", "id">;
type UpdateWelfareProgram = Partial<
  Omit<WelfareProgram, "createdByUser", "id">
>;
type WelfareProgramLists = Pick<
  WelfareProgram,
  "id" | "name" | "description" | "amount" | "paymentCycle" | "createdByUser"
>;

/*
 * Expenses Types
 */
type CreateExpense = Omit<Expenses, "id" | "welfareProgram">;
type UpdateExpense = Partial<Omit<Expenses, "recordedBy" | "welfareProgram">>;
type ExpenseLists = Pick<
  Expenses,
  "id" | "amount" | "description" | "recordedBy" | "welfareProgram"
>;

/*
 * Track Payment Types
 */
type CreateTrackPayment = Omit<
  TrackPayments,
  "id" | "welfareProgram" | "payment"
>;
type UpdateTrackPayment = Partial<
  Omit<TrackPayments, "welfareProgram" | "payment">
>;
type TrackPaymentLists = Pick<
  TrackPayments,
  | "id"
  | "cycleStart"
  | "cycleEnd"
  | "paymentStatus"
  | "welfareProgram"
  | "payment"
>;

// Errors type
interface ErrorResponse {
  status: number;
  message: string;
}

// Admin header props
interface HeaderProps {
  title: string;
  description: string;
  className?: string;
  buttons: ButtonInfo[];
}
