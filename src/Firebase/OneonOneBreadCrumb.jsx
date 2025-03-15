const OneonOnebreadCrumb = (navigate) => [
    {
      text: 'Dashboard',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
        navigate('/dashboard');
      },
    },
    {
      text: 'Create Meeting',
      href: '#',
      onClick: (e) => {
        e.preventDefault();
        navigate('/create');
      },
    },
    {
      text: 'Create One on One Meeting',
    },
  ];
  
  export default OneonOnebreadCrumb;
  