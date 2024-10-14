import SignUpForm from "@/components/SignUpForm";
import { HolographicBackground } from "@/components/HolographicBackground";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-primary-foreground flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HolographicBackground />
      <div className="z-10 space-y-8 text-center">
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600 animate-pulse">
          Cyber Shield 2055
        </h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">
          Plongez dans l'avenir de la cybersécurité. Notre IA avancée simule des
          menaces de phishing ultra-réalistes pour renforcer vos défenses
          neurales contre les cyberattaques du futur.
        </p>
        <SignUpForm />
      </div>
    </div>
  );
}
