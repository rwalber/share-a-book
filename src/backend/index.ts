import { app } from './app';
import mongoose from 'mongoose';

const url = "mongodb+srv://rwalber:c2hhcmUtYS1ib29rLXJ3YWxiZXI=@share-a-book.paucy.mongodb.net/share-a-book";

mongoose.connect( url, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
});

app.get('/', (request, response) => {
    response.json({ OK: true })
});

app.listen(3000, () => {
    console.log("Server started on port 3000 ")
})