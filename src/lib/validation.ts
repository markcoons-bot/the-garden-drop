import { z } from 'zod';

/** Shared, honest validation. Error messages are written, not generated. */

export const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'We need an email address to send the issue to.')
    .email('That does not look like an email address — check for a typo.'),
  zone: z.string().trim().max(12).optional().or(z.literal('')),
  source: z.string().trim().max(64).default('site'),
  // Honeypot: real people leave this empty.
  company_website: z.string().max(0).optional(),
});

export const submissionSchema = z.object({
  submitterName: z.string().trim().min(2, 'Please tell us who you are.').max(120),
  email: z.string().trim().email('We need a working email to follow up.'),
  company: z.string().trim().max(160).optional().or(z.literal('')),
  subjectKind: z.enum(['plant', 'technique', 'other']),
  subjectName: z
    .string()
    .trim()
    .min(2, 'What is it called?')
    .max(200),
  description: z
    .string()
    .trim()
    .min(40, 'Give us at least a couple of sentences — what is genuinely new about it?')
    .max(4000),
  releaseDate: z.string().trim().max(60).optional().or(z.literal('')),
  links: z.string().trim().max(2000).optional().or(z.literal('')),
  imageUrl: z.string().trim().url('That image link is not a valid URL.').optional().or(z.literal('')),
  retailAvailability: z.string().trim().max(400).optional().or(z.literal('')),
  company_website: z.string().max(0).optional(),
});

export const partnerSchema = z.object({
  name: z.string().trim().min(2, 'Please tell us who you are.').max(120),
  email: z.string().trim().email('We need a working email to reply to.'),
  company: z.string().trim().min(2, 'Which company or programme?').max(160),
  interest: z.enum(['sponsorship', 'sampling', 'trials', 'other']),
  message: z
    .string()
    .trim()
    .min(20, 'A sentence or two about what you have in mind.')
    .max(3000),
  company_website: z.string().max(0).optional(),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;
export type PartnerInput = z.infer<typeof partnerSchema>;

/** Flatten a ZodError into { field: message } for the forms. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? '_');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
