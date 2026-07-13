import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto flex min-h-[85vh] max-w-7xl items-center px-6">

        {/* Left Content */}

        <div className="max-w-3xl">

          {/* Badge */}

          <div className="relative top-4 mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">

            <Star
              size={14}
              className="fill-amber-400 text-amber-400"
            />

            <span className="text-sm font-medium text-slate-600">
              Store ratings, done right
            </span>

          </div>

          {/* Heading */}

          <h1 className="text-6xl font-extrabold leading-tight tracking-tight text-slate-900">

            The rating platform

            <br />

            <span className="text-slate-500">
              built for every role.
            </span>

          </h1>

          {/* Description */}

          <p className="mt-8 max-w-2xl text-xl leading-9 text-slate-600">

            Admins govern the platform.

            Shoppers rate the stores they love.

            Store owners monitor customer feedback —

            all from one secure application.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex items-center gap-4">

            <Link
              to="/signup"
              className="flex items-center gap-2 rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white transition hover:bg-slate-800"
            >
              Create Account

              <ArrowRight size={18} />

            </Link>

            <Link
              to="/login"
              className="rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              Sign In
            </Link>

          </div>

          {/* Stats */}

          <div className="mt-16 flex gap-14">

            <div>

              <h2 className="text-4xl font-bold text-slate-900">
                3
              </h2>

              <p className="mt-2 text-slate-500">
                User Roles
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-slate-900">
                100%
              </h2>

              <p className="mt-2 text-slate-500">
                Secure Authentication
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-bold text-slate-900">
                ★ 5
              </h2>

              <p className="mt-2 text-slate-500">
                Rating System
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;