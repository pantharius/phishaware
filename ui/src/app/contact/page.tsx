"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { DynamicForm, DynamicFormField } from "@/components/dynamic-form";
import { z } from "zod";
import { contactMe } from "@/lib/api/contact";
import api from "@/lib/api";

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantumLocation, setQuantumLocation] = useState("Calculing...");
  const [quantumPhone, setQuantumPhone] = useState("Synchronizing...");
  const [quantumEmail, setQuantumEmail] = useState("Initializing...");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    const locationInterval = setInterval(() => {
      const locations = [
        "42°N, 71°W, Dimension Ψ",
        "37°S, 144°E, Réalité Ω",
        "0°, 0°, Nexus Temporel",
        "90°N, 0°E, Vortex Polaire",
        "19.5°N, 155.5°W, Point d'Énergie Tétraédrique",
      ];
      setQuantumLocation(
        locations[Math.floor(Math.random() * locations.length)]
      );
    }, 5000);

    const phoneInterval = setInterval(() => {
      setQuantumPhone(
        `+∞ (${Math.floor(Math.random() * 100)}) ${Math.floor(
          Math.random() * 1000000
        )}`
      );
    }, 3000);

    const emailInterval = setInterval(() => {
      const domains = [
        "quantumrealm.com",
        "multiversemail.net",
        "chronoshift.io",
        "entanglement.org",
      ];
      const prefixes = [
        "nexus",
        "quantum",
        "cybershift",
        "timewave",
        "paradox",
      ];
      setQuantumEmail(
        `${prefixes[Math.floor(Math.random() * prefixes.length)]}@${
          domains[Math.floor(Math.random() * domains.length)]
        }`
      );
    }, 4000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(locationInterval);
      clearInterval(phoneInterval);
      clearInterval(emailInterval);
    };
  }, []);

  const dFields: Record<string, DynamicFormField> = {
    fromName: {
      label: "Nom",
      placeholder: "Votre nom",
      schema: z
        .string()
        .min(2, { message: "Votre prénom contient au moins 2 caractères" }),
    },
    from: {
      label: "Email Quantique",
      placeholder: "votre@email-quantique.com",
      schema: z.string().email("Votre email est incorrect"),
      type: "email",
    },
    message: {
      label: "Message",
      placeholder: "Votre message",
      schema: z.string().min(50, {
        message: "Votre message doit contenir au moins 50 caractères",
      }),
      type: "textarea",
    },
  };

  const onSubmit = async ({
    fromName,
    from,
    message,
  }: {
    fromName: string;
    from: string;
    message: string;
  }) => {
    try {
      if (!fromName || !from || !message) return false;

      const userId = localStorage.getItem("userId");
      if (!userId) return "email";
      const response = await contactMe(api, {
        fromName,
        from,
        message,
      });

      if (response) return "complete";
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de la carte bancaire :",
        error
      );
    }

    return false;
  };

  return (
    <div className="relative z-10 container mx-auto px-4 py-16 m-16">
      <Card className="text-center space-y-8 mb-16 bg-gray-800 border-gray-700 bg-opacity-90 p-6">
        <CardTitle className="text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 animate-pulse">
          Contactez le Nexus Phish Aware
        </CardTitle>
        <CardContent className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
          Établissez une connexion quantique avec notre équipe pour toute
          question sur notre technologie anti-phishing du futur.
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden group hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
          <CardContent className="p-6">
            <DynamicForm
              dFields={dFields}
              onSubmit={onSubmit}
              formId="dynamic-form"
            />
          </CardContent>
          <CardFooter>
            <Button type={"submit"} form="dynamic-form" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Envoyer à travers l'espace-temps
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 overflow-hidden group hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">
              Centre de Contrôle Quantique
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-blue-400 mr-2" />
                <p className="text-gray-300">
                  Localisation Quantique:
                  <span className="text-cyan-400 font-mono ml-2">
                    {quantumLocation}
                  </span>
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-green-400 mr-2" />
                <p className="text-gray-300">
                  Ligne Temporelle:
                  <span className="text-cyan-400 font-mono ml-2">
                    {quantumPhone}
                  </span>
                </p>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-yellow-400 mr-2" />
                <p className="text-gray-300">
                  Email:
                  <span className="text-cyan-400 font-mono ml-2">
                    {quantumEmail}
                  </span>
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                Note Interdimensionnelle
              </h3>
              <p className="text-gray-300">
                Notre QG existe simultanément dans plusieurs dimensions. Ne
                soyez pas surpris si votre message arrive avant même que vous ne
                l'envoyiez !
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
