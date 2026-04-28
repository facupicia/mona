const DEFAULT_WHATSAPP_MESSAGE = '¡Hola! Me interesa contratarlos para una fiesta de 15 años 🎉';

export const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? '';

const whatsappDigits = whatsappNumber.replace(/\D/g, '');

export const whatsappLocalNumber = whatsappDigits.startsWith('549')
  ? whatsappDigits.slice(3)
  : whatsappDigits.startsWith('54')
    ? whatsappDigits.slice(2)
    : whatsappDigits;

export const whatsappLinkNumber = whatsappDigits.startsWith('549')
  ? whatsappDigits
  : whatsappDigits.startsWith('54')
    ? `549${whatsappDigits.slice(2)}`
    : `549${whatsappDigits}`;

export const whatsappDisplayNumber = whatsappLocalNumber
  ? whatsappLocalNumber.replace(/(\d{4})(\d{6})$/, '$1-$2')
  : 'WhatsApp no configurado';

export function getWhatsAppUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  if (!whatsappDigits) return '#';

  return `https://wa.me/${whatsappLinkNumber}?text=${encodeURIComponent(message)}`;
}
