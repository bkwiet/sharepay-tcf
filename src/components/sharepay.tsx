import React from "react";
import { Projects } from "../types/projects";
import { formatAmountForDisplay, CURRENCY } from "../utils/stripe";
import { Doughnut } from "react-chartjs-2";
import styles from "../../public/styles/Sharepay.module.css";
import { pathToFileURL } from "url";

type Props = {
  project: Projects;
};

type Particpant = {
  name: string;
  paiement: number;
  debt?: number;
  earn?: number;
};

export const ShareTheDime: React.FC<Props> = ({ project }) => {
  const nbParticipants = project.users.length;
  const initialShare = project.amount / nbParticipants;
  let actualShare = project.amount / nbParticipants;
  let totalPaiement = 0;

  const participants: Particpant[] = [];
  const participantsToPay: Particpant[] = [];
  const participantsToPick: Particpant[] = [];

  project.users.forEach((user) => {
    let paiement = 0;
    project.payments.forEach((payment) => (payment.user_idkey === user.user_idkey ? (paiement += payment.amount) : null));
    participants.push({ name: user.lastname, paiement });
    totalPaiement += paiement;
  });

  if (totalPaiement === project.amount) console.log("budget ok");
  else actualShare = totalPaiement / nbParticipants;

  participants.forEach((participant) => {
    const doneorgive = actualShare - participant.paiement;
    console.log("Sharepay", doneorgive);
    if (doneorgive >= 0) {
      participant.debt = doneorgive;
      participantsToPick.push(participant);
    } else {
      participant.earn = Math.abs(doneorgive);
      participantsToPay.push(participant);
    }
  });

  const data = {
    labels: participants.map((participant) => participant.name),
    datasets: [
      {
        data: participants.map((participant) => participant.paiement),
        backgroundColor: ["#2b2a2a", "#6c757d", "#5bbdf6", "#fd7e14", "#fd7e14", "#fd7e14"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#36A2DB", "#36A2CB", "#36A2AB"],
      },
    ],
  };

  return (
    <>
      <div className="row text-dark">
        <h6>⦿ Values of the shares</h6>
      </div>
      <div>
        <p className="col">
          Initial Share per participant : <span className="infoxmation">{formatAmountForDisplay(initialShare!, CURRENCY)} </span>
        </p>
      </div>
      <div>
        <p className="col">
          Actual Share per participant : <span className="infoxmation">{formatAmountForDisplay(actualShare!, CURRENCY)} </span>
        </p>
      </div>
      <div className="row text-dark">
        <h6>⦿ Participant(s) to refund</h6>
      </div>
      <div>
        {participantsToPay.map((participant) => {
          let html = <></>;
          if (participant.earn! > 0) {
            html = (
              <p className="col">
                <span className="infoxmation">
                  {participant.name} will receive {formatAmountForDisplay(participant.earn!, CURRENCY)}{" "}
                </span>
              </p>
            );
          }
          return html;
        })}
      </div>
      <div className="row text-dark">
        <h6>⦿ Participant(s) to debite</h6>
      </div>
      <div>
        {participantsToPick.map((participant) => {
          let html = <></>;
          if (participant.debt! > 0) {
            html = (
              <p className="col">
                <span className="infoxmation">
                  {participant.name} will pay {formatAmountForDisplay(participant.debt!, CURRENCY)}{" "}
                </span>
              </p>
            );
          }
          return html;
        })}
      </div>
      <div className="row text-dark">
        <h6>⦿ Distributions of money</h6>
      </div>

      <div>
        {participantsToPick.map((participantToPick) => {
          let debt = participantToPick.debt!;
          return participantsToPay.map((participantToPay) => {
            if (debt >= participantToPay.earn!) {
              let html = <></>;
              if (participantToPay.earn! > 0) {
                html = (
                  <p className="col">
                    <span className="infoxmation">
                      {participantToPick.name} will give {participantToPay.name}{" "}
                      {formatAmountForDisplay(participantToPay.earn!, CURRENCY)}{" "}
                    </span>
                  </p>
                );
              }
              debt = debt - participantToPay.earn!;
              participantToPay.earn = 0;
              return html;
            } else {
              let html = <></>;
              if (debt > 0) {
                html = (
                  <p className="col">
                    <span className="infoxmation">
                      {participantToPick.name} will give {participantToPay.name} {formatAmountForDisplay(debt!, CURRENCY)}{" "}
                    </span>
                  </p>
                );
              }
              participantToPay.earn = participantToPay.earn! - debt;
              debt = 0;
              return html;
            }
          });
        })}
      </div>

      <div className="row text-dark">
        <h6>⦿ Visual representation</h6>
      </div>

      <div className={styles.canvas}>
        <Doughnut data={data} height={200} width={200} />
      </div>
    </>
  );
};

export default ShareTheDime;
