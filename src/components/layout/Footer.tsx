import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "Track Parcel", to: "/track-parcel" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const authLinks = [
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];

const supportLinks = [
  { label: "Support", to: "/contact" },
  { label: "FAQ", to: "/contact" },
  { label: "System Status", to: "/contact#status" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-gradient-to-br from-primary/10 via-background to-secondary/10 px-4 py-12 dark:from-primary/15 dark:to-secondary/20">
      <div className="container mx-auto space-y-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <Logo />
              <div className="hidden flex-col text-sm font-semibold leading-tight text-foreground/80 md:flex">
                <span className="text-foreground">Delivraze</span>
                <span className="text-[8px] uppercase tracking-[0.15em] text-muted-foreground">
                  Express Logistics
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Fast, reliable and transparent parcel delivery built for modern
              Bangladesh. We persistently improve every mile for senders and
              receivers alike.
            </p>
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground/90">
              <span className="h-0.5 w-8 rounded-full bg-primary" />
              Always on Time
            </div>
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-semibold text-foreground">Quick Links</p>
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-muted-foreground/90 transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="grid gap-3">
            <p className="text-sm font-semibold text-foreground">Support</p>
            {supportLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-sm text-muted-foreground/90 transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 space-y-1 text-sm text-muted-foreground/90">
              <p>Email: support@delivraze.com</p>
              <p>Phone: +88 0181 234 5678</p>
              <p>Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border/50 pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground/80">
            &copy; {new Date().getFullYear()} Delivraze Parcel Delivery. All
            rights reserved.
          </p>
          <div className="flex gap-4">
            {authLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-semibold text-muted-foreground/90 transition hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
