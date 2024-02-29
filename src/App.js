import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Dashboard from "containers/pages/dashboard/Dashboard";
import Error404 from "containers/errors/Error404";
import Blog from "containers/pages/blog/Blog";
import Login from "containers/auth/Login";
import Register from "containers/auth/Register";
import ResetPassword from "containers/auth/ResetPassword";
import ResetPasswordConfirm from "containers/auth/ResetPasswordConfirm";
import EditPost from "containers/pages/blog/EditPost";
import Preview from "containers/pages/blog/Preview";

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>MojeZcg | Dashboard</title>
        <meta
          name="description"
          content="Blog sobre actualidad en software y marketing digital. Crea articulos inspiradores para la comunidad."
        />
        <meta
          name="keywords"
          content="blog, blog de software, blog de marketing digital, blog de actualidad."
        />
        <meta name="robots" content="all" />
        <link rel="canonical" href="http://localhost:8000" />
        <meta name="author" content="Walter J. Montenegro" />
        <meta name="publisher" content="MojeZcg" />

        <meta name="og:title" content="MojeZcg | Blog Page" />
        <meta
          name="og:description"
          content="Blog sobre actualidad en software y marketing digital. Crea articulos inspiradores para la comunidad."
        />
        <meta name="og:url" content="http://localhost:8000" />
        <meta
          name="og:image"
          content="https://cdn.icon-icons.com/icons2/1996/PNG/512/blog_blogger_business_news_web_website_icon_123264.png"
        />

        <meta name="twitter:title " content="MojeZcg | Blog Page" />
        <meta
          name="twitter:description"
          content="Blog sobre actualidad en software y marketing digital. Crea articulos inspiradores para la comunidad."
        />
        <meta
          name="twitter:image"
          content="https://cdn.icon-icons.com/icons2/1996/PNG/512/blog_blogger_business_news_web_website_icon_123264.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <Router>
        <Routes>
          {/* Error404 Display */}
          <Route path="*" element={<Error404 />} />

          {/* Page Displays */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route
            path="/password/reset/confirm/:uid/:token"
            element={<ResetPasswordConfirm />}
          />

          <Route path="/blog" element={<Blog />} />
          <Route path="/edit/:slug" element={<EditPost />} />
          <Route path="/preview/:slug" element={<Preview />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
