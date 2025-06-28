import { Box, Container } from "@mui/material";
import ProjectSummary from "../components/ProjectSummary";
import ProjectStatistics from "../components/ProjectStatistics";

const projectSummary = [
  {
    color: "#9E9BFF",
    count: 24,
    label: "In Progress",
  },
  {
    color: "#F2BB54",
    count: 56,
    label: "In Review",
  },
  {
    color: "#ECA7FE",
    count: 16,
    label: "On Hold",
  },
  {
    color: "#68D669",
    count: 45,
    label: "Completed",
  },
];

function Dashboard() {
  return (
    <Container maxWidth="lg" className="mt-4">
      <Box className="grid sm:grid-cols-2 gap-4">
        <Box>
          <div className="font-bold">Project Summary</div>
          <Box className="grid grid-cols-2  gap-4">
            {projectSummary.map((project) => (
              <ProjectSummary
                color={project.color}
                count={project.count}
                label={project.label}
              />
            ))}
          </Box>
        </Box>

        <Box>
          <div>Project Statistics</div>
          <ProjectStatistics />
        </Box>
      </Box>
    </Container>
  );
}

export default Dashboard;
