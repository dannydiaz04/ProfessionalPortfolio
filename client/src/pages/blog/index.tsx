import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import type { BlogPost } from '@shared/schema';
import { FolderOpen } from 'lucide-react';

export default function Blog() {
  const { data: posts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog'],
    gcTime: 0,
    refetchOnMount: true
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
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <div className="space-y-3">
                    <div className="h-6 w-2/3 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-1/4 bg-muted/60 rounded animate-pulse" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="h-4 w-full bg-muted/60 rounded animate-pulse" />
                    <div className="h-4 w-5/6 bg-muted/60 rounded animate-pulse" />
                    <div className="flex gap-2 mt-4">
                      {[1, 2, 3].map((j) => (
                        <div key={j} className="h-6 w-16 bg-muted/40 rounded-full animate-pulse" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
          <Link href="/blog/categories">
            <Button variant="outline">
              <FolderOpen className="mr-2 h-4 w-4" /> Manage Categories
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          {posts?.map((post: BlogPost, index: number) => (
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
                      {post.tags.map((tag: string) => (
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