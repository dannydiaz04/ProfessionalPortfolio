import { storage } from '../server/storage';

export default function handler(req, res) {
  const { method, query } = req;
  
  // GET /api/categories
  if (method === 'GET' && !query.slug) {
    return storage.getCategories()
      .then(categories => res.status(200).json(categories))
      .catch(error => res.status(500).json({ error: error.message }));
  }
  
  // GET /api/categories/:slug
  if (method === 'GET' && query.slug) {
    return storage.getCategoryBySlug(query.slug)
      .then(category => {
        if (!category) return res.status(404).json({ message: "Category not found" });
        return res.status(200).json(category);
      })
      .catch(error => res.status(500).json({ error: error.message }));
  }
  
  // POST /api/categories
  if (method === 'POST') {
    try {
      const parsed = insertCategorySchema.parse(req.body);
      return storage.createCategory(parsed)
        .then(category => res.status(201).json(category))
        .catch(error => res.status(500).json({ error: error.message }));
    } catch (error) {
      return res.status(400).json({ message: "Invalid category data" });
    }
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}