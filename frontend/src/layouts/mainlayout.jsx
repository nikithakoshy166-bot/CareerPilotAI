import Navbar from "../components/navbar/navbar";

function MainLayout({ children }) {
  return (
    <div className="container-fluid p-0">

      <Navbar />

      <div>
        {children}
      </div>

    </div>
  );
}

export default MainLayout;