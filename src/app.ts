import * as express from 'express';
import axios from 'axios';
import * as path from 'path';
import { checkDomain, getUser, getUserRepos } from './services';
import { Request, Response } from 'express'; // Add this import
const app = express();
const port = parseInt(process.env.PORT || '4000', 10);
import * as cors from 'cors';
import newTrainee, { getTraineeByUid } from './repositories';
import { log } from 'console';
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.get('/', async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// app.get('/get-repos', async (req: Request, res: Response) => {
//     let token = req.headers.authorization || "";
//     let user = await getUser(token);
//     log(user)
//     if (user) {
//         let { login } = user;
//         let repos = await getUserRepos(login, token);
//         res.json(user);
//     } else {
//         res.status(404).json({ error: 'User not found' });
//     }
// })


app.get("/check-domain", (req, res) => {
    let domain = req.query.domain as string
    domain = domain.replace(/^https?:\/\//, '');
    checkDomain(domain).then(r => {
        if (r) {
            res.sendStatus(200)
        } else {
            res.status(500).json({ error: 'Domain not found' });
        }
    })
})

app.post('/trainee', async (req, res) => {
    let token = req.body.token
    let domain = req.body.domain
    try {
        getUser(domain, token).then(async (user) => {
            return newTrainee(user, token).then(t => t).catch(err => {
                throw err
            })
        }).then((r) => res.status(201).json({ id: r?.uid }))
    } catch (error) {
        console.error('Error fetching Gitea data:', error);
        res.status(500).json({ error: 'Unable to fetch Gitea commits' });
    }
});

app.get('/api/get/trainee', async (req, res) => {
    let uid = req.query.id as string
    try {
        getTraineeByUid(uid).then((user) => {
            res.status(201).json({
                trainee: {
                    login: user?.login,
                    fullname: user?.full_name
                }
            })
        })
    } catch (error) {
        console.error('Error fetching Gitea data:', error);
        res.status(500).json({ error: 'Unable to fetch Gitea commits' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});
