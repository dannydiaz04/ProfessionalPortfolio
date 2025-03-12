import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { FilterBar } from '@/components/filter-bar';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A revolutionary AI-powered analytics platform',
    technologies: ['React', 'TypeScript', 'Python', 'TensorFlow'],
    link: 'https://example.com/alpha'
  },
  {
    title: 'Beta System',
    description: 'Enterprise-grade cloud infrastructure solution',
    technologies: ['AWS', 'Kubernetes', 'Go', 'Terraform'],
    link: 'https://example.com/beta'
  },
  {
    title: 'Gamma Analytics',
    description: 'Real-time data visualization dashboard',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    link: 'https://example.com/gamma'
  }
];

export default function Projects() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  // Get unique technologies across all projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      project.technologies.forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, []);

  // Filter projects based on selected technology
  const filteredProjects = useMemo(() => {
    if (!selectedTech) return projects;
    return projects.filter(project => 
      project.technologies.includes(selectedTech)
    );
  }, [selectedTech]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-mono font-bold">Projects</h1>

        <FilterBar
          technologies={allTechnologies}
          selectedTech={selectedTech}
          onSelectTech={setSelectedTech}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur hover:bg-card/60 transition-colors">
                <CardHeader>
                  <CardTitle className="font-mono">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map(tech => (
                      <Badge 
                        key={tech} 
                        variant={tech === selectedTech ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => setSelectedTech(tech)}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {/* <a href={project.link} target="_blank" rel="noopener noreferrer"> */}
                    {/* <Button variant="outline" size="sm">
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}