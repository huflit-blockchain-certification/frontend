import { registerDTO } from '@/DTO/User/register.dto.user'

const registerDefaultForm: registerDTO = {
  listUser: [
    {
      name: '',
      address: '',
      dateOfBirth: new Date(),
      email: '',
      gender: 'OTHER',
      identity: '',
      nation: '',
      password: '',
      phone: '',
      userName: '',
    },
  ],
  roles: ['UNIVERSITY'],
}

export { registerDefaultForm }
