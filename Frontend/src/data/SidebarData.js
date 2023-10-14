import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { FaHospitalUser, FaFilePrescription } from "react-icons/fa";
import LogoutIcon from "@mui/icons-material/Logout";
import { UserContext } from "../contexts/UserProvider";

export const links = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "dashboard",
  },
  {
    title: "Doctors",
    icon: <FaHospitalUser size={24} />,
    link: "doctors",
  },
  {
    title: "P.A",
    icon: <GroupIcon />,
    link: "assistants",
  },
  {
    title: "Appointments",
    icon: <EventAvailableIcon />,
    link: "appointments",
  },
];

export const doctorlinks = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "doctor/dashboard",
  },
  {
    title: "Assigned P.A",
    icon: <GroupIcon />,
    link: "doctor/assistants",
  },
  {
    title: "Appointments",
    icon: <EventAvailableIcon />,
    link: "doctor/appointments",
  },
  {
    title: "Medical Access",
    icon: <FaFilePrescription size={24} />,
    link: "doctor/medicalAccess",
  },
];

export const assistantlinks = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: "assistant/dashboard",
  },
  {
    title: "Assigned Doctors",
    icon: <FaHospitalUser size={24} />,
    link: "assistant/assigneddoctors",
  },
  {
    title: "Appointments",
    icon: <EventAvailableIcon />,
    link: "assistant/appointments",
  },

];

// export default links
