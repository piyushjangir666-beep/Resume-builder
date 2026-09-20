'use client';
import { useState } from 'react';
import { Plus, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { Project } from '@/types/resume';
import { generateId } from '@/lib/utils';
import { improveText } from '@/lib/ai/improve';

interface Props {
  items: Project[];
  onChange: (items: Project[]) => void;
}

const empty = (): Project => ({
  id: generateId(), name: '', description: '', technologies: '',
  liveUrl: '', githubUrl: '',
});

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-400 transition-all";
const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

export default function ProjectsForm({ items, onChange }: Props) {
  const [improving, setImproving] = useState<string | null>(null);

  const add = () => onChange([...items, empty()]);
  const remove = (id: string) => onChange(items.filter(i => i.id !== id));
  const update = (id: string, field: keyof Project, value: string) =>
    onChange(items.map(i => i.id === id ? { ...i, [field]: value } : i));

  const handleImprove = async (item: Project) => {
    if (!item.description.trim()) return;
    setImproving(item.id);
    try {
      const improved = await improveText(item.description, 'project', undefined, item.name);
      update(item.id, 'description', improved);
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
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Project {idx + 1}</span>
            <button onClick={() => remove(item.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <label className={labelCls}>Project Name</label>
            <input value={item.name} onChange={e => update(item.id, 'name', e.target.value)}
              placeholder="e.g. E-Commerce Platform" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Technologies Used</label>
            <input value={item.technologies} onChange={e => update(item.id, 'technologies', e.target.value)}
              placeholder="React, Node.js, MongoDB, AWS" className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Live URL</label>
              <input value={item.liveUrl || ''} onChange={e => update(item.id, 'liveUrl', e.target.value)}
                placeholder="https://project.com" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>GitHub URL</label>
              <input value={item.githubUrl || ''} onChange={e => update(item.id, 'githubUrl', e.target.value)}
                placeholder="https://github.com/..." className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Description</label>
            <textarea value={item.description} onChange={e => update(item.id, 'description', e.target.value)}
              placeholder="Describe what this project does, your role, and the impact..."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-400 transition-all resize-none" />
            <button onClick={() => handleImprove(item)}
              disabled={improving === item.id || !item.description.trim()}
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
        <Plus className="w-4 h-4" /> Add Project
      </button>
    </div>
  );
}
