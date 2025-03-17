

export const getCreateMeetingBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
    href: "#",
    onClick: (e) => {
      e.preventDefault();
      navigate("/dashboard");
    },
  },
  {
    text: "Create Meeting",
  },
];


export const getVideoConferenceBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
    href: "#",
    onClick: (e) => {
      e.preventDefault();
      navigate("/dashboard");
    },
  },
  {
    text: "Create Video Conference",
  },
];

export const getMyMettingsBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
    href: "#",
    onClick: (e) => {
      e.preventDefault();
      navigate("/dashboard");
    },
  },
  {
    text: "My Meetings",
  },
];

export const getMeetingsBreadCrumbs = (navigate) => [
  {
    text: "Dashboard",
    href: "#",
    onClick: (e) => {
      e.preventDefault();
      navigate("/dashboard");
    },
  },
  {
    text: "Meetings",
  },
];