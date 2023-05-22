import generator from '@/utils/generator'
import moment from 'moment'

const registerUserStudentDefaultForm = () => {
  return {
    name: generator.generateRandomName(),
    address: generator.generateRandomAddress(),
    dateOfBirth: moment('01-01-2001').toDate(),
    nation: 'Kinh',
    email: generator.generateEmail(),
    gender: 'MALE',
    identity: generator.generateRandomString(12),
    password: '123456',
    phone: generator.generateRandomString(10),
    userName: '',
    roles: ['STUDENT'],
  }
}
export { registerUserStudentDefaultForm }
