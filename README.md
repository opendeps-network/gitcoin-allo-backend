# Gitcoin Allo - Backend

Backend service for the OpenDeps Gitcoin Allo Protocol. Provides REST API for Quadratic Funding voting data, project management, and matching pool calculation.

## API Endpoints

- `GET /api/projects` - List all projects
- `POST /api/projects` - Register a new project
- `GET /api/projects/:id` - Get project details
- `GET /api/voting/pool` - Get matching pool balance
- `POST /api/voting/pool` - Fund matching pool
- `POST /api/voting/contribute` - Record a contribution
- `GET /api/voting/contributions` - List all contributions
- `GET /api/voting/matching` - Calculate and return matching results

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm start
```
