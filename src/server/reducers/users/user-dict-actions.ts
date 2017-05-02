import { USER_REMOVE } from './user-dict-action-types'
import { Action } from '../../../core/index'

export function userRemove (userId: String): Action {
  return { type: USER_REMOVE, id: userId }
}
