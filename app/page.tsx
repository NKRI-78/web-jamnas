import Home from "@components/home/Home";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jamnas HTCI 2025 | Home",
  description: "Home",
};

const HomePage: React.FC = () => {
    return (
        <Home />
    );
};

export default HomePage;