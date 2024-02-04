import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Dashboard from "containers/pages/Dashboard";
import Error404 from "containers/errors/Error404";

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
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
