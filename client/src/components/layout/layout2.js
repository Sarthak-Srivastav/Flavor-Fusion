// import React from "react";
// import Header from "./header";
// import { Helmet } from "react-helmet";
// import { Toaster } from "react-hot-toast";

// const Layout2 = ({ children, title, description, keywords, author }) => {
//   return (
//     <div>
//       <Helmet>
//         <meta charSet="utf-8" />
//         <meta name="description" content={description} />
//         <meta name="keywords" content={keywords} />
//         <meta name="author" content={author} />
//         <title>{title}</title>
//       </Helmet>
//       <Header />
//       <main style={{ minHeight: "80vh" }}>
//         <Toaster />
//         {children}
//       </main>
//     </div>
//   );
// };

// Layout2.defaultProps = {
//   title: "Helmets",
//   description: "Flavor your Recipes",
//   keywords: "mern,react,node,express,react,Recipes,food",
//   author: "Flavor fusion",
// };
// export default Layout2;

import React from "react";
import Header from "./header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout2 = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <Toaster />
      {children}
    </div>
  );
};

Layout2.defaultProps = {
  title: "Flavor Fusion",
  description: "Recipe and Food ",
  keywords: "mern, react, node, express, react, recipe, food",
  author: "Flavor fusion",
};

export default Layout2;
