
import React from 'react';
import { LOGO_URL } from '../constants';
import { ProjectData } from '../types';
import { FileDown, HelpCircle } from 'lucide-react';

interface ProjectHeaderProps {
  data: ProjectData;
  onChange: (field: keyof ProjectData, value: string) => void;
  onExport: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ data, onChange, onExport }) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm no-print">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img 
              src={LOGO_URL} 
              alt="Gaia Silva Gaede Advogados" 
              className="h-10 object-contain"
            />
            <div className="h-10 w-px bg-slate-200 hidden md:block" />
            <h1 className="text-xl font-bold text-gaia-dark font-heading tracking-tight">
              Q&A Estratégico / <span className="text-gaia-teal">MAF e IKI</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 max-w-2xl">
            <div className="w-full">
              <label className="block text-[10px] uppercase font-bold text-gaia-gray mb-1">Nome do Projeto</label>
              <input
                type="text"
                value={data.projectName}
                onChange={(e) => onChange('projectName', e.target.value)}
                placeholder="Ex: Fazenda Solar X"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-gaia-teal focus:border-gaia-teal transition-all outline-none"
              />
            </div>
            <div className="w-full">
              <label className="block text-[10px] uppercase font-bold text-gaia-gray mb-1">Cliente</label>
              <input
                type="text"
                value={data.clientName}
                onChange={(e) => onChange('clientName', e.target.value)}
                placeholder="Ex: BioEnergy Corp"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-gaia-teal focus:border-gaia-teal transition-all outline-none"
              />
            </div>
          </div>

          <button
            onClick={onExport}
            className="flex items-center gap-2 bg-gaia-dark text-white px-4 py-2.5 rounded shadow hover:bg-black transition-colors text-sm font-semibold shrink-0"
          >
            <FileDown size={18} />
            Exportar Relatório
          </button>
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;
