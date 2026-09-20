'use client';
import { useState } from 'react';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { Experience } from '@/types/resume';
import { generateId } from '@/lib/utils';
import { improveText } from '@/lib/ai/improve';

interface Props {
  items: Experience[];
  onChange: (items: Experience[]) => void;
}

const empty = (): Experience => ({
  id: generateId(), company: '', jobTitle: '', location: '',
  startDate: '', endDate: '', current: false, responsibilities: '',
});

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-400 transition-all";
const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

export default function ExperienceForm({ items, onChange }: Props) {
  const [improving, setImproving] = useState<string | null>(null);

  const add = () => onChange([...items, empty()]);
  const remove = (id: string) => onChange(items.filter(i => i.id !== id));
  const update = (id: string, field: keyof Experience, value: string | boolean) =>
    onChange(items.map(i => i.id === id ? { ...i, [field]: value } : i));

  const handleImprove = async (item: Experience) => {
    if (!item.responsibilities.trim()) return;
    setImproving(item.id);
    try {
      const improved = await improveText(item.responsibilities, 'experience', undefined, item.jobTitle);
      update(item.id, 'responsibilities', improved);
    } finally {
      setImproving(null);
    }
  };

  return (
    <div className="pt-4 space-y-3">
      {items.map((item, idx) => (
        <div key={item.id} className="rounded-xl p-4 space-y-3 animate-fade-up"
          style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Experience {idx + 1}</span>
            <button onClick={() => remove(item.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <label className={labelCls}>Company Name</label>
            <input value={item.company} onChange={e => update(item.id, 'company', e.target.value)}
              placeholder="e.g. Google" className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Job Title</label>
              <input value={item.jobTitle} onChange={e => update(item.id, 'jobTitle', e.target.value)}
                placeholder="e.g. Software Engineer" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input value={item.location || ''} onChange={e => update(item.id, 'location', e.target.value)}
                placeholder="e.g. Bangalore" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Start Date</label>
              <input value={item.startDate} onChange={e => update(item.id, 'startDate', e.target.value)}
                placeholder="Jan 2022" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>End Date</label>
              <input value={item.endDate || ''} onChange={e => update(item.id, 'endDate', e.target.value)}
                placeholder="Dec 2023" disabled={item.current}
                className={`${inputCls} ${item.current ? 'opacity-40 cursor-not-allowed' : ''}`} />
            </div>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer group">
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
              item.current ? 'bg-blue-600 border-blue-600' : 'border-gray-300 group-hover:border-blue-400'
            }`}>
              {item.current && <div className="w-2 h-2 bg-white rounded-sm" />}
            </div>
            <input type="checkbox" checked={item.current}
              onChange={e => update(item.id, 'current', e.target.checked)} className="sr-only" />
            <span className="text-[12px] font-medium text-gray-600">Currently working here</span>
          </label>

          <div>
            <label className={labelCls}>Responsibilities & Achievements</label>
            <textarea value={item.responsibilities}
              onChange={e => update(item.id, 'responsibilities', e.target.value)}
              placeholder={"• Developed and maintained...\n• Led a team of...\n• Improved performance by..."}
              rows={4}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-400 transition-all resize-none" />
            <button onClick={() => handleImprove(item)}
              disabled={improving === item.id || !item.responsibilities.trim()}
              className="mt-2 flex items-center gap-2 text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-all disabled:opacity-40"
              style={{ background: '#7c3aed12', color: '#7c3aed', border: '1px solid #7c3aed25' }}>
              {improving === item.id
                ? <><Loader2 className="w-3 h-3 animate-spin" /> Improving...</>
                : <><Sparkles className="w-3 h-3" /> Improve with AI</>}
            </button>
          </div>
        </div>
      ))}

      <button onClick={add}
        className="flex items-center gap-2 text-[13px] font-semibold text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors w-full justify-center border-2 border-dashed border-blue-200 hover:border-blue-400">
        <Plus className="w-4 h-4" /> Add Experience
      </button>
    </div>
  );
}
