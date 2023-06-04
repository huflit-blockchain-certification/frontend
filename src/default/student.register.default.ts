import Generator from '@/utils/generator'
import { UserStudent } from 'models'
import moment from 'moment'

const registerUserStudentDefaultForm = (): UserStudent => {
  return {
    name: Generator.generateRandomName(),
    address: Generator.generateRandomAddress(),
    dateOfBirth: moment('01-01-2001').toDate(),
    nation: 'Kinh',
    email: Generator.generateEmail(),
    gender: 'MALE',
    identity: Generator.generateRandomString(12),
    password: '123456',
    phone: Generator.generateRandomString(10),
    userName: '',
    roles: ['STUDENT'],
  }
}
export { registerUserStudentDefaultForm }
