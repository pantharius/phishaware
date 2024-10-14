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
import { CheckCircle } from "lucide-react";

export default function Confirmation() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (cardNumber || expiry || cvv) {
      setSuccess(true);
    } else {
      setError(
        "Félicitations ! Vous avez correctement identifié cette tentative de phishing."
      );
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              Attention : Tentative de Phishing Détectée
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-400 mb-4">
              Ceci était une simulation de tentative de phishing. Dans une
              situation réelle, vos informations auraient été compromises.
            </p>
            <p className="text-gray-300">
              Rappel : Ne jamais fournir d'informations sensibles comme des
              détails de carte bancaire via des formulaires non sécurisés ou des
              emails.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Continuer vers le tableau de bord
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl text-white">
          Confirmation de l'inscription
        </CardTitle>
        <CardDescription className="text-gray-400">
          Pour finaliser votre inscription, veuillez vérifier vos informations
          de paiement. Aucun montant ne sera débité à ce stade, cette étape nous
          permet simplement de valider vos coordonnées pour des raisons de
          sécurité et de prévenir toute activité frauduleuse.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber" className="text-white">
              Numéro de carte
            </Label>
            <Input
              id="cardNumber"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry" className="text-white">
                Date d'expiration
              </Label>
              <Input
                id="expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                placeholder="MM/AA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-white">
                CVV
              </Label>
              <Input
                id="cvv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                placeholder="123"
              />
            </div>
          </div>
          {error && (
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Confirmer l'inscription
        </Button>
      </CardFooter>
    </Card>
  );
}
