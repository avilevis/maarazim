import type {NextApiRequest, NextApiResponse} from 'next'
import {findAll} from "@/module/dao/db-access";
import {ItemInterface} from '@/intefaces/item.inteface'

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ItemInterface[]>
) {
    const requestMethod = req.method;

    if (requestMethod === 'GET') {
        const items = await findAll()
        return res.status(200).json(items)
    }

    return res.status(400).json({})
}