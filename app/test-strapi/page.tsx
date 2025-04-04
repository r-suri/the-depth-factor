'use client';

import { useEffect, useState } from 'react';
import { fetchBlogs, fetchSubniches } from '../services/strapi';
import { Blog, Subniche } from '../types/strapi';

export default function TestStrapi() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [subniches, setSubniches] = useState<Subniche[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // Include populate parameter to get related fields
        const blogsData = await fetchBlogs({ 
          populate: '*',
          pagination: { limit: 5 }
        });
        const subnichesData = await fetchSubniches({
          populate: '*',
          pagination: { limit: 5 }
        });
        
        console.log('Blogs data:', blogsData);
        console.log('Subniches data:', subnichesData);
        
        setBlogs(blogsData.data || []);
        setSubniches(subnichesData.data || []);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. See console for details.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Strapi Test Page</h1>
      
      {loading && <p className="text-lg">Loading data...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}
      
      {!loading && !error && (
        <>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Blogs ({blogs.length})</h2>
            {blogs.length > 0 ? (
              <div className="space-y-6">
                {blogs.map((blog) => (
                  <div key={blog.id} className="p-4 border rounded-lg">
                    <h3 className="text-xl font-medium">ID: {blog.id}</h3>
                    <p><strong>Document ID:</strong> {blog.documentId}</p>
                    <p><strong>Title:</strong> {blog.title}</p>
                    <p><strong>Created:</strong> {new Date(blog.createdAt).toLocaleDateString()}</p>
                    
                    {blog.subniche && (
                      <p><strong>Subniche:</strong> {blog.subniche.subniche}</p>
                    )}
                    
                    {blog.blog_content && blog.blog_content.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium">Content Preview:</h4>
                        <div className="mt-1 text-sm">
                          {/* Display a simple preview of the content */}
                          <p>Content available (structured data)</p>
                        </div>
                      </div>
                    )}
                    
                    <details className="mt-4">
                      <summary className="cursor-pointer text-blue-500">View Raw Data</summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-40">
                        {JSON.stringify(blog, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            ) : (
              <p>No blogs found</p>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Subniches ({subniches.length})</h2>
            {subniches.length > 0 ? (
              <div className="space-y-6">
                {subniches.map((subniche) => (
                  <div key={subniche.id} className="p-4 border rounded-lg">
                    <h3 className="text-xl font-medium">ID: {subniche.id}</h3>
                    <p><strong>Document ID:</strong> {subniche.documentId}</p>
                    <p><strong>Name:</strong> {subniche.subniche}</p>
                    <p><strong>Created:</strong> {new Date(subniche.createdAt).toLocaleDateString()}</p>
                    
                    <details className="mt-4">
                      <summary className="cursor-pointer text-blue-500">View Raw Data</summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto max-h-40">
                        {JSON.stringify(subniche, null, 2)}
                      </pre>
                    </details>
                  </div>
                ))}
              </div>
            ) : (
              <p>No subniches found</p>
            )}
          </section>
        </>
      )}
    </div>
  );
} 