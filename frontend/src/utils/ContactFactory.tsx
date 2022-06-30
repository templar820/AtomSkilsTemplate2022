import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Icon28LogoVk } from '@vkontakte/icons';
import Colors from '@colors';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Language } from '@mui/icons-material';
import { ReactNode } from 'react';
import { Contact } from '../api/api';

export type ContactItem = {icon: ReactNode, action: () => void, groupType: string} & Contact
export default class ContactFactory {
  getContactRules(contact: Contact): ContactItem {
    const res: Partial<ContactItem> = {};
    if (contact.type === 'phone') {
      // eslint-disable-next-line react/react-in-jsx-scope
      res.icon = <LocalPhoneIcon />;
      res.description = 'Вызов';
      res.action = () => {
        window.open(`tel:${contact.contact}`, '_self');
      };
    } else {
      switch (contact.description) {
        case 'vkontakte':
          res.icon = <Icon28LogoVk fill={Colors.black} />;
          res.groupType = 'vkontakte';
          break;
        case 'youtube':
          res.icon = <YouTubeIcon />;
          res.groupType = 'youtube';
          break;
        case 'telegram':
          res.icon = <TelegramIcon />;
          res.groupType = 'telegram';
          break;
        case 'whatsapp':
          res.icon = <WhatsAppIcon />;
          res.groupType = 'whatsapp';
          break;
        case 'ok':
          res.icon = <img src="https://iconape.com/wp-content/png_logo_vector/odnoklassniki.png" />;
          res.groupType = 'ok';
          break;
        case 'viber':
          res.icon = <img src="https://i.pinimg.com/originals/ee/49/80/ee49806776aae31c45efe19e83dd1b45.png" />;
          res.groupType = 'viber';
          break;
        case 'gorodskoyportal':
          res.icon = <Language />;
          res.groupType = 'web';
          break;
        case 'goskatalog':
          res.icon = <Language />;
          res.groupType = 'web';

          break;
        case 'afisha':
          res.icon = <Language />;
          res.groupType = 'web';

          break;
        case 'hotel_traits':
          res.icon = <Language />;
          res.groupType = 'web';

          break;
        case 'ytravel_booking':
          res.icon = <Language />;
          res.groupType = 'web';

          break;
        case 'dogoru':
          res.icon = <Language />;
          res.groupType = 'web';
          break;
        case 'SELF':
          res.icon = <Language />;
          res.groupType = 'web';
          break;
        default: return null;
      }
    }

    if (!res.action) {
      res.action = () => {
        window.open(contact.contact, '_blank').focus();
      };
    }
    return { ...res, ...contact } as ContactItem;
  }
}
