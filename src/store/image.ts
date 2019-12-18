import { types, flow, Instance } from 'mobx-state-tree'
import { getImages } from '../api/images'

export const ImageModel = types.model({
    id: types.identifier,
    cropped_picture: types.string
})
export type IImageModel = Instance<typeof ImageModel>

export const ImageCollection = types.model({
    hasMore: types.optional(types.boolean, true),
    page: types.optional(types.number, 1),
    pictures: types.optional(types.array(ImageModel), []),
    loading: types.optional(types.boolean, false)
}).actions(self => ({
    fetchImages: flow(function* () {
        self.loading = true
        const { hasMore, page, pictures } = yield getImages()
        self.page = page
        self.hasMore = hasMore
        self.pictures = pictures
        self.loading = false
    })
})).views(self => ({
    get pairedPictures() {
        return self.pictures.reduce(function (result, value, index, array) {
            if (index % 2 === 0)
                result.push(array.slice(index, index + 2));
            return result;
        }, []);
    }
}))