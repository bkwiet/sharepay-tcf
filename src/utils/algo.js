const participants = [];

const budget = 3000;

participants.push({ name: "Pika", paiement: 4000 });
participants.push({ name: "Bobby", paiement: 500 });
participants.push({ name: "Karine", paiement: 200 });
participants.push({ name: "Vanda", paiement: 800 });

const shareThedime = (budget, participants) => {
  let part = budget / participants.length;
  let totalPaiement = 0;
  const ParticipantsToPay = [];
  const ParticipantsToPick = [];
  console.log("\n\n-----> Initial budget " + budget + " € \n");

  console.log("\n\n-----> Divide the budget \n\n");

  console.log("Part for each participant", part + " €");

  console.log("\n\n-----> Show each participation \n\n");

  participants.forEach((participant) => {
    console.log(participant.name + " \tgave \t" + participant.paiement + " €");
    totalPaiement += participant.paiement;
  });
  console.log("\n\n");
  if (totalPaiement === budget) {
    console.log("You are in your shoes, the total paiement is equal to the initial budget\n\n");
  } else {
    console.log(
      "The total paiement is not equal to the initial budget \nTotal paiement : " +
        totalPaiement +
        " €" +
        "\nInitial Budget : " +
        budget +
        " €"
    );
    console.log("\n We will adjust the split \n\n");
    part = totalPaiement / participants.length;
  }

  console.log("\n\n-----> How we share the bill \n\n");

  participants.forEach((participant) => {
    const doneorgive = part - participant.paiement;

    if (doneorgive >= 0) {
      console.log(participant.name + " \twill pay \t" + doneorgive + " €");
      participant.debt = doneorgive;
      ParticipantsToPick.push(participant);
    } else {
      console.log(participant.name + " \twill receive  \t" + Math.abs(doneorgive) + " €");
      participant.earn = Math.abs(doneorgive);
      ParticipantsToPay.push(participant);
    }
  });

  console.log("\n\n-----> Who pay who game ! \n\n");

  ParticipantsToPick.forEach((participantToPick) => {
    let debt = participantToPick.debt;
    ParticipantsToPay.forEach((participantToPay) => {
      if (debt >= participantToPay.earn) {
        console.log(participantToPick.name + " \twill give  " + participantToPay.name + "\t " + participantToPay.earn + " €");
        debt = debt - participantToPay.earn;
        participantToPay.earn = 0;
      } else {
        console.log(participantToPick.name + " \twill give  " + participantToPay.name + "\t " + debt + " €");
        participantToPay.earn = participantToPay.earn - debt;
        debt = 0;
      }
    });
  });
};

shareThedime(budget, participants);
