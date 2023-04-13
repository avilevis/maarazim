import type {NextApiRequest, NextApiResponse} from 'next'
import nextConnect from 'next-connect';
import {onError, onNoMatch} from "@/module/error-handler";
import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file: { originalname: any; }, cb: (arg0: null, arg1: any) => any) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({onError, onNoMatch})
    .use(upload.single('photo'))
    .post((req: NextApiRequest, res: NextApiResponse) => {
        const {file} = req
        res.status(200).json({data: 'success', filePath: file.path});
    });

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
