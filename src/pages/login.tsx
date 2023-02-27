import { Input } from '@/components/common/Form/Input/Input'
import { LoginDTO } from '@/DTO/User/login.dto.user'
import { APP_NAME } from '@/dynamic'
import { FormLayout, MainLayout } from '@/layouts'
import { loginSchema } from '@/validation/User/login.user.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'flowbite-react'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { login } from './api/User/login.user.api'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
export interface LoginProps {}

export default function LoginPage(props: LoginProps) {
  const router = useRouter()
  const { control, handleSubmit, reset } = useForm<LoginDTO>({
    resolver: yupResolver(loginSchema),
    defaultValues: { userName: '', password: '' },
  })

  const onSubmit = (data: LoginDTO) => {
    login(data, () => {
      router.push('/')
      Swal.fire({ title: 'Login succesfully', icon: 'success' })
    })
  }

  return (
    <FormLayout disableHeader onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="flex flex-col gap-5 p-10 shadow w-96 rounded-lg hover:shadow-lg">
            <div className="text-center font-semibold text-2xl">{APP_NAME}</div>
            <Input label="Tên đăng nhập" name="userName" control={control} required />
            <Input label="Mật khẩu " name="password" control={control} required />
            <div className="m-auto">
              <Button type="submit">Login</Button>
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  )
}

LoginPage.Layout = MainLayout
