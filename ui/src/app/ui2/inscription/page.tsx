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

export default function InscriptionEmail() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Veuillez entrer une adresse email.");
      return;
    }

    // Simuler une vérification d'email
    if (email.endsWith("@example.com")) {
      setError("Cette adresse email n'est pas autorisée.");
      return;
    }

    // Normalement, vous enverriez l'email au serveur ici
    // Pour la démonstration, nous allons simplement passer à l'étape suivante
    router.push("/ui2/inscription/nom");
  };

  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Commencez votre protection
        </CardTitle>
        <CardDescription className="text-gray-400">
          Entrez votre adresse email pour débuter votre formation contre le
          phishing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Adresse Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-red-400">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Continuer
        </Button>
      </CardFooter>
    </Card>
  );
}
