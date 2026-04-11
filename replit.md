# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Portfolio website clone of shishirr.pro.bd with updated APIs from uploaded Python file.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite + Tailwind CSS
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

- **portfolio** (`/`): Main portfolio website - clone of shishirr.pro.bd with dark glass morphism design, 49 APIs from uploaded Python file, no join channel popup
- **api-server** (`/api`): Shared Express API server

## Key Commands

- `pnpm run typecheck` -- full typecheck across all packages
- `pnpm run build` -- typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` -- regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` -- push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` -- run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
