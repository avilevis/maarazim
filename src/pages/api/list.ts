import type {NextApiRequest, NextApiResponse} from 'next'
import {ItemInterface} from '@/intefaces/item.inteface'

const data = [
    {
        id: "b1",
        image: '/box1.jpg',
        title: 'מארז ראשון',
        sub_title: 'מארז פסח קטן',
        text: 'מארז כייפי ואוהב למי שאיכפת לך ממנו'
    },
    {
        id: "b2",
        image: '/box2.jpg',
        title: 'מארז שני',
        sub_title: 'מארז פסח בינוני',
        text: 'מארז כייפי ואוהב למי שאיכפת לך ממנו'
    },
    {
        id: "b3",
        image: '/box3.jpg',
        title: 'מארז גדול',
        sub_title: 'מארז פסח גדול',
        text: 'מארז כייפי ואוהב למי שאיכפת לך ממנו'
    }
]

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ItemInterface[]>
) {
    res.status(200).json(data)
}