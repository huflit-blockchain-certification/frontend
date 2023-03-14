import { registerDTO } from '@/DTO/User/register.dto.user'

const registerUserUniversityDefaultForm: registerDTO = {
  listUser: [
    {
      name: 'longshaww',
      address: '219 Âu Dương Lân Phường 2 Quận 8',
      // dateOfBirth: moment('12-13-2001').toDate(),
      // nation: 'Vietnam',
      email: 'at400123@gmail.com',
      gender: 'OTHER',
      identity: '100011109110',
      password: 'Shadoww123',
      phone: '0938131201',
      userName: '100011109110',
      roles: ['UNIVERSITY'],
    },
  ],
}

export { registerUserUniversityDefaultForm }
