import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  userName: yup.string().required('Tên đăng nhập không được để trống').min(9).trim(),
  password: yup.string().required('Mật khẩu không được để trống').trim(),
})
