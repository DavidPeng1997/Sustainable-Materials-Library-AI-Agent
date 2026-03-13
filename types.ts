export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  attachments?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

export interface ProjectHistory {
    id: number;
    title: string;
    date: string;
    description: string;
    chatHistory: { role: 'user' | 'model'; text: string; image?: string }[];
}

export interface MaterialData {
  id: string;
  name: string;
  category: string;
  image: string;
  isSaved: boolean;
  // Specs
  attributes: string[]; // ◙ 耐熱保溫, etc.
  strength: string;
  density: string;
  processingMethod: string;
  reachRisk: string;
  carbonFootprint: string;
  recyclingMethod: string;
  typicalApplication: string;
  manufacturer: string;
  manufacturerContact: string;
  vendorCode?: string; // New field for display
  // Radar Data (0-100)
  stats: {
    processingDifficulty: number; // 加工強度
    durability: number; // 耐用性
    carbonFootprintScore: number; // 碳足跡 (inverse or score)
    recyclability: number; // 回收性
    reachRiskScore: number; // REACH風險 (safety score)
  };
}

export enum ViewMode {
  DASHBOARD = 'DASHBOARD',
  CHAT = 'CHAT',
  PROJECT_CHAT = 'PROJECT_CHAT',
  SIMULATION = 'SIMULATION',
  ISO_DB = 'ISO_DB',
  MATERIAL_DB = 'MATERIAL_DB',
  REACH_LIST = 'REACH_LIST',
  CIRCULARITY_CHECK = 'CIRCULARITY_CHECK',
  PROJECT_RECORDS = 'PROJECT_RECORDS'
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}