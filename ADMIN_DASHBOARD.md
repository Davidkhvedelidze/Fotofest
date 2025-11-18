# PhotoFest Admin Dashboard

The admin dashboard allows you to manage event requests and contact messages submitted through the PhotoFest website.

## Access

1. Navigate to `/admin/login` in your browser
2. Use the default credentials:
   - **Username:** `Photofest2@gmail.com`
   - **Password:** `Photofest25092025`

## Features

### Dashboard Overview

- **Statistics Cards**: View total event requests, contact messages, recent requests (7 days), and pending events
- **Real-time Updates**: Refresh data with the refresh button
- **Tab Navigation**: Switch between Event Requests and Contact Messages

### Event Requests Management

- View all submitted event requests
- See customer details (name, email, mobile, event type, date)
- Read additional information/messages
- Quick actions:
  - **Reply via Email**: Opens email client with customer's email
  - **Call**: Opens phone dialer with customer's mobile number

### Contact Messages Management

- View all contact form submissions
- See customer details and messages
- Reply directly via email

## Security

**Important:** For production use, you should:

1. **Change Default Credentials**

   - Update credentials in `/admin/login/page.tsx` or use environment variables
   - Set `NEXT_PUBLIC_ADMIN_USERNAME` and `NEXT_PUBLIC_ADMIN_PASSWORD` in `.env.local`

2. **Implement Proper Authentication**

   - Replace localStorage-based auth with server-side sessions
   - Use JWT tokens or NextAuth.js
   - Add rate limiting and CSRF protection

3. **Secure the Admin Routes**
   - Add middleware to protect `/admin/*` routes
   - Implement role-based access control

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_ADMIN_USERNAME=your-username
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
```

## Routes

- `/admin/login` - Login page
- `/admin` - Main dashboard (requires authentication)

## Data Storage

All data is stored in JSON files in the `/data` directory:

- `data/event-requests.json` - Event request submissions
- `data/contact-messages.json` - Contact form submissions

## Future Enhancements

- [ ] Export data to CSV/Excel
- [ ] Search and filter functionality
- [ ] Mark requests as read/processed
- [ ] Email notifications for new submissions
- [ ] Analytics and reporting
- [ ] Bulk actions (delete, export, etc.)
