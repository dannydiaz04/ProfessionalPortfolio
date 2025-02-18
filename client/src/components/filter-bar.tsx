import { Button } from "@/components/ui/button";

interface FilterBarProps {
  technologies: string[];
  selectedTech: string | null;
  onSelectTech: (tech: string | null) => void;
}

export function FilterBar({ technologies, selectedTech, onSelectTech }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Button
        variant={selectedTech === null ? "default" : "outline"}
        onClick={() => onSelectTech(null)}
        className="text-sm"
      >
        All
      </Button>
      {technologies.map((tech) => (
        <Button
          key={tech}
          variant={selectedTech === tech ? "default" : "outline"}
          onClick={() => onSelectTech(tech)}
          className="text-sm"
        >
          {tech}
        </Button>
      ))}
    </div>
  );
}
