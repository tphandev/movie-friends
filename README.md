# 🍿 Movie Friends

A dynamic web application for movie enthusiasts.

## 🚀 [Live Demo](https://movie-friends.vercel.app/)

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Variable               | Description                           |
| :--------------------- | :------------------------------------ |
| `NEXT_PUBLIC_API_KEY`  | TMDB's API key                        |
| `NEXTAUTH_URL`         | Canonical URL of your site            |
| `NEXTAUTH_SECRET`      | Secret string                         |
| `GOOGLE_CLIENT_ID`     | Google OAuth 2.0 Client ID            |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 2.0 Client secrets       |
| `DATABASE_URL`         | URL to connect to PostgreSQL database |

## 🏃 Run Locally

Clone the project

```bash
  git clone https://github.com/tphandev/movie-friends.git
```

Go to the project directory

```bash
  cd movie-friends
```

Install dependencies

```bash
  npm install
```

Migrate database

```bash
  npx prisma migrate dev
```

Run the development server:

```bash
  npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## 🧪 Running Tests

To run tests, run the following command

```bash
  npm run test
```
