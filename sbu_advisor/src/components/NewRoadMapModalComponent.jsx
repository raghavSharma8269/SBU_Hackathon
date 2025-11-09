import React, { useState, useEffect } from "react";
import axios from "axios";

const NewRoadMapModalComponent = ({ onClose, onRoadmapCreated }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [targetRole, setTargetRole] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [targetTimeline, setTargetTimeline] = useState("");
  const [completedCourses, setCompletedCourses] = useState("");
  const [skills, setSkills] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [additionalContext, setAdditionalContext] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    // Prevent closing while loading
    if (isLoading) return;

    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };

  const handleSave = async () => {
    // Prepare the request body
    const formData = {
      targetRole,
      currentYear,
      targetTimeline,
      completedCourses,
      skills,
      timeCommitment,
      additionalContext,
    };

    try {
      setIsLoading(true);
      setError(null);

      console.log("Sending form data to generate roadmap:", formData);

      const response = await axios.post(
        "http://localhost:5001/api/roadmaps/generate",
        formData
      );

      console.log("Roadmap generated successfully:", response.data);

      // Call the callback to refresh the roadmaps list
      if (onRoadmapCreated) {
        onRoadmapCreated(response.data);
      }

      handleClose();
    } catch (err) {
      console.error("Error generating roadmap:", err);
      console.error("Error details:", err.response);
      setError(err.response?.data?.error || "Failed to generate roadmap");
    } finally {
      setIsLoading(false);
    }
  };

  // Common input style
  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "#fff",
    outline: "none",
    marginBottom: "12px",
    backdropFilter: "blur(8px)",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
    color: "#fff",
  };

  const textareaStyle = {
    ...inputStyle,
    height: "100px",
    resize: "vertical",
  };

  // Button style function
  const gradientButtonStyle = (gradient) => ({
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    background: gradient,
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  });

  const handleHover = (e) => {
    if (!isLoading) {
      e.currentTarget.style.transform = "scale(1.05)";
      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.35)";
    }
  };

  const handleLeave = (e) => {
    if (!isLoading) {
      e.currentTarget.style.transform = "scale(1)";
      e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    }
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      {/* Loading Overlay */}
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10000,
          }}
        >
          {/* Spinner */}
          <div
            style={{
              width: "60px",
              height: "60px",
              border: "4px solid rgba(255,255,255,0.2)",
              borderTop: "4px solid #900",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
              marginBottom: "20px",
            }}
          />

          {/* Loading Text */}
          <div
            style={{
              color: "#fff",
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            Generating Your Roadmap...
          </div>

          {/* Warning */}
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              textAlign: "center",
              maxWidth: "400px",
              padding: "12px 20px",
              background: "rgba(153, 0, 0, 0.3)",
              borderRadius: "8px",
              border: "1px solid rgba(153, 0, 0, 0.5)",
            }}
          >
            ⚠️ Please do not close this window or navigate away. This may take a
            moment.
          </div>
        </div>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "500px",
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          padding: "25px",
          borderRadius: "16px",
          background:
            "linear-gradient(214deg, rgba(153,0,0,0.9) 20%, rgba(87, 10, 10, 0.9) 100%)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "transform 0.2s ease-in-out",
          backdropFilter: "blur(20px)",
          pointerEvents: isLoading ? "none" : "auto",
          opacity: isLoading ? 0.5 : 1,
        }}
        className="modal-scroll"
      >
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "20px",
            color: "#fff",
          }}
        >
          New Roadmap
        </h2>

        {/* Error Message */}
        {error && (
          <div
            style={{
              padding: "10px",
              marginBottom: "15px",
              backgroundColor: "rgba(255,0,0,0.2)",
              border: "1px solid rgba(255,0,0,0.5)",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Inputs */}
        <label style={labelStyle}>Target Role</label>
        <input
          type="text"
          style={inputStyle}
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="Backend Engineer"
          disabled={isLoading}
        />

        <label style={labelStyle}>Current Year</label>
        <input
          type="text"
          style={inputStyle}
          value={currentYear}
          onChange={(e) => setCurrentYear(e.target.value)}
          placeholder="Freshman, Sophomore, Junior, Senior"
          disabled={isLoading}
        />

        <label style={labelStyle}>Target Timeline</label>
        <input
          type="text"
          style={inputStyle}
          value={targetTimeline}
          onChange={(e) => setTargetTimeline(e.target.value)}
          placeholder="Summer 2026"
          disabled={isLoading}
        />

        <label style={labelStyle}>Completed Courses</label>
        <input
          type="text"
          style={inputStyle}
          value={completedCourses}
          onChange={(e) => setCompletedCourses(e.target.value)}
          placeholder="CSE 114, CSE 214"
          disabled={isLoading}
        />

        <label style={labelStyle}>Skills</label>
        <input
          type="text"
          style={inputStyle}
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Python, Java, Git, etc."
          disabled={isLoading}
        />

        <label style={labelStyle}>Time Commitment</label>
        <input
          type="text"
          style={inputStyle}
          value={timeCommitment}
          onChange={(e) => setTimeCommitment(e.target.value)}
          placeholder="ex. 10-15 hrs/week"
          disabled={isLoading}
        />

        <label style={labelStyle}>Additional Context</label>
        <textarea
          style={textareaStyle}
          value={additionalContext}
          onChange={(e) => setAdditionalContext(e.target.value)}
          placeholder="Interested in cybersecurity..."
          disabled={isLoading}
        />

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              ...gradientButtonStyle(
                "linear-gradient(214deg, rgba(80,80,80,1) 20%, rgba(40,40,40,1) 100%)"
              ),
              opacity: isLoading ? 0.5 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              ...gradientButtonStyle("black"),
              background: "#900",
              color: "#fff",
              opacity: isLoading ? 0.5 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            disabled={isLoading}
          >
            {isLoading ? "Generating..." : "Confirm"}
          </button>
        </div>
      </div>

      {/* Add keyframe animation for spinner */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default NewRoadMapModalComponent;
