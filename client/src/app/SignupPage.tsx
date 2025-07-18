import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <form className="w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold mb-1  font-montserrat-regular">
            CoderRoute
          </h1>
          <p className="text-muted-foreground text-balance font-outfit-regular">
            Signup to your account
          </p>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="username">Username</Label>
          </div>
          <Input id="username" name="username" type="text" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="name">Name</Label>
          </div>
          <Input id="name" type="text" name="name" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id="password" type="passw0rd" name="password" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="confirm-password">Confirm Password</Label>
          </div>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="passw0rd"
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Signup
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

export default SignupPage;
