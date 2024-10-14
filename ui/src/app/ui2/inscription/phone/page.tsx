"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function InscriptionTelephone() {
  const [telephone, setTelephone] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("phone"); // 'phone' ou 'code'
  const router = useRouter();

  const handleSubmitPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!telephone) {
      setError("Veuillez entrer un numéro de téléphone.");
      return;
    }

    // Simuler l'envoi d'un SMS
    setStep("code");
  };

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (code !== "555555") {
      setError("Code incorrect. Essayez 555555.");
      return;
    }

    // Code correct, passer à l'étape suivante
    router.push("/ui2/inscription/confirmation");
  };

  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Vérification du téléphone
        </CardTitle>
        <CardDescription className="text-gray-400">
          {step === "phone"
            ? "Entrez votre numéro de téléphone pour recevoir un code de vérification"
            : "Entrez le code reçu par SMS"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === "phone" ? (
          <form onSubmit={handleSubmitPhone} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="telephone" className="text-white">
                Numéro de téléphone
              </Label>
              <Input
                id="telephone"
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                placeholder="+33 6 12 34 56 78"
              />
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleSubmitCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-white">
                Code de vérification
              </Label>
              <Input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                placeholder="555555"
              />
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </form>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={step === "phone" ? handleSubmitPhone : handleSubmitCode}
          className="w-full"
        >
          {step === "phone" ? "Envoyer le code" : "Vérifier"}
        </Button>
      </CardFooter>
    </Card>
  );
}
