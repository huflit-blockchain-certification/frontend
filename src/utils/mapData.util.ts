const mapUserData = async (data: any[], requestFn: any, cookies: any) => {
  if (!data?.length) return
  const mappedData = data.map((record) => {
    const roles = record?.roles
    if (roles && !Array.isArray(roles)) {
      record.roles = [roles]
    }
    return record
  })
  const response = await requestFn(mappedData, cookies.access_token)
  return response
}

export { mapUserData }
