import { z } from "zod";

export const intakeSchema = z.object({
  name: z.string().min(1),
  industry: z.enum([
    "salon",
    "plumber",
    "dentist",
    "restaurant",
    "clinic",
    "contractor",
    "other",
  ]),
  tz: z.string().default("America/New_York"),
  hours: z.record(z.tuple([z.number(), z.number()])),
  ownerEmail: z.string().email(),
  ownerSms: z.string().optional(),
  bookingProvider: z
    .enum(["booksy", "vagaro", "square", "dentrix", "mindbody", "toast", "resy", "other"])
    .optional(),
  pricing: z.array(z.object({ service: z.string(), priceCents: z.number() })).optional(),
  urgencyTriggers: z.array(z.string()).optional(),
  fallbackText: z.string().optional(),
});
