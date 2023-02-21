import express from 'express';
import diagnose from '../services/diagnose';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diagnose.getEntries());
});


export default router;