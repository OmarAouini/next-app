
import {withAuthenticated} from './auth/authenticated_middleware';

export default withAuthenticated(function handler(req,res) {
    if (req.method !== 'POST') {
        return res.status(405).send("only POST allowed!")
    }

    return res.json("sei apposto, entra")
})