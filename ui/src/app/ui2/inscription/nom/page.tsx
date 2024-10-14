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

export default function InscriptionNom() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!prenom || !nom) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Ici, vous enverriez normalement les données au serveur
    // Pour la démonstration, nous passons simplement à l'étape suivante
    router.push("/ui2/inscription/phone");
  };

  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Complétez votre profil
        </CardTitle>
        <CardDescription className="text-gray-400">
          Entrez votre nom pour personnaliser votre expérience
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="prenom" className="text-white">
              Prénom
            </Label>
            <Input
              id="prenom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nom" className="text-white">
              Nom
            </Label>
            <Input
              id="nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
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
