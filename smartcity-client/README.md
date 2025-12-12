# Smart City Platform

Hey there! 👋 This is a web application I built for managing city services - think of it as a one-stop platform where citizens can file complaints, pay bills, and interact with their local administration. On the flip side, admins can manage all of this efficiently.

The frontend is built with React and Vite (super fast!), and the backend is a Spring Boot REST API. I've tried to make it user-friendly and feature-rich.

## What Can You Do With This?

### For Citizens
- **File Complaints**: Got a pothole on your street? File a complaint and track its status in real-time
- **Pay Bills**: No more standing in queues - pay your utility bills online
- **Manage Profile**: Update your info, check your account status
- **Contact Support**: Need help? Reach out directly to the administration
- **Dashboard**: See everything at a glance - complaints, bills, account info

### For Administrators
- **Manage Complaints**: Review, update status, and resolve citizen complaints
- **Create Bills**: Generate utility bills for citizens
- **Handle Contacts**: View and respond to citizen inquiries
- **Dashboard**: Get insights with statistics and system overview
- **Monitor Users**: Keep an eye on citizen accounts and activities

## What You'll Need

Before diving in, make sure you have these installed:

- **Node.js** (v18+) - You can download it from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** if you prefer
- **Java** (JDK 17+) - Spring Boot needs this
- **Maven** (3.6+) - For building the backend
- **MySQL** (8.0+) - Our database
- **Git** - For version control (you probably already have this)

If you're missing any of these, just Google how to install them for your OS - it's pretty straightforward!

## Project Structure

Here's how things are organized (in case you're curious):

```
SmartCity/
├── smartcity-client/     # Frontend stuff (React + Vite)
│   ├── src/
│   │   ├── component/    # All the React components
│   │   ├── pages/        # Page components
│   │   ├── context/      # Auth and Theme providers
│   │   └── service/      # API calls
│   └── package.json
│
└── smartcity-server/     # Backend (Spring Boot)
    ├── src/
    │   └── main/
    │       ├── java/      # All the Java code
    │       └── resources/ # Config files
    └── pom.xml
```

## Setting Up the Frontend

Alright, let's get the frontend running. It's pretty simple:

### Step 1: Go to the frontend folder

```bash
cd smartcity-client
```

### Step 2: Install dependencies

This might take a minute or two, depending on your internet speed:

```bash
npm install
```

### Step 3: Set up environment variables

Create a `.env` file in the `smartcity-client` directory. If you already have one, just make sure it has this:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

This tells the frontend where to find the backend API.

### Step 4: Start the dev server

```bash
npm run dev
```

You should see something like "Local: http://localhost:5173" in your terminal. Open that URL in your browser and you're good to go!

### Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates an optimized build in the `dist` folder that you can serve with any static file server.

## Setting Up the Backend

Now for the backend - this is where it gets a bit more involved, but I'll walk you through it step by step.

### Step 1: Navigate to backend folder

```bash
cd smartcity-server
```

### Step 2: Set up the database

First, make sure MySQL is running on your machine. Then create the database:

```sql
CREATE DATABASE smartcity_db;
```

You can do this by logging into MySQL:
```bash
mysql -u root -p
```
Then run the CREATE DATABASE command above.

### Step 3: Create the configuration file

You need to create an `application-dev.yml` file in `src/main/resources/`. I've already created a template for you, but here's what it should look like:

```yaml
spring:
  application:
    name: SmartCityServer
  profiles:
    active: dev
  
  # Database Configuration
  datasource:
    url: jdbc:mysql://localhost:3306/smartcity_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    driver-class-name: com.mysql.cj.jdbc.Driver
  
  # JPA Configuration
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
        format_sql: true

# JWT Configuration
jwt:
  secretKey: ${JWT_SECRET}

# Frontend URL for CORS
frontend-url: ${FRONTEND_URL}

# Server Configuration
server:
  port: 8080
  servlet:
    context-path: /api
```

Notice those `${DB_USERNAME}`, `${DB_PASSWORD}`, etc.? Those are placeholders that will be replaced with environment variables. This way, you don't hardcode sensitive info in your config files.

### Step 4: Set environment variables

This is important! You need to set these environment variables before running the backend. Here's how:

#### Option 1: Set them in your terminal (temporary)

**Windows PowerShell:**
```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_actual_password"
$env:JWT_SECRET="some-random-secret-key-here"
$env:FRONTEND_URL="http://localhost:5173"
```

**Windows Command Prompt:**
```cmd
set DB_USERNAME=root
set DB_PASSWORD=your_actual_password
set JWT_SECRET=some-random-secret-key-here
set FRONTEND_URL=http://localhost:5173
```

**Linux/Mac:**
```bash
export DB_USERNAME=root
export DB_PASSWORD=your_actual_password
export JWT_SECRET=some-random-secret-key-here
export FRONTEND_URL=http://localhost:5173
```

**Important**: Replace `your_actual_password` with your actual MySQL password, and `some-random-secret-key-here` with a strong random string. For the JWT secret, you can generate one using:
```bash
openssl rand -base64 32
```

#### Option 2: Create a .env file

If you're using Spring Boot with dotenv support, you can create a `.env` file in the `smartcity-server` directory:

