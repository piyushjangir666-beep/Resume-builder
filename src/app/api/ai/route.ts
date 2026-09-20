import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, data } = body;

    // If OpenAI key is configured, use it; otherwise fall back to rule-based
    const apiKey = process.env.OPENAI_API_KEY;

    if (apiKey && apiKey.startsWith('sk-')) {
      const prompt = buildPrompt(type, data);
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });
      const json = await res.json();
      const content = json.choices?.[0]?.message?.content?.trim();
      if (content) return NextResponse.json({ success: true, content });
    }

    // Rule-based fallback
    return NextResponse.json({ success: true, content: null });
  } catch {
    return NextResponse.json({ success: false, error: 'AI service unavailable' }, { status: 500 });
  }
}

function buildPrompt(type: string, data: Record<string, unknown>): string {
  if (type === 'summary') {
    return `Improve this professional resume summary to be more impactful and ATS-friendly. Keep it concise (3-4 sentences). Return only the improved text:\n\n${data.text}`;
  }
  if (type === 'experience') {
    return `Improve these job responsibilities to use strong action verbs and quantify impact where possible. Return bullet points separated by newlines, no dashes or bullets:\n\n${data.text}`;
  }
  if (type === 'project') {
    return `Improve this project description to highlight technical skills and impact. Keep it concise. Return only the improved text:\n\n${data.text}`;
  }
  return String(data.text || '');
}
