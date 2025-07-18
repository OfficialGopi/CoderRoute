import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { Outlet } from "react-router-dom";
const AuthenticationLayout = () => {
  return (
    <div className=" flex min-h-svh flex-col items-center justify-center p-6 md:p-10 relative ">
      <div className="w-full max-w-sm md:max-w-3xl ">
        <Spotlight
          className="absolute -top-40 left-0 md:-top-40 md:left-0  z-20 "
          fill={
            document.querySelector("html")?.classList.contains("dark")
              ? "white"
              : "black"
          }
        />
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0 shadow-inner">
            <CardContent className="grid p-0 md:grid-cols-2">
              <div className="p-6 md:p-8">
                <Outlet />
              </div>
              <div className="bg-muted relative hidden md:block">
                <img
                  src="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
