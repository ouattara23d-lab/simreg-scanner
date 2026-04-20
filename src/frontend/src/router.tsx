import {
  Outlet,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const MainPage = lazy(() => import("@/pages/MainPage"));
const AidePage = lazy(() => import("@/pages/AidePage"));

const rootRoute = createRootRoute({
  component: () => (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen bg-background">
          <span className="text-muted-foreground text-sm">Chargement…</span>
        </div>
      }
    >
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainPage,
});

const aideRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/aide",
  component: AidePage,
});

const routeTree = rootRoute.addChildren([indexRoute, aideRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
