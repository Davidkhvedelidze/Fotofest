# Vercel KV Setup Guide

## Quick Setup (5 minutes)

### Step 1: Create KV Database
1. Go to https://vercel.com/dashboard
2. Select your **Fotofest** project
3. Click on the **Storage** tab (in the top navigation)
4. Click **Create Database**
5. Select **KV** (Redis)
6. Choose a name (e.g., "photofest-kv")
7. Select a region closest to your users
8. Click **Create**

### Step 2: Environment Variables (Auto-configured)
Vercel automatically adds these environment variables when you create KV:
- `KV_REST_API_URL`
- `KV_REST_API_TOKEN`

**Verify they exist:**
1. Go to **Settings** → **Environment Variables**
2. You should see both `KV_REST_API_URL` and `KV_REST_API_TOKEN`

### Step 3: Redeploy
1. After creating KV, Vercel will automatically trigger a redeploy
2. Or manually go to **Deployments** → Click **⋯** → **Redeploy**

### Step 4: Test
Try adding an event in the admin dashboard - it should work now!

---

## Alternative: Use Free Database (If you prefer)

If you don't want to use Vercel KV, you can use a free database:

### Option A: Supabase (PostgreSQL - Free)
1. Go to https://supabase.com
2. Create free account
3. Create new project
4. Get connection string
5. Add `DATABASE_URL` to Vercel environment variables

### Option B: MongoDB Atlas (Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add `MONGODB_URI` to Vercel environment variables

---

## Troubleshooting

**Error: "Storage not configured"**
- Make sure KV database is created
- Verify environment variables are set
- Redeploy after adding environment variables

**Error: "KV_REST_API_URL is not defined"**
- Go to Storage → Your KV database → Settings
- Copy the REST API URL and Token
- Add them manually in Environment Variables if needed


