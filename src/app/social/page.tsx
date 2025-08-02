import SocialPage from '@/components/SocialPage';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { connectToDatabase } from '@/lib/mongodb-fixed';

async function getSocialContent() {
  try {
    const { db } = await connectToDatabase();
    const [page, links] = await Promise.all([
      db.collection('pages').findOne({ slug: 'social' }),
      db.collection('socialLinks').find({ isActive: true }).toArray()
    ]);
    
    return {
      content: page?.content || '',
      links: links || []
    };
  } catch (error) {
    console.error('Erreur chargement social:', error);
    return { content: '', links: [] };
  }
}

export default async function SocialPageRoute() {
  const { content, links } = await getSocialContent();

  return (
    <div className="main-container">
      {/* Overlay global toujours présent */}
      <div className="global-overlay"></div>
      
      {/* Contenu principal */}
      <div className="content-layer">
        <Header />
        <div className="pt-12 sm:pt-14">
          <div className="h-4 sm:h-6"></div>
          <SocialPage initialContent={content} initialLinks={links} />
        </div>
      </div>
      
      {/* BottomNav */}
      <BottomNav />
    </div>
  );
}