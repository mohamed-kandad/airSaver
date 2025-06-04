export const getFlexDirectionStyle = (lang: string) =>
  lang !== 'ar' ? 'row-reverse' : 'row';
export const getTextStyle = (lang: string) => ({
  flexDirection: lang == 'ar' ? 'row-reverse' : 'row',
});
