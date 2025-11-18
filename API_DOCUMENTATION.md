# PhotoFest API Documentation

This document describes the backend API endpoints for the PhotoFest project.

## Base URL

All API endpoints are prefixed with `/api`.

## Endpoints

### 1. Health Check

**GET** `/api/health`

Check if the API is running.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "service": "PhotoFest API"
}
```

---

### 2. Submit Event Request

**POST** `/api/events/request`

Submit a new event request.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "+995 555 123 456",
  "eventType": "კორპორატიული",
  "date": "2024-12-25",
  "message": "Additional information about the event"
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "Event request submitted successfully",
  "id": "event-1234567890-abc123"
}
```

**Response (Error - 400):**

```json
{
  "error": "Validation error message"
}
```

**Validation Rules:**

- `name`: Required, minimum 2 characters
- `email`: Required, valid email format
- `mobile`: Required, valid phone number format
- `eventType`: Required, minimum 2 characters
- `date`: Required, valid date format
- `message`: Optional

---

### 3. Send Contact Message

**POST** `/api/contact`

Send a contact message.

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Question about services",
  "message": "I would like to know more about your services"
}
```

**Response (Success - 201):**

```json
{
  "success": true,
  "message": "Contact message sent successfully",
  "id": "contact-1234567890-xyz789"
}
```

**Response (Error - 400):**

```json
{
  "error": "Validation error message"
}
```

**Validation Rules:**

- `name`: Required, minimum 2 characters
- `email`: Required, valid email format
- `message`: Required, minimum 10 characters
- `subject`: Optional

---

### 4. Get Events

**GET** `/api/events`

Retrieve all submitted event requests.

**Response (Success - 200):**

```json
{
  "events": [
    {
      "id": "event-1234567890-abc123",
      "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "mobile": "+995 555 123 456",
        "eventType": "კორპორატიული",
        "date": "2024-12-25",
        "message": "Additional information"
      },
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

## Data Storage

Currently, data is stored in JSON files in the `/data` directory:

- `data/event-requests.json` - All event requests
- `data/contact-messages.json` - All contact messages

**Note:** For production, consider using a proper database (PostgreSQL, MongoDB, etc.).

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `500` - Internal Server Error

Error responses follow this format:

```json
{
  "error": "Error message description"
}
```

## Future Enhancements

1. **Email Notifications**: Configure email service (Resend, SendGrid, etc.) to send notifications
2. **Database Integration**: Replace JSON file storage with a proper database
3. **Authentication**: Add admin authentication for viewing/managing requests
4. **Rate Limiting**: Implement rate limiting to prevent abuse
5. **File Uploads**: Add support for image/file uploads

## Environment Variables

Create a `.env.local` file with the following variables (optional):

```env
# Email Configuration
SMTP_EMAIL=your-email@example.com
SMTP_PASSWORD=your-password
ADMIN_EMAIL=admin@photofest.ge

# Or use Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Database (for future use)
DATABASE_URL=postgresql://user:password@localhost:5432/photofest
```
