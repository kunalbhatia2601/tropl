import CandidateDetailsClient from './CandidateDetailsClient';

export async function generateStaticParams() {
  // Return mock candidate IDs for static generation
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' }
  ];
}

export default async function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CandidateDetailsClient candidateId={id} />;
}
