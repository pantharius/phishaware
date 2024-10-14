import { HolographicBackground } from "@/components/HolographicBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Confirmation() {
  return (
    <div className="min-h-screen bg-black text-primary-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HolographicBackground />
      <Card className="z-10 bg-black/50 backdrop-blur-lg border-cyan-400 max-w-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
            Cyber Shield Activé
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl leading-relaxed">
            Votre défense neurale est maintenant en ligne. Préparez-vous à
            recevoir des simulations de cyberattaques avancées. Restez vigilant,
            l'avenir de la sécurité est entre vos mains.
          </p>
          <div className="mt-8 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto animate-pulse" />
        </CardContent>
      </Card>
    </div>
  );
}
