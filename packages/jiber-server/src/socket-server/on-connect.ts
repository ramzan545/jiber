import { LOGIN_RESULT, INIT_SOCKET, get } from 'jiber-core'
import * as ws from 'ws'
import { ServerStore } from '../server-store'
import { onClose } from './on-close'
import { onMessage } from './on-message'
import { logger } from '../utils/logger'

/**
 * TODO: come up with a naming convention for sockets, websockets, and ws
 * TODO: errors thrown in this function are somehow silently swallowed
 * handles 'connect' socket event
 * adds some event listeners to the newly created socket
 * dispatches an event to add the socket to the store
 */
export const onConnect = (store: ServerStore, webSocket: ws, request: any) => {
  const state = store.getState()

  const socketId = get(request, 'headers.sec-websocket-key')
  if (!socketId) return

  const userId = get(state, `sockets.${socketId}.userId`)
  if (!userId) return

  const user = state.users[userId]

  // add listeners
  webSocket.on('message', (data) => onMessage(store, socketId, data.toString()))
  webSocket.on('close', () => onClose(store, socketId))
  webSocket.on('error', (err) => logger.error(err.message))

  // init socket
  const socketAction = { type: INIT_SOCKET, socketId, ws: webSocket }
  store.dispatch(socketAction)

  // send login result
  const action = { type: LOGIN_RESULT, user }
  store.socketServer.sendToSocket(socketId, action)
}
