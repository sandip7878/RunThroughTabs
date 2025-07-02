export interface NewsletterInterface {
  title?: string;
  subTitle?: string;
  description?: string;
  image?: string;
  video?: string;
  whatsIncluded?: {
    icon: string;
    title: string;
  }[]
}
