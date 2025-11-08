const RoadMapCardComponent = () => {
  const handleClick = () => {
    console.log("Roadmap card clicked!");
  };

  return (
    <div
      onClick={handleClick}
      className="w-[300px] h-[150px] bg-[#900] text-white rounded-lg shadow-lg p-6 cursor-pointer transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
      style={{ padding: "20px" }}
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Roadmap Title</h3>
        <span className="text-sm">Year 2</span>
      </div>
      <p className="text-sm mb-1">Target Role: Full Stack Developer</p>
      <p className="text-sm">Timeline: 4 Years</p>
    </div>
  );
};

export default RoadMapCardComponent;
