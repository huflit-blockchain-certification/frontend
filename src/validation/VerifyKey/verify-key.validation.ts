import * as yup from 'yup'

const verifyKeySchema = yup.object().shape({
  name: yup
    .string()
    .required('Tên không được để trống')
    .min(3)
    .max(50)
    .matches(/^[a-zA-Z ]+$/),
  identity: yup
    .string()
    .required('CMND không được để trống')
    .matches(/^[0-9]{12}$/, 'CMND phải có 12 số'),
  key: yup
    .string()
    .required('Mã không được để trống')
    .matches(/^[0-9]{10}$/, 'Mã phải có 9 số'),
})

export { verifyKeySchema }
