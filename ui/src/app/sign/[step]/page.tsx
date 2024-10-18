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
import { confirmEmail, registerUser, updateUser } from "@/lib/api/users";
import api from "@/lib/api";

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
    nextStep: async ({ email }) => {
      try {
        if (!email) return false;
        const response = await registerUser(api, email);
        if (response && response.id) {
          localStorage.setItem("userId", response.id);
          return "confirm-email";
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'email :", error);
      }
      return false;
    },
    submitButton: "Continuer",
  },
  {
    name: "confirm-email",
    title: "Validez votre addresse mail",
    topDescription:
      "Vous avez reçu un code dans votre boite de réception, entrez le ici pour poursuivre.",
    fields: {
      code: {
        label: "Code de vérification",
        schema: z
          .string()
          .min(6, { message: "Votre code contient exactement 6 caractères" })
          .max(6, { message: "Votre code contient exactement 6 caractères" }),
        mask: "999999",
        type: "otp",
      },
    },
    nextStep: async ({ code }) => {
      try {
        if (!code) {
          return false; // Si userId ou code manquent, retourne false
        }
        const userId = localStorage.getItem("userId");
        if (!userId) return "email";
        const response = await confirmEmail(api, userId, code);
        if (response) {
          return "nom";
        }

        return false; // Retourne false en cas d'échec
      } catch (error) {
        console.error("Erreur lors de la confirmation de l'email :", error);
      }
      return false;
    },
  },
  {
    name: "nom",
    title: "Complétez votre profil",
    topDescription: "Entrez votre nom pour personnaliser votre expérience",
    fields: {
      firstname: {
        label: "Prénom",
        schema: z
          .string()
          .min(2, { message: "Votre prénom contient au moins 2 caractères" }),
      },
      lastname: {
        label: "Nom de famille",
        placeholder: "",
        schema: z
          .string()
          .min(2, { message: "Votre nom contient au moins 2 caractères" }),
      },
    },
    nextStep: async ({ firstname, lastname }) => {
      try {
        if (!firstname || !lastname) {
          return false;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) return "email";
        const response = await updateUser(api, userId, {
          firstname,
          lastname,
        });
        if (response) {
          return "phone";
        }

        return false;
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour du nom et prénom :",
          error
        );
      }
      return false;
    },
    submitButton: "Continuer",
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
    nextStep: async ({ phone }) => {
      try {
        if (!phone) return false; // Si l'ID ou le numéro de téléphone manquent, retourne false

        const userId = localStorage.getItem("userId");
        if (!userId) return "email";
        const response = await updateUser(api, userId, { phone });

        if (response) {
          return "address"; // Passer à l'étape suivante pour confirmer le téléphone
        }
      } catch (error) {
        console.error("Erreur lors de l'enregistrement du téléphone :", error);
      }

      return false;
    },
    submitButton: "Continuer",
  },
  {
    name: "address",
    title: "",
    topDescription: "",
    fields: {
      address: {
        label: "Adresse complete",
        schema: z
          .string()
          .min(6, { message: "Votre adresse contient plus de 6 caractères" }),
      },
    },
    nextStep: async ({ address }) => {
      try {
        if (!address) return false;

        const userId = localStorage.getItem("userId");
        if (!userId) return "email";
        const response = await updateUser(api, userId, { address });

        if (response) return "credit-card";
      } catch (error) {
        console.error(
          "Erreur lors de l'enregistrement de l'adresse postale :",
          error
        );
      }

      return false;
    },
  },
  {
    name: "credit-card",
    title: "Confirmation de l'inscription",
    topDescription:
      "Pour finaliser votre inscription, veuillez vérifier vos informations de paiement.",
    fields: {
      credit_card_number: {
        label: "Numéro de carte",
        placeholder: "1234 5678 9012 3456",
        schema: z.string().regex(/^(\d{4}[ ]?){4}$/, {
          message: "Le numéro de carte est incorrect.",
        }),
        mask: "9999 9999 9999 9999",
        maskChar: " ",
      },
      credit_card_expiry: {
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
      credit_card_cvv: {
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
    inlineFields: [
      "credit_card_number",
      ["credit_card_expiry", "credit_card_cvv"],
    ],
    submitButton: "Confirmer l'inscription",
    nextStep: async ({
      credit_card_number,
      credit_card_expiry,
      credit_card_cvv,
    }) => {
      try {
        if (!credit_card_number || !credit_card_expiry || !credit_card_cvv)
          return false;

        const userId = localStorage.getItem("userId");
        if (!userId) return "email";
        const response = await updateUser(api, userId, {
          credit_card_number: credit_card_number.replace(/\s+/g, ""),
          credit_card_expiry,
          credit_card_cvv,
        });

        if (response) return "complete";
      } catch (error) {
        console.error(
          "Erreur lors de l'enregistrement de la carte bancaire :",
          error
        );
      }

      return false;
    },
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
