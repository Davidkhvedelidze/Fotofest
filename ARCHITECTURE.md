# Enterprise Architecture Overview

This project is being aligned to **Clean Architecture + Feature-Based Architecture** for scalable and maintainable growth. The focus is on:

- **Separation of concerns** (UI vs. domain vs. infrastructure)
- **Explicit naming**
- **Modular business logic**
- **Consistent folder standards**
- **Typed API boundaries with runtime guards**

## Proposed Folder Structure

```
src/
  app/                     # Next.js app router (routes + route handlers)
    (routes)/
    api/
  components/
    ui/                    # Design system primitives
    common/
    layout/
  features/
    auth/
      api/
      components/
      hooks/
      services/
      types/
    events/
      api/
      components/
      hooks/
      services/
      types/
    contact/
      api/
      components/
      hooks/
      services/
      types/
  hooks/                   # Cross-feature hooks
  lib/
    services/              # Infrastructure + shared services
    utils/
    constants/
  styles/                  # Global styles and tokens
```

**Why this structure**
- **Features are self-contained**: API, types, and business logic live together for each domain.
- **UI is reusable**: shared components stay isolated in `components/ui`.
- **Infrastructure is centralized**: cross-cutting services live in `lib/services`.

## Service Layer Design

Each feature exposes a **service layer** that coordinates API calls and domain logic. The service layer:

- Contains domain-specific behavior (sorting, filtering, orchestration).
- Returns typed domain objects.
- Shields UI from transport-layer details (HTTP, routes, validation).

Example (Events Service):

```
features/events/services/eventsService.ts
  - fetchShowcaseEvents()
  - sortShowcaseEventsByCreatedAt()
  - sortShowcaseEventsByDate()
  - submitEventRequest()
```

This keeps UI components focused on rendering and user interactions, and makes business logic testable.

## API Abstraction Improvements

The HTTP abstraction has been upgraded with:

- **Typed response guards** for runtime safety.
- **Centralized error logging** and retry logic.
- **Standardized response validation** to prevent silent failures.

Example:

```
lib/services/http.ts
  - httpRequest<T>(..., { responseGuard })

features/events/api/guards.ts
  - isShowcaseEventsResponse()
  - isEventListResponse()
```

This pattern enforces API consistency and makes failures visible early.

## Refactored Example Modules

### Events Feature

**Before**
- UI components invoked `fetch()` directly.
- Sorting logic was duplicated in multiple components.

**After**
- The `eventsService` encapsulates fetching + sorting logic.
- UI reads clean domain data via service methods.
- API responses are validated with type guards.

Key modules:
- `features/events/types.ts` (domain types)
- `features/events/api/eventsClient.ts` (API client)
- `features/events/api/guards.ts` (runtime validation)
- `features/events/services/eventsService.ts` (business logic)

### Contact Feature

- Contact types moved into `features/contact/types.ts` for feature isolation.

## Next Steps (Recommended)

1. **Standardize UI primitives** under `components/ui` (Button, Input, Card, DataTable).
2. **Introduce feature hooks** (e.g. `useShowcaseEvents`) for consistent data access.
3. **Create RSC-first pages** for data fetching with server components where possible.
4. **Add tests**: unit tests for services and guards; Playwright for key flows.
5. **Add design tokens** to Tailwind config to align with enterprise design system goals.
