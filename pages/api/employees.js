
import {authenticated} from './auth/authenticated_middleware';

export default authenticated(function handler(req,res) {
    if (req.method !== 'POST') {
        res.status(405).send("only POST allowed!")
    }
})