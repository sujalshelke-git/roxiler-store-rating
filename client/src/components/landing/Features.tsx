import {
  ShieldCheck,
  Store,
  Star,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    title: "Administrator",
    icon: ShieldCheck,
    color: "bg-blue-100 text-blue-700",
    description:
      "Manage users, stores and monitor the complete platform from a centralized dashboard.",
    points: [
      "Dashboard Analytics",
      "Manage Users",
      "Manage Stores",
      "View Ratings",
    ],
  },
  {
    title: "Normal User",
    icon: Star,
    color: "bg-amber-100 text-amber-600",
    description:
      "Discover stores, submit ratings and update your reviews whenever needed.",
    points: [
      "Browse Stores",
      "Search Stores",
      "Rate Stores",
      "Update Ratings",
    ],
  },
  {
    title: "Store Owner",
    icon: Store,
    color: "bg-green-100 text-green-700",
    description:
      "Monitor customer feedback, average ratings and improve your store performance.",
    points: [
      "Dashboard",
      "Average Rating",
      "Customer Reviews",
      "Change Password",
    ],
  },
];

const Features = () => {
  return (
    <section className="bg-white py-28">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            Platform Features
          </span>

          <h2 className="mt-6 text-5xl font-bold text-slate-900">
            Built for every user role.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            A single platform that empowers administrators,
            customers and store owners with dedicated
            dashboards and secure workflows.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-slate-300 hover:shadow-xl"
              >

                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${feature.color}`}
                >
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>

                <div className="mt-8 space-y-4">

                  {feature.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3"
                    >
                      <ArrowRight
                        size={18}
                        className="text-blue-600"
                      />

                      <span className="text-slate-700">
                        {point}
                      </span>
                    </div>
                  ))}

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default Features;