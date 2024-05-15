import express from "express";

const app = express();

// Set static folder
app.use(express.static('public'));
// Parse URL-encoded bodies(as sent by HTML forms)
app.use(express.urlencoded({extended: true}));
// Parse JSON bodies(as sent by API clients)
app.use(express.json());

// Handle GET request to fetch users
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

app.post('/convert', (req, res) => {
    setTimeout(() => {
        const fahrenheit = parseFloat(req.body.fahrenheit);
        const celsius = (fahrenheit-32)*(5/9);

        res.send(`
        <p>${fahrenheit} degrees Fahrenheit is equal to ${celsius.toFixed(2)} degrees Celsius
        </p>
        `)
    }, 2000);
});

let counter=0;
app.get('/polling', (req,res) => {
    counter++;
    const data = {Timer: counter};
    res.json(data);
});

let isVisible = false;
app.get('/toggle-visibility', (req, res) => {
    isVisible = !isVisible;
    res.send(isVisible ? 'Good' : 'Afternoon');
});

const contacts = [
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Doe', email: 'jane@example.com' },
    { name: 'Alice Smith', email: 'alice@example.com' },
    { name: 'Bob Williams', email: 'bob@example.com' },
    { name: 'Mary Harris', email: 'mary@example.com' },
    { name: 'David Mitchell', email: 'david@example.com' },
  ];
app.post('/search', (req,res) => {
    const searchTerm = req.body.search.toLowerCase();

  if (!searchTerm) {
    return res.send('<tr></tr>');
  }

  const searchResults = contacts.filter((contact) => {
    const name = contact.name.toLowerCase();
    const email = contact.email.toLowerCase();

    return name.includes(searchTerm) || email.includes(searchTerm);
    });

    setTimeout(() => {
        const searchResultHtml = searchResults
          .map(
            (contact) => `
          <tr>
            <td><div class="my-4 p-2">${contact.name}</div></td>
            <td><div class="my-4 p-2">${contact.email}</div></td>
          </tr>
        `
          )
          .join('');
    
        res.send(searchResultHtml);
      }, 1000);
});

// Start the server
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});