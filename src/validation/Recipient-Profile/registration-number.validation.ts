import * as yup from 'yup'

const registrationNumberSchema = yup.object().shape({
  idDAC: yup.string().required('Số vào sổ không được để trống'),
  registrationNumber: yup.string().required('Số hiệu không được để trống'),
})

export { registrationNumberSchema }
