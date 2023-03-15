import { registerDTO } from '@/DTO/User/register.dto.user'

const registerUserUniversityDefaultForm: registerDTO = {
  listUser: [
    {
      name: '',
      address: '',
      email: '',
      gender: 'OTHER',
      identity: '',
      password: '',
      phone: '0938131201',
      userName: '',
      roles: ['UNIVERSITY'],
    },
  ],
}

export { registerUserUniversityDefaultForm }
