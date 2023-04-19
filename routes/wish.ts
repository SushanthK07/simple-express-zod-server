import { Request, Response } from "express";

const router = require('express').Router();

router.get('/', (req: Request, res: Response) => {
    res.send("Hello " + req.query.name);
});

router.post('/', (req: Request, res: Response) => {
    res.send("Hello " + req.body.names.join(", "));
});

module.exports = router;
