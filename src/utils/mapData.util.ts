import { errorMessage } from '@/components/common/Toast/response.toast.component'
import { UNIVERSITY_ROLE, excelKeysMapping } from '@/constants'

interface MapExcelData {
  data: any
  requestFn: any
  cookies: string
  roles?: string[]
  idParam?: string | string[]
  useAlternativeKey?: boolean
}
const MapData = {
  mapExcelData: async ({
    data,
    requestFn,
    cookies,
    roles,
    idParam,
    useAlternativeKey,
  }: MapExcelData) => {
    try {
      if (!data?.length) return
      const mappedData = data.map((record: any) => {
        const updatedObject: any = {}

        for (const key in record) {
          if (record.hasOwnProperty(key)) {
            const uniExcelKey = excelKeysMapping.find((item) => item.vn === key)
            if (uniExcelKey) {
              if (uniExcelKey.alternativeKey && useAlternativeKey) {
                updatedObject[uniExcelKey.alternativeKey] = record[key]
              } else {
                updatedObject[uniExcelKey.en] = record[key]
              }
            }
          }
        }
        //Custom for UNI and Student
        if (roles && roles.includes(UNIVERSITY_ROLE)) {
          updatedObject.gender = 'OTHER'
        }
        if (roles) {
          updatedObject.roles = roles
        }
        return updatedObject
      })
      const response = await requestFn({ data: mappedData, accessToken: cookies, idParam })
      return response
    } catch (err: any) {
      throw new Error(err.message)
    }
  },
}

export { MapData }
