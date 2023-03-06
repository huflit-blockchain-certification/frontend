import { Input } from '@/components/common/Form/Input/Input'
import { LoginDTO } from '@/DTO/User/login.dto.user'
import { APP_NAME } from '@/dynamic'
import { FormLayout, MainLayout } from '@/layouts'
import { loginSchema } from '@/validation/User/login.user.validation'
import { yupResolver } from '@hookform/resolvers/yup'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { login } from './api/User/login.user.api'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { LoadingIndicator } from '@/components/common/LoadingIndicator/loadingIndicator'
import Button from '@mui/material/Button'

export interface LoginProps {}

export default function LoginPage(props: LoginProps) {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginDTO>({
    resolver: yupResolver(loginSchema),
    defaultValues: { userName: '', password: '' },
  })

  const onSubmit = (data: LoginDTO) => {
    login(data, () => {
      router.push('/')
      Swal.fire({ title: 'Login succesfully', icon: 'success' })
    })
  }

  if (isSubmitting) return <LoadingIndicator />

  return (
    <FormLayout disableHeader onSubmit={handleSubmit(onSubmit)}>
      <div className="flex h-screen">
        <div className="m-auto">
          <div className="flex flex-col gap-5 p-10 shadow w-96 rounded-lg hover:shadow-lg">
            <div className="text-center font-semibold text-2xl">{APP_NAME}</div>
            <div className="flex flex-col gap-3">
              <Input label="Tên đăng nhập" name="userName" control={control} required fullWidth />
              <Input label="Mật khẩu " name="password" control={control} required fullWidth />
            </div>
            <div className="m-auto">
              <Button type="submit" variant="outlined">
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FormLayout>
  )
}

LoginPage.Layout = MainLayout
