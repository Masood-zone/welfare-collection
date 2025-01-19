import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UserNotFound = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <h1 className="text-4xl font-semibold mb-4">{title}</h1>
        <p className="text-2xl font-semibold mb-8">{description}</p>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserNotFound;
