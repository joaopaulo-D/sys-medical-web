export interface IUploads {
  [key: number]: {
    id: string;
    patient_first_name: string;
    patient_last_name: string;
    patient_age: string;
    patient_gender: string;
    patient_modality: string;
    patient_body: string;
    patient_typeMedicine?: string[];
    sample_name: string;
    sample_size: number;
    sample_type: string;
    sample_url: string;
    created_at: string;
  }
}