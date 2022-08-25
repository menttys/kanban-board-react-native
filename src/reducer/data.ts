export const mockData = {
  lastIndice: 3,
  boards: {
    ['0']: {
      name: 'Backlog',
      tickets: [
        {
          id: 'A1',
          title: 'Chewbacca',
          description:
            'This is the first boy, This is the first boy This is the first boy This is the first boy This is the first boy This is the first boy This is the first boy',
          tag: 'Star Wars',
          link: 'https://www.google.com',
        },
      ],
    },
    ['1']: {
      name: 'To Do',
      tickets: [
        {
          id: 'A2',
          title: 'Row 5',
          description:
            'This is the first boy, This is the first boy This is the first boy This is the first boy This is the first boy This is the first boy This is the first boy',
          tag: 'Star Wars',
          link: 'https://www.google.com',
        },
        {
          id: 'A3',
          title: 'Row 6 ',
          description:
            'This is the first boy, This is the first boy This is the first boy This is the first boy This is the first boy This is the first boy This is the first boy',
          tag: 'Marvel',
          link: 'https://www.google.com',
        },
      ],
    },
    ['2']: {
      name: 'In Development',
      tickets: [],
    },
    ['3']: {
      name: 'Completed',
      tickets: [],
    },
  },
};
