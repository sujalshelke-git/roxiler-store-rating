import { Link } from "react-router-dom";
import {
  
  Globe,
  Mail,
  Star,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">

        {/* Logo */}

        <div>

          <div className="flex items-center gap-2">

            <Star
              className="fill-amber-400 text-amber-400"
              size={22}
            />

            <h2 className="text-2xl font-bold text-slate-900">
              RateHub
            </h2>

          </div>

          <p className="mt-3 text-slate-500">
            Modern Store Rating Platform
          </p>

        </div>

        {/* Navigation */}

        <div className="flex gap-8 text-slate-600">

          <Link
            to="/"
            className="hover:text-slate-900"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="hover:text-slate-900"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="hover:text-slate-900"
          >
            Signup
          </Link>

        </div>

        {/* Social */}

        <div className="flex gap-5">

          <a
            href="https://github.com/sujalshelke-git"
            target="_blank"
            rel="noreferrer"
            className="transition hover:scale-110"
          >
            <Globe />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="transition hover:scale-110"
          >
            <Globe />
          </a>

          <a
            href="mailto:sujal@gmail.com"
            className="transition hover:scale-110"
          >
            <Mail />
          </a>

        </div>

      </div>

      <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-500">
        © 2026 RateHub. Built by Sujal Shelke.
      </div>

    </footer>
  );
};

export default Footer;