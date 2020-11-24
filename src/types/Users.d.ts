export type Users = {
  user_idkey: string,
  firstname: string,
  lastname: string,
  email: string,
  rib: string,
  date_created : string,
  date_last_connect: string,
  date_last_payment: string,
  actif: boolean,
  projects: {
    idkey:string,
    name:string
  }[]
}