// NewRoadMapModalComponent.jsx
import React, { useState, useEffect } from "react";

const NewRoadMapModalComponent = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Input states (start empty)
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
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };

  const handleSave = () => {
    console.log({
      target_role: targetRole,
      current_year: currentYear,
      target_timeline: targetTimeline,
      completed_courses: completedCourses,
      skills,
      time_commitment: timeCommitment,
      additional_context: additionalContext,
    });
    handleClose();
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    marginBottom: "12px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const textareaStyle = {
    ...inputStyle,
    height: "100px",
    resize: "vertical",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          width: "500px",
          maxWidth: "90%",
          maxHeight: "90%",
          overflowY: "auto",
          transform: isVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "transform 0.2s ease-in-out",
        }}
      >
        <h2
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}
        >
          New Roadmap
        </h2>

        <label style={labelStyle}>Target Role</label>
        <input
          type="text"
          style={inputStyle}
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
          placeholder="Backend Engineer"
        />

        <label style={labelStyle}>Current Year</label>
        <input
          type="text"
          style={inputStyle}
          value={currentYear}
          onChange={(e) => setCurrentYear(e.target.value)}
          placeholder="Freshman, Sophomore, Junior, Senior"
        />

        <label style={labelStyle}>Target Timeline</label>
        <input
          type="text"
          style={inputStyle}
          value={targetTimeline}
          onChange={(e) => setTargetTimeline(e.target.value)}
          placeholder="Summer 2026"
        />

        <label style={labelStyle}>Completed Courses</label>
        <input
          type="text"
          style={inputStyle}
          value={completedCourses}
          onChange={(e) => setCompletedCourses(e.target.value)}
          placeholder="CSE 114, CSE 214"
        />

        <label style={labelStyle}>Skills</label>
        <input
          type="text"
          style={inputStyle}
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Python, Java, Git, etc."
        />

        <label style={labelStyle}>Time Commitment</label>
        <input
          type="text"
          style={inputStyle}
          value={timeCommitment}
          onChange={(e) => setTimeCommitment(e.target.value)}
          placeholder="ex. 10-15 hrs/week"
        />

        <label style={labelStyle}>Additional Context</label>
        <textarea
          style={textareaStyle}
          value={additionalContext}
          onChange={(e) => setAdditionalContext(e.target.value)}
          placeholder="Interested in cybersecurity..."
        />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "15px",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#ccc",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRoadMapModalComponent;
