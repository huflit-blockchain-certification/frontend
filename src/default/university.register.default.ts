import generator from '@/utils/generator'

const registerUserUniversityDefaultForm = () => {
  return {
    name: generator.generateRandomName(),
    address: generator.generateRandomAddress(),
    email: generator.generateEmail(),
    gender: 'OTHER',
    identity: generator.generateRandomString(12),
    password: '123456',
    phone: generator.generateRandomString(10),
    userName: '',
    roles: ['UNIVERSITY'],
  }
}

export { registerUserUniversityDefaultForm }
