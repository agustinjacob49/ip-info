import { app } from './../app';
import { loadControllers } from 'awilix-express';
import loadDependencies from './../container';
import { SingletonDB } from '../common/db';
import express from 'express';

const PORT = process.env.PORT;

try {
    SingletonDB.getInstance();
} catch (err) {
    console.log(err);
}

app.use(express.json());

app.use((req, res, next) => {
    const cacheTime = 120;
    res.set({
      'Cache-Control': `max-age=${cacheTime}`
    });
    next();
});

//Services IOC
loadDependencies(app);

//Controllers IOC
app.use(loadControllers('../controllers/*.ts', { cwd: __dirname }));

app.get('/ping', (req, res) => {
    res.send("pong");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running in the port: ${PORT}`);
})