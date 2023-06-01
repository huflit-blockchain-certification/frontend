export interface UserStudent {
  userName: string
  password: string
  name: string
  email: string
  phone: string
  dateOfBirth: Date | string
  gender: string
  nation?: string
  address: string
  identity: string
  roles: string[]
}

export interface UserUniversity {
  name: string
  address: string
  email: string
  gender: string
  identity: string
  password: string
  phone: string
  userName: string
  roles: string[]
}
