"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GenerateCalculSteps from "@/lib/Calcul";
import GenerateInlineExpression from "@/lib/CalculInline";
import { Calculator } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [arrivalNumber, setArrivalNumber] = useState("");
  const [steps, setSteps] = useState<string[]>([]);
  const [inlineExpression, setInlineExpression] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const number = Number(arrivalNumber);
    if (isNaN(number) || number <= 0) {
      alert("Veuillez entrer un nombre valide.");
      return;
    }

    // Étapes + expression
    const result = GenerateCalculSteps(number);
    const inline = GenerateInlineExpression(number);

    setSteps(result);
    setInlineExpression(inline);
  };

  return (
    <main className="min-h-screen bg-background p-4 flex flex-col lg:flex-row items-start justify-center gap-8 overflow-y-auto">
      {/* Bloc formulaire */}
      <div className="w-full max-w-lg rounded-xl border bg-card p-8 shadow-lg animate-in fade-in duration-500 ease-out">
        <h1 className="mb-6 flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-foreground">
          <Calculator className="h-7 w-7 text-primary" />
          Entrer un nombre
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="number"
            placeholder="Ex: 5312450"
            className="text-lg py-6 text-center bg-input hover:bg-muted transition-colors"
            onChange={(e) => setArrivalNumber(e.target.value)}
          />
          <Button
            type="submit"
            className="mt-6 w-full py-6 text-lg font-semibold transition-all"
          >
            Valider
          </Button>
        </form>
      </div>

      {/* Bloc résultat */}
      {steps.length > 0 && (
        <div className="w-full max-w-xl rounded-xl bg-card p-6 text-foreground shadow-xl animate-in fade-in-up duration-700 ease-out">
          <h2 className="mb-4 text-center text-xl font-semibold text-primary">
            Étapes de calcul
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            {steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ul>

          {/* Expression en ligne */}
          {inlineExpression && (
            <div className="mt-6 border-t pt-4 text-center text-muted-foreground">
              <span className="font-semibold text-primary mb-2 block">
                Calcul en ligne :
              </span>
              {inlineExpression}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
