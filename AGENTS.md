# AGENTS.md - ServU Application Development Guidelines

This document provides guidelines for AI agents (like Jules) working on the ServU application codebase.

## Project Overview

ServU is a full-stack mobile-first web application connecting users to service providers. It's built with Next.js (React), Firebase (Auth, Firestore, Functions), and TailwindCSS.

Key functionalities include:
- User & Vendor Registration/Login
- Location-based vendor matching
- In-app wallet system
- Service booking system
- Real-time notifications
- Ratings & Reviews
- Admin dashboard

## Coding Conventions

1.  **General:**
    *   Follow standard JavaScript (ES6+) and React best practices.
    *   Code should be modular, scalable, and well-commented.
    *   Keep components small and focused on a single responsibility.
    *   Use descriptive names for variables, functions, and components.
    *   Prioritize readability and maintainability.

2.  **File Structure:**
    *   `pages/`: Next.js page routes.
    *   `components/`: Reusable React components.
        *   `components/auth/`: Authentication-related components.
        *   `components/common/`: Generic, widely used components (Button, Card, etc.).
        *   `components/dashboard/`: Components specific to user/vendor dashboards.
        *   `components/layout/`: Layout components (Header, Footer, MainLayout).
        *   `components/booking/`: Components for the booking flow.
        *   `components/wallet/`: Components for the wallet system.
    *   `contexts/`: React Context API providers (e.g., `AuthContext.js`).
    *   `firebase/`: Firebase configuration (`config.js`) and core initialization.
    *   `hooks/`: Custom React hooks (e.g., `useAuthRedirect.js`).
    *   `lib/`: Helper functions (`helpers.js`), constants (`constants.js`).
    *   `services/`: Modules for specific Firebase interactions (e.g., `userService.js`, `bookingService.js`). Data fetching and manipulation logic for Firestore collections should reside here.
    *   `styles/`: Global styles (`globals.css`). TailwindCSS is the primary styling method.
    *   `utils/`: General utility functions (e.g., `formatters.js`, `validators.js`).
    *   `public/`: Static assets.

3.  **State Management:**
    *   Use React Context API for global state (e.g., authentication status).
    *   For local component state, use `useState` and `useReducer`.
    *   For complex server state caching and synchronization, consider React Query or SWR in the future if needed, but start with direct service calls.

4.  **Styling:**
    *   Utilize TailwindCSS utility classes for styling.
    *   Create custom components in `globals.css` only when absolutely necessary or for base element styling.
    *   Ensure responsiveness (mobile-first approach).

5.  **Firebase Usage:**
    *   **Authentication:** Use Firebase Authentication for user sign-up and login (email/password, Google, phone). Store user roles (`user`, `vendor`, `admin`) in Firestore user profiles.
    *   **Firestore:**
        *   Structure data logically. Example collections: `users`, `bookings`, `services`, `reviews`, `wallets`, `transactions`.
        *   Write security rules to protect data.
        *   All direct Firestore interactions should be encapsulated within functions in the `services/` directory.
    *   **Firebase Functions:** Use for backend logic that requires privileged execution or triggers (e.g., payment processing, complex booking matching, sending notifications).

6.  **Comments:**
    *   Add comments to explain complex logic, assumptions, or important decisions.
    *   JSDoc-style comments for functions are encouraged, explaining parameters and return values.
    *   Each file should ideally start with a comment explaining its purpose.

7.  **Error Handling:**
    *   Implement robust error handling for API calls, form submissions, and other critical operations.
    *   Provide user-friendly error messages.

8.  **Testing (Future):**
    *   (Placeholder for now) Aim for unit tests for utility functions, service functions, and critical components.
    *   Integration tests for user flows.

## Development Workflow

1.  **Understand the Task:** Ensure you have a clear understanding of the requirements. Ask for clarification if needed.
2.  **Plan:** Before writing code, create a plan. Use the `set_plan` tool.
3.  **Implement:** Write code following the conventions above.
4.  **Test (Manual for now):** Manually test the changes in a way that simulates user interaction.
5.  **Commit:** Use clear and descriptive commit messages. (e.g., "feat: Implement user login form", "fix: Correct booking date display").

## Running the App (Simulated Environment)

*   The app is a Next.js application.
*   To run locally (conceptual): `npm run dev`
*   Ensure Firebase configuration in `firebase/config.js` is correctly set up with actual project credentials (this will be done by the user).

## Key Files to Note:

*   `pages/_app.js`: Main app component, good for global layouts and context providers.
*   `firebase/config.js`: Firebase SDK setup. **CRITICAL - requires user's Firebase project credentials.**
*   `tailwind.config.js`: TailwindCSS configuration.
*   `contexts/AuthContext.js`: Manages authentication state.

## Important Considerations for AI Agent

*   **Security:** Be mindful of security implications, especially when dealing with user data and Firebase rules (though you won't write Firebase rules directly, your Firestore queries should anticipate them).
*   **Scalability:** Write code that can be extended and scaled.
*   **User Experience (UX):** While you are primarily focused on code, keep the intended user experience in mind.
*   **Idempotency:** If creating Firebase functions or operations that might be retried, consider making them idempotent.

This `AGENTS.md` will be updated as the project evolves. Always refer to the latest version.
