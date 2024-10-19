"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Zap,
  Brain,
  Globe,
  ChartBar,
  Users,
  Lock,
  Cpu,
  Network,
  Cloud,
  Eye,
} from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function About() {
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

  return (
    <div className="relative z-10 container mx-auto px-4 py-16 mt-16">
      <Card className="text-center space-y-8 mb-16 bg-gray-800 border-gray-700 bg-opacity-90 p-6">
        <CardTitle className="text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 animate-pulse">
          Phish Aware: Gardiens du Cyberespace
        </CardTitle>
        <CardContent className="text-2xl text-cyan-50 max-w-4xl mx-auto leading-relaxed">
          Depuis 2070, Phish Aware redéfinit les frontières de la cybersécurité,
          fusionnant l'intelligence artificielle avancée avec une expertise
          humaine inégalée pour créer un bouclier impénétrable contre les
          menaces du phishing.
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <Card className="space-y-6 bg-gray-800 border-gray-700 bg-opacity-90 p-6">
          <CardTitle className="text-3xl font-bold text-cyan-300">
            Notre Vision Révolutionnaire
          </CardTitle>
          <CardContent className="text-white text-lg">
            Chez Phish Aware, nous ne nous contentons pas de suivre les
            tendances de la cybersécurité - nous les créons. Notre plateforme de
            simulation avancée est le fruit d'une fusion entre l'intelligence
            artificielle de pointe et des décennies d'expertise en sécurité
            informatique. Nous visualisons un avenir où chaque interaction
            numérique est sécurisée, où le phishing devient une relique du
            passé.
          </CardContent>
        </Card>
        <Card className="space-y-6 bg-gray-800 border-gray-700 bg-opacity-90 p-6">
          <CardTitle className="text-3xl font-bold text-cyan-300">
            L'Essence de Phish Aware
          </CardTitle>
          <CardContent className="text-white text-lg">
            Nous sommes plus qu'une simple entreprise de cybersécurité. Nous
            sommes les architectes d'un avenir numérique sûr, où chaque individu
            est armé des connaissances et des outils nécessaires pour naviguer
            en toute confiance dans le cyberespace. Notre approche holistique
            combine technologie de pointe, formation continue et adaptation en
            temps réel aux menaces émergentes.
          </CardContent>
        </Card>
      </div>

      <div className="space-y-12 mb-20">
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          Notre Arsenal Technologique
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Shield,
              title: "Bouclier Quantique",
              description:
                "Une protection adaptative qui évolue plus rapidement que les menaces elles-mêmes, utilisant des algorithmes quantiques pour prédire et neutraliser les attaques avant qu'elles ne se matérialisent.",
            },
            {
              icon: Brain,
              title: "IA Prédictive",
              description:
                "Notre intelligence artificielle analyse en continu les patterns de phishing émergents, anticipant les futures stratégies des cybercriminels et renforçant proactivement nos défenses.",
            },
            {
              icon: Zap,
              title: "Simulations Hyper-Réalistes",
              description:
                "Nos environnements de formation reproduisent fidèlement les dernières techniques de phishing, offrant une expérience d'apprentissage immersive et constamment mise à jour.",
            },
            {
              icon: Cpu,
              title: "Processeur Bionique",
              description:
                "Notre infrastructure de traitement hybride fusionne puissance de calcul quantique et intuition humaine pour une analyse ultra-rapide et nuancée des menaces.",
            },
            {
              icon: Network,
              title: "Réseau Synaptique",
              description:
                "Un maillage global de nœuds de sécurité interconnectés, partageant instantanément les informations sur les nouvelles menaces pour une protection mondiale synchronisée.",
            },
            {
              icon: Cloud,
              title: "Nuage de Sécurité Adaptatif",
              description:
                "Une infrastructure cloud dynamique qui s'ajuste en temps réel à la charge et aux types de menaces, garantissant une protection optimale à tout moment.",
            },
            {
              icon: Eye,
              title: "Surveillance Omnisciente",
              description:
                "Des capteurs quantiques dispersés à travers le cyberespace, capables de détecter les anomalies les plus subtiles dans les flux de données mondiaux.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-12 mb-20">
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">
          L'Impact Phish Aware
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Globe,
              title: "Portée Mondiale",
              value: "200+ pays",
              description:
                "Notre technologie protège des utilisateurs sur tous les continents, transcendant les frontières numériques.",
            },
            {
              icon: ChartBar,
              title: "Réduction des Risques",
              value: "99.9%",
              description:
                "Nos clients constatent une réduction drastique des incidents de phishing, approchant l'éradication totale.",
            },
            {
              icon: Users,
              title: "Utilisateurs Protégés",
              value: "500M+",
              description:
                "Chaque jour, plus d'un demi-milliard d'individus naviguent en toute sécurité grâce à Phish Aware.",
            },
            {
              icon: Lock,
              title: "Attaques Bloquées",
              value: "1B+/jour",
              description:
                "Notre système neutralise plus d'un milliard de tentatives de phishing quotidiennement, maintenant une vigilance constante.",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-lg p-6 hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <stat.icon className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-gray-100 mb-2">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-cyan-300 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-300">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/contact">Rejoignez la Révolution Cybernétique</Link>
        </Button>
      </div>
    </div>
  );
}
