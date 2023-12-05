export interface Uploads {
  data: [
    {
      id: string;
      name: string;
      type: string;
      size: number;
      url: string;
      created_at: {
        seconds: number,
        nanoseconds: number
      };
    }
  ]
}