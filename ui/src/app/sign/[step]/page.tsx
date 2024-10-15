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
import { DynamicForm, DynamicFormField } from "@/components/dynamic-form";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";

type Step = {
  name: string;
  title: string;
  topDescription?: string | string[];
  fields: Record<string, DynamicFormField>;
  inlineFields?: (string[] | string)[];
  nextStep?: ((data: any) => Promise<boolean | string>) | string | number;
  submitButton?: string;
  bottomDescription?: string | string[];
};

const steps: Step[] = [
  {
    name: "email",
    title: "Commencez votre formation",
    topDescription:
      "Entrez votre adresse email pour débuter votre formation contre le phishing",
    fields: {
      email: {
        label: "Adresse e-mail",
        placeholder: "vous@exemple.com",
        schema: z.string().email({ message: "Adresse e-mail invalide" }),
      },
    },
    nextStep: async () => {
      try {
        return "nom";
      } catch (error) {
        console.error("Erreur lors de la validation du backend :", error);
        return false; // En cas d'erreur, retourne false
      }
    },
    submitButton: "Confirmer l'inscription",
  },
  {
    name: "nom",
    title: "Complétez votre profil",
    topDescription: "Entrez votre nom pour personnaliser votre expérience",
    nextStep: 2,
    fields: {
      firstName: {
        label: "Prénom",
        schema: z
          .string()
          .min(2, { message: "Votre prénom contient au moins 2 caractères" }),
      },
      lastName: {
        label: "Nom de famille",
        placeholder: "",
        schema: z
          .string()
          .min(2, { message: "Votre nom contient au moins 2 caractères" }),
      },
    },
    submitButton: "Confirmer l'inscription",
  },
  {
    name: "phone",
    title: "Vérification du téléphone",
    topDescription:
      "Entrez votre numéro de téléphone pour recevoir un code de vérification",
    fields: {
      phone: {
        label: "Numéro de téléphone",
        placeholder: "+33 6 12 34 56 78",
        schema: z
          .string()
          .regex(
            new RegExp(
              /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
            ),
            "Numéro de téléphone invalide !"
          ),
      },
    },
    submitButton: "Confirmer l'inscription",
  },
  {
    name: "card",
    title: "Confirmation de l'inscription",
    topDescription:
      "Pour finaliser votre inscription, veuillez vérifier vos informations de paiement.",
    fields: {
      cardNumber: {
        label: "Numéro de carte",
        placeholder: "1234 5678 9012 3456",
        schema: z.string().regex(/^(\d{4}[ ]?){4}$/, {
          message: "Le numéro de carte est incorrect.",
        }),
        mask: "9999 9999 9999 9999",
        maskChar: " ",
      },
      expiry: {
        label: "Date d'expiration",
        placeholder: "MM/AA",
        schema: z
          .string()
          .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
            message: "Le format de la date d'expiration doit être MM/AA.",
          })
          .refine(
            (val) => {
              const [month, year] = val.split("/").map(Number);
              const currentDate = new Date();
              const currentYear = Number(
                currentDate.getFullYear().toString().slice(-2)
              ); // Obtenir les 2 derniers chiffres de l'année actuelle
              const currentMonth = currentDate.getMonth() + 1; // Les mois vont de 0 à 11
              return (
                year > currentYear ||
                (year === currentYear && month >= currentMonth)
              );
            },
            {
              message: "La date d'expiration doit être dans le futur.",
            }
          ),
        mask: "99/99",
      },
      cvv: {
        label: "CVV",
        placeholder: "123",
        schema: z
          .string()
          .min(3, { message: "Le CVV doit contenir exactement 3 chiffres." })
          .max(4, { message: "Le CVV doit contenir entre 3 et 4 chiffres." })
          .regex(/^\d{3,4}$/, {
            message: "Le CVV doit être composé uniquement de chiffres.",
          }),
        mask: "999",
      },
    },
    inlineFields: ["cardNumber", ["expiry", "cvv"]],
    submitButton: "Confirmer l'inscription",
    bottomDescription:
      "Aucun montant ne sera débité à ce stade, cette étape nous permet simplement de valider vos coordonnées pour des raisons de sécurité et de prévenir toute activité frauduleuse.",
  },
];

//type IFormInput = z.infer<typeof formSchema>;

const InscriptionForm: FC = () => {
  const [error, setError] = useState("");
  const params = useParams<{ step: string }>();
  const stepname: string = params?.step || "email";
  const router = useRouter();

  const step = steps.find((x) => x.name == stepname);
  if (!step) return null;

  const onSubmit: SubmitHandler<{
    name: string;
    age: number;
    email: string;
  }> = async (data) => {
    const success =
      step.nextStep && typeof step.nextStep === "function"
        ? await step.nextStep(data)
        : typeof step.nextStep === "string"
        ? step.nextStep
        : typeof step.nextStep === "number"
        ? steps[step.nextStep].name
        : true;
    if (success === true) {
      let nextstep = steps.findIndex((x) => x.name == stepname);
      if (nextstep + 1 < steps.length) nextstep++;
      router.push(`/sign/${steps[nextstep].name}`);
    } else if (success) {
      router.push(`/sign/${success}`);
    } else {
      setError("Validation échouée.");
    }
  };

  const formatText = (text: string | string[]) => {
    return Array.isArray(text)
      ? text.map((t, i) => (
          <>
            {i != 0 && (
              <>
                <br />
                <br />
              </>
            )}
            {t}
          </>
        ))
      : text;
  };

  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700 bg-opacity-90">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl text-white">{step.title}</CardTitle>
        {step.topDescription && (
          <CardDescription className="text-gray-400">
            {formatText(step.topDescription)}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <DynamicForm
          dFields={step.fields}
          inlineFields={step.inlineFields}
          onSubmit={onSubmit}
          formId="dynamic-form"
        />
        {step.bottomDescription && (
          <CardDescription className="text-gray-400 pt-4">
            {formatText(step.bottomDescription)}
          </CardDescription>
        )}
      </CardContent>

      <CardFooter>
        <Button type={"submit"} form="dynamic-form" className="w-full">
          {step.submitButton || "Continuer"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InscriptionForm;