```env
DB_USERNAME=root
DB_PASSWORD=your_actual_password
JWT_SECRET=your-generated-secret-key
FRONTEND_URL=http://localhost:5173
```

**⚠️ Important**: Make sure `.env` is in your `.gitignore` so you don't accidentally commit your credentials!

### Step 5: Build the project

```bash
mvn clean install
```

This downloads all dependencies and compiles the code. First time might take a while.

### Step 6: Run it!

```bash
mvn spring-boot:run
```

Or if you've already built it and want to run the JAR:

```bash
java -jar target/smartcity-server-0.0.1-SNAPSHOT.jar
```

If everything went well, you should see Spring Boot starting up and connecting to the database. The API will be available at `http://localhost:8080/api`

## Quick Reference: Configuration Files

### Backend Config (`application-dev.yml`)

The file should be at `smartcity-server/src/main/resources/application-dev.yml`. I've already created it for you with all the right settings. Just make sure your environment variables are set!

### Frontend Config (`.env`)

Create `smartcity-client/.env`:
```env
VITE_API_BASE_URL=http://localhost:8080/api
```

## Security Stuff (Please Read!)

1. **JWT Secret**: Don't use something like "secret123" - use a strong random string. I mentioned `openssl rand -base64 32` earlier - use that!

2. **Database Credentials**: Never, ever commit your database password to Git. Always use environment variables. I've made sure `.env` files are in `.gitignore`, but double-check!

3. **Production**: When deploying, change all default values and use proper security configurations. This setup is for development only.

## Testing Your Setup

Once everything is running, here's how to verify it's working:

1. **Backend**: Try hitting `http://localhost:8080/api` - you should get some response (even if it's an error, that means the server is running!)

2. **Frontend**: Open `http://localhost:5173` - you should see the app

3. **Database**: Check your backend logs - you should see successful database connection messages

## API Endpoints

Here are the main endpoints you'll be working with:

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/profile` - Get current user's profile

### Citizen Endpoints
- `GET /api/citizen/complaints` - Get all complaints for logged-in user
- `POST /api/citizen/complaints` - Create a new complaint
- `GET /api/citizen/bills` - Get all bills for logged-in user
- `POST /api/citizen/bills/{id}/pay` - Pay a specific bill
- `POST /api/citizen/contact` - Submit a contact form

### Admin Endpoints
- `GET /api/admin/complaints` - Get all complaints (admin only)
- `PUT /api/admin/complaints/{id}` - Update complaint status
- `GET /api/admin/contacts` - Get all contact submissions
- `POST /api/admin/bills` - Create a new bill
- `GET /api/admin/bills` - Get all bills

Most endpoints require authentication (JWT token in the Authorization header).

## Common Issues and Fixes

I've run into these issues myself, so here's how to fix them:

### Database Won't Connect

- **MySQL not running?** Check if MySQL service is running: `mysql -u root -p`
- **Wrong credentials?** Double-check your `DB_USERNAME` and `DB_PASSWORD`
- **Database doesn't exist?** Run `CREATE DATABASE smartcity_db;` in MySQL
- **Port issue?** Make sure MySQL is on port 3306 (default)

### CORS Errors

If you see CORS errors in the browser console:
- Make sure `FRONTEND_URL` matches exactly what's in your browser (including the port)
- Check backend logs for CORS-related errors
- Verify that `SecurityConfig.java` is allowing your frontend origin

### JWT Token Issues

- Is `JWT_SECRET` set? It can't be empty!
- Check if the token is being sent in request headers
- Token might be expired - try logging in again

### Port Already in Use

- **Frontend (5173)**: Change it in `vite.config.js`
- **Backend (8080)**: Change it in `application-dev.yml` under `server.port`

## Development Commands

### Frontend
```bash
npm run dev      # Start dev server (with hot reload)
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Check for code issues
```

### Backend
```bash
mvn clean install        # Clean and build everything
mvn spring-boot:run     # Run the application
mvn test                # Run tests
mvn clean               # Clean build artifacts
```

## Tech Stack

### Frontend
- React 19.2.0 - UI library
- React Router DOM 7.10.1 - Routing
- Axios 1.13.2 - HTTP client
- Tailwind CSS 4.1.17 - Styling (it's awesome!)
- React Hot Toast 2.6.0 - Notifications
- React Icons 5.5.0 - Icons

### Backend
- Spring Boot 4.0.0 - Framework
- Spring Security - Authentication & authorization
- Spring Data JPA - Database access
- MySQL Connector - Database driver
- JWT (jjwt 0.12.6) - Token-based auth
- Lombok - Less boilerplate code
- ModelMapper 3.2.4 - Object mapping

## Contributing

If you want to contribute (which would be awesome!):

1. Fork the repo
2. Create a branch for your feature (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit with a clear message (`git commit -m 'Add some cool feature'`)
5. Push to your branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - feel free to use it however you want!

## Final Notes

- Make sure you replace all placeholder values (like `your_password`, `your-secret-key-here`) with actual values before running
- The first time you run `mvn clean install`, it might take a while as it downloads dependencies
- If you run into any issues, check the troubleshooting section above
- Don't forget to set your environment variables before running the backend!

Good luck, and happy coding! 🚀

If you have questions or run into issues, feel free to open an issue on GitHub or reach out.
