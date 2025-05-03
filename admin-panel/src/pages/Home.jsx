

export default function Home() {
    const handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login after logout
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <p className="text-lg">You can manage your files and settings here.</p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a href="/upload" className="bg-blue-600 text-white px-4 py-2 rounded">Upload File</a>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
  