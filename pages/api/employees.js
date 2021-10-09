
export default function handler(req,res) {
    if (req.method !== 'POST') {
        res.status(405).send("only POST allowed!")
    }
}