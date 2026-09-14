export interface HubApp {
  id: string;
  name: string;
  url: string;
  icon?: string | null;
  position: number;
}

export interface AppFormData {
  name: string;
  url: string;
  icon?: string;
}