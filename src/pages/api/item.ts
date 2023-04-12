import {NextApiRequest, NextApiResponse} from "next";
import {addItem, updateItem, removeItem} from "@/module/dao/db-access";
import {NotExist, AlreadyExist} from "@/module/dao/errors";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const requestMethod = req.method;
    const {id, ...item} = req.body;
    try {
        let newItem

        switch (requestMethod) {
            case 'POST':
                newItem = await addItem(id, item)

                return res.status(201).json(newItem)

            case 'PUT':
                newItem = await updateItem(id, item)

                return res.status(200).json(newItem)

            case 'DELETE':
                await removeItem(id)
                return res.status(200).json({})

            default:
                res.status(200).json({})
        }
    } catch (e) {
        if (e as NotExist || e as AlreadyExist) {
            return res.status(e.status).json({error: e.message})
        }
        res.status(500).json({error: e.message})
    }
}