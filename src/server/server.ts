import { app } from './../app';
import { loadControllers } from 'awilix-express';
import loadDependencies from './../container';

const PORT = process.env.PORT;

//Containers
loadDependencies(app);

//Controllers
app.use(loadControllers('../controllers/*.ts', { cwd : __dirname }));

app.get('/ping', (req, res) => {
    res.send("pong");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running in the port: ${PORT}`);
})