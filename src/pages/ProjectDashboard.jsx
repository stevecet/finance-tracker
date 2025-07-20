import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Typography,
} from "@mui/material";
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

function ProjectDashboard() {
  return (
    <Container maxWidth="lg" className="mt-4">
      <div className="flex justify-between items-center pb-7">
        <div className="text-2xl font-bold">Project dashboard</div>
        <Chip
          label="Ongoing"
          className="bg-green-100 text-green-800"
          sx={{
            backgroundColor: "#dcfce7",
            color: "#166534",
            fontWeight: 500,
          }}
        />
      </div>

      <Box className="grid lg:grid-cols-2 gap-4">
        <Box>
          <Box className="grid grid-cols-2 gap-8">
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
          <ProjectStatistics />
        </Box>
      </Box>
    </Container>
  );
}

export default ProjectDashboard;
