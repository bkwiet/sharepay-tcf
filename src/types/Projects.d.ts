export type Projects = {
  name: string,
  summary: string,
  idkey: number,
  actif: boolean,
  amount: number,
  admin_idkey: number,
  date_opened: string,
  date_ended: string,
  users: {
    user_idkey: number,
    firstname: string,
    lastname: string,
  }[],
  payments: {
    user_idkey: number,
    date_payment: string,
    summary: string,
    amount: number,
  }[]
}