
export default function login(req, res) {
    if (req.method !== "POST") {
        res.status(405).send("only POST allowed!")
    }

    console.log(req.body);
    res.send("ok")
};
