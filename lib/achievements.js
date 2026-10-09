export const achievements = [
  {
    name: "Oregon Cybersecurity Challenge Cup",
    date: "2026",
    descriptions: [
      "Competed in the Oregon Cybersecurity Challenge Cup (OC3), a team capture-the-flag (CTF) competition hosted by the University of Oregon in support of the Oregon Cyber Resilience Summit.",
      "Placed 3rd in the High School League during the Jamboree round, qualifying for the Championship round.",
      "Won 1st place in the Championship round, competing on a mixed team of two high school students and one college student, learning about advanced cybersecurity concepts and techniques in the process of competing.",
    ],
    category: "award",
    ranking: "1st Championship & 3rd High School League",
    id: "oregon-cybersecurity-challenge-cup-2026",
    type: ["coding", "competition", "award", "cybersecurity"],
    link: {
      url: "https://ocrs.uoregon.edu/oregon-cybersecurity-challenge-cup/",
      text: "Learn more",
    },
  },
  {
    name: "Congressional App Challenge",
    date: "2025",
    descriptions: [
      "Developed Preparedness & Response for Emergency Planning (PREP), an application to help communities prepare for emergencies.",
      "Features real-time weather and wildfire alerts, hospital and shelter locators with turn-by-turn directions, and comprehensive preparedness checklists.",
      "Collaborated with teammate Brian Wei to win the honorable mention in Oregon's First District Congressional App Challenge.",
    ],
    category: "award",
    ranking: "Honorable Mention",
    id: "congressional-app-challenge-2025",
    type: ["coding", "competition", "award", "design"],
    link: {
      url: "/projects/prep",
      text: "Learn more",
    },
  },
  {
    name: "George Fox University High School Programming Contest",
    date: "March 9th, 2024",
    descriptions: [
      "Solved 12 complex coding problems in less than 5 hours using intermediate Python skills.",
      "Collaborated with two teammates remotely and efficiently in order to organize the completion of the problems in the best way possible.",
      "Was able to remotely help and troubleshoot issues whilst coding collaboratively.",
      "Earned the 2nd Place prize in Division II and Overall.",
    ],
    category: "award",
    ranking: "2nd Overall & Division II",
    id: "george-fox-cs-2024",
    type: ["coding", "competition", "award"],
  },
  {
    name: "DELF French Language Certifications",
    date: "2024 - Present",
    descriptions: [
      "Achieved exceptional scores on both DELF B1 and B2 French language certification exams.",
      "Demonstrated progressive mastery of French language skills across multiple proficiency levels, including reading, writing, listening, and speaking.",
    ],
    category: "certification",
    id: "delf-certifications",
    type: ["languages", "certification", "education"],
    split: {
      type: "score",
      children: [
        {
          name: "DELF B2",
          date: "2025",
          score: "91.5%",
        },
        {
          name: "DELF B1",
          date: "2024",
          score: "94.5%",
        },
      ],
    },
  },
  {
    name: "IB Exam Scores",
    date: "2026",
    descriptions: [
      "Achieved high scores on International Baccalaureate (IB) examinations in the May 2026 session.",
      "Demonstrated strong analytical, research, and problem-solving skills in History and Computer Science.",
    ],
    category: "certification",
    id: "ib-scores",
    type: ["academics", "education"],
    split: {
      type: "score",
      children: [
        {
          name: "IB SL History",
          date: "2026",
          score: "6",
        },
        {
          name: "IB SL Computer Science",
          date: "2026",
          score: "6",
        },
      ],
    },
  },
  {
    name: "AP Test Scores",
    date: "2024 - 2025",
    descriptions: [
      "Achieved outstanding scores on Advanced Placement (AP) examinations",
      "Demonstrated college-level mastery in the French language and Computer Science",
    ],
    category: "certification",
    id: "ap-scores",
    type: ["academics", "education"],
    split: {
      type: "score",
      children: [
        {
          name: "AP French Language",
          date: "2024",
          score: "5",
        },
        {
          name: "AP Computer Science A",
          date: "2025",
          score: "5",
        }
      ],
    },
  },
];
