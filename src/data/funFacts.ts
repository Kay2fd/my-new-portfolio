export interface FunFact {
    icon: string;
    title: string;
    description: string;
    color?: string;
}

const funFactsData: FunFact[] = [
    {
        icon: "music",
        title: "Music Enthusiast",
        description: "I love playing guitar and drums in my free time. Music is my creative outlet when I'm not coding.",
        color: "#1DB954"
    },
    {
        icon: "mountain",
        title: "Mountain Climber",
        description: "Hiking mountains is my passion. The journey to the summit teaches me perseverance that I apply to solving complex coding problems.",
        color: "#6B8E23"
    },
    {
        icon: "book",
        title: "Avid Reader",
        description: "I enjoy reading books across various genres. Reading expands my perspective and helps me approach development challenges with fresh ideas.",
        color: "#8B4513"
    },
    {
        icon: "language",
        title: "German Learner",
        description: "I'm currently learning German. I believe understanding different languages improves my logical thinking and problem-solving abilities.",
        color: "#FFD700"
    },
    {
        icon: "code",
        title: "Night Owl Coder",
        description: "My most productive coding hours are between 10 PM and 2 AM. That's when the best ideas seem to flow!",
        color: "#4169E1"
    },
    {
        icon: "coffee",
        title: "Coffee Enthusiast",
        description: "A good cup of coffee is essential for my coding sessions. I'm always exploring different beans and brewing methods.",
        color: "#8B4513"
    }
];

export default funFactsData;
