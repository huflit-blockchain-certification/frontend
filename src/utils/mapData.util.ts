import { errorMessage } from '@/components/common/Toast/response.toast.component'

const mapUserData = async (data: any[], requestFn: any, cookies: string) => {
  try {
    if (!data?.length) return
    const mappedData = data.map((record) => {
      const roles = record?.roles
      if (roles && !Array.isArray(roles)) {
        record.roles = [roles]
      }
      return record
    })
    const response = await requestFn({ data: mappedData, accessToken: cookies })
    return response
  } catch (err: any) {
    errorMessage(err.message)
  }
}

export { mapUserData }
