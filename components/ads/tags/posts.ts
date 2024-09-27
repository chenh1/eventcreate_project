import type { AdTags } from "./types"

const adTags: AdTags = [
  // {
  //   elId: "single-fixed-ad",
  //   path: '/6355419/Travel/Europe/France/Paris',
  //   isResponsive: false,
  //   slots: [300, 250]
  // },
  // {
  //   elId: "base-ad",
  //   path: '/6355419/Travel/Europe',
  //   isResponsive: false,
  //   slots: [[300, 250], [728, 90], [750, 200]]
  // },
  // {
  //   elId: "banner-ad",
  //   path: '/6355419/Travel/Europe',
  //   isResponsive: false,
  //   slots: [[300, 250], [728, 90], [750, 200]]
  // },
  {
    elId: "responsive-ad-1",
    path: '/6355419/Travel/Europe',
    isResponsive: true,
    slots: [[300, 250], [728, 90], [750, 200]]
  },
  {
    elId: "responsive-ad-2",
    path: '/6355419/Travel/Europe',
    isResponsive: true,
    slots: [[300, 250], [728, 90], [750, 200]]
  },
]

export default adTags