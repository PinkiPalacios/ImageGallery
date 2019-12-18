import { types, flow, Instance, applyPatch } from 'mobx-state-tree'
import { getImages, getImageById } from '../api/images'

export const ImageModel = types.model({
    id: types.identifier,
    cropped_picture: types.string,
    author: types.maybeNull(types.string),
    camera: types.maybeNull(types.string),
    full_picture: types.maybeNull(types.string),
})
export type IImageModel = Instance<typeof ImageModel>



export const ImageCollection = types.model({
    hasMore: types.optional(types.boolean, true),
    page: types.optional(types.number, 0),
    pictures: types.optional(types.array(ImageModel), []),
    loading: types.optional(types.boolean, false)
}).actions(self => ({
    fetchImages: flow(function* () {

        self.loading = true
        const { hasMore, page, pictures } = yield getImages(self.page && self.page + 1)
        self.page = page
        self.hasMore = hasMore
        pictures.forEach((newPic) => {
            if (!self.pictures.find(pic => pic.id === newPic.id))
                self.pictures.push(newPic)
        })
        self.loading = false

    }),
    fetchImageById: flow(function* (id) {
        self.loading = true
        const image = yield getImageById(id)
        const index = self.pictures.findIndex(p => p.id === image.id)
        self.pictures[index] = image
        self.loading = false

    })
})).views(self => ({
    get pairedPictures() {
        return self.pictures.reduce(function (result, value, index, array) {
            if (index % 2 === 0)
                result.push(array.slice(index, index + 2));
            return result;
        }, []);
    },
    getPicture: (id) => {
        const picture = self.pictures.find(p => p.id === id)
        return picture
    }
}))