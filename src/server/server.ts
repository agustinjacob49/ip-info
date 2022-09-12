import { app } from './../app';

const PORT = process.env.PORT;

app.get('/ping', (req, res) => {
    res.send("pong");
})

app.listen(process.env.PORT, () => {
    console.log(`Server running in the port: ${PORT}`);
})