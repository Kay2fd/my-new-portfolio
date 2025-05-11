export interface SocialLink {
    name: string;
    url: string;
    iconType: string;
}

export interface ProfileDetail {
    iconType: string;
    text: string;
}

export interface ProfileInfo {
    name: string;
    role: string;
    avatar: string;
    bio: {
        paragraphs: string[];
        quickFacts: string[];
    };
    socialLinks: SocialLink[];
    details: ProfileDetail[];
}

const profileData: ProfileInfo = {
    name: "Dika Pangestu",
    role: "Frontend Developer",
    avatar: "/path/to/profile-image.jpg",
    bio: {
        paragraphs: [
            "Hello! I'm Dika Pangestu, a passionate Software Engineering student with a focus on frontend development. Currently, I'm balancing my studies in RPL (Rekayasa Perangkat Lunak) while gaining practical experience as a Frontend Developer Intern.",
            "My journey in tech began with a curiosity about how websites work, which quickly evolved into a passion for creating beautiful, functional user interfaces. I enjoy the process of transforming designs into responsive, interactive web experiences that solve real problems.",
            "As a student, I'm constantly learning and expanding my knowledge in software development principles, algorithms, and system design. My internship experience has given me valuable insights into real-world development workflows, collaboration, and delivering projects that meet client requirements."
        ],
        quickFacts: [
            "Currently in my final year of Software Engineering studies",
            "Working as a Frontend Developer Intern at a tech startup",
            "Passionate about creating intuitive user interfaces",
            "Constantly learning new technologies and frameworks",
            "Enjoy collaborating with designers and backend developers"
        ]
    },

    socialLinks: [
        {
            name: "GitHub",
            url: "https://github.com/Kay2fd",
            iconType: "github"
        },
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/dika-pangestu/",
            iconType: "linkedin"
        },
        {
            name: "Email",
            url: "mailto:dikaphangestu@gmail.com",
            iconType: "email"
        }
    ],
    details: [
        {
            iconType: "school",
            text: "Software Engineering Student"
        },
        {
            iconType: "work",
            text: "Frontend Developer Intern"
        },
        {
            iconType: "location",
            text: "Malang, Indonesia"
        }
    ]
};

export default profileData;
