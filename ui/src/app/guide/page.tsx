"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, Mail, Smartphone, Globe, Shield } from "lucide-react";

// Define types for phishing items
type PhishingTypeItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  howItWorks: string;
  example: string;
  realCase: string;
  protection: string[];
  image: string;
};

type PhishingTypeProps = {
  type: PhishingTypeItem;
  index: number;
};

// PhishingType component that renders each phishing case
const PhishingType = ({ type, index }: PhishingTypeProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center justify-between py-16 ${
        index % 2 === 0 ? "md:flex-row-reverse" : ""
      } ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
    >
      {/* Card to wrap content */}
      <Card className="w-full md:w-1/2 bg-gray-800 border-gray-700 bg-opacity-90 p-2">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-cyan-300 flex items-center">
            <type.icon className="w-10 h-10 mr-4" />
            {type.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-8">
          <p className="text-xl text-white my-1 mb-6">{type.description}</p>
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-cyan-400 my-2">
              Comment ça fonctionne:
            </h3>
            <p className="text-white">{type.howItWorks}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-cyan-400 my-2">
              Cas réel:
            </h3>
            <p className="text-white">{type.realCase}</p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold text-cyan-400 my-2">
              Comment se protéger:
            </h3>
            <ul className="list-disc list-inside text-white space-y-2">
              {type.protection.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 p-6">
        <div className="relative h-80 w-full overflow-hidden rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${type.image})` }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white text-2xl font-bold text-center px-4">
              {type.example}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Guide() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const phishingTypes: PhishingTypeItem[] = [
    {
      icon: Mail,
      title: "Phishing par Email",
      description:
        "Une technique d'attaque où les cybercriminels se font passer pour des entités légitimes via email pour voler des informations sensibles.",
      howItWorks:
        "Les attaquants créent des emails qui imitent parfaitement ceux d'organisations reconnues, incitant les victimes à cliquer sur des liens malveillants ou à fournir des informations personnelles.",
      example:
        "Vous recevez un email urgent de votre 'banque' vous demandant de mettre à jour vos informations de connexion.",
      realCase:
        "En 2020, une attaque de phishing a ciblé les utilisateurs de Microsoft Office 365, touchant 62% des entreprises dans le monde.",
      protection: [
        "Vérifiez toujours l'adresse email de l'expéditeur.",
        "Ne cliquez jamais sur les liens suspects dans les emails.",
        "Utilisez l'authentification à deux facteurs.",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Smartphone,
      title: "Smishing (SMS Phishing)",
      description:
        "Une forme de phishing qui utilise les SMS ou les applications de messagerie pour tromper les victimes.",
      howItWorks:
        "Les attaquants envoient des SMS contenant des liens malveillants ou demandant des informations sensibles.",
      example:
        "Vous recevez un SMS vous informant que vous avez gagné un prix et vous demandant de cliquer sur un lien pour le réclamer.",
      realCase:
        "En 2021, une campagne de smishing a ciblé les clients de grandes banques au Royaume-Uni, envoyant des SMS prétendant provenir de leur banque.",
      protection: [
        "Ne répondez jamais aux SMS demandant des informations personnelles.",
        "Ne cliquez pas sur les liens dans les SMS.",
        "Contactez votre banque via les canaux officiels.",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Globe,
      title: "Spear Phishing",
      description:
        "Une attaque de phishing ciblée, où l'attaquant personnalise ses messages pour une victime spécifique.",
      howItWorks:
        "L'attaquant utilise des informations spécifiques sur la victime pour rendre l'attaque plus crédible.",
      example:
        "Vous recevez un email d'un collègue que vous connaissez, vous demandant des informations sensibles.",
      realCase:
        "En 2016, l'attaque de spear phishing contre le Comité national démocrate aux États-Unis a abouti au vol d'emails confidentiels.",
      protection: [
        "Vérifiez toujours l'expéditeur.",
        "Ne partagez jamais d'informations sensibles par email.",
        "Signalez les messages suspects à l'équipe informatique.",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      icon: Shield,
      title: "Whaling",
      description:
        "Un type de phishing ciblé sur les cadres supérieurs ou les personnes ayant un accès important à l'entreprise.",
      howItWorks:
        "Les cybercriminels envoient des emails personnalisés ciblant les dirigeants pour voler des informations sensibles.",
      example:
        "Un email ciblant le PDG d'une entreprise demande une approbation rapide pour transférer des fonds.",
      realCase:
        "En 2018, un PDG européen a été piégé dans une attaque de whaling, entraînant une perte de plusieurs millions d'euros.",
      protection: [
        "Former les cadres à reconnaître les emails frauduleux.",
        "Mettre en place des procédures de validation des transactions financières.",
      ],
      image: "/placeholder.svg?height=300&width=400",
    },
  ];

  return (
    <div className="relative z-10 container mx-auto px-4 py-16 m-16">
      <div className="text-center space-y-8 mb-16">
        <h1 className="text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 animate-pulse">
          Guide Anti-Phishing Avancé
        </h1>
        <p className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed">
          Découvrez les techniques de phishing et apprenez à vous en protéger
          efficacement.
        </p>
      </div>

      <div className="space-y-24">
        {phishingTypes.map((type, index) => (
          <PhishingType key={index} type={type} index={index} />
        ))}
      </div>

      <div className="text-center mt-16">
        <Button asChild size="lg">
          <Link href="/sign">Commencez votre entraînement cybernétique</Link>
        </Button>
      </div>
    </div>
  );
}
