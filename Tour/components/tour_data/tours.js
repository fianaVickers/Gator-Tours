const tours = [
  {
    type: "majors",
    title: "Tour by Majors",
    data: [
      {
        id: '1',
        text: 'Computer Engineering',
        description: "Computer Engineering is a discipline that embodies the science and technology of design, construction, implementation, and maintenance of software and hardware components of computing systems and computer-controlled equipment. This tour will take you to several key buildings that are important within the major, including the CISE building, the New Engineering Building, the recently finished Herbert Wertheim Laboratory for Engineering Excellence, and finally the soon to be opened Malachowsky Hall.",
        destinations: [
          "Computer & Information Science & Engineering Building",
          "New Engineering Building",
          "Wertheim Lab",
          "Malachowsky Hall"
        ],
        links: [
          {
            text: "ECE Department",
            link: "https://ece.ufl.edu/academics/undergraduate/cpe/"
          },
          {
            text: "Undergraduate Catalog",
            link: "https://catalog.ufl.edu/UGRD/colleges-schools/UGENG/CPE_BSCO/"
          }
        ],
        locations: [
          // CISE Building
          { latitude: 29.648365, longitude: -82.344051, visited: false },
          // NEB
          { latitude: 29.64233, longitude: -82.34698, visited: false },
          // Wertheim Lab
          { latitude: 29.64741, longitude: -82.34804, visited: false },
          // Malachowsky Hall
          { latitude: 29.64441, longitude: -82.34773, visited: false }
        ],
        pictures: [
          require("./photos/cise2.png"),
          require("./photos/cise3.png")
        ]
      },
      {
        id: '2',
        text: 'Biology',
        description: "The Biology majors at the University of Florida combine faculty and resources of the College of Agricultural and Life Sciences and the College of Liberal Arts and Sciences to prepare undergraduates for careers in the biological sciences, advanced study in professional and graduate schools, productive citizenship and leadership, and lifelong learning. The Biology major offers a broader approach to biology than available through specialized biological sciences, which makes it a popular choice for students pursuing graduate school. This tour will take you through several locations which students pursuing degrees in Biology are sure to become familiar with throughout their undergraduate coursework.",
        destinations:[
          "Bartram-Carr Hall",
          "Health Science Center Library",
          "Florida Gymnasium",
          "Department of Microbiology",
          "Scott Family Chemistry Lab"
        ],
        links:[
          {
            text: "College of Liberal Arts and Sciences Biology Major",
            link: "https://catalog.ufl.edu/UGRD/colleges-schools/UGLAS/BIO_BA_BS/"
          },
          {
            text: "College of Agriculture and Life Sciences Biology Major",
            link: "https://catalog.ufl.edu/UGRD/colleges-schools/UGAGL/BLY_BS/"
          }
        ],
        locations: [
          // Bartram
          { latitude: 29.64395, longitude: -82.34440, visited: false },
          // Health Science Center Library
          { latitude: 29.64094, longitude: -82.34490, visited: false },
          // Florida Gym
          { latitude: 29.64951, longitude: -82.34726, visited: false },
          // Department of Microbiology
          { latitude: 29.63995, longitude: -82.36263, visited: false },
          // Scott Family Chemistry Lab
          { latitude: 29.65156, longitude: -82.34444, visited: false },
        ],
        pictures: [
          require("./photos/bio1.png"),
          require("./photos/bio2.png"),
          require("./photos/bio3.png"),
          require("./photos/bio4.png"),
        ]
      },
      {
        id: '3',
        text: 'Aerospace Engineering',
        description: "Aerospace Engineers are called upon to solve exciting problems of design, construction, and operation of aircraft and spacecraft to meet the ever-increasing requirement for improved performance at lower unit cost. These challenges mean that aerospace engineers work at the continuously changing forefront of science, technology, and systems management. This tour will take you through several key locaations that an undergraduate pursuing Aerospace Engineering will become familiar with throughout their undergraduate studies.",
        destinations: [
          "Mechanical & Aerospace Engineering Building A",
          "Particle Engineering Research Center",
          "Mechanical & Aerospace Engineering Building C",
          "Little Hall",
          "Weil Hall"
        ],
        links: [
          {
            text: "MAE Department",
            link: "https://mae.ufl.edu/aerospace-engineering/"
          },
          {
            text: "Undergraduate Catalog",
            link: "https://catalog.ufl.edu/UGRD/colleges-schools/UGENG/ARO_BSAE/"
          },
          {
            text: "Particle Engineering Research Center",
            link: "http://perc.ufl.edu/"
          }
        ],
        locations: [
          // MAE A
          { latitude: 29.64330, longitude: -82.34827, visited: false },
          // Particle Research Building
          { latitude: 29.64162, longitude: -82.34778, visited: false },
          // MAE C
          { latitude: 29.64734, longitude: -82.34948, visited: false },
          // Little Hall
          { latitude: 29.64882, longitude: -82.34062, visited: false },
          // Weil Hall
          { latitude: 29.64838, longitude: -82.34852, visited: false },
        ],
        pictures: [
          require("./photos/mae1.png"),
          require("./photos/mae2.png"),
          require("./photos/mae3.png")
        ]
      },
    ]
  },
  {
    type: "landmarks",
    title: "Tour by Landmarks",
    data: [
      {
        text: "J. Wayne Reitz Union",
        id: "8",
        description: "The University of Florida's student union is a space for all students to gather, collaborate, and exchange ideas. It is a thriving environment for student activity and a place for self-discovery. The Reitz Union includes an arts and crafts center, the Career Conections Center, the Brown Center for Leadership and Service, Gator 1 Central, the University of Florida Bookstore, many different dining options, and more.",
        locations: [ { latitude: 29.64567, longitude: -82.3486, visited: false } ],
        destinations: [
          "Reitz Union"
        ],
        links: [
          {
            text: "Reitz Union",
            link: "https://union.ufl.edu/"
          },
          {
            text: "Hours of Operation",
            link: "https://union.ufl.edu/hours/"
          }
        ],
        pictures: [
          require("./photos/reitz1.png"),
          require("./photos/reitz2.png")
        ]
      },
      {
        text: "Century Tower",
        id: "9",
        description: "Century Tower is one of the most identifiable features of the University of Florida campus. The tower was conceptualized in 1953 and finished in 1956, and commemorates the 100th anniversary of the founding of the University of Florida in 1853.",
        locations: [
          { latitude: 29.6488, longitude: -82.3433, visited: false }
        ],
        destinations: [
          "Century Tower"
        ],
        links: [
          {
            text: "Carillon Studio",
            link: "https://arts.ufl.edu/sites/carillon-studio/welcome/"
          }
        ],
        pictures: [
          require("./photos/century_tower2.png"),
          require("./photos/century_tower1.png"),
          require("./photos/century_tower3.png")
        ]
      },
      {
        text: "New Engineering Building",
        id: "10",
        description: "Built in 1995, the New Engineering Building serves as a hub for undergraduate students pursuing degrees in Electrical and Computer Engineering. The building contains many offices for faculty in these departments, along with upper division labs in the departments. Additionally, the building contains the offices for IEEE, GRiP (Generational Relief in Prosthetics), and other undergraduate engineering clubs.",
        destinations: [
          "New Engineering Building"
        ],
        links: [
          {
            text: "IEEE UF Student Branch",
            link: "http://ieee.ece.ufl.edu/"
          },
          {
            text: "Generational Relief in Prosthetics",
            link: "https://www.bme.ufl.edu/labs/grip/"
          }
        ],
        locations: [
          { latitude: 29.64229, longitude: -82.34702, visited: false }
        ],
        pictures: [
          require("./photos/neb.png"),
          require("./photos/neb2.png")
        ]
      },
      {
        text: "Herbert Wertheim Laboratory",
        id: "11",
        description: "Finished in 2021, the Herbert Wertheim Laboratory is a 84,000 sq. feet state-of-the-art research and educational environment. The building includes classrooms and tools to facilitate team-based learning, faculty and student collision spaces to encourage cross-disciplinary collaboration, a state of the art biotech lab, prototyping labs, and a global teleconferencing lab.",
        destinations: [
          "Herbert Wertheim Laboratory for Engineering Excellence"
        ],
        locations: [
          { latitude: 29.64739, longitude: -82.34803, visited: false }
        ],
        links: [
          {
            text: "Wertheim Lab Webiste",
            link: "https://www.eng.ufl.edu/about/new-buildings/herbert-wertheim-laboratory-for-engineering-excellence/"
          },
          {
            text: "HWLEE Prototyping Lab Information",
            link: "https://www.eng.ufl.edu/eed/facilities/hwlee-prototyping-lab/"
          }
        ],
        pictures: [
          require("./photos/herbert_lab1.png"),
          require("./photos/herbert_lab2.png")
        ]
      },
      {
        text: "Marston Science Library",
        id: "12",
        description: "The Marston Science Library is the science and engineering library at UF. Marston hosts extensive collections in agriculture, biological sciences, chemical and physical sciences, engineering, mathmatics, and statistics. With a Starbucks in the library and recently expanded 24/7 hours, students can be found in Marston around the clock collaborating on design projects, studying for exams, and utilizing the library's various services.",
        destinations: [
          "Marston Science Library"
        ],
        links: [
          {
            text: "Marston Website",
            link: "https://marston.uflib.ufl.edu/"
          }
        ],
        locations: [
          { latitude: 29.6481, longitude: -82.34378, visited: false }
        ],
        pictures: [
          require("./photos/marston.png")
        ]
      },
      {
        text: "Library West",
        id: "13",
        description: "Nestled between Plaza of the Americas and University Avenue, Library West is in the heart of campus and is the major library of the George A. Smathers Library system. It has extensive humanities, social sciences, African studies, and Asian studies collections. The library has 1,400 seats available for students, 18 group study rooms available to reserve, and a Starbucks location on premise.",
        destinations: [
          "Library West"
        ],
        links: [
          {
            text: "Library West Website",
            link: "https://librarywest.uflib.ufl.edu"
          }
        ],
        locations: [
          { latitude: 29.65103, longitude: -82.34288, visited: false }
        ],
        pictures: [
          require("./photos/west.png")
        ]
      }
    ]
  },
  {
    type: "custom",
    title: "Custom Tour",
    data: [
      {
        id: '14',
        text: 'Saved Tour 1'
      },
      {
        id: '15',
        text: 'Saved Tour 2'
      },
      {
        id: '16',
        text: 'Saved Tour 3'
      },
    ]
  }
];

export function getTours () {
    return tours;
};