export type Projects = {
  idkey: number,
  name: string,
  summary: string,
  date_opened: string,
  date_ended: string,
  amount: number,
  admin_idkey: number,
  actif: boolean,
  user_projects: {
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