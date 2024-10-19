"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-800 border-gray-700 bg-opacity-60 rounded-xl p-6 max-w-4xl w-full space-y-8 border mt-20 lg:mt-0">
      <div className="text-center space-y-4">
        <h1 className="text-5xl text-shadow font-bold  text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">
          Phish Aware
        </h1>
        <p className="text-xl text-gray-100">
          Renforcez vos défenses contre le phishing grâce à notre plateforme de
          simulation avancée
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-600 bg-opacity-90 text-white">
          <CardHeader className="flex flex-col items-center bold">
            <Shield className="w-14 h-14 text-blue-400 mb-2" />
            <CardTitle className="text-lg">Protection Intelligente</CardTitle>
          </CardHeader>
          <CardContent className="italic text-sm">
            Apprenez à identifier et à vous protéger contre les attaques de
            phishing sophistiquées.
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-600 bg-opacity-90 text-white">
          <CardHeader className="flex flex-col items-center">
            <Lock className="w-14 h-14 text-teal-400 mb-2" />
            <CardTitle className="text-lg">Simulations Réalistes</CardTitle>
          </CardHeader>
          <CardContent className="italic text-sm">
            Expérimentez des scénarios de phishing conçus pour tester et
            améliorer vos réflexes de sécurité.
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-600 bg-opacity-90 text-white">
          <CardHeader className="flex flex-col items-center">
            <AlertTriangle className="w-14 h-14 text-yellow-400 mb-2" />
            <CardTitle className="text-lg">Apprentissage Continu</CardTitle>
          </CardHeader>
          <CardContent className="italic text-sm">
            Recevez des feedbacks détaillés et des conseils personnalisés pour
            renforcer votre vigilance.
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button asChild size="lg" variant={"default"}>
          <Link href="/sign">Commencer votre formation</Link>
        </Button>
      </div>
    </div>
  );
}
