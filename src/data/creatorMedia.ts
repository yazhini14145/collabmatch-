import mayaImg from '../assets/images/creator_maya_tech_1794566568494.jpg';
import marcusImg from '../assets/images/creator_marcus_fitness_1794566569604.jpg';
import elenaImg from '../assets/images/creator_elena_fashion_1794566570331.jpg';
import arjunImg from '../assets/images/creator_arjun_finance_1794566570319.jpg';
import sofiaImg from '../assets/images/creator_sofia_beauty_1794566571662.jpg';
import kenjiImg from '../assets/images/creator_kenji_food_1794566571007.jpg';
import chloeImg from '../assets/images/creator_chloe_travel_1794566571554.jpg';
import liamImg from '../assets/images/creator_liam_gaming_1794566572284.jpg';
import amaraImg from '../assets/images/creator_amara_lifestyle_1794566573209.jpg';
import noahImg from '../assets/images/creator_noah_education_1794566572706.jpg';
import yasminImg from '../assets/images/creator_nadia_tech_1794566574140.jpg';
import lucasImg from '../assets/images/creator_lucas_travel_1794566573686.jpg';
import studioCoverImg from '../assets/images/cover_creative_studio_1794566574037.jpg';
import lifestyleCoverImg from '../assets/images/cover_lifestyle_editorial_1794566574324.jpg';

export const CREATOR_AVATARS: Record<string, string> = {
  'maya-lin': mayaImg,
  'marcus-cole': marcusImg,
  'elena-rostova': elenaImg,
  'arjun-mehta': arjunImg,
  'sofia-reyes': sofiaImg,
  'kenji-takahashi': kenjiImg,
  'chloe-lindqvist': chloeImg,
  'liam-oconnor': liamImg,
  'amara-okafor': amaraImg,
  'noah-sterling': noahImg,
  'yasmin-alfarsi': yasminImg,
  'lucas-ferreira': lucasImg,
};

export const COVER_IMAGES: Record<'studio' | 'lifestyle', string> = {
  studio: studioCoverImg,
  lifestyle: lifestyleCoverImg,
};

export function resolveCreatorAvatar(creatorId: string, fallbackPath: string): string {
  return CREATOR_AVATARS[creatorId] ?? fallbackPath;
}

export function resolveCoverImage(key: 'studio' | 'lifestyle' | string): string {
  if (key === 'lifestyle') return COVER_IMAGES.lifestyle;
  if (key === 'studio') return COVER_IMAGES.studio;
  return key;
}
