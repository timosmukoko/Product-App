# Full Stack Product Management Application

This project is a full-stack product management system featuring:
- A **Ruby on Rails API backend**
- A **React.js client frontend** (dynamic, interactive)
- A **Static HTML/CSS/JS client frontend** (lightweight version)

All three parts are organized inside this single repository for easier deployment and maintenance.

---

## Project Structure

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/timosmukoko/Product-App.git
cd your-project-repo

2. Backend Setup (Ruby on Rails API)
cd product_app
bundle install
rails db:create
rails db:migrate
rails db:seed   # (Optional) if you have seed data
rails server -p 3000
API base URL will be: http://localhost:3000/

3. React Client Setup
cd product-app-client
npm install
npm run build

This creates a production-ready React app inside /build.

For local development: use npm start (runs on http://localhost:3001/ by default).

4. Static HTML Client Setup
cd product-html-client
Open index.html directly in the browser

✅ Testing (Unit + Integration)
Unit Tests
Backend:

Rails uses RSpec or Minitest for models and controllers.

Frontend React:

Jest + React Testing Library

Example: Testing a button click, form submission, API call mocking

HTML Client:

Simple DOM testing using Jest or light vanilla JS testing libraries

Integration Tests (End-to-End)
Tool: Cypress or Playwright

Scenarios Covered:

Product creation

Product retrieval (listing)

Product update

Product deletion

Rails API tests ensure API behaves correctly

React & HTML clients tested against real backend API

🚀 Deployment to AWS EC2 (Production Setup)
Prerequisites
AWS EC2 instance (Ubuntu 20.04 or Amazon Linux 2)

Ruby, Node.js, Yarn, Nginx installed

Sqlite DB installed

Step-by-Step Deployment
SSH into your EC2 instance:

ssh ec2-user@your-ec2-public-ip
Install required software: Ruby, Node.js,Yarn, Nginx.

Clone the repository:

git clone https://github.com/your-username/your-project-repo.git
cd your-project-repo
Set up the Rails API backend:

cd backend
bundle install
RAILS_ENV=production rails db:create db:migrate
Build the React frontend:

cd ../
npm install
npm run build
Configure Nginx to:

Serve the product-app-client/build/ folder

Serve static product-html-client/

Proxy API requests to the Rails backend running on Puma or Unicorn

Start the Rails server in production using:

rails s -b 127.0.0.1 -p 3000 -e development
or use Puma/ Passenger with Nginx for better production performance.

Example Nginx Configuration
nginx

server {
    listen 80;
    server_name ec2 ip;

    # Redirect /html to /html/
    location = /html {
        return 301 /html/;
    }

    # Serve HTML App
    location ^~ /html/ {
        alias /home/ubuntu/Product-App/product-html-client/;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Serve REACT Client
    location / {
        root /home/ubuntu/Product-App/product-app-client/build;
        index index.html;
        try_files $uri $uri/ /index.html;
    }

    # Proxy API requests to Rails Server
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

📈 Why Testing Is Important
Unit Testing
Focus: Individual components (functions, models, controllers)

Benefit: Detect bugs early, faster refactoring, ensure component stability.

Integration Testing
Focus: Workflow across multiple components (API + Frontend)

Benefit: Ensure the app behaves correctly as a whole, catch real-world errors, simulate user behavior.

Both types of testing complement each other and ensure your application is robust, scalable, and maintainable.

📦 Technologies Used

Part	Technology
Backend	Ruby on Rails (API only)
Frontend 1	React.js (SPA)
Frontend 2	HTML5, CSS3
Database	SQlite
Web Server	Nginx
Testing	Jest, RSpec, Cypress
📋 Future Improvements
Add authentication (JWT or Devise)

API Rate Limiting and Security Hardening

🤝 Authors and Contributions
Lead Developer: Timos Mukoo

📝 License
This project is licensed under the MIT License.
---

# ✅ Notes:
- `"timosmukoko
-

---









