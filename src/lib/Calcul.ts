export const GenerateCalculSteps = (nombre: number): string[] => {
  const steps: string[] = [];
  const totalSteps = Math.floor(Math.random() * 6) + 10; // entre 10 et 15
  let current = Math.floor(Math.random() * 9000) + 1000;

  steps.push(`1. On commence avec ${current}`);

  for (let i = 2; i <= totalSteps; i++) {
    const op = Math.floor(Math.random() * 4);
    let operand = Math.floor(Math.random() * 20) + 2;

    if (op === 3 && (current % operand !== 0 || operand === 1)) {
      operand = 2;
    }

    let description = "";

    switch (op) {
      case 0:
        current += operand;
        description = `Ajoute ${operand}`;
        break;
      case 1:
        current -= operand;
        description = `Soustrait ${operand}`;
        break;
      case 2:
        current *= operand;
        description = `Multiplie par ${operand}`;
        break;
      case 3:
        current = Math.floor(current / operand);
        description = `Divise par ${operand}`;
        break;
    }

    steps.push(`${i}. ${description} → ${current}`);
  }

  const correction = nombre - current;
  const correctionStep =
    correction >= 0
      ? `Ajoute ${correction}`
      : `Soustrait ${Math.abs(correction)}`;

  current = nombre;
  steps.push(`${totalSteps + 1}. ${correctionStep} → ${nombre}`);
  steps.push(`Résultat final : ${nombre} ✅`);

  return steps;
};

export default GenerateCalculSteps;
