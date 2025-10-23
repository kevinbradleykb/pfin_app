# Deployment Guide for GitHub Pages

This guide explains how to deploy your BudgetFlow personal finance app to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed locally
- Node.js 18+ installed

## Step 1: Update Vite Configuration for GitHub Pages

Update [vite.config.ts](vite.config.ts) to set the correct base path:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pfin_app/', // Replace with your repository name
})
```

## Step 2: Build the Production Version

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## Step 3: Deploy to GitHub Pages

### Option A: Using GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. Push to GitHub:

```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

3. Enable GitHub Pages in repository settings:
   - Go to Settings > Pages
   - Source: GitHub Actions

### Option B: Manual Deployment

1. Build the app:
```bash
npm run build
```

2. Install gh-pages:
```bash
npm install -D gh-pages
```

3. Add deploy script to [package.json](package.json):
```json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy:
```bash
npm run deploy
```

## Step 4: Access Your App

After deployment, your app will be available at:
```
https://[your-username].github.io/pfin_app/
```

## Troubleshooting

### Blank Page After Deployment

If you see a blank page, make sure:
1. The `base` in `vite.config.ts` matches your repository name
2. You've enabled GitHub Pages in repository settings
3. The deployment workflow completed successfully

### Assets Not Loading

Check that all asset paths are relative and the base path is correctly configured.

## Local Testing of Production Build

Test the production build locally before deploying:

```bash
npm run build
npm run preview
```

## Continuous Deployment

With GitHub Actions configured (Option A), every push to `main` will automatically:
1. Build the app
2. Run tests (if configured)
3. Deploy to GitHub Pages

## Data Privacy Note

Remember: All user data is stored locally in the browser's LocalStorage. Users' financial data never leaves their device, ensuring complete privacy.
