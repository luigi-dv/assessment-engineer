import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "src/pages/Home";
import { NotFoundPage } from "src/pages/NotFound";
import { MainLayout } from "src/layouts/MainLayout";
import { Toaster } from "sonner";

function App() {
  return (
    <div className={"min-h-[100dvh] bg-gray-50 dark:bg-[#0d1117]"}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
