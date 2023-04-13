import {NextApiRequest, NextApiResponse} from "next";
import {addItem, updateItem, removeItem} from "@/module/dao/db-access";
import {NotExist, AlreadyExist} from "@/module/dao/errors";
import nextConnect from "next-connect";
import {onError, onNoMatch} from "@/module/error-handler";

function onDBError(err, req, res, next) {
    if (err as NotExist || err as AlreadyExist) {
        return res.status(err.status).json({error: err.message})
    }

    return onError(err, req, res, next)
}

const handler = nextConnect({onDBError, onNoMatch})
    .post(async (req: NextApiRequest, res: NextApiResponse) => {
        const {id, ...item} = req.body;
        const newItem = await addItem(id, item)

        return res.status(201).json(newItem)
    })
    .put(async (req: NextApiRequest, res: NextApiResponse) => {
        const {id, ...item} = req.body;
        const existItem = await updateItem(id, item)

        return res.status(200).json(existItem)
    })
    .delete(async (req: NextApiRequest, res: NextApiResponse) => {
        const {id} = req.body;

        await removeItem(id)
        return res.status(200).json({})
    });

export default handler;