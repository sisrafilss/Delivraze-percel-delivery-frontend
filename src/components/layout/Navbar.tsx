import { useMemo } from "react";
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { role as RoleEnum } from "@/constants/role";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { Link } from "react-router";
import ModeToggler from "./ModeToggler";

const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/track-parcel", label: "Track a Parcel", role: "PUBLIC" },
  { href: "/about", label: "About", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/sender", label: "Dashboard", role: RoleEnum.sender },
  { href: "/receiver", label: "Dashboard", role: RoleEnum.receiver },
  { href: "/admin", label: "Dashboard", role: RoleEnum.admin },
  { href: "/admin", label: "Dashboard", role: RoleEnum.superAdmin },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const res = await logout(undefined).unwrap();
    console.log(res);
    dispatch(authApi.util.resetApiState());
  };

  const availableLinks = useMemo(() => {
    const roleBased = navigationLinks.filter(
      (link) => link.role === "PUBLIC" || link.role === data?.data?.role,
    );
    return roleBased.reduce<typeof navigationLinks>(
      (unique, link) =>
        unique.some((item) => item.href === link.href)
          ? unique
          : [...unique, link],
      [],
    );
  }, [data?.data?.role]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-xl shadow-sm dark:bg-slate-900/80 transition duration-300">
      <div className="container mx-auto flex h-20 w-full items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3">
            <Logo />
            <div className="hidden flex-col text-sm font-semibold leading-tight text-foreground/80 md:flex">
              <span className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
                Express Logistics
              </span>
              <span className="text-foreground">Delivraze</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground md:flex">
            {availableLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-200 hover:text-foreground hover:bg-muted/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/track-parcel"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition hover:shadow-lg hover:translate-y-0.5 md:inline-flex"
          >
            Track Parcel
          </Link>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden border border-border/70 bg-muted/50"
              >
                <span className="sr-only">Open navigation</span>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-48 rounded-3xl border border-border bg-card/90 p-3 shadow-2xl backdrop-blur-xl"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-2">
                  {availableLinks.map((link) => (
                  <NavigationMenuItem
                    key={`${link.href}-mobile`}
                    className="w-full"
                  >
                    <NavigationMenuLink
                      asChild
                      className="rounded-2xl px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-muted/70"
                    >
                      <Link to={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </PopoverContent>
          </Popover>

          <ModeToggler />

          {data?.data?.email ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="hidden rounded-full border-primary/40 px-4 py-2 text-sm font-semibold hover:border-primary/70 hover:bg-primary/5 md:inline-flex"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="rounded-full px-4 py-2 text-sm font-semibold md:inline-flex">
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
