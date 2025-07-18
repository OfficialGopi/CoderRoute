import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SuspenseLoader from "../components/loaders/SuspenseLoader";
import { useThemeState } from "@/toolkit/ui-state-handling/ThemeChange";

//LANDING PAGE
const LandingPage = lazy(() => import("../app/LandingPage"));
const LoginPage = lazy(() => import("../app/LoginPage"));
const SignupPage = lazy(() => import("../app/SignupPage"));
const VerifyEmailPage = lazy(() => import("../app/VerifyEmailPage"));
const ForgotPasswordPage = lazy(() => import("../app/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../app/ResetPasswordPage"));

//PROFILE PAGE
const ProfilePage = lazy(() => import("../app/profile/ProfilePage"));
const DashboardPage = lazy(() => import("../app/profile/DashboardPage"));
const SettingsPage = lazy(() => import("../app/profile/SettingsPage"));
const SettingsForPasswordPage = lazy(
  () => import("../app/profile/SettingsForPasswordPage"),
);

//PROBLEMS PAGE
const ProblemsPage = lazy(() => import("../app/problems/ProblemsPage"));
const ProblemEditorialPage = lazy(
  () => import("../app/problems/ProblemEditorialPage"),
);
const CreateProblemPage = lazy(
  () => import("../app/problems/CreateProblemPage"),
);
const ProblemsSolvePage = lazy(
  () => import("../app/problems/ProblemsSolvePage"),
);
const ProblemsAnalytics = lazy(
  () => import("../app/problems/ProblemsAnalyticsPage"),
);
const ProblemSubmissionsPage = lazy(
  () => import("../app/problems/ProblemSubmissionsPage"),
);
const ProblemSubmissionsDetailsPage = lazy(
  () => import("../app/problems/ProblemSubmissionsDetailsPage"),
);
const SolvedProblemsPage = lazy(
  () => import("../app/problems/SolvedProblemsPage"),
);
//PLAYLISTS PAGE
const PlaylistPage = lazy(() => import("../app/playlists/PlaylistPage"));
const PlaylistDetailsPage = lazy(
  () => import("../app/playlists/PlaylistDetailsPage"),
);
const PlaylistCreatePage = lazy(
  () => import("../app/playlists/PlaylistCreatePage"),
);
const EditPlaylistPage = lazy(
  () => import("../app/playlists/EditPlaylistPage"),
);

//DISCUSSIONS PAGE
const DiscussPage = lazy(() => import("../app/discussions/DiscussPage"));
const DiscussionOnProblemDetailsPage = lazy(
  () => import("../app/discussions/DiscussionOnProblemDetailsPage"),
);
const DiscussionDetailsPage = lazy(
  () => import("../app/discussions/DiscussionDetailsPage"),
);
//CONTESTS PAGE
const ContestPage = lazy(() => import("../app/contests/ContestPage"));
const CreateContestPage = lazy(
  () => import("../app/contests/CreateContestPage"),
);
const ContestProblemPage = lazy(
  () => import("../app/contests/ContestProblemPage"),
);
const ContestDetailsPage = lazy(
  () => import("../app/contests/ContestDetailsPage"),
);
const ContestStandingsPage = lazy(
  () => import("../app/contests/ContestStandingsPage"),
);

//NOT FOUND PAGE
const NotFoundPage = lazy(() => import("../app/NotFoundPage"));

//LAYOUTS
const AuthenticationLayout = lazy(
  () => import("../components/layouts/AuthenticationLayout"),
);
const NavbarLayout = lazy(() => import("../components/layouts/NavbarLayout"));
const InProblemNavbar = lazy(
  () => import("../components/layouts/InProblemNavbar"),
);
const InProblemsLayout = lazy(
  () => import("../components/layouts/InProblemsLayout"),
);
const InProblemLinkOptionsLayout = lazy(
  () => import("../components/layouts/InProblemLinkOptionsLayout"),
);

const Router = () => {
  const { toggleTheme } = useThemeState();

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      toggleTheme();
    }
  }, []);

  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route element={<AuthenticationLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        {/* Authenticated Routes */}
        {/* PROFILE ROUTES */}
        <Route element={<NavbarLayout />}>
          <Route path="/profile/:userId" element={<ProfilePage />} />
          <Route
            path="/profile/:userId/dashboard"
            element={<DashboardPage />}
          />
          <Route path="/profile/:userId/settings" element={<SettingsPage />} />
          <Route
            path="/profile/:userId/settings/password"
            element={<SettingsForPasswordPage />}
          />

          <Route path="/problems" element={<ProblemsPage />} />

          {/* PLAYLIST ROUTES */}
          <Route path="/playlists" element={<PlaylistPage />} />
          <Route path="/playlists/create" element={<PlaylistCreatePage />} />
          <Route
            path="/playlists/:playlistId"
            element={<PlaylistDetailsPage />}
          />
          <Route
            path="/playlists/:playlistId/edit"
            element={<EditPlaylistPage />}
          />

          {/* DISCUSSION ROUTES */}
          <Route path="/discussions" element={<DiscussPage />} />
          <Route
            path="/discussions/:discussionId"
            element={<DiscussionDetailsPage />}
          />

          {/* CONTEST ROUTES */}
          <Route path="/contests" element={<ContestPage />} />
          <Route
            path="/contests/create-contest"
            element={<CreateContestPage />}
          />
          <Route path="/contests/:contestId" element={<ContestProblemPage />} />
          <Route
            path="/contests/:contestId/problem/:problemId"
            element={<ContestDetailsPage />}
          />
          <Route
            path="/contests/:contestId/standings"
            element={<ContestStandingsPage />}
          />
          <Route
            path="/problems/create-problem"
            element={<CreateProblemPage />}
          />
        </Route>
        <Route element={<InProblemNavbar />}>
          <Route element={<InProblemsLayout />}>
            <Route element={<InProblemLinkOptionsLayout />}>
              <Route
                path="/problems/:problemId"
                element={<ProblemsSolvePage />}
              />
              <Route
                path="/problems/:problemId/editorial"
                element={<ProblemEditorialPage />}
              />
              <Route
                path="/problems/:problemId/analytics"
                element={<ProblemsAnalytics />}
              />
              <Route
                path="/problems/:problemId/submissions"
                element={<ProblemSubmissionsPage />}
              />
              <Route
                path="/problems/:problemId/submissions/:submissionId"
                element={<ProblemSubmissionsDetailsPage />}
              />
              <Route path="/problems/solved" element={<SolvedProblemsPage />} />

              <Route
                path="/discussions/problem/:problemId"
                element={<DiscussionOnProblemDetailsPage />}
              />
            </Route>
          </Route>
        </Route>

        {/* CATCH-ALL */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
