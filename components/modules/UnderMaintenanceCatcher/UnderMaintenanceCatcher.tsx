'use client'
import React from "react"
import { Section } from "../../containers/Section/Section"
import { Box } from "../../containers/Box/Box"
import { Heading } from "../../core/Heading/Heading"
import { Loader } from "../Loader/Loader"
import { useFlippers } from "../../utils/useFlippers"
import { useSearchParams } from "next/navigation"

interface UnderMaintenanceCatcherProps {
  isOffline?: boolean;
  noData?: boolean;
  error?: string;
  children?: string | JSX.Element | JSX.Element[] | React.ReactNode
}

export const UnderMaintenanceCatcher: React.FC<UnderMaintenanceCatcherProps> = ({
  isOffline = false,
  noData = false,
  error,
  children
}: UnderMaintenanceCatcherProps) => {
  const searchParams = useSearchParams()
  const queryOverride = searchParams?.get('overridemaintenancemode')?.toLowerCase()
  const isOverriding = queryOverride === process.env.QUERY_OVERRIDE
  const { maintenanceMode } = useFlippers({ key: 'maintenanceMode' });
  const isUnavailable = (maintenanceMode && !isOverriding) || error;

  return isUnavailable ?
    isOffline ?
      <Section heightClass="h-screen" className="dark bg-night-black">
        <Box padding="0" className="h-screen relative items-center">
          <Box padding="0" gap="md" className="place-content-center">
            <Heading className="text-center" type="h1">Tending to the flowers right now.</Heading>
            <Heading className="text-center" type="h1">We'll be back shortly!</Heading>
            <Heading className="text-center" type="h4">Thanks for your patience while we're under maintenance. See you soon!</Heading>
            <Loader/>
          </Box>
        </Box>
      </Section>
      :
      noData ?
        <Heading className="text-center" type="h4">We're getting this page up for you right now. Sit tight and thanks for your patience!</Heading>
        :
        <Section heightClass="h-screen" className="dark bg-night-black">
          <Box padding="0" className="h-screen relative items-center">
            <Box padding="0" gap="md" className="place-content-center">
              <Heading className="text-center" type="h1">Tending to the flowers right now.</Heading>
              <Heading className="text-center" type="h1">We'll be back shortly!</Heading>
              <Heading className="text-center" type="h4">Thanks for your patience while we're under maintenance. See you soon!</Heading>
              <Loader/>
            </Box>
          </Box>
        </Section>
      :
      <>
        {children}
      </>
}