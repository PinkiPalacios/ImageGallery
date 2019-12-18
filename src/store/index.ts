import { types, Instance, applyPatch } from 'mobx-state-tree'
import { ImageModel, ImageCollection } from './image'
import SessionModel from './session'
import { axiosService } from '../services/axios'

const StoreModel = types.model({
    session: types.optional(SessionModel, {}),
    imageCollection: types.optional(ImageCollection, {})
}).actions(self => ({
    bootstrap: async () => {
        axiosService.init()
        await self.session.init()
    }
}))

export type IStore = Instance<typeof StoreModel>

export default StoreModel
