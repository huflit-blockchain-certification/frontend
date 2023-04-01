import { CRUDInterface } from 'models'

export const afterActions = (crudOperation: CRUDInterface) => {
  return { create: crudOperation.create, edit: crudOperation.edit }
}
