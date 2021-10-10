export default function signup(params) {
    if (req.method !== "POST") {
        res.status(405).send("only POST allowed!")
    }

};
