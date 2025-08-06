export interface VisionImage {
    id: string;
    emoji: string;
    label: string;
  }
  
  export interface VisionBoard {
    id: string;
    title: string;
    emoji: string;
    images: VisionImage[];
    statement: string;
  }
  