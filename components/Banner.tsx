const Banner = () => {
    return (
      <div className="relative h-[50vh] w-full ">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/api/placeholder/1920/1080')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        </div>
        
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl space-y-4">
              <h1 className="text-5xl font-bold text-white">The Best Movies </h1>
              <p className="text-lg text-gray-200">
               In this Site You Can FInd
              </p>
              <div className="flex space-x-4 pt-4">
                <button className="flex items-center space-x-2 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
            
                  <span>Play Now</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors">
           
                  <span>More Info</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default Banner;