# frontend-js-challenge

This is my submission for the Avantio Frontend JS Challenge, all original code belongs to them (https://github.com/Avantio). The application was originally designed to display a list of trends, and the following functionalities have been added:

- **Create**: Add new news items.
- **Edit**: Update existing news items.
- **Delete**: Remove news items.

## Getting Started

These instructions will guide you on how to set up and run the application on your local machine.

### Prerequisites
- Node.js (v14 or higher)
- Angular CLI (v14 or higher)

### Setup
1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd <repository-folder>```

2. **Install dependencies:**
Run the following command in the project folder to install all required packages.
   ```
   npm install
   ```

3. **Configure the Auth Token:** 

Open the environment file located at src/environments/environment.ts, and add your authentication token to the avantioAPIAuthToken property.

4. **Running the Application:**

To start the application in development mode, run the following command:
```
npm run start
```

This will launch the application on http://localhost:4200.

5. **Functionalities**:
- View News Trends: Display a list of all news trends.
- Create: Add new trends by filling in the required details.
- Edit: Modify existing trends by selecting the trend and editing its content.
- Delete: Remove unwanted trends from the list.
