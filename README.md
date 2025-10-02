# Calendly Clone - Meeting Scheduling Application

![Calendly Clone Banner](public/logo.svg)

A modern, full-featured meeting scheduling application built with Next.js 15, inspired by Calendly. This application allows users to create events, set their availability, and share booking links with others to schedule meetings.

## 🌟 Features

- **User Authentication**: Secure authentication with Clerk
- **Event Management**: Create, edit, and manage custom events with specific durations
- **Availability Scheduling**: Set your weekly availability with an intuitive schedule builder
- **Booking System**: Allow others to book meetings based on your availability
- **Google Calendar Integration**: Sync bookings with Google Calendar
- **Responsive Design**: Fully responsive UI that works on all devices
- **Dark/Light Mode**: Theme switching capability
- **Timezone Support**: Automatic timezone detection and handling

## 🛠️ Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) with App Router, React 19, TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Database**: PostgreSQL with [Drizzle ORM](https://orm.drizzle.team/)
- **Authentication**: [Clerk](https://clerk.dev/)
- **Validation**: [Zod](https://zod.dev/), [React Hook Form](https://react-hook-form.com/)
- **Date Handling**: [date-fns](https://date-fns.org/)
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (NeonDB recommended)
- Clerk account for authentication

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/calendly-clone.git
cd calendly-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_postgresql_database_url

# Google OAuth (for Google Calendar integration)
GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_oauth_client_secret
GOOGLE_OAUTH_REDIRECT_URL=your_google_oauth_redirect_url
```

4. Run database migrations:
```bash
npm run db:migrate
# or
yarn db:migrate
# or
pnpm db:migrate
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
.
├── app/                 # Next.js app router pages
├── components/          # React components
├── drizzle/             # Database schema and migrations
├── lib/                 # Utility functions and helpers
├── schema/              # Zod validation schemas
├── server/              # Server actions and API integrations
├── public/              # Static assets
└── ...
```

## 🎯 Usage

1. **Sign Up/Sign In**: Create an account or sign in using Clerk authentication
2. **Create Events**: Navigate to the "Events" section to create new meeting types with custom names, descriptions, and durations
3. **Set Availability**: Go to the "Schedule" page to define when you're available for meetings
4. **Share Booking Link**: Copy your event link and share it with others who can book meetings with you
5. **Manage Bookings**: View and manage all your scheduled meetings

## 🤝 Acknowledgements

Special thanks to [freeCodeCamp.org](https://www.freecodecamp.org) for their excellent tutorials and educational resources that helped in learning and building this project. Their comprehensive courses on web development, React, and Next.js provided the foundation for creating this application.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

If you find this project helpful, please consider giving it a star on GitHub! For issues, feature requests, or contributions, please open an issue or pull request in the repository.