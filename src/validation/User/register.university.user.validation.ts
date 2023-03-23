import * as yup from 'yup'

export const registerUniversitySchema = yup.object().shape({
  // name: yup.string().required('Tên không được để trống'),
  phone: yup.string().required('Số điện thoại không được để trống'),
  // email: yup.string().email('Không đúng định dạng email').required('Email không được để trống'),
  gender: yup.string().required('Giới tính không được để trống'),
  address: yup.string().required('Địa chỉ không được để trống'),
  // identity: yup.string().required('CMND không được để trống'),
  // password: yup.string().required('Mật khẩu không được để trống'),
  roles: yup.array().min(1),
})
