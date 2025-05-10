import * as z from "zod"

// Base schema for password to avoid repetition
const basePasswordSchema = z.string().min(1, {
  message: "Password can't be empty"
});

export const smeLoginSchema = z.object({
  email: z.string()
    .min(1, { message: "Email is required" })
    .max(100, { message: "Email too long" })
    .email({ message: "Please enter a valid email address" }),
  password: basePasswordSchema
});

export type SMELoginFormData = z.infer<typeof smeLoginSchema>;

export const StudentSchema = z.object({
  firstName: z.string().min(2, {
    message: "name too short"
  }).max(30, {
    message: "name too long"
  }),
  lastName: z.string().min(2, {
    message: "name too short"
  }).max(30, {
    message: "name too long"
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
  school: z.string().min(1, {
    message: "School is required!"
  }),
  grade: z.string().min(1, {
    message: "Grade is required!"
  }),
  email: z.string().email(),
  password: z.
    string()
    .min(8, {
      message: "Password must be atleast 8 characters long"
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
  confirm_password: z.
    string()
    .min(8, {
      message: "Password must be atleast 8 characters long"
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirm_password']
    });
  }
});

// forgot-password
export const forgotPasswordSchema = z.object({
  email: z.string().email(),
})

export const resetPasswordSchema = z.object({
  password: z.
    string()
    .min(8, {
      message: "Password must be atleast 8 characters long"
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
  confirm_password: z.
    string()
    .min(8, {
      message: "Password must be atleast 8 characters long"
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirm_password']
    });
  }
})

// Step 1 Schema
export const signupStep1Schema = z.object({
  commencementDate: z.date({
    required_error: "Commencement date is required.",
  }),
  industry: z.string().min(1, {
    message: "Industry selection is required"
  })
});

// Step 2 Schema
export const signupStep2Schema = z.object({
  contactPhone: z.string().min(1, {
    message: "Phone number is required"
  }).regex(/^\d+$/, {
    message: "Please enter a valid phone number"
  }),
  businessName: z.string().min(1, {
    message: "Business name is required"
  }),
  businessEmail: z.string()
    .min(1, { message: "Business email is required" })
    .email({ message: "Please enter a valid email address" })
});

// Representative Info (New Step 3)
export const signupStep3Schema = z.object({
  representativeName: z.string()
    .min(2, { message: "Name is required and must be at least 2 characters" })
    .max(100, { message: "Name is too long" }),
  position: z.string()
    .min(2, { message: "Position is required" }),
  representativeEmail: z.string()
    .email({ message: "Please enter a valid email address" })
    .optional()
    .or(z.literal("")),  // Allow empty string
  representativePhone: z.string()
    .regex(/^\d+$/, { message: "Please enter a valid phone number" })
    .optional()
    .or(z.literal(""))  // Allow empty string
});

// Account Security (Now Step 4)
export const signupStep4Schema = z.object({
  password: z.string()
    .min(8, {
      message: "Password must be at least 8 characters long"
    })
    .max(100)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
  confirm_password: z.string()
    .min(8, {
      message: "Password must be at least 8 characters long"
    })
    .max(100),
  acceptTerms: z.boolean()
    .refine((val) => val === true, {
      message: "You must accept the terms and conditions"
    })
}).superRefine(({ confirm_password, password }, ctx) => {
  if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirm_password']
    });
  }
});

// Combined schema for the entire signup process
export const smeSignupSchema = signupStep1Schema.merge(signupStep2Schema).merge(signupStep3Schema);

// Type inference
export type SMESignupStep1 = z.infer<typeof signupStep1Schema>;
export type SMESignupStep2 = z.infer<typeof signupStep2Schema>;
export type SMESignupStep3 = z.infer<typeof signupStep3Schema>;
export type SMESignupStep4 = z.infer<typeof signupStep4Schema>;
export type SMESignupFormData = z.infer<typeof smeSignupSchema>;
