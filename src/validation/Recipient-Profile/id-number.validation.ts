import * as yup from 'yup'

const IDNumberSchema = yup.object().shape({
  _id: yup.string().required('Số vào sổ không được để trống'),
  idNumber: yup.string().required('Số idNumber không được để trống'),
})

export { IDNumberSchema }
