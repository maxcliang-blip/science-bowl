# Dyad App

This is a secure authentication system built with React, TypeScript, and Tailwind CSS. To deploy this application:

## GitHub Deployment

1. Create a Vercel account and connect your GitHub repository
2. Add these secrets to your GitHub repository:
   - `VERCEL_TOKEN` (your Vercel API token)
   - `VERCEL_PROJECT_ID` (your Vercel project ID)
3. Push to your main branch to trigger automatic deployment

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Security Features

- Input validation for usernames/passwords
- Secure token storage using sessionStorage
- XSS protection through CSP headers
- Proper error handling