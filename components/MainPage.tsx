import Header from "@/components/Header"
import Banner from  "@/components/Banner"

const MainPage = () => {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <main>
          <Banner />
          {/* Movie grid will go here later */}
        </main>
      </div>
    );
  };
  
  export default MainPage;