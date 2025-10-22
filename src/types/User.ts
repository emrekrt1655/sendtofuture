export interface Profile {
  id: string;
  username: string;
  is_premium: boolean;
  photo_url: string | null;
  description: string | null;
}

export type SupabaseSingleResponse = {
  data: Profile | null;
  error: Error | null;
};