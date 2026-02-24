# Saved Search + Notifications

Web app that monitors RSS feeds and notifies users when new matching listings appear.

## Goals
- Build a clean monorepo structure for API, worker, web, and shared packages.
- Add features in small, testable increments.


## Roadmap
1. Scaffold repository structure and tooling. X
2. Add shared contracts/types/schemas. X
3. Add API foundation and health endpoints. X
4. Add worker foundation and job flow.
5. Add web app shell and basic integration.
6. Add infra, CI, and documentation hardening.

## Current State/Build

- Packages/shared : Validation logic
	The rules and data shapes: the schemas, types and contracts
	Used(shared) by the different apps
- apps/api
	A usable backend
- apps/worker
	testable processing stub


### Recent Tasks
- Add the worker queue dependencies
- - pnpm --filter @saved-search/worker add bullmq ioredis
	BullMQ needs Redis client for connection handling. Later kept in package.json + lockfile
	and installed via normal pnpm install command.

### Common Commands for testing

pnpm --filter @saved-search/shared build
pnpm --filter @saved-search/api typecheck
pnpm --filter @saved-search/worker typecheck

pnpm --filter @saved-search/shared typecheck
pnpm --filter @saved-search/api typecheck
pnpm --filter @saved-search/worker typecheck

docker compose -f infra/docker-compose.yml up -d redis
docker compose -f infra/docker-compose.yml ps