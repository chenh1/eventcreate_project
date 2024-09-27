"use client"
import type { AdTags } from "./tags/types"

import { usePathname } from "next/navigation"
import Script from "next/script"
import React, { useEffect, useState, createContext, useRef, Context } from "react"
import { Overlay } from "../containers/Overlay/Overlay"
import { Heading } from "../core/Heading/Heading"
import { Paragraph } from "../core/Paragraph/Paragraph"
import { Box } from "../containers/Box/Box"
import { useFlippers } from "../utils/useFlippers"

const NETWORK_FAILS_THRESHOLD: number = 2
const COLLAPSED_ELEMENT_CHECKS_THRESHOLD: number = 6

export const AdContext: Context<{ adScriptsLoaded: boolean; shouldShow: boolean; }> = createContext({ adScriptsLoaded: false, shouldShow: false } as { adScriptsLoaded: boolean; shouldShow: boolean; })

export interface ProviderContextType {
  adScriptsLoaded: boolean,
  shouldShow: boolean
}

export type AdProviderType = {
  tags: AdTags,
  children?: string | JSX.Element | JSX.Element[], 
}

export const AdProvider: React.FC<AdProviderType> = ({ tags, children }: AdProviderType) => {
  const networkCheckInterval = useRef<NodeJS.Timeout | undefined>(undefined)
  const collapsedElementCheckInterval = useRef<NodeJS.Timeout | undefined>(undefined)
  const pathName = usePathname();
  const [ adScriptsLoaded, setAdScriptsLoaded ]: [boolean, (boolean) => void] = useState(false)
  const pathChanged = useRef(undefined)
  const { ads: shouldShow } = useFlippers({ key: 'ads' });
  

  const adChecks = useRef({ networkFails: 0, collapsedElementChecks: 0 })
  const [ adChecksState, setAdChecksState ] = useState(adChecks.current)

  const updateAdChecksState = (newAdChecks) => {
    adChecks.current = newAdChecks
    setAdChecksState(newAdChecks)
  }
  
  
  useEffect(() => {
    if (typeof window !== 'undefined' && shouldShow) {
      window.googletag = window.googletag || { cmd: [] };

      window.googletag.cmd.push(function() {
        window.googletag.destroySlots?.();

        tags?.forEach(({ elId, path, isResponsive, slots, isIterative }) => {
          if (isResponsive && !adScriptsLoaded) {
            // check if responsive ad slot has already been defined
            if (!isIterative || (isIterative && document.getElementById(elId))) {
              const responsiveAdSlot = window.googletag.defineSlot?.(path, slots, elId).addService(window.googletag.pubads?.());
            
              const mapping = window.googletag.sizeMapping?.()
                .addSize([1024, 768], [[750, 200], [728, 90]])
                .addSize([640, 480], [300, 250])
                .addSize([0, 0], [])
                .build();
              
              responsiveAdSlot?.defineSizeMapping(mapping);
            }
          } else {
            window.googletag
              .defineSlot?.(path, slots, elId)
              .addService(window.googletag.pubads?.());
          }
        })

        window.googletag.enableServices?.();
      })
      
      setAdScriptsLoaded(true)
    }
  }, [ pathName, shouldShow ])

  useEffect(() => {
    if (typeof window !== 'undefined' && shouldShow) {
      networkCheckInterval.current = setInterval(() => {
        fetch(`https://www.googletagmanager.com/gtm.js?id=${process.env.GTM_ID}`)
          .then((res) => {
            clearInterval(networkCheckInterval.current)
          })
          .catch((e) => {
            updateAdChecksState({
              ...adChecks.current,
              networkFails: adChecks.current.networkFails + 1
            })

            if (adChecks.current.networkFails >= NETWORK_FAILS_THRESHOLD) {
              clearInterval(networkCheckInterval.current)
            }
          })
      }, 2000)

      collapsedElementCheckInterval.current = setInterval(() => {
        const adContainer = document.querySelector('.js-ad-container')
        if (!!adContainer && typeof adContainer?.children[0] === 'undefined') {
          updateAdChecksState({
            ...adChecks.current,
            collapsedElementChecks: adChecks.current.collapsedElementChecks + 1
          })
          
          if (adChecks.current.collapsedElementChecks >= COLLAPSED_ELEMENT_CHECKS_THRESHOLD) {
            clearInterval(collapsedElementCheckInterval.current)
          }
        }
      }, 1500)
    }

  }, [])
  
  const shouldShowAdWarningOverlay = adChecks?.current?.networkFails >= NETWORK_FAILS_THRESHOLD && adChecks?.current?.collapsedElementChecks >= COLLAPSED_ELEMENT_CHECKS_THRESHOLD
  
  return (
    <>
      <Script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" />
      <AdContext.Provider value={{ adScriptsLoaded, shouldShow }}>
        <Overlay toggleVisibility={() => {}} visibility={shouldShowAdWarningOverlay}>
          <Box gap="sm" className="max-w-[1080px]">
            <Heading type="h3">Hey there, about your ad blocker...</Heading>
            <Paragraph>
              We get it. Ads can be annoying. We're offering you content for free and we have server bills to pay for to keep this up and running. Please take this into consideration. If you're cool with it, please turn it off and refresh the page. If you feel like you absolutely cannot turn off your ad blocker, then please navigate away from this website. Thanks for your time; we appreciate it!
            </Paragraph>
          </Box>
        </Overlay>
        {children}
      </AdContext.Provider>
    </>
  )
}