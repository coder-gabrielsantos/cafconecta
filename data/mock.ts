export type Profile = 'ADMIN_SISTEMA' | 'ADMIN_CAF' | 'COORDENADOR_UBS';

export const units = [
  'UBS Dr. Fernando Couto',
  'UBS Centro',
  'UBS Bairro Novo',
  'UBS Zona Rural I',
  'UBS Zona Rural II',
  'UBS Vila Operária',
  'UBS Cohab',
];

export const medications = [
  {
    name: 'Paracetamol 500mg',
    form: 'Comprimido',
    stock: 2840,
    min: 900,
    category: 'Analgésicos',
  },
  {
    name: 'Dipirona 500mg',
    form: 'Comprimido',
    stock: 1960,
    min: 750,
    category: 'Analgésicos',
  },
  {
    name: 'Amoxicilina 500mg',
    form: 'Cápsula',
    stock: 420,
    min: 500,
    category: 'Antibióticos',
  },
  {
    name: 'Losartana 50mg',
    form: 'Comprimido',
    stock: 3180,
    min: 1000,
    category: 'Cardiovasculares',
  },
  {
    name: 'Metformina 850mg',
    form: 'Comprimido',
    stock: 2240,
    min: 800,
    category: 'Diabetes',
  },
  {
    name: 'Salbutamol Spray 100mcg',
    form: 'Frasco',
    stock: 86,
    min: 100,
    category: 'Respiratórios',
  },
  {
    name: 'Insulina NPH 100UI/mL',
    form: 'Frasco',
    stock: 164,
    min: 80,
    category: 'Diabetes',
  },
  {
    name: 'Soro Fisiológico 0,9% 500mL',
    form: 'Bolsa',
    stock: 370,
    min: 200,
    category: 'Soluções',
  },
  {
    name: 'Azitromicina 500mg',
    form: 'Comprimido',
    stock: 180,
    min: 250,
    category: 'Antibióticos',
  },
  {
    name: 'Omeprazol 20mg',
    form: 'Cápsula',
    stock: 1350,
    min: 500,
    category: 'Gastrointestinais',
  },
];

export const requests = [
  {
    id: 'SOL-001',
    unit: units[0],
    owner: '---',
    items: 2,
    status: 'Aprovada',
    date: '28/08/2026',
    approved: '350 / 350',
  },
  {
    id: 'SOL-002',
    unit: units[1],
    owner: 'Marcos Almeida',
    items: 2,
    status: 'Pendente',
    date: '01/09/2026',
    approved: '— / 140',
  },
  {
    id: 'SOL-003',
    unit: units[3],
    owner: 'Juliana Sousa',
    items: 2,
    status: 'Em análise',
    date: '02/09/2026',
    approved: '— / 70',
  },
  {
    id: 'SOL-004',
    unit: units[2],
    owner: 'Camila Rocha',
    items: 1,
    status: 'Parcial',
    date: '25/08/2026',
    approved: '60 / 100',
  },
  {
    id: 'SOL-005',
    unit: units[5],
    owner: 'Paulo Santos',
    items: 1,
    status: 'Recusada',
    date: '30/08/2026',
    approved: '0 / 30',
  },
  {
    id: 'SOL-006',
    unit: units[0],
    owner: '---',
    items: 1,
    status: 'Entregue',
    date: '20/08/2026',
    approved: '40 / 40',
  },
  {
    id: 'SOL-007',
    unit: units[6],
    owner: 'Renata Lima',
    items: 1,
    status: 'Recebida',
    date: '15/08/2026',
    approved: '90 / 90',
  },
];

export const volumeByUnit = [
  { unit: 'Fernando Couto', volume: 920 },
  { unit: 'Centro', volume: 780 },
  { unit: 'Bairro Novo', volume: 610 },
  { unit: 'Rural I', volume: 440 },
  { unit: 'Rural II', volume: 390 },
  { unit: 'Vila Operária', volume: 560 },
  { unit: 'Cohab', volume: 710 },
];

export const adminUsers = [
  {
    name: 'Guilherme',
    email: 'guilherme@coelhoneto.ma.gov.br',
    role: 'ADMIN_CAF',
    status: 'Ativo',
    created: '12/03/2026',
  },
  {
    name: 'Ricardo Mendes',
    email: 'ricardo@coelhoneto.ma.gov.br',
    role: 'VISUALIZADOR',
    status: 'Ativo',
    created: '07/05/2026',
  },
  {
    name: 'Larissa Costa',
    email: 'larissa@coelhoneto.ma.gov.br',
    role: 'ADMIN_CAF',
    status: 'Convite pendente',
    created: '04/09/2026',
  },
];

export const technicalLogs = [
  {
    time: 'Hoje, 08:42',
    event: 'Acesso administrativo',
    detail: 'Guilherme · 192.168.1.42',
    level: 'Informação',
  },
  {
    time: 'Hoje, 08:17',
    event: 'Sincronização concluída',
    detail: '7 unidades atualizadas',
    level: 'Sucesso',
  },
  {
    time: 'Ontem, 17:31',
    event: 'Tentativa de acesso inválida',
    detail: 'Usuário não identificado',
    level: 'Atenção',
  },
];
