declare global {
  namespace process {
    interface env {
      STATIC_URL: string
    }
  }

  interface Window {
    googletag: {
      cmd: any[]
      destroySlots?: () => void,
      defineSlot?: (...args) => { 
        addService: (arg0) => {
          defineSizeMapping: (arg) => void
        }
      },
      pubads?: () => void,
      sizeMapping?: () => {
        addSize: (...args: number[][] | [number[], number[][]]) => any,
        build: () => void
      },
      enableServices?: () => void,
      display?: (string) => void
    }
  }
}

export {}