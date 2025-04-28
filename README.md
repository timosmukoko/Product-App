# Full Stack Product Management Application

This project is a full-stack product management system featuring:
- A **Ruby on Rails API backend**
- A **React.js client frontend** (dynamic, interactive)
- A **Static HTML/CSS/JS client frontend** (lightweight version)

All three parts are organized inside this single repository for easier deployment and maintenance.

---

## 🗂 Project Structure

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-project-repo.git
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

PostgreSQL or other production-grade DB installed

Step-by-Step Deployment
SSH into your EC2 instance:

bash
Copy
Edit
ssh ec2-user@your-ec2-public-ip
Install required software: Ruby, Node.js, PostgreSQL, Yarn, Nginx.

Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/your-project-repo.git
cd your-project-repo
Set up the Rails API backend:

bash
Copy
Edit
cd backend
bundle install
RAILS_ENV=production rails db:create db:migrate
Build the React frontend:

bash
Copy
Edit
cd ../react-client
npm install
npm run build
Configure Nginx to:

Serve the react-client/build/ folder

Serve static html-client/

Proxy API requests to the Rails backend running on Puma or Unicorn

Start the Rails server in production using:

bash
Copy
Edit
RAILS_ENV=production rails server -b 0.0.0.0
or use Puma/ Passenger with Nginx for better production performance.

Example Nginx Configuration
nginx
Copy
Edit
server {
    listen 80;
    server_name your-ec2-public-ip;

    root /home/ec2-user/your-project-repo/react-client/build;
    index index.html;

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /html/ {
        root /home/ec2-user/your-project-repo/html-client;
    }

    location / {
        try_files $uri /index.html;
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
Frontend 2	HTML5, CSS3, Vanilla JS
Database	PostgreSQL
Web Server	Nginx
Testing	Jest, RSpec, Cypress
📋 Future Improvements
Add authentication (JWT or Devise)

Full Docker containerization

CI/CD pipeline (GitHub Actions or AWS CodePipeline)

API Rate Limiting and Security Hardening

🤝 Authors and Contributions
Lead Developer: Your Name

Contributors: Others (if any)

📝 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

# ✅ Notes:
- `"timosmukoko/Product-App"` and `"Timos Mukoko"`
-

---









