import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import { AlertTriangle } from "lucide-react";

export const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 w-screen h-screen mx-auto bg-background-secondary border border-gray-800 rounded-2xl p-10 text-center flex justify-center items-center z-[999]">
      <div>
        <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-background flex items-center justify-center border border-gray-800">
          <AlertTriangle
            className="text-status-danger"
            size={32}
          />
        </div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-text-secondary mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button
            onClick={() => navigate(-1)}
            variant="secondary">
            Go Back
          </Button>
          <Button onClick={() => navigate("/resources")}>Back to Resources</Button>
        </div>
      </div>
    </div>
  );
};
