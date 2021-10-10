export default function logout(req, res) {
    if (req.method !== "POST") {
        res.status(405).send("only POST allowed!")
    }
    
};
