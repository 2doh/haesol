// import Loading from "components/loading/Loading";
// import { Suspense, lazy } from "react";
// import { createBrowserRouter } from "react-router-dom";

// const LazyHome = lazy(() => import("../pages/Home/Home"));
// const LazyLogin = lazy(() => import("../pages/user/Login"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <LazyHome />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/login",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <LazyLogin />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/signup",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <LazyLogin />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/findid",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <LazyLogin />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/findpass",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <LazyLogin />
//       </Suspense>
//     ),
//   },
// ]);

// export default router;
