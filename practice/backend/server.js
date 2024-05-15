import express from "express";
import cors from "cors"; 

const app = express();

app.use(cors());
// Set static folder
app.use(express.static('public'));
// Parse URL-encoded bodies(as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
// Parse JSON bodies(as sent by API clients)
app.use(express.json());

app.get('/hello', (req, res) => {
    res.send('Hello World!');
    // res.send('<div>Response from Server</div>');
});

app.get("/users", (req, res) => {
    const users = [
        {id: 1, name: 'John Doe'},
        {id: 2, name: 'Bob Williams'},
        {id: 3, name: 'Shannon Jackson'},
    ];
    res.send(`
      <h1 class="text-2xl font-bold my-4">Users</h1>
      <ul>
        ${users.map((user) => `<li>${user.name}</li>`).join('')}
      </ul>
    `)
});

app.use('/fetch', (req, res) => {
    setTimeout(async() => {
        const limit = +req.query.limit || 10;
        const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`);
        const users = await response.json();
        res.send(`
          <h1 class="text-2xl font-bold my-4">Users list</h1>
          <ul>
            ${users.map((user) => `<li>${user.name}</li>`).join('')}
          </ul>
        `);
    }, 2000);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));