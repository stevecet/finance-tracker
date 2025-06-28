import { Container, IconButton } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
  return (
    <Container maxWidth="lg">
      <div className="md:flex justify-between items-center hidden">
        <div className="rounded-full px-5 py-2 bg-white shadow-md text-gray-400 font-light text-sm">
          © Copyright <a href="https://github.com/stevecet/">steveceto</a> | all
          rights reserved
        </div>
        <div className="rounded-full px-5 bg-white shadow-md text-gray-400 font-light ">
          <IconButton>
            <WhatsAppIcon className="hover:text-green-500" />
          </IconButton>
          <IconButton>
            <LinkedInIcon className="hover:text-blue-700" />
          </IconButton>
          <IconButton>
            <GitHubIcon className="hover:text-black" />
          </IconButton>
        </div>
      </div>
    </Container>
  );
}
