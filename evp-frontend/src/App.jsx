import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-24 flex-grow">
        <AppRoutes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
