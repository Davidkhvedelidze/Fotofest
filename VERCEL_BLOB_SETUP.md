# Vercel Blob Setup Guide (Image uploads)

Image uploads for showcase events use [Vercel Blob](https://vercel.com/docs/storage/vercel-blob). Follow these steps to enable them.

## Quick Setup

### Step 1: Create a Blob store

1. Go to https://vercel.com/dashboard
2. Select your **Fotofest** project
3. Open the **Storage** tab
4. Click **Create Database** → choose **Blob**
5. Name the store (e.g. `photofest-blob`) and click **Create**

### Step 2: Environment variable

Vercel adds this automatically when you create the Blob store:

- `BLOB_READ_WRITE_TOKEN`

**Local development:** pull env vars into `.env.local`:

```bash
vercel env pull .env.local
```

Or copy `BLOB_READ_WRITE_TOKEN` from the project’s **Settings → Environment Variables** and add it to `.env.local`.

### Step 3: Redeploy (if already deployed)

After creating the store, trigger a redeploy so the app gets the new env var.

---

## Usage in the app

- **Add Event** and **Edit Event** forms support:
  - **Image URL** – paste any image URL (unchanged).
  - **Upload** – choose a file (JPEG, PNG, WebP, GIF, max 4.5 MB). It’s uploaded to Blob and the returned URL is set as the event image.

Upload API: `POST /api/upload` (admin-only, form field `file`).

## Troubleshooting

**"Blob storage not configured"**

- Create a Blob store in the project (Storage → Create Database → Blob).
- Ensure `BLOB_READ_WRITE_TOKEN` is set in Vercel (and in `.env.local` for local dev).
- Redeploy after adding the variable.

**Upload fails with 413 or "File too large"**

- Server uploads are limited to 4.5 MB. Use a smaller image or resize before uploading.
