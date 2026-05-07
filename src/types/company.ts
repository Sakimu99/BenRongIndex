export type CompanyFeature = {
  title: string;
  description: string;
};

export type CompanyProfile = {
  name: string;
  slogan: string;
  introduction: string;
  features: CompanyFeature[];
};

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  tags: string[];
};
