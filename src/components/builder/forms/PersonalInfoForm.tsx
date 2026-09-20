'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { PersonalInfo } from '@/types/resume';

const urlField = z.string()
  .refine(v => v === '' || /^https?:\/\/.+/.test(v), 'Must start with https://')
  .optional();

const schema = z.object({
  fullName:  z.string().min(1, 'Full name is required'),
  title:     z.string().min(1, 'Professional title is required'),
  email:     z.string().email('Please enter a valid email').or(z.literal('')),
  phone:     z.string(),
  location:  z.string(),
  linkedin:  urlField,
  github:    urlField,
  portfolio: urlField,
});

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const fields: { name: keyof PersonalInfo; label: string; placeholder: string; type?: string; span?: boolean }[] = [
  { name: 'fullName',  label: 'Full Name',           placeholder: 'e.g. Piyush Jangir',                span: true },
  { name: 'title',     label: 'Professional Title',  placeholder: 'e.g. Full Stack Developer',          span: true },
  { name: 'email',     label: 'Email Address',        placeholder: 'you@example.com',       type: 'email' },
  { name: 'phone',     label: 'Phone Number',         placeholder: '+91 98765 43210' },
  { name: 'location',  label: 'Location',             placeholder: 'City, State, Country',  span: true },
  { name: 'linkedin',  label: 'LinkedIn URL',         placeholder: 'https://linkedin.com/in/username' },
  { name: 'github',    label: 'GitHub URL',           placeholder: 'https://github.com/username' },
  { name: 'portfolio', label: 'Portfolio URL',        placeholder: 'https://yourportfolio.com', span: true },
];

const inputCls = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-[13px] text-gray-800 placeholder-gray-400 bg-gray-50 focus:bg-white focus:border-blue-400 transition-all";

export default function PersonalInfoForm({ data, onChange }: Props) {
  const { register, watch, formState: { errors } } = useForm<PersonalInfo>({
    resolver: zodResolver(schema),
    defaultValues: data,
    mode: 'onBlur',
  });

  const values = watch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { onChange(values); }, [JSON.stringify(values)]);

  return (
    <div className="grid grid-cols-2 gap-3 pt-4">
      {fields.map(({ name, label, placeholder, type, span }) => (
        <div key={name} className={span ? 'col-span-2' : 'col-span-1'}>
          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
            {label}
          </label>
          <input
            {...register(name)}
            type={type || 'text'}
            placeholder={placeholder}
            className={inputCls}
          />
          {errors[name] && (
            <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
              ⚠ {errors[name]?.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
