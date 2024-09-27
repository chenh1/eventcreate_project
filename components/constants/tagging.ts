export type GtmId = `gtm-${string}`
export type GtmSet = {
  gtmClick?: GtmId,
  gtmSectionView?: GtmId,
  dataGtmId?: GtmId,
}

export const CLICK_CLASS: `gtm-${string}` = 'gtm-click'
export const SECTION_VIEW_CLASS: `gtm-${string}` = 'gtm-section-view'