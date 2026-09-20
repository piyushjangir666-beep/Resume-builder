'use client';
import { Plus, Trash2 } from 'lucide-react';
import { Certification } from '@/types/resume';
import { generateId } from '@/lib/utils';

interface Props {
  items: Certification[];
  onChange: (items: Certification[]) => void;
}

const empty = (): Certification => ({
  id: generateId(), name: '', organization: '', date: '', credentialUrl: '',
});

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-400 transition-all";
const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

export default function CertificationsForm({ items, onChange }: Props) {
  const add = () => onChange([...items, empty()]);
  const remove = (id: string) => onChange(items.filter(i => i.id !== id));
  const update = (id: string, field: keyof Certification, value: string) =>
    onChange(items.map(i => i.id === id ? { ...i, [field]: value } : i));

  return (
    <div className="pt-4 space-y-3">
      {items.map((item, idx) => (
        <div key={item.id} className="rounded-xl p-4 space-y-3 animate-fade-up"
          style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Certification {idx + 1}</span>
            <button onClick={() => remove(item.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <label className={labelCls}>Certificate Name</label>
            <input value={item.name} onChange={e => update(item.id, 'name', e.target.value)}
              placeholder="e.g. AWS Solutions Architect" className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Issuing Organization</label>
              <input value={item.organization} onChange={e => update(item.id, 'organization', e.target.value)}
                placeholder="e.g. Amazon Web Services" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input value={item.date} onChange={e => update(item.id, 'date', e.target.value)}
                placeholder="Jan 2024" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Credential URL</label>
            <input value={item.credentialUrl || ''} onChange={e => update(item.id, 'credentialUrl', e.target.value)}
              placeholder="https://credential.link" className={inputCls} />
          </div>
        </div>
      ))}

      <button onClick={add}
        className="flex items-center gap-2 text-[13px] font-semibold text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors w-full justify-center border-2 border-dashed border-blue-200 hover:border-blue-400">
        <Plus className="w-4 h-4" /> Add Certification
      </button>
    </div>
  );
}
