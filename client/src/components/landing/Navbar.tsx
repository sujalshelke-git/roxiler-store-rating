import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <Star
            className="fill-amber-400 text-amber-400"
            size={22}
          />

          <span className="text-2xl font-bold text-slate-900">
            RateHub
          </span>
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-4">

          <Link
            to="/login"
            className="rounded-lg px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-slate-900 px-6 py-2 font-medium text-white transition hover:bg-slate-800"
          >
            Get Started
          </Link>

        </div>

      </div>
    </header>
  );
};

export default Navbar;