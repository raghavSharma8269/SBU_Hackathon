// Import: Navigation
import { useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";

// Import: Components
import ContentHeader from "../components/ContentHeader";
import SideNav from "../components/SideNav";
import MainView from "../components/MainView";
import SemesterBoard from "../components/SemesterBoard";

// Import: CSS
import "./PlannerPage.css";

// Import: Predefine semesters data
import initialSemesters from "../data/avaliable_semesters.json";

export default function Portal() {
  const { state } = useLocation();
  const userName = state?.name || "Guest";

  // Lift semesters into state so drag & drop can mutate them
  const [semesters, setSemesters] = useState(() => initialSemesters);
  // Persisted roadmap ID (saved in the backend). Read from localStorage if present.
  const [roadmapId, setRoadmapId] = useState(() =>
    typeof window !== "undefined" ? localStorage.getItem("roadmapId") : null
  );

  // If the user navigated here with a roadmap in location.state, load it into semesters
  useEffect(() => {
    if (!state) return;

    // The Home page passes { roadmap: <roadmap document> }
    const incoming = state.roadmap;
    if (!incoming) return;

    // If the document stores its planner under `roadmap.semesters`, prefer that.
    const incomingSemesters =
      (incoming.roadmap && incoming.roadmap.semesters) || incoming.semesters;

    if (Array.isArray(incomingSemesters) && incomingSemesters.length > 0) {
      setSemesters(incomingSemesters);
    }

    // If the incoming doc has an _id, persist it so subsequent saves update the same record
    if (incoming._id) {
      setRoadmapId(incoming._id);
      try {
        localStorage.setItem("roadmapId", incoming._id);
      } catch (err) {
        // ignore localStorage failures
      }
    }
    // Also store a local copy of the document for quick reloads
    try {
      localStorage.setItem("roadmap", JSON.stringify(incoming));
    } catch (err) {
      // ignore
    }
  }, [state]);

  // Compute set of planned course IDs to hide them from the SideNav
  const plannedCourseIds = useMemo(() => {
    const ids = new Set();
    semesters.forEach((sem) => sem.courses.forEach((c) => ids.add(c.id)));
    return ids;
  }, [semesters]);

  const handleNewSemester = () => {
    // Future: show modal to create new semester
  };

  const handleSaveRoadmap = async () => {
    // Prepare roadmap payload
    const roadmapPayload = { semesters };

    // API base - matches server/server.js (dev server runs on 5001)
    const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5001";

    try {
      if (roadmapId) {
        // Update existing roadmap
        const res = await fetch(`${API_BASE}/api/roadmaps/${roadmapId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roadmap: roadmapPayload }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error || `Update failed (${res.status})`);
        }

        const updated = await res.json();
        // Keep a local copy for quick reloads
        localStorage.setItem("roadmap", JSON.stringify(updated));
        console.log("Roadmap updated:", updated);
        // Optionally notify user
        // eslint-disable-next-line no-alert
        alert("Roadmap updated successfully.");
      } else {
        // Create a new roadmap in the backend. Use a sensible title derived from the UI.
        const title = "SWE Track - Full-Stack Development";
        const res = await fetch(`${API_BASE}/api/roadmaps`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, roadmap: roadmapPayload }),
        });

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error || `Create failed (${res.status})`);
        }

        const created = await res.json();
        // Save returned id for future updates
        if (created && created._id) {
          setRoadmapId(created._id);
          localStorage.setItem("roadmapId", created._id);
        }
        localStorage.setItem("roadmap", JSON.stringify(created));
        console.log("Roadmap created:", created);
        // eslint-disable-next-line no-alert
        alert("Roadmap saved to server.");
      }
    } catch (err) {
      console.error("Failed to save roadmap:", err);
      // eslint-disable-next-line no-alert
      alert("Failed to save roadmap. See console for details.");
    }
  };

  // Helper to recompute credits
  const computeCredits = (courses) =>
    courses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0);

  // Remove a course from a given semester
  const unscheduleCourse = (fromSemId, courseId) => {
    setSemesters((prev) =>
      prev.map((sem) => {
        if (sem.id !== fromSemId) return sem;
        const newCourses = sem.courses.filter((c) => c.id !== courseId);
        return {
          ...sem,
          courses: newCourses,
          totalCredits: computeCredits(newCourses),
        };
      })
    );
  };

  // Add (or move) a course to a semester. If course.fromSemId is present and different, remove from source.
  const addCourseToSemester = (toSemId, course) => {
    const fromSemId =
      course.fromSemId && course.fromSemId !== toSemId
        ? course.fromSemId
        : null;
    setSemesters((prev) =>
      prev.map((sem) => {
        if (fromSemId && sem.id === fromSemId) {
          const newCourses = sem.courses.filter((c) => c.id !== course.id);
          return {
            ...sem,
            courses: newCourses,
            totalCredits: computeCredits(newCourses),
          };
        }
        if (sem.id === toSemId) {
          const exists = sem.courses.some((c) => c.id === course.id);
          const newCourses = exists
            ? sem.courses
            : [...sem.courses, { ...course, fromSemId: undefined }];
          return {
            ...sem,
            courses: newCourses,
            totalCredits: computeCredits(newCourses),
          };
        }
        return sem;
      })
    );
  };

  return (
    <div className="portal-page">
      <elevenlabs-convai agent-id="agent_2001k9gndv75fw5at9cwr5m29k7x"></elevenlabs-convai>
      <script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        type="text/javascript"
      />
      <ContentHeader
        onNewSemester={handleNewSemester}
        onSaveRoadmap={handleSaveRoadmap}
        track="SWE Track"
        focus="Full-Stack Development"
      />
      <div className="portal-content">
        <SideNav
          excludeIds={plannedCourseIds}
          onUnscheduleCourse={unscheduleCourse}
        />
        <MainView>
          <SemesterBoard
            semesters={semesters}
            onDropCourse={addCourseToSemester}
          />
        </MainView>
      </div>
    </div>
  );
}
