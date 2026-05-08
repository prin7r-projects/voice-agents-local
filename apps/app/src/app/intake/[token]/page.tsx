"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black";

export default function IntakePage() {
  const params = useParams();
  const token = params.token as string;
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    message: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const hours: Record<string, number[]> = {};
    ["mon", "tue", "wed", "thu", "fri", "sat", "sun"].forEach((day) => {
      const open = formData.get(`${day}_open`);
      const close = formData.get(`${day}_close`);
      if (open && close) {
        hours[day] = [parseInt(open as string), parseInt(close as string)];
      } else {
        hours[day] = [];
      }
    });

    const pricing: { service: string; priceCents: number }[] = [];
    const services = formData.getAll("service_name");
    const prices = formData.getAll("service_price");
    services.forEach((name, i) => {
      if (name && prices[i]) {
        pricing.push({
          service: name as string,
          priceCents: Math.round(parseFloat(prices[i] as string) * 100),
        });
      }
    });

    const body = {
      name: formData.get("name"),
      industry: formData.get("industry"),
      tz: formData.get("tz") ?? "America/New_York",
      hours,
      ownerEmail: formData.get("ownerEmail"),
      ownerSms: formData.get("ownerSms") || undefined,
      pricing: pricing.length > 0 ? pricing : undefined,
      urgencyTriggers: (formData.get("urgencyTriggers") as string)
        ?.split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      fallbackText: formData.get("fallbackText") || undefined,
      bookingProvider: formData.get("bookingProvider") || undefined,
    };

    try {
      const res = await fetch(`/api/intake/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        setResult({ ok: true, message: data.message });
        router.push("/");
      } else {
        setResult({ ok: false, message: data.message ?? "Submission failed." });
      }
    } catch {
      setResult({ ok: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.ok) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white p-4">
        <div className="max-w-md w-full rounded-xl border border-gray-200 bg-white p-8 shadow-sm text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">You're all set!</h1>
          <p className="text-gray-500">{result.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-xl mx-auto rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Set up your shop</h1>
        <p className="text-sm text-gray-500 mb-6">
          Tell us about your business so we can build your voice agent.
        </p>

        {result && !result.ok && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700">
            {result.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Shop name</label>
            <input name="name" required className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Industry</label>
              <select name="industry" required className={inputClass}>
                <option value="salon">Salon</option>
                <option value="plumber">Plumber</option>
                <option value="dentist">Dentist</option>
                <option value="restaurant">Restaurant</option>
                <option value="clinic">Clinic</option>
                <option value="contractor">Contractor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Timezone</label>
              <select name="tz" defaultValue="America/New_York" className={inputClass}>
                <option value="America/New_York">Eastern</option>
                <option value="America/Chicago">Central</option>
                <option value="America/Denver">Mountain</option>
                <option value="America/Los_Angeles">Pacific</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Hours</label>
            <div className="grid grid-cols-1 gap-2">
              {["mon", "tue", "wed", "thu", "fri", "sat", "sun"].map((day) => (
                <div key={day} className="flex items-center gap-3 text-sm">
                  <span className="w-10 capitalize font-medium">{day}</span>
                  <input
                    name={`${day}_open`}
                    type="number"
                    min={0}
                    max={23}
                    placeholder="Open"
                    className="w-20 rounded-md border border-gray-300 px-2 py-1"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    name={`${day}_close`}
                    type="number"
                    min={0}
                    max={23}
                    placeholder="Close"
                    className="w-20 rounded-md border border-gray-300 px-2 py-1"
                  />
                  <span className="text-xs text-gray-400">Leave empty for closed</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Owner email</label>
              <input name="ownerEmail" type="email" required className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Owner SMS</label>
              <input
                name="ownerSms"
                type="tel"
                placeholder="+1-555-0123"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Booking provider</label>
            <select name="bookingProvider" className={inputClass}>
              <option value="">— Select —</option>
              <option value="booksy">Booksy</option>
              <option value="vagaro">Vagaro</option>
              <option value="square">Square</option>
              <option value="dentrix">Dentrix</option>
              <option value="mindbody">Mindbody</option>
              <option value="toast">Toast</option>
              <option value="resy">Resy</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Urgency triggers (comma-separated)
            </label>
            <input
              name="urgencyTriggers"
              placeholder="emergency, walk-in, complaint"
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fallback text</label>
            <textarea
              name="fallbackText"
              rows={2}
              placeholder="What the agent says when it doesn't know the answer..."
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Pricing</label>
            <div className="space-y-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex gap-2">
                  <input
                    name="service_name"
                    placeholder="Service name"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                  <input
                    name="service_price"
                    type="number"
                    step="0.01"
                    min={0}
                    placeholder="Price USD"
                    className="w-28 rounded-md border border-gray-300 px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit configuration"}
          </button>
        </form>
      </div>
    </main>
  );
}
