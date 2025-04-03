# The Depth Factor


## About This Project

The Depth Factor is a comprehensive digital platform designed to provide accessible psychological insights and personal growth resources. The platform combines traditional content delivery with cutting-edge AI assistance to offer personalized support for and personal growth and development.

## Features & Pages

### Home Page
- **Content Showcase**: Featured articles and videos about psychological concepts
- **Content Search**: Find personalized content based on your interests
- **Newsletter Signup**: Subscribe to bi-weekly insights delivered via email

### About Page
- **Professional Biography**: Information about Dr. Raghav Suri's background and approach
- **Philosophy**: The psychological approach and methodologies that inform the platform
- **Credentials**: Professional qualifications and experience

### Legal Pages
- **Privacy Policy**: Information about data collection and privacy practices
- **Terms of Service**: Rules and guidelines for using the platform

### Hidden Features
- **AI Chat Assistant**: Engage with an AI-powered assistant trained to provide psychological insights and personal growth guidance (available at `/hidden-chat`)

## AI Functionality

The platform integrates advanced AI capabilities through:

- **Together.ai Integration**: Using DeepSeek V3 model for primary conversation capabilities
- **Streaming Responses**: Real-time AI responses with typing indicators
- **Context Management**: Maintains conversation history for contextual responses

## Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Languages**: TypeScript, JavaScript
- **Styling**: Tailwind CSS 4.0
- **Components**: Custom React components with responsive design

### Backend
- **API Routes**: Next.js API routes for backend functionality
- **AI Integration**: Together.ai API (with DeepSeek V3 and Llama 3 models)
- **Form Handling**: FormSpark for newsletter subscriptions

### Infrastructure
- **Deployment**: Vercel (automatically deployed from main branch)
- **Environment Variables**: API keys and configuration stored in .env.local

## Project Structure

```
app/
├── components/       # Reusable UI components
│   ├── AIChat.tsx    # AI chat interface component
│   ├── Header.tsx    # Navigation header
│   ├── Footer.tsx    # Site footer
│   └── ...           # Other UI components
├── api/              # Backend API routes
│   ├── together/     # Together.ai API integration
│   └── chat/         # Chat API routes
├── config/           # Application configuration
│   └── ai.ts         # AI model settings
├── about/            # About page
├── legal/            # Privacy and terms pages
├── hidden-chat/      # Hidden AI chat interface
└── page.tsx          # Homepage (website landing page)
```

## Development Status

### Completed
- Core platform architecture and design
- AI chat integration with Together.ai
- Website as homepage with content showcase
- Hidden chat interface for development
- About page with professional information
- Legal documentation pages

### In Progress
- Content recommendation system
- Semantic search capabilities
- AI assistant with brand voice

### Pending/Future Enhancements
- User authentication system
- Saved conversation history
- RAG-powered AI responses
- Mobile app version
- Additional AI model integrations

## Getting Started for Developers

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Create a `.env.local` file with the following variables:
```
TOGETHER_AI_API_KEY=your_api_key_here
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The AI chat interface is available at [http://localhost:3000/hidden-chat](http://localhost:3000/hidden-chat) during development.

## Deployment

This site is deployed on Vercel. Any changes pushed to the main branch will automatically deploy to production.

## Image Assets

The following images are used throughout the site:

- `hero-homepage.jpg`: Hero image on the homepage
- `about-hero.jpg`: Hero image on the about page
- `dr-raghav-suri.jpg`: Professional photo of Dr. Suri

## License

All rights reserved © The Depth Factor 2024

---

*Documentation last updated: April 2024*
