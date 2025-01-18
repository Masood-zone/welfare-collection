import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { useTrackPaymentDetails } from "../../services/payments/queries";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function TrackPayment() {
  const { id } = useParams<{ id: string }>();
  const { data: paymentTrack, isLoading } = useTrackPaymentDetails(id ?? "");
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (paymentTrack) {
      const timer = setInterval(() => {
        const now = new Date();
        const end = new Date(paymentTrack.cycleEnd);
        const distance = end.getTime() - now.getTime();

        if (distance < 0) {
          clearInterval(timer);
          setCountdown("Cycle Ended");
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          setCountdown(`${days}d ${hours}h ${minutes}m`);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentTrack]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!paymentTrack) {
    return <div>Payment track not found</div>;
  }

  const events = [
    {
      title:
        paymentTrack.paymentStatus === "PAID" ? "Payment Made" : "Payment Due",
      start: new Date(paymentTrack.cycleStart),
      end: new Date(paymentTrack.cycleEnd),
      allDay: true,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <h1>{paymentTrack.welfareProgram.name}</h1>
            <Link to="/settings/track-payments">
              <span className="text-sm text-primary hover:underline">
                Go Back
              </span>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Amount: Ghc{paymentTrack.welfareProgram.amount}</p>
          <p>Status: {paymentTrack.paymentStatus}</p>
          <p>Countdown: {countdown}</p>
        </CardContent>
      </Card>
      <div className="h-[600px]">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
        />
      </div>
    </div>
  );
}
