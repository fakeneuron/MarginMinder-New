# Margin Minder

Margin Minder is a web application for tracking trades and managing financial charts. It's built with React, TypeScript, and Supabase.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/margin-minder.git
   cd margin-minder
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory of the project:
   ```
   touch .env
   ```

4. Add your Supabase credentials to the `.env` file:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   Replace `your_supabase_project_url` and `your_supabase_anon_key` with your actual Supabase project URL and anonymous key.

5. Start the development server:
   ```
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173` to view the application.

## Features

- User authentication
- Trade logging and management
- Chart creation and storage
- Dashboard for overview of trading activities

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.