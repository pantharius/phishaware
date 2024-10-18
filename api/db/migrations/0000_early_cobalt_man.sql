CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"email_code" varchar(6),
	"email_verified_at" timestamp,
	"firstname" varchar(255),
	"lastname" varchar(255),
	"phone" varchar(20),
	"phone_code" varchar(6),
	"address" varchar(255),
	"credit_card_number" varchar(16),
	"credit_card_expiry" varchar(5),
	"credit_card_cvv" varchar(3),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
