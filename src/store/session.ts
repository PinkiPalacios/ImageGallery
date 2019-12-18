import { types, flow, Instance } from 'mobx-state-tree'
import { auth } from '../api/auth'
import axios from 'axios'
const SessionModel = types.model({
    token: types.maybeNull(types.string)
}).actions(self => ({
    fetchToken: flow(function* () {
        const token = yield auth()
        self.token = token
        console.log('ESTE', self)
    },
    )
})).actions(self => ({
    init: flow(function* () {
        yield self.fetchToken()
        axios.defaults.headers.Authorization = `Bearer ${self.token}`
    })
}))

export type ISessionModel = Instance<typeof SessionModel>
export default SessionModel