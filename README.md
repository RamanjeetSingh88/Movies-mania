
# My Movie Site - Ramanjeet Singh(200553608)
                  Barkirat Singh (200554052)

A modern web application for exploring and browsing a wide variety of movies. Built using Next.js and TypeScript, this app offers a fast, dynamic, and user-friendly experience.

## Features

- **Movie Browsing**: Discover trending, top-rated, and genre-specific movies.
- **Search Functionality**: Find movies by title or keywords.
- **API Integration**: Powered by external APIs for fetching real-time movie data.
- **Responsive Design**: Works seamlessly across devices, from desktops to smartphones.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd my-movie-site
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Usage

To start the development server, run:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

For production:
```bash
npm run build
npm start
```

### Available Scripts

- **dev**: Runs the development server.
- **build**: Builds the application for production.
- **start**: Starts the production server.
- **lint**: Runs linting to ensure code quality.

## API Integration

This project uses the [TMDb API](https://www.themoviedb.org/) for movie data. Ensure you create a `.env.local` file with the following content:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your TMDb API key. You can obtain an API key by signing up on the TMDb website.

## Folder Structure

The project's main folders are structured as follows:

- **/pages**: Contains the main application routes.
- **/components**: Reusable UI components.
- **/styles**: Global and component-specific styles.
- **/public**: Static assets like images and icons.
- **/api**: API handlers and utilities for server-side interactions.

## Dependencies

Key dependencies include:

- **Next.js**: A React framework for server-side rendering and static site generation.
- **TypeScript**: For type-safe development.
- **Tailwind CSS**: A utility-first CSS framework.
- **Axios**: For making HTTP requests.

See `package.json` for the full list of dependencies.


Enjoy building with **My Movie Site** and explore the endless possibilities of modern web development!
