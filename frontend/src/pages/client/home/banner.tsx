import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/use-user.store";
import { Link } from "react-router-dom";

export function Banner() {
  const { user } = useUserStore();

  return (
    <div className="bg-primary-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            <span className="block">Welfare Collection</span>
            <span className="block text-primary-600">
              Supporting Our Community
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base  sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join our welfare program and make a difference in your community.
            We're here to support you through challenging times and help you
            build a brighter future.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            {user ? (
              <Button asChild size="lg">
                <Link to="#welfare">Apply for Welfare</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg">
                  <Link to="/auth/register">Register</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="mt-3 sm:mt-0 sm:ml-3"
                >
                  <Link to="/auth/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
