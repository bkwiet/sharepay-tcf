export type Projects = {
  idkey: string,
  name: string,
  summary: string,
  date_opened: string,
  date_ended: string,
  amount: number,
  admin_idkey: string,
  actif: boolean,
  user_projects: {
    user_idkey: string,
    firstname: string,
    lastname: string,
  }[],
  payments: {
    user_idkey: string,
    date_payment: string,
    summary: string,
    amount: number,
  }[]
}