import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const businesses = [
  {
    name: 'Nomadic Space',
    description: 'Asteroid Mining & In Space Resource Utilization.',
    role: 'Founder & CEO',
    industry: 'Technology/Space',
    link: 'https://example.com/techventures'
  },
  {
    name: 'Ignite Intelligence Systems',
    description: 'Big data analytics and visualization platform for business intelligence.',
    role: 'Founder & CEO',
    industry: 'Data Analytics',
    link: 'https://example.com/dataflow'
  },
  // Add more businesses as needed
];

export default function Businesses() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <h1 className="text-4xl font-mono font-bold">Businesses</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businesses.map((business, index) => (
            <motion.div
              key={business.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur hover:bg-card/60 transition-colors">
                <CardHeader>
                  <CardTitle className="font-mono">{business.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {business.role} • {business.industry}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{business.description}</p>
                  <a href={business.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
