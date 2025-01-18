import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-9xl font-bold ">404</h1>
        <p className="text-2xl font-semibold mb-8">Page Not Found</p>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
