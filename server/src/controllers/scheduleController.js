import {Router} from 'express'

const router = Router();

router.post('/add', (req, res) => {
    console.log(req.body)

    try{

    } catch(err) {
        console.log(err);
    }
})


export default router;