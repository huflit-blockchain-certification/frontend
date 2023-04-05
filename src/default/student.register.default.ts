import moment from 'moment'

const registerUserStudentDefaultForm: any = {
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
}

export { registerUserStudentDefaultForm }
