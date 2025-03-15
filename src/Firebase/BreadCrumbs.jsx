

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