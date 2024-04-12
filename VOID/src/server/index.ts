import Express from "express";
import { router } from './router'
import parser from "body-parser";
import { userRouter } from "../controllers/userController"
import { postsRouter } from "../controllers/postsController";

const server = Express()
const json = parser.json()

server.use(json)
server.use(router);


router.use(userRouter);
router.use(postsRouter)

export { router };

server.listen(3000, () => {
    console.log('Server Running on http://127.0.0.1:3000');
})