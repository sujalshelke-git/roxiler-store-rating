import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="bg-slate-900 py-24">

      <div className="mx-auto max-w-5xl px-6 text-center">

        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-300">
          Ready to get started?
        </span>

        <h2 className="mt-8 text-5xl font-bold leading-tight text-white">
          Join the next generation
          <br />
          Store Rating Platform.
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-300">
          Whether you're an administrator managing the platform,
          a customer rating stores, or a store owner tracking
          customer feedback, RateHub gives you everything you need
          in one modern application.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">

          <Link
            to="/signup"
            className="flex items-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Create Free Account

            <ArrowRight size={18} />

          </Link>

          <Link
            to="/login"
            className="rounded-xl border border-slate-600 px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-slate-900"
          >
            Sign In
          </Link>

        </div>

      </div>

    </section>
  );
};

export default CTA;