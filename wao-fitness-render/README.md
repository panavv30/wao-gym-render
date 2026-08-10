# WAO FITNESS — Render package

This is a self-contained production build of the WAO FITNESS website.

## Deploy as a Render Static Site

1. Upload this folder to a GitHub repository, or create a new repository from the ZIP contents.
2. In Render, create a **Static Site**.
3. Use these settings:
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`
4. No environment variables are required.

The included `render.yaml` contains the same static-site configuration.

## Local commands

```bash
npm install
npm run build
npm run start
```

The enquiry form is a local success interaction and the call/WhatsApp actions open the configured phone number.