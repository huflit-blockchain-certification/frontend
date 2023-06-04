import Generator from '@/utils/generator'
import { UserUniversity } from 'models'

const registerUserUniversityDefaultForm = (): UserUniversity => {
  return {
    name: Generator.generateRandomName(),
    address: Generator.generateRandomAddress(),
    email: Generator.generateEmail(),
    gender: 'OTHER',
    identity: Generator.generateRandomString(12),
    password: '123456',
    phone: Generator.generateRandomString(10),
    userName: '',
    roles: ['UNIVERSITY'],
  }
}

export { registerUserUniversityDefaultForm }
