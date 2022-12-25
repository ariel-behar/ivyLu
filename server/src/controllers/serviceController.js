const router = require('express').Router();

const serviceServices = require('../services/serviceServices')

router.get('/', async (req,res) => {
    try {
        let services = await serviceServices.getAll();
        
        res.json(services)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.post('/create', async (req, res) => {
    let { title, description, additionalComments, imgUrl, price, duration, creatorId } = req.body;

    try {
        let serviceExists = await serviceServices.getOneByTitle(title);
        
        if(serviceExists){
            throw res.status(500).json({message: "A service with this Title already exists"})
        } else {
            try {
                let serviceCreateResponse = await serviceServices.create({ title, description, additionalComments, imgUrl, price, duration, creatorId });
        
                if (serviceCreateResponse) {
                    let service = {
                        serviceId: serviceCreateResponse._id,
                        title: serviceCreateResponse.title,
                        description: serviceCreateResponse.description,
                        additionalComments: serviceCreateResponse.additionalComments,
                        imgUrl: serviceCreateResponse.imgUrl,
                        price: serviceCreateResponse.price,
                        duration: serviceCreateResponse.duration
                    };
        
                    res.json(service);
                }
            } catch(err) {
                res.status(500).json(err)
            }
        }
    } catch (err) {
        res.json(err.message)
    }
})


module.exports = router;