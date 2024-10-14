"use client";
import { FC, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DynamicForm } from "@/components/dynamic-form";
import { z, ZodSchema } from "zod";
import { SubmitHandler } from "react-hook-form";

type Step = {
  name: string;
  title: string;
  description: string;
  schema: ZodSchema<any>;
  labels: Record<string, string>;
};

const steps: Step[] = [
  {
    name: "email",
    title: "Commencez votre formation",
    description:
      "Entrez votre adresse email pour débuter votre formation contre le phishing",
    schema: z.object({
      email: z.string().email({ message: "Adresse e-mail invalide" }),
    }),
    labels: {
      email: "Adresse e-mail",
    },
  },
  {
    name: "nom",
    title: "Complétez votre profil",
    description: "Entrez votre nom pour personnaliser votre expérience",
    schema: z.object({
      firstName: z
        .string()
        .min(2, { message: "Votre prénom contient au moins 2 caractères" }),
      lastName: z
        .string()
        .min(2, { message: "Votre nom contient au moins 2 caractères" }),
    }),
    labels: {
      firstName: "Prénom",
      lastName: "Nom de famille",
    },
  },
  {
    name: "phone",
    title: "Vérification du téléphone",
    description:
      "Entrez votre numéro de téléphone pour recevoir un code de vérification",
    schema: z.object({
      phone: z
        .string()
        .regex(
          new RegExp(
            /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
          ),
          "Numero de téléphone invalide !"
        ),
    }),
    labels: {
      phone: "Numéro de téléphone",
    },
  },
  {
    name: "card",
    title: "Confirmation de l'inscription",
    description:
      "Pour finaliser votre inscription, veuillez vérifier vos informations de paiement.\nAucun montant ne sera débité à ce stade, cette étape nous permet simplement de valider vos coordonnées pour des raisons de sécurité et de prévenir toute activité frauduleuse.",
    schema: z.object({
      cardNumber: z.string(),
      expiry: z.string(),
      cvv: z.string(),
    }),
    labels: {
      cardNumber: "Numéro de carte",
      expiry: "Date d'expiration",
      cvv: "CVV",
    },
  },
];

//type IFormInput = z.infer<typeof formSchema>;

const InscriptionForm: FC = () => {
  const [error, setError] = useState("");
  const params = useParams<{ step: string }>();
  const stepname: string = params?.step || "email";
  const router = useRouter();

  const onSubmit: SubmitHandler<{
    name: string;
    age: number;
    email: string;
  }> = (data) => {
    console.log("Données soumises : ", data);
  };

  const step = steps.find((x) => x.name == stepname);
  if (!step) return null;

  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">{step.title}</CardTitle>
        <CardDescription className="text-gray-400">
          {step.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DynamicForm
          schema={step.schema}
          labels={step.labels}
          onSubmit={onSubmit}
          formId="dynamic-form"
        />
      </CardContent>
      <CardFooter>
        <Button form="step-form" className="w-full">
          Continuer
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InscriptionForm;
