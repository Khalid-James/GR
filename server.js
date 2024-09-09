const express = require('express');
const app = express();

app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// In-memory data
const users = [];
const posts = [];
const comments = [];

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Users routes
app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex !== -1) {
        users[userIndex] = req.body;
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex !== -1) {
        Object.assign(users[userIndex], req.body);
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
});

// Posts routes
app.get('/posts', (req, res) => {
    const { title } = req.query;
    if (title) {
        const filteredPosts = posts.filter(post => post.title.includes(title));
        res.json(filteredPosts);
    } else {
        res.json(posts);
    }
});

app.post('/posts', (req, res) => {
    const post = req.body;
    posts.push(post);
    res.status(201).json(post);
});

app.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id === parseInt(id));
    if (postIndex !== -1) {
        posts[postIndex] = req.body;
        res.json(posts[postIndex]);
    } else {
        res.status(404).send('Post not found');
    }
});

app.patch('/posts/:id', (req, res) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id === parseInt(id));
    if (postIndex !== -1) {
        Object.assign(posts[postIndex], req.body);
        res.json(posts[postIndex]);
    } else {
        res.status(404).send('Post not found');
    }
});

app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    const postIndex = posts.findIndex(p => p.id === parseInt(id));
    if (postIndex !== -1) {
        posts.splice(postIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Post not found');
    }
});

// Comments routes
app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.status(201).json(comment);
});

app.put('/comments/:id', (req, res) => {
    const { id } = req.params;
    const commentIndex = comments.findIndex(c => c.id === parseInt(id));
    if (commentIndex !== -1) {
        comments[commentIndex] = req.body;
        res.json(comments[commentIndex]);
    } else {
        res.status(404).send('Comment not found');
    }
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const commentIndex = comments.findIndex(c => c.id === parseInt(id));
    if (commentIndex !== -1) {
        Object.assign(comments[commentIndex], req.body);
        res.json(comments[commentIndex]);
    } else {
        res.status(404).send('Comment not found');
    }
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const commentIndex = comments.findIndex(c => c.id === parseInt(id));
    if (commentIndex !== -1) {
        comments.splice(commentIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Comment not found');
    }
});

// Route to render the view
app.get('/view', (req, res) => {
    res.render('index', { users, posts, comments });
});

// Middleware to handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
