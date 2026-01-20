
import React, { useState, useEffect } from 'react';
import { ProjectData, TabType, Response } from './types';
import { MAF_CATEGORIES, IKI_CATEGORIES } from './constants';
import ProjectHeader from './components/ProjectHeader';
import CategoryAccordion from './components/CategoryAccordion';
import Dashboard from './components/Dashboard';
import ActionPlanTab from './components/ActionPlanTab';
import { LayoutDashboard, ClipboardCheck, ClipboardList, Target, AlertCircle } from 'lucide-react';
import { calculateTotalWeightedScore, calculateCategoryScore } from './utils/calculations';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>(TabType.DASHBOARD);
  const [projectData, setProjectData] = useState<ProjectData>(() => {
    const saved = localStorage.getItem('gsg_eligibility_data');
    if (saved) return JSON.parse(saved);
    return {
      projectName: '',
      clientName: '',
      mafResponses: {},
      ikiResponses: {}
    };
  });

  useEffect(() => {
    localStorage.setItem('gsg_eligibility_data', JSON.stringify(projectData));
  }, [projectData]);

  const handleHeaderChange = (field: keyof ProjectData, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleResponseUpdate = (type: 'MAF' | 'IKI', questionId: string, response: Response) => {
    const field = type === 'MAF' ? 'mafResponses' : 'ikiResponses';
    setProjectData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [questionId]: response
      }
    }));
  };

  const handleExport = () => {
    // CSV generation with BOM for Excel compatibility (Portuguese/Semicolon separator)
    let csvContent = '\uFEFF';
    csvContent += 'RELATÓRIO DE ELEGIBILIDADE ESTRATÉGICA\n\n';
    csvContent += `Projeto;${projectData.projectName || 'Não informado'}\n`;
    csvContent += `Cliente;${projectData.clientName || 'Não informado'}\n`;
    csvContent += `Data da Exportação;${new Date().toLocaleDateString('pt-BR')}\n\n`;

    const mafTotal = calculateTotalWeightedScore(MAF_CATEGORIES, projectData.mafResponses);
    const ikiTotal = calculateTotalWeightedScore(IKI_CATEGORIES, projectData.ikiResponses);

    csvContent += 'PONTUAÇÕES TOTAIS\n';
    csvContent += `Edital MAF;${mafTotal.toFixed(1)}%\n`;
    csvContent += `Edital IKI;${ikiTotal.toFixed(1)}%\n\n`;

    const appendSection = (title: string, categories: any[], responses: Record<string, Response>) => {
      csvContent += `${title}\n`;
      csvContent += 'Categoria;Pergunta;Nota;Providência;Prazo;Responsável\n';
      categories.forEach(cat => {
        cat.questions.forEach((q: any) => {
          const resp = responses[q.id];
          const score = resp?.score ?? 'N/A';
          const action = resp?.action?.replace(/;/g, ',') || '-';
          const deadline = resp?.deadline || '-';
          const responsible = resp?.responsible || '-';
          csvContent += `"${cat.title}";"${q.text}";${score};"${action}";"${deadline}";"${responsible}"\n`;
        });
      });
      csvContent += '\n';
    };

    appendSection('DETALHAMENTO MAF', MAF_CATEGORIES, projectData.mafResponses);
    appendSection('DETALHAMENTO IKI', IKI_CATEGORIES, projectData.ikiResponses);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Relatorio_Elegibilidade_${projectData.projectName || 'Projeto'}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case TabType.DASHBOARD:
        return <Dashboard mafResponses={projectData.mafResponses} ikiResponses={projectData.ikiResponses} />;
      case TabType.MAF:
        return (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="bg-sky-50 p-4 rounded-lg border border-sky-100 mb-6 flex items-start gap-3">
              <AlertCircle className="text-sky-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-sky-900">Sobre o Edital MAF</h4>
                <p className="text-xs text-sky-800/80 leading-relaxed">
                  O Mitigation Action Facility foca em projetos setoriais de larga escala em energia, transporte e indústria. 
                  A nota mínima recomendada para prosseguimento é 60%.
                </p>
              </div>
            </div>
            {MAF_CATEGORIES.map(cat => (
              <CategoryAccordion
                key={cat.id}
                category={cat}
                responses={projectData.mafResponses}
                onUpdate={(qid, resp) => handleResponseUpdate('MAF', qid, resp)}
              />
            ))}
          </div>
        );
      case TabType.IKI:
        return (
          <div className="space-y-4 animate-in fade-in duration-500">
             <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-6 flex items-start gap-3">
              <AlertCircle className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-emerald-900">Sobre o Edital IKI</h4>
                <p className="text-xs text-emerald-800/80 leading-relaxed">
                  A International Climate Initiative foca em biodiversidade, mitigação e adaptação climática. 
                  O rigor técnico em salvaguardas sociais e ambientais é mandatório.
                </p>
              </div>
            </div>
            {IKI_CATEGORIES.map(cat => (
              <CategoryAccordion
                key={cat.id}
                category={cat}
                responses={projectData.ikiResponses}
                onUpdate={(qid, resp) => handleResponseUpdate('IKI', qid, resp)}
              />
            ))}
          </div>
        );
      case TabType.ACTION_PLAN:
        return <ActionPlanTab mafResponses={projectData.mafResponses} ikiResponses={projectData.ikiResponses} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <ProjectHeader data={projectData} onChange={handleHeaderChange} onExport={handleExport} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-slate-200 mb-8 no-print">
          {[
            { id: TabType.DASHBOARD, label: 'Visão Geral', icon: LayoutDashboard },
            { id: TabType.MAF, label: 'Avaliação MAF', icon: Target },
            { id: TabType.IKI, label: 'Avaliação IKI', icon: ClipboardCheck },
            { id: TabType.ACTION_PLAN, label: 'Plano de Ação', icon: ClipboardList },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all
                ${activeTab === tab.id 
                  ? 'bg-gaia-dark text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-gaia-dark'}
              `}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </nav>

        {renderTabContent()}

        {/* Print Only Layout */}
        <div className="hidden print-only print:block mt-12">
          <h1 className="text-3xl font-black text-gaia-dark mb-4">Relatório de Elegibilidade Estratégica</h1>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <p><strong>Projeto:</strong> {projectData.projectName || 'Não informado'}</p>
            <p><strong>Cliente:</strong> {projectData.clientName || 'Não informado'}</p>
            <p><strong>Pontuação MAF:</strong> {calculateTotalWeightedScore(MAF_CATEGORIES, projectData.mafResponses).toFixed(1)}%</p>
            <p><strong>Pontuação IKI:</strong> {calculateTotalWeightedScore(IKI_CATEGORIES, projectData.ikiResponses).toFixed(1)}%</p>
          </div>
          <p className="text-xs text-slate-500 italic mt-8">Gerado via Plataforma GSG Consultoria Estratégica.</p>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 no-print">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} Gaia Silva Gaede Advogados. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
