import { ClientSettings } from './interfaces/client-settings'
import { patcher, patcherActionCreators } from 'jiber-core'

/**
 * Default settings
 */
export const defaultClientSettings: ClientSettings = {
  reducer: patcher,
  middleware: [],
  url: undefined,
  stunServers: ['stun:stun.jiber.io'],
  credential: undefined,
  initialState: undefined,
  backoffMs: 5000,
  actionCreators: patcherActionCreators,
  maxPeers: 10
}
