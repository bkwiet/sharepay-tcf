export type Users = {
  name:string,
  email: string,
  createdAt: Date,
  updatedAt: Date, 
  user_idkey: number,
  firstname: string,
  lastname: string,
  rib: string,
  date_created : string,
  date_last_connect: string,
  date_last_payment: string,
  actif: boolean,
  projects: {
    idkey:number,
    name:string
  }[]
}