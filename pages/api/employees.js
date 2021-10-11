
import {withAuthenticated} from './auth/authenticated_middleware';

export default withAuthenticated(function handler(req,res) {
    if (req.method !== 'POST') {
        res.status(405).send("only POST allowed!")
    }
})