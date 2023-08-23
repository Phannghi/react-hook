import "./styles.css";
import { useState } from "react";

function App() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem("jobs"));
    console.log(storageJobs);
    if (storageJobs) return storageJobs;
    return [];
  });

  const handleSubmit = () => {
    setJobs((prev) => {
      const newJobs = [...prev, job];

      // Save to local storage
      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);

      return newJobs;
    });
    setJob("");
  };

  // Li component
  const LiItem = ({ job, dataIndex }) => {
    const handleDelete = (e) => {
      const deleteBtn = e.target.closest(".delete");
      if (deleteBtn)
        setJobs((prev) => {
          const newJobs = [...prev];
          newJobs.splice(dataIndex, 1);

          // Save to local storage
          const jsonJobs = JSON.stringify(newJobs);
          localStorage.setItem("jobs", jsonJobs);

          return newJobs;
        });
    };

    return (
      <li>
        {job}
        <button onClick={(e) => handleDelete(e)} className="delete">
          x
        </button>
      </li>
    );
  };
  return (
    <div style={{ padding: 32 }}>
      <input value={job} onChange={(e) => setJob(e.target.value)} />
      <button onClick={handleSubmit}>Add</button>

      <ul>
        {jobs.map((job, index) => (
          <LiItem key={index} dataIndex={index} job={job} />
        ))}
      </ul>
    </div>
  );
}
export default App;
