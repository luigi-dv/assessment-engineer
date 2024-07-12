import { Outlet } from "react-router-dom";
import { Navigation } from "src/components/Navigation";

export const MainLayout = () => {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <Navigation />

      <hr />
      <Outlet />
    </div>
  );
};
