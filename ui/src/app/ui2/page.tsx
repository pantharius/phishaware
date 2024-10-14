import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gray-800 border-gray-700 bg-opacity-60 rounded-xl p-6 max-w-4xl w-full space-y-8 border">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold  text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
          CyberShield
        </h1>
        <p className="text-xl text-gray-300">
          Renforcez vos défenses contre le phishing grâce à notre plateforme de
          simulation avancée
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <Shield className="w-10 h-10 text-blue-400 mb-2" />
            <CardTitle>Protection Intelligente</CardTitle>
          </CardHeader>
          <CardContent>
            Apprenez à identifier et à vous protéger contre les attaques de
            phishing sophistiquées.
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <Lock className="w-10 h-10 text-teal-400 mb-2" />
            <CardTitle>Simulations Réalistes</CardTitle>
          </CardHeader>
          <CardContent>
            Expérimentez des scénarios de phishing conçus pour tester et
            améliorer vos réflexes de sécurité.
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 text-white">
          <CardHeader>
            <AlertTriangle className="w-10 h-10 text-yellow-400 mb-2" />
            <CardTitle>Apprentissage Continu</CardTitle>
          </CardHeader>
          <CardContent>
            Recevez des feedbacks détaillés et des conseils personnalisés pour
            renforcer votre vigilance.
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button asChild size="lg" variant={"default"}>
          <Link href="/ui2/sign">Commencer votre formation</Link>
        </Button>
      </div>
    </div>
  );
}
