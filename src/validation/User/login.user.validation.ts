import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  userName: yup.string().required('Tên đăng nhập không được để trống'),
  password: yup.string().required('Mật khẩu không được để trống'),
})
