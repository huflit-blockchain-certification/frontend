import * as yup from 'yup'

export const registerUniversitySchema = yup.object().shape({
  name: yup.string().required('Tên không được để trống'),
  phone: yup.string().required('Số điện thoại không được để trống'),
  email: yup.string().email('Không đúng định dạng email').required('Email không được để trống'),
  gender: yup.string().required('Giới tính không được để trống'),
  address: yup.string().required('Địa chỉ không được để trống'),
  identity: yup
    .string()
    .matches(/^[0-9]{12}$/, 'CMND phải có 12 số')
    .required('CMND không được để trống'),
  userName: yup.string().required('Tên tài khoản không được để trông'),
  password: yup
    .string()
    .required('Mật khẩu không được để trống')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  roles: yup.array().min(1),
})
