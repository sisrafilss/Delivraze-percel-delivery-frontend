import Logo from '@/assets/icons/Logo';
import { Link } from 'react-router';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Track Parcel', to: '/track-parcel' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const authLinks = [
  { label: 'Login', to: '/login' },
  { label: 'Register', to: '/register' },
  { label: 'Forgot Password', to: '/forgot-password' },
];

const dashboardLinks = [
  { label: 'Sender Dashboard', to: '/sender/analytics' },
  { label: 'Receiver Dashboard', to: '/receiver/analytics' },
  { label: 'Admin Dashboard', to: '/admin/analytics' },
];

export default function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3">
              <Logo />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-6">
              Delivraze makes parcel delivery simple, transparent, and reliable
              for senders and receivers across Bangladesh.
            </p>
          </div>

          <div>
            <p className="font-semibold text-foreground">Quick Links</p>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-foreground">Account</p>
            <ul className="mt-4 space-y-3 text-sm">
              {authLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-semibold text-foreground">Dashboards</p>
            <ul className="mt-4 space-y-3 text-sm">
              {dashboardLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-muted-foreground transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Delivraze Parcel Delivery. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
