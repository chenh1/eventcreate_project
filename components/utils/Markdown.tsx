import type { Image } from '@/graphql/queries/post'
import type { IncrementKeys } from '../constants/types'
import type { CoreColors } from '../constants/colors'
import React, { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { Paragraph } from '../core/Paragraph/Paragraph'
import { Heading } from '../core/Heading/Heading'
import { Divider } from '../core/Divider/Divider'
import { AdContainer } from '../ads/AdContainer'
import getRemSize from './getRemSize'
import rehypeRaw from 'rehype-raw'
import type { ReactMarkdownProps, ElementContent } from 'react-markdown/lib/ast-to-react'
import type { DetailedHTMLProps, ImgHTMLAttributes } from 'react'
import './markdown.css'

interface MarkdownProps {
  children: string[] | string;
  textColor?: CoreColors;
  darkTextColor?: CoreColors;
  paragraphSize?: IncrementKeys;
  size?: IncrementKeys;
  gap?: IncrementKeys;
}

export const Markdown: React.FC<MarkdownProps> = ({ 
  children, 
  textColor="night-black", 
  darkTextColor="max-white",
  paragraphSize="md",
  size="md"
}: MarkdownProps) => {
  const colorClass = useMemo(() => {
    if (textColor) {
      return `text-${textColor}`
    }
  }, [textColor])

  const darkColorClass = useMemo(() => {
    if (darkTextColor) {
      return `dark:text-${darkTextColor}`
    }
  }, [darkTextColor])

  const computedMarginTopHeading = useMemo(() => {
    return `mt-${2 * getRemSize(size)}`;
  }, [size]);

  const computedMarginTop = useMemo(() => {
    return `mt-${getRemSize(size)}`;
  }, [size]);

  const computedPadding = useMemo(() => {
    return `p-${getRemSize(size)}`;
  }, [size]);

  const computedMargin = useMemo(() => {
    return `m-${getRemSize(size)}`;
  }, [size]);

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      className={`markdown ${colorClass} ${darkColorClass}`}
      components={{
        h1: ({ node, ...props }) => <Heading className={size ? computedMarginTopHeading : 'mt-16'} type="h1" {...props} />,
        h2: ({ node, ...props }) => <Heading className={size ? computedMarginTopHeading : 'mt-16'} type="h2" {...props} />,
        h3: ({ node, ...props }) => <Heading className={size ? computedMarginTopHeading : 'mt-16'} type="h3" {...props} />,
        h4: ({ node, ...props }) => <Heading className={size ? computedMarginTopHeading : 'mt-16'} type="h4" {...props} />,
        p: ({ node, ...props }) => <Paragraph size={paragraphSize} className={size ? computedMarginTop : 'mt-8'} {...props} />,
        em: ({ node, ...props }) => <span className="italic" {...props} />,
        strong: ({ node, ...props }) => <span className="font-semibold" {...props} />,
        hr: ({ node, ...props }) => <Divider className={size ? computedMarginTop : 'mt-8'} {...props} />,
        img: (props) => {          
          const { node, src, width, height, alternativeText }: Omit<DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "ref"> & ReactMarkdownProps & { alternativeText?: string; } = {...props}
          return (!!width && !!height && !!alternativeText)
            ? <div className={`inline-block ${size ? computedPadding : 'p-8'}`} {...props}>
                <img src={src} width={width} height={height} alt={alternativeText}/>
              </div>
            : <div className="grid place-items-center">
                <img className={`${size ? computedMargin : 'm-8'}`} src={src} width={width} height={height} alt={alternativeText || "Article image"} {...props} />
              </div>
        },
        code: ({ node, ...props }) => {
          // check if json
          const firstNodeChild: ElementContent & { value?: string; } = node?.children?.[0]
          const str = firstNodeChild?.value?.replace(/\n/g, '')
        
          try {
            if (str) {
              const { elId } = JSON.parse(str);
              return <AdContainer align="center" elId={elId}/>
            }
          } catch (e) {
            return ""  
          }
        },
        ul: ({ node, ...props }) => <ul className={`list-disc pl-8 ${size ? computedMarginTop : 'mt-8'}`} {...props} />,
        li: ({ node, ...props }) => <li className={`font-body`} {...props} />,
      }}
    >
      {Array.isArray(children) ? children.join('') : children}
    </ReactMarkdown>
  )
}