import express from "express";

import { isAuthenticated } from './middlewares/isAuthenticated';

import { CreateUsercontroller } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCommentsController } from "./controllers/comments/CreateCommentsController";
import { DestroyCommentsController } from "./controllers/comments/DestroyCommentsController";
import { SearchAllCommentsController } from "./controllers/comments/SearchAllCommentsController";
import { SearchCommentsIdMoviesControllers } from "./controllers/comments/SearchCommentsIdMoviesControllers";

/* 
import { serve, setup } from "swagger-ui-express";
import * as swagger from "./swagger.json"; 
*/

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Express on Vercel");
});

//-- ROTAS USER --
router.post('/users', new CreateUsercontroller().handle);
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle);

//-- ROTAS COMMENTS --
router.post('/create/comment', new CreateCommentsController().handle);
router.delete('/destroy/comment/:idComment', new DestroyCommentsController().handle);
router.get('/search/comment', new SearchAllCommentsController().handle);
router.get('/search/comment/id', new SearchCommentsIdMoviesControllers().handle);

/* router.use("/docs", serve, setup(swagger)); */

export { router };
