import { registerDTO } from '@/DTO/User/register.dto.user'
import moment from 'moment'

const registerUserStudentDefaultForm: registerDTO = {
  listUser: [
    {
      name: '',
      address: '',
      dateOfBirth: moment('01-01-2001').toDate(),
      nation: 'Vietnam',
      email: '',
      gender: 'MALE',
      identity: '',
      password: '',
      phone: '',
      userName: '',
      roles: ['STUDENT'],
    },
  ],
}

export { registerUserStudentDefaultForm }
