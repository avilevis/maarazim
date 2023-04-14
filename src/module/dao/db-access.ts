import {items} from '../db/local-db'
import {NotExist, AlreadyExist} from "@/module/dao/errors";

async function findItemById(id: string) {
    return items.findOne({id: id})
}

export async function findAll(contentManager: string | undefined) {
    const filter = contentManager ? {} : {enable: {$eq: true}}
    return items.find(filter)
}

export function addItem(id: string, item: object) {
    return findItemById(id).then((doc) => {
        if (doc) {
            throw new AlreadyExist('item with this id already exist.')
        }
        return items.create({...item, id: id}).save();
    })
}

export function updateItem(id: string, item: object) {
    return findItemById(id).then((doc) => {
        if (!doc) {
            throw new NotExist(`item with id ${id} do not exist.`)
        }
        return items.update({id: id}, {...item}).save();
    })
}

export function removeItem(id: string) {
    return findItemById(id).then((doc) => {
        if (!doc) {
            throw new NotExist(`item with id ${id} do not exist.`)
        }
        return items.remove({_id: doc._id});
    })
}