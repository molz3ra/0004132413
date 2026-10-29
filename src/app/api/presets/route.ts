import { NextResponse } from 'next/server';
import { PRESET_ANALYSES } from '@/lib/presets';

export async function GET() {
  return NextResponse.json({
    presets: PRESET_ANALYSES.map((p) => ({
      id: p.id,
      badge: p.badge,
      title: p.title,
      url: p.url,
      niche: p.niche,
      description: p.description,
    })),
  });
}

