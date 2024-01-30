const express = require('express');
const app = express();
const port = 8081;
const knex = require('knex')(require('/Users/jacobschneider/projects/Z-prefix-App/Backend/knexfile.js')["development"]);
const cookieParser = require('cookie-parser');


app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.get('/', (req, res) => {
    res.send('Application running, Please Use an Endpoint For API discovery');
});


app.route('/userbase')
    .get((req, res) => {
        knex('userbase').select('*')
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err));
    })
    .post((req, res) => {
        knex('userbase').insert(req.body)
            .then(() => res.status(201).json('New user has been added.'))
            .catch(err => res.status(500).json(err));
    });

app.post('/userbase/verify', async (req, res) => {
    const { UserName, Password } = req.body;
    try {
        const verifyUser = await knex('userbase')
            .where({ UserName, Password }).first();
        if (!verifyUser) {
            return res.status(400).json({ error: 'Not Verified' });
        }
        res.json({ message: 'Successfully verified', userId: verifyUser.id });
    } catch (err) {
        res.status(500).json(err);
    }
});


app.route('/items')
    .get((req, res) => {
        knex('item').select('*')
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err));
    })
    .post((req, res) => {
        knex('item').insert(req.body)
            .then(() => res.status(201).json('New item has been added.'))
            .catch(err => res.status(500).json(err));
    });

app.route('/items/:id')
    .get((req, res) => {
        knex('item').where('id', req.params.id)
            .then(data => res.status(200).json(data))
            .catch(err => res.status(500).json(err));
    })
    .patch((req, res) => {
        knex('item').where('id', req.params.id).update(req.body)
            .then(() => res.json('Item has been updated.'))
            .catch(err => res.status(500).json(err));
    })
    .delete((req, res) => {
        knex('item').where('id', req.params.id).del()
            .then(() => res.json('Item has been deleted.'))
            .catch(err => res.status(500).json(err));
    });

app.get('/items/user/:userId', (req, res) => {
    knex('item').where('UserId', parseInt(req.params.userId, 10))
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err));
});


app.get('/cookie', (req, res) => {
    const userId = req.cookies.userId;
    if (userId) {
        res.status(200).json({ verified: true, userId: userId });
    } else {
        res.status(401).json({ verified: false });
    }
});


app.listen(port, () => {
    console.log('Knex and Express applications running successfully');
});
