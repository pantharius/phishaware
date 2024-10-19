"use client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const InscriptionForm: FC = () => {
  return (
    <Card className="w-full max-w-md bg-gray-800 border-gray-700 bg-opacity-90">
      <CardHeader className="pb-3">
        <CardTitle className="text-2xl text-white">
          Ah ! Et voilà, vous êtes tombé dans le piège !
        </CardTitle>
        <CardDescription className="text-gray-400">
          Vous avez partagé vos informations personnelles un peu trop
          facilement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-red-400 mb-4">
          Ceci était une simulation d'attaque de phishing. Dans une situation
          réelle, vos informations auraient pu être volées et utilisées à
          mauvais escient.
        </p>
        <p className="text-gray-300 mb-4">
          Heureusement, ici c'est un environnement sécurisé et vos données sont
          protégées. Cependant, cela montre à quel point il est important de
          rester vigilant et de ne jamais partager d'informations sensibles sur
          des sites ou des formulaires non vérifiés.
        </p>
        <p className="text-gray-300">
          Nous utiliserons vos réponses pour affiner les simulations futures et
          mieux vous préparer face aux tentatives de phishing réelles. Restez
          sur vos gardes !
        </p>
      </CardContent>

      <CardFooter>
        <Link href="/guide" className="w-full">
          <Button className="w-full">Continuer vers le guide</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default InscriptionForm;
