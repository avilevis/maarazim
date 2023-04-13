import type {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';
import {findAll} from "@/module/dao/db-access";
import {ItemInterface} from '@/intefaces/item.inteface'
import {onError, onNoMatch} from "@/module/error-handler";

const data: ItemInterface[] = [
    {
        id: "b1",
        image: '/box1.jpg',
        title: 'מארז ראשון',
        sub_title: 'מארז פסח קטן',
        info: 'מארז כייפי ואוהב למי שאיכפת לך ממנו',
        enable: true
    },
    {
        id: "b2",
        image: '/box2.jpg',
        title: 'מארז שני',
        sub_title: 'מארז פסח בינוני',
        info: 'מארז כייפי ואוהב למי שאיכפת לך ממנו',
        enable: true
    },
    {
        id: "b3",
        image: '/box3.jpg',
        title: 'מארז גדול',
        sub_title: 'מארז פסח גדול',
        info: 'מארז כייפי ואוהב למי שאיכפת לך ממנו',
        enable: true
    }
]

const handler = nextConnect({onError, onNoMatch})
    .get(async (req: NextApiRequest, res: NextApiResponse<ItemInterface[]>) => {
        const {'x-content-manager': contentManager} = req.headers
        const items = await findAll(contentManager as string)

        return res.status(200).json(items)
    })

export default handler;