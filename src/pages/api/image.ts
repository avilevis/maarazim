import type {NextApiRequest, NextApiResponse} from 'next'
import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({
    storage: multer.diskStorage({
        destination: './public/uploads',
        filename: (req, file: { originalname: any; }, cb: (arg0: null, arg1: any) => any) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
        res.status(501).json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
});

apiRoute.use(upload.single('photo'));
apiRoute.post((req, res) => {
    const {file} = req
    res.status(200).json({data: 'success', filePath: file.path});
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, consume as stream
    },
};
