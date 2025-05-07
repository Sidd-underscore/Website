export const achievements = [
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
    name: "Academic Honor Society Memberships",
    date: "2024 - Present",
    descriptions: [],
    category: "membership",
    id: "honor-societies",
    type: ["academics"],
    split: {
      type: "description",
      children: [
        {
          name: "National Honor Society (NHS)",
          date: "2025 - Present",
          descriptions: [
            "Recognized for academic excellence, leadership, and community service.",
          ],
        },
        {
          name: "National Society of High School Scholars (NSHSS)",
          date: "2024 - Present",
          descriptions: [
            "Recognized for outstanding academic achievement and leadership potential.",
          ],
        },
      ],
    },
  },
  {
    name: "Stanford Online: Computer Science 101",
    date: "2024",
    descriptions: [
      "Successfully completed the Computer Science 101 course offered by Stanford Online (through edX) in freshman year (9th grade) of High School.",
      "Gained a foundational understanding of computer science concepts.",
    ],
    category: "certification",
    id: "stanford-cs101-2024",
    type: ["coding", "education", "certification"],
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
    name: "AP Test Scores",
    date: "2024 - 2025",
    descriptions: [
      "Achieved outstanding scores on Advanced Placement (AP) examinations",
      "Demonstrated college-level mastery in various subject areas through rigorous testing",
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
      ],
    },
  },
];
