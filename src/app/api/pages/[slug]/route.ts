import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb-fixed';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { db } = await connectToDatabase();
    const page = await db.collection('pages').findOne({ slug: params.slug });
    
    if (!page) {
      // Créer la page si elle n'existe pas
      const defaultContent = {
        info: '# À propos de nous\n\nBienvenue sur notre boutique!',
        contact: '# Contactez-nous\n\nNous sommes là pour vous aider.',
        social: '# Réseaux sociaux\n\nSuivez-nous sur nos réseaux!'
      };
      
      const newPage = {
        slug: params.slug,
        title: params.slug.charAt(0).toUpperCase() + params.slug.slice(1),
        content: defaultContent[params.slug as keyof typeof defaultContent] || '',
        updatedAt: new Date()
      };
      
      await db.collection('pages').insertOne(newPage);
      
      return NextResponse.json(newPage, {
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'application/json',
        }
      });
    }
    
    return NextResponse.json({
      ...page,
      updatedAt: page.updatedAt || new Date()
    }, {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Erreur GET page:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const { title, content } = body;
    
    const { db } = await connectToDatabase();
    
    const updateData = {
      title,
      content,
      updatedAt: new Date()
    };
    
    const result = await db.collection('pages').updateOne(
      { slug: params.slug },
      { 
        $set: updateData,
        $setOnInsert: { slug: params.slug }
      },
      { upsert: true }
    );
    
    // Invalider le cache après la mise à jour
    try {
      await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/cache/invalidate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'pages', slug: params.slug })
      });
    } catch (cacheError) {
      console.error('Erreur invalidation cache:', cacheError);
    }
    
    return NextResponse.json({ 
      success: true, 
      ...updateData 
    }, {
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Erreur PUT page:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}