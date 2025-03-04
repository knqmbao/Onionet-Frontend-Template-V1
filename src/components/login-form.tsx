import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { NavLink, Outlet, useLocation } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6   p-4", className)} {...props}>
      <Card className="overflow-hidden ">
        {/* container */}
        <CardContent className="grid p-0 md:grid-cols-2 " >
          {/* left */}
          <form className="p-6 md:p-8">

            <div className="flex flex-col gap-6  p-4">
              <div className="flex flex-col items-center text-center  p-2">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Onionet account
                </p>
              </div>
              <div className="grid gap-2 p-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2 p-2">
                <div className="flex items-center p-2">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
              <NavLink
                to="/navbar"
              >
                <Button type="submit" className="w-full">
                  Login
                </Button>

              </NavLink>


              <div className="text-center text-smp-2">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          {/* right */}
          <div className="relative hidden bg-muted md:block ">
            <img
              src="/onionet_real.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground  [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>

  )
}
