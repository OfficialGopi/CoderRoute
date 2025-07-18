import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <form className="w-full font-outfit-regular">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-1  font-montserrat-regular">
            CoderRoute
          </h1>
          <p className="text-muted-foreground text-balance font-outfit-regular">
            Give the email associated with your account
          </p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        <Button type="submit" className="w-full">
          Forget Passsword
        </Button>

        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ForgotPasswordPage;
