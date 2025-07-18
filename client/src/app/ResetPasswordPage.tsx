import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const ResetPasswordPage = () => {
  return (
    <form className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-1  font-montserrat-regular">
            CoderRoute
          </h1>
          <p className="text-muted-foreground text-balance font-outfit-regular">
            Create new password for your account
          </p>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Enter new password</Label>
          </div>
          <Input
            id="new-password"
            type="passw0rd"
            name="newPassword"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm new password</Label>
          </div>
          <Input
            id="confirm-new-password"
            name="confirmNewPassword"
            type="passw0rd"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ResetPasswordPage;
