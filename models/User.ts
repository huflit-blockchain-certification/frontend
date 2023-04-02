export interface User {
  userName: string
  password: string
  name: string
  email: string
  phone: string
  dateOfBirth?: Date | string
  gender: string
  nation?: string
  address: string
  identity: string
  roles: string[]
}
