
import React from 'react';
import { MAF_CATEGORIES, IKI_CATEGORIES } from '../constants';
import { Response, PerformanceLevel } from '../types';
import { calculateTotalWeightedScore, getPerformanceLevel, getPerformanceTextColor, calculateCategoryScore, getPerformanceColor } from '../utils/calculations';
import { TrendingUp, Award, CheckCircle, Info } from 'lucide-react';

interface DashboardProps {
  mafResponses: Record<string, Response>;
  ikiResponses: Record<string, Response>;
}

const ScoreCard = ({ title, percentage, type }: { title: string, percentage: number, type: 'MAF' | 'IKI' }) => {
  const level = getPerformanceLevel(percentage);
  const textColor = getPerformanceTextColor(percentage);
  const bgColor = getPerformanceColor(percentage);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-bold text-gaia-gray uppercase tracking-wider">{title}</h3>
          <p className="text-4xl font-heading font-black text-gaia-dark mt-1">
            {percentage.toFixed(0)}%
          </p>
        </div>
        <div className={`${bgColor} text-white p-3 rounded-lg shadow-lg`}>
          <Award size={24} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-bold mb-1">
            <span className="text-slate-500 uppercase">Classificação</span>
            <span className={textColor}>{level}</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div 
              className={`h-full ${bgColor} transition-all duration-1000 ease-out`} 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="p-3 bg-slate-50 rounded-lg flex items-center gap-3">
          <Info size={16} className="text-gaia-teal" />
          <p className="text-[11px] text-slate-600 leading-tight">
            {percentage >= 80 ? 'Projeto forte para o edital. Atende plenamente aos critérios principais.' :
             percentage >= 60 ? 'Projeto viável. Algumas áreas requerem ajustes para otimização.' :
             percentage >= 40 ? 'Projeto fraco. Necessita de melhorias substanciais em critérios chave.' :
             'Projeto inadequado. Requer redesenho significativo para ser elegível.'}
          </p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ mafResponses, ikiResponses }) => {
  const mafTotal = calculateTotalWeightedScore(MAF_CATEGORIES, mafResponses);
  const ikiTotal = calculateTotalWeightedScore(IKI_CATEGORIES, ikiResponses);

  const renderCategoryBars = (title: string, categories: any[], responses: Record<string, Response>) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
      <h3 className="font-heading font-bold text-gaia-dark mb-6 flex items-center gap-2">
        <TrendingUp size={20} className="text-gaia-teal" />
        Resumo por Categorias - {title}
      </h3>
      <div className="space-y-4">
        {categories.map(cat => {
          const score = calculateCategoryScore(cat, responses);
          const pct = (score / 5) * 100;
          const color = getPerformanceColor(pct);
          return (
            <div key={cat.id}>
              <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1.5">
                <span className="truncate pr-4">{cat.title.split(':')[1] || cat.title}</span>
                <span>{score.toFixed(1)} / 5</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${color} transition-all duration-700`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ScoreCard title="Pontuação Total MAF" percentage={mafTotal} type="MAF" />
        <ScoreCard title="Pontuação Total IKI" percentage={ikiTotal} type="IKI" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {renderCategoryBars('MAF', MAF_CATEGORIES, mafResponses)}
        {renderCategoryBars('IKI', IKI_CATEGORIES, ikiResponses)}
      </div>

      <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h2 className="text-2xl font-heading font-bold text-gaia-dark mb-2">Conclusão da Avaliação</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            As pontuações acima refletem o alinhamento atual do projeto com os critérios de elegibilidade dos editais. 
            Consulte a aba "Plano de Ação" para visualizar as providências sugeridas para cada ponto de melhoria identificado.
          </p>
        </div>
        <div className="shrink-0 text-center px-10 py-6 border border-slate-100 rounded-2xl bg-slate-50">
          <p className="text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] mb-1">Status Final</p>
          <p className={`text-2xl font-heading font-black ${mafTotal >= 60 && ikiTotal >= 60 ? 'text-performance-green' : 'text-performance-yellow'}`}>
            {mafTotal >= 60 && ikiTotal >= 60 ? 'RECOMENDADO' : 'REQUER AJUSTES'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
