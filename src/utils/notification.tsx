import CancleIcon from '@/assets/icons/cancle.svg';
import CheckIcon from '@/assets/icons/check-black.svg';
import LevelUpIcon from '@/assets/icons/levelup.svg';
import { Notification } from '@/types/domain';

export const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'ORDER_CANCELED':
      return <CancleIcon width={20} height={20} />;
    case 'ORDER_COMPLETION':
    case 'ORDER_PICK_UP':
      return <CheckIcon width={20} height={20} />;
    case 'ENVIRONMENT_LEVEL_UP':
      return <LevelUpIcon width={20} height={20} />;
    default:
      return null;
  }
};
