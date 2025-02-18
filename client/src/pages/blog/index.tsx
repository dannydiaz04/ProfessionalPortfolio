import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import type { BlogPost } from '@shared/schema';

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
    staleTime: 0, // Make sure we always show loading state
    cacheTime: 0,
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <h1 className="text-4xl font-mono font-bold">Blog</h1>
          <div className="space-y-4">
            <div className="h-32 bg-muted/10 animate-pulse rounded-lg" />
            <div className="h-32 bg-muted/10 animate-pulse rounded-lg" />
            <div className="h-32 bg-muted/10 animate-pulse rounded-lg" />
          </div>
        </motion.div>
      </div>
    );
  }

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
          {(posts || []).map((post, index) => (
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
                        {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
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