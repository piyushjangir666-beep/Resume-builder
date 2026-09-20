'use client';
import { Plus, Trash2 } from 'lucide-react';
import { Education } from '@/types/resume';
import { generateId } from '@/lib/utils';

interface Props {
  items: Education[];
  onChange: (items: Education[]) => void;
}

const empty = (): Education => ({
  id: generateId(), institution: '', degree: '', field: '',
  startYear: '', endYear: '', grade: '',
});

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2 text-[13px] text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-400 transition-all";
const labelCls = "block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5";

export default function EducationForm({ items, onChange }: Props) {
  const add = () => onChange([...items, empty()]);
  const remove = (id: string) => onChange(items.filter(i => i.id !== id));
  const update = (id: string, field: keyof Education, value: string) =>
    onChange(items.map(i => i.id === id ? { ...i, [field]: value } : i));

  return (
    <div className="pt-4 space-y-3">
      {items.map((item, idx) => (
        <div key={item.id} className="rounded-xl p-4 space-y-3 animate-fade-up"
          style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Education {idx + 1}</span>
            <button onClick={() => remove(item.id)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <label className={labelCls}>College / University</label>
            <input value={item.institution} onChange={e => update(item.id, 'institution', e.target.value)}
              placeholder="e.g. IIT Delhi" className={inputCls} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>Degree</label>
              <input value={item.degree} onChange={e => update(item.id, 'degree', e.target.value)}
                placeholder="e.g. B.Tech" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Field of Study</label>
              <input value={item.field} onChange={e => update(item.id, 'field', e.target.value)}
                placeholder="e.g. Computer Science" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Start Year</label>
              <input value={item.startYear} onChange={e => update(item.id, 'startYear', e.target.value)}
                placeholder="2020" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>End Year</label>
              <input value={item.endYear} onChange={e => update(item.id, 'endYear', e.target.value)}
                placeholder="2024" className={inputCls} />
            </div>
          </div>

          <div>
            <label className={labelCls}>Grade / CGPA</label>
            <input value={item.grade || ''} onChange={e => update(item.id, 'grade', e.target.value)}
              placeholder="e.g. 8.5 / 10" className={inputCls} />
          </div>
        </div>
      ))}

      <button onClick={add}
        className="flex items-center gap-2 text-[13px] font-semibold text-blue-600 hover:text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors w-full justify-center border-2 border-dashed border-blue-200 hover:border-blue-400">
        <Plus className="w-4 h-4" /> Add Education
      </button>
    </div>
  );
}
