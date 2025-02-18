import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { format } from 'date-fns';

// Temporary data until we connect to the backend
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Machine Learning',
    excerpt: 'An introduction to the fundamentals of machine learning and its applications in modern technology.',
    slug: 'getting-started-with-ml',
    publishedAt: new Date('2024-02-18'),
    tags: ['Machine Learning', 'AI', 'Technology']
  },
  {
    id: 2,
    title: 'The Future of Space Technology',
    excerpt: 'Exploring upcoming trends and innovations in space exploration and asteroid mining.',
    slug: 'future-of-space-tech',
    publishedAt: new Date('2024-02-17'),
    tags: ['Space', 'Technology', 'Innovation']
  }
];

export default function Blog() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-mono font-bold">Blog</h1>
        </div>

        <div className="grid gap-6">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="cursor-pointer bg-card/50 backdrop-blur hover:bg-card/60 transition-colors">
                  <CardHeader>
                    <div className="space-y-1">
                      <CardTitle className="font-mono text-xl">
                        {post.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {format(post.publishedAt, 'MMMM d, yyyy')}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
