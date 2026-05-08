import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Rollcall — A real voice that picks up while you're cutting hair, fixing a sink, or seeing a patient",
  description:
    "Rollcall runs the front-of-house phone for dentists, plumbers, salons, restaurants, clinics, and contractors. We pick up. We book. We answer. You stay focused on the customer in front of you.",
  metadataBase: new URL("https://voice-agents-local.prin7r.com"),
  openGraph: {
    title: "Rollcall — Your voice while you're cutting hair",
    description:
      "We pick up the phone for dentists, plumbers, salons, restaurants, clinics, and contractors. Booked appointments, after-hours coverage, never a missed call. Per-minute pricing, monthly base. Honest pricing. No tricks.",
    type: "website",
    url: "https://voice-agents-local.prin7r.com",
    siteName: "Rollcall",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rollcall — Your voice while you're cutting hair",
    description:
      "We pick up the phone for local businesses. No missed calls. Honest pricing.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
