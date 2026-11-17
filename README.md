# Starling

A purple-themed social network inspired by X, built as a React + TypeScript Single Page Application (SPA) with Firebase. Users can sign up, log in, publish posts, follow other users, explore profiles and browse personalized feeds.

> University course project. Current status: **all milestones completed** (Milestones 1, 2 and 3).

<!-- TODO: add a screenshot, e.g. ![Starling](docs/screenshot.png) -->

## Tech Stack

- [React](https://react.dev/) – UI library
- [TypeScript](https://www.typescriptlang.org/) – static typing
- [Vite](https://vitejs.dev/) – build tool and dev server
- [styled-components](https://styled-components.com/) – component styling
- [MUI Icons](https://mui.com/material-ui/material-icons/) – icon set
- [Firebase](https://firebase.google.com/) – authentication and Firestore database
- [ESLint](https://eslint.org/) – code linting
- Git and GitHub – version control

## Features

### Milestone 1 – Layout and SPA structure ✅

- [x] Sidebar navigation (icon-only on medium screens)
- [x] Home feed layout with tweet box and posts
- [x] Widgets column (hidden on small screens)
- [x] Video support in posts
- [x] Sign up page
- [x] Log in page
- [x] Publish tweet page (popup)
- [x] Following list
- [x] Followers list
- [x] User tweets page
- [x] Feed page
- [x] Common header (logo, username, log out)

### Milestone 2 – User features and tweets ✅

- [x] User registration with unique username and email
- [x] Log in with username/password and Google
- [x] Publish tweets (max. 280 characters)
- [x] Follower and following counters
- [x] Follow users by username
- [x] Explore page: search users

### Milestone 3 – Following and lists ✅

- [x] Paginated followers and following lists (10 users at a time, with a "Load more" button)
- [x] Follower and following counters on user pages
- [x] Follow button on user pages
- [x] Public profile of any user, with their posts and replies

### Extra features

- [x] Starling branding (logo and purple theme)
- [x] Like, repost and reply on posts
- [x] "For you" and "Following" feeds
- [x] Post detail view
- [x] Own profile with **Posts**, **Replies** and **Likes** tabs
- [x] Click a username or avatar to open that user's profile
- [x] "Load more" pagination (10 items) in feeds, profile tabs and lists
- [x] Notifications and History pages
- [x] Real news articles in Explore (open in a new tab)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [Yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/Nekiuus/TwitterClone.git
cd TwitterClone
yarn install
```

### Firebase setup

1. Create a project in the [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** (Email/Password and Google) and **Firestore**
3. Copy `.env.example` to `.env` and fill in your credentials

### Environment variables

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_NEWS_API_KEY` | API key of the news provider used in Explore <!-- TODO: confirm variable name --> |

> Never commit your `.env` file. Only `.env.example` (without real values) belongs in the repository.

### Run the project

```bash
yarn dev        # start the development server
yarn build      # create a production build
yarn lint       # run ESLint
yarn typecheck  # check TypeScript types
```

## Project Structure

<!-- TODO: adjust folder names to match the real project -->

```
src/
├── assets/          # Images, logo and static files
├── components/
│   ├── Home/        # Feed, TweetBox and Post components
│   ├── Sidebar/     # Navigation sidebar and IconOption
│   ├── Widgets/     # Right-hand widgets column
│   ├── Profile/     # Own profile (Posts, Replies, Likes)
│   ├── Explore/     # User search and news
│   └── ...          # Login, sign up, lists, notifications, history
├── Config/          # Firebase configuration
├── App.tsx
└── main.tsx
```

## Git Workflow

- `main`: stable code, only updated through pull requests
- `develop`: integration branch
- `feature/*`: new features (e.g. `feature/login-page`)
- `fix/*`: bug fixes
- `refactor/*`: code restructuring (e.g. `refactor/migrate-to-typescript`)

Commit messages follow a simple convention: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`, `chore:`.

All code, comments and documentation are written in English.

## Releases

| Version | Description |
|---------|-------------|
| `v0.1.0-milestone-1` | Layout and SPA structure |
| `v0.2.0-milestone-2` | Sign up, follow users and Explore |
| `v0.2.1-typescript` | Migration to TypeScript |
| `v0.3.0-starling` | Starling branding, interactions, notifications and history |
| `v0.4.0` | Profile tabs, public profiles, pagination, post detail and Explore news |

See [CHANGELOG.md](./CHANGELOG.md) for details.

## Team

| Name | GitHub |
|------|--------|
| TODO | [@user](https://github.com/user) |
| TODO | [@user](https://github.com/user) |

## License

This project was created for educational purposes.
