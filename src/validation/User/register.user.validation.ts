import * as yup from 'yup'

const userSchema = yup.object().shape({
  name: yup.string().required('Tên không được để trống'),
  phone: yup.string().required('Số điện thoại không được để trống'),
  email: yup.string().email('Không đúng định dạng email').required('Email không được để trống'),
  gender: yup.string().required('Giới tính không được để trống'),
  nation: yup.string().required('Quốc tịch không được để trống'),
  address: yup.string().required('Địa chỉ không được để trống'),
  identity: yup.string().required('CMND không được để trống'),
  dateOfBirth: yup.date().required('Ngày sinh không được để trống'),
  userName: yup.string().required('Tên đăng nhập không được để trống'),
  password: yup.string().required('Mật khẩu không được để trống'),
})

export const registerSchema = yup.object().shape({
  listUser: yup.array().of(userSchema).min(1),
})
