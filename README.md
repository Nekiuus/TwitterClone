# X Clone

A clone of the social network X (formerly Twitter), built as a Single Page Application (SPA) with React. Users will be able to sign up, log in, publish tweets, follow other users and see the tweets of the people they follow.

> University course project. Current status: **Milestone 1 – Layout and SPA structure**.

## Tech Stack

- [React](https://react.dev/) – UI library
- [Vite](https://vitejs.dev/) – build tool and dev server
- [styled-components](https://styled-components.com/) – component styling <!-- TODO: confirm -->
- [Firebase](https://firebase.google.com/) – authentication and database (Milestones 2 and 3)
- [ESLint](https://eslint.org/) – code linting
- Git and GitHub – version control

## Features

### Milestone 1 – Layout (in progress)

- [x] Sidebar navigation
- [x] Home feed layout with tweet box and posts
- [x] Widgets column
- [x] Video support in posts
- [X] Sign up page
- [X] Log in page
- [ ] Publish tweet page
- [ ] Following list (10 users per page)
- [ ] Followers list (10 users per page)
- [ ] User tweets page
- [X] Feed page
- [ ] Common header (logo, username, log out)

### Milestone 2 – User features and tweets (planned)

- [ ] User registration with unique username and email
- [ ] Log in with username/password and Google
- [ ] Publish tweets (max. 280 characters)
- [ ] Follow users by username

### Milestone 3 – Following and lists (planned)

- [ ] Paginated followers and following lists
- [ ] Follow button on user pages

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- [Yarn](https://yarnpkg.com/)

### Installation

```bash
git clone https://github.com/USERNAME/REPO-NAME.git
cd REPO-NAME
yarn install
```

### Environment variables

Copy the example file and fill in your Firebase credentials:

```bash
cp .env.example .env
```

### Run the project

```bash
yarn dev        # start the development server
yarn build      # create a production build
yarn lint       # run ESLint
```

## Project Structure

```
src/
├── assets/          # Images and static files
├── components/
│   ├── Home/        # Feed, TweetBox and Post components
│   ├── Sidebar/     # Navigation sidebar and IconOption
│   └── Widgets/     # Right-hand widgets column
├── App.jsx
└── main.jsx
```

## Git Workflow

- `main`: stable code, only updated through pull requests
- `develop`: integration branch
- `feature/*`: new features (e.g. `feature/login-page`)
- `fix/*`: bug fixes

Commit messages follow a simple convention: `feat:`, `fix:`, `style:`, `docs:`, `refactor:`, `chore:`.

All code, comments and documentation are written in English.

## License

This project was created for educational purposes.
