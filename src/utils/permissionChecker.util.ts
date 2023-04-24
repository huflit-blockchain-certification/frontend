export const isAllowAccess = (requireRoles: string[], userRoles: string[] | undefined) => {
  if (!userRoles) return
  return userRoles.every((r) => requireRoles?.includes(r))
}
