
export interface SocialLinks {
  github: string;
  linkedin: string;
  website: string;
}

export interface EditProfileForm {
 avatar: File | string | null;

  fullName: string;
  username: string;
  email: string;

  bio: string;
  location: string;

  socials: SocialLinks;

  skills: string[];
}


export interface UserProfile {
  id: string;

  avatar: string;

  fullName: string;
  username: string;
  email: string;

  bio: string;
  location: string;

  socials: SocialLinks;

  skills: string[];

  createdAt: string;
  updatedAt: string;
}


export type UpdateProfilePayload = EditProfileForm;


export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}