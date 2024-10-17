# DoD Fitness App - Installation Guide

This guide will walk you through the process of setting up the DoD Fitness App development environment on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version 14.0.0 or later)
- npm (usually comes with Node.js)
- Git

## Step 1: Clone the Repository

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to store the project.
3. Run the following command to clone the repository:

```bash
git clone https://github.com/your-repo/dod-fitness-app.git
cd dod-fitness-app
```

## Step 2: Install Dependencies

1. In the project root directory, run the following command to install the required dependencies:

```bash
npm install
```

This will install all the dependencies listed in the `package.json` file.

## Step 3: Set Up Environment Variables

1. Create a `.env` file in the root directory of the project.
2. Add the following variables to the `.env` file:

```
VITE_API_BASE_URL=http://localhost:3000
```

Note: For the mock API, this URL isn't actually used, but it's good practice to set it up for future backend integration.

## Step 4: Start the Development Server

1. Run the following command to start the development server:

```bash
npm run dev
```

2. Open your web browser and navigate to `http://localhost:5173` (or the URL provided in the terminal output).

You should now see the DoD Fitness App running in your browser.

## Step 5: Building for Production

When you're ready to build the app for production, use the following command:

```bash
npm run build
```

This will create a `dist` folder with the production-ready files.

## Troubleshooting

If you encounter any issues during the installation process, try the following:

1. Ensure you have the latest versions of Node.js and npm installed.
2. Clear the npm cache:
   ```bash
   npm cache clean --force
   ```
3. Delete the `node_modules` folder and `package-lock.json` file, then run `npm install` again.
4. If you're still having issues, please check the project's issue tracker on GitHub or create a new issue with details about the problem you're experiencing.

## Next Steps

- Familiarize yourself with the project structure and key components.
- Read through the [Technical Specifications](technical-specs.md) for more detailed information about the app's architecture.
- Check out the [Contribution Guidelines](contribution-guidelines.md) if you're interested in contributing to the project.

Happy coding!