import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
    user:'postgres',
    password:'password',
    host:'localhost',
    database:'BookCollection',
    port:5432
});
db.connect();
let sortBy;

app.use(bodyParser.urlencoded({limit:'1mb',extended:true}));
app.use(express.static('public'));

app.get('/',async (req,res)=>{
    try {
        let books=[];
        switch (sortBy) {
            case 'title':
                books = await db.query("SELECT * FROM book_list ORDER BY title ASC;");
                
                break;
            case 'date':
                books = await db.query("SELECT * FROM book_list ORDER BY title ASC;");
                
                break;
            case 'rating':
                books = await db.query("SELECT * FROM book_list ORDER BY title ASC;");
                
                break;
        
            default: books = await db.query("SELECT * FROM book_list;");
                break;
        }
        res.render('index.ejs',{books:books.rows});
    } catch (error) {
        console.log(error.message);   
    }
    
});

app.get('/add', (req,res)=>{
    res.render('modify.ejs');
});

app.get('/edit/:id', async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const book = await db.query("SELECT * FROM book_list WHERE id = $1",[id]);
        res.render('modify.ejs',{book:book.rows[0]});
    } catch (error) {
        console.log(error.message);
    }
});

app.post('/new', async (req,res)=>{
    try {
    const title = req.body.title;
    const author = req.body.author;
    const review = req.body.review;
    const notes = req.body.notes;
    const rating = req.body.rating;
    const date = req.body.date;
    const ISBN = req.body.ISBN;
    console.log(req.body)
    await db.query("INSERT INTO book_list(title,author,date,rating,review,notes,ISBN) VALUES ($1,$2,$3,$4,$5,$6,$7)",[title,author,date,rating,review,notes,ISBN]);
    res.redirect('/');
} catch (error) {
       console.log(error.message); 
}
});

app.post('/save/:id', async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        console.log(id);
        const books = await db.query("SELECT * FROM book_list WHERE id = $1",[id]);
        const book = books.rows[0];
        const title = req.body.title || book.title;
        const author = req.body.author || book.author;
        const review = req.body.review || book.review;
        const notes = req.body.notes || book.notes;
        const rating = req.body.rating || book.rating;
        const date = req.body.date || book.date;
        const ISBN = req.body.isbn || book.isbn;
        console.log(req.body);
        await db.query("UPDATE book_list SET title = $1, author = $2, date = $3, rating = $4, review = $5, notes = $6, isbn = $7 WHERE id = $8",[title,author,date,rating,review,notes,ISBN,id]);
        res.redirect('/');
    } catch (error) {
           console.log(error.message); 
    }
});

app.get('/sortbyname',async(req,res)=>{
    try{
    sortBy='title';
    res.redirect("/");
    } catch(error){console.log(error.message)}
});

app.get('/sortbydate',async(req,res)=>{
    try {
        sortBy = 'date';
        res.redirect("/");
    } catch (error) {
        console.log(error.message);
    }
});

app.get('/sortbyrate',async (req,res)=>{
    try {
        sortBy = 'rating';
        res.redirect('/');
    }catch (error) {
       console.log(error.message); 
    }
});

app.get('/delete/:id',async (req,res)=>{
    try{
        const id = parseInt(req.params.id);
        await db.query("DELETE FROM book_list WHERE id = $1",[id]);
        res.redirect('/');
    } catch (error){
        console.log(error.message);
    }
})

app.get('/book/:id',async (req,res)=>{
    try {
        const id = parseInt(req.params.id);
        const book = await db.query("SELECT * FROM book_list WHERE id = $1",[id]);
        res.render('book.ejs',{book:book.rows[0]});
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(port, ()=>{
    console.log(`Server listening at port ${port}`);
});