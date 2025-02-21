'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  image: string;
  color: string;
}

const projects: Project[] = [
  { id: 1, title: "Project 1", image: "/project1.jpg", color: "#FF69B4" },
  { id: 2, title: "Project 2", image: "/project2.jpg", color: "#98FB98" },
  { id: 3, title: "Project 3", image: "/project3.jpg", color: "#4169E1" },
  { id: 4, title: "Project 4", image: "/project4.jpg", color: "#FFD700" },
  { id: 5, title: "Project 5", image: "/project5.jpg", color: "#FF6B6B" },
];

export default function ProjectScroll() {
  return (
    <div className="relative w-full max-w-5xl mx-auto h-[70vh] overflow-hidden">
      <div className="absolute top-0 w-full text-center mb-8">
        <h2 className="text-white text-2xl font-bold">PLEASE SCROLL</h2>
      </div>
      <div className="h-full overflow-y-auto snap-y snap-mandatory pt-16">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="snap-center mb-8 h-[80%] relative rounded-lg overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div 
              className="w-full h-full rounded-lg"
              style={{ backgroundColor: project.color }}
            >
              {/* Add your project content here */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 