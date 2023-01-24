import express from 'express'
const app = express();
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';

const port = process.env.PORT || 8080;

import dbConnect from './database/dbConnect.js';

import { router as adminRouter } from './routes/Admin.routes.js'
import { router as authRouter } from './routes/Auth.routes.js'
import { router as articlesRouter } from './routes/Articles.routes.js'
import { router as postsRouter } from './routes/Posts.routes.js'
import { router as commentsRouter } from './routes/Comments.routes.js'
import { router as dashboardRouter } from './routes/Dashboard.routes.js'
import { router as userRouter } from './routes/Users.routes.js'
import { router as charitieRouter } from './routes/Charitie.routes.js'

const __dirname = path.resolve();

dotenv.config();

app.use(helmet());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/admin', adminRouter );
app.use('/api/auth', authRouter );
app.use('/api/data', dashboardRouter );
app.use('/api/articles', articlesRouter );
app.use('/api/posts', postsRouter );
app.use('/api/comments', commentsRouter );
app.use('/api/users', userRouter );
app.use('/api/charities', charitieRouter );

dbConnect();

app.get('/', (req, res) => res.send('The server is healthy '))

app.listen(port, (req, res) => {
  
  /*var request = url.parse(req.url, true);
  var action = request.pathname;
  // Path Refinements
  var filePath = path.join(__dirname,action).split("%20").join(" ");

  fs.exists(filePath, function (exists) {

    if (!exists) {
      res.writeHead(404, {
          "Content-Type": "text/plain" });
      res.end("404 Not Found");
      return;
    }

    // Extracting file extension
    var ext = path.extname(action);

    // Setting default Content-Type
    var contentType = "text/plain";

    // Checking if the extension of
    // image is '.png'
    if (ext === ".png" || ext === ".jpg" || ext === "jpeg" || ext === ".bmp") {
        contentType = "image/png";
    }

    // Setting the headers
    res.writeHead(200, {
        "Content-Type": contentType });

    // Reading the file
    fs.readFile(filePath,
      function (err, content) {
          // Serving the image
          res.end(content);
      }
    );
  });*/
  console.log(`Server is running on port ${port}!`)
})