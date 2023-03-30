import * as yup from 'yup'

const registerStudentSchema = yup.object().shape({
  name: yup.string().required('Tên không được để trống'),
  phone: yup.string().required('Số điện thoại không được để trống'),
  gender: yup.string().required('Giới tính không được để trống'),
  address: yup.string().required('Địa chỉ không được để trống'),
  email: yup.string().email('Không đúng định dạng email').required('Email không được để trống'),
  identity: yup.string().required('CMND không được để trống'),
  password: yup.string().required('Mật khẩu không được để trống'),
  nation: yup.string().required('Quốc tịch không được để trống'),
  dateOfBirth: yup.date().required('Ngày sinh không được để trống'),
  userName: yup.string().oneOf([yup.ref('identity')], 'Tên tài khoản không khớp với CMND'),
  roles: yup.array().min(1),
})

const editStudentSchema = yup.object().shape({
  //Edit student there is no fields name email identity password
  phone: yup.string().required('Số điện thoại không được để trống'),
  gender: yup.string().required('Giới tính không được để trống'),
  address: yup.string().required('Địa chỉ không được để trống'),
  nation: yup.string().required('Quốc tịch không được để trống'),
  dateOfBirth: yup.date().required('Ngày sinh không được để trống'),
  userName: yup.string().oneOf([yup.ref('identity')], 'Tên tài khoản không khớp với CMND'),
  roles: yup.array().min(1),
})

export { registerStudentSchema, editStudentSchema }
