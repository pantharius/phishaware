"use client";

import { useState, useEffect } from "react";
import { HolographicBackground } from "@/components/HolographicBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const scenarios = {
  "fake-bank": {
    title: "Alerte : Tentative d'Intrusion Financière Détectée",
    description:
      "L'IA de sécurité a identifié une simulation d'attaque ciblant vos actifs numériques.",
    dangers: [
      "L'email utilisait des algorithmes de manipulation émotionnelle avancés.",
      "L'URL contenait des nano-codes malveillants indétectables par les scanners conventionnels.",
      "Le message exploitait des failles psychologiques connues pour inciter à l'action immédiate.",
    ],
    protections: [
      "Activez votre bouclier neural avant d'interagir avec des communications financières.",
      "Utilisez l'authentification biométrique multi-facteurs pour toute transaction.",
      "Consultez votre IA personnelle de sécurité financière pour vérifier la légitimité des requêtes.",
    ],
  },
  // Ajoutez d'autres scénarios ici
};

export default function ExplanationPage({
  params,
}: {
  params: { scenario: string };
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const scenario = scenarios[params.scenario as keyof typeof scenarios];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < 3) setCurrentStep(currentStep + 1);
    }, 2000);
    return () => clearTimeout(timer);
  }, [currentStep]);

  if (!scenario) return <div>Scénario non trouvé</div>;

  return (
    <div className="min-h-screen bg-black text-primary-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HolographicBackground />
      <Card className="z-10 bg-black/50 backdrop-blur-lg border-cyan-400 max-w-4xl w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
            {scenario.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-xl text-white">{scenario.description}</p>

          {currentStep > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-red-500">
                  Menaces Détectées
                </h2>
                {scenario.dangers.map((danger, index) => (
                  <Alert
                    key={index}
                    variant="destructive"
                    className={`transition-opacity duration-500 ${
                      currentStep > 1 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <AlertTitle>Alerte {index + 1}</AlertTitle>
                    <AlertDescription>{danger}</AlertDescription>
                  </Alert>
                ))}
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-green-500">
                  Protocoles de Défense
                </h2>
                {scenario.protections.map((protection, index) => (
                  <Alert
                    key={index}
                    className={`transition-opacity duration-500 ${
                      currentStep > 2 ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <AlertTitle>Protocole {index + 1}</AlertTitle>
                    <AlertDescription>{protection}</AlertDescription>
                  </Alert>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
