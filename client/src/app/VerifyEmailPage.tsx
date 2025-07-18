import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const VerifyEmailPage = () => {
  return (
    <form className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-1  font-montserrat-regular">
            CoderRoute
          </h1>
          <p className="text-muted-foreground text-balance font-outfit-regular">
            Enter the email verification code
          </p>
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="verification-token">Verification Token</Label>
            <Link
              to="/forgot-password"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Resend Verificaiton Token?
            </Link>
          </div>
          <Input
            id="verification-token"
            name="verificationToken"
            type="text"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Verify email
        </Button>
      </div>
    </form>
  );
};

export default VerifyEmailPage;
