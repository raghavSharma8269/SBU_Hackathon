import {
  Calendar,
  Target,
  BookOpen,
  Clock,
  User,
  TrendingUp,
} from "lucide-react";

const RoadMapCard = ({
  name,
  target_role,
  current_year,
  target_timeline,
  created_at,
  total_semesters,
  course_count,
}) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate progress percentage (example)
  const progress = Math.round((current_year / 4) * 100);

  return (
    <div className="relative group">
      {/* Card Container */}
      <div className="relative bg-[#900] text-white backdrop-blur-xl rounded-2xl p-6 border border-[#b33] hover:border-red-500/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,0,0,0.25)]">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Header Section */}
        <div className="relative z-10 flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">Roadmap for</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            <p className="text-red-400 font-medium flex items-center gap-2">
              <Target className="w-4 h-4" />
              {target_role}
            </p>
          </div>

          {/* Year Badge */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-1">
            <span className="text-red-400 text-sm font-semibold">
              Year {current_year}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-gray-400">Progress</span>
            <span className="text-xs text-red-400 font-semibold">
              {progress}%
            </span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-400">Timeline</span>
            </div>
            <p className="text-white font-semibold">{target_timeline}</p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span className="text-xs text-gray-400">Semesters</span>
            </div>
            <p className="text-white font-semibold">{total_semesters}</p>
          </div>
        </div>

        {/* Course Count */}
        <div className="bg-gradient-to-r from-red-500/10 to-transparent border-l-2 border-red-500 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-400" />
              <span className="text-gray-300">Total Courses</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {course_count}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>Created {formatDate(created_at)}</span>
          </div>
          <button className="text-red-400 text-sm hover:text-red-300 transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoadMapCard;
